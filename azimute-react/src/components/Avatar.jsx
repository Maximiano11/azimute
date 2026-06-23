import { GRADIENTS, initials } from '../lib/avatar.js';

export default function Avatar({ name, gradient = 'g1', size = 44 }) {
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: GRADIENTS[gradient] || GRADIENTS.g1, fontSize: Math.round(size * 0.38) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
