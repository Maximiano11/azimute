// ════════════════════════════════
//  DATA
// ════════════════════════════════
const PLACES = [
  {
    id:'p1', type:'restaurant', name:'Pad Thai Nana', city:'Bangkok', country:'Tailândia', flag:'🇹🇭',
    emoji:'🍜', lat:13.740, lng:100.555, risk:'caution',
    address:'Soi 4, Sukhumvit Road, Bangkok', score:3.8, reviews:47,
    tags:['Comida Tailandesa','Street Food','Turístico'],
    scores:{precos:2.5, qualidade:4.2, atendimento:3.1, seguranca:3.8},
    tips:['Negocie o preço ANTES de sentar. Cardápio para turistas tem preço 3x maior.','Melhor pedir o que está no carrinho da rua, mais barato e autêntico.'],
    photos:['🍜','🌶️','🧆'],
    reviews_list:[
      {user:'Carlos M.', avatar:'https://i.pravatar.cc/40?img=12', stars:2, date:'2 dias',
       text:'Cobrou 800 baht por um pad thai que custa 80 em qualquer lugar. Quando perguntei o preço antes ficou irritado. Cuidado!', risk:'caution', verified:true},
      {user:'Ana Lima', avatar:'https://i.pravatar.cc/40?img=25', stars:4, date:'1 sem',
       text:'Se você negocia antes é ok. A comida é gostosa, só não caia no cardápio turístico. Pedi pelo Google Translate o preço local.', risk:'safe', verified:true},
      {user:'Raquel F.', avatar:'https://i.pravatar.cc/40?img=35', stars:3, date:'2 sem',
       text:'Lugar ok, barulhento e lotado de turistas. Comida mediana. Prefira procurar mais dentro dos becos.', risk:'caution', verified:false},
    ]
  },
  {
    id:'p2', type:'hostel', name:'The Lub.d Bangkok', city:'Bangkok', country:'Tailândia', flag:'🇹🇭',
    emoji:'🛏', lat:13.744, lng:100.534, risk:'safe',
    address:'925/9 Rama 1 Rd, Pathumwan, Bangkok', score:4.6, reviews:213,
    tags:['Hostel','Centro','Seguro','Recomendado'],
    scores:{localizacao:4.8, seguranca:4.7, limpeza:4.5, preco_justo:4.4},
    tips:['Deixe seus documentos no cofre. Funcionários muito atenciosos.','Ótimo café da manhã incluso. Área social excelente para conhecer viajantes.'],
    photos:['🛏','🏊','☕'],
    reviews_list:[
      {user:'Pedro A.', avatar:'https://i.pravatar.cc/40?img=33', stars:5, date:'3 dias',
       text:'Melhor hostel que fiquei em Bangkok. Localização perfeita, perto do BTS Skytrain. Seguros, boa recepção 24h. Super recomendo!', risk:'safe', verified:true},
      {user:'Julia S.', avatar:'https://i.pravatar.cc/40?img=23', stars:4, date:'1 sem',
       text:'Só paguei 15 USD por noite em dorm de 8. Muito limpo, cofres em cada cama. Vi outros hostels na área com problemas de furto. Fique aqui!', risk:'safe', verified:true},
    ]
  },
  {
    id:'p3', type:'tourspot', name:'Templo Wat Pho', city:'Bangkok', country:'Tailândia', flag:'🇹🇭',
    emoji:'🛕', lat:13.7474, lng:100.4929, risk:'safe',
    address:'2 Sanam Chai Rd, Phra Nakhon, Bangkok', score:4.9, reviews:891,
    tags:['Patrimônio','Cultural','Budismo','Fotografia'],
    scores:{beleza:5.0, seguranca:4.8, acessibilidade:4.2, custo_beneficio:4.5},
    tips:['Leve roupas que cubram joelhos e ombros - exigido na entrada.','Chegue antes das 8h para menos turistas e fotos incríveis.','Guias freelance na porta NÃO são oficiais. Evite.'],
    photos:['🛕','⭐','🙏'],
    reviews_list:[
      {user:'Marcos V.', avatar:'https://i.pravatar.cc/40?img=57', stars:5, date:'1 dia',
       text:'Absolutamente incrível. O Buda reclinado é de tirar o fôlego. Lugar muito seguro, muitos visitantes. Só atenção aos vendedores na saída.', risk:'safe', verified:true},
      {user:'Sofia R.', avatar:'https://i.pravatar.cc/40?img=44', stars:5, date:'4 dias',
       text:'Um dos lugares mais bonitos que já vi na vida. Fui sozinha sem problema nenhum. Policiais turísticos presentes o tempo todo.', risk:'safe', verified:true},
      {user:'Diego L.', avatar:'https://i.pravatar.cc/40?img=60', stars:4, date:'2 sem',
       text:'Lindo demais. Só tome cuidado: homens na porta dizem que o templo está fechado e oferecem tour "especial". É golpe! O templo funciona normalmente.', risk:'caution', verified:true},
    ]
  },
  {
    id:'p4', type:'restaurant', name:'La Boca Parilla', city:'Buenos Aires', country:'Argentina', flag:'🇦🇷',
    emoji:'🥩', lat:-34.6345, lng:-58.3630, risk:'suspicious',
    address:'Av. Pedro de Mendoza 1800, La Boca, BA', score:2.1, reviews:34,
    tags:['Churrasco','Turístico','Preço Abusivo','La Boca'],
    scores:{precos:1.2, qualidade:3.0, atendimento:2.1, seguranca:2.0},
    tips:['Cardápio sem preços visíveis — golpe clássico para turistas.','Região perigosa após 18h. Visite La Boca somente de dia e em grupo.'],
    photos:['🥩','🍷','⚠️'],
    reviews_list:[
      {user:'Fernanda C.', avatar:'https://i.pravatar.cc/40?img=44', stars:1, date:'3 dias',
       text:'ARMADILHA. Sentamos sem ver preço, conta veio 5x mais cara que o normal. Quando reclamamos ameaçaram chamar "segurança". Absurdo total.', risk:'danger', verified:true},
      {user:'Roberto M.', avatar:'https://i.pravatar.cc/40?img=55', stars:2, date:'1 sem',
       text:'Comida até razoável mas cobrança obscura. Cartão não funcionava "por coincidência". Fuja daqui.', risk:'suspicious', verified:false},
    ]
  },
  {
    id:'p5', type:'hostel', name:'Selina Gold Dust', city:'Medellín', country:'Colômbia', flag:'🇨🇴',
    emoji:'🛏', lat:6.2086, lng:-75.5659, risk:'safe',
    address:'Calle 10 #43D-5, El Poblado, Medellín', score:4.7, reviews:328,
    tags:['Hostel Premium','El Poblado','Coworking','Seguro'],
    scores:{localizacao:4.9, seguranca:4.8, limpeza:4.6, preco_justo:4.2},
    tips:['El Poblado é o bairro mais seguro de Medellín. Ótima escolha.','Hostel tem app próprio para reportar qualquer problema. Muito responsivos.'],
    photos:['🛏','💻','🌴'],
    reviews_list:[
      {user:'Larissa F.', avatar:'https://i.pravatar.cc/40?img=26', stars:5, date:'5 dias',
       text:'Fui sozinha, mulher, sem nenhum problema. Staff incrível, me deram dicas valiosas de segurança e o que evitar. El Poblado é super turístico e seguro.', risk:'safe', verified:true},
    ]
  },
  {
    id:'p6', type:'tourspot', name:'Medina de Marrakech', city:'Marrakech', country:'Marrocos', flag:'🇲🇦',
    emoji:'🏛️', lat:31.6295, lng:-7.9811, risk:'suspicious',
    address:'Medina, Marrakech, Marrocos', score:3.2, reviews:156,
    tags:['Histórico','Labirinto','Golpes Frequentes','Fotografia'],
    scores:{beleza:4.8, seguranca:2.5, acessibilidade:2.8, custo_beneficio:3.1},
    tips:['NUNCA siga "guias" não solicitados. São todos golpistas.','Negocie TUDO antes. Preço inicial para turista é 10x o real.','Use roupas conservadoras. Respeite a cultura local.'],
    photos:['🏛️','🧿','🐪'],
    reviews_list:[
      {user:'Ana Lima', avatar:'https://i.pravatar.cc/40?img=25', stars:3, date:'1 sem',
       text:'A Medina é linda mas exaustiva. Em 2h tive 15 abordagens de "guias" e vendedores. Diga não com firmeza e siga em frente. Não faça contato visual.', risk:'suspicious', verified:true},
      {user:'Thiago B.', avatar:'https://i.pravatar.cc/40?img=48', stars:4, date:'3 sem',
       text:'Apesar do caos, vale muito a pena. Contrate guia PELO SEU HOTEL, com preço combinado antes. Aí a experiência é incrível.', risk:'caution', verified:true},
    ]
  },
  {
    id:'p7', type:'restaurant', name:'Ichiran Ramen Shibuya', city:'Tóquio', country:'Japão', flag:'🇯🇵',
    emoji:'🍜', lat:35.6595, lng:139.7004, risk:'safe',
    address:'B1F Dogenzaka Building, 1-22-7 Dogenzaka, Shibuya, Tokyo', score:4.8, reviews:1240,
    tags:['Ramen','Shibuya','Seguro','Imperdível'],
    scores:{precos:4.3, qualidade:5.0, atendimento:4.9, seguranca:5.0},
    tips:['Cada pessoa come em cabine individual — perfeito para quem viaja solo!','Pede tudo por formulário escrito. Tem em português no site.','Fila pode ser longa — vá antes das 11h ou após 15h.'],
    photos:['🍜','🥢','⭐'],
    reviews_list:[
      {user:'Pedro A.', avatar:'https://i.pravatar.cc/40?img=33', stars:5, date:'1 mes',
       text:'O melhor ramen da minha vida. Tóquio é a cidade mais segura que já visitei. Zero problemas, culinária impecável. VÁÁÁ!', risk:'safe', verified:true},
      {user:'Camila R.', avatar:'https://i.pravatar.cc/40?img=38', stars:5, date:'2 mes',
       text:'Fui às 10:30 e não tinha fila. Incrível. Japão em geral: pode deixar a mochila na mesa, ninguém toca.', risk:'safe', verified:true},
    ]
  },
  {
    id:'p8', type:'tourspot', name:'Castillo Miramare', city:'Trieste', country:'Itália', flag:'🇮🇹',
    emoji:'🏰', lat:45.7073, lng:13.7068, risk:'safe',
    address:'Viale Miramare, 34151 Trieste TS, Itália', score:4.6, reviews:412,
    tags:['Castelo','Vista Mar','Jardins','Seguro'],
    scores:{beleza:5.0, seguranca:4.9, acessibilidade:4.0, custo_beneficio:4.6},
    tips:['Entrada custa 8€. Reserve online para evitar fila.','Os jardins ao redor são de acesso gratuito — igualmente lindos.'],
    photos:['🏰','🌊','🌺'],
    reviews_list:[
      {user:'Marcos V.', avatar:'https://i.pravatar.cc/40?img=57', stars:5, date:'2 mes',
       text:'Um dos lugares mais bonitos da Itália e super desconhecido. Trieste em geral é muito segura e autêntica, sem turismo de massa.', risk:'safe', verified:true},
    ]
  },
];

