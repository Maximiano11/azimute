export const TRAVELER_TYPES = [
  { v: 'tourist', label: '🧳 Turista' },
  { v: 'backpacker', label: '🎒 Mochileiro' },
  { v: 'family', label: '👨‍👩‍👧 Família' },
  { v: 'solo', label: '🌍 Viajante solo' },
  { v: 'cultural', label: '🏛️ Cultural' },
  { v: 'adventure', label: '🏔️ Aventura' },
];

export const RELATO_TYPES = [
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

export const travelerLabel = (v) => (TRAVELER_TYPES.find((t) => t.v === v) || { label: '🧳 Turista' }).label;
export const relatoLabel = (v) => (RELATO_TYPES.find((t) => t[0] === v) || ['', 'Relato'])[1];

// Mapeia o tipo de relato para um nível de confiança / cor no mapa.
export const relatoTone = (type) => {
  if (['dica', 'apoio'].includes(type)) return 'ok';
  if (['golpe-turista', 'zona-perigosa', 'taxi-pirata'].includes(type)) return 'bad';
  return 'warn';
};
