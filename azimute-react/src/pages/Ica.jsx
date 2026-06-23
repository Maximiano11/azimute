import { useIca } from '../hooks/useIca.js';

const TONE = { ok: 'var(--ok)', warn: 'var(--warn)', bad: 'var(--bad)' };

function Gauge({ score, tone }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const off = c * (1 - score / 100);
  return (
    <svg viewBox="0 0 140 140" className="ica-gauge" role="img" aria-label={`Índice ${score} de 100`}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="12" />
      <circle
        cx="70" cy="70" r={r} fill="none" stroke={TONE[tone]} strokeWidth="12" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(.2,.8,.2,1)' }}
      />
      <text x="70" y="68" textAnchor="middle" className="ica-gauge-score">{score}</text>
      <text x="70" y="90" textAnchor="middle" className="ica-gauge-sub">de 100</text>
    </svg>
  );
}

function Sparkline({ values }) {
  if (!values?.length) return null;
  const w = 120, h = 34, max = Math.max(...values), min = Math.min(...values);
  const span = max - min || 1;
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / span) * (h - 6) - 3}`)
    .join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="sparkline" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Ica() {
  const { data, isLoading, isError } = useIca();

  if (isLoading) {
    return (
      <div className="page-wrap">
        <div className="app-loading"><span className="spinner" /><span>Calculando o índice…</span></div>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="page-wrap">
        <header className="page-head"><h1>Índice de Confiança Azimute</h1></header>
        <div className="empty">Não foi possível carregar o índice agora. Tente novamente em instantes.</div>
      </div>
    );
  }

  const { score, classification, tone, pillars, stats, regions, forecast, updatedAt } = data;
  const updated = new Date(updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h1>Índice de Confiança Azimute <span className="live-dot" title="Atualizado ao vivo" /></h1>
        <p>Score composto que reflete o quão confiável é o destino para viajantes — atualizado pela comunidade e por fontes oficiais.</p>
      </header>

      <div className="stack">
        <section className="card ica-hero">
          <div className="ica-hero-main">
            <Gauge score={score} tone={tone} />
            <div>
              <span className={'ica-class tone-' + tone}>{classification}</span>
              <p className="muted" style={{ marginTop: '0.4rem' }}>Leitura geral do destino · atualizado às {updated}</p>
              <div className="ica-stats">
                <div><b>{stats.contributors}</b><small>colaboradores</small></div>
                <div><b>{stats.last24}</b><small>relatos 24h</small></div>
                <div><b>{stats.reports}</b><small>relatos no total</small></div>
              </div>
            </div>
          </div>
          <div className="ica-forecast">
            <small className="muted">Tendência próximas horas</small>
            <Sparkline values={forecast} />
          </div>
        </section>

        <section>
          <div className="section-head"><div><h3>Como o índice é formado</h3><p>Três fontes combinadas, com pesos diferentes.</p></div></div>
          <div className="grid grid-3">
            {pillars.map((p) => (
              <article key={p.key} className="card pillar">
                <div className="pillar-head">
                  <div>
                    <strong>{p.label}</strong>
                    <small className="muted">{p.sub}</small>
                  </div>
                  <span className="pillar-score" style={{ color: TONE[scoreTone(p.score)] }}>{p.score}</span>
                </div>
                <div className="pillar-bar">
                  <span style={{ width: `${p.score}%`, background: TONE[scoreTone(p.score)] }} />
                </div>
                <div className="pillar-foot">
                  <span className="badge">peso {p.weight}%</span>
                  <span className="muted">
                    {p.key === 'predictive' ? `confiança do modelo: ${p.confidence}%` : `${p.count} sinais`}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="card" style={{ padding: '1.2rem' }}>
          <div className="section-head"><div><h3>Regiões monitoradas</h3><p>Leitura por área, em tempo real.</p></div></div>
          <div className="region-list">
            {regions.map((reg) => (
              <div key={reg.name} className="region-row">
                <div className="region-info">
                  <span className={'dot ' + reg.tone} />
                  <div>
                    <strong>{reg.name}</strong>
                    <small className="muted">{reg.signals} sinais na área</small>
                  </div>
                </div>
                <div className="region-meter">
                  <div className="pillar-bar"><span style={{ width: `${reg.score}%`, background: TONE[reg.tone] }} /></div>
                  <span className={'region-score tone-' + reg.tone}>{reg.score}</span>
                </div>
                <span className={'pill ica-pill-' + reg.tone}>{reg.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const scoreTone = (s) => (s >= 75 ? 'ok' : s >= 55 ? 'warn' : 'bad');