const FRIENDS = [
  {name:'Carlos M.', handle:'@carlos.world', avatar:'https://i.pravatar.cc/80?img=12', loc:'Khaosan Rd, Bangkok 🇹🇭', dist:'1.2 km', online:true},
  {name:'Ana Lima', handle:'@ana.trips', avatar:'https://i.pravatar.cc/80?img=25', loc:'Chatuchak Market 🇹🇭', dist:'8.4 km', online:true},
  {name:'Pedro A.', handle:'@pedroviaja', avatar:'https://i.pravatar.cc/80?img=33', loc:'Tokyo, Japão 🇯🇵', dist:'4700 km', online:false},
];

const POSTS = [
  {id:1, user:'Carlos Menezes', handle:'@carlos.world', avatar:'https://i.pravatar.cc/80?img=12', verified:true,
   loc:'Khaosan Road, Bangkok 🇹🇭', time:'2min', risk:'caution', placeId:'p1',
   text:'Cuidado com os restaurantes na saída da Khaosan! Sentei num lugar sem ver o preço e cobrou 800 baht por um prato de pad thai. Depois soube que o mesmo custa 80 baht ali do lado. O cardápio turístico é uma armadilha.',
   tags:['Bangkok','CobrançaAbusiva','Tailândia'], likes:47, comments:12, friendsOnly:false},
  {id:2, user:'Ana Lima', handle:'@ana.trips', avatar:'https://i.pravatar.cc/80?img=25', verified:true,
   loc:'Medina de Marrakech 🇲🇦', time:'18min', risk:'suspicious', placeId:'p6',
   text:'Guias falsos na entrada da Medina — muito insistentes. Tentaram me levar para lojas de tapetes dizendo ser "tour gratuito". Quando recusei ficou agressivo. Contrate guia PELO HOTEL, nunca na rua.',
   tags:['Marrakech','GolpeTurístico','Marrocos'], likes:89, comments:34, friendsOnly:false},
  {id:3, user:'Pedro Alves', handle:'@pedroviaja', avatar:'https://i.pravatar.cc/80?img=33', verified:true,
   loc:'Ichiran Ramen, Shibuya 🇯🇵', time:'1h', risk:'safe', placeId:'p7',
   text:'Definitivamente a melhor refeição da viagem! Tóquio é absolutamente segura — deixei a mochila na mesa e fui ao banheiro sem preocupação. O ramen no Ichiran é de outro mundo. Japão = recomendo para qualquer viajante.',
   tags:['Tokyo','Japão','Seguro','Gastronomia'], likes:214, comments:58, friendsOnly:false},
  {id:4, user:'Fernanda Costa', handle:'@fer.nomade', avatar:'https://i.pravatar.cc/80?img=44', verified:true,
   loc:'La Boca, Buenos Aires 🇦🇷', time:'3h', risk:'danger', placeId:'p4',
   text:'⚠️ ALERTA SÉRIO: Fui assaltada na Av. Pedro de Mendoza às 19h. Evitem La Boca à noite. O restaurante La Boca Parilla é uma armadilha de preços também. Visitem Caminito SOMENTE de dia e em grupo.',
   tags:['BuenosAires','Argentina','ALERTA','Segurança'], likes:302, comments:89, friendsOnly:false},
  {id:5, user:'Mariana Oliveira', handle:'@mariana.go', avatar:'https://i.pravatar.cc/80?img=47', verified:true,
   loc:'Selina Medellín, Colômbia 🇨🇴', time:'5h', risk:'safe', placeId:'p5',
   text:'Medellín me surpreendeu positivamente! El Poblado é super seguro e moderno. Fiquei no Selina e foi incrível — staff deu dicas de segurança no check-in, cofres em todas as camas. A cidade transformou-se muito.',
   tags:['Medellín','Colômbia','Seguro','Hostel'], likes:178, comments:42, friendsOnly:false},
  {id:6, user:'Carlos Menezes', handle:'@carlos.world', avatar:'https://i.pravatar.cc/80?img=12', verified:true,
   loc:'📍 Somente para amigos', time:'6h', risk:'caution', placeId:null,
   text:'🔒 [Visível só para amigos] — Estou no mercado flutuante de Damnoen Saduak. Lugar lindo mas vendedores bem insistentes. Coordenadas compartilhadas com vocês.',
   tags:['MercadoFlutuante','Bangkok'], likes:8, comments:3, friendsOnly:true},
];

