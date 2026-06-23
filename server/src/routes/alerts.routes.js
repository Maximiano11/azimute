import { Router } from 'express';
import { alertsRepo } from '../repositories/alerts.repo.js';

const router = Router();

// GET /api/alerts — alertas oficiais/comunidade/apoio (seed no banco).
router.get('/', async (_req, res, next) => {
  try {
    res.json({ alerts: await alertsRepo.list() });
  } catch (err) {
    next(err);
  }
});

export default router;
