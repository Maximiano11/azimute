import { Router } from 'express';
import { requireAuth } from '../auth.js';
import { reportsRepo } from '../repositories/reports.repo.js';

const router = Router();

// DELETE /api/comments/:id — apaga (apenas o autor).
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const c = await reportsRepo.findCommentRaw(req.params.id);
    if (!c) return res.status(404).json({ error: 'Comentário não encontrado.' });
    if (c.user_id !== req.userId)
      return res.status(403).json({ error: 'Você só pode apagar seus próprios comentários.' });
    await reportsRepo.removeComment(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