const NOTIFS = [
  {type:'danger', text:'<strong>🔴 Perigo em La Boca</strong> — 3 novos relatos de assalto. Você indicou interesse na Argentina.', time:'5min', unread:true},
  {type:'info', text:'<strong>Carlos Menezes</strong> começou a te seguir.', time:'12min', unread:true},
  {type:'caution', text:'Área de <strong>atenção detectada</strong> próxima à Khaosan Road. Você está a 1.2km.', time:'45min', unread:true},
  {type:'safe', text:'Seu relato sobre Medellín recebeu <strong>178 curtidas</strong> 🔥', time:'2h', unread:false},
  {type:'friend', text:'<strong>Ana Lima</strong> está a 8km de você em Bangkok. Toque para ver no mapa.', time:'3h', unread:false},
  {type:'danger', text:'<strong>Novo alerta</strong> de cobrança abusiva no distrito de Nana, Bangkok.', time:'6h', unread:false},
  {type:'info', text:'<strong>Pedro Alves</strong> e <strong>+5 pessoas</strong> curtiram seu relato sobre Selina Medellín.', time:'1d', unread:false},
];

const NEWS_POSTS = [
  {
    source:'Ministério do Turismo da Tailândia',
    sourceType:'gov',
    country:'Tailândia',
    time:'1h',
    type:'events',
    priority:'info',
    title:'Festival Songkran terá reforço de segurança em Bangkok',
    text:'Autoridades anunciaram postos extras de atendimento ao turista e orientações em inglês nas áreas de maior fluxo entre 12 e 16 de abril.',
    tags:['Oficial','Bangkok','Festival'],
    url:'https://www.tourismthailand.org'
  },
  {
    source:'Embaixada do Brasil em Marrocos',
    sourceType:'consular',
    country:'Marrocos',
    time:'3h',
    type:'safety',
    priority:'critical',
    title:'Alerta sobre guias não credenciados na Medina de Marrakech',
    text:'Recomendação para contratar passeios apenas por agências registradas e evitar pagamentos antecipados em dinheiro para abordagens de rua.',
    tags:['Consular','Segurança','Marrakech'],
    url:'https://www.gov.br/mre'
  },
  {
    source:'Agência de Mobilidade de Buenos Aires',
    sourceType:'transport',
    country:'Argentina',
    time:'5h',
    type:'mobility',
    priority:'warning',
    title:'Mudança temporária em linhas noturnas na região de La Boca',
    text:'Algumas linhas terão desvio após 22h por obras urbanas. Turistas devem priorizar rotas oficiais de ônibus e apps autorizados.',
    tags:['Transporte','La Boca','Serviço'],
    url:'https://buenosaires.gob.ar'
  },
  {
    source:'Serviço Meteorológico do Japão',
    sourceType:'meteo',
    country:'Japão',
    time:'8h',
    type:'weather',
    priority:'warning',
    title:'Frente fria em Tóquio com chuva intensa no fim de semana',
    text:'Previsão de acumulado elevado entre sábado e domingo. Recomenda-se atenção em deslocamentos para áreas com grande fluxo turístico.',
    tags:['Clima','Tóquio','Previsão'],
    url:'https://www.jma.go.jp/jma/indexe.html'
  },
  {
    source:'Polícia Turística de Medellín',
    sourceType:'police',
    country:'Colômbia',
    time:'1d',
    type:'safety',
    priority:'info',
    title:'Novo canal WhatsApp para suporte ao viajante',
    text:'Visitantes podem reportar ocorrências e solicitar orientação em tempo real por um canal dedicado com atendimento bilíngue.',
    tags:['Suporte','El Poblado','Segurança'],
    url:'https://www.medellin.gov.co'
  }
];

const CHATS = [
  {
    id:'c1',
    type:'direct',
    name:'Ana Lima',
    avatar:'https://i.pravatar.cc/80?img=25',
    online:true,
    typing:false,
    status:'Online agora',
    time:'2min',
    unread:2,
    last:'Você viu o alerta novo de Marrakech?',
    messages:[
      {from:'them', text:'Mari, você ainda está em Bangkok?', time:'09:12'},
      {from:'me', text:'Sim, fico até domingo. E você?', time:'09:14'},
      {from:'them', text:'Estou indo para Marrakech amanhã.', time:'09:15'},
      {from:'them', text:'Você viu o alerta novo de Marrakech?', time:'09:16'}
    ]
  },
  {
    id:'c2',
    type:'group',
    name:'Backpackers Sudeste Asiático',
    avatar:'🌏',
    online:false,
    typing:false,
    status:'14 membros',
    time:'18min',
    unread:5,
    last:'Carlos: táxi sem taxímetro no aeroporto de DMK.',
    messages:[
      {from:'them', text:'Carlos: pessoal, cheguei em Bangkok agora.', time:'08:51'},
      {from:'them', text:'Carlos: táxi sem taxímetro no aeroporto de DMK.', time:'08:56'},
      {from:'me', text:'Valeu pelo aviso. Melhor usar app então.', time:'08:59'}
    ]
  },
  {
    id:'c3',
    type:'direct',
    name:'Pedro Alves',
    avatar:'https://i.pravatar.cc/80?img=33',
    online:false,
    typing:false,
    status:'Visto há 1h',
    time:'1h',
    unread:0,
    last:'Fechou! Te mando os hostels de Tóquio.',
    messages:[
      {from:'me', text:'Pedrão, recomenda hostel em Shibuya?', time:'07:10'},
      {from:'them', text:'Fechou! Te mando os hostels de Tóquio.', time:'07:16'}
    ]
  }
];

const COMMUNITY_PULSE = [
  {num:'128', lab:'Relatos hoje'},
  {num:'43', lab:'Alertas úteis'},
  {num:'17', lab:'Amigos próximos'},
];

const TREND_ROUTES = [
  {route:'Bangkok → Chiang Mai', meta:'Alta troca de dicas para transporte noturno', risk:'⚠️ Atenção em táxis sem taxímetro'},
  {route:'Medellín → Guatapé', meta:'Subiu 62% em relatos positivos esta semana', risk:'✅ Rota considerada segura de dia'},
  {route:'Marrakech → Essaouira', meta:'Comunidade sugere tour fechado em grupo', risk:'🟠 Evite guias na rua'},
];

const TRAVEL_DASH = {
  stats: [
    {num:'34', lab:'Países'},
    {num:'122', lab:'Cidades'},
    {num:'281', lab:'Dias na estrada'},
  ],
  countries: [
    {name:'Tailândia', visits:8, flag:'🇹🇭'},
    {name:'Japão', visits:6, flag:'🇯🇵'},
    {name:'Colômbia', visits:5, flag:'🇨🇴'},
    {name:'Argentina', visits:4, flag:'🇦🇷'},
    {name:'Itália', visits:3, flag:'🇮🇹'},
  ]
};

