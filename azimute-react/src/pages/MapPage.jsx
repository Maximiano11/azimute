import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, ZoomControl, useMap } from 'react-leaflet';
import { INCIDENTS, CENTER } from '../data/incidents.js';
import { geocode, fetchRoute, routeTrust } from '../lib/geo.js';
import { relatoTone, relatoLabel } from '../data/constants.js';
import { useToast } from '../context/ToastContext.jsx';
import { useConfirm } from '../context/ConfirmContext.jsx';
import { api } from '../lib/api.js';
import { useMapReports } from '../hooks/useReports.js';
import { IconRoute, IconGear, IconLocate } from '../components/Icons.jsx';

const TONE_COLOR = { ok: '#34d39a', warn: '#f5b14c', bad: '#f2698f' };

const LAYERS = [
  { key: 'official', label: 'Avisos oficiais' },
  { key: 'community', label: 'Relatos da comunidade' },
  { key: 'support', label: 'Pontos de apoio' },
  { key: 'relatos', label: 'Relatos de usuários' },
];

// Coordenadas de fallback (caso a geocodificação esteja indisponível).
const DEFAULT_FROM = [-25.4419, -49.2769]; // Batel
const DEFAULT_TO = [-25.4179, -49.2697]; // Parque Tanguá

function RouteLayer({ route }) {
  const map = useMap();
  useEffect(() => {
    if (route?.coords?.length) map.fitBounds(route.coords, { padding: [70, 70] });
  }, [route, map]);

  if (!route) return null;
  return (
    <>
      <Polyline positions={route.coords} pathOptions={{ color: TONE_COLOR[route.trust.tone], weight: 6, opacity: 0.9, lineCap: 'round' }} />
      <CircleMarker center={route.from} radius={9} pathOptions={{ color: '#fff', weight: 2, fillColor: '#34d39a', fillOpacity: 1 }} />
      <CircleMarker center={route.to} radius={9} pathOptions={{ color: '#fff', weight: 2, fillColor: '#5b8def', fillOpacity: 1 }} />
    </>
  );
}

