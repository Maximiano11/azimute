import { useEffect, useMemo, useState } from 'react';
import { INCIDENTS } from '../data/incidents.js';
import { api } from '../lib/api.js';
import { IconShield, IconUsers, IconLifebuoy } from '../components/Icons.jsx';

const SOURCE_LABEL = { official: 'Oficial', community: 'Viajantes', support: 'Apoio' };
const SOURCE_ICON = { official: IconShield, community: IconUsers, support: IconLifebuoy };
const TABS = [
  { k: 'todos', label: 'Todos' },
  { k: 'official', label: 'Oficiais' },
  { k: 'community', label: 'Viajantes' },
  { k: 'support', label: 'Apoio' },
];

export default function Alerts() {
  const [tab, setTab] = useState('todos');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/alerts')
      .then((d) => setAlerts(d.alerts || []))
      .catch(() => {
        setAlerts(INCIDENTS); // fallback offline
        setError('Mostrando alertas em modo offline.');
      })
      .finally(() => setLoading(false));
  }, []);

  const list = useMemo(
    () => (tab === 'todos' ? alerts : alerts.filter((i) => i.source === tab)),
    [tab, alerts]
  );

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h1>Alertas do lugar</h1>
        <p>Veja rápido o que pede atenção agora e o contexto ao redor do seu destino.</p>
      </header>

      <div className="stack">
        <div className="grid grid-3">
          <div className="card" style={{ padding: '1rem' }}>
            <small className="muted">Em atenção</small>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{alerts.filter((i) => i.tone !== 'ok').length}</div>
            <small className="muted">sinais ativos no destino</small>
          </div>
          <div className="card" style={{ padding: '1rem' }}>
            <small className="muted">Fontes oficiais</small>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{alerts.filter((i) => i.source === 'official').length}</div>
            <small className="muted">avisos confirmados</small>
          </div>
          <div className="card" style={{ padding: '1rem' }}>
            <small className="muted">Relatos locais</small>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{alerts.filter((i) => i.source === 'community').length}</div>
            <small className="muted">compartilhados por viajantes</small>
          </div>
        </div>

        {error && <div className="muted" style={{ fontSize: '0.85rem' }}>{error}</div>}

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <button key={t.k} className={'chip' + (tab === t.k ? ' active' : '')} onClick={() => setTab(t.k)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="stack" style={{ gap: '0.7rem' }}>
          {loading && <div className="empty">Carregando alertas…</div>}
          {!loading && !list.length && <div className="empty">Nenhum alerta nesta categoria.</div>}
          {list.map((i) => {
            const Ico = SOURCE_ICON[i.source];
            return (
            <article key={i.id} className="card alert-item">
              <div className={'a-icon tone-' + i.tone} style={{ background: 'var(--surface-2)' }}><Ico /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <h4>{i.title}</h4>
                  <span className={'pill ' + i.source}>{SOURCE_LABEL[i.source]}</span>
                </div>
                <div className="a-meta">{i.org} · {i.when}</div>
                <p>{i.desc}</p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
