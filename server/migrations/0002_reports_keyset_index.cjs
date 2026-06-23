/* Índice composto (created_at DESC, id DESC) para paginação keyset estável do feed. */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE INDEX IF NOT EXISTS idx_reports_keyset
      ON reports (created_at DESC, id DESC);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP INDEX IF EXISTS idx_reports_keyset;`);
};