const GLOBAL_HEAT_ZONES = [
  // Americas
  {lat:40.73,lng:-73.94,risk:'safe',radius:170000},
  {lat:34.05,lng:-118.24,risk:'caution',radius:210000},
  {lat:19.43,lng:-99.13,risk:'suspicious',radius:220000},
  {lat:-23.55,lng:-46.63,risk:'caution',radius:200000},
  {lat:-34.60,lng:-58.38,risk:'danger',radius:250000},
  {lat:4.71,lng:-74.07,risk:'safe',radius:180000},
  {lat:45.50,lng:-73.57,risk:'safe',radius:150000},
  {lat:37.77,lng:-122.42,risk:'safe',radius:160000},

  // Europe
  {lat:51.50,lng:-0.12,risk:'safe',radius:140000},
  {lat:48.85,lng:2.35,risk:'caution',radius:170000},
  {lat:41.90,lng:12.49,risk:'safe',radius:140000},
  {lat:40.42,lng:-3.70,risk:'safe',radius:130000},
  {lat:52.52,lng:13.40,risk:'safe',radius:140000},
  {lat:50.08,lng:14.43,risk:'caution',radius:130000},
  {lat:59.33,lng:18.06,risk:'safe',radius:120000},
  {lat:55.75,lng:37.62,risk:'suspicious',radius:220000},

  // Africa
  {lat:30.04,lng:31.23,risk:'caution',radius:220000},
  {lat:31.63,lng:-7.98,risk:'suspicious',radius:200000},
  {lat:6.52,lng:3.38,risk:'danger',radius:260000},
  {lat:-1.29,lng:36.82,risk:'safe',radius:150000},
  {lat:-26.20,lng:28.04,risk:'caution',radius:210000},
  {lat:33.57,lng:-7.59,risk:'safe',radius:150000},

  // Middle East / Central Asia
  {lat:25.20,lng:55.27,risk:'safe',radius:170000},
  {lat:24.71,lng:46.67,risk:'caution',radius:220000},
  {lat:41.01,lng:28.97,risk:'caution',radius:180000},
  {lat:32.08,lng:34.78,risk:'safe',radius:150000},
  {lat:35.68,lng:51.41,risk:'suspicious',radius:230000},

  // South & East Asia
  {lat:28.61,lng:77.20,risk:'danger',radius:280000},
  {lat:19.07,lng:72.88,risk:'caution',radius:250000},
  {lat:13.75,lng:100.50,risk:'caution',radius:200000},
  {lat:1.35,lng:103.82,risk:'safe',radius:130000},
  {lat:3.14,lng:101.69,risk:'safe',radius:150000},
  {lat:14.60,lng:120.98,risk:'suspicious',radius:240000},
  {lat:35.68,lng:139.69,risk:'safe',radius:140000},
  {lat:37.57,lng:126.98,risk:'safe',radius:130000},
  {lat:22.28,lng:114.16,risk:'caution',radius:170000},
  {lat:31.23,lng:121.47,risk:'caution',radius:210000},
  {lat:39.90,lng:116.40,risk:'suspicious',radius:230000},

  // Oceania
  {lat:-33.86,lng:151.20,risk:'safe',radius:140000},
  {lat:-37.81,lng:144.96,risk:'safe',radius:140000},
  {lat:-36.85,lng:174.76,risk:'safe',radius:120000},
  {lat:-6.21,lng:106.85,risk:'caution',radius:220000}
];

const CRISIS_ZONES = [
  {lat:35.68,lng:51.41,risk:'danger',radius:330000,label:'Teerã e entorno'},
  {lat:33.31,lng:44.36,risk:'danger',radius:300000,label:'Bagdá e corredor central'},
  {lat:33.89,lng:35.50,risk:'suspicious',radius:240000,label:'Beirute e costa'},
  {lat:31.77,lng:35.21,risk:'suspicious',radius:220000,label:'Jerusalém e cinturão'},
  {lat:24.71,lng:46.67,risk:'caution',radius:260000,label:'Riad e conexões'},
  {lat:25.20,lng:55.27,risk:'safe',radius:200000,label:'Eixo Dubai-Abu Dhabi'}
];

const CRISIS_CORRIDORS = [
  {route:'Amã (JOR) → Doha (QAT)', status:'Operação parcial', window:'06:00-18:00 UTC'},
  {route:'Riad (SAU) → Dubai (UAE)', status:'Aberto', window:'24h com triagem'},
  {route:'Beirute (LBN) → Larnaca (CYP)', status:'Janela curta', window:'08:00-14:00 UTC'},
  {route:'Erbil (IRQ) → Istambul (TUR)', status:'Aberto', window:'Voos variáveis'}
];

// ════════════════════════════════
//  STATE
// ════════════════════════════════
let loggedIn = false;
let mapInit = false;
let map, allMarkers = [], allLayers = [];
let currentFilter = 'all';
let currentCat = 'all';
let currentNewsFilter = 'all';
let currentTheme = 'dark';
let currentChatId = CHATS[0].id;
let currentChatQuery = '';
let feedSideNewsOffset = 0;
let crisisMode = false;
let crisisCheckinLeft = 180;
let crisisTimer = null;
let locOn = true;

