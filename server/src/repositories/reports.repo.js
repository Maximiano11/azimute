// Acesso a dados de relatos, curtidas e comentários.
import { query, one } from '../db.js';

// SELECT reutilizável: relato + autor (respeitando anonimato) + contagens + curtido por mim.
// $1 = id do usuário atual (pode ser null).
const REPORT_SELECT = `
  SELECT
    r.id, r.type, r.place, r.description AS desc, r.when_label AS when,
    r.anon, r.lat, r.lng, r.created_at AS "createdAt", r.user_id AS "userId",
    CASE WHEN r.anon THEN 'Viajante anônimo' ELSE u.name END AS "authorName",
    CASE WHEN r.anon THEN NULL ELSE u.avatar END AS "authorAvatar",
    (SELECT COUNT(*)::int FROM likes l WHERE l.report_id = r.id) AS likes,
    (SELECT COUNT(*)::int FROM comments c WHERE c.report_id = r.id) AS comments,
    EXISTS (SELECT 1 FROM likes l WHERE l.report_id = r.id AND l.user_id = $1) AS "likedByMe"
  FROM reports r
  JOIN users u ON u.id = r.user_id
`;

// --- Cursor de paginação keyset: base64url de "createdAtISO|id" ---
const encodeCursor = (r) =>
  Buffer.from(`${new Date(r.createdAt).toISOString()}|${r.id}`).toString('base64url');
const decodeCursor = (c) => {
  try {
    const [ts, id] = Buffer.from(c, 'base64url').toString().split('|');
    return ts && id ? { ts, id } : null;
  } catch {
    return null;
  }
};

export const reportsRepo = {
  // Feed paginado por keyset (mais recentes primeiro).
  async feed({ userId, limit, cursor }) {
    const params = [userId || null];
    let where = '';
    if (cursor) {
      const dec = decodeCursor(cursor);
      if (dec) {
        params.push(dec.ts, dec.id);
        where = 'WHERE (r.created_at, r.id) < ($2::timestamptz, $3::uuid)';
      }
    }
    const sql = `${REPORT_SELECT} ${where} ORDER BY r.created_at DESC, r.id DESC LIMIT ${limit + 1}`;
    const { rows } = await query(sql, params);

    const hasMore = rows.length > limit;
    const reports = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore ? encodeCursor(reports[reports.length - 1]) : null;
    return { reports, nextCursor };
  },

  async listByUser(userId) {
    const { rows } = await query(
      `${REPORT_SELECT} WHERE r.user_id = $1 ORDER BY r.created_at DESC`,
      [userId]
    );
    return rows;
  },

  // Relato no formato público (com contagens) para um id específico.
  findForUser: (id, userId) => one(`${REPORT_SELECT} WHERE r.id = $2`, [userId || null, id]),

  // Linha crua (para checagens de posse/existência).
  findRaw: (id) => one('SELECT * FROM reports WHERE id = $1', [id]),

  async create(userId, d) {
    const created = await one(
      `INSERT INTO reports (user_id, type, place, description, when_label, anon, lat, lng)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [userId, d.type, d.place, d.desc, d.when, d.anon, d.lat, d.lng]
    );
    return this.findForUser(created.id, userId);
  },

  // Atualiza apenas se for do dono (posse atômica na própria escrita).
  update: (id, userId, d) =>
    one(
      `UPDATE reports SET type=$1, place=$2, description=$3, when_label=$4, anon=$5, lat=$6, lng=$7
       WHERE id=$8 AND user_id=$9 RETURNING id`,
      [d.type, d.place, d.desc, d.when, d.anon, d.lat, d.lng, id, userId]
    ),

  remove: (id, userId) => query('DELETE FROM reports WHERE id = $1 AND user_id = $2', [id, userId]),

  // Toggle de curtida à prova de corrida (delete-or-insert idempotente).
  async toggleLike(reportId, userId) {
    const del = await query('DELETE FROM likes WHERE report_id = $1 AND user_id = $2', [
      reportId,
      userId,
    ]);
    let liked;
    if (del.rowCount > 0) {
      liked = false;
    } else {
      await query(
        `INSERT INTO likes (report_id, user_id) VALUES ($1, $2)
         ON CONFLICT (report_id, user_id) DO NOTHING`,
        [reportId, userId]
      );
      liked = true;
    }
    const { rows } = await query('SELECT COUNT(*)::int AS n FROM likes WHERE report_id = $1', [
      reportId,
    ]);
    return { liked, likes: rows[0].n };
  },

  async listComments(reportId) {
    const { rows } = await query(
      `SELECT c.id, c.body, c.created_at AS "createdAt", c.user_id AS "userId",
              u.name AS "authorName", u.avatar AS "authorAvatar"
       FROM comments c JOIN users u ON u.id = c.user_id
       WHERE c.report_id = $1 ORDER BY c.created_at ASC`,
      [reportId]
    );
    return rows;
  },

  async addComment(reportId, userId, body) {
    const created = await one(
      'INSERT INTO comments (report_id, user_id, body) VALUES ($1, $2, $3) RETURNING id',
      [reportId, userId, body]
    );
    return one(
      `SELECT c.id, c.body, c.created_at AS "createdAt", c.user_id AS "userId",
              u.name AS "authorName", u.avatar AS "authorAvatar"
       FROM comments c JOIN users u ON u.id = c.user_id WHERE c.id = $1`,
      [created.id]
    );
  },

  findCommentRaw: (id) => one('SELECT * FROM comments WHERE id = $1', [id]),
  removeComment: (id) => query('DELETE FROM comments WHERE id = $1', [id]),
};
