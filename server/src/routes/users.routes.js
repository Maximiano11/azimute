import { Router } from 'express';
import { requireAuth, publicUser, clearAuthCookie } from '../auth.js';
import { validate } from '../validate.js';
import { updateProfileSchema } from '../schemas.js';
import { usersRepo } from '../repositories/users.repo.js';

const router = Router();

// PATCH /api/users/me — atualiza o perfil do usuário logado.
router.patch('/me', requireAuth, validate(updateProfileSchema), async (req, res, next) => {
  try {
    const cur = await usersRepo.findById(req.userId);
    if (!cur) return res.status(404).json({ error: 'Conta não encontrada.' });

    // zod já validou tipos/limites; aqui só aplicamos defaults sobre o atual.
    const user = await usersRepo.update(req.userId, {
      name: req.body.name ?? cur.name,
      bio: req.body.bio ?? cur.bio,
      type: req.body.type ?? cur.type,
      avatar: req.body.avatar ?? cur.avatar,
    });
    res.json({ user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/me — apaga a conta (relatos/curtidas/comentários caem por cascade).
router.delete('/me', requireAuth, async (req, res, next) => {
  try {
    await usersRepo.remove(req.userId);
    clearAuthCookie(res);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
