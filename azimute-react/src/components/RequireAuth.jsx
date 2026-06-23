import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Protege as rotas do app: sem sessão, redireciona para a área de login.
export default function RequireAuth({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  // Espera a verificação inicial da sessão para não expulsar quem está logado.
  if (!ready) {
    return (
      <div className="app-loading" role="status" aria-live="polite">
        <span className="spinner" aria-hidden="true" />
        <span>Carregando…</span>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  return children;
}
