import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { IconSun, IconMoon, IconShield, IconRoute, IconLifebuoy, IconGlobe, IconUsers, IconChart } from '../components/Icons.jsx';

const FEATURES = [
  { Ico: IconShield, title: 'Três fontes em uma leitura', desc: 'Alertas oficiais, relatos da comunidade e contexto do lugar fundidos numa só leitura de confiança.' },
  { Ico: IconRoute, title: 'Caminho mais confiável', desc: 'Em vez do trajeto só mais curto, o que tem melhor contexto de segurança para quem está de fora.' },
  { Ico: IconLifebuoy, title: 'Apoio sempre perto', desc: 'Pontos de apoio ao viajante e SOS a um toque, com sua localização pronta para compartilhar.' },
  { Ico: IconGlobe, title: 'Funciona em qualquer destino', desc: 'A mesma leitura se adapta a cada cidade, rota e país que você visita.' },
  { Ico: IconUsers, title: 'Comunidade ligada ao lugar', desc: 'Relatos presos a local e horário — menos feed genérico, mais contexto útil.' },
  { Ico: IconChart, title: 'Dados para o turismo', desc: 'Indicadores de confiança por área para quem opera com viajantes e destinos.' },
];

export default function Landing() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const appTarget = user ? '/app/map' : '/auth';
  return (
    <div className="landing">
      <header className="lnd-top">
        <div className="brand">
          <img src="/logo-mark.svg" alt="" />
          <span>Azimute</span>
        </div>
        <nav className="lnd-nav">
          <a href="#features">Recursos</a>
          <a href="#community">Comunidade</a>
        </nav>
        <div className="lnd-actions">
          <button className="icon-btn lnd-hide" onClick={toggle} aria-label="Alternar tema">
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          {user ? (
            <Link to="/app/map" className="btn btn-primary">Ir para o app</Link>
          ) : (
            <>
              <Link to="/auth" className="btn btn-ghost">Entrar</Link>
              <Link to="/auth?mode=register" className="btn btn-primary">Criar conta</Link>
            </>
          )}
        </div>
      </header>

      <section className="lnd-hero">
        <div className="lnd-blob b1" />
        <div className="lnd-blob b2" />
        <div>
          <span className="lnd-tag">Dados confiáveis para quem está viajando</span>
          <h1>Viaje com mais <span className="text-grad">confiança</span> em qualquer destino.</h1>
          <p className="lnd-lede">
            O Azimute cruza comunidade, alertas oficiais e contexto do lugar para transformar risco em decisão
            rápida para o viajante.
          </p>
          <div className="lnd-cta">
            <Link to={appTarget} className="btn btn-primary lg">Abrir mapa confiável</Link>
            <Link to={user ? '/app/map' : '/auth?mode=register'} className="btn btn-ghost lg">{user ? 'Continuar' : 'Criar conta'}</Link>
          </div>
          <ul className="lnd-stats">
            <li><strong>Qualquer destino</strong><span>cidades, rotas e países</span></li>
            <li><strong>3 fontes</strong><span>oficial, comunidade e contexto</span></li>
            <li><strong>Leitura rápida</strong><span>risco vira ação</span></li>
          </ul>
        </div>

        <div className="lnd-hero-card card">
          <div className="lnd-route-row">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="dot ok" />
              <strong>Rota mais confiável</strong>
            </div>
            <span className="badge tone-ok">Recomendado</span>
          </div>
          <svg viewBox="0 0 320 170" className="lnd-mini-map" style={{ width: '100%' }}>
            <rect width="320" height="170" fill="rgba(255,255,255,0.02)" />
            <path d="M20 140 C 90 130, 110 60, 180 60 S 280 40, 300 30" fill="none" stroke="url(#lg)" strokeWidth="5" strokeLinecap="round" />
            <defs>
              <linearGradient id="lg" x1="0" x2="1">
                <stop offset="0" stopColor="#5b8def" />
                <stop offset="1" stopColor="#27c7b8" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="140" r="7" fill="#34d39a" />
            <circle cx="300" cy="30" r="7" fill="#5b8def" />
            <circle cx="150" cy="95" r="14" fill="rgba(242,105,143,0.25)" stroke="#f2698f" />
          </svg>
          <div className="grid grid-3" style={{ marginTop: '0.9rem', gap: '0.6rem' }}>
            <div className="badge" style={{ justifyContent: 'center' }}>18 min</div>
            <div className="badge" style={{ justifyContent: 'center' }}>2,4 km</div>
            <div className="badge tone-ok" style={{ justifyContent: 'center' }}>Seguro</div>
          </div>
        </div>
      </section>

      <section className="lnd-section" id="features">
        <h2>Tudo numa leitura que dá para confiar</h2>
        <p>Menos dados soltos, mais decisão rápida no momento em que o viajante precisa.</p>
        <div className="grid grid-3">
          {FEATURES.map(({ Ico, title, desc }) => (
            <article key={title} className="feature-card card">
              <div className="feature-ico"><Ico /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lnd-section" id="community">
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '0.6rem' }}>Comunidade ligada ao lugar, não ao algoritmo</h2>
          <p className="muted" style={{ maxWidth: '54ch', margin: '0 auto 1.3rem' }}>
            Cada relato nasce no mapa, ajuda no deslocamento e reforça a leitura do destino com utilidade imediata.
          </p>
          <Link to={user ? '/app/community' : '/auth'} className="btn btn-primary lg">Abrir a comunidade</Link>
        </div>
      </section>

      <footer className="lnd-footer">
        Azimute © 2026 · Demonstração com dados de exemplo de fontes públicas e da comunidade
      </footer>
    </div>
  );
}
