// Smoke test do backend Azimute — exercita todos os fluxos de CRUD via HTTP.
// Pré-requisitos: Postgres (docker) no ar, seed rodado, API em http://localhost:4100.
// Uso: node test/smoke.mjs

const BASE = process.env.API_BASE || 'http://localhost:4100/api';

let pass = 0;
let fail = 0;
function check(cond, label) {
  if (cond) {
    pass++;
    console.log(`  ✓ ${label}`);
  } else {
    fail++;
    console.error(`  ✗ ${label}`);
  }
}

async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* sem corpo */
  }
  return { status: res.status, data };
}

async function main() {
  const email = `teste_${Date.now()}@azimute.app`;
  const email2 = `outro_${Date.now()}@azimute.app`;

  console.log('\n[health]');
  check((await api('/health')).data?.ok === true, 'GET /health responde ok');

  console.log('\n[auth: register]');
  let r = await api('/auth/register', { method: 'POST', body: { name: 'Teste Smoke', email, password: '123456' } });
  check(r.status === 201 && r.data?.token, 'register cria conta e devolve token');
  const token = r.data.token;
  check(r.data?.user?.email === email, 'usuário retornado sem password_hash');
  check(r.data?.user?.password_hash === undefined, 'password_hash não vaza');

  console.log('\n[auth: register duplicado]');
  r = await api('/auth/register', { method: 'POST', body: { name: 'x', email, password: '123456' } });
  check(r.status === 409, 'register com e-mail repetido → 409');

  console.log('\n[auth: senha curta]');
  r = await api('/auth/register', { method: 'POST', body: { name: 'x', email: 'z@z.com', password: '12' } });
  check(r.status === 400, 'senha < 4 → 400');

  console.log('\n[auth: login]');
  r = await api('/auth/login', { method: 'POST', body: { email, password: '123456' } });
  check(r.status === 200 && r.data?.token, 'login válido devolve token');
  r = await api('/auth/login', { method: 'POST', body: { email, password: 'errada' } });
  check(r.status === 401, 'login com senha errada → 401');

  console.log('\n[auth: me]');
  r = await api('/auth/me', { token });
  check(r.status === 200 && r.data?.user?.email === email, 'me com token retorna o usuário');
  r = await api('/auth/me');
  check(r.status === 200 && r.data?.user === null, 'me sem sessão → 200 { user: null }');

  console.log('\n[reports: criar]');
  r = await api('/reports', { method: 'POST', token, body: { type: 'dica', place: 'Praça Smoke', desc: 'teste', when: 'Hoje', lat: -25.43, lng: -49.27 } });
  check(r.status === 201 && r.data?.report?.id, 'cria relato');
  const reportId = r.data.report.id;
  check(r.data.report.likes === 0 && r.data.report.comments === 0, 'relato novo com 0 likes/comments');

  console.log('\n[reports: feed e mine]');
  r = await api('/reports', { token });
  check(r.status === 200 && Array.isArray(r.data?.reports) && r.data.reports.some((x) => x.id === reportId), 'feed inclui o relato criado');
  r = await api('/reports/mine', { token });
  check(r.data?.reports?.length >= 1, 'mine lista os relatos do usuário');

  console.log('\n[paginação keyset]');
  r = await api('/reports?limit=1', { token });
  check(r.status === 200 && r.data?.reports?.length === 1, 'limit=1 retorna 1 relato');
  check(typeof r.data?.nextCursor === 'string' && r.data.nextCursor.length > 0, 'nextCursor presente quando há mais');
  const firstId = r.data.reports[0].id;
  r = await api(`/reports?limit=1&cursor=${encodeURIComponent(r.data.nextCursor)}`, { token });
  check(r.status === 200 && r.data?.reports?.[0]?.id && r.data.reports[0].id !== firstId, 'página seguinte traz outro relato');
  r = await api('/reports?limit=999', { token });
  check(r.status === 400, 'limit fora do range (>100) → 400');

  console.log('\n[validação de entrada (zod)]');
  r = await api('/auth/register', { method: 'POST', body: { name: 'x', email: 'nao-e-email', password: '123456' } });
  check(r.status === 400, 'e-mail inválido no registro → 400');
  r = await api('/reports', { method: 'POST', token, body: { type: 'tipo-invalido', place: 'X' } });
  check(r.status === 400, 'tipo de relato inválido → 400');
  r = await api('/reports', { method: 'POST', token, body: { type: 'dica', place: 'P'.repeat(500) } });
  check(r.status === 400, 'campo acima do limite de tamanho → 400');

  console.log('\n[reports: editar]');
  r = await api(`/reports/${reportId}`, { method: 'PATCH', token, body: { desc: 'editado' } });
  check(r.status === 200 && r.data?.report?.desc === 'editado', 'edita o próprio relato');

  console.log('\n[reports: permissão de outro usuário]');
  const r2 = await api('/auth/register', { method: 'POST', body: { name: 'Outro', email: email2, password: '123456' } });
  const token2 = r2.data.token;
  r = await api(`/reports/${reportId}`, { method: 'PATCH', token: token2, body: { desc: 'invasão' } });
  check(r.status === 403, 'outro usuário não pode editar (403)');
  r = await api(`/reports/${reportId}`, { method: 'DELETE', token: token2 });
  check(r.status === 403, 'outro usuário não pode excluir (403)');

  console.log('\n[likes: toggle]');
  r = await api(`/reports/${reportId}/like`, { method: 'POST', token: token2 });
  check(r.status === 200 && r.data?.liked === true && r.data?.likes === 1, 'curtir → liked=true, likes=1');
  r = await api(`/reports/${reportId}/like`, { method: 'POST', token: token2 });
  check(r.status === 200 && r.data?.liked === false && r.data?.likes === 0, 'descurtir → liked=false, likes=0');
  await api(`/reports/${reportId}/like`, { method: 'POST', token: token2 }); // recurtir
  r = await api('/reports', { token: token2 });
  check(r.data.reports.find((x) => x.id === reportId)?.likedByMe === true, 'likedByMe reflete no feed');

  console.log('\n[comments]');
  r = await api(`/reports/${reportId}/comments`, { method: 'POST', token: token2, body: { body: 'Boa dica!' } });
  check(r.status === 201 && r.data?.comment?.id, 'cria comentário');
  const commentId = r.data.comment.id;
  r = await api(`/reports/${reportId}/comments`);
  check(r.data?.comments?.length === 1, 'lista comentários');
  r = await api(`/reports/${reportId}/comments`, { method: 'POST', token: token2, body: { body: '' } });
  check(r.status === 400, 'comentário vazio → 400');
  r = await api(`/comments/${commentId}`, { method: 'DELETE', token });
  check(r.status === 403, 'não-autor não apaga comentário (403)');
  r = await api(`/comments/${commentId}`, { method: 'DELETE', token: token2 });
  check(r.status === 200, 'autor apaga o próprio comentário');

  console.log('\n[perfil]');
  r = await api('/users/me', { method: 'PATCH', token, body: { name: 'Nome Novo', bio: 'bio nova', type: 'backpacker', avatar: 'g5' } });
  check(r.status === 200 && r.data?.user?.name === 'Nome Novo' && r.data?.user?.type === 'backpacker', 'atualiza perfil');

  console.log('\n[alertas]');
  r = await api('/alerts');
  check(r.status === 200 && r.data?.alerts?.length >= 9, 'lista alertas do banco');

  console.log('\n[reports: excluir]');
  r = await api(`/reports/${reportId}`, { method: 'DELETE', token });
  check(r.status === 200, 'dono exclui o relato');

  console.log('\n[conta: apagar]');
  r = await api('/users/me', { method: 'DELETE', token });
  check(r.status === 200, 'apaga conta 1');
  r = await api('/users/me', { method: 'DELETE', token: token2 });
  check(r.status === 200, 'apaga conta 2');
  r = await api('/auth/me', { token });
  check(r.status === 200 && r.data?.user === null, 'token da conta apagada não retorna usuário');

  console.log(`\n${'='.repeat(40)}`);
  console.log(`RESULTADO: ${pass} PASS, ${fail} FAIL`);
  console.log('='.repeat(40));
  process.exitCode = fail === 0 ? 0 : 1;
}

main().catch((err) => {
  console.error('Erro fatal no smoke test:', err);
  process.exitCode = 1;
});