function themeIcon(mode) {
  if (mode === 'light') {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3c0 .28 0 .56.02.83A7 7 0 0 0 20.17 12c.27.01.55.02.83.02z"/></svg>`;
}

function applyTheme(mode) {
  document.body.setAttribute('data-theme', mode);
  const btn = document.getElementById('themeBtn');
  if (btn) {
    btn.innerHTML = themeIcon(mode);
    btn.title = mode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro';
  }
}

function initTheme() {
  const saved = localStorage.getItem('azimute-theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  currentTheme = saved || (prefersLight ? 'light' : 'dark');
  applyTheme(currentTheme);
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('azimute-theme', currentTheme);
  applyTheme(currentTheme);
  showToast(currentTheme === 'light' ? '☀️ Modo claro ativado' : '🌙 Modo escuro ativado','');
}

// ════════════════════════════════
//  BOOT
// ════════════════════════════════
window.addEventListener('load', () => {
  initTheme();
  setTimeout(() => {
    document.getElementById('splash').classList.add('out');
    setTimeout(() => {
      document.getElementById('app').classList.add('vis');
      renderPulse();
      renderStories();
      renderTrendingRoutes();
      renderTravelDashboard();
      renderFeed();
      renderFriends();
      renderExplore();
      renderNotifs();
      renderNews();
      renderFeedSideNews();
      renderCrisisCorridors();
      renderCrisisTimer();
      renderChats();
      setInterval(simulatePresence, 15000);
      setInterval(simulateTyping, 9000);
      setInterval(cycleFeedSideNews, 6500);
    }, 400);
  }, 2700);
});

// ════════════════════════════════
//  STORIES
// ════════════════════════════════
const STORIES = [
  {img:'https://i.pravatar.cc/80?img=12', name:'@carlos.w', ring:'cr', status:'agora'},
  {img:'https://i.pravatar.cc/80?img=25', name:'@ana.trips', ring:'dr', status:'5min'},
  {img:'https://i.pravatar.cc/80?img=33', name:'@pedro.go', ring:'', status:'12min'},
  {img:'https://i.pravatar.cc/80?img=44', name:'@fer.nomade', ring:'dr', status:'18min'},
  {img:'https://i.pravatar.cc/80?img=57', name:'@marcos.v', ring:'', status:'22min'},
  {img:'https://i.pravatar.cc/80?img=23', name:'@julia.m', ring:'cr', status:'41min'},
  {img:'https://i.pravatar.cc/80?img=60', name:'@rafa.go', ring:'dr', status:'1h'},
];

function renderPulse() {
  const el = document.getElementById('pulseGrid');
  if (!el) return;
  el.innerHTML = COMMUNITY_PULSE.map(p => `
    <div class="pulse-item">
      <div class="pulse-num">${p.num}</div>
      <div class="pulse-lab">${p.lab}</div>
    </div>
  `).join('');
}

function renderTrendingRoutes() {
  const el = document.getElementById('tripRow');
  if (!el) return;
  el.innerHTML = TREND_ROUTES.map(r => `
    <div class="trip-card" onclick="showToast('🗺️ Rota salva para acompanhar','ts')">
      <div class="trip-route">${r.route}</div>
      <div class="trip-meta">${r.meta}</div>
      <div class="trip-risk">${r.risk}</div>
    </div>
  `).join('');
}

function renderFeedSideNews() {
  const targetCount = 10;
  const top = Array.from({length:targetCount}, (_,i) => NEWS_POSTS[(i + feedSideNewsOffset) % NEWS_POSTS.length]);
  const wrap = document.getElementById('feedSideNews');
  if (!wrap) return;
  wrap.innerHTML = top.map(n => `
    <article class="feed-side-item">
      <div class="feed-side-item-title">${n.title}</div>
      <div class="feed-side-item-meta">${n.source} · ${n.time} atrás</div>
    </article>
  `).join('');
}

function renderCrisisCorridors() {
  const list = document.getElementById('corridorList');
  if (!list) return;
  list.innerHTML = CRISIS_CORRIDORS.map(c => `
    <article class="corridor-item">
      <div class="corridor-route">${c.route}</div>
      <div class="corridor-meta">${c.status} · ${c.window}</div>
    </article>
  `).join('');
}

function renderCrisisTimer() {
  const t = document.getElementById('crisisTimerLabel');
  if (!t) return;
  const mm = String(Math.floor(crisisCheckinLeft / 60)).padStart(2,'0');
  const ss = String(crisisCheckinLeft % 60).padStart(2,'0');
  t.textContent = `Check-in segurança em ${mm}:${ss}`;
}

function startCrisisTimer() {
  if (crisisTimer) clearInterval(crisisTimer);
  crisisTimer = setInterval(() => {
    if (!crisisMode) return;
    crisisCheckinLeft--;
    if (crisisCheckinLeft <= 0) {
      crisisCheckinLeft = 180;
      showToast('⚠️ Faça check-in de segurança com seus contatos','tw');
    }
    renderCrisisTimer();
  }, 1000);
}

function ackCrisisCheckin() {
  crisisCheckinLeft = 180;
  renderCrisisTimer();
  showToast('✅ Check-in enviado para seus contatos','ts');
}

function cycleFeedSideNews() {
  if (!NEWS_POSTS.length) return;
  feedSideNewsOffset = (feedSideNewsOffset + 1) % NEWS_POSTS.length;
  renderFeedSideNews();
}

function renderTravelDashboard() {
  const maxVisits = Math.max(...TRAVEL_DASH.countries.map(c => c.visits));
  document.getElementById('travelDashGrid').innerHTML = TRAVEL_DASH.stats.map(s => `
    <div class="td-item">
      <div class="td-num">${s.num}</div>
      <div class="td-lab">${s.lab}</div>
    </div>
  `).join('');
  document.getElementById('countryStrip').innerHTML = TRAVEL_DASH.countries.map(c => `
    <div class="country-pill">${c.flag} ${c.name}</div>
  `).join('');
  document.getElementById('countryBars').innerHTML = TRAVEL_DASH.countries.map(c => `
    <div class="country-row">
      <div class="country-name">${c.name}</div>
      <div class="country-track"><div class="country-fill" style="width:${(c.visits/maxVisits)*100}%"></div></div>
      <div class="country-val">${c.visits}x</div>
    </div>
  `).join('');
}

function renderStories() {
  document.getElementById('storiesRow').innerHTML = STORIES.map(s =>
    `<div class="story" onclick="showToast('📍 Story de ${s.name} · ${s.status}','ts')">
      <div class="story-ring ${s.ring}"><img class="story-img" src="${s.img}" alt=""></div>
      <div class="story-name">${s.name} · ${s.status}</div>
    </div>`
  ).join('');
}

// ════════════════════════════════
//  FRIENDS (Location)
// ════════════════════════════════
function renderFriends() {
  const av = document.getElementById('friendsAvatars');
  const list = document.getElementById('friendsOnline');
  if (!av || !list) return;
  av.innerHTML = FRIENDS.map(f =>
    `<img class="friend-dot" src="${f.avatar}" title="${f.name}" onclick="showPage('map')">`
  ).join('');
  list.innerHTML = FRIENDS.map(f =>
    `<div class="lfl-item">
      <img class="lfl-avatar" src="${f.avatar}" alt="">
      <div class="lfl-info">
        <div class="lfl-name">${f.name}</div>
        <div class="lfl-loc">📍 ${f.loc}</div>
      </div>
      <div style="text-align:right">
        <div class="lfl-dist" style="margin-bottom:4px">${f.dist}</div>
        <div class="lfl-status ${f.online?'online':'away'}"></div>
      </div>
    </div>`
  ).join('');
}

function toggleLocation() {
  locOn = !locOn;
  const t = document.getElementById('locToggle');
  t.classList.toggle('on', locOn);
  showToast(locOn ? '📍 Localização compartilhada com amigos' : '🔒 Localização ocultada', locOn?'ts':'');
  document.getElementById('friendsOnline').style.display = locOn ? '' : 'none';
}

// ════════════════════════════════
//  FEED
// ════════════════════════════════
const riskLabel = r => ({safe:'✅ Seguro', caution:'⚠️ Atenção', suspicious:'🟠 Suspeito', danger:'🔴 Perigo'}[r]);
const riskCls = r => `rp-${r}`;

function renderFeed(container='feedCards', posts=POSTS) {
  document.getElementById(container).innerHTML = posts.map((p, i) => `
    <div class="card" style="animation:cardIn .4s ${i*.07}s ease both">
      <div class="tweet">
        <img class="fc-avatar" src="${p.avatar}" alt="">
        <div class="tweet-main">
          <div class="tweet-head">
            <span class="tweet-name">${p.user}</span>
            ${p.verified?`<span class="vbadge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>`:''}
            <span class="tweet-handle">${p.handle}</span>
            <span class="tweet-dot">·</span>
            <span class="tweet-time">${p.time}</span>
            <span class="risk-pill ${riskCls(p.risk)}">${riskLabel(p.risk)}</span>
          </div>
          <div class="fc-loc">📍 ${p.loc}</div>
          ${p.friendsOnly ? `<div style="padding-top:4px"><span style="background:rgba(0,229,184,.08);border:1px solid rgba(0,229,184,.2);border-radius:50px;font-size:.7rem;color:var(--accent);padding:2px 8px">🔒 Somente amigos</span></div>` : ''}
          <div class="fc-body" style="padding:7px 0 2px">
            <div class="fc-text">${p.text}</div>
            ${p.placeId ? `<div class="fc-place-link" onclick="openPlace('${p.placeId}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s-8-9.3-8-14a8 8 0 0 1 16 0c0 4.7-8 14-8 14z"/><circle cx="12" cy="8" r="3"/></svg>${PLACES.find(pl=>pl.id===p.placeId)?.name||'Ver local'}</div>` : ''}
            <div class="fc-tags">${p.tags.map(t=>`<span class="tag">#${t}</span>`).join('')}</div>
          </div>
          <div class="fc-actions" style="padding:8px 0 0;border-top:none">
            <button class="fc-act" onclick="likeFc(this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>${p.likes}</button>
            <button class="fc-act" onclick="showToast('💬 Comentários em breve!','')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>${p.comments}</button>
            <button class="fc-act" onclick="showToast('🔗 Link copiado!','ts')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Compartilhar</button>
            ${p.placeId ? `<button class="fc-act" onclick="openPlace('${p.placeId}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-9.3-8-14a8 8 0 0 1 16 0c0 4.7-8 14-8 14z"/><circle cx="12" cy="8" r="3"/></svg>Local</button>` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function likeFc(btn) {
  btn.classList.toggle('liked');
  const n = parseInt(btn.textContent.trim());
  btn.innerHTML = btn.innerHTML.replace(/\d+/, btn.classList.contains('liked') ? n+1 : n-1);
}

// ════════════════════════════════
//  EXPLORE
// ════════════════════════════════
let explorePlaces = [...PLACES];
function renderExplore(places=PLACES) {
  document.getElementById('exploreList').innerHTML = places.map(p => `
    <div class="place-card-h" onclick="openPlace('${p.id}')">
      <div class="pch-icon">${p.emoji}</div>
      <div class="pch-info">
        <div class="pch-name">${p.name}</div>
        <div class="pch-loc">📍 ${p.city}, ${p.country} ${p.flag}</div>
        <div class="pch-meta">
          <span class="risk-pill ${riskCls(p.risk)}">${riskLabel(p.risk)}</span>
          ${p.tags.slice(0,2).map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="pch-right">
        <div class="pch-score">${p.score}⭐</div>
        <div class="pch-reviews">${p.reviews} relatos</div>
      </div>
    </div>
  `).join('');
}

function filterExplore(q) {
  const f = PLACES.filter(p =>
    !q || p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.city.toLowerCase().includes(q.toLowerCase()) ||
    p.country.toLowerCase().includes(q.toLowerCase())
  ).filter(p => currentCat==='all' || p.type===currentCat);
  renderExplore(f);
}

function setCat(cat, el) {
  currentCat = cat;
  document.querySelectorAll('.cat-chip').forEach(c=>c.classList.remove('act'));
  el.classList.add('act');
  filterExplore('');
}

// ════════════════════════════════
//  PLACE DRAWER
// ════════════════════════════════
const starStr = n => '⭐'.repeat(Math.round(n)) + '☆'.repeat(5-Math.round(n));
const barColor = s => s >= 4 ? 'var(--safe)' : s >= 3 ? 'var(--caution)' : 'var(--danger)';
const pct = s => Math.round((s/5)*100)+'%';

function openPlace(id) {
  const p = PLACES.find(pl=>pl.id===id);
  if (!p) return;

  const scoreLabels = {
    precos:'Preços', qualidade:'Qualidade', atendimento:'Atendimento', seguranca:'Segurança',
    localizacao:'Localização', limpeza:'Limpeza', preco_justo:'Preço Justo',
    beleza:'Beleza', acessibilidade:'Acesso', custo_beneficio:'Custo/Ben.',
  };

  const scoreRows = Object.entries(p.scores).map(([k,v])=>`
    <div class="sbar-row">
      <div class="sbar-label">${scoreLabels[k]||k}</div>
      <div class="sbar-track"><div class="sbar-fill" style="width:${pct(v)};background:${barColor(v)}"></div></div>
      <div class="sbar-val" style="color:${barColor(v)}">${v}</div>
    </div>
  `).join('');

  const reviewCards = p.reviews_list.map(r=>`
    <div class="review-card">
      <div class="review-header">
        <img class="review-avatar" src="${r.avatar}" alt="">
        <div style="flex:1">
          <div class="review-name">${r.user}${r.verified?`<span class="vbadge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>`:''}</div>
          <div style="font-size:.7rem;color:var(--muted2);margin-top:2px">${'⭐'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="review-date">${r.date} atrás</div>
          <span class="risk-pill ${riskCls(r.risk)}" style="font-size:.62rem">${riskLabel(r.risk)}</span>
        </div>
      </div>
      <div class="review-text">${r.text}</div>
    </div>
  `).join('');

  const tipsHtml = p.tips.map(t=>`<div class="tip-card"><div class="tip-icon">💡</div><div>${t}</div></div>`).join('');
  const photosHtml = p.photos.map(ph=>`<div class="photo-thumb">${ph}</div>`).join('');

  const typeLabel = {restaurant:'🍜 Restaurante', hostel:'🛏 Hostel', tourspot:'📸 Ponto Turístico', transport:'🚗 Transporte', market:'🛍 Mercado'}[p.type] || p.type;

  document.getElementById('drawerContent').innerHTML = `
    <div class="place-header">
      <div class="place-icon-wrap" style="background:var(--surface2)">${p.emoji}</div>
      <div style="flex:1">
        <div class="place-title">${p.name}</div>
        <div class="place-address"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-9.3-8-14a8 8 0 0 1 16 0c0 4.7-8 14-8 14z"/><circle cx="12" cy="8" r="3"/></svg>${p.address}</div>
        <div class="place-meta-row" style="margin-top:6px">
          <span style="font-size:.75rem;color:var(--muted2)">${typeLabel}</span>
          <span style="color:var(--muted2)">·</span>
          <span style="font-size:.75rem;color:var(--muted2)">${p.flag} ${p.city}</span>
        </div>
      </div>
    </div>

    <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:14px">
      <div>
        <div class="place-score-big">${p.score}</div>
        <div style="font-size:.8rem;color:var(--muted2)">${p.reviews} avaliações</div>
      </div>
      <div style="flex:1">
        <div style="font-size:1.2rem">${'⭐'.repeat(Math.round(p.score))}${'☆'.repeat(5-Math.round(p.score))}</div>
        <span class="risk-pill ${riskCls(p.risk)}" style="margin-top:5px;display:inline-flex">${riskLabel(p.risk)}</span>
      </div>
      <button class="btn btn-p btn-sm" onclick="closeDrawer();openPost()">✍️ Avaliar</button>
    </div>

    <div class="section-sep">Pontuação Detalhada</div>
    <div class="score-bars">${scoreRows}</div>

    <div class="section-sep">Fotos dos Viajantes</div>
    <div class="photos-row">${photosHtml}</div>

    <div class="section-sep">Dicas de Segurança</div>
    ${tipsHtml}

    <div class="section-sep">Relatos (${p.reviews_list.length})</div>
    ${reviewCards}

    <div style="margin-top:8px;display:flex;gap:8px">
      <button class="btn btn-g" style="flex:1" onclick="closeDrawer()">Fechar</button>
      <button class="btn btn-p" style="flex:1" onclick="closeDrawer();showPage('map')">Ver no Mapa</button>
    </div>
  `;

  document.getElementById('placeDrawer').classList.add('open');
  // Animate score bars
  setTimeout(() => {
    document.querySelectorAll('.sbar-fill').forEach(b => { b.style.width = b.style.width; });
  }, 50);
}

function closeDrawer() {
  document.getElementById('placeDrawer').classList.remove('open');
}
document.getElementById('placeDrawer').addEventListener('click', e => {
  if (e.target === document.getElementById('placeDrawer')) closeDrawer();
});

// ════════════════════════════════
//  MAP
// ════════════════════════════════
const RISK_COLORS = {safe:'#22c55e', caution:'#f59e0b', suspicious:'#f97316', danger:'#ef4444'};
const TYPE_COLORS = {restaurant:'#a855f7', hostel:'#3b82f6', tourspot:'#ec4899', transport:'#06b6d4', market:'#84cc16'};

function initMap() {
  if (mapInit) return;
  mapInit = true;

  map = L.map('map', {center:[20,12], zoom:2, zoomControl:true});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'© OpenStreetMap contributors', maxZoom:18
  }).addTo(map);

  // Place markers
  PLACES.forEach(p => {
    const col = RISK_COLORS[p.risk];
    const typeCol = TYPE_COLORS[p.type] || col;

    const icon = L.divIcon({
      html: `<div style="
        position:relative;width:34px;height:34px;border-radius:50%;
        background:${col};border:3px solid rgba(255,255,255,.9);
        box-shadow:0 2px 14px ${col}88,0 0 0 5px ${col}22;
        display:flex;align-items:center;justify-content:center;
        font-size:15px;cursor:pointer;
      ">${p.emoji}</div>`,
      className:'', iconSize:[34,34], iconAnchor:[17,17]
    });

    const marker = L.marker([p.lat, p.lng], {icon})
      .addTo(map)
      .bindPopup(`
        <div style="min-width:190px;font-family:'DM Sans',sans-serif">
          <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:.92rem;margin-bottom:2px">${p.emoji} ${p.name}</div>
          <div style="font-size:.73rem;color:#5a6478;margin-bottom:6px">📍 ${p.city}, ${p.country} ${p.flag}</div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
            <span style="background:${col}22;color:${col};padding:2px 7px;border-radius:50px;font-size:.68rem;font-weight:700">${riskLabel(p.risk)}</span>
            <span style="font-size:.72rem;color:#8892a4">${p.score}⭐ · ${p.reviews} relatos</span>
          </div>
          <div style="font-size:.76rem;color:#8892a4;margin-bottom:8px">${p.reviews_list.length > 0 ? `"${p.reviews_list[0].text.substring(0,60)}..."` : ''}</div>
          <button onclick="closeDrawerIfOpen();openPlace('${p.id}')" style="
            display:block;width:100%;padding:7px;
            background:linear-gradient(135deg,#00e5b8,#0099cc);
            border:none;border-radius:8px;color:#000;font-weight:700;font-size:.78rem;
            cursor:pointer;font-family:'DM Sans',sans-serif;
          ">Ver detalhes e avaliações →</button>
        </div>
      `, {className:'', maxWidth:240});

    marker.placeData = p;
    marker.riskType = p.risk;
    marker.placeType = p.type;
    allMarkers.push(marker);
  });

  // Heatmap circles
  PLACES.forEach(p => {
    const col = RISK_COLORS[p.risk];
    const circle = L.circle([p.lat, p.lng], {
      color:col, fillColor:col, fillOpacity:.07, opacity:.15, weight:1, radius:100000
    }).addTo(map);
    circle.riskType = p.risk;
    circle.placeType = p.type;
    allLayers.push(circle);
  });

  // Global heat zones (broader travel context)
  GLOBAL_HEAT_ZONES.forEach(z => {
    const col = RISK_COLORS[z.risk] || RISK_COLORS.caution;
    const circle = L.circle([z.lat, z.lng], {
      color:col,
      fillColor:col,
      fillOpacity:z.risk==='safe' ? .06 : z.risk==='caution' ? .09 : z.risk==='suspicious' ? .11 : .13,
      opacity:.22,
      weight:1,
      radius:z.radius
    }).addTo(map);
    circle.riskType = z.risk;
    circle.placeType = 'global-zone';
    allLayers.push(circle);
  });

  // Crisis zones (visible only when crisis mode is ON)
  CRISIS_ZONES.forEach(z => {
    const col = RISK_COLORS[z.risk] || RISK_COLORS.danger;
    const circle = L.circle([z.lat, z.lng], {
      color:col, fillColor:col, fillOpacity:0, opacity:0, weight:2, radius:z.radius
    }).addTo(map);
    circle.riskType = z.risk;
    circle.placeType = 'crisis';
    circle.isCrisis = true;
    circle.bindPopup(`<div style="font-size:.78rem"><strong>${z.label}</strong><br>${riskLabel(z.risk)}</div>`);
    allLayers.push(circle);
  });

  // Friend markers
  const friendCoords = [
    {lat:13.762, lng:100.561, f:FRIENDS[0]},
    {lat:13.899, lng:100.553, f:FRIENDS[1]},
    {lat:35.669, lng:139.702, f:FRIENDS[2]},
  ];
  friendCoords.forEach(fc => {
    const fIcon = L.divIcon({
      html:`<div style="
        width:38px;height:38px;border-radius:50%;
        border:3px solid #00e5b8;overflow:hidden;
        box-shadow:0 0 0 3px rgba(0,229,184,.3),0 4px 12px rgba(0,0,0,.5);
        background:#10141a;
      "><img src="${fc.f.avatar}" style="width:100%;height:100%;object-fit:cover"></div>`,
      className:'', iconSize:[38,38], iconAnchor:[19,19]
    });
    const m = L.marker([fc.lat, fc.lng], {icon:fIcon})
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'DM Sans',sans-serif;min-width:150px">
          <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem">${fc.f.name}</div>
          <div style="font-size:.72rem;color:#5a6478">${fc.f.handle}</div>
          <div style="font-size:.75rem;color:#8892a4;margin-top:4px">📍 ${fc.f.loc}</div>
          <div style="font-size:.72rem;color:#22c55e;margin-top:2px">● Online agora</div>
        </div>
      `, {className:'', maxWidth:200});
    m.riskType = 'friends';
    m.placeType = 'friends';
    allMarkers.push(m);
  });

  setTimeout(() => map.invalidateSize(), 100);
  applyMapVisibility();
}

function closeDrawerIfOpen() {
  // For popup button calls
}

function applyMapVisibility() {
  if (!map) return;
  allMarkers.forEach(m => {
    const match = currentFilter==='all' || m.riskType===currentFilter || m.placeType===currentFilter;
    match ? m.addTo(map) : m.remove();
  });
  allLayers.forEach(l => {
    const match = currentFilter==='all' || l.riskType===currentFilter || l.placeType===currentFilter;
    const blockedByCrisis = l.isCrisis && !crisisMode;
    const show = match && !blockedByCrisis;
    if (l.isCrisis) {
      const col = RISK_COLORS[l.riskType] || RISK_COLORS.danger;
      l.setStyle({
        color:col,
        fillColor:col,
        opacity:show ? .35 : 0,
        fillOpacity:show ? (l.riskType==='safe' ? .08 : l.riskType==='caution' ? .12 : l.riskType==='suspicious' ? .16 : .2) : 0
      });
    }
    show ? l.addTo(map) : l.remove();
  });
}

function filterMap(type, el) {
  document.querySelectorAll('.fpill').forEach(p => {
    p.className = 'fpill';
  });
  el.classList.add('act-'+type);
  currentFilter = type;
  applyMapVisibility();
}

function toggleCrisisMode() {
  crisisMode = !crisisMode;
  const btn = document.getElementById('crisisToggleBtn');
  if (btn) {
    btn.classList.toggle('on', crisisMode);
    btn.textContent = crisisMode ? 'Desativar' : 'Ativar';
  }
  if (crisisMode) {
    crisisCheckinLeft = 180;
    startCrisisTimer();
    showToast('🚨 Modo Crise ativado: zonas e corredores priorizados','tw');
  } else {
    if (crisisTimer) clearInterval(crisisTimer);
    crisisTimer = null;
    crisisCheckinLeft = 180;
    renderCrisisTimer();
    showToast('✅ Modo Crise desativado','ts');
  }
  applyMapVisibility();
}

// ════════════════════════════════
//  NOTIFICATIONS
// ════════════════════════════════
const niColors = {danger:'var(--danger-bg)', caution:'var(--caution-bg)', safe:'var(--safe-bg)', info:'var(--accent-dim)', friend:'rgba(59,130,246,.1)'};
const niTColors = {danger:'var(--danger)', caution:'var(--caution)', safe:'var(--safe)', info:'var(--accent)', friend:'#3b82f6'};
const niIcons = {
  danger:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>`,
  caution:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  safe:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
  info:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  friend:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>`
};

function renderNotifs() {
  document.getElementById('notifList').innerHTML = NOTIFS.map(n=>`
    <div class="notif-item ${n.unread?'unread':''}">
      <div class="ni-icon" style="background:${niColors[n.type]};color:${niTColors[n.type]}">${niIcons[n.type]}</div>
      <div style="flex:1">
        <div class="ni-text">${n.text}</div>
        <div style="font-size:.7rem;color:var(--muted);margin-top:2px">${n.time} atrás</div>
      </div>
      ${n.unread ? '<div class="unread-pip"></div>' : ''}
    </div>
  `).join('');
}

function renderNews(type='all') {
  const sourceTypeLabel = {
    gov:'Governo',
    consular:'Consular',
    police:'Polícia',
    meteo:'Meteorologia',
    transport:'Mobilidade'
  };
  const priorityLabel = {
    critical:'Crítico',
    warning:'Atenção',
    info:'Informativo'
  };
  const list = NEWS_POSTS.filter(n => type === 'all' || n.type === type);
  document.getElementById('newsList').innerHTML = list.map(n => `
    <article class="news-card prio-${n.priority}">
      <div class="news-top">
        <div>
          <div class="news-source-row">
            <div class="news-source">${n.source}</div>
            <span class="source-badge ${n.sourceType}">✔ ${sourceTypeLabel[n.sourceType] || 'Oficial'}</span>
          </div>
          <div class="news-country">📍 ${n.country}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
          <div class="news-time">${n.time} atrás</div>
          <span class="news-priority ${n.priority}">${priorityLabel[n.priority] || 'Informativo'}</span>
        </div>
      </div>
      <h3 class="news-title">${n.title}</h3>
      <p class="news-text">${n.text}</p>
      <div class="news-tags">${n.tags.map(t => `<span class="news-tag">${t}</span>`).join('')}</div>
      <a class="news-link" href="${n.url}" target="_blank" rel="noopener noreferrer">Ler comunicado oficial ↗</a>
    </article>
  `).join('');
}

function setNewsFilter(type, el) {
  currentNewsFilter = type;
  document.querySelectorAll('.news-chip').forEach(c => c.classList.remove('act'));
  el.classList.add('act');
  renderNews(type);
}

function renderChats() {
  const filtered = CHATS.filter(c => {
    if (!currentChatQuery) return true;
    const q = currentChatQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.last.toLowerCase().includes(q);
  });

  document.getElementById('chatList').innerHTML = filtered.length ? filtered.map(c => `
    <article class="msg-item ${c.id===currentChatId?'act':''}" onclick="openChat('${c.id}')">
      ${c.type === 'group'
        ? `<div class="msg-avatar group" style="display:flex;align-items:center;justify-content:center;background:var(--surface2);font-size:1.1rem">${c.avatar}</div>`
        : `<img class="msg-avatar" src="${c.avatar}" alt="">`
      }
      <div class="msg-main">
        <div class="msg-name">${c.name}<span class="msg-type">${c.type==='group'?'Grupo':'Direta'}</span></div>
        <div class="msg-prev">${c.typing ? 'digitando...' : c.last}</div>
      </div>
      <div class="msg-meta">
        <div class="msg-time">${c.time}</div>
        ${c.unread>0?`<div class="msg-unread">${c.unread}</div>`:''}
      </div>
    </article>
  `).join('') : `<div class="msg-item" style="justify-content:center;color:var(--muted2);cursor:default">Nenhuma conversa encontrada</div>`;
  renderChatWindow();
}

function openChat(id) {
  currentChatId = id;
  const chat = CHATS.find(c => c.id === id);
  if (chat) chat.unread = 0;
  renderChats();
}

function renderChatWindow() {
  const chat = CHATS.find(c => c.id === currentChatId);
  if (!chat) return;
  document.getElementById('chatHead').innerHTML = `
    <div>
      <div class="chat-head-name">${chat.name}</div>
      <div class="chat-head-sub">${chat.typing ? 'digitando...' : chat.status}</div>
    </div>
    <button class="msg-new-group" onclick="showToast('📞 Chamada de voz em breve','')">Ligar</button>
  `;
  document.getElementById('chatMessages').innerHTML = chat.messages.map(m => `
    <div class="chat-bubble ${m.from==='me'?'out':'in'}">
      ${m.text}
      <div class="chat-time">${m.time}</div>
    </div>
  `).join('');
  const wrap = document.getElementById('chatMessages');
  wrap.scrollTop = wrap.scrollHeight;
}

function filterChatList(q) {
  currentChatQuery = q.trim().toLowerCase();
  renderChats();
}

function attachChat(type) {
  const chat = CHATS.find(c => c.id === currentChatId);
  if (!chat) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const text = type === 'photo' ? '📷 Foto compartilhada' : '📍 Localização compartilhada';
  chat.messages.push({from:'me', text, time:`${hh}:${mm}`});
  chat.last = text;
  chat.time = 'agora';
  renderChats();
  showToast(type === 'photo' ? '📷 Foto enviada' : '📍 Localização enviada','ts');
}

function sendChatMessage() {
  const inp = document.getElementById('chatInput');
  const val = inp.value.trim();
  if (!val) return;
  const chat = CHATS.find(c => c.id === currentChatId);
  if (!chat) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  chat.messages.push({from:'me', text:val, time:`${hh}:${mm}`});
  chat.last = val;
  chat.time = 'agora';
  inp.value = '';
  renderChats();
}

function createGroupChat() {
  const id = `g${Date.now()}`;
  CHATS.unshift({
    id,
    type:'group',
    name:'Novo Grupo de Viagem',
    avatar:'🧭',
    status:'3 membros',
    time:'agora',
    unread:0,
    last:'Grupo criado. Compartilhem dicas do destino!',
    messages:[
      {from:'me', text:'Grupo criado. Compartilhem dicas do destino!', time:'agora'}
    ]
  });
  currentChatId = id;
  renderChats();
  showToast('👥 Grupo criado com sucesso','ts');
}

function simulatePresence() {
  CHATS.forEach(c => {
    if (c.type !== 'direct') return;
    if (Math.random() > 0.65) c.online = !c.online;
    c.status = c.online ? 'Online agora' : `Visto há ${Math.floor(Math.random()*9)+1} min`;
    if (!c.online) c.typing = false;
  });
  if (document.getElementById('page-messages').classList.contains('act')) renderChats();
}

function simulateTyping() {
  CHATS.forEach(c => { if (c.type === 'direct') c.typing = false; });
  const onlineDirect = CHATS.filter(c => c.type === 'direct' && c.online);
  if (onlineDirect.length && Math.random() > 0.45) {
    const target = onlineDirect[Math.floor(Math.random() * onlineDirect.length)];
    target.typing = true;
    setTimeout(() => {
      target.typing = false;
      if (document.getElementById('page-messages').classList.contains('act')) renderChats();
    }, 2600);
  }
  if (document.getElementById('page-messages').classList.contains('act')) renderChats();
}

// ════════════════════════════════
//  NAVIGATION
// ════════════════════════════════
function showPage(pg) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('act'));
  document.querySelectorAll('.bn-item').forEach(b=>b.classList.remove('act'));
  document.getElementById('page-'+pg).classList.add('act');
  const bn = document.getElementById('bn-'+pg);
  if (bn) bn.classList.add('act');
  if (pg==='map') setTimeout(initMap, 120);
  if (pg==='profile') renderFeed('profileFeed', POSTS.filter(p=>p.handle==='@mariana.go'));
  if (pg==='news') renderNews(currentNewsFilter);
  if (pg==='messages') renderChats();
}

// ════════════════════════════════
//  AUTH
// ════════════════════════════════
function openAuth(){ document.getElementById('authOv').classList.add('open'); }
function closeAuth(){ document.getElementById('authOv').classList.remove('open'); }
function authTab(btn, tab) {
  document.querySelectorAll('.at-btn').forEach(b=>b.classList.remove('act'));
  btn.classList.add('act');
  document.getElementById('authLogin').style.display = tab==='login'?'':'none';
  document.getElementById('authReg').style.display = tab==='reg'?'':'none';
}
function doLogin() {
  loggedIn = true; closeAuth();
  document.getElementById('loginBtn').style.display='none';
  document.getElementById('avatarBtn').style.display='';
  showToast('✅ Bem-vinda de volta, Mariana!','ts');
}
function doRegister() {
  loggedIn = true; closeAuth();
  document.getElementById('loginBtn').style.display='none';
  document.getElementById('avatarBtn').style.display='';
  showToast('🎉 Conta criada! Verifique seu e-mail para ativar.','ts');
}

// ════════════════════════════════
//  POST
// ════════════════════════════════
function openPost() {
  if (!loggedIn) { openAuth(); showToast('🔐 Faça login para postar','tw'); return; }
  document.getElementById('postModal').classList.add('open');
}
function closePost(){ document.getElementById('postModal').classList.remove('open'); }
function selRisk(el, r) {
  document.querySelectorAll('.ropt').forEach(o=>o.className='ropt');
  el.classList.add('sel-'+r);
}
function setStars(n) { showToast(`⭐ Avaliação: ${n} estrela${n>1?'s':''}!`,'ts'); }
function submitPost() {
  closePost();
  showToast('📍 Relato publicado! Obrigada por ajudar outros viajantes.','ts');
}

// ════════════════════════════════
//  PROFILE TOGGLES
// ════════════════════════════════
function togglePriv(){
  const t=document.getElementById('privToggle');
  t.classList.toggle('on');
  showToast(t.classList.contains('on')?'🌐 Perfil público ativado':'🔒 Perfil privado ativado','');
}
function toggleLocProf(){
  const t=document.getElementById('locProfToggle');
  t.classList.toggle('on');
  showToast(t.classList.contains('on')?'📍 Localização visível para amigos':'🔒 Localização ocultada','');
}

// ════════════════════════════════
//  TOAST
// ════════════════════════════════
let toastTimer;
function showToast(msg, type='') {
  clearTimeout(toastTimer);
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  toastTimer = setTimeout(()=>{ t.className='toast'; }, 3200);
}

// CSS inject for card animation
const style = document.createElement('style');
style.textContent = '@keyframes cardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(style);
