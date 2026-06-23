import { Router } from 'express';
import { requireAuth, optionalAuth } from '../auth.js';
import { validate } from '../validate.js';
import {
  reportCreateSchema,
  reportUpdateSchema,
  commentSchema,
  feedQuerySchema,
} from '../schemas.js';
import { reportsRepo } from '../repositories/reports.repo.js';

const router = Router();

// Aplica os defaults de texto (zod já validou tipos, limites e enum).
const shapeReport = (data) => ({
  type: data?.type ?? 'outro',
  place: (data?.place ?? '').trim() || 'Local não informado',
  desc: (data?.desc ?? '').trim() || '—',
  when: (data?.when ?? '').trim() || 'Agora há pouco',
  anon: Boolean(data?.anon),
  lat: data?.lat ?? null,
  lng: data?.lng ?? null,
});

// GET /api/reports — feed paginado por keyset (mais recentes primeiro).
router.get('/', optionalAuth, validate(feedQuerySchema, 'query'), async (req, res, next) => {
  try {
    const { limit, cursor } = req.validatedQuery;
    res.json(await reportsRepo.feed({ userId: req.userId, limit, cursor }));
  } catch (err) {
    next(err);
  }
});

// GET /api/reports/mine — relatos do usuário logado.
router.get('/mine', requireAuth, async (req, res, next) => {
  try {
    res.json({ reports: await reportsRepo.listByUser(req.userId) });
  } catch (err) {
    next(err);
  }
});

// POST /api/reports — cria um relato.
router.post('/', requireAuth, validate(reportCreateSchema), async (req, res, next) => {
  try {
    const report = await reportsRepo.create(req.userId, shapeReport(req.body));
    res.status(201).json({ report });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/reports/:id — edita (apenas o dono).
router.patch('/:id', requireAuth, validate(reportUpdateSchema), async (req, res, next) => {
  try {
    const existing = await reportsRepo.findRaw(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Relato não encontrado.' });
    if (existing.user_id !== req.userId)
      return res.status(403).json({ error: 'Você só pode editar seus próprios relatos.' });

    // Mescla apenas os campos enviados sobre o existente.
    const merged = shapeReport({
      type: req.body.type ?? existing.type,
      place: req.body.place ?? existing.place,
      desc: req.body.desc ?? existing.description,
      when: req.body.when ?? existing.when_label,
      anon: req.body.anon ?? existing.anon,
      lat: req.body.lat ?? existing.lat,
      lng: req.body.lng ?? existing.lng,
    });
    const updated = await reportsRepo.update(req.params.id, req.userId, merged);
    if (!updated) return res.status(404).json({ error: 'Relato não encontrado.' });
    res.json({ report: await reportsRepo.findForUser(req.params.id, req.userId) });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/reports/:id — exclui (apenas o dono).
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const existing = await reportsRepo.findRaw(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Relato não encontrado.' });
    if (existing.user_id !== req.userId)
      return res.status(403).json({ error: 'Você só pode excluir seus próprios relatos.' });
    await reportsRepo.remove(req.params.id, req.userId);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// POST /api/reports/:id/like — alterna curtida.
router.post('/:id/like', requireAuth, async (req, res, next) => {
  try {
    if (!(await reportsRepo.findRaw(req.params.id)))
      return res.status(404).json({ error: 'Relato não encontrado.' });
    res.json(await reportsRepo.toggleLike(req.params.id, req.userId));
  } catch (err) {
    next(err);
  }
});

// GET /api/reports/:id/comments — lista comentários com autor.
router.get('/:id/comments', async (req, res, next) => {
  try {
    res.json({ comments: await reportsRepo.listComments(req.params.id) });
  } catch (err) {
    next(err);
  }
});

// POST /api/reports/:id/comments — adiciona comentário.
router.post('/:id/comments', requireAuth, validate(commentSchema), async (req, res, next) => {
  try {
    if (!(await reportsRepo.findRaw(req.params.id)))
      return res.status(404).json({ error: 'Relato não encontrado.' });
    const comment = await reportsRepo.addComment(req.params.id, req.userId, req.body.body);
    res.status(201).json({ comment });
  } catch (err) {
    next(err);
  }
});

export default router;
