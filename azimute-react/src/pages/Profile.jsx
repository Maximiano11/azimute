import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useConfirm } from '../context/ConfirmContext.jsx';
import { TRAVELER_TYPES, RELATO_TYPES, travelerLabel, relatoLabel } from '../data/constants.js';
import { GRADIENT_IDS, GRADIENTS, initials } from '../lib/avatar.js';
import Avatar from '../components/Avatar.jsx';
import Modal from '../components/Modal.jsx';
import { IconEdit, IconTrash, IconPlus } from '../components/Icons.jsx';
import { useMyReports, useCreateReport, useUpdateReport, useDeleteReport } from '../hooks/useReports.js';

export default function Profile() {
  const { user, logout, deleteAccount } = useAuth();
  const { reports: myRelatos } = useMyReports();
  const toast = useToast();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [relatoModal, setRelatoModal] = useState(null);

  const onLogout = async () => {
    await logout();
    toast.info('Você saiu da conta.');
    navigate('/');
  };
  const onDeleteAccount = async () => {
    const ok = await confirm({
      title: 'Apagar conta?',
      message: 'Isso remove sua conta e todos os seus relatos. Esta ação não pode ser desfeita.',
      confirmLabel: 'Apagar conta',
      danger: true,
    });
    if (ok) {
      try {
        await deleteAccount();
        toast.info('Conta apagada.');
        navigate('/');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h1>Sua conta</h1>
        <p>Gerencie seu perfil e seus relatos de locais.</p>
      </header>

      <div className="stack">
        <div className="card profile-card">
          <Avatar name={user.name} gradient={user.avatar} size={92} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2>{user.name}</h2>
            <p className="muted">{user.email}</p>
            <p className="muted">{user.bio || 'Sem bio ainda — toque em “Editar perfil”.'}</p>
            <div className="profile-badges">
              <span className="badge"><b>{myRelatos.length}</b>&nbsp;relatos</span>
              <span className="badge">{travelerLabel(user.type)}</span>
            </div>
            <div className="account-actions">
              <button className="btn btn-primary sm" onClick={() => setEditProfile(true)}>Editar perfil</button>
              <button className="btn btn-ghost sm" onClick={onLogout}>Sair da conta</button>
              <button className="btn btn-ghost sm" onClick={onDeleteAccount}>Apagar conta</button>
            </div>
          </div>
        </div>

        <section className="card" style={{ padding: '1.2rem' }}>
          <div className="section-head">
            <div><h3>Meus relatos</h3><p>Crie, edite e exclua seus relatos de locais.</p></div>
            <button className="btn btn-primary sm" onClick={() => setRelatoModal({})}><IconPlus style={{ width: 16, height: 16 }} /> Novo relato</button>
          </div>
          <MyRelatos onEdit={setRelatoModal} />
        </section>
      </div>

      {editProfile && <ProfileModal onClose={() => setEditProfile(false)} />}
      {relatoModal !== null && <RelatoModal initial={relatoModal} onClose={() => setRelatoModal(null)} />}
    </div>
  );
}

function MyRelatos({ onEdit }) {
  const { reports: myRelatos } = useMyReports();
  const removeReport = useDeleteReport();
  const toast = useToast();
  const confirm = useConfirm();

  const onDelete = async (r) => {
    const ok = await confirm({ title: 'Excluir relato?', message: `“${r.place}” será removido permanentemente.`, confirmLabel: 'Excluir', danger: true });
    if (ok) {
      try {
        await removeReport.mutateAsync(r.id);
        toast.info('Relato excluído.');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (!myRelatos.length) return <div className="empty">Você ainda não criou relatos. Toque em “Novo relato”.</div>;
  return (
    <div className="relato-list">
      {myRelatos.map((r) => (
        <article key={r.id} className="relato-item">
          <div className="ri-body">
            <span className="relato-tag">{relatoLabel(r.type)}</span>
            <h4>{r.place}</h4>
            <p>{r.desc}</p>
            <p className="ri-when">Quando: {r.when}</p>
          </div>
          <div className="relato-actions">
            <button className="btn btn-ghost sm" onClick={() => onEdit(r)}><IconEdit style={{ width: 15, height: 15 }} /> Editar</button>
            <button className="btn btn-ghost sm" onClick={() => onDelete(r)}><IconTrash style={{ width: 15, height: 15 }} /> Excluir</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProfileModal({ onClose }) {
  const { user, updateProfile } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ name: user.name, bio: user.bio || '', type: user.type, avatar: user.avatar });
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await updateProfile({ ...form, name: form.name.trim() || 'Viajante', bio: form.bio.trim() });
      toast.success('Perfil atualizado.');
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title="Editar perfil" onClose={onClose}>
      <form onSubmit={save}>
        <label className="field">Nome
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label className="field">Bio
          <textarea rows={2} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Conte algo sobre suas viagens" />
        </label>
        <label className="field">Tipo de viajante
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            {TRAVELER_TYPES.map((t) => <option key={t.v} value={t.v}>{t.label}</option>)}
          </select>
        </label>
        <span className="field" style={{ marginBottom: '0.2rem' }}>Avatar</span>
        <div className="avatar-pick">
          {GRADIENT_IDS.map((g) => (
            <button
              type="button"
              key={g}
              className={'avatar-swatch' + (g === form.avatar ? ' sel' : '')}
              style={{ background: GRADIENTS[g] }}
              onClick={() => setForm({ ...form, avatar: g })}
              aria-label={`Avatar ${g}`}
            >
              {initials(form.name)}
            </button>
          ))}
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={busy}>Cancelar</button>
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Salvando…' : 'Salvar'}</button>
        </div>
      </form>
    </Modal>
  );
}

function RelatoModal({ initial, onClose }) {
  const createReport = useCreateReport();
  const updateReport = useUpdateReport();
  const toast = useToast();
  const isEdit = Boolean(initial.id);
  const busy = createReport.isPending || updateReport.isPending;
  const [form, setForm] = useState({
    type: initial.type || 'dica',
    place: initial.place || '',
    desc: initial.desc || '',
    when: initial.when || 'Agora há pouco',
    anon: initial.anon || false,
  });

  const save = async (e) => {
    e.preventDefault();
    const data = { ...form, place: form.place.trim() || 'Local não informado', desc: form.desc.trim() || '—' };
    try {
      if (isEdit) { await updateReport.mutateAsync({ id: initial.id, patch: data }); toast.success('Relato atualizado.'); }
      else { await createReport.mutateAsync(data); toast.success('Relato criado.'); }
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Modal title={isEdit ? 'Editar relato' : 'Novo relato'} onClose={onClose}>
      <form onSubmit={save}>
        <label className="field">Tipo de relato
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            {RELATO_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
        <label className="field">Local
          <input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} placeholder="Ex.: Jardim Botânico, Curitiba" />
        </label>
        <label className="field">Descrição
          <textarea rows={3} maxLength={2000} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Ex.: lugar seguro, preço abusivo, dica útil..." />
          <span className="field-counter">{form.desc.length}/2000</span>
        </label>
        <label className="field">Quando aconteceu?
          <select value={form.when} onChange={(e) => setForm({ ...form, when: e.target.value })}>
            <option>Agora há pouco</option>
            <option>Hoje</option>
            <option>Nesta semana</option>
            <option>Nesta viagem</option>
          </select>
        </label>
        <label className="check">
          <input type="checkbox" checked={form.anon} onChange={(e) => setForm({ ...form, anon: e.target.checked })} />
          Publicar como anônimo
        </label>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={busy}>Cancelar</button>
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Salvando…' : 'Salvar relato'}</button>
        </div>
      </form>
    </Modal>
  );
}
