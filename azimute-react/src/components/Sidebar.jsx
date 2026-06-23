import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { IconMap, IconAlert, IconActivity, IconUsers, IconUser } from './Icons.jsx';
import Avatar from './Avatar.jsx';

const NAV = [
  { to: '/app/map', icon: IconMap, title: 'Mapa confiável', sub: 'Ir, evitar, pedir apoio' },
  { to: '/app/alerts', icon: IconAlert, title: 'Alertas do lugar', sub: 'Golpes, furtos e atenção' },
  { to: '/app/ica', icon: IconActivity, title: 'Índice de confiança', sub: 'Leitura do destino ao vivo' },
  { to: '/app/community', icon: IconUsers, title: 'Comunidade', sub: 'Relatos úteis no destino' },
  { to: '/app/profile', icon: IconUser, title: 'Sua conta', sub: 'Perfil e relatos' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    toast.info('Você saiu da conta.');
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <nav className="stack" style={{ gap: '0.3rem' }}>
        {NAV.map(({ to, icon: Icon, title, sub }) => (
          <NavLink key={to} to={to} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <Icon />
            <div>
              <strong>{title}</strong>
              <small className="muted">{sub}</small>
            </div>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-foot">
        {user && (
          <div className="card sidebar-user">
            <Avatar name={user.name} gradient={user.avatar} size={36} />
            <div style={{ minWidth: 0 }}>
              <div className="sidebar-user-name">{user.name}</div>
              <small className="muted">{user.email}</small>
            </div>
          </div>
        )}
        <button className="btn btn-ghost sm btn-block" onClick={onLogout} style={{ marginBottom: '0.5rem' }}>Sair da conta</button>
        <NavLink to="/" className="btn btn-ghost sm btn-block">← Voltar ao site</NavLink>
      </div>
    </aside>
  );
}
