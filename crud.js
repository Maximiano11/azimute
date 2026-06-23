/* ============================================================
   Azimute · CRUD de demonstração (localStorage)
   - Cadastro / Login / Logout
   - Perfil editável (CRUD de usuário, incl. apagar conta)
   - Relatos de locais (CRUD completo: criar, ler, editar, excluir)
   Apenas para apresentação — sem backend, tudo no navegador.
   ============================================================ */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const note = (m) => (window.toast ? window.toast(m) : console.log(m));
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const K = { users: 'az.users', session: 'az.session', relatos: 'az.relatos', seeded: 'az.seeded' };
  const AVATARS = [12, 5, 15, 32, 47, 68].map((n) => `https://i.pravatar.cc/120?img=${n}`);

  const TYPES = [
    { v: 'tourist', label: '🧳 Turista' },
    { v: 'backpacker', label: '🎒 Mochileiro' },
    { v: 'family', label: '👨‍👩‍👧 Família' },
    { v: 'solo', label: '🌍 Viajante solo' },
    { v: 'cultural', label: '🏛️ Cultural' },
    { v: 'adventure', label: '🏔️ Aventura' },
  ];
  const RELATO_TYPES = [
    ['golpe-turista', 'Golpe contra turistas'],
    ['taxi-pirata', 'Táxi pirata / transporte abusivo'],
    ['agencia-falsa', 'Agência ou guia não credenciado'],
    ['atracao-cilada', 'Atração ruim / armadilha'],
    ['cobranca-abusiva', 'Preço abusivo a estrangeiros'],
    ['zona-perigosa', 'Zona perigosa para turistas'],
    ['apoio', 'Ponto de apoio ao viajante'],
    ['dica', 'Dica positiva (recomendo!)'],
    ['outro', 'Outro'],
  ];
  const typeLabel = (v) => (TYPES.find((t) => t.v === v) || { label: '🧳 Turista' }).label;
  const relatoLabel = (v) => (RELATO_TYPES.find((t) => t[0] === v) || ['', 'Relato'])[1];

  const read = (k, def) => { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  /* ---------------- Usuários / Sessão ---------------- */
  const Auth = {
    users: () => read(K.users, []),
    saveUsers: (u) => write(K.users, u),
    current() {
      const id = localStorage.getItem(K.session);
      if (!id) return null;
      return this.users().find((u) => u.id === id) || null;
    },
    register({ name, email, password }) {
      email = (email || '').trim().toLowerCase();
      const users = this.users();
      if (users.some((u) => u.email === email)) throw new Error('Já existe uma conta com esse e-mail.');
      const user = {
        id: uid(),
        name: (name || '').trim() || 'Viajante',
        email,
        password,
        bio: '',
        avatar: AVATARS[0],
        type: 'tourist',
        createdAt: Date.now(),
      };
      users.push(user);
      this.saveUsers(users);
      localStorage.setItem(K.session, user.id);
      return user;
    },
    login(email, password) {
      email = (email || '').trim().toLowerCase();
      const user = this.users().find((u) => u.email === email && u.password === password);
      if (!user) throw new Error('E-mail ou senha incorretos.');
      localStorage.setItem(K.session, user.id);
      return user;
    },
    logout() { localStorage.removeItem(K.session); },
    update(patch) {
      const cur = this.current();
      if (!cur) return null;
      const users = this.users();
      const i = users.findIndex((u) => u.id === cur.id);
      users[i] = { ...users[i], ...patch };
      this.saveUsers(users);
      return users[i];
    },
    remove() {
      const cur = this.current();
      if (!cur) return;
      this.saveUsers(this.users().filter((u) => u.id !== cur.id));
      write(K.relatos, Relatos.all().filter((r) => r.userId !== cur.id));
      this.logout();
    },
  };

  /* ---------------- Relatos ---------------- */
  const Relatos = {
    all: () => read(K.relatos, []),
    save: (r) => write(K.relatos, r),
    mine() {
      const u = Auth.current();
      return u ? this.all().filter((r) => r.userId === u.id) : [];
    },
    add({ type, place, desc, when, anon }) {
      const u = Auth.current();
      if (!u) return null;
      const all = this.all();
      const rel = {
        id: uid(),
        userId: u.id,
        type: type || 'outro',
        place: (place || '').trim() || 'Local não informado',
        desc: (desc || '').trim() || '—',
        when: when || 'Agora há pouco',
        anon: !!anon,
        likes: 0,
        comments: 0,
        createdAt: Date.now(),
      };
      all.unshift(rel);
      this.save(all);
      return rel;
    },
    update(id, patch) {
      const all = this.all();
      const i = all.findIndex((r) => r.id === id);
      if (i < 0) return;
      all[i] = { ...all[i], ...patch };
      this.save(all);
    },
    remove(id) { this.save(this.all().filter((r) => r.id !== id)); },
  };

  window.AZAuth = Auth;
  window.AZRelatos = Relatos;

  /* ---------------- Seed / Migração ---------------- */
  // Cria a conta de demonstração (se ainda não existir). NÃO faz login
  // automático — assim a tela de Entrar / Criar conta aparece primeiro.
  function ensureSeed() {
    if (localStorage.getItem(K.seeded)) return;
    localStorage.setItem(K.seeded, '1');
    if (Auth.users().length) return;

    const demo = {
      id: uid(),
      name: 'João Vitor',
      email: 'demo@azimute.app',
      password: '123456',
      bio: 'Explorador frequente de destinos urbanos e culturais.',
      avatar: 'https://i.pravatar.cc/120?img=12',
      type: 'tourist',
      createdAt: Date.now(),
    };
    Auth.saveUsers([demo]);

    const rs = [
      { type: 'dica', place: 'Parque Tanguá, Curitiba', desc: 'Vista incrível no fim da tarde, ambiente tranquilo e seguro para caminhar.', when: 'Nesta viagem' },
      { type: 'golpe-turista', place: 'Largo da Ordem, Curitiba', desc: 'Abordagem de falso guia cobrando city tour antecipado. Fique atento.', when: 'Hoje' },
    ].map((r) => ({ id: uid(), userId: demo.id, anon: false, likes: 0, comments: 0, createdAt: Date.now(), ...r }));
    Relatos.save(rs);
  }

  // Migração única: quem já estava com a sessão de demonstração logada
  // automaticamente passa a ver a tela de login/cadastro.
  function migrate() {
    const KEY = 'az.crud.v', V = '2';
    if (localStorage.getItem(KEY) === V) return;
    localStorage.setItem(KEY, V);
    localStorage.removeItem(K.session);
  }

  /* ---------------- Render ---------------- */
  function syncAuthUI() {
    const u = Auth.current();
    const av = $('.topbar .avatar img');
    if (av && u) av.src = u.avatar;
  }

  function renderAccount() {
    const gate = $('#authGate');
    const area = $('#accountArea');
    if (!gate || !area) return;
    const u = Auth.current();
    if (!u) {
      gate.hidden = false;
      area.hidden = true;
      return;
    }
    gate.hidden = true;
    area.hidden = false;
    $('#accAvatar').src = u.avatar;
    $('#accName').textContent = u.name;
    $('#accMeta').textContent = u.email;
    $('#accBio').textContent = u.bio || 'Sem bio ainda — toque em “Editar perfil”.';
    $('#accTypeBadge').textContent = typeLabel(u.type);
    $('#accRelatoCount').textContent = Relatos.mine().length;
    renderMyRelatos();
  }

  function renderMyRelatos() {
    const box = $('#myRelatosList');
    if (!box) return;
    const list = Relatos.mine();
    if (!list.length) {
      box.innerHTML = '<div class="relato-empty">Você ainda não criou relatos. Toque em “Novo relato”.</div>';
      return;
    }
    box.innerHTML = list
      .map(
        (r) => `
      <article class="relato-item">
        <div class="ri-body">
          <span class="relato-tag">${escapeHtml(relatoLabel(r.type))}</span>
          <h4>${escapeHtml(r.place)}</h4>
          <p>${escapeHtml(r.desc)}</p>
          <p class="ri-when">Quando: ${escapeHtml(r.when)}${r.anon ? ' · anônimo' : ''}</p>
        </div>
        <div class="relato-actions">
          <button class="btn btn-ghost sm" type="button" onclick="azOpenRelatoEdit('${r.id}')">Editar</button>
          <button class="btn btn-ghost sm" type="button" onclick="azDeleteRelato('${r.id}')">Excluir</button>
        </div>
      </article>`
      )
      .join('');
  }

  /* ---------------- Handlers: Auth ---------------- */
  window.azAuthTab = (which) => {
    $$('.auth-tab').forEach((b) => b.classList.toggle('active', b.dataset.auth === which));
    $('#loginForm').hidden = which !== 'login';
    $('#registerForm').hidden = which !== 'register';
  };
  window.azLogin = (e) => {
    e.preventDefault();
    try {
      const u = Auth.login($('#loginEmail').value, $('#loginPass').value);
      e.target.reset();
      renderAccount();
      syncAuthUI();
      note('Bem-vindo(a) de volta, ' + u.name.split(' ')[0] + '!');
    } catch (err) {
      note(err.message);
    }
  };
  window.azRegister = (e) => {
    e.preventDefault();
    try {
      const u = Auth.register({ name: $('#regName').value, email: $('#regEmail').value, password: $('#regPass').value });
      e.target.reset();
      renderAccount();
      syncAuthUI();
      note('Conta criada! Bem-vindo(a), ' + u.name.split(' ')[0] + '.');
    } catch (err) {
      note(err.message);
    }
  };
  window.azLogout = () => {
    Auth.logout();
    renderAccount();
    note('Você saiu da conta.');
  };
  window.azDeleteAccount = () => {
    if (!confirm('Apagar sua conta e todos os seus relatos? Esta ação não pode ser desfeita.')) return;
    Auth.remove();
    renderAccount();
    note('Conta apagada.');
  };

  /* ---------------- Handlers: Perfil ---------------- */
  window.azOpenProfileEdit = () => {
    const u = Auth.current();
    if (!u) return;
    $('#pfName').value = u.name;
    $('#pfBio').value = u.bio || '';
    $('#pfType').innerHTML = TYPES.map((t) => `<option value="${t.v}">${t.label}</option>`).join('');
    $('#pfType').value = u.type;
    const wrap = $('#pfAvatars');
    wrap.dataset.value = u.avatar;
    wrap.innerHTML = AVATARS.map(
      (a) => `<img src="${a}" alt="" class="${a === u.avatar ? 'sel' : ''}" onclick="azPickAvatar(this,'${a}')">`
    ).join('');
    $('#profileModal').hidden = false;
  };
  window.azPickAvatar = (el, url) => {
    [...el.parentElement.children].forEach((c) => c.classList.remove('sel'));
    el.classList.add('sel');
    el.parentElement.dataset.value = url;
  };
  window.azSaveProfile = (e) => {
    e.preventDefault();
    Auth.update({
      name: $('#pfName').value.trim() || 'Viajante',
      bio: $('#pfBio').value.trim(),
      type: $('#pfType').value,
      avatar: $('#pfAvatars').dataset.value || AVATARS[0],
    });
    $('#profileModal').hidden = true;
    renderAccount();
    syncAuthUI();
    note('Perfil atualizado.');
  };

  /* ---------------- Handlers: Relatos ---------------- */
  function fillRelatoTypes() {
    const sel = $('#relatoType');
    if (sel && !sel.options.length) sel.innerHTML = RELATO_TYPES.map((t) => `<option value="${t[0]}">${t[1]}</option>`).join('');
  }
  window.azOpenRelatoNew = () => {
    if (!Auth.current()) return note('Faça login para criar relatos.');
    fillRelatoTypes();
    $('#relatoModalTitle').textContent = 'Novo relato';
    $('#relatoId').value = '';
    $('#relatoType').value = 'dica';
    $('#relatoPlace').value = '';
    $('#relatoDesc').value = '';
    $('#relatoWhen').value = 'Agora há pouco';
    $('#relatoModal').hidden = false;
  };
  window.azOpenRelatoEdit = (id) => {
    const r = Relatos.mine().find((x) => x.id === id);
    if (!r) return;
    fillRelatoTypes();
    $('#relatoModalTitle').textContent = 'Editar relato';
    $('#relatoId').value = r.id;
    $('#relatoType').value = r.type;
    $('#relatoPlace').value = r.place;
    $('#relatoDesc').value = r.desc;
    $('#relatoWhen').value = r.when;
    $('#relatoModal').hidden = false;
  };
  window.azSaveRelato = (e) => {
    e.preventDefault();
    const id = $('#relatoId').value;
    const data = {
      type: $('#relatoType').value,
      place: $('#relatoPlace').value.trim() || 'Local não informado',
      desc: $('#relatoDesc').value.trim() || '—',
      when: $('#relatoWhen').value,
    };
    if (id) {
      Relatos.update(id, data);
      note('Relato atualizado.');
    } else {
      Relatos.add({ ...data, anon: false });
      note('Relato criado.');
    }
    $('#relatoModal').hidden = true;
    renderAccount();
  };
  window.azDeleteRelato = (id) => {
    if (!confirm('Excluir este relato?')) return;
    Relatos.remove(id);
    renderAccount();
    note('Relato excluído.');
  };

  /* ---------------- Integração com a navegação ---------------- */
  const _showPage = window.showPage;
  if (typeof _showPage === 'function') {
    window.showPage = function (id) {
      _showPage(id);
      if (id === 'profile') renderAccount();
    };
  }

  /* ---------------- Boot ---------------- */
  ensureSeed();
  migrate();
  syncAuthUI();
  renderAccount();
})();
