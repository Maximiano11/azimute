import pg from 'pg';
import { config } from './config.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

// Helper: executa uma query parametrizada e devolve o resultado.
export const query = (text, params) => pool.query(text, params);

// Atalho para pegar a primeira linha (ou null).
export async function one(text, params) {
  const { rows } = await pool.query(text, params);
  return rows[0] || null;
}
