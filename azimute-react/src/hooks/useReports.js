// Camada de dados de relatos/curtidas/comentários com TanStack Query.
// Centraliza cache, paginação (infinite query), invalidação e optimistic updates.
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '../lib/api.js';
import { geocode } from '../lib/geo.js';

export const reportKeys = {
  all: ['reports'],
  feed: ['reports', 'feed'],
  mine: ['reports', 'mine'],
  map: ['reports', 'map'],
  comments: (id) => ['comments', id],
};

// Aplica uma transformação a um relato em qualquer formato de cache
// (infinite pages, { reports: [] } ou array simples).
function mapReport(data, id, fn) {
  if (!data) return data;
  if (data.pages) {
    return { ...data, pages: data.pages.map((p) => ({ ...p, reports: p.reports.map((r) => (r.id === id ? fn(r) : r)) })) };
  }
  if (Array.isArray(data.reports)) {
    return { ...data, reports: data.reports.map((r) => (r.id === id ? fn(r) : r)) };
  }
  if (Array.isArray(data)) return data.map((r) => (r.id === id ? fn(r) : r));
  return data;
}

// ---------- Queries ----------
export function useFeed() {
  const q = useInfiniteQuery({
    queryKey: reportKeys.feed,
    queryFn: ({ pageParam }) =>
      api.get(pageParam ? `/reports?cursor=${encodeURIComponent(pageParam)}` : '/reports'),
    initialPageParam: null,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });
  const reports = q.data?.pages.flatMap((p) => p.reports) ?? [];
  return { ...q, reports };
}

export function useMyReports(enabled = true) {
  const q = useQuery({
    queryKey: reportKeys.mine,
    queryFn: () => api.get('/reports/mine'),
    enabled,
  });
  return { ...q, reports: q.data?.reports ?? [] };
}

export function useMapReports() {
  const q = useQuery({ queryKey: reportKeys.map, queryFn: () => api.get('/reports?limit=100') });
  return { ...q, reports: q.data?.reports ?? [] };
}

export function useComments(reportId, enabled) {
  return useQuery({
    queryKey: reportKeys.comments(reportId),
    queryFn: () => api.get(`/reports/${reportId}/comments`).then((d) => d.comments),
    enabled: !!enabled,
  });
}

// ---------- Mutations ----------
// Geocodifica em segundo plano e persiste lat/lng (para o relato virar pin no mapa).
async function geocodeAndPatch(qc, report) {
  if (report.lat != null || !report.place) return;
  const coords = await geocode(report.place);
  if (!coords) return;
  await api.patch(`/reports/${report.id}`, { lat: coords[0], lng: coords[1] }).catch(() => {});
  qc.invalidateQueries({ queryKey: reportKeys.all });
}

export function useCreateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/reports', data).then((d) => d.report),
    onSuccess: (report) => {
      qc.invalidateQueries({ queryKey: reportKeys.all });
      geocodeAndPatch(qc, report);
    },
  });
}

export function useUpdateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }) => api.patch(`/reports/${id}`, patch).then((d) => d.report),
    onSuccess: (report, { patch }) => {
      qc.invalidateQueries({ queryKey: reportKeys.all });
      if (patch.place && report.lat == null) geocodeAndPatch(qc, report);
    },
  });
}

export function useDeleteReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.del(`/reports/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: reportKeys.all }),
  });
}

// Curtida com optimistic update: pinta na hora e reconcilia com o servidor.
export function useToggleLike() {
  const qc = useQueryClient();
  const flip = (r) => ({ ...r, likedByMe: !r.likedByMe, likes: r.likes + (r.likedByMe ? -1 : 1) });
  return useMutation({
    mutationFn: (id) => api.post(`/reports/${id}/like`),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: reportKeys.all });
      const prev = qc.getQueriesData({ queryKey: reportKeys.all });
      qc.setQueriesData({ queryKey: reportKeys.all }, (data) => mapReport(data, id, flip));
      return { prev };
    },
    onError: (_e, _id, ctx) => ctx?.prev?.forEach(([key, data]) => qc.setQueryData(key, data)),
    onSettled: () => qc.invalidateQueries({ queryKey: reportKeys.all }),
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ reportId, body }) =>
      api.post(`/reports/${reportId}/comments`, { body }).then((d) => d.comment),
    onSuccess: (comment, { reportId }) => {
      qc.setQueryData(reportKeys.comments(reportId), (old) => [...(old || []), comment]);
      qc.invalidateQueries({ queryKey: reportKeys.all }); // atualiza contagem
    },
  });
}

export function useDeleteComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId }) => api.del(`/comments/${commentId}`),
    onSuccess: (_d, { reportId, commentId }) => {
      qc.setQueryData(reportKeys.comments(reportId), (old) =>
        (old || []).filter((c) => c.id !== commentId)
      );
      qc.invalidateQueries({ queryKey: reportKeys.all });
    },
  });
}
