import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api.js';

// Índice de Confiança Azimute — recalculado pelo backend a cada chamada.
export function useIca() {
  return useQuery({
    queryKey: ['ica'],
    queryFn: () => api.get('/ica'),
    refetchInterval: 60000,
    staleTime: 30000,
  });
}