export default function MapPage() {
  const toast = useToast();
  const confirm = useConfirm();
  const { reports } = useMapReports();
  const [map, setMap] = useState(null);
  const [active, setActive] = useState({ official: true, community: true, support: true, relatos: true });
  const [from, setFrom] = useState('Curitiba, Batel');
  const [to, setTo] = useState('Parque Tanguá, Curitiba');
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userPos, setUserPos] = useState(null);
  const [alerts, setAlerts] = useState(INCIDENTS); // fallback até a API responder

  // Alertas oficiais/comunidade/apoio vêm do backend (com fallback offline).
  useEffect(() => {
    api.get('/alerts').then((d) => d.alerts?.length && setAlerts(d.alerts)).catch(() => {});
  }, []);

  const visible = useMemo(() => alerts.filter((i) => active[i.source]), [alerts, active]);

  // Relatos com coordenadas viram pins (e sinais para a rota). O React Query
  // mantém o cache atualizado — ao criar um relato, o mapa recarrega sozinho.
  const relatoPins = useMemo(
    () => reports.filter((r) => r.lat != null).map((r) => ({ ...r, tone: relatoTone(r.type) })),
    [reports]
  );
  const allSignals = useMemo(() => [...alerts, ...relatoPins], [alerts, relatoPins]);

  const toggle = (key) => setActive((a) => ({ ...a, [key]: !a[key] }));

  async function calcRoute(e) {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      const f = (await geocode(from)) || DEFAULT_FROM;
      const t = (await geocode(to)) || DEFAULT_TO;
      const r = await fetchRoute(f, t);
      setRoute({ ...r, from: f, to: t, trust: routeTrust(r.coords, allSignals) });
    } catch {
      setError('Não foi possível calcular a rota agora. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function locate() {
    if (!navigator.geolocation) return toast.error('Geolocalização não suportada neste navegador.');
    toast.info('Buscando sua localização…');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(c);
        map?.flyTo(c, 15);
        toast.success('Você está aqui.');
      },
      () => toast.error('Não foi possível obter sua localização. Verifique a permissão do navegador.'),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  async function onSos() {
    const ok = await confirm({
      title: 'Acionar SOS?',
      message: 'Enviaremos sua localização aos contatos de emergência e ao apoio mais próximo, e criaremos um alerta confidencial para viajantes na região.',
      confirmLabel: 'Acionar SOS',
      danger: true,
    });
    if (ok) toast.success('SOS acionado. Contatos e apoio próximos foram notificados (demonstração).');
  }

  return (
    <div className="map-shell">
      <MapContainer ref={setMap} center={CENTER} zoom={14} scrollWheelZoom zoomControl={false} className="leaflet-container">
        <ZoomControl position="bottomleft" />
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        {visible.map((i) => (
          <CircleMarker
            key={i.id}
            center={[i.lat, i.lng]}
            radius={11}
            pathOptions={{ color: TONE_COLOR[i.tone], fillColor: TONE_COLOR[i.tone], fillOpacity: 0.55, weight: 2 }}
          >
            <Popup>
              <strong>{i.title}</strong>
              <br />
              <span style={{ color: '#888' }}>{i.org} · {i.when}</span>
              <br />
              {i.desc}
            </Popup>
          </CircleMarker>
        ))}
        {active.relatos && relatoPins.map((r) => (
          <CircleMarker
            key={r.id}
            center={[r.lat, r.lng]}
            radius={11}
            pathOptions={{ color: '#fff', fillColor: TONE_COLOR[r.tone], fillOpacity: 0.75, weight: 2, dashArray: '3 3' }}
          >
            <Popup>
              <strong>{r.place}</strong>
              <br />
              <span style={{ color: '#888' }}>{relatoLabel(r.type)} · {r.authorName || 'Viajante'} · {r.when}</span>
              <br />
              {r.desc}
            </Popup>
          </CircleMarker>
        ))}
        {userPos && (
          <CircleMarker center={userPos} radius={9} pathOptions={{ color: '#fff', weight: 3, fillColor: '#5b8def', fillOpacity: 1 }}>
            <Popup>Você está aqui</Popup>
          </CircleMarker>
        )}
        <RouteLayer route={route} />
      </MapContainer>

      <div className="map-panel left">
        {route ? (
          <RouteResult route={route} onEdit={() => setRoute(null)} />
        ) : (
          <form onSubmit={calcRoute}>
            <div className="map-title"><IconRoute /> Para onde você quer ir?</div>
            <div className="route-inputs">
              <span className="dot ok" />
              <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Onde você está agora" />
            </div>
            <div className="route-inputs">
              <span className="dot" style={{ background: 'var(--primary)' }} />
              <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Para onde você quer ir" />
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={loading} style={{ marginTop: '0.6rem' }}>
              {loading ? 'Calculando…' : 'Ver caminho mais confiável'}
            </button>
            {error && <div className="auth-error">{error}</div>}
          </form>
        )}
      </div>

      <div className="map-panel right">
        <div className="map-title"><IconGear /> O que ver no mapa</div>
        {LAYERS.map((l) => (
          <label key={l.key} className="layer-row">
            <input type="checkbox" checked={active[l.key]} onChange={() => toggle(l.key)} />
            <span>{l.label}</span>
          </label>
        ))}
        <div className="legend">
          <span><i className="dot bad" /> Evite</span>
          <span><i className="dot warn" /> Atenção</span>
          <span><i className="dot ok" /> Recomendado</span>
        </div>
      </div>

      <div className="fab-stack">
        <button className="fab danger" title="SOS" onClick={onSos}>SOS</button>
        <button className="fab" title="Minha localização" aria-label="Minha localização" onClick={locate}><IconLocate /></button>
      </div>
    </div>
  );
}

function RouteResult({ route, onEdit }) {
  const km = (route.distance / 1000).toFixed(1);
  const min = Math.max(1, Math.round(route.duration / 60));
  const t = route.trust;
  return (
    <div>
      <div className="route-result-head">
        <div>
          <small className="muted">Caminho sugerido</small>
          <div className={'route-trust tone-' + t.tone}>
            <span className={'dot ' + t.tone} /> {t.label}
          </div>
        </div>
        <button className="chip" onClick={onEdit}>Editar</button>
      </div>
      <div className="route-metrics">
        <div><small className="muted">Duração</small><strong>{min} min</strong></div>
        <div><small className="muted">Distância</small><strong>{km} km</strong></div>
      </div>
      <p className="route-why">{t.why}</p>
    </div>
  );
}
