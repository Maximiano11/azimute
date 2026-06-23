// GET /api/ica — Índice de Confiança Azimute.
// Score composto (0–100) a partir de 3 pilares: fontes oficiais, comunidade e
// análise preditiva. Também devolve a leitura por região monitorada.
import { Router } from 'express';
import { icaRepo } from '../repositories/ica.repo.js';

const router = Router();

const POSITIVE = new Set(['dica', 'apoio']);
const NEGATIVE = new Set(['golpe-turista', 'zona-perigosa', 'taxi-pirata']);
const reportTone = (t) => (POSITIVE.has(t) ? 'ok' : NEGATIVE.has(t) ? 'bad' : 'warn');

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const classify = (s) =>
  s >= 75 ? { label: 'Confiável', tone: 'ok' } : s >= 55 ? { label: 'Atenção', tone: 'warn' } : { label: 'Crítico', tone: 'bad' };

function haversine(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// Penaliza tons negativos e premia positivos a partir de uma base.
function scoreFromTones(tones, base = 80) {
  let s = base;
  for (const t of tones) s += t === 'bad' ? -13 : t === 'warn' ? -6 : 3;
  return clamp(Math.round(s), 35, 98);
}

const REGIONS = [
  { name: 'Centro Histórico', lat: -25.4284, lng: -49.2733 },
  { name: 'Batel', lat: -25.4419, lng: -49.2769 },
  { name: 'Jardim Botânico', lat: -25.4385, lng: -49.2731 },
  { name: 'Parque Tanguá', lat: -25.4179, lng: -49.2843 },
];

router.get('/', async (_req, res, next) => {
  try {
    const { alerts, reports, agg } = await icaRepo.signals();

    // Pilar 1 — fontes oficiais
    const official = alerts.filter((a) => a.source === 'official');
    const officialScore = scoreFromTones(official.map((a) => a.tone), 82);

    // Pilar 2 — comunidade
    const reportTones = reports.map((r) => reportTone(r.type));
    const positive = reportTones.filter((t) => t === 'ok').length;
    const positiveRatio = reports.length ? positive / reports.length : 0.6;
    const communityScore = clamp(
      Math.round(52 + positiveRatio * 36 + Math.min(reports.length, 25) * 0.3),
      35,
      97
    );

    // Pilar 3 — análise preditiva (sazonalidade determinística por horário)
    const hour = new Date().getHours();
    const daySafety = Math.cos(((hour - 14) / 24) * 2 * Math.PI); // pico ~14h, vale de madrugada
    const predictiveScore = clamp(Math.round(70 + daySafety * 16), 45, 95);
    const modelConfidence = clamp(Math.round(80 + daySafety * 7), 62, 93);

    const score = Math.round(officialScore * 0.4 + communityScore * 0.4 + predictiveScore * 0.2);
    const cls = classify(score);

    // Regiões monitoradas
    const allSignals = [
      ...alerts.map((a) => ({ tone: a.tone, lat: a.lat, lng: a.lng })),
      ...reports
        .filter((r) => r.lat != null)
        .map((r) => ({ tone: reportTone(r.type), lat: Number(r.lat), lng: Number(r.lng) })),
    ];
    const regions = REGIONS.map((reg) => {
      const near = allSignals.filter(
        (s) => s.lat != null && haversine([reg.lat, reg.lng], [s.lat, s.lng]) <= 1600
      );
      const rscore = scoreFromTones(near.map((s) => s.tone), 80);
      return { name: reg.name, score: rscore, signals: near.length, ...classify(rscore) };
    }).sort((a, b) => b.score - a.score);

    // Previsão curta (próximas horas) para um sparkline
    const forecast = Array.from({ length: 6 }, (_, i) => {
      const h = (hour + i) % 24;
      const d = Math.cos(((h - 14) / 24) * 2 * Math.PI);
      return clamp(Math.round(score * 0.72 + 70 * 0.28 + d * 8), 35, 98);
    });

    res.json({
      score,
      classification: cls.label,
      tone: cls.tone,
      updatedAt: new Date().toISOString(),
      pillars: [
        { key: 'official', label: 'Fontes oficiais de turismo', sub: 'Órgãos de turismo e segurança pública', score: officialScore, weight: 40, count: official.length },
        { key: 'community', label: 'Comunidade de viajantes', sub: 'Relatos cruzados de quem está no destino', score: communityScore, weight: 40, count: reports.length },
        { key: 'predictive', label: 'Análise preditiva', sub: 'Sazonalidade e padrões por horário', score: predictiveScore, weight: 20, confidence: modelConfidence },
      ],
      stats: { contributors: agg.contributors, last24: agg.last24, reports: agg.total },
      regions,
      forecast,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
