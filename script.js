/* ===========================================================
   Azimute — rede social de viagem segura para turistas
   Roteamento OSRM, Nominatim, heatmap de alertas, horário,
   score de confiança, onboarding, dashboards de parceiros
   de turismo, i18n, PWA.
   =========================================================== */

/* ----- Estado ----- */
const state = {
  page: 'map',
  profile: 'car',
  theme: localStorage.getItem('az.theme') || 'dark',
  senior: localStorage.getItem('az.senior') === 'on',
  lang: localStorage.getItem('az.lang') || 'pt',
  time: -1, // -1 = agora; 0..23 hora
  layers: { heat:true, regions:false, official:true, community:false, lighting:false, safe:true },
  map: null,
  layerGroups: {},
  heatLayer: null,
  baseLayer: null,
  routeLayer: null,
  altLayer: null,
  avoidedLayer: null,
  routeOverlay: null,
  isoLayer: null,
  userMarker: null,
  routeStartMarker: null,
  routeEndMarker: null,
  fromCoord: [-25.4398, -49.2892],
  toCoord: [-25.3792, -49.2773],
  routeGeo: null,
  routeSteps: [],
  tripTimer: null,
  tripStart: null,
  tripStepIndex: 0,
  incidentMarkers: [],
  regionLayer: null,
  regions: [],
  ica: null,
  validations: {},
  liveTick: null,
  onbStep: 0,
  deferredPrompt: null,
  activeChatId: 'chat1',
};

const UI_COLORS = {
  bg:'#071216',
  bgLight:'#f6f8f7',
  route:'#43f3b0',
  routeBase:'rgba(3,10,13,.86)',
  routeAvoid:'rgba(159,180,185,.88)',
  primary:'#5b8def',
  primary2:'#27c7b8',
  ok:'#43d98f',
  warning:'#f4c45d',
  danger:'#ff6b6b',
  mapPinBorder:'rgba(255,255,255,.88)'
};

