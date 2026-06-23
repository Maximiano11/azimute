// Acesso a dados de alertas.
import { query } from '../db.js';

export const alertsRepo = {
  async list() {
    const { rows } = await query(
      `SELECT id, source, tone, title, org, when_label AS when, description AS desc, lat, lng
       FROM alerts ORDER BY created_at DESC`
    );
    return rows;
  },
};
