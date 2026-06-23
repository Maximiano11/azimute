// Popula dados de demonstração. O esquema é criado pelas migrations (npm run migrate).
// Idempotente: pode rodar várias vezes sem duplicar.
import { pool, query, one } from './db.js';
import { hashPassword } from './auth.js';

const ALERTS = [
  { source: 'official', tone: 'warn', lat: -25.4385, lng: -49.2731, title: 'Fluxo intenso no Jardim Botânico', org: 'Setur Curitiba', when: 'Há 20 min', desc: 'Entrada principal com filas de excursão no fim da tarde. Comprar ingresso antecipado agiliza o acesso.' },
  { source: 'official', tone: 'bad', lat: -25.4284, lng: -49.2733, title: 'Furto a turista no Centro Histórico', org: 'Polícia de Turismo', when: 'Hoje 14:20', desc: 'Visitante relatou furto de mochila em área de grande circulação na feira do Largo da Ordem.' },
  { source: 'official', tone: 'warn', lat: -25.4416, lng: -49.2765, title: 'Fila elevada no Museu Oscar Niemeyer', org: 'Setur Curitiba', when: 'Há 35 min', desc: 'Movimento alto na bilheteria e estacionamento. Compra antecipada reduz a espera.' },
  { source: 'official', tone: 'ok', lat: -25.4299, lng: -49.2679, title: 'Rua XV com apoio ampliado ao visitante', org: 'Instituto de Turismo', when: 'Hoje 10:10', desc: 'Agentes de turismo e sinalização bilíngue reforçada no eixo da Rua das Flores.' },
  { source: 'community', tone: 'warn', lat: -25.4424, lng: -49.2789, title: 'Falso guia oferecendo city tour', org: 'Viajante verificado', when: 'Há 10 min', desc: 'Abordagem informal perto da Rua XV com cobrança antecipada e sem credencial visível.' },
  { source: 'community', tone: 'ok', lat: -25.4419, lng: -49.2768, title: 'Torre Panorâmica bem avaliada', org: '9 relatos', when: 'Hoje 16:40', desc: 'Visitantes elogiam vista ampla, equipe cordial e entorno tranquilo no horário da tarde.' },
  { source: 'community', tone: 'ok', lat: -25.4179, lng: -49.2697, title: 'Parque Tanguá tranquilo ao entardecer', org: '18 relatos', when: 'Hoje', desc: 'Boa opção para caminhar, vista bonita e movimento de famílias no fim da tarde.' },
  { source: 'support', tone: 'ok', lat: -25.4309, lng: -49.2712, title: 'Posto de apoio ao turista', org: 'Ponto de apoio', when: 'Aberto agora', desc: 'Informações, mapas e suporte em PT/EN/ES no centro de Curitiba.' },
  { source: 'support', tone: 'ok', lat: -25.4401, lng: -49.2760, title: 'Central de atendimento ao visitante', org: 'Ponto de apoio', when: 'Aberto agora', desc: 'Apoio rápido próximo aos principais museus da cidade.' },
];

async function main() {
  // Conta de demonstração
  let demo = await one('SELECT * FROM users WHERE email = $1', ['demo@azimute.app']);
  if (!demo) {
    const hash = await hashPassword('123456');
    demo = await one(
      `INSERT INTO users (name, email, password_hash, bio, avatar, type)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      ['João Vitor', 'demo@azimute.app', hash, 'Explorador frequente de destinos urbanos e culturais.', 'g3', 'tourist']
    );
    console.log('✓ Conta demo criada (demo@azimute.app / 123456).');
  } else {
    console.log('• Conta demo já existe.');
  }

  // 3) Relatos do demo (só se ainda não houver nenhum dele)
  const count = await one('SELECT COUNT(*)::int AS n FROM reports WHERE user_id = $1', [demo.id]);
  if (count.n === 0) {
    const reports = [
      { type: 'dica', place: 'Parque Tanguá, Curitiba', desc: 'Vista incrível no fim da tarde, ambiente tranquilo e seguro para caminhar.', when: 'Nesta viagem', lat: -25.4179, lng: -49.2843 },
      { type: 'golpe-turista', place: 'Largo da Ordem, Curitiba', desc: 'Abordagem de falso guia cobrando city tour antecipado. Fique atento.', when: 'Hoje', lat: -25.4257, lng: -49.2716 },
    ];
    for (const r of reports) {
      await query(
        `INSERT INTO reports (user_id, type, place, description, when_label, lat, lng)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [demo.id, r.type, r.place, r.desc, r.when, r.lat, r.lng]
      );
    }
    console.log(`✓ ${reports.length} relatos de exemplo criados.`);
  } else {
    console.log('• Relatos do demo já existem.');
  }

  // 4) Alertas (só se a tabela estiver vazia)
  const ac = await one('SELECT COUNT(*)::int AS n FROM alerts');
  if (ac.n === 0) {
    for (const a of ALERTS) {
      await query(
        `INSERT INTO alerts (source, tone, title, org, when_label, description, lat, lng)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [a.source, a.tone, a.title, a.org, a.when, a.desc, a.lat, a.lng]
      );
    }
    console.log(`✓ ${ALERTS.length} alertas inseridos.`);
  } else {
    console.log('• Alertas já existem.');
  }

  console.log('\nSeed concluído.');
}

main()
  .catch((err) => {
    console.error('Erro no seed:', err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
