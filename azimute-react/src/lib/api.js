// Cliente HTTP do Azimute.
// A sessão vive num cookie httpOnly (setado pelo servidor) — o JS não toca no token,
// o que mitiga roubo de sessão via XSS. Por isso usamos `credentials: 'include'`.
const BASE = import.meta.env.VITE_API_URL || '/api';

export async function request(path, { method = 'GET', body } = {}) {
  let res;
  try {
    res = await fetch(BASE + path, {
      method,
      credentials: 'include',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Não foi possível falar com o servidor. Verifique sua conexão.');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* resposta sem corpo */
  }

  if (!res.ok) {
    throw new Error(data?.error || 'Algo deu errado. Tente novamente.');
  }
  return data;
}

export const api = {
  get: (p) => request(p),
  post: (p, body) => request(p, { method: 'POST', body }),
  patch: (p, body) => request(p, { method: 'PATCH', body }),
  del: (p) => request(p, { method: 'DELETE' }),
};
