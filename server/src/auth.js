import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config, cookieSecure } from './config.js';

const SECRET = config.JWT_SECRET;
const EXPIRES = '7d';

export const COOKIE_NAME = 'az_session';
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const hashPassword = (plain) => bcrypt.hash(plain, 10);
export const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);

export const signToken = (userId) => jwt.sign({ sub: userId }, SECRET, { expiresIn: EXPIRES });

// Grava o token num cookie httpOnly — inacessível a JavaScript (mitiga roubo via XSS).
export function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: cookieSecure,
    maxAge: SEVEN_DAYS,
    path: '/',
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'lax', secure: cookieSecure, path: '/' });
}

// Extrai o token do cookie httpOnly (navegador) ou do header Bearer (clientes/testes).
function readToken(req) {
  if (req.cookies?.[COOKIE_NAME]) return req.cookies[COOKIE_NAME];
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

// Middleware: exige sessão válida e popula req.userId.
export function requireAuth(req, res, next) {
  const token = readToken(req);
  if (!token) return res.status(401).json({ error: 'Autenticação necessária.' });
  try {
    req.userId = jwt.verify(token, SECRET).sub;
    next();
  } catch {
    return res.status(401).json({ error: 'Sessão inválida ou expirada.' });
  }
}

// Middleware opcional: se houver sessão válida, popula req.userId; nunca bloqueia.
export function optionalAuth(req, _res, next) {
  const token = readToken(req);
  if (token) {
    try {
      req.userId = jwt.verify(token, SECRET).sub;
    } catch {
      /* sessão inválida: segue como anônimo */
    }
  }
  next();
}

// Remove o hash de senha antes de devolver o usuário ao cliente.
export const publicUser = (u) =>
  u && {
    id: u.id,
    name: u.name,
    email: u.email,
    bio: u.bio,
    avatar: u.avatar,
    type: u.type,
    createdAt: u.created_at,
  };
