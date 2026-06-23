// Configuração validada no boot — se o ambiente estiver inválido, falha cedo e claro.
import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url('DATABASE_URL deve ser uma URL de conexão válida.'),
  JWT_SECRET: z.string().min(1).default('dev-secret-azimute'),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default('*'),
  RATE_LIMIT_AUTH: z.coerce.number().int().positive().default(50),
  RATE_LIMIT_API: z.coerce.number().int().positive().default(600),
  // Cookie "secure" (HTTPS). Por padrão segue o NODE_ENV, mas pode ser forçado
  // (ex.: produção atrás de proxy TLS, ou demo local em http).
  COOKIE_SECURE: z.enum(['true', 'false']).optional(),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Configuração de ambiente inválida:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
export const isProd = config.NODE_ENV === 'production';
// Cookie seguro: respeita override explícito; senão segue o ambiente.
export const cookieSecure =
  config.COOKIE_SECURE != null ? config.COOKIE_SECURE === 'true' : isProd;

// Em produção, exigimos um segredo forte de verdade.
if (isProd && config.JWT_SECRET.length < 16) {
  console.error('❌ JWT_SECRET fraco para produção (mínimo 16 caracteres).');
  process.exit(1);
}
