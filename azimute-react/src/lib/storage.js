export const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
