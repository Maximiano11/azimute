// Schemas de validação (zod) das entradas da API — fonte única das regras.
import { z } from 'zod';

export const RELATO_TYPES = [
  'golpe-turista', 'taxi-pirata', 'agencia-falsa', 'atracao-cilada',
  'cobranca-abusiva', 'zona-perigosa', 'apoio', 'dica', 'outro',
];
export const TRAVELER_TYPES = ['tourist', 'backpacker', 'family', 'solo', 'cultural', 'adventure'];

const email = z.string().trim().toLowerCase().email('Informe um e-mail válido.');
const password = z
  .string()
  .min(4, 'A senha precisa ter ao menos 4 caracteres.')
  .max(200, 'Senha longa demais.');
const name = z.string().trim().min(1).max(80).optional();

export const registerSchema = z.object({ name, email, password });
export const loginSchema = z.object({ email, password: z.string().min(1, 'Informe a senha.') });

export const updateProfileSchema = z.object({
  name,
  bio: z.string().trim().max(280).optional(),
  type: z.enum(TRAVELER_TYPES).optional(),
  avatar: z.string().max(20).optional(),
});

// Coordenadas (aceita null para "ainda não geocodificado").
const lat = z.number().min(-90).max(90).nullish();
const lng = z.number().min(-180).max(180).nullish();

export const reportCreateSchema = z.object({
  type: z.enum(RELATO_TYPES).default('outro'),
  place: z.string().trim().max(160).optional(),
  desc: z.string().trim().max(2000).optional(),
  when: z.string().trim().max(40).optional(),
  anon: z.boolean().optional(),
  lat,
  lng,
});

// No update todos os campos são opcionais (patch parcial).
export const reportUpdateSchema = reportCreateSchema.partial();

export const commentSchema = z.object({
  body: z.string().trim().min(1, 'Escreva algo no comentário.').max(1000, 'Comentário longo demais.'),
});

// Paginação keyset do feed.
export const feedQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().max(120).optional(),
});
