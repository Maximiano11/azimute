/* Migration inicial — cria o esquema do Azimute.
   Usa IF NOT EXISTS para ser segura mesmo em bancos já criados manualmente. */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    CREATE TABLE IF NOT EXISTS users (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          TEXT NOT NULL,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      bio           TEXT NOT NULL DEFAULT '',
      avatar        TEXT NOT NULL DEFAULT 'g1',
      type          TEXT NOT NULL DEFAULT 'tourist',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS reports (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type        TEXT NOT NULL DEFAULT 'outro',
      place       TEXT NOT NULL DEFAULT 'Local não informado',
      description TEXT NOT NULL DEFAULT '—',
      when_label  TEXT NOT NULL DEFAULT 'Agora há pouco',
      anon        BOOLEAN NOT NULL DEFAULT false,
      lat         DOUBLE PRECISION,
      lng         DOUBLE PRECISION,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_reports_user ON reports(user_id);
    CREATE INDEX IF NOT EXISTS idx_reports_created ON reports(created_at DESC);

    CREATE TABLE IF NOT EXISTS comments (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      report_id  UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
      user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      body       TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_comments_report ON comments(report_id);

    CREATE TABLE IF NOT EXISTS likes (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      report_id  UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
      user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (report_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      source      TEXT NOT NULL DEFAULT 'official',
      tone        TEXT NOT NULL DEFAULT 'warn',
      title       TEXT NOT NULL,
      org         TEXT NOT NULL DEFAULT '',
      when_label  TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      lat         DOUBLE PRECISION,
      lng         DOUBLE PRECISION,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS likes, comments, reports, alerts, users CASCADE;`);
};
