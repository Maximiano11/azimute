// Dados crus para o cálculo do ICA (Índice de Confiança Azimute).
import { query } from '../db.js';

export const icaRepo = {
  async signals() {
    const alerts = (await query(`SELECT source, tone, lat, lng FROM alerts`)).rows;
    const reports = (await query(`SELECT type, lat, lng, created_at AS "createdAt" FROM reports`)).rows;
    const agg = (
      await query(
        `SELECT
           COUNT(*)::int AS total,
           COUNT(*) FILTER (WHERE created_at > now() - interval '24 hours')::int AS last24,
           COUNT(DISTINCT user_id)::int AS contributors
         FROM reports`
      )
    ).rows[0];
    return { alerts, reports, agg };
  },
};
