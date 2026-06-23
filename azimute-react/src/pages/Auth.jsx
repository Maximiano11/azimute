import { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Auth() {
  const { user, login, register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const dest = location.state?.from || '/app/map';
  const [tab, setTab] = useState(params.get('mode') === 'register' ? 'register' : 'login');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [reg, setReg] = useState({ name: '', email: '', password: '' });

  // Já autenticado? Não faz sentido ver o login.
  if (user) return <Navigate to={dest} replace />;

  const doLogin = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const u = await login(loginForm.email, loginForm.password);
      toast.success(`Bem-vindo(a) de volta, ${u.name.split(' ')[0]}!`);
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  const doRegister = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const u = await register(reg);
      toast.success(`Conta criada! Bem-vindo(a), ${u.name.split(' ')[0]}.`);
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const switchTab = (t) => { setTab(t); setError(''); };

  return (
    <div className="auth-page">
      <div className="auth-page-blob b1" />
      <div className="auth-page-blob b2" />

      <div className="auth-page-inner">
        <Link to="/" className="brand auth-brand">
          <img src="/logo-mark.svg" alt="" />
          <span>Azimute</span>
        </Link>
        <p className="auth-page-lede">Entre na sua conta para acessar o mapa confiável, os alertas e a comunidade.</p>

        <div className="auth-card card">
          <div className="auth-tabs">
            <button className={'auth-tab' + (tab === 'login' ? ' active' : '')} onClick={() => switchTab('login')}>Entrar</button>
            <button className={'auth-tab' + (tab === 'register' ? ' active' : '')} onClick={() => switchTab('register')}>Criar conta</button>
          </div>

          {tab === 'login' ? (
            <form onSubmit={doLogin}>
              <label className="field">E-mail
                <input type="email" autoComplete="username" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="voce@email.com" required autoFocus />
              </label>
              <label className="field">Senha
                <input type="password" autoComplete="current-password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••" required />
              </label>
              {error && <div className="auth-error">{error}</div>}
              <button className="btn btn-primary btn-block" type="submit" disabled={busy}>{busy ? 'Entrando…' : 'Entrar'}</button>
              <p className="auth-hint">Conta de demonstração: <b>demo@azimute.app</b> · senha <b>123456</b></p>
            </form>
          ) : (
            <form onSubmit={doRegister}>
              <label className="field">Nome
                <input value={reg.name} onChange={(e) => setReg({ ...reg, name: e.target.value })} placeholder="Como quer ser chamado(a)" required autoFocus />
              </label>
              <label className="field">E-mail
                <input type="email" value={reg.email} onChange={(e) => setReg({ ...reg, email: e.target.value })} placeholder="voce@email.com" required />
              </label>
              <label className="field">Senha
                <input type="password" minLength={4} value={reg.password} onChange={(e) => setReg({ ...reg, password: e.target.value })} placeholder="mínimo 4 caracteres" required />
              </label>
              {error && <div className="auth-error">{error}</div>}
              <button className="btn btn-primary btn-block" type="submit" disabled={busy}>{busy ? 'Criando conta…' : 'Criar conta e entrar'}</button>
            </form>
          )}
        </div>

        <Link to="/" className="auth-back">← Voltar ao site</Link>
      </div>
    </div>
  );
}