/* ----- Dados mocados ----- */
const DATA = {
  incidents: [
    {id:'o1', type:'official', severity:'med', lat:-25.4385, lng:-49.2731, title:'Fluxo intenso no Jardim Botânico', src:'Setur Curitiba', srcUrl:'https://turismo.curitiba.pr.gov.br/', when:'Há 20min', hour:19, desc:'Entrada principal com filas de excursão no fim da tarde. Comprar ingresso antecipado agiliza o acesso.', breakdown:{official:.48,community:.12,env:.06}},
    {id:'o2', type:'official', severity:'med', lat:-25.4410, lng:-54.4402, title:'Alerta de chuva nas Cataratas', src:'Defesa Civil PR', srcUrl:'https://www.defesacivil.pr.gov.br/', when:'Há 45min', hour:16, desc:'Trilhas próximas às passarelas podem ficar escorregadias. Levar capa e calçado com aderência.', photo:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cataratas_do_Igua%C3%A7u_%2818%29.JPG', breakdown:{official:.46,community:.05,env:.22}},
    {id:'o3', type:'official', severity:'high', lat:-25.4284, lng:-49.2733, title:'Furto a turista registrado no Centro Histórico', src:'Polícia de Turismo', srcUrl:'https://www.policiacivil.pr.gov.br/', when:'Hoje 14:20', hour:14, desc:'Visitante argentino relatou furto de mochila em área de grande circulação na feira do Largo da Ordem.', photo:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Largo_da_Ordem_%2829538659621%29.jpg', breakdown:{official:.58,community:.11,env:.05}},
    {id:'o4', type:'official', severity:'med', lat:-25.4416, lng:-49.2765, title:'Fila elevada no Museu Oscar Niemeyer', src:'Setur Curitiba', srcUrl:'https://turismo.curitiba.pr.gov.br/', when:'Há 35min', hour:15, desc:'Movimento alto na bilheteria e estacionamento. Compra antecipada reduz espera no MON.', photo:'https://commons.wikimedia.org/wiki/Special:Redirect/file/MON_Museu_Oscar_Niemeyer.jpg', breakdown:{official:.42,community:.09,env:.05}},
    {id:'o5', type:'official', severity:'med', lat:-25.5107, lng:-54.5854, title:'Operação reforçada na entrada da Itaipu', src:'Itaipu Binacional', srcUrl:'https://www.turismoitaipu.com.br/', when:'Há 50min', hour:11, desc:'Controle extra de acesso e revista leve no circuito turístico da usina. Chegar com antecedência.', breakdown:{official:.44,community:.06,env:.04}},
    {id:'o6', type:'official', severity:'low', lat:-25.4299, lng:-49.2679, title:'Rua XV com apoio ampliado ao visitante', src:'Instituto Municipal de Turismo', srcUrl:'https://turismo.curitiba.pr.gov.br/', when:'Hoje 10:10', hour:10, desc:'Agentes de turismo e sinalização bilíngue reforçada no eixo da Rua das Flores.', photo:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Rua_XV_em_Curitiba.jpg', breakdown:{official:.18,community:.04,env:.02}},
    {id:'c1', type:'community', severity:'med', lat:-25.4424, lng:-49.2789, title:'Falso guia oferecendo city tour', src:'Viajante verificado', srcUrl:'https://azimute.app/comunidade', when:'Há 10min', hour:13, desc:'Abordagem informal perto da Rua XV com cobrança antecipada e sem credencial visível.', breakdown:{official:.08,community:.44,env:.08}},
    {id:'c2', type:'community', severity:'high', lat:-25.5163, lng:-48.5225, title:'Golpe de passeio superfaturado', src:'4 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 1h', hour:23, desc:'Turistas em Paranaguá relataram cobrança abusiva por traslado até a Ilha do Mel sem confirmação de embarque.', breakdown:{official:.1,community:.62,env:.14}},
    {id:'c3', type:'community', severity:'low', lat:-25.5478, lng:-48.5592, title:'Cais de Morretes recomendado para passeio', src:'18 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje', hour:18, desc:'Movimento tranquilo no fim da tarde, boa opção para provar barreado e caminhar pelo centro histórico.', breakdown:{official:.05,community:.15,env:.03}},
    {id:'c4', type:'community', severity:'med', lat:-8.0622, lng:-34.8711, title:'Cobrança abusiva em restaurante turístico', src:'Viajante verificado', srcUrl:'https://azimute.app/comunidade', when:'Há 2h', hour:15, desc:'Cardápio com preço diferente para turistas na região do Recife Antigo.', breakdown:{official:.08,community:.34,env:.04}},
    {id:'c5', type:'community', severity:'low', lat:-25.4419, lng:-49.2768, title:'Mirante da Torre Panorâmica bem avaliado', src:'9 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje 16:40', hour:16, desc:'Visitantes elogiam vista ampla, equipe cordial e entorno tranquilo no horário da tarde.', breakdown:{official:.04,community:.18,env:.03}},
    {id:'c6', type:'community', severity:'med', lat:-25.5451, lng:-54.5882, title:'Abordagem insistente por táxi informal no aeroporto', src:'6 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 25min', hour:9, desc:'Turistas relataram oferta de corrida sem taxímetro na saída do terminal de Foz.', breakdown:{official:.08,community:.39,env:.06}},
    {id:'c7', type:'community', severity:'low', lat:-25.4428, lng:-54.4412, title:'Circuito das passarelas elogiado por famílias', src:'22 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje 12:30', hour:12, desc:'Boa sinalização, ônibus interno frequente e sensação de segurança ao longo do passeio nas Cataratas.', breakdown:{official:.05,community:.21,env:.04}},
    {id:'c8', type:'community', severity:'med', lat:-25.4323, lng:-49.2712, title:'Cobrança confusa em feira de artesanato', src:'3 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 1h', hour:17, desc:'Estrangeiros relataram dificuldade com preços sem etiqueta no entorno do Largo da Ordem.', breakdown:{official:.05,community:.33,env:.04}},
    {id:'c9', type:'community', severity:'high', lat:-25.4397, lng:-49.2748, title:'Tentativa de furto de celular perto do Jardim Botânico', src:'7 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 18min', hour:18, desc:'Turistas relataram abordagem rápida em área de foto na saída do Jardim Botânico.', breakdown:{official:.09,community:.51,env:.07}},
    {id:'c10', type:'community', severity:'high', lat:-25.4412, lng:-49.2761, title:'Roubo de mochila no entorno do MON', src:'5 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje 15:10', hour:15, desc:'Visitantes relatam distração durante fila e subtração de pertences próximos ao museu.', breakdown:{official:.08,community:.49,env:.06}},
    {id:'c11', type:'community', severity:'high', lat:-25.4305, lng:-49.2688, title:'Golpe de falsa doação na Rua XV', src:'11 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 22min', hour:16, desc:'Abordagem em grupo usando prancheta para distrair turistas e pedir contribuição em dinheiro.', photo:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Rua_XV_em_Curitiba.jpg', breakdown:{official:.07,community:.53,env:.05}},
    {id:'c12', type:'community', severity:'high', lat:-25.4423, lng:-54.4407, title:'Furto de carteira nas passarelas das Cataratas', src:'4 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 55min', hour:13, desc:'Mochilas abertas em pontos de maior aglomeração perto das quedas principais.', breakdown:{official:.08,community:.47,env:.06}},
    {id:'c13', type:'community', severity:'high', lat:-25.5109, lng:-54.5846, title:'Golpe com ingresso falso na Itaipu', src:'3 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje 11:20', hour:11, desc:'Turistas relataram oferta de entrada sem fila por vendedores sem vínculo oficial.', breakdown:{official:.08,community:.46,env:.05}},
    {id:'c14', type:'community', severity:'high', lat:-25.5454, lng:-54.5888, title:'Assalto após corrida irregular no aeroporto', src:'2 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje 09:40', hour:9, desc:'Viajantes desceram fora do trajeto combinado e relataram perda de bagagem e objetos pessoais.', breakdown:{official:.1,community:.55,env:.07}},
    {id:'c15', type:'community', severity:'high', lat:-25.5476, lng:-48.5590, title:'Golpe em venda de passeio ferroviário em Morretes', src:'4 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 1h', hour:14, desc:'Cobrança antecipada por pacote inexistente no entorno do cais e da estação.', breakdown:{official:.08,community:.5,env:.05}},
    {id:'c16', type:'community', severity:'high', lat:-25.5161, lng:-48.5222, title:'Roubo de bagagem próximo ao cais de Paranaguá', src:'5 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje 17:30', hour:17, desc:'Turistas distraídos com o embarque tiveram mochilas levadas em segundos.', breakdown:{official:.09,community:.54,env:.06}},
    {id:'c17', type:'community', severity:'high', lat:-8.0620, lng:-34.8708, title:'Golpe com cardápio duplicado no Recife Antigo', src:'8 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 35min', hour:20, desc:'Grupo relatou pressão para pagar valores acima do anunciado em área turística.', breakdown:{official:.08,community:.48,env:.05}},
    {id:'c18', type:'community', severity:'high', lat:-22.9517, lng:-43.2103, title:'Tentativa de sequestro relâmpago após corrida irregular', src:'2 relatos', srcUrl:'https://azimute.app/comunidade', when:'Ontem 22:10', hour:22, desc:'Turistas relatam embarque em veículo não credenciado com desvio de trajeto no entorno do Pão de Açúcar.', breakdown:{official:.11,community:.57,env:.08}},
    {id:'c19', type:'community', severity:'high', lat:-12.9718, lng:-38.5108, title:'Assalto por dupla em área histórica', src:'6 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje 18:05', hour:18, desc:'Relatos de roubo de celular e bolsa em rua lateral com menor circulação perto do centro turístico.', breakdown:{official:.09,community:.52,env:.06}},
    {id:'c20', type:'community', severity:'high', lat:-25.4365, lng:-49.2864, title:'Furto de celular em rua lateral do Batel', src:'5 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 28min', hour:19, desc:'Turistas saindo de hotel relataram abordagem rápida em rua menos movimentada paralela ao eixo principal do Batel.', breakdown:{official:.08,community:.5,env:.06}},
    {id:'c21', type:'community', severity:'high', lat:-25.4243, lng:-49.2814, title:'Roubo a pedestre em desvio curto no Centro', src:'4 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje 17:40', hour:18, desc:'Relatos em rua lateral entre o Batel e o Centro, fora do corredor mais iluminado que segue ao Centro Cívico.', breakdown:{official:.09,community:.52,env:.06}},
    {id:'c22', type:'community', severity:'high', lat:-25.4116, lng:-49.2798, title:'Golpe de falso flanelinha perto do Centro Cívico', src:'6 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 45min', hour:16, desc:'Motoristas foram pressionados a pagar por vaga em rua lateral, fora do eixo principal recomendado para seguir ao norte.', breakdown:{official:.08,community:.47,env:.05}},
    {id:'c23', type:'community', severity:'high', lat:-25.3948, lng:-49.2839, title:'Tentativa de roubo em rua de acesso ao Tanguá', src:'3 relatos', srcUrl:'https://azimute.app/comunidade', when:'Hoje 18:20', hour:18, desc:'Ocorrência registrada em acesso secundário e mais vazio ao parque. Viajantes recomendam chegada pela via principal.', breakdown:{official:.09,community:.48,env:.06}},
    {id:'c24', type:'community', severity:'med', lat:-25.3789, lng:-49.2768, title:'Mirante do Tanguá com fluxo tranquilo no fim da tarde', src:'12 relatos', srcUrl:'https://azimute.app/comunidade', when:'Há 12min', hour:17, desc:'Visitantes relatam boa presença de famílias e sensação de segurança na área principal do parque e mirante.', breakdown:{official:.05,community:.24,env:.04}},
    {id:'o7', type:'official', severity:'low', lat:-25.3792, lng:-49.2773, title:'Parque Tanguá com apoio e patrulha turística no pôr do sol', src:'Curitiba Turismo', srcUrl:'https://turismo.curitiba.pr.gov.br/', when:'Hoje 17:10', hour:17, desc:'Guarda municipal e equipe de apoio reforçam a área principal do parque nos horários de maior visitação.', photo:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Parque_Tangu%C3%A1_Curitiba.jpg', breakdown:{official:.2,community:.04,env:.02}},
    {id:'l1', type:'lighting', severity:'med', lat:-25.4409, lng:-49.2767, title:'Iluminação reduzida após o fechamento do museu', src:'Sensor + comunidade', srcUrl:'https://azimute.app/comunidade', when:'Após 20h', hour:21, desc:'Trecho lateral do Jardim Botânico fica mais vazio à noite. Prefira transporte por app no retorno.', breakdown:{official:.04,community:.12,env:.31}},
    {id:'l2', type:'lighting', severity:'med', lat:-27.5954, lng:-48.5480, title:'Saída da orla com baixa iluminação', src:'Comunidade', srcUrl:'https://azimute.app/comunidade', when:'Noite', hour:22, desc:'Na volta do pôr do sol na Beira-Mar Norte, alguns quarteirões laterais têm pouca movimentação.', breakdown:{official:.03,community:.17,env:.27}},
    {id:'l3', type:'lighting', severity:'med', lat:-25.4306, lng:-49.2701, title:'Trecho lateral do Centro Histórico escurece cedo', src:'Comunidade', srcUrl:'https://azimute.app/comunidade', when:'Após 19h', hour:20, desc:'Ruas menores perto do Largo ficam com baixa circulação depois do fechamento das lojas.', breakdown:{official:.03,community:.14,env:.26}},
    {id:'l4', type:'lighting', severity:'med', lat:-25.4446, lng:-54.4429, title:'Acesso ao estacionamento com pouca luz', src:'Sensor + comunidade', srcUrl:'https://azimute.app/comunidade', when:'Noite', hour:21, desc:'Trecho de retorno das Cataratas para o estacionamento tem visibilidade menor após o pôr do sol.', breakdown:{official:.02,community:.12,env:.29}},
    {id:'l5', type:'lighting', severity:'med', lat:-25.3938, lng:-49.2848, title:'Rua lateral ao Tanguá fica vazia após 19h', src:'Comunidade', srcUrl:'https://azimute.app/comunidade', when:'Após 19h', hour:20, desc:'Quem sai do parque por acesso secundário encontra iluminação irregular e pouco movimento.', breakdown:{official:.03,community:.13,env:.28}},
    {id:'s1', type:'safe', severity:'low', lat:-25.4297, lng:-49.2719, title:'Posto de informação ao turista', src:'Instituto Municipal de Turismo', srcUrl:'https://turismo.curitiba.pr.gov.br/', when:'24h', hour:12, desc:'Atendimento em pt/en/es e mapas gratuitos próximos ao Paço da Liberdade.', breakdown:{official:.02,community:.05,env:.01}},
    {id:'s2', type:'safe', severity:'low', lat:-25.4428, lng:-54.4400, title:'Base de apoio ao visitante do Parque Nacional', src:'ICMBio + comunidade', srcUrl:'https://www.gov.br/icmbio/pt-br/assuntos/visitacao/unidades-abertas-a-visitacao/parna-do-iguacu', when:'24h', hour:12, desc:'Equipe orienta sobre trilhas, ônibus interno e acessibilidade nas Cataratas do Iguaçu.', breakdown:{official:.03,community:.04,env:.02}},
    {id:'s3', type:'safe', severity:'low', lat:-22.9519, lng:-43.2105, title:'Quiosque de apoio ao turista', src:'Setur Rio', srcUrl:'https://riotur.rio/', when:'24h', hour:11, desc:'Orientações em vários idiomas no entorno do Bondinho do Pão de Açúcar.', breakdown:{official:.02,community:.05,env:.01}},
    {id:'s4', type:'safe', severity:'low', lat:-25.4412, lng:-49.2761, title:'Base de apoio no MON', src:'Curitiba Turismo', srcUrl:'https://turismo.curitiba.pr.gov.br/', when:'24h', hour:14, desc:'Equipe orienta sobre ingressos, guarda-volumes e acessibilidade no Museu Oscar Niemeyer.', breakdown:{official:.03,community:.04,env:.01}},
    {id:'s5', type:'safe', severity:'low', lat:-25.5114, lng:-54.5836, title:'Central de apoio turístico em Itaipu', src:'Itaipu Turismo', srcUrl:'https://www.turismoitaipu.com.br/', when:'24h', hour:10, desc:'Ponto com informações sobre circuito panorâmico, ônibus interno e visitas técnicas.', breakdown:{official:.03,community:.04,env:.01}},
    {id:'s6', type:'safe', severity:'low', lat:-25.3794, lng:-49.2770, title:'Apoio ao visitante no eixo principal do Parque Tanguá', src:'Curitiba Turismo', srcUrl:'https://turismo.curitiba.pr.gov.br/', when:'24h', hour:17, desc:'Ponto com orientação de acesso, estacionamento e retorno seguro pela via principal do parque.', breakdown:{official:.03,community:.04,env:.01}}
  ],
  alerts: [
    {id:1, src:'oficial', title:'Curitiba reforça orientação a turistas no Centro Histórico', when:'há 20 min', desc:'Guarda municipal ampliou apoio na feira do Largo da Ordem durante o fim de semana.', area:'Curitiba, PR', severity:'alto'},
    {id:2, src:'oficial', title:'Acesso às Cataratas com operação ajustada pela chuva', when:'há 45 min', desc:'Parque recomenda reprogramar passeios nas passarelas em horários de maior instabilidade.', area:'Foz do Iguaçu, PR', severity:'med'},
    {id:3, src:'comunidade', title:'Passeio de barco vendido sem voucher confirmado', when:'há 10 min', desc:'Turistas em Paranaguá relataram abordagem informal na área portuária rumo à Ilha do Mel.', area:'Paranaguá, PR', severity:'med'},
    {id:4, src:'comunidade', title:'Jardim Botânico elogiado por viajantes', when:'há 30 min', desc:'Famílias destacam segurança, sinalização e estrutura de apoio no circuito principal.', area:'Curitiba, PR', severity:'baixo'},
    {id:5, src:'oficial', title:'Operação especial de turismo no feriado', when:'hoje 14:20', desc:'Reforço de monitoramento em embarques da Serra Verde Express e polos gastronômicos.', area:'Morretes, PR', severity:'alto'},
    {id:6, src:'comunidade', title:'Cobrança dupla em restaurante de área histórica', when:'há 2h', desc:'Dois viajantes registraram divergência entre valor do menu exibido e conta final.', area:'Recife Antigo, PE', severity:'med'},
    {id:7, src:'oficial', title:'Museu Oscar Niemeyer opera com fluxo alto no fim da tarde', when:'há 25 min', desc:'Curitiba Turismo recomenda compra antecipada e atenção ao estacionamento do MON.', area:'Curitiba, PR', severity:'med'},
    {id:8, src:'comunidade', title:'Táxi informal insistente na saída do aeroporto', when:'há 25 min', desc:'Viajantes em Foz orientam usar app ou táxi credenciado na área oficial de embarque.', area:'Foz do Iguaçu, PR', severity:'alto'},
    {id:9, src:'oficial', title:'Itaipu com acesso reforçado para visitas panorâmicas', when:'há 1h', desc:'Chegar com antecedência mínima de 30 minutos para o circuito turístico da usina.', area:'Foz do Iguaçu, PR', severity:'med'},
    {id:10, src:'comunidade', title:'Rua XV segura e bem movimentada no início da noite', when:'há 40 min', desc:'Turistas relatam boa presença de pessoas e comércio aberto no eixo central de Curitiba.', area:'Curitiba, PR', severity:'baixo'},
    {id:11, src:'oficial', title:'Parque Tanguá com reforço no acesso principal no fim da tarde', when:'há 15 min', desc:'Curitiba Turismo orienta chegada pela via principal e informa apoio ampliado na área do mirante.', area:'Curitiba, PR', severity:'baixo'},
  ],
  news: [
    {src:'Embratur', icon:'🌐', title:'Brasil entra em campanha global para atrair turistas em 2026', date:'hoje'},
    {src:'Ministério do Turismo', icon:'🏛️', title:'Programa Selo Confiança certifica novas hospedagens no Paraná', date:'há 2 dias'},
    {src:'Defesa Civil', icon:'⚠️', title:'Alerta de chuvas fortes pode afetar tours no litoral paranaense nas próximas 48h', date:'há 5h'},
    {src:'Agência Brasil', icon:'📰', title:'Turismo: governo amplia rede de guias credenciados em capitais', date:'ontem'},
    {src:'Viaje Paraná', icon:'🗺️', title:'Rota gastronômica de Morretes ganha programação ampliada para feriado', date:'hoje'},
    {src:'Lonely Planet', icon:'📔', title:'10 erros que turistas estrangeiros cometem no Brasil — e como evitar', date:'há 3 dias'}
  ],
  groups: [
    {name:'Roteiro Paraná · feriado', members:'312 ativos', emoji:'🎒'},
    {name:'Viajantes solo · Sul do Brasil', members:'128 ativos', emoji:'🌍'},
    {name:'Famílias em Foz do Iguaçu', members:'94 ativos', emoji:'👨‍👩‍👧'},
    {name:'Foodies em Morretes e Antonina', members:'56 ativos', emoji:'🍽️'}
  ],
  stories: [
    {name:'Seu story', area:'Curitiba agora', avatar:'https://i.pravatar.cc/80?img=12', cover:'linear-gradient(180deg, rgba(7,18,22,.12), rgba(7,18,22,.92)), linear-gradient(135deg, #5b8def, #27c7b8)', mine:true},
    {name:'Lívia C.', area:'Cataratas', avatar:'https://i.pravatar.cc/80?img=32', cover:'linear-gradient(180deg, rgba(7,18,22,.1), rgba(7,18,22,.92)), linear-gradient(135deg, #27c7b8, #43d98f)', seen:false},
    {name:'Rafa M.', area:'Jardim Botânico', avatar:'https://i.pravatar.cc/80?img=5', cover:'linear-gradient(180deg, rgba(7,18,22,.12), rgba(7,18,22,.92)), linear-gradient(135deg, #f4c45d, #d98f43)', seen:true},
    {name:'Beatriz O.', area:'MON', avatar:'https://i.pravatar.cc/80?img=47', cover:'linear-gradient(180deg, rgba(7,18,22,.12), rgba(7,18,22,.92)), linear-gradient(135deg, #ff8a6b, #ff6b6b)', seen:false},
    {name:'Carlos R.', area:'Itaipu', avatar:'https://i.pravatar.cc/80?img=15', cover:'linear-gradient(180deg, rgba(7,18,22,.12), rgba(7,18,22,.92)), linear-gradient(135deg, #58b7d8, #27c7b8)', seen:true},
    {name:'Maya T.', area:'Marco das Três Fronteiras', avatar:'https://i.pravatar.cc/80?img=11', cover:'linear-gradient(180deg, rgba(7,18,22,.12), rgba(7,18,22,.92)), linear-gradient(135deg, #43d98f, #27c7b8)', seen:false},
    {name:'João P.', area:'Rua XV', avatar:'https://i.pravatar.cc/80?img=20', cover:'linear-gradient(180deg, rgba(7,18,22,.12), rgba(7,18,22,.92)), linear-gradient(135deg, #5b8def, #58b7d8)', seen:true},
    {name:'Nina S.', area:'Pelourinho', avatar:'https://i.pravatar.cc/80?img=25', cover:'linear-gradient(180deg, rgba(7,18,22,.12), rgba(7,18,22,.92)), linear-gradient(135deg, #8b7cf6, #ff8a6b)', seen:false}
  ],
  people: [
    {name:'Rafa M.', role:'Mochileiro · em Curitiba', avatar:'https://i.pravatar.cc/80?img=5'},
    {name:'Lívia C.', role:'Viajante solo · 1ª vez em Foz', avatar:'https://i.pravatar.cc/80?img=32'},
    {name:'Carlos R.', role:'Família em férias · roteiro no Paraná', avatar:'https://i.pravatar.cc/80?img=15'},
    {name:'Beatriz O.', role:'Local · guia cultural em Curitiba', avatar:'https://i.pravatar.cc/80?img=47'},
    {name:'Maya T.', role:'Viajante em Foz · circuito Itaipu', avatar:'https://i.pravatar.cc/80?img=11'},
    {name:'João P.', role:'Morando em Curitiba · foodie e cafés', avatar:'https://i.pravatar.cc/80?img=20'}
  ],
  posts: [
    {user:'Rafa M.', avatar:'https://i.pravatar.cc/80?img=5', when:'há 20 min', body:'Acabei de sair do Jardim Botânico de Curitiba. Tudo bem organizado e com bastante família no local. Vale chegar cedo para fotos mais vazias.', likes:42, comments:8, area:'Curitiba, PR'},
    {user:'Lívia C.', avatar:'https://i.pravatar.cc/80?img=32', when:'há 1h', body:'Alguém topa dividir transfer amanhã cedo para as Cataratas? Vou sozinha e quero fazer o circuito das passarelas com mais gente.', likes:28, comments:9, area:'Foz do Iguaçu, PR'},
    {user:'Maya T.', avatar:'https://i.pravatar.cc/80?img=11', when:'há 35 min', body:'Fiz Itaipu + Marco das Três Fronteiras no mesmo dia em Foz. Dá certo, mas precisa sair cedo e deixar o pôr do sol para o marco.', likes:37, comments:6, area:'Foz do Iguaçu, PR'},
    {user:'João P.', avatar:'https://i.pravatar.cc/80?img=20', when:'há 50 min', body:'Se estiver em Curitiba no fim da tarde, MON + Bosque do Papa funciona muito bem. Só não deixem para voltar a pé muito tarde nas ruas laterais.', likes:54, comments:11, area:'Curitiba, PR'},
    {user:'Clara N.', avatar:'https://i.pravatar.cc/80?img=29', when:'há 14 min', body:'Cheguei ao Parque Tanguá vindo do Batel por app e foi bem tranquilo pela rota principal. Evitem ruas secundárias na chegada ao parque no fim do dia.', likes:33, comments:5, area:'Curitiba, PR'},
    {user:'Carlos R.', avatar:'https://i.pravatar.cc/80?img=15', when:'há 2h', body:'Pegamos o trem até Morretes e foi um dos passeios mais bonitos da viagem. Só fiquem atentos com vendedores oferecendo combos fechados sem cardápio claro.', likes:95, comments:21, area:'Morretes, PR'},
    {user:'Beatriz O.', avatar:'https://i.pravatar.cc/80?img=47', when:'há 3h', body:'Para quem vai ao Pelourinho, recomendo contratar guia credenciado no posto oficial. Evita abordagem insistente e ajuda muito no contexto histórico.', likes:61, comments:12, area:'Salvador, BA'}
  ],
  chats: [
    {
      id:'chat1',
      name:'Lívia C.',
      avatar:'https://i.pravatar.cc/80?img=32',
      area:'Foz do Iguaçu',
      last:'Fechei o transfer das 7h para as Cataratas.',
      when:'agora',
      unread:2,
      messages:[
        {from:'them', text:'Oi! Você ainda vai amanhã cedo para as Cataratas?', time:'08:10'},
        {from:'me', text:'Vou sim. Estou saindo do hotel perto do centro.', time:'08:12'},
        {from:'them', text:'Fechei o transfer das 7h para as Cataratas.', time:'08:14'},
        {from:'them', text:'Se quiser dividir, fica mais barato e a volta já está incluída.', time:'08:15'}
      ]
    },
    {
      id:'chat2',
      name:'Rafa M.',
      avatar:'https://i.pravatar.cc/80?img=5',
      area:'Curitiba',
      last:'No MON a fila está bem tranquila agora.',
      when:'12 min',
      unread:0,
      messages:[
        {from:'them', text:'Passei no Jardim Botânico e estou indo para o MON.', time:'14:03'},
        {from:'me', text:'Boa. O movimento está de boa por aí?', time:'14:05'},
        {from:'them', text:'No MON a fila está bem tranquila agora.', time:'14:08'}
      ]
    },
    {
      id:'chat3',
      name:'Grupo · Paraná seguro',
      avatar:'https://i.pravatar.cc/80?img=15',
      area:'Grupo comunitário',
      last:'Evitem corridas fora do app no aeroporto de Foz.',
      when:'35 min',
      unread:5,
      messages:[
        {from:'them', text:'Pessoal, alerta rápido: evitem corridas fora do app no aeroporto de Foz.', time:'11:20'},
        {from:'them', text:'Dois viajantes relataram abordagem insistente na saída do terminal.', time:'11:22'},
        {from:'me', text:'Boa. Vou colocar isso no meu planejamento de chegada.', time:'11:25'}
      ]
    }
  ]
};

/* ----- Destinos turísticos monitorados (polígonos aproximados) ----- */
const REGIONS = [
  { id:'curitiba-botanico', name:'Curitiba · Jardim Botânico', center:[-25.4385,-49.2731], radius:560, ica:83, trend:'flat', delta:0, sources:{official:.82,community:.85,predict:.79} },
  { id:'curitiba-historico', name:'Curitiba · Largo da Ordem', center:[-25.4284,-49.2733], radius:480, ica:63, trend:'up', delta:+3, sources:{official:.68,community:.61,predict:.56} },
  { id:'curitiba-mon', name:'Curitiba · MON e Centro Cívico', center:[-25.4416,-49.2765], radius:500, ica:79, trend:'flat', delta:+1, sources:{official:.77,community:.78,predict:.74} },
  { id:'curitiba-rua-xv', name:'Curitiba · Rua XV e Centro', center:[-25.4302,-49.2680], radius:470, ica:74, trend:'up', delta:+2, sources:{official:.72,community:.73,predict:.67} },
  { id:'curitiba-tangua', name:'Curitiba · Parque Tanguá', center:[-25.3792,-49.2773], radius:520, ica:82, trend:'flat', delta:+1, sources:{official:.79,community:.8,predict:.74} },
  { id:'foz-cataratas', name:'Foz do Iguaçu · Cataratas', center:[-25.4410,-54.4402], radius:620, ica:76, trend:'down', delta:-2, sources:{official:.78,community:.74,predict:.72} },
  { id:'foz-itaipu', name:'Foz do Iguaçu · Itaipu', center:[-25.5107,-54.5854], radius:540, ica:81, trend:'flat', delta:+1, sources:{official:.82,community:.76,predict:.75} },
  { id:'foz-centro', name:'Foz do Iguaçu · Centro e aeroporto', center:[-25.5451,-54.5882], radius:520, ica:61, trend:'up', delta:+3, sources:{official:.63,community:.59,predict:.55} },
  { id:'morretes-centro', name:'Morretes · Centro Histórico', center:[-25.4767,-48.8345], radius:430, ica:80, trend:'flat', delta:+1, sources:{official:.74,community:.81,predict:.73} },
  { id:'paranagua-cais', name:'Paranaguá · Cais turístico', center:[-25.5163,-48.5225], radius:450, ica:57, trend:'up', delta:+4, sources:{official:.59,community:.58,predict:.52} }
];

const OFFICIAL_SOURCES = [
  { name:'Embratur', status:'online', latency:'12s' },
  { name:'Ministério do Turismo', status:'online', latency:'3min' },
  { name:'Defesa Civil', status:'online', latency:'1min' },
  { name:'Setur · Secretarias municipais', status:'online', latency:'5min' },
  { name:'Itamaraty · alertas consulares', status:'online', latency:'8min' },
  { name:'Lonely Planet · safety bulletins', status:'online', latency:'10min' },
  { name:'TripAdvisor · safety signals', status:'sync', latency:'15min' },
  { name:'Polícia de Turismo', status:'online', latency:'2min' }
];

const DEMO_CURITIBA_ROUTE = {
  from: [-25.4398, -49.2892],
  to: [-25.3792, -49.2773],
  waypoint: [-25.4199, -49.2766]
};

const DEMO_JOURNEYS = {
  'curitiba-safe': {
    fromLabel:'Qoya Hotel Curitiba, Batel',
    toLabel:'Parque Tanguá, Curitiba',
    from:[-25.4398, -49.2892],
    to:[-25.3792, -49.2773],
    profile:'car',
    hour:17
  },
  'foz-family': {
    fromLabel:'Aeroporto de Foz do Iguaçu',
    toLabel:'Cataratas do Iguaçu',
    from:[-25.5451, -54.5882],
    to:[-25.4410, -54.4402],
    profile:'car',
    hour:9
  },
  'morretes-day': {
    fromLabel:'Estação Ferroviária de Morretes',
    toLabel:'Centro Histórico de Morretes',
    from:[-25.4767, -48.8359],
    to:[-25.4761, -48.8346],
    profile:'walk',
    hour:13
  }
};

const DESTINATION_GUIDES = [
  {
    match:['Parque Tanguá', 'Tanguá'],
    title:'Parque Tanguá',
    best:'17h a 18h30',
    support:'apoio no acesso principal',
    alert:'evite ruas secundárias após 19h',
    photo:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Parque_Tangu%C3%A1_Curitiba.jpg',
    tip:'chegue e retorne pela via principal'
  },
  {
    match:['Cataratas', 'Iguaçu'],
    title:'Cataratas do Iguaçu',
    best:'8h a 10h',
    support:'base do visitante no parque',
    alert:'atenção a furtos em aglomeração',
    photo:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cataratas_do_Igua%C3%A7u_%2818%29.JPG',
    tip:'use o ônibus interno e guarde documentos'
  },
  {
    match:['Morretes'],
    title:'Centro Histórico de Morretes',
    best:'11h a 15h',
    support:'apoio turístico no eixo central',
    alert:'cuidado com pacotes informais',
    photo:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Esta%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Morretes.jpg',
    tip:'prefira vendas com cardápio e preço claro'
  }
];

/* ----- i18n ----- */
const I18N = {
  pt: {
    'lnd.nav.map':'Mapa','lnd.nav.forTravelers':'Para quem viaja','lnd.nav.diff':'Diferencial','lnd.nav.community':'Comunidade',
    'lnd.login':'Entrar','lnd.openMap':'Ver mapa em ação',
    'lnd.tag':'Dados confiáveis para quem está viajando',
    'lnd.hero.title':'Viaje com mais confiança em qualquer destino.',
    'lnd.hero.lede':'O Azimute cruza comunidade, alertas oficiais e contexto do lugar para transformar risco em decisão rápida para o viajante.',
    'lnd.hero.scale':'Começa com mocks no Paraná, mas escala por cidade, rota e destino turístico sem refazer a base.',
    'lnd.hero.problemLabel':'O problema','lnd.hero.problem':'Decisão sem contexto',
    'lnd.hero.solutionLabel':'A resposta','lnd.hero.solution':'Risco vira ação',
    'lnd.hero.cta1':'Abrir mapa confiável','lnd.hero.cta2':'Entender o diferencial',
    'lnd.proof.map':'Mapa funcional','lnd.proof.support':'Apoio perto','lnd.proof.fast':'Leitura rápida','lnd.proof.scale':'Escala por destino',
    'lnd.stats.pilot':'Piloto local','lnd.stats.pilotSub':'mocks no Paraná','lnd.stats.sources':'3 fontes','lnd.stats.sourcesSub':'oficial, comunidade e contexto','lnd.stats.scale':'Escala fácil','lnd.stats.scaleSub':'por cidade, rota e destino',
    'lnd.mapcard.title':'Rota mais confiável','lnd.mapcard.risk':'+38% confiança','lnd.mapcard.insight1':'Golpes recentes','lnd.mapcard.insight2':'Pontos de apoio','lnd.mapcard.insight3':'Janela mais segura','lnd.mapcard.reading':'Leitura do trajeto','lnd.mapcard.signals':'Sinais no entorno','lnd.mapcard.signalsValue':'3 áreas de atenção',
    'lnd.legend.safe':'Rota recomendada','lnd.legend.risk':'Áreas de atenção',
    'lnd.features.title':'Mapa, sinal e ação',
    'lnd.feat.route.t':'Deslocamento confiável','lnd.feat.route.d':'Mostra a rota mais coerente e o caminho que faz mais sentido para quem está fora de casa.',
    'lnd.feat.official.t':'Leitura de risco simples','lnd.feat.official.d':'Transforma sinais dispersos em alerta claro, apoio próximo e contexto útil.',
    'lnd.feat.community.t':'Comunidade útil','lnd.feat.community.d':'Relatos curtos por lugar para orientar o próximo viajante sem ruído social.',
    'lnd.feat.alerts.t':'Acessível desde a origem','lnd.feat.alerts.d':'Fluxo guiado, linguagem direta e contraste alto para idosos, PCD e leigos.',
    'lnd.partners.title':'Feito para quem viaja de verdade',
    'lnd.persona.tourists.t':'Turistas em férias','lnd.persona.tourists.d':'Saem do hotel, escolhem o destino e entendem rápido por onde ir e o que evitar.',
    'lnd.persona.family.t':'Famílias e 60+','lnd.persona.family.d':'Ganham leitura mais calma, apoio próximo e trajetos que evitam confusão desnecessária.',
    'lnd.persona.solo.t':'Viajantes solo','lnd.persona.solo.d':'Contam com sinais recentes da comunidade, apoio local e mais contexto antes de se deslocar.',
    'lnd.diff.title':'Uma camada de confiança.','lnd.diff.lede':'O Azimute não substitui transporte, reserva ou navegação. Ele entrega a leitura que falta para decidir com mais segurança.',
    'lnd.diff.card1.k':'O que o sistema cruza','lnd.diff.card1.t':'Comunidade + fonte oficial + contexto do lugar','lnd.diff.card1.d':'O mapa combina sinais diferentes para orientar a decisão em segundos.',
    'lnd.diff.card2.k':'O que o viajante recebe','lnd.diff.card2.t':'Ir, evitar, pedir apoio','lnd.diff.card2.d':'Em vez de excesso de tela, o app entrega ação curta e direta.',
    'lnd.diff.card3.k':'O que vira produto','lnd.diff.card3.t':'Leitura territorial para turismo','lnd.diff.card3.d':'O valor está nos sinais, na confiança por área e no contexto útil para turismo.',
    'lnd.community.title':'Comunidade ligada ao lugar, não ao algoritmo','lnd.community.lede':'Cada relato nasce no mapa, ajuda no deslocamento e reforça a leitura do destino com utilidade imediata.','lnd.community.cta':'Ver protótipo',
    'lnd.footer.brand':'Azimute © 2026','lnd.footer.note':'Protótipo com dados simulados','lnd.footer.privacy':'Privacidade & LGPD',
    'app.search.placeholder':'Buscar lugar, apoio ou alerta...',
    'nav.map.title':'Mapa confiável','nav.map.sub':'Ir, evitar, pedir apoio',
    'nav.trip.title':'Ir agora','nav.trip.sub':'Acompanhar meu trajeto',
    'nav.alerts.title':'Alertas do lugar','nav.alerts.sub':'Golpes, furtos e atenção',
    'nav.news.title':'Contexto oficial','nav.news.sub':'Turismo e orientação local',
    'nav.community.title':'Comunidade','nav.community.sub':'Relatos úteis no destino',
    'nav.chat.title':'Conversas','nav.chat.sub':'Combinar e confirmar',
    'nav.partners.title':'Dados para turismo','nav.partners.sub':'Hotéis, guias e destinos',
    'nav.ica.title':'Índice do destino','nav.ica.sub':'Leitura territorial',
    'nav.profile.title':'Perfil','nav.profile.sub':'Sua conta',
    'nav.privacy.title':'Privacidade','nav.privacy.sub':'LGPD & dados',
    'sidebar.score.title':'Leitura do destino','sidebar.score.label':'Contexto atual:','sidebar.back':'← Voltar ao site',
    'route.panel.title':'Para onde você quer ir?',
    'route.from.label':'Onde você está','route.from.placeholder':'Onde você está agora',
    'route.to.label':'Destino','route.to.placeholder':'Para onde você quer ir',
    'route.safe.cta':'Ver caminho mais confiável','route.moreOptions':'Mais opções',
    'route.assist.arriving':'Cheguei','route.assist.now':'Sair agora','route.assist.calm':'Calmo','route.assist.easy':'Modo fácil',
    'route.examples':'Exemplos','route.journey.curitiba':'Hotel → Tanguá','route.journey.foz':'Aeroporto → Cataratas','route.journey.morretes':'Morretes',
    'route.profile.walk':'🚶 Caminhando','route.profile.bike':'🚴 Bike','route.profile.car':'🚗 Carro ou app','route.profile.tour':'🧳 Com apoio',
    'route.time.label':'Horário da saída:',
    'route.result.label':'Caminho sugerido','route.edit':'Editar',
    'route.metric.trust':'Confiança','route.metric.time':'Duração','route.metric.distance':'Distância',
    'route.destination.label':'Chegada ao destino','route.destination.best':'Melhor momento','route.destination.support':'Ponto de apoio','route.destination.alert':'Alerta recente','route.destination.tip':'Dica rápida',
    'route.actions.steps':'Ver passo a passo','route.actions.compare':'Comparar rota direta','route.actions.sensitive':'Ver áreas sensíveis','route.actions.start':'▶ Iniciar passeio','route.actions.layers':'Camadas',
    'route.steps.title':'Passo a passo do passeio',
    'map.layers.title':'O que ver no mapa','map.layer.regions':'Confiança por área','map.layer.heat':'Áreas com mais atenção','map.layer.official':'Avisos oficiais','map.layer.community':'Relatos da comunidade','map.layer.lighting':'Baixa iluminação','map.layer.safe':'Pontos de apoio','map.layer.walk':'Onde dá para ir a pé em 15 min','map.layer.legend.risk':'Evite','map.layer.legend.med':'Atenção','map.layer.legend.ok':'Recomendado',
  },
  en: {
    'lnd.nav.map':'Map','lnd.nav.forTravelers':'For travelers','lnd.nav.diff':'Differentiator','lnd.nav.community':'Community',
    'lnd.login':'Sign in','lnd.openMap':'Open live map',
    'lnd.tag':'Reliable data for travelers',
    'lnd.hero.title':'Travel with more confidence in any destination.',
    'lnd.hero.lede':'Azimute combines community reports, official alerts and local context to turn risk into fast decisions for travelers.',
    'lnd.hero.scale':'Starts with mocked data in Paraná, but scales by city, route and destination without reworking the base.',
    'lnd.hero.problemLabel':'Problem','lnd.hero.problem':'Decision without context',
    'lnd.hero.solutionLabel':'Response','lnd.hero.solution':'Risk becomes action',
    'lnd.hero.cta1':'Open trusted map','lnd.hero.cta2':'Understand the differentiator',
    'lnd.proof.map':'Functional map','lnd.proof.support':'Nearby support','lnd.proof.fast':'Fast reading','lnd.proof.scale':'Scales by destination',
    'lnd.stats.pilot':'Local pilot','lnd.stats.pilotSub':'mock data in Paraná','lnd.stats.sources':'3 sources','lnd.stats.sourcesSub':'official, community and context','lnd.stats.scale':'Easy to scale','lnd.stats.scaleSub':'by city, route and destination',
    'lnd.mapcard.title':'Trusted route','lnd.mapcard.risk':'+38% trust','lnd.mapcard.insight1':'Recent scams','lnd.mapcard.insight2':'Support points','lnd.mapcard.insight3':'Safer window','lnd.mapcard.reading':'Trip reading','lnd.mapcard.signals':'Signals nearby','lnd.mapcard.signalsValue':'3 alert areas',
    'lnd.legend.safe':'Recommended route','lnd.legend.risk':'Alert zones',
    'lnd.features.title':'Map, signal and action',
    'lnd.feat.route.t':'Reliable movement','lnd.feat.route.d':'Shows the most coherent route and the path that makes the most sense when you are away from home.',
    'lnd.feat.official.t':'Simple risk reading','lnd.feat.official.d':'Turns scattered signals into clear alerts, nearby support and useful context.',
    'lnd.feat.community.t':'Useful community','lnd.feat.community.d':'Short place-based reports that guide the next traveler without social noise.',
    'lnd.feat.alerts.t':'Accessible from the start','lnd.feat.alerts.d':'Guided flow, direct language and high contrast for seniors, PCD and first-time users.',
    'lnd.partners.title':'Made for real travelers',
    'lnd.persona.tourists.t':'Vacation tourists','lnd.persona.tourists.d':'Leave the hotel, choose the destination and quickly understand where to go and what to avoid.',
    'lnd.persona.family.t':'Families and 60+','lnd.persona.family.d':'Get calmer reading, nearby support and routes that avoid unnecessary confusion.',
    'lnd.persona.solo.t':'Solo travelers','lnd.persona.solo.d':'Count on recent community signals, local support and more context before moving.',
    'lnd.diff.title':'A layer of trust.','lnd.diff.lede':'Azimute does not replace transport, booking or navigation. It provides the missing reading needed to decide with more confidence.',
    'lnd.diff.card1.k':'What the system combines','lnd.diff.card1.t':'Community + official source + local context','lnd.diff.card1.d':'The map combines different signals to guide decisions in seconds.',
    'lnd.diff.card2.k':'What the traveler gets','lnd.diff.card2.t':'Go, avoid, ask for support','lnd.diff.card2.d':'Instead of screen overload, the app gives short and direct actions.',
    'lnd.diff.card3.k':'What becomes product','lnd.diff.card3.t':'Territorial reading for tourism','lnd.diff.card3.d':'The value is in the signals, area trust and tourism-ready context.',
    'lnd.community.title':'Community tied to place, not to the algorithm','lnd.community.lede':'Every report starts on the map, helps movement and strengthens destination reading with immediate utility.','lnd.community.cta':'View prototype',
    'lnd.footer.brand':'Azimute © 2026','lnd.footer.note':'Prototype with simulated data','lnd.footer.privacy':'Privacy & LGPD',
    'app.search.placeholder':'Search place, support or alert...',
    'nav.map.title':'Trusted map','nav.map.sub':'Go, avoid, ask for support',
    'nav.trip.title':'Go now','nav.trip.sub':'Track my trip',
    'nav.alerts.title':'Place alerts','nav.alerts.sub':'Scams, theft and caution',
    'nav.news.title':'Official context','nav.news.sub':'Tourism and local guidance',
    'nav.community.title':'Community','nav.community.sub':'Useful destination reports',
    'nav.chat.title':'Chats','nav.chat.sub':'Arrange and confirm',
    'nav.partners.title':'Tourism data','nav.partners.sub':'Hotels, guides and destinations',
    'nav.ica.title':'Destination index','nav.ica.sub':'Territorial reading',
    'nav.profile.title':'Profile','nav.profile.sub':'Your account',
    'nav.privacy.title':'Privacy','nav.privacy.sub':'LGPD & data',
    'sidebar.score.title':'Destination reading','sidebar.score.label':'Current context:','sidebar.back':'← Back to site',
    'route.panel.title':'Where do you want to go?',
    'route.from.label':'Where are you','route.from.placeholder':'Where are you now',
    'route.to.label':'Destination','route.to.placeholder':'Where do you want to go',
    'route.safe.cta':'See safest route','route.moreOptions':'More options',
    'route.assist.arriving':'Arrived','route.assist.now':'Leave now','route.assist.calm':'Calm','route.assist.easy':'Easy mode',
    'route.examples':'Examples','route.journey.curitiba':'Hotel → Tanguá','route.journey.foz':'Airport → Falls','route.journey.morretes':'Morretes',
    'route.profile.walk':'🚶 Walking','route.profile.bike':'🚴 Bike','route.profile.car':'🚗 Car or app','route.profile.tour':'🧳 With support',
    'route.time.label':'Departure time:',
    'route.result.label':'Suggested route','route.edit':'Edit',
    'route.metric.trust':'Trust','route.metric.time':'Duration','route.metric.distance':'Distance',
    'route.destination.label':'Arriving at destination','route.destination.best':'Best time','route.destination.support':'Support point','route.destination.alert':'Recent alert','route.destination.tip':'Quick tip',
    'route.actions.steps':'Step by step','route.actions.compare':'Compare direct route','route.actions.sensitive':'See sensitive areas','route.actions.start':'▶ Start trip','route.actions.layers':'Layers',
    'route.steps.title':'Trip step-by-step',
    'map.layers.title':'What to see on the map','map.layer.regions':'Area trust','map.layer.heat':'More attention areas','map.layer.official':'Official alerts','map.layer.community':'Community reports','map.layer.lighting':'Low lighting','map.layer.safe':'Support points','map.layer.walk':'Where you can walk in 15 min','map.layer.legend.risk':'Avoid','map.layer.legend.med':'Caution','map.layer.legend.ok':'Recommended',
  },
  es: {
    'lnd.nav.map':'Mapa','lnd.nav.forTravelers':'Para viajeros','lnd.nav.diff':'Diferencial','lnd.nav.community':'Comunidad',
    'lnd.login':'Entrar','lnd.openMap':'Ver mapa en acción',
    'lnd.tag':'Datos confiables para quienes están viajando',
    'lnd.hero.title':'Viaja con más confianza en cualquier destino.',
    'lnd.hero.lede':'Azimute combina comunidad, alertas oficiales y contexto del lugar para convertir el riesgo en una decisión rápida para el viajero.',
    'lnd.hero.scale':'Empieza con datos simulados en Paraná, pero escala por ciudad, ruta y destino turístico sin rehacer la base.',
    'lnd.hero.problemLabel':'El problema','lnd.hero.problem':'Decisión sin contexto',
    'lnd.hero.solutionLabel':'La respuesta','lnd.hero.solution':'El riesgo se convierte en acción',
    'lnd.hero.cta1':'Abrir mapa confiable','lnd.hero.cta2':'Entender el diferencial',
    'lnd.proof.map':'Mapa funcional','lnd.proof.support':'Apoyo cerca','lnd.proof.fast':'Lectura rápida','lnd.proof.scale':'Escala por destino',
    'lnd.stats.pilot':'Piloto local','lnd.stats.pilotSub':'datos simulados en Paraná','lnd.stats.sources':'3 fuentes','lnd.stats.sourcesSub':'oficial, comunidad y contexto','lnd.stats.scale':'Escala fácil','lnd.stats.scaleSub':'por ciudad, ruta y destino',
    'lnd.mapcard.title':'Ruta más confiable','lnd.mapcard.risk':'+38% confianza','lnd.mapcard.insight1':'Estafas recientes','lnd.mapcard.insight2':'Puntos de apoyo','lnd.mapcard.insight3':'Ventana más segura','lnd.mapcard.reading':'Lectura del trayecto','lnd.mapcard.signals':'Señales alrededor','lnd.mapcard.signalsValue':'3 zonas de atención',
    'lnd.legend.safe':'Ruta recomendada','lnd.legend.risk':'Zonas de alerta',
    'lnd.features.title':'Mapa, señal y acción',
    'lnd.feat.route.t':'Desplazamiento confiable','lnd.feat.route.d':'Muestra la ruta más coherente y el camino que tiene más sentido cuando estás fuera de casa.',
    'lnd.feat.official.t':'Lectura de riesgo simple','lnd.feat.official.d':'Convierte señales dispersas en alertas claras, apoyo cercano y contexto útil.',
    'lnd.feat.community.t':'Comunidad útil','lnd.feat.community.d':'Relatos cortos por lugar para orientar al siguiente viajero sin ruido social.',
    'lnd.feat.alerts.t':'Accesible desde el inicio','lnd.feat.alerts.d':'Flujo guiado, lenguaje directo y alto contraste para mayores, PCD y principiantes.',
    'lnd.partners.title':'Hecho para viajeros reales',
    'lnd.persona.tourists.t':'Turistas de vacaciones','lnd.persona.tourists.d':'Salen del hotel, eligen el destino y entienden rápido por dónde ir y qué evitar.',
    'lnd.persona.family.t':'Familias y 60+','lnd.persona.family.d':'Obtienen una lectura más calma, apoyo cercano y trayectos que evitan confusión innecesaria.',
    'lnd.persona.solo.t':'Viajeros solos','lnd.persona.solo.d':'Cuentan con señales recientes de la comunidad, apoyo local y más contexto antes de moverse.',
    'lnd.diff.title':'Una capa de confianza.','lnd.diff.lede':'Azimute no reemplaza transporte, reservas o navegación. Entrega la lectura que falta para decidir con más seguridad.',
    'lnd.diff.card1.k':'Lo que cruza el sistema','lnd.diff.card1.t':'Comunidad + fuente oficial + contexto del lugar','lnd.diff.card1.d':'El mapa combina señales distintas para orientar la decisión en segundos.',
    'lnd.diff.card2.k':'Lo que recibe el viajero','lnd.diff.card2.t':'Ir, evitar, pedir apoyo','lnd.diff.card2.d':'En vez de exceso de pantalla, la app entrega acciones cortas y directas.',
    'lnd.diff.card3.k':'Lo que se vuelve producto','lnd.diff.card3.t':'Lectura territorial para turismo','lnd.diff.card3.d':'El valor está en las señales, la confianza por área y el contexto útil para turismo.',
    'lnd.community.title':'Comunidad conectada al lugar, no al algoritmo','lnd.community.lede':'Cada reporte nace en el mapa, ayuda en el desplazamiento y refuerza la lectura del destino con utilidad inmediata.','lnd.community.cta':'Ver prototipo',
    'lnd.footer.brand':'Azimute © 2026','lnd.footer.note':'Prototipo con datos simulados','lnd.footer.privacy':'Privacidad & LGPD',
    'app.search.placeholder':'Buscar lugar, apoyo o alerta...',
    'nav.map.title':'Mapa confiable','nav.map.sub':'Ir, evitar, pedir apoyo',
    'nav.trip.title':'Ir ahora','nav.trip.sub':'Seguir mi trayecto',
    'nav.alerts.title':'Alertas del lugar','nav.alerts.sub':'Estafas, robos y atención',
    'nav.news.title':'Contexto oficial','nav.news.sub':'Turismo y orientación local',
    'nav.community.title':'Comunidad','nav.community.sub':'Reportes útiles del destino',
    'nav.chat.title':'Conversaciones','nav.chat.sub':'Coordinar y confirmar',
    'nav.partners.title':'Datos para turismo','nav.partners.sub':'Hoteles, guías y destinos',
    'nav.ica.title':'Índice del destino','nav.ica.sub':'Lectura territorial',
    'nav.profile.title':'Perfil','nav.profile.sub':'Tu cuenta',
    'nav.privacy.title':'Privacidad','nav.privacy.sub':'LGPD y datos',
    'sidebar.score.title':'Lectura del destino','sidebar.score.label':'Contexto actual:','sidebar.back':'← Volver al sitio',
    'route.panel.title':'¿A dónde quieres ir?',
    'route.from.label':'Dónde estás','route.from.placeholder':'Dónde estás ahora',
    'route.to.label':'Destino','route.to.placeholder':'A dónde quieres ir',
    'route.safe.cta':'Ver camino más confiable','route.moreOptions':'Más opciones',
    'route.assist.arriving':'Llegué','route.assist.now':'Salir ahora','route.assist.calm':'Calmo','route.assist.easy':'Modo fácil',
    'route.examples':'Ejemplos','route.journey.curitiba':'Hotel → Tanguá','route.journey.foz':'Aeropuerto → Cataratas','route.journey.morretes':'Morretes',
    'route.profile.walk':'🚶 Caminando','route.profile.bike':'🚴 Bici','route.profile.car':'🚗 Auto o app','route.profile.tour':'🧳 Con apoyo',
    'route.time.label':'Hora de salida:',
    'route.result.label':'Camino sugerido','route.edit':'Editar',
    'route.metric.trust':'Confianza','route.metric.time':'Duración','route.metric.distance':'Distancia',
    'route.destination.label':'Llegada al destino','route.destination.best':'Mejor momento','route.destination.support':'Punto de apoyo','route.destination.alert':'Alerta reciente','route.destination.tip':'Consejo rápido',
    'route.actions.steps':'Ver paso a paso','route.actions.compare':'Comparar ruta directa','route.actions.sensitive':'Ver áreas sensibles','route.actions.start':'▶ Iniciar paseo','route.actions.layers':'Capas',
    'route.steps.title':'Paso a paso del paseo',
    'map.layers.title':'Qué ver en el mapa','map.layer.regions':'Confianza por área','map.layer.heat':'Áreas con más atención','map.layer.official':'Avisos oficiales','map.layer.community':'Reportes de la comunidad','map.layer.lighting':'Baja iluminación','map.layer.safe':'Puntos de apoyo','map.layer.walk':'Dónde se puede ir a pie en 15 min','map.layer.legend.risk':'Evita','map.layer.legend.med':'Atención','map.layer.legend.ok':'Recomendado',
  }
};
function applyI18n(){
  const t = I18N[state.lang] || I18N.pt;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (!t[k]) return;
    const attr = el.getAttribute('data-i18n-attr');
    if (attr) el.setAttribute(attr, t[k]);
    else el.textContent = t[k];
  });
  document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : state.lang;
  const a = document.getElementById('langSwitch'); if (a) a.value = state.lang;
  const b = document.getElementById('langSwitchApp'); if (b) b.value = state.lang;
}

/* ----- Utilidades ----- */
const qs = (s, r=document) => r.querySelector(s);
const qsa = (s, r=document) => [...r.querySelectorAll(s)];
function toast(msg, ms=2800){
  const t = qs('#toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> t.hidden = true, ms);
}
function debounce(fn, ms=300){ let t; return (...a)=>{ clearTimeout(t); t = setTimeout(()=>fn(...a), ms); }; }

/* ----- Tema & Acessibilidade ----- */
function applyTheme(){
  document.documentElement.setAttribute('data-theme', state.theme);
  const p = qs('#prefDark'); if (p) p.checked = state.theme === 'dark';
  const label = qs('[data-theme-label]');
  if (label) label.textContent = state.theme === 'dark' ? 'Modo claro' : 'Modo escuro';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', state.theme === 'dark' ? UI_COLORS.bg : UI_COLORS.bgLight);
}
function toggleTheme(){ state.theme = state.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('az.theme', state.theme); applyTheme(); updateMapTheme(); }
function applySenior(){ document.documentElement.setAttribute('data-senior', state.senior ? 'on' : 'off'); const p = qs('#prefSenior'); if (p) p.checked = state.senior; }
function toggleSenior(){ state.senior = !state.senior; localStorage.setItem('az.senior', state.senior ? 'on' : 'off'); applySenior(); toast(state.senior ? 'Modo fácil ativado' : 'Modo padrão restaurado'); }

/* ----- Landing ↔ App ----- */
function enterApp(target){
  qs('#landing').hidden = true;
  qs('#app').hidden = false;
  const routes = {app:'map', login:'profile', privacy:'privacy'};
  showPage(routes[target] || 'map');
  if (!state.map) setTimeout(initMap, 40);
  if (!localStorage.getItem('az.onb')) setTimeout(openOnboarding, 350);
}
function leaveApp(){ qs('#app').hidden = true; qs('#landing').hidden = false; window.scrollTo(0,0); }
function openCommunityReport(){
  showPage('community');
  setTimeout(() => qs('#communityComposer')?.scrollIntoView({behavior:'smooth', block:'start'}), 80);
}
function draftStory(){
  showPage('community');
  toast('Editor de story em preparação. Por enquanto, use o relato para publicar a atualização.');
  setTimeout(() => qs('#communityComposer')?.scrollIntoView({behavior:'smooth', block:'start'}), 80);
}

/* ----- Navegação ----- */
function showPage(id){
  state.page = id;
  qsa('.page').forEach(p => p.classList.toggle('active', p.id === `page-${id}`));
  qsa('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.page === id));
  qsa('.bottom-nav button[data-page]').forEach(b => b.classList.toggle('active', b.dataset.page === id));
  qs('#sidebar')?.classList.remove('open');
  if (id === 'map' && state.map) setTimeout(()=> state.map.invalidateSize(), 80);
  if (id === 'alerts') renderAlerts();
  if (id === 'news') renderNews();
  if (id === 'community') renderCommunity();
  if (id === 'chat') renderChat();
  if (id === 'partners') showPartner('guide');
  if (id === 'trip') renderTrip();
  if (id === 'ica') renderIca();
}
function toggleSidebar(){
  if (window.matchMedia('(max-width: 980px)').matches){
    qs('#sidebar')?.classList.toggle('open');
    return;
  }
  qs('#appShell')?.classList.toggle('sidebar-collapsed');
}
function togglePanel(id){
  const el = qs('#'+id);
  if (!el) return;
  if (el.hidden){
    el.hidden = false;
    el.classList.remove('collapsed');
    qsa('[data-panel-body]', el).forEach(b => b.style.display = '');
    return;
  }
  const collapsed = el.classList.toggle('collapsed');
  qsa('[data-panel-body]', el).forEach(b => b.style.display = collapsed ? 'none' : '');
  if (collapsed && id === 'layerPanel') el.hidden = true;
}
function openRouteBuilder(){
  qs('#routeMinimal')?.setAttribute('hidden', '');
  qs('#routeBuilder')?.removeAttribute('hidden');
  qs('#routePanel')?.classList.remove('compact');
  qs('#routeResult').hidden = true;
  qs('#routeFrom')?.focus();
}
function toggleRouteAdvanced(){
  const box = qs('#routeAdvanced');
  if (!box) return;
  box.hidden = !box.hidden;
}
function applyJourney(id){
  const journey = DEMO_JOURNEYS[id];
  if (!journey) return;
  qsa('.journey-actions .chip').forEach(c => c.classList.toggle('active', c.dataset.journey === id));
  state.fromCoord = [...journey.from];
  state.toCoord = [...journey.to];
  state.profile = journey.profile;
  qs('#routeFrom').value = journey.fromLabel;
  qs('#routeTo').value = journey.toLabel;
  qs('#timeRange').value = String(journey.hour);
  qsa('.rp-profile .chip').forEach(c => c.classList.toggle('active', c.dataset.prof === journey.profile));
  onTimeChange(journey.hour);
  qs('#routePanel')?.classList.remove('compact');
  qs('#routeResult').hidden = true;
  if (state.userMarker) state.userMarker.setLatLng(journey.from);
  if (state.map) state.map.setView(journey.from, id === 'foz-family' ? 13 : 15, {animate:true});
  toast('Jornada pronta aplicada');
}
function setAssistMode(mode, text){
  qsa('.route-helper-actions .chip').forEach(c => c.classList.toggle('active', c.dataset.assist === mode));
  const helper = qs('#routeHelperText');
  if (helper) helper.textContent = text;
  syncLayerControls();
}
function applyAssistMode(mode){
  if (mode === 'arriving'){
    state.layers.official = true;
    state.layers.community = true;
    state.layers.safe = true;
    state.layers.heat = false;
    state.layers.regions = true;
    state.layers.lighting = false;
    state.profile = 'car';
    qsa('.rp-profile .chip').forEach(c => c.classList.toggle('active', c.dataset.prof === 'car'));
    qs('#timeRange').value = '16';
    onTimeChange(16);
    setAssistMode(mode, 'Mostra apoio, avisos oficiais e contexto útil para quem acabou de chegar e quer se orientar com calma.');
    rebuildHeat();
    rebuildIncidentMarkers();
    rebuildRegions();
    toast('Modo chegada ativado');
    return;
  }
  if (mode === 'now'){
    applyNowMode();
    setAssistMode(mode, 'Destaca o que merece atenção neste momento e prepara o mapa para saída imediata.');
    return;
  }
  if (mode === 'calm'){
    state.profile = 'tour';
    state.layers.official = true;
    state.layers.community = true;
    state.layers.safe = true;
    state.layers.heat = false;
    state.layers.regions = true;
    state.layers.lighting = false;
    qsa('.rp-profile .chip').forEach(c => c.classList.toggle('active', c.dataset.prof === 'tour'));
    qs('#timeRange').value = '15';
    onTimeChange(15);
    rebuildHeat();
    rebuildIncidentMarkers();
    rebuildRegions();
    setAssistMode(mode, 'Prioriza leitura simples, apoio próximo e horário mais confortável para um passeio tranquilo.');
    toast('Modo passeio calmo ativado');
    return;
  }
  if (mode === 'easy'){
    if (!state.senior) toggleSenior();
    state.layers.official = true;
    state.layers.community = true;
    state.layers.safe = true;
    state.layers.regions = false;
    state.layers.heat = false;
    state.layers.lighting = false;
    rebuildHeat();
    rebuildIncidentMarkers();
    rebuildRegions();
    setAssistMode(mode, 'Aumenta legibilidade e deixa o mapa mais limpo para quem prefere menos informação ao mesmo tempo.');
    toast('Modo fácil ativado');
  }
}
function applyNowMode(){
  const now = new Date().getHours();
  qs('#timeRange').value = String(now);
  onTimeChange(now);
  state.layers.heat = true;
  state.layers.community = true;
  state.layers.official = true;
  state.layers.regions = false;
  state.layers.lighting = now >= 19 || now <= 5;
  rebuildHeat();
  rebuildIncidentMarkers();
  rebuildRegions();
  if (state.routeGeo) calcSafeRoute(true);
  setAssistMode('now', 'Destaca o que merece atenção neste momento e prepara o mapa para saída imediata.');
  toast('Modo agora ativado');
}

/* ----- Score por horário ----- */
function hourFactor(h){
  // Curva noturna: risco sobe entre 19h e 5h
  if (h < 0) h = new Date().getHours();
  if (h >= 22 || h <= 4) return 1.6;
  if (h >= 19) return 1.35;
  if (h >= 6 && h <= 17) return 0.8;
  return 1.0;
}
function incidentRisk(i, hour){
  const base = i.severity === 'high' ? .75 : i.severity === 'med' ? .45 : .18;
  const hourMatch = hour >= 0 ? (1 - Math.min(1, Math.abs(i.hour - hour) / 12)) : 1;
  return Math.min(1, base * hourFactor(hour) * (0.6 + 0.4*hourMatch));
}

/* ----- Mapa ----- */
function initMap(){
  state.map = L.map('map', {zoomControl:false, attributionControl:false}).setView(state.fromCoord, 15);
  L.control.zoom({position:'bottomright'}).addTo(state.map);
  state.baseLayer = L.tileLayer(mapTileUrl(), {maxZoom:19, subdomains:'abcd'}).addTo(state.map);
  state.map.createPane('heatPane');
  state.map.createPane('regionPane');
  state.map.createPane('routePane');
  state.map.getPane('heatPane').style.zIndex = 260;
  state.map.getPane('regionPane').style.zIndex = 320;
  state.map.getPane('routePane').style.zIndex = 635;
  ['official','community','lighting','safe'].forEach(k => state.layerGroups[k] = L.layerGroup());
  addIncidentMarkers();
  rebuildHeat();
  rebuildRegions();
  syncLayerControls();
  addUserMarker();
  startLiveTick();
  state.map.on('zoomend', () => {
    rebuildIncidentMarkers();
    if (state.layers.heat) rebuildHeat();
    if (state.layers.regions) rebuildRegions();
    refreshRouteDrawing();
  });
  // Click no mapa: popup com score do ponto (apenas em área vazia)
  state.map.on('click', e => {
    if (e.originalEvent && e.originalEvent.target && e.originalEvent.target.closest('.leaflet-marker-icon, .leaflet-interactive')) return;
    const score = computePointScore(e.latlng.lat, e.latlng.lng);
    if (!score.nearest || score.total <= 0) return;
    L.popup({closeButton:true}).setLatLng(e.latlng).setContent(scorePopupHtml(score)).openOn(state.map);
  });
}
function updateRouteOverlay(){
  const el = qs('#routeOverlay');
  if (!el || !state.map || !state.routeGeo?.latlngs?.length){
    if (el) el.innerHTML = '';
    return;
  }
  const size = state.map.getSize();
  el.style.width = `${size.x}px`;
  el.style.height = `${size.y}px`;
  let canvas = el.querySelector('canvas');
  if (!canvas){
    canvas = document.createElement('canvas');
    el.innerHTML = '';
    el.appendChild(canvas);
  }
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.round(size.x * ratio));
  canvas.height = Math.max(1, Math.round(size.y * ratio));
  canvas.style.width = `${size.x}px`;
  canvas.style.height = `${size.y}px`;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, size.x, size.y);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const pts = state.routeGeo.latlngs.map(ll => state.map.latLngToContainerPoint(ll));
  if (!pts.length) return;
  const drawPath = points => {
    ctx.beginPath();
    points.forEach((p, idx) => {
      const x = p.x;
      const y = p.y;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
  };
  const avoid = state.routeGeo.avoidedLatlngs?.length
    ? state.routeGeo.avoidedLatlngs.map(ll => state.map.latLngToContainerPoint(ll))
    : null;
  if (avoid?.length){
    ctx.save();
    ctx.strokeStyle = UI_COLORS.routeAvoid;
    ctx.lineWidth = 6;
    ctx.setLineDash([10, 10]);
    drawPath(avoid);
    ctx.stroke();
    ctx.restore();
  }
  ctx.save();
  ctx.strokeStyle = UI_COLORS.routeBase;
  ctx.lineWidth = 16;
  drawPath(pts);
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.shadowColor = 'rgba(67,243,176,.42)';
  ctx.shadowBlur = 12;
  ctx.strokeStyle = UI_COLORS.route;
  ctx.lineWidth = 9;
  drawPath(pts);
  ctx.stroke();
  ctx.restore();
}
function refreshRouteDrawing(){
  if (!state.map || !state.routeGeo?.latlngs?.length) return;
  state.avoidedLayer?.bringToFront?.();
  state.routeLayer?.eachLayer?.(layer => layer.bringToFront?.());
  state.routeStartMarker?.setZIndexOffset?.(1000);
  state.routeEndMarker?.setZIndexOffset?.(1000);
}
function syncLayerControls(){
  qsa('[data-layer-toggle]').forEach(input => {
    input.checked = !!state.layers[input.dataset.layerToggle];
  });
}
function mapTileUrl(){
  return state.theme === 'light'
    ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
}
function updateMapTheme(){
  if (!state.map) return;
  if (state.baseLayer) state.map.removeLayer(state.baseLayer);
  state.baseLayer = L.tileLayer(mapTileUrl(), {maxZoom:19, subdomains:'abcd'}).addTo(state.map);
}
function markerIcon(kind, sev){
  const symbols = {official:'🏛', community:'⚑', lighting:'💡', safe:'🛡'};
  const cls = kind === 'official' ? 'official' : kind === 'safe' ? 'safe' : (sev==='high'?'high':sev==='med'?'med':'low');
  const zoom = state.map?.getZoom?.() || 15;
  const size = zoom <= 11 ? 18 : zoom <= 13 ? 22 : 28;
  const font = zoom <= 11 ? 10 : zoom <= 13 ? 12 : 14;
  return L.divIcon({
    className:'',
    html:`<div class="risk-marker ${cls}" style="width:${size}px;height:${size}px;font-size:${font}px">${symbols[kind]||'•'}</div>`,
    iconSize:[size,size],
    iconAnchor:[Math.round(size/2),Math.round(size/2)]
  });
}
function popupHtml(i){
  const b = i.breakdown;
  const total = (b.official + b.community + b.env);
  const pct = Math.round(total*100);
  return `<div style="min-width:220px">
    ${i.photo ? `<img class="pop-photo" src="${i.photo}" alt="${i.title}" loading="lazy">` : ''}
    <div class="pop-title">${i.title}</div>
    <div>${i.desc||''}</div>
    <div class="pop-meta"><span class="src-chip">${i.src}</span> · ${i.when}</div>
    <div class="score-breakdown">
      <div class="row"><b>Score do ponto</b><b>${pct}/100</b></div>
      <div class="row"><span>Oficial</span><span>${Math.round(b.official*100)}</span></div>
      <div class="bar"><span style="width:${b.official*100}%;background:var(--primary)"></span></div>
      <div class="row"><span>Comunidade</span><span>${Math.round(b.community*100)}</span></div>
      <div class="bar"><span style="width:${b.community*100}%;background:var(--warning)"></span></div>
      <div class="row"><span>Ambiental</span><span>${Math.round(b.env*100)}</span></div>
      <div class="bar"><span style="width:${b.env*100}%;background:var(--ok)"></span></div>
    </div>
    <div class="pop-actions">
      <button type="button" onclick="setDestinationFromIncident('${i.id}')">Traçar até aqui</button>
      <button type="button" onclick="focusSupportNearIncident('${i.id}')">Ver apoio</button>
    </div>
    <div class="pop-meta" style="margin-top:.4rem"><a href="${i.srcUrl}" target="_blank" rel="noopener">Ver fonte →</a></div>
  </div>`;
}
function addIncidentMarkers(){
  state.incidentMarkers = DATA.incidents.map(i => {
    const bucket = i.type === 'lighting' ? 'lighting' : i.type === 'safe' ? 'safe' : i.type;
    const marker = L.marker([i.lat, i.lng], {icon: markerIcon(bucket, i.severity)}).bindPopup(popupHtml(i));
    return {data:i, bucket, marker};
  });
  rebuildIncidentMarkers();
}
function incidentVisibleAtZoom(i, zoom){
  if (zoom <= 11) return i.severity === 'high' || i.type === 'safe';
  if (zoom <= 13) return i.type !== 'lighting' && !(i.type === 'community' && i.severity === 'low');
  return true;
}
function rebuildIncidentMarkers(){
  const zoom = state.map?.getZoom?.() || 15;
  Object.values(state.layerGroups).forEach(group => group.clearLayers());
  state.incidentMarkers.forEach(item => {
    if (!incidentVisibleAtZoom(item.data, zoom)) return;
    item.marker.setIcon(markerIcon(item.bucket, item.data.severity));
    state.layerGroups[item.bucket].addLayer(item.marker);
  });
  Object.entries(state.layerGroups).forEach(([key, group]) => {
    if (!state.map) return;
    if (state.layers[key]){
      if (!state.map.hasLayer(group)) group.addTo(state.map);
    } else if (state.map.hasLayer(group)){
      state.map.removeLayer(group);
    }
  });
}
function rebuildHeat(){
  if (state.heatLayer) { state.map.removeLayer(state.heatLayer); state.heatLayer = null; }
  if (!state.layers.heat) return;
  const h = state.time;
  const zoom = state.map?.getZoom?.() || 15;
  const pts = DATA.incidents
    .filter(i => i.type === 'official' || i.type === 'community')
    .filter(i => {
      if (zoom <= 11) return i.type === 'official' || i.severity === 'high';
      if (zoom <= 13) return !(i.type === 'community' && i.severity === 'low');
      return true;
    })
    .map(i => [i.lat, i.lng, incidentRisk(i, h)]);
  const heatOptions = zoom <= 11
    ? {radius:18, blur:16, minOpacity:.12}
    : zoom <= 13
      ? {radius:22, blur:18, minOpacity:.16}
      : {radius:28, blur:22, minOpacity:.25};
  state.heatLayer = L.heatLayer(pts, { ...heatOptions, maxZoom:17, pane:'heatPane',
    gradient:{0.3:UI_COLORS.ok, 0.6:UI_COLORS.warning, 0.9:UI_COLORS.danger} }).addTo(state.map);
}
function addUserMarker(){
  const icon = L.divIcon({className:'', html:`<div class="risk-marker" style="background:${UI_COLORS.primary};border:3px solid ${UI_COLORS.mapPinBorder}">•</div>`, iconSize:[28,28], iconAnchor:[14,14]});
  state.userMarker = L.marker(state.fromCoord, {icon}).addTo(state.map).bindPopup('Você está aqui');
}
function toggleLayer(name, on){
  state.layers[name] = on;
  if (name === 'heat') return rebuildHeat();
  if (name === 'regions') return rebuildRegions();
  rebuildIncidentMarkers();
  const g = state.layerGroups[name]; if (!g) return;
  on ? g.addTo(state.map) : state.map.removeLayer(g);
}

function regionColor(ica){ return ica >= 75 ? UI_COLORS.ok : ica >= 55 ? UI_COLORS.warning : UI_COLORS.danger; }
function regionClass(ica){ return ica >= 75 ? 'ok' : ica >= 55 ? 'warn' : 'bad'; }
function rebuildRegions(){
  if (state.regionLayer){ state.map.removeLayer(state.regionLayer); state.regionLayer = null; }
  if (!state.layers.regions) return;
  state.regionLayer = L.layerGroup();
  const zoom = state.map?.getZoom?.() || 15;
  const showLabels = zoom >= 14;
  const regionStyle = zoom <= 11
    ? {scale:0.72, fillOpacity:.07, weight:1, opacity:.3}
    : zoom <= 13
      ? {scale:0.86, fillOpacity:.1, weight:1.2, opacity:.42}
      : {scale:1, fillOpacity:.14, weight:1.5, opacity:.55};
  REGIONS.forEach(r => {
    const color = regionColor(r.ica);
    const circle = L.circle(r.center, {
      radius: Math.round(r.radius * regionStyle.scale),
      color,
      fillColor:color,
      fillOpacity:regionStyle.fillOpacity,
      weight:regionStyle.weight,
      opacity:regionStyle.opacity,
      pane:'regionPane'
    }).bindPopup(regionPopup(r));
    state.regionLayer.addLayer(circle);
    if (showLabels){
      const chipSize = zoom >= 15 ? 34 : 30;
      const label = L.marker(r.center, {
        icon: L.divIcon({
          className:'region-label',
          html:`<div class="rg-chip ${regionClass(r.ica)}" style="min-width:${chipSize}px;height:${chipSize}px">${r.ica}</div>`,
          iconSize:[chipSize,chipSize], iconAnchor:[Math.round(chipSize/2),Math.round(chipSize/2)]
        }),
        interactive: true
      }).bindPopup(regionPopup(r));
      state.regionLayer.addLayer(label);
    }
  });
  state.regionLayer.addTo(state.map);
}
function regionPopup(r){
  const cls = regionClass(r.ica);
  const trendIco = r.trend === 'up' ? '↗ subindo' : r.trend === 'down' ? '↘ caindo' : '→ estável';
  return `<div style="min-width:220px">
    <div class="pop-title">${r.name}</div>
    <div class="pop-meta">ICA: <b style="color:${regionColor(r.ica)}">${r.ica}/100</b> · ${trendIco} (${r.delta>0?'+':''}${r.delta} em 24h)</div>
    <div class="score-breakdown">
      <div class="row"><span>Integração oficial</span><span>${Math.round(r.sources.official*100)}</span></div>
      <div class="bar"><span style="width:${r.sources.official*100}%;background:var(--primary)"></span></div>
      <div class="row"><span>Validação comunitária</span><span>${Math.round(r.sources.community*100)}</span></div>
      <div class="bar"><span style="width:${r.sources.community*100}%;background:var(--warning)"></span></div>
      <div class="row"><span>Análise preditiva</span><span>${Math.round(r.sources.predict*100)}</span></div>
      <div class="bar"><span style="width:${r.sources.predict*100}%;background:var(--ok)"></span></div>
    </div>
  </div>`;
}

/* ----- Live tick: atualizações em tempo real ----- */
function startLiveTick(){
  if (state.liveTick) return;
  state.liveTick = setInterval(() => {
    // Varia ICA das regiões suavemente
    REGIONS.forEach(r => {
      const drift = (Math.random() - 0.48) * 2;
      r.ica = Math.max(25, Math.min(95, Math.round(r.ica + drift)));
      r.trend = drift > 0.5 ? 'down' : drift < -0.5 ? 'up' : 'flat';
      r.delta = Math.round(drift * 3);
    });
    if (state.layers.regions && state.map) rebuildRegions();
    if (state.page === 'ica') renderIca();
  }, 5000);
}
function centerOnUser(){ if(state.map) state.map.setView(state.fromCoord, 16, {animate:true}); }
function focusNearestSupportToUser(){
  const support = nearestSupport(state.fromCoord[0], state.fromCoord[1], 2500);
  state.layers.safe = true;
  rebuildIncidentMarkers();
  syncLayerControls();
  if (!support) return toast('Nenhum apoio próximo encontrado agora.');
  focusMapLocation(support.lat, support.lng, support.title, 16);
  toast('Mostrando o apoio mais próximo');
}
function showAttentionAroundUser(){
  state.layers.heat = true;
  state.layers.community = true;
  state.layers.official = true;
  rebuildHeat();
  rebuildIncidentMarkers();
  syncLayerControls();
  if (state.map) state.map.setView(state.fromCoord, 15, {animate:true});
  toast('Áreas de atenção destacadas no mapa');
}
function incidentById(id){
  return DATA.incidents.find(i => i.id === id);
}
function nearestSupport(lat, lng, radiusMeters=1200){
  const supports = DATA.incidents.filter(i => i.type === 'safe');
  let chosen = null;
  let bestDist = Infinity;
  supports.forEach(i => {
    const d = distanceMeters(lat, lng, i.lat, i.lng);
    if (d <= radiusMeters && d < bestDist){
      chosen = i;
      bestDist = d;
    }
  });
  return chosen;
}
function areaToCoord(label=''){
  const text = label.toLowerCase();
  if (text.includes('tangu')) return [-25.3792, -49.2773];
  if (text.includes('cataratas')) return [-25.4410, -54.4402];
  if (text.includes('foz')) return [-25.5451, -54.5882];
  if (text.includes('morretes')) return [-25.4767, -48.8345];
  if (text.includes('largo') || text.includes('histórico')) return [-25.4284, -49.2733];
  if (text.includes('rua xv')) return [-25.4302, -49.2680];
  if (text.includes('mon') || text.includes('centro cívico')) return [-25.4416, -49.2765];
  if (text.includes('curitiba')) return [-25.4398, -49.2892];
  return null;
}
function focusMapLocation(lat, lng, title='Ponto no mapa', zoom=15){
  showPage('map');
  setTimeout(() => {
    if (!state.map) return;
    state.map.setView([lat, lng], zoom, {animate:true});
    L.popup({closeButton:true}).setLatLng([lat, lng]).setContent(`<div class="pop-title">${title}</div>`).openOn(state.map);
  }, 90);
}
function setDestinationFromIncident(id){
  const incident = incidentById(id);
  if (!incident) return;
  state.toCoord = [incident.lat, incident.lng];
  qs('#routeTo').value = incident.title;
  showPage('map');
  editRoute();
  calcSafeRoute();
}
function focusSupportNearIncident(id){
  const incident = incidentById(id);
  if (!incident) return;
  const support = nearestSupport(incident.lat, incident.lng);
  if (!support) return toast('Nenhum apoio próximo encontrado.');
  focusMapLocation(support.lat, support.lng, support.title, 15);
}
function focusAlert(id){
  const alert = DATA.alerts.find(a => a.id === id);
  const coord = areaToCoord(alert?.area || '');
  if (!coord) return showPage('map');
  focusMapLocation(coord[0], coord[1], alert.title, coord[1] < -50 ? 13 : 15);
}
function focusAreaOnMap(area, title){
  const coord = areaToCoord(area || '');
  if (!coord) return showPage('map');
  focusMapLocation(coord[0], coord[1], title || area, coord[1] < -50 ? 13 : 15);
}
function destinationGuideFor(label=''){
  return DESTINATION_GUIDES.find(g => g.match.some(m => label.includes(m))) || null;
}
function distanceMeters(aLat, aLng, bLat, bLng){
  const toRad = Math.PI / 180;
  const x = (bLng - aLng) * toRad * Math.cos(((aLat + bLat) / 2) * toRad);
  const y = (bLat - aLat) * toRad;
  return Math.hypot(x, y) * 6371000;
}
function incidentRiskAtPoint(lat, lng, hour, radiusMeters=220){
  let official = 0, community = 0, env = 0, nearest = null, minD = Infinity;
  DATA.incidents.forEach(i => {
    const d = distanceMeters(lat, lng, i.lat, i.lng);
    if (d > radiusMeters) return;
    const w = (radiusMeters - d) / radiusMeters;
    const r = incidentRisk(i, hour) * w;
    if (i.type === 'official') official += r * 0.6;
    else if (i.type === 'community') community += r * 0.5;
    else env += r * 0.35;
    if (d < minD){ minD = d; nearest = i; }
  });
  return { total: Math.min(1, official + community + env), official, community, env, nearest };
}
function routeIncidents(coords, radiusMeters=140){
  const hits = new Map();
  DATA.incidents.forEach(inc => {
    for (let i = 0; i < coords.length; i += Math.max(1, Math.floor(coords.length / 18))){
      const [lng, lat] = coords[i];
      if (distanceMeters(lat, lng, inc.lat, inc.lng) <= radiusMeters){
        hits.set(inc.id, inc);
        break;
      }
    }
  });
  return [...hits.values()];
}

function computePointScore(lat, lng){
  return incidentRiskAtPoint(lat, lng, state.time);
}
function scorePopupHtml(s){
  const pct = Math.round(s.total*100);
  const bucket = pct > 55 ? 'alto' : pct > 30 ? 'médio' : 'baixo';
  return `<div style="min-width:220px">
    <div class="pop-title">Score desse ponto: ${pct}/100</div>
    <div class="pop-meta">Classificação: <b>${bucket}</b></div>
    <div class="score-breakdown">
      <div class="row"><span>Oficial</span><span>${Math.round(s.official*100)}</span></div>
      <div class="bar"><span style="width:${Math.min(100,s.official*100)}%;background:var(--primary)"></span></div>
      <div class="row"><span>Comunidade</span><span>${Math.round(s.community*100)}</span></div>
      <div class="bar"><span style="width:${Math.min(100,s.community*100)}%;background:var(--warning)"></span></div>
      <div class="row"><span>Ambiental</span><span>${Math.round(s.env*100)}</span></div>
      <div class="bar"><span style="width:${Math.min(100,s.env*100)}%;background:var(--ok)"></span></div>
    </div>
    ${s.nearest ? `<div class="pop-meta" style="margin-top:.4rem">Mais próximo: ${s.nearest.title}</div>`:''}
  </div>`;
}

/* ----- Time slider ----- */
function onTimeChange(v){
  state.time = parseInt(v, 10);
  if (state.time < 0 || isNaN(state.time)) { state.time = -1; qs('#timeLabel').textContent = 'agora'; }
  else qs('#timeLabel').textContent = String(state.time).padStart(2,'0') + ':00';
  rebuildHeat();
  if (state.routeGeo) calcSafeRoute(true); // recalc silencioso
}

/* ----- Geocoder (Nominatim) ----- */
const geocode = debounce(async (q, targetListId, kind) => {
  if (!q || q.length < 3){ qs('#'+targetListId).hidden = true; return; }
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&addressdetails=0&q=${encodeURIComponent(q)}`, {headers:{'Accept-Language': state.lang}});
    const j = await r.json();
    const list = qs('#'+targetListId);
    if (!j.length){ list.hidden = true; return; }
    list.innerHTML = j.map(it => `<li data-lat="${it.lat}" data-lng="${it.lon}">${it.display_name}</li>`).join('');
    list.hidden = false;
    list.querySelectorAll('li').forEach(li => li.addEventListener('click', () => {
      const coord = [parseFloat(li.dataset.lat), parseFloat(li.dataset.lng)];
      if (kind === 'from'){ state.fromCoord = coord; qs('#routeFrom').value = li.textContent; }
      else { state.toCoord = coord; qs('#routeTo').value = li.textContent; }
      list.hidden = true;
    }));
  } catch(e){}
}, 300);

/* ----- Rota real via OSRM ----- */
async function osrmRoute(from, to, profile){
  const osrmProfile = profile === 'bike' ? 'cycling' : profile === 'car' ? 'driving' : 'foot';
  const url = `https://router.project-osrm.org/route/v1/${osrmProfile}/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson&steps=true`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('osrm fail');
  const j = await r.json();
  if (!j.routes || !j.routes.length) throw new Error('no route');
  return j.routes[0];
}
function isNearCoord(a, b, threshold=0.0025){
  return Math.abs(a[0] - b[0]) <= threshold && Math.abs(a[1] - b[1]) <= threshold;
}
function isCuritibaHotelDemo(){
  return isNearCoord(state.fromCoord, DEMO_CURITIBA_ROUTE.from) && isNearCoord(state.toCoord, DEMO_CURITIBA_ROUTE.to);
}
function combineRoutes(routes){
  const coords = [];
  const legs = [];
  let distance = 0;
  let duration = 0;
  routes.forEach((route, idx) => {
    const segment = route.geometry.coordinates || [];
    coords.push(...(idx === 0 ? segment : segment.slice(1)));
    distance += route.distance || 0;
    duration += route.duration || 0;
    if (route.legs?.length) legs.push(...route.legs);
  });
  return {
    distance,
    duration,
    geometry: {type:'LineString', coordinates: coords},
    legs
  };
}
function densifyLatLngs(latlngs, minPoints=32){
  if (!Array.isArray(latlngs) || latlngs.length < 2) return latlngs || [];
  if (latlngs.length >= minPoints) return latlngs;
  const out = [];
  for (let i = 0; i < latlngs.length - 1; i++){
    const [lat1, lng1] = latlngs[i];
    const [lat2, lng2] = latlngs[i + 1];
    const segmentPoints = Math.max(2, Math.ceil(minPoints / (latlngs.length - 1)));
    for (let step = 0; step < segmentPoints; step++){
      const t = step / segmentPoints;
      out.push([
        lat1 + (lat2 - lat1) * t,
        lng1 + (lng2 - lng1) * t
      ]);
    }
  }
  out.push(latlngs[latlngs.length - 1]);
  return out;
}
function buildFallbackRoute(from, to, profile, via=null){
  const points = via ? [from, via, to] : [from, to];
  const coords = [];
  const pushSegment = (a, b, segments=18) => {
    const [lat1, lng1] = a;
    const [lat2, lng2] = b;
    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;
    const midLat = (lat1 + lat2) / 2;
    const midLng = (lng1 + lng2) / 2;
    const bend = Math.min(0.012, Math.hypot(dLat, dLng) * 0.45) * (profile === 'tour' ? 0.45 : profile === 'walk' ? 0.75 : 0.55);
    const perpLat = -dLng * bend;
    const perpLng = dLat * bend;
    for (let i = 0; i <= segments; i++){
      const t = i / segments;
      const q1 = (1 - t) * (1 - t);
      const q2 = 2 * (1 - t) * t;
      const q3 = t * t;
      const lat = q1 * lat1 + q2 * (midLat + perpLat) + q3 * lat2;
      const lng = q1 * lng1 + q2 * (midLng + perpLng) + q3 * lng2;
      if (!coords.length || coords[coords.length - 1][0] !== lng || coords[coords.length - 1][1] !== lat){
        coords.push([lng, lat]);
      }
    }
  };
  for (let i = 0; i < points.length - 1; i++) pushSegment(points[i], points[i+1], 18);
  const meters = points.slice(1).reduce((acc, p, idx) => acc + distanceMeters(points[idx][0], points[idx][1], p[0], p[1]), 0);
  const speed = profile === 'bike' ? 14 : profile === 'walk' ? 4.5 : profile === 'tour' ? 20 : 32;
  const duration = (meters / 1000) / speed * 3600;
  const steps = coords.slice(1).map((c, idx) => {
    const prev = coords[idx];
    const d = distanceMeters(prev[1], prev[0], c[1], c[0]);
    return {
      maneuver: { type: idx === 0 ? 'depart' : 'continue', modifier: idx === 0 ? 'straight' : null },
      name: idx === 0 ? 'vias principais' : idx === coords.length - 2 ? 'destino' : 'trajeto contínuo',
      distance: d,
      duration: (d / 1000) / speed * 3600
    };
  }).slice(0, 8);
  return {
    distance: meters,
    duration,
    geometry: { type:'LineString', coordinates: coords },
    legs: [{ steps }]
  };
}
function routeRisk(coords, hour){
  let sum = 0;
  const step = Math.max(1, Math.floor(coords.length/20));
  let n = 0;
  for (let i = 0; i < coords.length; i += step){
    const [lng, lat] = coords[i];
    DATA.incidents.forEach(inc => {
      const d = distanceMeters(lat, lng, inc.lat, inc.lng);
      if (d < 140){
        sum += incidentRisk(inc, hour) * (1 - d/140) * (inc.type === 'safe' ? -0.3 : 1);
      }
    });
    n++;
  }
  return Math.max(0, Math.min(1, sum / Math.max(1,n) * 0.9));
}
async function calcSafeRoute(silent){
  if (!state.map) return;
  let route;
  let avoidedRoute = null;
  let usedSafeDetour = false;
  try {
    if (isCuritibaHotelDemo() && state.profile !== 'bike'){
      avoidedRoute = await osrmRoute(state.fromCoord, state.toCoord, state.profile);
      const legA = await osrmRoute(state.fromCoord, DEMO_CURITIBA_ROUTE.waypoint, state.profile);
      const legB = await osrmRoute(DEMO_CURITIBA_ROUTE.waypoint, state.toCoord, state.profile);
      route = combineRoutes([legA, legB]);
      usedSafeDetour = true;
    } else {
      route = await osrmRoute(state.fromCoord, state.toCoord, state.profile);
    }
  } catch(e){
    if (isCuritibaHotelDemo() && state.profile !== 'bike'){
      avoidedRoute = buildFallbackRoute(state.fromCoord, state.toCoord, state.profile);
      const legA = buildFallbackRoute(state.fromCoord, DEMO_CURITIBA_ROUTE.waypoint, state.profile);
      const legB = buildFallbackRoute(DEMO_CURITIBA_ROUTE.waypoint, state.toCoord, state.profile);
      route = combineRoutes([legA, legB]);
      usedSafeDetour = true;
      if (!silent) toast('Rota estimada exibida sem conexão com o motor externo.');
    } else {
      route = buildFallbackRoute(state.fromCoord, state.toCoord, state.profile);
      if (!silent) toast('Rota estimada exibida sem conexão com o motor externo.');
    }
  }
  const coords = route.geometry.coordinates; // [lng,lat]
  const latlngs = densifyLatLngs(coords.map(c => [c[1], c[0]]));
  const hour = state.time;
  const nearbyIncidents = routeIncidents(coords);
  const highRiskHits = nearbyIncidents.filter(i => i.severity === 'high' && i.type !== 'safe');
  const supportHits = nearbyIncidents.filter(i => i.type === 'safe');

  if (state.routeLayer) state.map.removeLayer(state.routeLayer);
  if (state.altLayer) { state.map.removeLayer(state.altLayer); state.altLayer = null; }
  if (state.avoidedLayer) { state.map.removeLayer(state.avoidedLayer); state.avoidedLayer = null; }
  if (state.routeStartMarker) { state.map.removeLayer(state.routeStartMarker); state.routeStartMarker = null; }
  if (state.routeEndMarker) { state.map.removeLayer(state.routeEndMarker); state.routeEndMarker = null; }

  const avoidedLatlngs = avoidedRoute?.geometry?.coordinates?.map(c => [c[1], c[0]]) || null;
  if (usedSafeDetour && avoidedLatlngs?.length){
    state.avoidedLayer = L.polyline(avoidedLatlngs, {
      pane:'routePane',
      color:UI_COLORS.routeAvoid,
      weight:5,
      opacity:.92,
      dashArray:'10 10',
      lineCap:'round',
      lineJoin:'round',
      className:'az-route-avoid'
    }).addTo(state.map);
    state.avoidedLayer.bringToFront();
  }

  const routeBase = L.polyline(latlngs, {pane:'routePane', color:UI_COLORS.routeBase, weight:14, opacity:1, lineCap:'round', lineJoin:'round', className:'az-route-base'});
  const routeMain = L.polyline(latlngs, {pane:'routePane', color:UI_COLORS.route, weight:8, opacity:1, lineCap:'round', lineJoin:'round', className:'az-route-main'});
  state.routeLayer = L.layerGroup([routeBase, routeMain]).addTo(state.map);
  routeBase.bringToBack();
  routeMain.bringToFront();
  const startIcon = L.divIcon({
    className:'route-pin start',
    html:'<span>1</span>',
    iconSize:[28,28],
    iconAnchor:[14,14]
  });
  const endIcon = L.divIcon({
    className:'route-pin end',
    html:'<span>2</span>',
    iconSize:[28,28],
    iconAnchor:[14,14]
  });
  state.routeStartMarker = L.marker(latlngs[0], {pane:'routePane', icon:startIcon, interactive:false}).addTo(state.map);
  state.routeEndMarker = L.marker(latlngs[latlngs.length - 1], {pane:'routePane', icon:endIcon, interactive:false}).addTo(state.map);
  state.routeStartMarker.setZIndexOffset(1000);
  state.routeEndMarker.setZIndexOffset(1000);
  state.routeGeo = { latlngs, route, nearbyIncidents, avoidedLatlngs, usedSafeDetour };
  state.map.fitBounds(L.latLngBounds(latlngs), {padding:[60,60], animate:false});
  refreshRouteDrawing();

  const km = (route.distance/1000).toFixed(1);
  const mins = Math.round(route.duration/60);
  const risk = routeRisk(coords, hour);
  const trust = 100 - Math.round(risk*100);
  qs('#rResTitle').textContent = `${qs('#routeFrom').value} → ${qs('#routeTo').value}`;
  qs('#rResRisk').textContent = `${trust}/100`;
  qs('#rResTime').textContent = `${mins} min`;
  qs('#rResDist').textContent = `${km} km`;
  qs('#routeResult').hidden = false;
  qs('#rpSteps').hidden = true;
  qs('#routePanel')?.classList.add('compact');

  // Avisos
  const timeAdv = hour < 0 ? '' : (hour >= 19 || hour <= 5) ? 'Passeio inclui horário noturno · prefira vias bem iluminadas e retorno por app se necessário' : '';
  const profileAdv = state.profile === 'car' ? 'Trajeto pensado para carro ou aplicativo, priorizando vias principais.' : state.profile === 'bike' ? 'Percurso de bike exige atenção redobrada em cruzamentos e trechos úmidos.' : state.profile === 'tour' ? 'Passeio guiado prioriza leitura simples e pontos turísticos pelo caminho.' : 'Trajeto caminhável priorizando leitura simples e contexto turístico.';
  const adv = [
    {ico:'🧭', txt: usedSafeDetour ? 'Rota demonstrativa priorizando Batel → Centro Cívico → Parque Tanguá, mantendo o trajeto nas vias principais e evitando atalhos laterais com pior histórico recente.' : profileAdv},
    {ico:'🕒', txt: timeAdv || 'Horário favorável para passeio, com melhor leitura do entorno.'},
    {ico:'🛡️', txt: supportHits.length ? `Há ${supportHits.length} ponto(s) de apoio próximos ao trajeto.` : 'Não há base de apoio próxima ao trajeto inicial.'},
    {ico:'⚠️', txt: usedSafeDetour ? 'Desvio aplicado para evitar trechos laterais da Alameda Doutor Carlos de Carvalho, Rua Brigadeiro Franco, Rua Mateus Leme e acessos secundários ao Tanguá, onde houve relatos de golpes, furtos e roubos.' : highRiskHits.length ? `${highRiskHits.length} ponto(s) sensível(is) exigem atenção ao longo do caminho.` : 'Nenhum ponto crítico identificado no corredor imediato da rota.'}
  ];
  qs('#rResAdvisory').innerHTML = adv.map(a=>`<li><span>${a.ico}</span> ${a.txt}</li>`).join('');
  const guide = destinationGuideFor(qs('#routeTo').value);
  const destGuidePhoto = qs('#destGuidePhoto');
  if (guide){
    qs('#routeDestination').hidden = false;
    if (guide.photo){
      destGuidePhoto.hidden = false;
      destGuidePhoto.src = guide.photo;
      destGuidePhoto.alt = guide.title;
    } else {
      destGuidePhoto.hidden = true;
      destGuidePhoto.removeAttribute('src');
      destGuidePhoto.alt = '';
    }
    qs('#destGuideTitle').textContent = guide.title;
    qs('#destGuideBest').textContent = guide.best;
    qs('#destGuideSupport').textContent = guide.support;
    qs('#destGuideAlert').textContent = guide.alert;
    qs('#destGuideTip').textContent = guide.tip;
  } else {
    qs('#routeDestination').hidden = true;
    destGuidePhoto.hidden = true;
    destGuidePhoto.removeAttribute('src');
    destGuidePhoto.alt = '';
  }

  // Passos
  const steps = (route.legs[0]?.steps || []).map(s => ({
    text: osrmStepText(s),
    dist: Math.round(s.distance),
    time: Math.round(s.duration/60)
  })).filter(s => s.text);
  state.routeSteps = steps;
  if (steps.length){
    qs('#rpStepsList').innerHTML = steps.slice(0,8).map(s => `<li>${s.text} <small style="color:var(--muted)">· ${s.dist}m</small></li>`).join('');
  } else {
    qs('#rpStepsList').innerHTML = '';
  }

  state._fastLatlngs = latlngs;
  if (!silent) toast('Roteiro confiável calculado');
  // Update sidebar score
  qs('#sidebarScore').style.width = trust + '%';
  qs('#sidebarScoreText').textContent = trust + '/100';
}
function editRoute(){
  qs('#routePanel')?.classList.remove('compact');
  qs('#rpSteps').hidden = true;
  qs('#routeMinimal')?.setAttribute('hidden', '');
  qs('#routeBuilder')?.removeAttribute('hidden');
  qs('#routeResult').hidden = true;
  updateRouteOverlay();
}
function toggleRouteDetails(){
  const steps = qs('#rpSteps');
  if (!steps || !state.routeSteps.length) return;
  steps.hidden = !steps.hidden;
}
function osrmStepText(s){
  const m = s.maneuver || {};
  const name = s.name || 'via';
  const map = {
    'depart':'Comece em', 'arrive':'Chegada em', 'turn':'Vire em', 'new name':'Continue em',
    'continue':'Continue em', 'merge':'Incorpore em', 'roundabout':'Entre na rotatória em'
  };
  const verb = map[m.type] || 'Siga em';
  const mod = m.modifier ? ` (${m.modifier.replace('left','esq.').replace('right','dir.').replace('slight','leve ').replace('sharp','acentuada ')})` : '';
  return `${verb} ${name}${mod}`;
}
function compareAlt(){
  if (!state.routeGeo) return;
  if (state.altLayer) { state.map.removeLayer(state.altLayer); state.altLayer = null; return toast('Trechos sensíveis ocultados'); }
  const sensitive = state.routeGeo.latlngs.filter(([lat, lng]) => {
    return state.routeGeo.nearbyIncidents?.some(inc => inc.severity === 'high' && distanceMeters(lat, lng, inc.lat, inc.lng) <= 110);
  });
  if (sensitive.length < 2) return toast('Nenhum trecho sensível relevante nesse trajeto.');
  state.altLayer = L.polyline(sensitive, {pane:'routePane', color:UI_COLORS.danger, weight:4, opacity:.88, dashArray:'6 8', lineCap:'round'}).addTo(state.map);
  toast('Trechos sensíveis destacados em vermelho');
}
function toggleDirectRoute(){
  if (!state.routeGeo?.usedSafeDetour || !state.avoidedLayer) return toast('Nenhuma rota direta relevante para comparar.');
  if (state.map.hasLayer(state.avoidedLayer)){
    state.map.removeLayer(state.avoidedLayer);
    return toast('Rota direta ocultada');
  }
  state.avoidedLayer.addTo(state.map);
  toast('Rota direta exibida em cinza');
}

/* ----- Isócrona segura (simulada: círculos concêntricos tintados por risco) ----- */
function toggleIsochrone(on){
  if (!on){ if (state.isoLayer){ state.map.removeLayer(state.isoLayer); state.isoLayer=null; } return; }
  state.isoLayer = L.layerGroup();
  const colors = [UI_COLORS.ok, UI_COLORS.primary2, UI_COLORS.warning, UI_COLORS.danger];
  [200, 400, 700, 1100].forEach((r, idx) => {
    L.circle(state.fromCoord, {radius:r, color:colors[idx], fillColor:colors[idx], fillOpacity:.08, weight:1}).addTo(state.isoLayer);
  });
  state.isoLayer.addTo(state.map);
  toast('Raio caminhável 15 min · verde = recomendado, vermelho = evite');
}

/* ----- Trip ativo ----- */
function startTrip(){
  if (!state.routeSteps.length){ toast('Monte um roteiro primeiro'); return; }
  state.tripStart = Date.now();
  state.tripStepIndex = 0;
  showPage('trip');
  clearInterval(state.tripTimer);
  state.tripTimer = setInterval(advanceTrip, 3500);
  toast('Passeio iniciado · acompanhamento ativo');
}
function advanceTrip(){
  state.tripStepIndex = Math.min(state.tripStepIndex + 1, state.routeSteps.length - 1);
  renderTrip();
  if (state.tripStepIndex >= state.routeSteps.length - 1){
    clearInterval(state.tripTimer);
    toast('Você chegou à atração 🎉 Aproveite o passeio!');
  }
}
function renderTrip(){
  const has = state.routeSteps.length > 0 && state.tripStart;
  qs('#tripEmpty').hidden = has;
  qs('#tripActive').hidden = !has;
  if (!has) return;
  const cur = state.routeSteps[state.tripStepIndex] || {};
  const elapsed = Math.round((Date.now() - state.tripStart)/1000/60);
  qs('#tripElapsed').textContent = elapsed + ' min';
  qs('#tripNext').textContent = cur.text || 'Siga em frente';
  qs('#tripNextMeta').textContent = `${cur.dist||200}m · trecho turístico monitorado`;
  const score = 70 + Math.round(Math.random()*20);
  qs('#tripScore').textContent = score;
  qs('#tripRing').style.background = `conic-gradient(var(--ok) ${score}%, var(--bg-2) 0)`;
  qs('#tripStepsList').innerHTML = state.routeSteps.map((s, idx) => `
    <li class="${idx < state.tripStepIndex ? 'done' : idx === state.tripStepIndex ? 'active' : ''}">
      <div><strong>${s.text}</strong><br><small>${s.dist}m · ~${s.time||1} min</small></div>
      <small>${idx < state.tripStepIndex ? '✓' : idx === state.tripStepIndex ? '•' : ''}</small>
    </li>
  `).join('');
}
function stopTrip(){
  clearInterval(state.tripTimer);
  state.tripStart = null;
  state.tripStepIndex = 0;
  renderTrip();
  toast('Passeio encerrado');
  showPage('map');
}

/* ----- Perfil chips ----- */
document.addEventListener('click', e => {
  const chip = e.target.closest('.rp-profile .chip');
  if (!chip) return;
  qsa('.rp-profile .chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  state.profile = chip.dataset.prof;
});

/* ----- Alertas / News / Community ----- */
let alertTab = 'todos';
function switchTab(page, tab){
  alertTab = tab;
  qsa(`#page-${page} .tab`).forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  renderAlerts();
}
function renderAlerts(){
  const list = DATA.alerts.filter(a => alertTab === 'todos' ? true : a.src === alertTab);
  const total = DATA.alerts.length;
  const official = DATA.alerts.filter(a => a.src === 'oficial').length;
  const community = DATA.alerts.filter(a => a.src === 'comunidade').length;
  const el = qs('#alertList');
  if (!list.length){
    el.innerHTML = `<div class="empty-state"><div class="empty-ico">✨</div><h3>Nenhum alerta</h3><p>Tudo tranquilo por aqui nesta categoria.</p></div>`;
  } else {
    el.innerHTML = list.map(a => {
      const badge = a.severity === 'alto' ? 'alto' : a.src === 'oficial' ? 'oficial' : 'comunidade';
      const ico = a.src === 'oficial' ? '🏛' : '⚑';
      const sevLabel = a.severity === 'alto' ? 'Atenção alta' : a.severity === 'med' ? 'Atenção moderada' : 'Baixa atenção';
      const v = state.validations[a.id] || {up: Math.floor(Math.random()*8+2), down: Math.floor(Math.random()*3), here: Math.floor(Math.random()*4), my:null};
      state.validations[a.id] = v;
      const val = a.src === 'comunidade' ? `
        <div class="alert-validate">
          <button class="val-btn ok ${v.my==='up'?'voted':''}" onclick="validate(${a.id},'up')">✓ Confirmar <b>${v.up}</b></button>
          <button class="val-btn bad ${v.my==='down'?'voted':''}" onclick="validate(${a.id},'down')">✕ Contestar <b>${v.down}</b></button>
          <button class="val-btn ${v.my==='here'?'voted':''}" onclick="validate(${a.id},'here')">📍 Estive lá <b>${v.here}</b></button>
          <span class="val-stats">Confiança: <b>${Math.round(100*v.up/(v.up+v.down+1))}%</b></span>
        </div>` : `
        <div class="alert-validate">
          <span class="val-stats">Fonte oficial · validação automática</span>
        </div>`;
      return `<li>
        <div class="alert-badge ${badge}">${ico}</div>
        <div>
          <strong>${a.title}</strong>
          <p style="margin:.2rem 0;color:var(--muted)">${a.desc}</p>
          <div class="alert-meta">
            <span class="src-chip">${a.src === 'oficial' ? 'Fonte oficial' : 'Comunidade'}</span>
            <span class="src-chip">${sevLabel}</span>
            <span>📍 ${a.area}</span>
            <span>⏱ ${a.when}</span>
          </div>
          ${val}
        </div>
        <button class="btn btn-ghost sm" onclick="focusAlert(${a.id})">Abrir no mapa</button>
      </li>`;
    }).join('');
  }
  qs('#sumAlertsTotal').textContent = total;
  qs('#sumAlertsOfficial').textContent = official;
  qs('#sumAlertsCommunity').textContent = community;
  qs('#alertCount').textContent = DATA.alerts.filter(a=>a.severity==='alto'||a.src==='oficial').length;
}
function renderNews(){
  qs('#newsGrid').innerHTML = DATA.news.map(n => `
    <article class="news-card"><div class="news-thumb">${n.icon}</div>
      <div class="news-body"><span class="news-src">${n.src}</span>
        <div class="news-title">${n.title}</div><span class="news-date">${n.date}</span><span class="src-chip">Impacta deslocamento e passeio</span></div>
    </article>`).join('');
}
function renderCommunity(){
  qs('#storyStrip').innerHTML = DATA.stories.map(s => `
    <article class="story-card ${s.mine ? 'mine' : ''} ${s.seen ? 'seen' : ''}" style="background:${s.cover}">
      <div class="story-avatar-wrap ${s.mine ? 'mine' : ''}">
        <img src="${s.avatar}" alt="">
        ${s.mine ? '<span class="story-add-badge">＋</span>' : ''}
      </div>
      <div class="story-meta">
        <strong>${s.name}</strong>
        <span>${s.area}</span>
      </div>
    </article>`).join('');
  qs('#groupList').innerHTML = DATA.groups.map(g => `
    <article class="compact-pill">
      <span class="compact-emoji">${g.emoji}</span>
      <div><strong>${g.name}</strong><small>${g.members}</small></div>
      <button class="btn btn-ghost sm" type="button" onclick="openChatFromCommunity('${g.name}')">Abrir chat</button>
    </article>`).join('');
  qs('#peopleList').innerHTML = DATA.people.map(p => `
    <article class="compact-pill compact-person">
      <img src="${p.avatar}" alt="">
      <div><strong>${p.name}</strong><small>${p.role}</small></div>
      <button class="btn btn-ghost sm" type="button" onclick="openChatFromCommunity('${p.name}')">Chamar</button>
    </article>`).join('');
  qs('#commFeed').innerHTML = DATA.posts.map(p => `
    <article class="post">
      <div class="post-head">
        <img src="${p.avatar}" alt="">
        <div class="post-meta">
          <strong>${p.user}</strong>
          <span>${p.area}</span>
        </div>
        <time>${p.when}</time>
      </div>
      <div class="post-body">${p.body}</div>
      <div class="post-footer"><button>♡ ${p.likes}</button><button>💬 ${p.comments}</button><button onclick="focusAreaOnMap('${p.area}','${p.user} · ${p.area}')">Abrir no mapa</button></div>
    </article>`).join('');
}
function openChat(id){
  state.activeChatId = id;
  renderChat();
}
function openChatFromCommunity(name){
  const presetMap = {
    'Roteiro Paraná · feriado':'chat3',
    'Viajantes solo · Sul do Brasil':'chat3',
    'Famílias em Foz do Iguaçu':'chat1',
    'Foodies em Morretes e Antonina':'chat3',
    'Lívia C.':'chat1',
    'Rafa M.':'chat2'
  };
  const knownId = presetMap[name];
  if (knownId){
    state.activeChatId = knownId;
  } else {
    const slug = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');
    const existing = DATA.chats.find(c => c.id === `chat-${slug}`);
    if (!existing){
      DATA.chats.unshift({
        id:`chat-${slug}`,
        name,
        avatar:'https://i.pravatar.cc/80?img=41',
        area:'Conversa iniciada da comunidade',
        last:'Oi! Vi seu perfil na comunidade da Azimute.',
        when:'agora',
        unread:0,
        messages:[
          {from:'me', text:'Oi! Vi seu perfil na comunidade da Azimute.', time:'agora'},
          {from:'them', text:'Claro. Posso ajudar com dicas rápidas do destino.', time:'agora'}
        ]
      });
      state.activeChatId = `chat-${slug}`;
    } else {
      state.activeChatId = existing.id;
    }
  }
  showPage('chat');
}
function draftNewChat(){
  toast('Sugestão de demo: iniciar conversa a partir de um perfil ou grupo da comunidade.');
}
function sendChatMessage(){
  const input = qs('#chatInput');
  const text = input?.value.trim();
  if (!text) return;
  const active = DATA.chats.find(c => c.id === state.activeChatId);
  if (!active) return;
  active.messages.push({from:'me', text, time:'agora'});
  active.last = text;
  active.when = 'agora';
  active.unread = 0;
  input.value = '';
  renderChat();
  qs('#chatMessages')?.scrollTo({top: qs('#chatMessages').scrollHeight, behavior:'smooth'});
}
function renderChat(){
  const chats = DATA.chats;
  const active = chats.find(c => c.id === state.activeChatId) || chats[0];
  state.activeChatId = active.id;
  qs('#chatCount').textContent = `${chats.length} chats`;
  qs('#chatList').innerHTML = chats.map(c => `
    <button class="chat-thread ${c.id === active.id ? 'active' : ''}" onclick="openChat('${c.id}')">
      <img src="${c.avatar}" alt="">
      <div class="chat-thread-copy">
        <strong>${c.name}</strong>
        <span>${c.last}</span>
      </div>
      <div class="chat-thread-meta">
        <small>${c.when}</small>
        ${c.unread ? `<b>${c.unread}</b>` : ''}
      </div>
    </button>`).join('');
  qs('#chatTitle').textContent = active.name;
  qs('#chatArea').textContent = active.area;
  qs('#chatMessages').innerHTML = active.messages.map(m => `
    <div class="chat-bubble ${m.from === 'me' ? 'me' : 'them'}">
      <p>${m.text}</p>
      <small>${m.time}</small>
    </div>`).join('');
}

/* ----- Validação comunitária ----- */
function validate(id, kind){
  const v = state.validations[id]; if (!v) return;
  if (v.my === kind){ v[kind]--; v.my = null; }
  else {
    if (v.my) v[v.my]--;
    v[kind]++; v.my = kind;
  }
  renderAlerts();
  const msgs = {up:'Validação registrada · obrigado por confirmar', down:'Contestação registrada · vamos revisar', here:'Presença registrada · +1 peso no score'};
  toast(msgs[kind]);
}

/* ----- ICA · Índice de Confiança Azimute ----- */
function renderIca(){
  // Score médio ponderado
  const avg = REGIONS.reduce((s,r)=>s+r.ica,0) / REGIONS.length;
  const ica = Math.round(avg);
  const pOfficial = +(REGIONS.reduce((s,r)=>s+r.sources.official,0)/REGIONS.length).toFixed(2);
  const pCommunity = +(REGIONS.reduce((s,r)=>s+r.sources.community,0)/REGIONS.length).toFixed(2);
  const pPredict = +(REGIONS.reduce((s,r)=>s+r.sources.predict,0)/REGIONS.length).toFixed(2);

  const ring = qs('#icaRing');
  ring.style.background = `conic-gradient(${regionColor(ica)} ${ica}%, var(--bg-2) 0)`;
  qs('#icaScore').textContent = ica;
  const cls = ica >= 75 ? 'ok' : ica >= 55 ? 'warn' : 'bad';
  const label = ica >= 75 ? 'Bom' : ica >= 55 ? 'Atenção' : 'Crítico';
  const klass = qs('#icaClass');
  klass.textContent = label;
  klass.className = 'ica-class ' + cls;

  qs('#pillarOfficial').textContent = Math.round(pOfficial*100);
  qs('#pillarOfficialBar').style.width = (pOfficial*100)+'%';
  qs('#pillarCommunity').textContent = Math.round(pCommunity*100);
  qs('#pillarCommunityBar').style.width = (pCommunity*100)+'%';
  qs('#pillarPredict').textContent = Math.round(pPredict*100);
  qs('#pillarPredictBar').style.width = (pPredict*100)+'%';

  qs('#srcStatus').innerHTML = OFFICIAL_SOURCES.map(s => {
    const ok = s.status === 'online';
    return `<li><span>${s.name}</span><span class="st ${ok?'':'off'}"><span class="live-dot sm"></span> ${ok?'online':'sync'} · ${s.latency}</span></li>`;
  }).join('');

  qs('#statValid24').textContent = 184 + Math.floor(Math.random()*20);
  qs('#statContrib').textContent = 62 + Math.floor(Math.random()*10);
  qs('#statVerified').textContent = '94%';

  // Forecast 30/60/120 min
  const base = 1 - pPredict;
  const fc = [
    {t:'+30 min', risk: Math.max(.1, base - .1 + Math.random()*.15)},
    {t:'+60 min', risk: Math.max(.1, base + Math.random()*.2)},
    {t:'+120 min', risk: Math.max(.15, base + .05 + Math.random()*.25)}
  ];
  qs('#forecast').innerHTML = fc.map(f => {
    const pct = Math.round(f.risk*100);
    const cls = pct > 55 ? 'hi' : pct > 30 ? '' : 'low';
    return `<div class="fc"><div class="fc-bar ${cls}" style="height:${Math.max(10,pct)}%"></div><span>${f.t}</span><b>${pct}/100</b></div>`;
  }).join('');
  qs('#modelConf').textContent = Math.round(pPredict*100+12) + '%';

  qs('#regionList').innerHTML = REGIONS.map(r => {
    const cls = regionClass(r.ica);
    const trendCls = r.trend === 'up' ? 'up' : r.trend === 'down' ? 'down' : 'flat';
    const trendIco = r.trend === 'up' ? '↗' : r.trend === 'down' ? '↘' : '→';
    return `<li>
      <div class="r-head">
        <strong>${r.name}</strong>
        <span class="r-ica ${cls}">${r.ica}</span>
      </div>
      <div class="r-bar"><span style="width:${r.ica}%;background:${regionColor(r.ica)}"></span></div>
      <div class="r-meta">
        <span class="trend ${trendCls}">${trendIco} ${r.delta>0?'+':''}${r.delta} em 24h</span>
        <span>ofic ${Math.round(r.sources.official*100)} · com ${Math.round(r.sources.community*100)} · prev ${Math.round(r.sources.predict*100)}</span>
      </div>
    </li>`;
  }).join('');
}

/* ----- Reportar ----- */
function submitReport(ev){
  ev.preventDefault();
  const type = qs('#repType').value;
  const place = qs('#repPlace').value || 'não informado';
  const when = qs('#repWhen').value;
  const desc = qs('#repDesc').value.trim() || 'Relato enviado para ajudar outros viajantes no destino.';
  const anon = qs('#repAnon').checked;
  DATA.posts.unshift({
    user: anon ? 'Viajante anônimo' : 'João Vitor',
    avatar: anon ? 'https://i.pravatar.cc/80?img=68' : 'https://i.pravatar.cc/80?img=12',
    when: 'agora',
    body: `${desc} (${type.replaceAll('-', ' ')})`,
    likes: 0,
    comments: 0,
    area: place
  });
  DATA.stories[0] = {
    name:'Seu story',
    area: place,
    avatar:'https://i.pravatar.cc/80?img=12',
    cover:'linear-gradient(180deg, rgba(7,18,22,.15), rgba(7,18,22,.92)), linear-gradient(135deg, #5b8def, #27c7b8)',
    mine:true
  };
  renderCommunity();
  toast(`Relato publicado · ${type} em ${place} (${when.toLowerCase()}).`);
  ev.target.reset();
  showPage('community');
}

/* ----- SOS ----- */
function sosAlert(){ qs('#sosModal').hidden = false; }
function closeModal(id){ qs('#'+id).hidden = true; }
function confirmSos(){ closeModal('sosModal'); toast('SOS acionado. Contatos, consulado e viajantes próximos foram notificados (simulado).'); }

/* ----- Dashboards de parceiros de turismo ----- */
function showPartner(kind){
  qsa('.partner-tab').forEach(b => b.classList.toggle('active', b.dataset.kind === kind));
  const dash = qs('#partnerDash');
  const charts = {
    guide: [
      {k:'Turistas em tour hoje', v:'58', d:'12 países atendidos', cls:'ok'},
      {k:'Atrações verificadas', v:'142', d:'atualizadas hoje', cls:'ok'},
      {k:'Avaliação do guia', v:'4.9★', d:'+0.2 vs mês anterior', cls:'ok'},
    ],
    lodging: [
      {k:'Hóspedes ativos', v:'46', d:'8 nacionalidades', cls:'ok'},
      {k:'Selo Confiança', v:'Verificada', d:'renovado em abr/2026', cls:'ok'},
      {k:'Alertas no entorno', v:'3', d:'compartilhados com hóspedes', cls:'warn'},
    ],
    agency: [
      {k:'Pacotes vendidos · mês', v:'214', d:'+18% vs mês anterior', cls:'ok'},
      {k:'Roteiros confiáveis ativos', v:'37', d:'curados pela Azimute', cls:'ok'},
      {k:'Reclamações recebidas', v:'2', d:'-4 vs mês anterior', cls:'ok'},
    ],
    tourismboard: [
      {k:'Score médio do destino', v:'71/100', d:'+3 vs trimestre anterior', cls:'ok'},
      {k:'Avisos consulares ativos', v:'5', d:'países emissores', cls:'warn'},
      {k:'Operadores credenciados', v:'128', d:'9 novos esta semana', cls:'ok'},
    ]
  };
  const bars = Array.from({length:16}, (_,i) => i);
  const data = charts[kind] || charts.guide;
  const mapCenter = {
    guide:'Rotas turísticas favoritas',
    lodging:'Entorno da hospedagem',
    agency:'Destinos vendidos · 30 dias',
    tourismboard:'Cidade · mapa de confiança'
  }[kind] || 'Visão do destino';
  dash.innerHTML = `
    ${data.map(c => `<article class="dash-card kpi"><h4>${c.k}</h4><div class="dash-num ${c.cls}">${c.v}</div><div class="dash-delta">${c.d}</div></article>`).join('')}
    <article class="dash-card" style="grid-column:span 2">
      <h4>Tendência 30 dias — ${mapCenter}</h4>
      <div class="dash-chart">${bars.map(i => {
        const h = 20 + Math.round(Math.random()*70);
        const hi = h > 70 ? ' class="hi"' : '';
        return `<span${hi} style="height:${h}%"></span>`;
      }).join('')}</div>
      <div class="dash-delta">Barras vermelhas = dias com picos de ocorrências</div>
    </article>
    <article class="dash-card">
      <h4>Ações recentes</h4>
      <ul class="dash-list">
        <li><span>Roteiro confiável compartilhado</span><b>há 3 min</b></li>
        <li><span>Alerta de turismo enviado a viajantes</span><b>há 18 min</b></li>
        <li><span>Relatório diário do destino</span><b>hoje 08:00</b></li>
        <li><span>Webhook anti-golpe entregue</span><b>há 2h</b></li>
      </ul>
    </article>
    <article class="dash-card">
      <h4>Integração ativa</h4>
      <ul class="dash-list">
        <li><span>Fontes conectadas</span><b>8 ativas</b></li>
        <li><span>Atualização média</span><b>142ms</b></li>
        <li><span>Relatórios ao dia</span><b>24</b></li>
      </ul>
      <button class="btn btn-primary sm" onclick="toast('Módulo institucional em evolução')">Ver visão do parceiro</button>
    </article>`;
}

/* ----- Onboarding ----- */
function openOnboarding(){ state.onbStep = 0; showOnbStep(0); qs('#onbModal').hidden = false; }
function showOnbStep(n){
  state.onbStep = n;
  qsa('.onb-step').forEach(s => s.hidden = parseInt(s.dataset.step,10) !== n);
  qsa('.onb-dots i').forEach((d,i) => d.classList.toggle('on', i === n));
  qs('#onbNextBtn').textContent = n === 2 ? 'Concluir' : 'Próximo';
}
function onbNext(){
  if (state.onbStep === 1){
    const sel = qs('.onb-profile .chip.active');
    if (sel) state.profile = sel.dataset.onp;
  }
  if (state.onbStep === 2){
    localStorage.setItem('az.onb','1');
    localStorage.setItem('az.area', qs('#onbArea').value || '');
    closeModal('onbModal');
    toast('Perfil configurado. Boas vindas!');
    return;
  }
  showOnbStep(state.onbStep + 1);
}
function onbSkip(){ localStorage.setItem('az.onb','1'); closeModal('onbModal'); }
document.addEventListener('click', e => {
  const c = e.target.closest('.onb-profile .chip');
  if (!c) return;
  qsa('.onb-profile .chip').forEach(x => x.classList.remove('active'));
  c.classList.add('active');
});

/* ----- PWA ----- */
function installPwa(){
  if (!state.deferredPrompt) return toast('PWA instalável apenas em navegadores compatíveis.');
  state.deferredPrompt.prompt();
}
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); state.deferredPrompt = e; });
if ('serviceWorker' in navigator){
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(()=>{}); });
}

/* ----- Init ----- */
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(); applySenior(); applyI18n();
  renderAlerts();
  renderCommunity();
  renderChat();

  // Lang switches
  ['langSwitch','langSwitchApp'].forEach(id => {
    const el = qs('#'+id); if (!el) return;
    el.value = state.lang;
    el.addEventListener('change', e => { state.lang = e.target.value; localStorage.setItem('az.lang', state.lang); applyI18n(); });
  });

  // Geocoder
  qs('#routeFrom')?.addEventListener('input', e => geocode(e.target.value, 'sugFrom', 'from'));
  qs('#routeTo')?.addEventListener('input', e => geocode(e.target.value, 'sugTo', 'to'));
  document.addEventListener('click', e => {
    if (!e.target.closest('.geo-field')) { qs('#sugFrom').hidden = true; qs('#sugTo').hidden = true; }
  });

  // Time slider
  qs('#timeRange')?.addEventListener('input', e => onTimeChange(e.target.value));

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){ qsa('.modal').forEach(m => m.hidden = true); }
    if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)){ e.preventDefault(); qs('#globalSearch')?.focus(); }
  });
});

/* Expor globais */
Object.assign(window, {
  enterApp, leaveApp, showPage, toggleSidebar, togglePanel,
  toggleTheme, toggleSenior, toggleLayer, toggleIsochrone,
  openCommunityReport, draftStory, openRouteBuilder, applyJourney, toggleRouteAdvanced, applyAssistMode, applyNowMode,
  centerOnUser, focusNearestSupportToUser, showAttentionAroundUser, calcSafeRoute, editRoute, toggleRouteDetails, toggleDirectRoute, compareAlt, startTrip, stopTrip,
  focusAlert, focusAreaOnMap, setDestinationFromIncident, focusSupportNearIncident,
  switchTab, submitReport, sosAlert, closeModal, confirmSos,
  openChat, openChatFromCommunity, draftNewChat, sendChatMessage,
  validate, showPartner,
  onbNext, onbSkip, installPwa
});
