// Avatares gerados (iniciais + gradiente) — visual de produto, sem fotos externas.
export const GRADIENTS = {
  g1: 'linear-gradient(135deg, #5b8def, #27c7b8)',
  g2: 'linear-gradient(135deg, #f5b14c, #f2698f)',
  g3: 'linear-gradient(135deg, #7b6ef6, #5b8def)',
  g4: 'linear-gradient(135deg, #34d39a, #5b8def)',
  g5: 'linear-gradient(135deg, #f2698f, #7b6ef6)',
  g6: 'linear-gradient(135deg, #27c7b8, #34d39a)',
};

export const GRADIENT_IDS = Object.keys(GRADIENTS);

export const initials = (name) =>
  (name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase();
