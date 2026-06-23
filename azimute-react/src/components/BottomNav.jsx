import { NavLink } from 'react-router-dom';
import { IconMap, IconAlert, IconActivity, IconUsers, IconUser } from './Icons.jsx';

const ITEMS = [
  { to: '/app/map', icon: IconMap, label: 'Mapa' },
  { to: '/app/alerts', icon: IconAlert, label: 'Alertas' },
  { to: '/app/ica', icon: IconActivity, label: 'ICA' },
  { to: '/app/community', icon: IconUsers, label: 'Rede' },
  { to: '/app/profile', icon: IconUser, label: 'Conta' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegação rápida">
      {ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
