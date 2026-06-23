import { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const qc = useQueryClient();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); // true depois da verificação inicial da sessão

  // Sonda a sessão no mount (o cookie httpOnly vai junto na requisição).
  useEffect(() => {
    api
      .get('/auth/me')
      .then(({ user }) => setUser(user))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  // Os dados de relatos vivem no React Query — ao mudar de sessão, recarregamos.
  const refreshReports = () => qc.invalidateQueries({ queryKey: ['reports'] });

  async function login(email, password) {
    const { user } = await api.post('/auth/login', { email, password });
    setUser(user);
    refreshReports();
    return user;
  }

  async function register({ name, email, password }) {
    const { user } = await api.post('/auth/register', { name, email, password });
    setUser(user);
    refreshReports();
    return user;
  }

  async function logout() {
    try {
      await api.post('/auth/logout');
    } catch {
      /* mesmo offline, limpamos o estado local */
    }
    setUser(null);
    refreshReports();
  }

  async function updateProfile(patch) {
    const { user } = await api.patch('/users/me', patch);
    setUser(user);
    refreshReports(); // reflete novo nome/avatar nos relatos
    return user;
  }

  async function deleteAccount() {
    await api.del('/users/me'); // servidor limpa o cookie
    setUser(null);
    refreshReports();
  }

  const value = { user, ready, login, register, logout, updateProfile, deleteAccount };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
