import { Router } from 'express';
import {
  hashPassword,
  comparePassword,
  signToken,
  optionalAuth,
  publicUser,
  setAuthCookie,
  clearAuthCookie,
} from '../auth.js';
import { validate } from '../validate.js';
import { registerSchema, loginSchema } from '../schemas.js';
import { usersRepo } from '../repositories/users.repo.js';

const router = Router();

// POST /api/auth/register
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const name = req.body.name || 'Viajante';

    if (await usersRepo.findByEmail(email))
      return res.status(409).json({ error: 'Já existe uma conta com esse e-mail.' });

    const user = await usersRepo.create({ name, email, passwordHash: await hashPassword(password) });
    const token = signToken(user.id);
    setAuthCookie(res, token);
    res.status(201).json({ token, user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersRepo.findByEmail(email);
    if (!user || !(await comparePassword(password, user.password_hash)))
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    const token = signToken(user.id);
    setAuthCookie(res, token);
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/logout — limpa o cookie de sessão.
router.post('/logout', (_req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

// GET /api/auth/me — sonda de sessão: 200 { user } se autenticado, 200 { user: null } se não.
router.get('/me', optionalAuth, async (req, res, next) => {
  try {
    if (!req.userId) return res.json({ user: null });
    const user = await usersRepo.findById(req.userId);
    res.json({ user: user ? publicUser(user) : null });
  } catch (err) {
    next(err);
  }
});

export default router;
