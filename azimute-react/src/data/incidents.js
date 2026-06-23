// Dados de exemplo (fontes oficiais + comunidade) usados no mapa e nos alertas.
export const INCIDENTS = [
  { id: 'o1', source: 'official', tone: 'warn', lat: -25.4385, lng: -49.2731, title: 'Fluxo intenso no Jardim Botânico', org: 'Setur Curitiba', when: 'Há 20 min', desc: 'Entrada principal com filas de excursão no fim da tarde. Comprar ingresso antecipado agiliza o acesso.' },
  { id: 'o3', source: 'official', tone: 'bad', lat: -25.4284, lng: -49.2733, title: 'Furto a turista no Centro Histórico', org: 'Polícia de Turismo', when: 'Hoje 14:20', desc: 'Visitante relatou furto de mochila em área de grande circulação na feira do Largo da Ordem.' },
  { id: 'o4', source: 'official', tone: 'warn', lat: -25.4416, lng: -49.2765, title: 'Fila elevada no Museu Oscar Niemeyer', org: 'Setur Curitiba', when: 'Há 35 min', desc: 'Movimento alto na bilheteria e estacionamento. Compra antecipada reduz a espera.' },
  { id: 'o6', source: 'official', tone: 'ok', lat: -25.4299, lng: -49.2679, title: 'Rua XV com apoio ampliado ao visitante', org: 'Instituto de Turismo', when: 'Hoje 10:10', desc: 'Agentes de turismo e sinalização bilíngue reforçada no eixo da Rua das Flores.' },
  { id: 'c1', source: 'community', tone: 'warn', lat: -25.4424, lng: -49.2789, title: 'Falso guia oferecendo city tour', org: 'Viajante verificado', when: 'Há 10 min', desc: 'Abordagem informal perto da Rua XV com cobrança antecipada e sem credencial visível.' },
  { id: 'c3', source: 'community', tone: 'ok', lat: -25.4419, lng: -49.2768, title: 'Torre Panorâmica bem avaliada', org: '9 relatos', when: 'Hoje 16:40', desc: 'Visitantes elogiam vista ampla, equipe cordial e entorno tranquilo no horário da tarde.' },
  { id: 'c5', source: 'community', tone: 'ok', lat: -25.4179, lng: -49.2697, title: 'Parque Tanguá tranquilo ao entardecer', org: '18 relatos', when: 'Hoje', desc: 'Boa opção para caminhar, vista bonita e movimento de famílias no fim da tarde.' },
  { id: 's1', source: 'support', tone: 'ok', lat: -25.4309, lng: -49.2712, title: 'Posto de apoio ao turista', org: 'Ponto de apoio', when: 'Aberto agora', desc: 'Informações, mapas e suporte em PT/EN/ES no centro de Curitiba.' },
  { id: 's2', source: 'support', tone: 'ok', lat: -25.4401, lng: -49.2760, title: 'Central de atendimento ao visitante', org: 'Ponto de apoio', when: 'Aberto agora', desc: 'Apoio rápido próximo aos principais museus da cidade.' },
];

export const CENTER = [-25.4357, -49.2733];
