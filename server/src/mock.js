// Popula RELATOS DA COMUNIDADE (com coordenadas, para aparecerem no mapa) e
// remove relatos de teste automatizado, deixando o feed e o mapa apresentáveis.
// Idempotente: pode rodar várias vezes sem duplicar.
import { pool, query, one } from './db.js';
import { hashPassword } from './auth.js';

const MOCK_USERS = [
  { name: 'Marina Alves', email: 'marina.alves@azimute.app', avatar: 'g2', type: 'solo', bio: 'Viajante solo, amante de cidades históricas.' },
  { name: 'Rafael Costa', email: 'rafael.costa@azimute.app', avatar: 'g4', type: 'family', bio: 'Viajo com a família atrás de roteiros tranquilos.' },
  { name: 'Lúcia Mendes', email: 'lucia.mendes@azimute.app', avatar: 'g5', type: 'cultural', bio: 'Curto museus, feiras e gastronomia local.' },
];

// [type, place, desc, when, lat, lng, anon]
const REPORTS = [
  ['dica', 'Jardim Botânico de Curitiba', 'Estufa linda logo na abertura, movimento tranquilo e seguro para fotos.', 'Hoje 9:10', -25.4415, -49.2407, false],
  ['apoio', 'Central de Informação Turística - Rua XV', 'Equipe bilíngue, mapas gratuitos e dicas de transporte público.', 'Hoje', -25.4296, -49.2712, false],
  ['golpe-turista', 'Rodoviária de Curitiba', 'Falso taxista oferecendo corrida fechada bem acima do app. Recuse e chame pelo aplicativo.', 'Há 2h', -25.4516, -49.266, false],
  ['cobranca-abusiva', 'Mercado Municipal de Curitiba', 'Alguns boxes cobram preço diferente para turista. Confirme o valor antes de pedir.', 'Ontem', -25.4458, -49.2645, false],
  ['dica', 'Ópera de Arame', 'Vá no fim da tarde: estrutura iluminada, vazia e com entorno calmo.', 'Nesta semana', -25.3863, -49.276, false],
  ['zona-perigosa', 'Entorno da Rodoferroviária à noite', 'Evite caminhar sozinho depois das 22h por ali; prefira app de transporte.', 'Há 5h', -25.452, -49.264, false],
  ['dica', 'Bosque Alemão', 'Trilha tranquila e mirante, ótimo para família pela manhã.', 'Hoje 8:30', -25.4036, -49.258, false],
  ['atracao-cilada', 'Passeio de bairro "imperdível"', 'Panfleto promete museu incluso que na verdade cobra à parte. Não valeu o preço.', 'Nesta semana', -25.433, -49.271, true],
  ['apoio', 'Posto policial do Largo da Ordem', 'Referência rápida se precisar de ajuda durante a feira de domingo.', 'Domingo', -25.4291, -49.2725, false],
  ['dica', 'Largo da Ordem (durante o dia)', 'De dia é seguro e charmoso; a feirinha de domingo vale muito a visita.', 'Domingo', -25.4284, -49.272, false],
  ['taxi-pirata', 'Saída do Aeroporto Afonso Pena', 'Carros sem identificação oferecendo transfer caro. Use app ou táxi oficial do ponto.', 'Há 3h', -25.5305, -49.1758, false],
  ['dica', 'Museu Oscar Niemeyer (MON)', 'Compre o ingresso online: a fila da bilheteria estava grande no meio da tarde.', 'Hoje 15:00', -25.4416, -49.238, false],
];

async function ensureUser(u) {
  const found = await one('SELECT * FROM users WHERE email=$1', [u.email]);
  if (found) return found;
  const hash = await hashPassword('123456');
  return one(
    `INSERT INTO users (name,email,password_hash,bio,avatar,type) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [u.name, u.email, hash, u.bio, u.avatar, u.type]
  );
}

async function main() {
  // 1) Remove relatos de teste automatizado (feed/mapa ficam limpos).
  const del = await query(
    `DELETE FROM reports WHERE place LIKE 'Pag %' OR place ~ '[0-9]{10}'
       OR user_id IN (SELECT id FROM users WHERE name IN
         ('Viajante T2','Viajante T3','Viajante E2E','Viajante Renomeado','Diag','Cookie Test'))`
  );
  console.log(`• Removidos ${del.rowCount} relatos de teste.`);

  // 2) Autores: usuários mock + conta demo.
  const authors = [];
  for (const u of MOCK_USERS) authors.push(await ensureUser(u));
  const demo = await one('SELECT * FROM users WHERE email=$1', ['demo@azimute.app']);
  if (demo) authors.push(demo);

  // 3) Insere relatos com coordenadas (idempotente por place+descrição).
  let added = 0;
  for (let i = 0; i < REPORTS.length; i++) {
    const [type, place, desc, when, lat, lng, anon] = REPORTS[i];
    const exists = await one('SELECT 1 FROM reports WHERE place=$1 AND description=$2', [place, desc]);
    if (exists) continue;
    const author = authors[i % authors.length];
    await query(
      `INSERT INTO reports (user_id,type,place,description,when_label,anon,lat,lng)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [author.id, type, place, desc, when, anon, lat, lng]
    );
    added++;
  }
  console.log(`✓ ${added} relatos da comunidade (com coordenadas) inseridos.`);

  const total = await one('SELECT COUNT(*)::int AS n, COUNT(*) FILTER (WHERE lat IS NOT NULL)::int AS geo FROM reports');
  console.log(`• Total de relatos: ${total.n} (${total.geo} no mapa).`);
}

main()
  .catch((err) => {
    console.error('Erro no mock:', err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
