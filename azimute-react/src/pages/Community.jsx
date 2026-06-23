import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { RELATO_TYPES, relatoLabel } from '../data/constants.js';
import Avatar from '../components/Avatar.jsx';
import { IconHeart, IconComment } from '../components/Icons.jsx';
import {
  useFeed,
  useCreateReport,
  useToggleLike,
  useComments,
  useAddComment,
  useDeleteComment,
} from '../hooks/useReports.js';

export default function Community() {
  const { user } = useAuth();
  const toast = useToast();
  const { reports: feed, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useFeed();
  const createReport = useCreateReport();
  const [form, setForm] = useState({ type: 'dica', place: '', desc: '', when: 'Agora há pouco', anon: false });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createReport.mutateAsync({
        ...form,
        place: form.place.trim() || 'Local não informado',
        desc: form.desc.trim() || '—',
      });
      setForm({ type: 'dica', place: '', desc: '', when: 'Agora há pouco', anon: false });
      toast.success('Relato publicado para a comunidade.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h1>Comunidade de viajantes</h1>
        <p>Relatos presos ao lugar e ao horário — ajuda rápida e contexto real para quem está no destino agora.</p>
      </header>

      <div className="stack">
        {user ? (
          <form className="card" style={{ padding: '1.2rem' }} onSubmit={submit}>
            <div className="section-head" style={{ marginBottom: '0.7rem' }}>
              <div>
                <h3>Compartilhe um relato</h3>
                <p>Escreva de forma simples para ajudar outra pessoa a decidir rápido.</p>
              </div>
            </div>
            <div className="grid grid-2">
              <label className="field">Tipo de relato
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {RELATO_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
              <label className="field">Local
                <input value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} placeholder="Ex.: Jardim Botânico, Curitiba" />
              </label>
            </div>
            <label className="field">Descrição
              <textarea rows={2} maxLength={2000} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Ex.: lugar seguro, preço abusivo, dica útil..." />
            </label>
            <div className="composer-foot">
              <label className="field" style={{ margin: 0, minWidth: '180px', flex: 1 }}>Quando aconteceu?
                <select value={form.when} onChange={(e) => setForm({ ...form, when: e.target.value })}>
                  <option>Agora há pouco</option>
                  <option>Hoje</option>
                  <option>Nesta semana</option>
                  <option>Nesta viagem</option>
                </select>
              </label>
              <label className="check">
                <input type="checkbox" checked={form.anon} onChange={(e) => setForm({ ...form, anon: e.target.checked })} />
                Anônimo
              </label>
              <button className="btn btn-primary" type="submit" disabled={createReport.isPending}>
                {createReport.isPending ? 'Publicando…' : 'Publicar relato'}
              </button>
            </div>
          </form>
        ) : (
          <div className="card" style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h3>Entre para publicar relatos</h3>
              <p className="muted">Faça login ou crie uma conta para contribuir com a comunidade.</p>
            </div>
            <Link to="/app/profile" className="btn btn-primary">Entrar / Criar conta</Link>
          </div>
        )}

        <section>
          <div className="section-head"><div><h3>Atualizações recentes</h3><p>Relatos com valor prático para quem vai circular no destino.</p></div></div>
          <div className="stack" style={{ gap: '0.7rem' }}>
            {isLoading && <div className="empty">Carregando relatos…</div>}
            {!isLoading && !feed.length && <div className="empty">Ainda não há relatos. Seja a primeira pessoa a publicar.</div>}
            {feed.map((r) => <ReportCard key={r.id} report={r} loggedIn={!!user} />)}
          </div>
          {hasNextPage && (
            <div style={{ textAlign: 'center', marginTop: '0.9rem' }}>
              <button className="btn btn-ghost" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? 'Carregando…' : 'Carregar mais'}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ReportCard({ report: r, loggedIn }) {
  const { user } = useAuth();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const toggleLike = useToggleLike();
  const { data: comments, isLoading: loadingC } = useComments(r.id, open);
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();

  const onLike = () => {
    if (!loggedIn) return toast.info('Entre para curtir relatos.');
    toggleLike.mutate(r.id, { onError: (e) => toast.error(e.message) });
  };

  const onSend = async (e) => {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    try {
      await addComment.mutateAsync({ reportId: r.id, body });
      setText('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onRemoveComment = (id) =>
    deleteComment.mutate(
      { reportId: r.id, commentId: id },
      { onError: (e) => toast.error(e.message) }
    );

  return (
    <article className="card report-card" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', marginBottom: '0.5rem' }}>
        <Avatar name={r.authorName || 'Viajante'} gradient={r.authorAvatar} size={38} />
        <div style={{ flex: 1 }}>
          <strong>{r.authorName || 'Viajante'}</strong>
          <div className="a-meta">{r.place} · {r.when}</div>
        </div>
        <span className="relato-tag">{relatoLabel(r.type)}</span>
      </div>
      <p style={{ fontSize: '0.9rem' }}>{r.desc}</p>

      <div className="report-actions">
        <button
          type="button"
          className={'react-btn' + (r.likedByMe ? ' active' : '')}
          onClick={onLike}
          aria-pressed={r.likedByMe}
          aria-label={r.likedByMe ? 'Descurtir' : 'Curtir'}
        >
          <IconHeart style={{ width: 16, height: 16, fill: r.likedByMe ? 'currentColor' : 'none' }} />
          <span>{r.likes}</span>
        </button>
        <button type="button" className={'react-btn' + (open ? ' active' : '')} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <IconComment style={{ width: 16, height: 16 }} />
          <span>{r.comments}</span>
        </button>
      </div>

      {open && (
        <div className="comments">
          {loadingC && <div className="empty sm">Carregando comentários…</div>}
          {!loadingC && comments?.length === 0 && <div className="empty sm">Sem comentários ainda.</div>}
          {comments?.map((c) => (
            <div key={c.id} className="comment">
              <Avatar name={c.authorName} gradient={c.authorAvatar} size={28} />
              <div className="comment-body">
                <strong>{c.authorName}</strong>
                <p>{c.body}</p>
              </div>
              {user?.id === c.userId && (
                <button type="button" className="comment-del" onClick={() => onRemoveComment(c.id)} aria-label="Apagar comentário">×</button>
              )}
            </div>
          ))}

          {loggedIn ? (
            <form className="comment-form" onSubmit={onSend}>
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Escreva um comentário…" maxLength={400} />
              <button className="btn btn-primary sm" type="submit" disabled={addComment.isPending || !text.trim()}>
                {addComment.isPending ? '…' : 'Enviar'}
              </button>
            </form>
          ) : (
            <p className="empty sm">Entre para comentar.</p>
          )}
        </div>
      )}
    </article>
  );
}
