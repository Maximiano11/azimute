import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { IconSun, IconMoon, IconUser } from './Icons.jsx';
import Avatar from './Avatar.jsx';

export default function Topbar() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <Link to="/app/map" className="brand">
        <img src="/logo-mark.svg" alt="" />
        <span>Azimute</span>
      </Link>
      <div className="topbar-spacer" />
      <button className="icon-btn" onClick={toggle} title="Alternar tema" aria-label="Alternar tema">
        {theme === 'dark' ? <IconSun /> : <IconMoon />}
      </button>
      <button
        className={user ? 'avatar-btn' : 'icon-btn'}
        onClick={() => navigate('/app/profile')}
        aria-label="Sua conta"
        title="Sua conta"
      >
        {user ? <Avatar name={user.name} gradient={user.avatar} size={40} /> : <IconUser />}
      </button>
    </header>
  );
}
