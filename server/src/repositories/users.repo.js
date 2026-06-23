// Acesso a dados de usuários (toda a SQL de users mora aqui).
import { query, one } from '../db.js';

export const usersRepo = {
  findByEmail: (email) => one('SELECT * FROM users WHERE email = $1', [email]),

  findById: (id) => one('SELECT * FROM users WHERE id = $1', [id]),

  create: ({ name, email, passwordHash }) =>
    one(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [name, email, passwordHash]
    ),

  update: (id, { name, bio, type, avatar }) =>
    one(
      'UPDATE users SET name = $1, bio = $2, type = $3, avatar = $4 WHERE id = $5 RETURNING *',
      [name, bio, type, avatar, id]
    ),

  remove: (id) => query('DELETE FROM users WHERE id = $1', [id]),
};
