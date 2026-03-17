// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  DATA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const PLACES = [
  {
    id:'p1', type:'restaurant', name:'Pad Thai Nana', city:'Bangkok', country:'TailÃ¢ndia', flag:'ðŸ‡¹ðŸ‡­',
    emoji:'ðŸœ', lat:13.740, lng:100.555, risk:'caution',
    address:'Soi 4, Sukhumvit Road, Bangkok', score:3.8, reviews:47,
    tags:['Comida Tailandesa','Street Food','TurÃ­stico'],
    scores:{precos:2.5, qualidade:4.2, atendimento:3.1, seguranca:3.8},
    tips:['Negocie o preÃ§o ANTES de sentar. CardÃ¡pio para turistas tem preÃ§o 3x maior.','Melhor pedir o que estÃ¡ no carrinho da rua, mais barato e autÃªntico.'],
    photos:['ðŸœ','ðŸŒ¶ï¸','ðŸ§†'],
    reviews_list:[
      {user:'Carlos M.', avatar:'https://i.pravatar.cc/40?img=12', stars:2, date:'2 dias',
       text:'Cobrou 800 baht por um pad thai que custa 80 em qualquer lugar. Quando perguntei o preÃ§o antes ficou irritado. Cuidado!', risk:'caution', verified:true},
      {user:'Ana Lima', avatar:'https://i.pravatar.cc/40?img=25', stars:4, date:'1 sem',
       text:'Se vocÃª negocia antes Ã© ok. A comida Ã© gostosa, sÃ³ nÃ£o caia no cardÃ¡pio turÃ­stico. Pedi pelo Google Translate o preÃ§o local.', risk:'safe', verified:true},
      {user:'Raquel F.', avatar:'https://i.pravatar.cc/40?img=35', stars:3, date:'2 sem',
       text:'Lugar ok, barulhento e lotado de turistas. Comida mediana. Prefira procurar mais dentro dos becos.', risk:'caution', verified:false},
    ]
  },
  {
    id:'p2', type:'hostel', name:'The Lub.d Bangkok', city:'Bangkok', country:'TailÃ¢ndia', flag:'ðŸ‡¹ðŸ‡­',
    emoji:'ðŸ›', lat:13.744, lng:100.534, risk:'safe',
    address:'925/9 Rama 1 Rd, Pathumwan, Bangkok', score:4.6, reviews:213,
    tags:['Hostel','Centro','Seguro','Recomendado'],
    scores:{localizacao:4.8, seguranca:4.7, limpeza:4.5, preco_justo:4.4},
    tips:['Deixe seus documentos no cofre. FuncionÃ¡rios muito atenciosos.','Ã“timo cafÃ© da manhÃ£ incluso. Ãrea social excelente para conhecer viajantes.'],
    photos:['ðŸ›','ðŸŠ','â˜•'],
    reviews_list:[
      {user:'Pedro A.', avatar:'https://i.pravatar.cc/40?img=33', stars:5, date:'3 dias',
       text:'Melhor hostel que fiquei em Bangkok. LocalizaÃ§Ã£o perfeita, perto do BTS Skytrain. Seguros, boa recepÃ§Ã£o 24h. Super recomendo!', risk:'safe', verified:true},
      {user:'Julia S.', avatar:'https://i.pravatar.cc/40?img=23', stars:4, date:'1 sem',
       text:'SÃ³ paguei 15 USD por noite em dorm de 8. Muito limpo, cofres em cada cama. Vi outros hostels na Ã¡rea com problemas de furto. Fique aqui!', risk:'safe', verified:true},
    ]
  },
  {
    id:'p3', type:'tourspot', name:'Templo Wat Pho', city:'Bangkok', country:'TailÃ¢ndia', flag:'ðŸ‡¹ðŸ‡­',
    emoji:'ðŸ›•', lat:13.7474, lng:100.4929, risk:'safe',
    address:'2 Sanam Chai Rd, Phra Nakhon, Bangkok', score:4.9, reviews:891,
    tags:['PatrimÃ´nio','Cultural','Budismo','Fotografia'],
    scores:{beleza:5.0, seguranca:4.8, acessibilidade:4.2, custo_beneficio:4.5},
    tips:['Leve roupas que cubram joelhos e ombros - exigido na entrada.','Chegue antes das 8h para menos turistas e fotos incrÃ­veis.','Guias freelance na porta NÃƒO sÃ£o oficiais. Evite.'],
    photos:['ðŸ›•','â­','ðŸ™'],
    reviews_list:[
      {user:'Marcos V.', avatar:'https://i.pravatar.cc/40?img=57', stars:5, date:'1 dia',
       text:'Absolutamente incrÃ­vel. O Buda reclinado Ã© de tirar o fÃ´lego. Lugar muito seguro, muitos visitantes. SÃ³ atenÃ§Ã£o aos vendedores na saÃ­da.', risk:'safe', verified:true},
      {user:'Sofia R.', avatar:'https://i.pravatar.cc/40?img=44', stars:5, date:'4 dias',
       text:'Um dos lugares mais bonitos que jÃ¡ vi na vida. Fui sozinha sem problema nenhum. Policiais turÃ­sticos presentes o tempo todo.', risk:'safe', verified:true},
      {user:'Diego L.', avatar:'https://i.pravatar.cc/40?img=60', stars:4, date:'2 sem',
       text:'Lindo demais. SÃ³ tome cuidado: homens na porta dizem que o templo estÃ¡ fechado e oferecem tour "especial". Ã‰ golpe! O templo funciona normalmente.', risk:'caution', verified:true},
    ]
  },
  {
    id:'p4', type:'restaurant', name:'La Boca Parilla', city:'Buenos Aires', country:'Argentina', flag:'ðŸ‡¦ðŸ‡·',
    emoji:'ðŸ¥©', lat:-34.6345, lng:-58.3630, risk:'suspicious',
    address:'Av. Pedro de Mendoza 1800, La Boca, BA', score:2.1, reviews:34,
    tags:['Churrasco','TurÃ­stico','PreÃ§o Abusivo','La Boca'],
    scores:{precos:1.2, qualidade:3.0, atendimento:2.1, seguranca:2.0},
    tips:['CardÃ¡pio sem preÃ§os visÃ­veis â€” golpe clÃ¡ssico para turistas.','RegiÃ£o perigosa apÃ³s 18h. Visite La Boca somente de dia e em grupo.'],
    photos:['ðŸ¥©','ðŸ·','âš ï¸'],
    reviews_list:[
      {user:'Fernanda C.', avatar:'https://i.pravatar.cc/40?img=44', stars:1, date:'3 dias',
       text:'ARMADILHA. Sentamos sem ver preÃ§o, conta veio 5x mais cara que o normal. Quando reclamamos ameaÃ§aram chamar "seguranÃ§a". Absurdo total.', risk:'danger', verified:true},
      {user:'Roberto M.', avatar:'https://i.pravatar.cc/40?img=55', stars:2, date:'1 sem',
       text:'Comida atÃ© razoÃ¡vel mas cobranÃ§a obscura. CartÃ£o nÃ£o funcionava "por coincidÃªncia". Fuja daqui.', risk:'suspicious', verified:false},
    ]
  },
  {
    id:'p5', type:'hostel', name:'Selina Gold Dust', city:'MedellÃ­n', country:'ColÃ´mbia', flag:'ðŸ‡¨ðŸ‡´',
    emoji:'ðŸ›', lat:6.2086, lng:-75.5659, risk:'safe',
    address:'Calle 10 #43D-5, El Poblado, MedellÃ­n', score:4.7, reviews:328,
    tags:['Hostel Premium','El Poblado','Coworking','Seguro'],
    scores:{localizacao:4.9, seguranca:4.8, limpeza:4.6, preco_justo:4.2},
    tips:['El Poblado Ã© o bairro mais seguro de MedellÃ­n. Ã“tima escolha.','Hostel tem app prÃ³prio para reportar qualquer problema. Muito responsivos.'],
    photos:['ðŸ›','ðŸ’»','ðŸŒ´'],
    reviews_list:[
      {user:'Larissa F.', avatar:'https://i.pravatar.cc/40?img=26', stars:5, date:'5 dias',
       text:'Fui sozinha, mulher, sem nenhum problema. Staff incrÃ­vel, me deram dicas valiosas de seguranÃ§a e o que evitar. El Poblado Ã© super turÃ­stico e seguro.', risk:'safe', verified:true},
    ]
  },
  {
    id:'p6', type:'tourspot', name:'Medina de Marrakech', city:'Marrakech', country:'Marrocos', flag:'ðŸ‡²ðŸ‡¦',
    emoji:'ðŸ›ï¸', lat:31.6295, lng:-7.9811, risk:'suspicious',
    address:'Medina, Marrakech, Marrocos', score:3.2, reviews:156,
    tags:['HistÃ³rico','Labirinto','Golpes Frequentes','Fotografia'],
    scores:{beleza:4.8, seguranca:2.5, acessibilidade:2.8, custo_beneficio:3.1},
    tips:['NUNCA siga "guias" nÃ£o solicitados. SÃ£o todos golpistas.','Negocie TUDO antes. PreÃ§o inicial para turista Ã© 10x o real.','Use roupas conservadoras. Respeite a cultura local.'],
    photos:['ðŸ›ï¸','ðŸ§¿','ðŸª'],
    reviews_list:[
      {user:'Ana Lima', avatar:'https://i.pravatar.cc/40?img=25', stars:3, date:'1 sem',
       text:'A Medina Ã© linda mas exaustiva. Em 2h tive 15 abordagens de "guias" e vendedores. Diga nÃ£o com firmeza e siga em frente. NÃ£o faÃ§a contato visual.', risk:'suspicious', verified:true},
      {user:'Thiago B.', avatar:'https://i.pravatar.cc/40?img=48', stars:4, date:'3 sem',
       text:'Apesar do caos, vale muito a pena. Contrate guia PELO SEU HOTEL, com preÃ§o combinado antes. AÃ­ a experiÃªncia Ã© incrÃ­vel.', risk:'caution', verified:true},
    ]
  },
  {
    id:'p7', type:'restaurant', name:'Ichiran Ramen Shibuya', city:'TÃ³quio', country:'JapÃ£o', flag:'ðŸ‡¯ðŸ‡µ',
    emoji:'ðŸœ', lat:35.6595, lng:139.7004, risk:'safe',
    address:'B1F Dogenzaka Building, 1-22-7 Dogenzaka, Shibuya, Tokyo', score:4.8, reviews:1240,
    tags:['Ramen','Shibuya','Seguro','ImperdÃ­vel'],
    scores:{precos:4.3, qualidade:5.0, atendimento:4.9, seguranca:5.0},
    tips:['Cada pessoa come em cabine individual â€” perfeito para quem viaja solo!','Pede tudo por formulÃ¡rio escrito. Tem em portuguÃªs no site.','Fila pode ser longa â€” vÃ¡ antes das 11h ou apÃ³s 15h.'],
    photos:['ðŸœ','ðŸ¥¢','â­'],
    reviews_list:[
      {user:'Pedro A.', avatar:'https://i.pravatar.cc/40?img=33', stars:5, date:'1 mes',
       text:'O melhor ramen da minha vida. TÃ³quio Ã© a cidade mais segura que jÃ¡ visitei. Zero problemas, culinÃ¡ria impecÃ¡vel. VÃÃÃ!', risk:'safe', verified:true},
      {user:'Camila R.', avatar:'https://i.pravatar.cc/40?img=38', stars:5, date:'2 mes',
       text:'Fui Ã s 10:30 e nÃ£o tinha fila. IncrÃ­vel. JapÃ£o em geral: pode deixar a mochila na mesa, ninguÃ©m toca.', risk:'safe', verified:true},
    ]
  },
  {
    id:'p8', type:'tourspot', name:'Castillo Miramare', city:'Trieste', country:'ItÃ¡lia', flag:'ðŸ‡®ðŸ‡¹',
    emoji:'ðŸ°', lat:45.7073, lng:13.7068, risk:'safe',
    address:'Viale Miramare, 34151 Trieste TS, ItÃ¡lia', score:4.6, reviews:412,
    tags:['Castelo','Vista Mar','Jardins','Seguro'],
    scores:{beleza:5.0, seguranca:4.9, acessibilidade:4.0, custo_beneficio:4.6},
    tips:['Entrada custa 8â‚¬. Reserve online para evitar fila.','Os jardins ao redor sÃ£o de acesso gratuito â€” igualmente lindos.'],
    photos:['ðŸ°','ðŸŒŠ','ðŸŒº'],
    reviews_list:[
      {user:'Marcos V.', avatar:'https://i.pravatar.cc/40?img=57', stars:5, date:'2 mes',
       text:'Um dos lugares mais bonitos da ItÃ¡lia e super desconhecido. Trieste em geral Ã© muito segura e autÃªntica, sem turismo de massa.', risk:'safe', verified:true},
    ]
  },
];

const FRIENDS = [
  {name:'Carlos M.', handle:'@carlos.world', avatar:'https://i.pravatar.cc/80?img=12', loc:'Khaosan Rd, Bangkok', dist:'1.2 km', online:true},
  {name:'Ana Lima', handle:'@ana.trips', avatar:'https://i.pravatar.cc/80?img=25', loc:'Chatuchak Market, Bangkok', dist:'8.4 km', online:true},
  {name:'Pedro A.', handle:'@pedroviaja', avatar:'https://i.pravatar.cc/80?img=33', loc:'Tokyo, Japao', dist:'4700 km', online:false},
];

const SENIOR_GROUPS = [
  {name:'Portugal 60+ Primavera', pace:'Ritmo leve', members:18, safety:'Hospedagens centrais e acessÃ­veis', action:'Entrar no grupo'},
  {name:'Buenos Aires Cultural 65+', pace:'Passeios curtos', members:11, safety:'Pequenos grupos com apoio mÃºtuo', action:'Ver roteiro'},
  {name:'Serra GaÃºcha com Companhia', pace:'Ã”nibus e caminhadas curtas', members:24, safety:'Check-in diÃ¡rio e roteiro tranquilo', action:'Pedir convite'},
];

const POSTS = [
  {id:1, user:'Carlos Menezes', handle:'@carlos.world', avatar:'https://i.pravatar.cc/80?img=12', verified:true,
   loc:'Khaosan Road, Bangkok', time:'2min', risk:'caution', placeId:'p1',
   text:'Cuidado com os restaurantes na saida da Khaosan! Sentei num lugar sem ver o preco e cobrou 800 baht por um prato de pad thai. Depois soube que o mesmo custa 80 baht ali do lado. O cardapio turistico e uma armadilha.',
   tags:['Bangkok','CobrancaAbusiva','Tailandia'], likes:47, comments:12, friendsOnly:false},
  {id:2, user:'Ana Lima', handle:'@ana.trips', avatar:'https://i.pravatar.cc/80?img=25', verified:true,
   loc:'Medina de Marrakech', time:'18min', risk:'suspicious', placeId:'p6',
   text:'Guias falsos na entrada da Medina - muito insistentes. Tentaram me levar para lojas de tapetes dizendo ser "tour gratuito". Quando recusei ficou agressivo. Contrate guia pelo hotel, nunca na rua.',
   tags:['Marrakech','GolpeTuristico','Marrocos'], likes:89, comments:34, friendsOnly:false},
  {id:3, user:'Pedro Alves', handle:'@pedroviaja', avatar:'https://i.pravatar.cc/80?img=33', verified:true,
   loc:'Ichiran Ramen, Shibuya', time:'1h', risk:'safe', placeId:'p7',
   text:'Definitivamente a melhor refeicao da viagem! Toquio e absolutamente segura - deixei a mochila na mesa e fui ao banheiro sem preocupacao. O ramen no Ichiran e de outro mundo. Japao = recomendo para qualquer viajante.',
   tags:['Tokyo','Japao','Seguro','Gastronomia'], likes:214, comments:58, friendsOnly:false},
  {id:4, user:'Fernanda Costa', handle:'@fer.nomade', avatar:'https://i.pravatar.cc/80?img=44', verified:true,
   loc:'La Boca, Buenos Aires', time:'3h', risk:'danger', placeId:'p4',
   text:'ALERTA SERIO: Fui assaltada na Av. Pedro de Mendoza as 19h. Evitem La Boca a noite. O restaurante La Boca Parilla e uma armadilha de precos tambem. Visitem Caminito somente de dia e em grupo.',
   tags:['BuenosAires','Argentina','ALERTA','Seguranca'], likes:302, comments:89, friendsOnly:false},
  {id:5, user:'André Nômade Raiz', handle:'@nomaderaizofc', avatar:'https://pt.quizur.com/_image?href=https://dev-beta.quizur.com/storage/v1/object/public//imagens//21272631/8603928c-a346-4ae6-9f59-1b5cb297694e.png&w=1024&h=1024&f=webp', verified:true,
   loc:'Medellin, Colombia', time:'5h', risk:'safe', placeId:'p5',
   text:'Medellin tem uma energia muito viva na rua. Curti trocar ideia com a galera local, andar por El Poblado com atencao e mostrar o contraste real da cidade, sem filtro e sem roteiro engessado.',
   tags:['Medellin','Colombia','Rua','VivenciaReal'], likes:178, comments:42, friendsOnly:false},
  {id:7, user:'André Nômade Raiz', handle:'@nomaderaizofc', avatar:'https://pt.quizur.com/_image?href=https://dev-beta.quizur.com/storage/v1/object/public//imagens//21272631/8603928c-a346-4ae6-9f59-1b5cb297694e.png&w=1024&h=1024&f=webp', verified:true,
   loc:'Cairo, Egito', time:'8h', risk:'suspicious', placeId:null,
   text:'No Cairo tentaram me puxar para um esquema de "ajuda" que terminava em cobranca forcada. O padrao e sempre o mesmo: muita simpatia no comeco e pressao no final. Da para circular, mas com atencao total a guia improvisado e preco combinado.',
   tags:['Egito','Golpe','Cairo','SemFiltro'], likes:261, comments:67, friendsOnly:false},
  {id:8, user:'André Nômade Raiz', handle:'@nomaderaizofc', avatar:'https://pt.quizur.com/_image?href=https://dev-beta.quizur.com/storage/v1/object/public//imagens//21272631/8603928c-a346-4ae6-9f59-1b5cb297694e.png&w=1024&h=1024&f=webp', verified:true,
   loc:'Caracas, Venezuela', time:'1d', risk:'caution', placeId:null,
   text:'A Venezuela tem muito mais nuance do que o noticiario costuma mostrar. Tem calor humano, rua viva e tambem zonas onde vacilar custa caro. O segredo aqui e andar com contexto local e ouvir quem conhece o bairro de verdade.',
   tags:['Venezuela','Caracas','Rua','ContextoLocal'], likes:304, comments:82, friendsOnly:false},
  {id:9, user:'André Nômade Raiz', handle:'@nomaderaizofc', avatar:'https://pt.quizur.com/_image?href=https://dev-beta.quizur.com/storage/v1/object/public//imagens//21272631/8603928c-a346-4ae6-9f59-1b5cb297694e.png&w=1024&h=1024&f=webp', verified:true,
   loc:'San Salvador, El Salvador', time:'2d', risk:'caution', placeId:null,
   text:'El Salvador passa uma sensacao de ordem muito diferente do que eu esperava. Ainda assim, viajar raiz aqui exige observar a rua, entender a dinamica de cada area e nao romantizar seguranca so porque o primeiro impacto foi bom.',
   tags:['ElSalvador','SanSalvador','Seguranca','VivenciaReal'], likes:289, comments:74, friendsOnly:false},
  {id:6, user:'Carlos Menezes', handle:'@carlos.world', avatar:'https://i.pravatar.cc/80?img=12', verified:true,
   loc:'Somente para amigos', time:'6h', risk:'caution', placeId:null,
   text:'[Visivel so para amigos] Estou no mercado flutuante de Damnoen Saduak. Lugar lindo mas vendedores bem insistentes. Coordenadas compartilhadas com voces.',
   tags:['MercadoFlutuante','Bangkok'], likes:8, comments:3, friendsOnly:true},
];

const NOTIFS = [
  {type:'info', text:'Seu relato sobre <strong>Cairo</strong> entrou entre os mais salvos da comunidade hoje.', time:'18min', unread:true, city:'Cairo'},
  {type:'danger', text:'<strong>Perigo em La Boca</strong> - 3 novos relatos de assalto. Voce indicou interesse na Argentina.', time:'5min', unread:true, placeId:'p4', city:'Buenos Aires'},
  {type:'info', text:'<strong>Carlos Menezes</strong> comeÃ§ou a te seguir.', time:'12min', unread:true, page:'profile'},
  {type:'caution', text:'Ãrea de <strong>atenÃ§Ã£o detectada</strong> prÃ³xima Ã  Khaosan Road. VocÃª estÃ¡ a 1.2km.', time:'45min', unread:true, placeId:'p1', city:'Bangkok'},
  {type:'safe', text:'Seu relato sobre MedellÃ­n recebeu <strong>178 curtidas</strong> ðŸ”¥', time:'2h', unread:false, placeId:'p5', city:'MedellÃ­n'},
  {type:'friend', text:'<strong>Ana Lima</strong> estÃ¡ a 8km de vocÃª em Bangkok. Toque para ver no mapa.', time:'3h', unread:false, city:'Bangkok'},
  {type:'danger', text:'<strong>Novo alerta</strong> de cobranÃ§a abusiva no distrito de Nana, Bangkok.', time:'6h', unread:false, placeId:'p1', city:'Bangkok'},
  {type:'info', text:'<strong>Pedro Alves</strong> e <strong>+5 pessoas</strong> curtiram seu relato sobre Selina MedellÃ­n.', time:'1d', unread:false, placeId:'p5', city:'MedellÃ­n'},
];

const NEWS_POSTS = [
  {
    source:'Ministerio do Turismo da Tailandia',
    sourceType:'gov',
    country:'Tailandia',
    time:'1h',
    type:'events',
    priority:'info',
    title:'Festival Songkran tera reforco de seguranca em Bangkok',
    text:'Autoridades anunciaram postos extras de atendimento ao turista e orientacoes em ingles nas areas de maior fluxo entre 12 e 16 de abril.',
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
    title:'Alerta sobre guias nao credenciados na Medina de Marrakech',
    text:'Recomendacao para contratar passeios apenas por agencias registradas e evitar pagamentos antecipados em dinheiro para abordagens de rua.',
    tags:['Consular','Seguranca','Marrakech'],
    url:'https://www.gov.br/mre'
  },
  {
    source:'Agencia de Mobilidade de Buenos Aires',
    sourceType:'transport',
    country:'Argentina',
    time:'5h',
    type:'mobility',
    priority:'warning',
    title:'Mudanca temporaria em linhas noturnas na regiao de La Boca',
    text:'Algumas linhas terao desvio apos 22h por obras urbanas. Turistas devem priorizar rotas oficiais de onibus e apps autorizados.',
    tags:['Transporte','La Boca','Servico'],
    url:'https://buenosaires.gob.ar'
  },
  {
    source:'Servico Meteorologico do Japao',
    sourceType:'meteo',
    country:'Japao',
    time:'8h',
    type:'weather',
    priority:'warning',
    title:'Frente fria em Toquio com chuva intensa no fim de semana',
    text:'Previsao de acumulado elevado entre sabado e domingo. Recomenda-se atencao em deslocamentos para areas com grande fluxo turistico.',
    tags:['Clima','Toquio','Previsao'],
    url:'https://www.jma.go.jp/jma/indexe.html'
  },
  {
    source:'Policia Turistica de Medellin',
    sourceType:'police',
    country:'Colombia',
    time:'1d',
    type:'safety',
    priority:'info',
    title:'Novo canal WhatsApp para suporte ao viajante',
    text:'Visitantes podem reportar ocorrencias e solicitar orientacao em tempo real por um canal dedicado com atendimento bilingue.',
    tags:['Suporte','El Poblado','Seguranca'],
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
    last:'VocÃª viu o alerta novo de Marrakech?',
    messages:[
      {from:'them', text:'Mari, vocÃª ainda estÃ¡ em Bangkok?', time:'09:12'},
      {from:'me', text:'Sim, fico atÃ© domingo. E vocÃª?', time:'09:14'},
      {from:'them', text:'Estou indo para Marrakech amanhÃ£.', time:'09:15'},
      {from:'them', text:'VocÃª viu o alerta novo de Marrakech?', time:'09:16'}
    ]
  },
  {
    id:'c2',
    type:'group',
    name:'Backpackers Sudeste AsiÃ¡tico',
    avatar:'ðŸŒ',
    online:false,
    typing:false,
    status:'14 membros',
    time:'18min',
    unread:5,
    last:'Carlos: tÃ¡xi sem taxÃ­metro no aeroporto de DMK.',
    messages:[
      {from:'them', text:'Carlos: pessoal, cheguei em Bangkok agora.', time:'08:51'},
      {from:'them', text:'Carlos: tÃ¡xi sem taxÃ­metro no aeroporto de DMK.', time:'08:56'},
      {from:'me', text:'Valeu pelo aviso. Melhor usar app entÃ£o.', time:'08:59'}
    ]
  },
  {
    id:'c3',
    type:'direct',
    name:'Pedro Alves',
    avatar:'https://i.pravatar.cc/80?img=33',
    online:false,
    typing:false,
    status:'Visto hÃ¡ 1h',
    time:'1h',
    unread:0,
    last:'Fechou! Te mando os hostels de TÃ³quio.',
    messages:[
      {from:'me', text:'PedrÃ£o, recomenda hostel em Shibuya?', time:'07:10'},
      {from:'them', text:'Fechou! Te mando os hostels de TÃ³quio.', time:'07:16'}
    ]
  }
];

const COMMUNITY_PULSE = [
  {num:'128', lab:'Relatos hoje'},
  {num:'43', lab:'Alertas Ãºteis'},
  {num:'17', lab:'Amigos prÃ³ximos'},
];

const IMPACT_PILLARS = [
  {icon:'ðŸ¤', title:'Combate ao isolamento', text:'Grupos e conversas ajudam viajantes a encontrar companhia segura e rede de apoio real durante a viagem.'},
  {icon:'ðŸ›¡ï¸', title:'Seguranca compartilhada', text:'Relatos confiaveis da comunidade reduzem golpes, desinformacao e decisao no escuro em destinos desconhecidos.'},
  {icon:'ðŸŒ', title:'Valor social local', text:'O app estimula troca com moradores, economia local e deslocamentos mais conscientes com base em experiencia real.'},
];

const IMPACT_STATS = {
  safeMeetups: 320,
  avoidedRisks: 78,
  activeGroups: 54,
  supportNetworkJoined: false,
};

const IMPACT_REQUESTS = [
  {id:'ir1', icon:'ðŸ§­', title:'Companhia para explorar o centro', text:'Julia quer companhia verificada para caminhar no centro de MedellÃ­n no fim da tarde.', city:'MedellÃ­n', responses:3},
  {id:'ir2', icon:'ðŸ†˜', title:'Ajuda com traduÃ§Ã£o e deslocamento', text:'Hassan precisa de apoio rÃ¡pido para chegar a um hostel seguro no Cairo.', city:'Cairo', responses:5},
  {id:'ir3', icon:'â˜•', title:'Encontro com viajantes e moradores', text:'Grupo local abriu roda de conversa com viajantes em San Salvador.', city:'San Salvador', responses:8},
];

const TREND_ROUTES = [
  {route:'Bangkok â†’ Chiang Mai', meta:'Alta troca de dicas para transporte noturno', risk:'âš ï¸ AtenÃ§Ã£o em tÃ¡xis sem taxÃ­metro'},
  {route:'MedellÃ­n â†’ GuatapÃ©', meta:'Subiu 62% em relatos positivos esta semana', risk:'âœ… Rota considerada segura de dia'},
  {route:'Marrakech â†’ Essaouira', meta:'Comunidade sugere tour fechado em grupo', risk:'ðŸŸ  Evite guias na rua'},
];

const PRICE_ALERTS = [
  {id:'pa1', route:'SÃ£o Paulo â†’ Lisboa', price:'R$ 3.450', drop:'-18%', crowd:'LotaÃ§Ã£o baixa', crowdLevel:'low', window:'mai/26', source:'Voos', note:'Queda monitorada 48h'},
  {id:'pa2', route:'Rio â†’ Buenos Aires', price:'R$ 1.180', drop:'-12%', crowd:'LotaÃ§Ã£o alta', crowdLevel:'high', window:'PÃ¡scoa', source:'Voos', note:'Feriado empurrando demanda'},
  {id:'pa3', route:'Porto â†’ Algarve Â· hotel', price:'â‚¬ 88/noite', drop:'-22%', crowd:'LotaÃ§Ã£o moderada', crowdLevel:'mid', window:'jun/26', source:'HotÃ©is', note:'Fora de pico de verÃ£o'},
  {id:'pa4', route:'MedellÃ­n Â· cowork', price:'US$ 21/dia', drop:'-9%', crowd:'LotaÃ§Ã£o baixa', crowdLevel:'low', window:'abr/26', source:'Cowork', note:'Inclui cadeira dedicada'},
];

const TRAVEL_DASH = {
  stats: [
    {num:'41', lab:'PaÃ­ses'},
    {num:'167', lab:'Cidades'},
    {num:'420', lab:'Dias na estrada'},
  ],
  countries: [
    {name:'Venezuela', visits:8, flag:'ðŸ‡»ðŸ‡ª'},
    {name:'El Salvador', visits:7, flag:'ðŸ‡¸ðŸ‡»'},
    {name:'Egito', visits:6, flag:'ðŸ‡ªðŸ‡¬'},
    {name:'ColÃ´mbia', visits:6, flag:'ðŸ‡¨ðŸ‡´'},
    {name:'JapÃ£o', visits:5, flag:'ðŸ‡¯ðŸ‡µ'},
    {name:'China', visits:4, flag:'ðŸ‡¨ðŸ‡³'},
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
  {lat:35.68,lng:51.41,risk:'danger',radius:330000,label:'TeerÃ£ e entorno'},
  {lat:33.31,lng:44.36,risk:'danger',radius:300000,label:'BagdÃ¡ e corredor central'},
  {lat:33.89,lng:35.50,risk:'suspicious',radius:240000,label:'Beirute e costa'},
  {lat:31.77,lng:35.21,risk:'suspicious',radius:220000,label:'JerusalÃ©m e cinturÃ£o'},
  {lat:24.71,lng:46.67,risk:'caution',radius:260000,label:'Riad e conexÃµes'},
  {lat:25.20,lng:55.27,risk:'safe',radius:200000,label:'Eixo Dubai-Abu Dhabi'}
];

const CRISIS_CORRIDORS = [
  {route:'AmÃ£ (JOR) â†’ Doha (QAT)', status:'OperaÃ§Ã£o parcial', window:'06:00-18:00 UTC'},
  {route:'Riad (SAU) â†’ Dubai (UAE)', status:'Aberto', window:'24h com triagem'},
  {route:'Beirute (LBN) â†’ Larnaca (CYP)', status:'Janela curta', window:'08:00-14:00 UTC'},
  {route:'Erbil (IRQ) â†’ Istambul (TUR)', status:'Aberto', window:'Voos variÃ¡veis'}
];

const WAR_ZONES = [
  {lat:48.6,lng:37.8,risk:'danger',radius:380000,label:'Leste da UcrÃ¢nia',note:'Frente ativa ampla na regiÃ£o do Donbas e arredores',source:'CFR / ICRC'},
  {lat:31.45,lng:34.45,risk:'danger',radius:150000,label:'Gaza e entorno imediato',note:'Conflito ativo e risco extremo de deslocamento',source:'ICRC / CFR'},
  {lat:15.5,lng:32.5,risk:'danger',radius:320000,label:'SudÃ£o central (Khartoum)',note:'Guerra em curso com impacto urbano severo',source:'ACLED / CFR'},
  {lat:13.9,lng:25.4,risk:'danger',radius:300000,label:'Darfur',note:'Combates e crise humanitÃ¡ria persistente',source:'ACLED / ICRC'},
  {lat:23.8,lng:95.9,risk:'danger',radius:420000,label:'Myanmar central e norte',note:'MÃºltiplas frentes armadas e deslocamento interno',source:'CFR / ACLED'},
  {lat:-1.7,lng:29.2,risk:'danger',radius:260000,label:'Leste da RDC',note:'Confrontos recorrentes na regiÃ£o de Goma e Kivu',source:'ICRC / CFR'},
  {lat:15.6,lng:47.8,risk:'danger',radius:420000,label:'IÃªmen',note:'Conflito prolongado e ambiente de seguranÃ§a altamente volÃ¡til',source:'CFR / ICRC'}
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  STATE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
let crisisPanelOpen = false;
let locOn = true;
let selectedRisk = 'safe';
let selectedStars = 4;
let mapFocusPlaceId = 'p1';

const CURRENT_USER = {
  name:'AndrÃ© NÃ´made Raiz',
  handle:'@nomaderaizofc',
  avatar:'https://pt.quizur.com/_image?href=https://dev-beta.quizur.com/storage/v1/object/public//imagens//21272631/8603928c-a346-4ae6-9f59-1b5cb297694e.png&w=1024&h=1024&f=webp',
  verified:true,
  trustScore:98,
  trustLabel:'Nomade raiz confiavel',
  loc:'ðŸŒŽ no mundo',
  age:41,
  mode:'explorador',
};

const EXPERIENCE_MODES = {
  explorador: {
    label:'Explorador',
    journeyTitle:'Ritmo dinÃ¢mico, social e urbano',
    contextCopy:'O Azimute vai priorizar mobilidade, grupos rÃ¡pidos e alertas urbanos para esse destino.',
    groupsTitle:'Grupos e companhia',
    groupsSub:'Conecte-se com pessoas do mesmo ritmo e interesse para viajar junto.',
    profileBio:'Viajante independente | Gosta de descobrir lugares novos, socializar e circular com autonomia',
    verifyTitle:'Perfil explorador verificado âœ“',
    verifySub:'Identidade validada e preferÃªncias de mobilidade social confirmadas para grupos, alertas e relatos.',
    dashTitle:'Painel de Viagens Explorador',
    dashSub:'Resumo de destinos, encontros sociais e experiÃªncias dinÃ¢micas dos Ãºltimos 24 meses',
    badges:[
      {text:'ðŸŒ† Social ativo', color:'var(--accent)'},
      {text:'ðŸ›¡ Relatos confiÃ¡veis', color:'var(--safe)'},
      {text:'âš¡ Ritmo urbano', color:'var(--caution)'},
    ],
    groups:[
      {name:'Cidade sem roteiro fixo', pace:'Mais livre', members:26, safety:'Encontros em pontos centrais e movimentados', action:'Entrar no grupo'},
      {name:'Hostels e cafÃ©s culturais', pace:'Social', members:19, safety:'Pontos pÃºblicos e verificados', action:'Ver roteiro'},
      {name:'Exploradores de fim de tarde', pace:'Passeios curtos', members:14, safety:'Check-in de retorno combinado', action:'Pedir convite'},
    ],
  },
  equilibrado: {
    label:'Equilibrado',
    journeyTitle:'SeguranÃ§a, planejamento e flexibilidade',
    contextCopy:'O Azimute vai priorizar equilÃ­brio entre seguranÃ§a, conforto e vida social nesse destino.',
    groupsTitle:'Grupos e companhia',
    groupsSub:'Encontre grupos de viagem e companhia com interesses e ritmo compatÃ­veis.',
    profileBio:'Viajante que equilibra seguranÃ§a, planejamento e liberdade | Prefere boas recomendaÃ§Ãµes e grupo confiÃ¡vel',
    verifyTitle:'Perfil equilibrado verificado âœ“',
    verifySub:'Identidade validada e preferÃªncias de viagem confirmadas para grupos, alertas e relatos.',
    dashTitle:'Painel de Viagens',
    dashSub:'Resumo de destinos, grupos e experiÃªncias relevantes dos Ãºltimos 24 meses',
    badges:[
      {text:'ðŸ¤ Companhia ativa', color:'var(--accent)'},
      {text:'ðŸ›¡ Relatos confiÃ¡veis', color:'var(--safe)'},
      {text:'ðŸ§­ Boa organizaÃ§Ã£o', color:'var(--caution)'},
    ],
    groups:[
      {name:'Portugal com ritmo leve', pace:'Equilibrado', members:18, safety:'Hospedagens centrais e roteiros claros', action:'Entrar no grupo'},
      {name:'Buenos Aires cultural', pace:'Passeios mÃ©dios', members:13, safety:'Planejamento com pontos seguros', action:'Ver roteiro'},
      {name:'Serra GaÃºcha com companhia', pace:'ConfortÃ¡vel', members:17, safety:'Check-in diÃ¡rio e apoio mÃºtuo', action:'Pedir convite'},
    ],
  },
  conforto: {
    label:'Conforto e apoio',
    journeyTitle:'Mais clareza, conforto e suporte social',
    contextCopy:'O Azimute vai priorizar seguranÃ§a, acessibilidade e grupos de companhia para esse destino.',
    groupsTitle:'Grupos e companhia',
    groupsSub:'Encontre grupos de viagem e pessoas com perfil parecido com o seu.',
    profileBio:'Viajante que valoriza conforto, clareza e companhia segura | Prefere roteiros tranquilos e boa acessibilidade',
    verifyTitle:'Perfil conforto e apoio verificado âœ“',
    verifySub:'Identidade validada e preferÃªncias de viagem confirmadas para grupos, alertas e relatos.',
    dashTitle:'Painel de Viagens Conforto',
    dashSub:'Resumo de destinos, grupos e experiÃªncias mais confortÃ¡veis dos Ãºltimos 24 meses',
    badges:[
      {text:'ðŸ¤ Companhia ativa', color:'var(--accent)'},
      {text:'ðŸ›¡ Relatos confiÃ¡veis', color:'var(--safe)'},
      {text:'ðŸ§­ Roteiros tranquilos', color:'var(--caution)'},
    ],
    groups:[
      {name:'Portugal conforto e apoio', pace:'Ritmo leve', members:18, safety:'Hospedagens centrais e acessÃ­veis', action:'Entrar no grupo'},
      {name:'Buenos Aires 60+ cultural', pace:'Passeios curtos', members:11, safety:'Pequenos grupos com apoio mÃºtuo', action:'Ver roteiro'},
      {name:'Serra GaÃºcha com companhia', pace:'Ã”nibus e caminhadas curtas', members:24, safety:'Check-in diÃ¡rio e roteiro tranquilo', action:'Pedir convite'},
    ],
  },
};

Object.assign(EXPERIENCE_MODES.explorador, {
  journeyTitle:'Ritmo independente, comunidade forte e estrada sem enrolacao',
  contextCopy:'O Azimute vai priorizar mobilidade, encontros reais, alertas diretos e apoio da comunidade para viagens sem filtro.',
  groupsTitle:'Comunidade na estrada',
  groupsSub:'Conecte-se com viajantes que curtem improviso, autenticidade e apoio mutuo.',
  profileBio:'Criador de viagem com tom direto e raiz | Explora lugares intensos, conversa com moradores e prefere vivencia real a roteiro pronto',
  verifyTitle:'Perfil nomade verificado',
  verifySub:'Identidade validada e historico de relatos confiaveis para grupos, alertas e apoio entre viajantes.',
  dashTitle:'Painel do Nomade Raiz',
  dashSub:'Resumo de destinos, comunidade e vivencias em lugares como Venezuela, El Salvador, Colombia e Asia',
  badges:[
    {text:'Comunidade ativa', color:'var(--accent)'},
    {text:'Relatos confiaveis', color:'var(--safe)'},
    {text:'Nomade raiz', color:'var(--caution)'},
  ],
  groups:[
    {name:'Nomades raiz America Latina', pace:'Mais livre', members:26, safety:'Encontros em pontos centrais e check-in coletivo', action:'Entrar no grupo'},
    {name:'Hostel, rua e comida local', pace:'Social', members:19, safety:'Pontos publicos verificados pela comunidade', action:'Ver roteiro'},
    {name:'Asia sem filtro', pace:'Bate e volta', members:14, safety:'Retorno combinado e apoio rapido no grupo', action:'Pedir convite'},
  ],
});

const DESTINATIONS = ['Bangkok', 'Buenos Aires', 'MedellÃ­n', 'Marrakech', 'TÃ³quio', 'Trieste'];
let currentDestination = 'Bangkok';

function syncVueState(partial) {
  if (!window.azimuteVue?.store) return;
  Object.assign(window.azimuteVue.store, partial);
}

function slugifyTag(text) {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function placeTrust(place) {
  const verifiedCount = place.reviews_list.filter(r => r.verified).length;
  const total = place.reviews_list.length || 1;
  const confidence = Math.min(99, Math.round(((verifiedCount / total) * 65) + (place.score * 7)));
  return {
    confidence,
    verifiedCount,
    total,
    communityLabel: verifiedCount >= 3 ? 'Comunidade confirma' : 'Ainda em validacao',
  };
}

function postTrust(post) {
  const base = post.trustScore ?? (post.verified ? 88 : 72);
  const confirmations = post.confirmations ?? Math.max(1, Math.round((post.likes + post.comments) / 24));
  return {
    score: Math.min(99, base),
    confirmations,
    label: post.verified ? 'Relato verificado' : 'Aguardando confirmacoes',
  };
}

function getTimeNow() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function getRelativeNowLabel() {
  return 'agora';
}

function inferPlaceFromInput(rawValue) {
  const query = rawValue.trim().toLowerCase();
  if (!query) return null;
  return PLACES.find(place => {
    const haystack = [
      place.name,
      place.city,
      place.country,
      place.address,
    ].join(' ').toLowerCase();
    return haystack.includes(query) || query.includes(place.name.toLowerCase());
  }) || null;
}

function inferModeFromAge(age) {
  if (age >= 60) return 'conforto';
  if (age <= 30) return 'explorador';
  return 'equilibrado';
}

function currentModeConfig() {
  return EXPERIENCE_MODES[CURRENT_USER.mode] || EXPERIENCE_MODES.equilibrado;
}

function modeNotifWeight(notif) {
  const weights = {
    explorador: {danger:4, caution:3, friend:3, info:2, safe:1},
    equilibrado: {danger:5, caution:4, friend:2, info:2, safe:1},
    conforto: {danger:6, caution:5, friend:4, info:2, safe:1},
  };
  const table = weights[CURRENT_USER.mode] || weights.equilibrado;
  return (table[notif.type] || 0) + (notif.city === currentDestination ? 2 : 0) + (notif.unread ? 1 : 0);
}

function modePlaceScore(place) {
  const acess = place.scores.acessibilidade ?? 3;
  const segur = place.scores.seguranca ?? 3;
  const beleza = place.scores.beleza ?? 3;
  const local = place.scores.localizacao ?? 3;
  const riskPenalty = {safe:0, caution:-.6, suspicious:-1.1, danger:-1.7}[place.risk] || 0;
  if (CURRENT_USER.mode === 'explorador') return (place.score * 1.5) + beleza + local + riskPenalty;
  if (CURRENT_USER.mode === 'conforto') return (segur * 1.8) + (acess * 1.8) + (place.score * 1.2) + riskPenalty;
  return (place.score * 1.5) + (segur * 1.2) + (acess * .8) + local + riskPenalty;
}

function modePlaceHint(place) {
  if (CURRENT_USER.mode === 'explorador') {
    return place.risk === 'safe' ? 'Bom para quem quer explorar com autonomia e mobilidade.' : 'Vale ir com atenÃ§Ã£o ao entorno e horÃ¡rios.';
  }
  if (CURRENT_USER.mode === 'conforto') {
    const acess = place.scores.acessibilidade ?? 3;
    const segur = place.scores.seguranca ?? 3;
    return (acess >= 4 && segur >= 4)
      ? 'Boa opÃ§Ã£o para viagens mais confortÃ¡veis, com acessibilidade e ambiente seguro.'
      : 'Confira acessibilidade, deslocamento e horÃ¡rio antes de incluir no roteiro.';
  }
  return place.risk === 'safe'
    ? 'Boa combinaÃ§Ã£o entre seguranÃ§a, conforto e experiÃªncia.'
    : 'Melhor visitar com planejamento e atenÃ§Ã£o ao contexto local.';
}

function placeDecisionCopy(place) {
  if (place.risk === 'safe') return 'Pode visitar com boa confianca da comunidade.';
  if (place.risk === 'caution') return 'Vale ir com atencao e verificando relatos recentes.';
  if (place.risk === 'suspicious') return 'Melhor redobrar cuidado antes de incluir no roteiro.';
  return 'Melhor evitar agora e procurar alternativa mais segura.';
}

function applyAdaptiveNavigation() {
  const sides = document.querySelectorAll('.botnav-side');
  if (sides.length < 2) return;
  const [left, right] = sides;
  const navItems = {
    feed: document.getElementById('bn-feed'),
    map: document.getElementById('bn-map'),
    explore: document.getElementById('bn-explore'),
    notifications: document.getElementById('bn-notifications'),
    more: document.getElementById('bn-more'),
  };
  const orders = {
    explorador: {left:['feed','explore'], right:['map','notifications','more']},
    equilibrado: {left:['feed','map'], right:['explore','notifications','more']},
    conforto: {left:['feed','notifications'], right:['map','explore','more']},
  };
  const order = orders[CURRENT_USER.mode] || orders.equilibrado;
  order.left.forEach(key => navItems[key] && left.appendChild(navItems[key]));
  order.right.forEach(key => navItems[key] && right.appendChild(navItems[key]));
}

function applyAdaptiveExperience() {
  const mode = currentModeConfig();
  const profileName = document.getElementById('profileName');
  const profileHandle = document.getElementById('profileHandle');
  const profileBio = document.getElementById('profileBio');
  const verifyTitle = document.getElementById('verifyTitle');
  const verifySub = document.getElementById('verifySub');
  const travelDashTitle = document.getElementById('travelDashTitle');
  const travelDashSub = document.getElementById('travelDashSub');
  const profileBadges = document.getElementById('profileBadges');
  document.body.setAttribute('data-exp-mode', CURRENT_USER.mode);

  if (profileName) {
    profileName.innerHTML = `${CURRENT_USER.name} <span class="vbadge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>`;
  }
  if (profileHandle) {
    profileHandle.textContent = `${CURRENT_USER.handle} Â· ${CURRENT_USER.age} anos Â· ${mode.label}`;
  }
  if (profileBio) profileBio.textContent = mode.profileBio;
  if (verifyTitle) verifyTitle.textContent = mode.verifyTitle;
  if (verifySub) verifySub.textContent = mode.verifySub;
  if (travelDashTitle) travelDashTitle.textContent = mode.dashTitle;
  if (travelDashSub) travelDashSub.textContent = mode.dashSub;
  if (profileBadges) {
    profileBadges.innerHTML = mode.badges.map(b => `<div class="pbadge" style="color:${b.color}">${b.text}</div>`).join('');
  }
  applyAdaptiveNavigation();
}

const originalApplyAdaptiveExperience = applyAdaptiveExperience;
applyAdaptiveExperience = function() {
  originalApplyAdaptiveExperience();
  const profileHandle = document.getElementById('profileHandle');
  if (profileHandle) {
    profileHandle.textContent = `${CURRENT_USER.handle} Â· ${CURRENT_USER.age} anos Â· ${CURRENT_USER.loc}`;
  }
};

function centerMapOnPlace(placeId, zoom = 12, openPopup = true) {
  if (!map) return;
  const marker = allMarkers.find(item => item.placeId === placeId);
  const place = PLACES.find(item => item.id === placeId);
  if (!marker || !place) return;
  map.flyTo([place.lat, place.lng], zoom, { duration: 1.1 });
  if (openPopup) {
    setTimeout(() => marker.openPopup(), 950);
  }
}

function renderMapFocus() {
  const place = PLACES.find(item => item.id === mapFocusPlaceId) || PLACES[0];
  const wrap = document.getElementById('mapFocusCard');
  if (!wrap || !place) return;
  const trust = placeTrust(place);
  wrap.innerHTML = `
    <div class="map-focus-top">
      <div>
        <div class="map-focus-eyebrow">Em foco</div>
        <div class="map-focus-title">${place.name}</div>
        <div class="map-focus-sub">${place.city}, ${place.country}</div>
      </div>
      <span class="risk-pill ${riskCls(place.risk)}">${riskLabel(place.risk)}</span>
    </div>
    <div class="map-focus-metrics">
      <div class="map-focus-metric">
        <strong>${trust.confidence}%</strong>
        <span>confianca</span>
      </div>
      <div class="map-focus-metric">
        <strong>${place.reviews}</strong>
        <span>relatos</span>
      </div>
    </div>
    <div class="map-focus-actions">
      <button class="mini-btn" onclick="showPage('feed')">Relatos</button>
      <button class="btn btn-p btn-sm" onclick="centerMapOnPlace('${place.id}', 13, true)">Centralizar</button>
    </div>
  `;
}

function toggleCrisisPanel(force) {
  const panel = document.getElementById('crisisPanel');
  const btn = document.getElementById('crisisPanelBtn');
  if (!panel || !btn) return;
  crisisPanelOpen = typeof force === 'boolean' ? force : !crisisPanelOpen;
  panel.classList.toggle('compact', !crisisPanelOpen);
  btn.textContent = crisisPanelOpen ? 'Ocultar detalhes' : 'Ver detalhes';
}

function previewPostPlace(rawValue) {
  const hint = document.getElementById('postPlaceHint');
  if (!hint) return;
  const matchedPlace = inferPlaceFromInput(rawValue);
  if (!rawValue.trim()) {
    hint.textContent = 'Digite um local existente para conectar o relato ao mapa ou descreva um novo lugar.';
    return;
  }
  if (matchedPlace) {
    hint.textContent = `Local reconhecido: ${matchedPlace.name}, ${matchedPlace.city}. Seu relato tambÃ©m reforÃ§arÃ¡ esse ponto no mapa.`;
    return;
  }
  hint.textContent = 'Novo local: seu relato serÃ¡ publicado no feed, mas sem vÃ­nculo com um ponto jÃ¡ existente.';
}

function destinationPrimaryPlace(city) {
  return PLACES.find(place => place.city === city) || PLACES[0];
}

function renderDestinationStrip() {
  const wrap = document.getElementById('contextStrip');
  if (!wrap) return;
  const place = destinationPrimaryPlace(currentDestination);
  const mode = currentModeConfig();
  wrap.innerHTML = `
    <div class="context-copy">
      <div class="context-eyebrow">Destino atual</div>
      <div class="context-title">Acompanhando ${currentDestination}</div>
      <div class="context-sub">${mode.contextCopy}</div>
    </div>
    <select class="context-select" onchange="setCurrentDestination(this.value)">
      ${DESTINATIONS.map(city => `<option value="${city}" ${city === currentDestination ? 'selected' : ''}>${city}</option>`).join('')}
    </select>
  `;
  if (place) {
    mapFocusPlaceId = place.id;
  }
}

function renderJourneyCard() {
  const wrap = document.getElementById('journeyCard');
  if (!wrap) return;
  const mode = currentModeConfig();
  wrap.innerHTML = `
    <section class="journey-card">
      <div class="journey-top">
        <div>
          <div class="journey-title">Seu azimute agora</div>
          <div class="journey-sub">${mode.journeyTitle}. Menos ruido, mais orientacao util para viajar com seguranca e apoio social.</div>
        </div>
      </div>
      <div class="journey-actions">
        <button class="journey-action" onclick="showPage('map')">
          <strong>Mapa do destino</strong>
          <span>Riscos, apoio e deslocamentos em ${currentDestination}.</span>
        </button>
        <button class="journey-action" onclick="showPage('messages')">
          <strong>Grupos de viagem</strong>
          <span>Companhia verificada e combinacao de roteiro.</span>
        </button>
        <button class="journey-action" onclick="openPost()">
          <strong>Novo relato</strong>
          <span>Compartilhe uma dica util para a comunidade.</span>
        </button>
      </div>
    </section>
  `;
}

function safestCommunityPlace() {
  return [...PLACES].sort((a, b) => modePlaceScore(b) - modePlaceScore(a))[0] || PLACES[0];
}

function highestRiskPlace() {
  const order = {danger:4, suspicious:3, caution:2, safe:1};
  return [...PLACES].sort((a, b) => (order[b.risk] || 0) - (order[a.risk] || 0))[0] || PLACES[0];
}

function openTrustCheck(placeId = mapFocusPlaceId) {
  mapFocusPlaceId = placeId;
  showPage('map');
  setTimeout(() => centerMapOnPlace(placeId, 13, true), 150);
}

function openRiskAlerts(placeId = null) {
  if (placeId) mapFocusPlaceId = placeId;
  showPage('notifications');
}

function openCommunitySupport() {
  joinSupportNetwork();
  showPage('messages');
}

function renderSeniorHome() {
  const wrap = document.getElementById('seniorHome');
  if (!wrap) return;
  const safest = safestCommunityPlace();
  const riskiest = highestRiskPlace();
  const trust = safest ? placeTrust(safest) : {confidence: 96};
  wrap.innerHTML = `
    <div class="senior-home-top">
      <div>
        <div class="senior-home-title">Viaje com confianca</div>
        <div class="senior-home-sub">Passo a passo simples para descobrir se um local e seguro, ver alertas e falar com a comunidade quando precisar.</div>
      </div>
      <span class="crowd-pill lvl-low">60+</span>
    </div>
    <div class="senior-home-grid">
      <button class="senior-home-action" onclick="openTrustCheck('${safest?.id || 'p1'}')">
        <strong>1. Consultar um local</strong>
        <span>Abra o mapa ja centralizado em um ponto confiavel para entender risco e confianca da comunidade.</span>
      </button>
      <button class="senior-home-action" onclick="openRiskAlerts('${riskiest?.id || 'p4'}')">
        <strong>2. Ver alertas importantes</strong>
        <span>Leia apenas os avisos mais relevantes para evitar golpe, cobranca abusiva ou area perigosa.</span>
      </button>
      <button class="senior-home-action" onclick="createImpactRequest('companhia')">
        <strong>3. Pedir companhia segura</strong>
        <span>Encontre uma pessoa ou grupo verificado para passear com mais tranquilidade.</span>
      </button>
      <button class="senior-home-action" onclick="openCommunitySupport()">
        <strong>4. Falar com a rede de apoio</strong>
        <span>Entre no grupo de ajuda para receber orientacao rapida e apoio humano durante a viagem.</span>
      </button>
    </div>
    <div class="senior-home-note">
      <strong>Resumo simples do momento</strong>
      ${safest ? `${safest.name} aparece como local mais confiavel agora, com ${trust.confidence}% de confianca da comunidade.` : 'A comunidade nao reportou risco alto para seu roteiro principal no momento.'}
      ${riskiest ? ` Evite ${riskiest.name} sem verificar alertas antes.` : ''}
    </div>
  `;
}

function renderObjectiveModule() {
  const wrap = document.getElementById('objectiveModule');
  if (!wrap) return;
  const comfortMode = CURRENT_USER.mode === 'conforto';
  wrap.innerHTML = comfortMode ? '' : `
    <div class="objective-head">
      <div>
        <div class="objective-title">Fluxo simples para viajar melhor</div>
        <div class="objective-sub">O objetivo do app e unico: verificar confianca em locais, evitar golpes e fazer a comunidade ajudar outras pessoas em viagem.</div>
      </div>
      <span class="crowd-pill lvl-low">Comunidade</span>
    </div>
    <div class="objective-grid">
      <div class="objective-step">
        <strong>Verifique antes de ir</strong>
        <span>Consulte risco, confianca da comunidade e relatos recentes antes de fechar um lugar ou rota.</span>
      </div>
      <div class="objective-step">
        <strong>Evite golpe e perigo</strong>
        <span>Veja padroes de abuso, horarios ruins e pontos que a comunidade esta pedindo para evitar.</span>
      </div>
      <div class="objective-step">
        <strong>Ajude outras pessoas</strong>
        <span>Publique um relato util, responda pedidos e fortale?a a rede social que protege quem viaja.</span>
      </div>
    </div>
    <div class="objective-cta">
      <button class="impact-btn primary" onclick="showPage('explore')">Ver locais confiaveis</button>
      <button class="impact-btn" onclick="showPage('notifications')">Ler alertas</button>
      <button class="impact-btn" onclick="openCommunitySupport()">Abrir rede de apoio</button>
    </div>
  `;
}

function renderTrustHub() {
  const wrap = document.getElementById('trustHub');
  if (!wrap) return;
  const safest = safestCommunityPlace();
  const riskiest = highestRiskPlace();
  const safestTrust = safest ? placeTrust(safest) : {confidence: 96};
  const comfortMode = CURRENT_USER.mode === 'conforto';

  wrap.innerHTML = comfortMode ? `
    <div class="trust-head">
      <div>
        <div class="trust-title">Ajuda para decidir com calma</div>
        <div class="trust-sub">O Azimute resume o que e confiavel, o que pede cuidado e quem pode ajudar voce agora.</div>
      </div>
      <span class="crowd-pill lvl-low">Assistido</span>
    </div>
    <div class="trust-grid senior">
      <button class="trust-card trust-safe" onclick="openTrustCheck('${safest?.id || 'p1'}')">
        <div class="trust-card-label">Local confiavel</div>
        <strong>${safest?.name || 'Ponto seguro'}</strong>
        <span>${safestTrust.confidence}% de confianca da comunidade.</span>
      </button>
      <button class="trust-card trust-alert" onclick="openRiskAlerts('${riskiest?.id || 'p4'}')">
        <div class="trust-card-label">Evite agora</div>
        <strong>${riskiest?.name || 'Area em atencao'}</strong>
        <span>Veja os alertas antes de decidir ir.</span>
      </button>
      <button class="trust-card trust-community" onclick="openCommunitySupport()">
        <div class="trust-card-label">Rede humana</div>
        <strong>Falar com a comunidade</strong>
        <span>${IMPACT_REQUESTS.length} pedidos ativos e grupos prontos para apoiar.</span>
      </button>
    </div>
  ` : `
    <div class="trust-head">
      <div>
        <div class="trust-title">Central de confianca da viagem</div>
        <div class="trust-sub">Use a comunidade para decidir rapido: onde vale ir, o que evitar e como pedir ajuda quando precisar.</div>
      </div>
      <span class="crowd-pill lvl-low">Nivel S</span>
    </div>
    <div class="trust-grid">
      <button class="trust-card trust-safe" onclick="openTrustCheck('${safest?.id || 'p1'}')">
        <div class="trust-card-label">Mais confiavel</div>
        <strong>${safest?.name || 'Ponto seguro'}</strong>
        <span>${safestTrust.confidence}% de confianca e relatos positivos recentes.</span>
      </button>
      <button class="trust-card trust-alert" onclick="openRiskAlerts('${riskiest?.id || 'p4'}')">
        <div class="trust-card-label">Alerta principal</div>
        <strong>${riskiest?.name || 'Area em atencao'}</strong>
        <span>Golpes e riscos que merecem verificacao antes de ir.</span>
      </button>
      <button class="trust-card trust-community" onclick="openCommunitySupport()">
        <div class="trust-card-label">Comunidade ativa</div>
        <strong>Rede de apoio Azimute</strong>
        <span>${IMPACT_REQUESTS.length} pedidos ativos para companhia, ajuda local e conexao entre viajantes.</span>
      </button>
    </div>
    <div class="trust-actions">
      <button class="impact-btn primary" onclick="showPage('explore')">Comparar locais</button>
      <button class="impact-btn" onclick="openRiskAlerts('${riskiest?.id || 'p4'}')">Ver alertas</button>
      <button class="impact-btn" onclick="openPost()">Alimentar a rede</button>
    </div>
  `;
}

function ensureMoreLogoutCard() {
  const grid = document.querySelector('#page-more .more-grid');
  if (!grid || document.getElementById('logoutMoreCard')) return;
  const btn = document.createElement('button');
  btn.className = 'more-card';
  btn.id = 'logoutMoreCard';
  btn.onclick = logout;
  btn.innerHTML = `
    <div class="more-icon">Sair</div>
    <div class="more-title">Sair da conta</div>
    <div class="more-sub">Encerrar sessao e voltar para o login.</div>
  `;
  grid.appendChild(btn);
}

function repairMojibakeText(value) {
  if (typeof value !== 'string' || !/[ÃÂðâ]/.test(value)) return value;
  try {
    const bytes = Uint8Array.from(Array.from(value, ch => ch.charCodeAt(0) & 0xff));
    const decoded = new TextDecoder('utf-8').decode(bytes);
    if (decoded && decoded !== value) return decoded;
  } catch {}

  return value
    .replace(/Â·/g, '·')
    .replace(/AtenÃ§Ã£o/g, 'Atencao')
    .replace(/SeguranÃ§a/g, 'Seguranca')
    .replace(/ExperiÃªncia/g, 'Experiencia')
    .replace(/AtualizaÃ§Ãµes/g, 'Atualizacoes')
    .replace(/NotÃ­cias/g, 'Noticias')
    .replace(/PaÃ­ses/g, 'Paises')
    .replace(/ConfianÃ§a/g, 'Confianca')
    .replace(/NÃ­vel/g, 'Nivel')
    .replace(/AvaliaÃ§Ã£o/g, 'Avaliacao')
    .replace(/LocalizaÃ§Ã£o/g, 'Localizacao')
    .replace(/PÃºblico/g, 'Publico')
    .replace(/usuÃ¡rios/g, 'usuarios')
    .replace(/vocÃª/g, 'voce')
    .replace(/estÃ¡/g, 'esta')
    .replace(/SÃ‰RIO/g, 'SERIO')
    .replace(/tambÃ©m/g, 'tambem')
    .replace(/preÃ§os/g, 'precos')
    .replace(/as 19h/g, 'as 19h')
    .replace(/âœ“/g, '')
    .replace(/â­/g, '★')
    .replace(/â˜†/g, '☆')
    .replace(/â—/g, '●')
    .replace(/�/g, '')
    .replace(/ðŸ[^ ]*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function plainTextLocation(value) {
  return repairMojibakeText(value || '')
    .replace(/[^\p{L}\p{N}\s,.\-]/gu, ' ')
    .replace(/\bx\b/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function sanitizeRenderedText(root = document.body) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let current;
  while ((current = walker.nextNode())) textNodes.push(current);
  textNodes.forEach(node => {
    const fixed = repairMojibakeText(node.nodeValue);
    if (fixed !== node.nodeValue) node.nodeValue = fixed;
  });

  root.querySelectorAll('*').forEach(el => {
    ['title', 'placeholder', 'aria-label'].forEach(attr => {
      const value = el.getAttribute(attr);
      if (!value) return;
      const fixed = repairMojibakeText(value);
      if (fixed !== value) el.setAttribute(attr, fixed);
    });
  });
}

function polishVisibleCopy() {
  document.title = 'Azimute - Viagem segura para cada perfil';
  document.querySelectorAll('#page-feed .feed-layout > .more-card').forEach(card => card.remove());

  const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  };

  setText('#splash .spl-sub', 'Experiencia adaptativa de viagem');
  setText('#page-map .crisis-title', 'Modo crise');
  setText('#page-map .crisis-sub', 'Ative apenas se precisar de orientacao imediata.');
  setText('#page-explore .ph-sub', 'Lugares confiaveis para sua viagem');
  setText('#page-notifications .ph-sub', 'O que precisa da sua atencao agora');
  setText('#page-messages .ph-sub', 'Rede de apoio, grupos de viagem e ajuda entre viajantes');
  setText('#page-more .ph-sub', 'Acessos secundarios e atalhos rapidos do Azimute');

  const search = document.querySelector('#page-explore .search-wrap input');
  if (search) search.placeholder = 'Restaurante, hostel, ponto turistico...';

  const profileBio = document.getElementById('profileBio');
  if (profileBio && !profileBio.textContent.includes('Explora lugares polemicos')) {
    profileBio.textContent = 'Criador de viagem com tom direto e raiz | Explora lugares polemicos, conversa com moradores e mostra a rua como ela e';
  }

  sanitizeRenderedText(document.body);
}

function renderDesktopRail() {
  const newsWrap = document.getElementById('desktopRailNews');
  const contactsWrap = document.getElementById('desktopRailContacts');
  const supportWrap = document.getElementById('desktopRailSupport');
  if (!newsWrap || !contactsWrap || !supportWrap) return;

  newsWrap.innerHTML = NEWS_POSTS.slice(0, 3).map(item => `
    <article class="x-rail-item">
      <strong>${item.title}</strong>
      <span>${item.source} · ${item.country}</span>
      <button class="mini-btn" onclick="showPage('news')">Abrir noticias</button>
    </article>
  `).join('');

  contactsWrap.innerHTML = FRIENDS.slice(0, 3).map(item => `
    <article class="x-rail-item">
      <strong>${item.name}</strong>
      <span>${plainTextLocation(item.loc)} · ${item.dist}</span>
      <button class="mini-btn" onclick="showPage('messages')">Chamar</button>
    </article>
  `).join('');

  supportWrap.innerHTML = IMPACT_REQUESTS.slice(0, 3).map(item => `
    <article class="x-rail-item">
      <strong>${item.title}</strong>
      <span>${item.city} · ${item.responses} respostas</span>
      <button class="mini-btn" onclick="showPage('messages')">Ver apoio</button>
    </article>
  `).join('');

  sanitizeRenderedText(document.body);
}

function setCurrentDestination(city) {
  currentDestination = city;
  localStorage.setItem('azimute-destination', city);
  const place = destinationPrimaryPlace(city);
  if (place) {
    mapFocusPlaceId = place.id;
  }
  renderDestinationStrip();
  renderJourneyCard();
  renderSeniorHome();
  renderObjectiveModule();
  renderTrustHub();
  renderMapFocus();
  applyAdaptiveExperience();
  renderNotifs();
  if (document.getElementById('page-map').classList.contains('act')) {
    centerMapOnPlace(mapFocusPlaceId, 11, false);
  }
  showToast(`ðŸ“ Destino atualizado para ${city}`,'ts');
}

function notifActions(notif, index) {
  const primary = notif.type === 'friend'
    ? {label:'Ver no mapa', action:'map'}
    : notif.placeId
      ? {label:'Ver no mapa', action:'map'}
      : notif.page === 'profile'
        ? {label:'Abrir perfil', action:'open'}
        : {label:'Entendi', action:'dismiss'};

  const secondary = notif.city
    ? {label:'Trocar destino', action:'destination'}
    : notif.type === 'info'
      ? {label:'Marcar como lido', action:'dismiss'}
      : null;

  return `
    <div class="notif-actions">
      <button class="notif-action primary" onclick="handleNotifAction(${index},'${primary.action}')">${primary.label}</button>
      ${secondary ? `<button class="notif-action" onclick="handleNotifAction(${index},'${secondary.action}')">${secondary.label}</button>` : ''}
    </div>
  `;
}

function handleNotifAction(index, action) {
  const notif = NOTIFS[index];
  if (!notif) return;
  notif.unread = false;
  if (action === 'map' && (notif.placeId || notif.city)) {
    if (notif.city) currentDestination = notif.city;
    mapFocusPlaceId = notif.placeId || destinationPrimaryPlace(notif.city)?.id || mapFocusPlaceId;
    localStorage.setItem('azimute-destination', currentDestination);
    renderDestinationStrip();
    renderJourneyCard();
    renderMapFocus();
    showPage('map');
    return;
  }
  if (action === 'open' && notif.page) {
    showPage(notif.page);
    return;
  }
  if (action === 'destination' && notif.city) {
    setCurrentDestination(notif.city);
    showPage('map');
    return;
  }
  renderNotifs();
  showToast('âœ… Alerta atualizado','ts');
}

function themeIcon(mode) {
  if (mode === 'light') {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3c0 .28 0 .56.02.83A7 7 0 0 0 20.17 12c.27.01.55.02.83.02z"/></svg>`;
}

function applyTheme(mode) {
  document.body.setAttribute('data-theme', mode);
  syncVueState({ currentTheme: mode });
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
  showToast(currentTheme === 'light' ? 'â˜€ï¸ Modo claro ativado' : 'ðŸŒ™ Modo escuro ativado','');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  BOOT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
window.addEventListener('load', () => {
  initTheme();
  currentDestination = localStorage.getItem('azimute-destination') || currentDestination;
  setTimeout(() => {
    document.getElementById('splash').classList.add('out');
    setTimeout(() => {
      document.getElementById('app').classList.add('vis');
      ensureMoreLogoutCard();
      polishVisibleCopy();
      renderPulse();
      renderDestinationStrip();
      renderJourneyCard();
      renderSeniorHome();
      renderObjectiveModule();
      renderTrustHub();
      applyAdaptiveExperience();
      renderDesktopRail();
      renderStories();
      renderTrendingRoutes();
      renderPriceAlerts();
      renderImpactModule();
      renderTravelDashboard();
      renderFeed();
      renderFriends();
      renderExplore();
      renderNotifs();
      renderNews();
      renderFeedSideNews();
      renderCrisisCorridors();
      renderCrisisTimer();
      renderMapFocus();
      toggleCrisisPanel(false);
      renderChats();
      openAuth();
      setInterval(simulatePresence, 15000);
      setInterval(simulateTyping, 9000);
      setInterval(cycleFeedSideNews, 6500);
    }, 400);
  }, 2700);
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  STORIES
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
    <div class="trip-card" onclick="showToast('ðŸ—ºï¸ Rota salva para acompanhar','ts')">
      <div class="trip-route">${r.route}</div>
      <div class="trip-meta">${r.meta}</div>
      <div class="trip-risk">${r.risk}</div>
    </div>
  `).join('');
}

function renderPriceAlerts() {
  const wrap = document.getElementById('seniorGroupList');
  if (!wrap) return;
  const mode = currentModeConfig();
  wrap.innerHTML = mode.groups.slice(0, 3).map(g => `
    <div class="price-row">
      <div class="price-info">
        <div class="price-route">${g.name}</div>
        <div class="price-meta">${g.members} membros Â· ${g.pace}</div>
      </div>
      <div class="price-right">
        <span class="crowd-pill lvl-low">Verificado</span>
        <button class="mini-btn" onclick="showToast('ðŸ¤ ${g.action}: ${g.name}','ts')">${g.action}</button>
      </div>
    </div>
  `).join('');
}

function renderImpactModule() {
  const wrap = document.getElementById('impactModule');
  if (!wrap) return;
  wrap.innerHTML = `
    <div class="impact-head">
      <div>
        <div class="impact-title">Impacto social do Azimute</div>
        <div class="impact-sub">Mais do que viagem: rede de apoio, informacao confiavel e incentivo a conexoes humanas e economia local.</div>
      </div>
      <span class="crowd-pill lvl-low">Nivel S</span>
    </div>
    <div class="impact-grid">
      <div class="impact-stat"><strong>+${IMPACT_STATS.safeMeetups}</strong><span>encontros seguros facilitados entre viajantes</span></div>
      <div class="impact-stat"><strong>${IMPACT_STATS.avoidedRisks}%</strong><span>dos relatos ajudam outros usuarios a evitar risco ou golpe</span></div>
      <div class="impact-stat"><strong>${IMPACT_STATS.activeGroups}</strong><span>grupos ativos com apoio mutuo e troca de experiencia</span></div>
    </div>
    <div class="impact-actions">
      <button class="impact-btn primary" onclick="joinSupportNetwork()">${IMPACT_STATS.supportNetworkJoined ? 'Na rede de apoio' : 'Entrar na rede de apoio'}</button>
      <button class="impact-btn" onclick="createImpactRequest('companhia')">Pedir companhia</button>
      <button class="impact-btn" onclick="createImpactRequest('ajuda')">Oferecer ajuda</button>
    </div>
    <div class="impact-list">
      ${IMPACT_PILLARS.map(item => `
        <div class="impact-item">
          <div class="impact-icon">${item.icon}</div>
          <div class="impact-copy">
            <strong>${item.title}</strong>
            <span>${item.text}</span>
          </div>
        </div>
      `).join('')}
      ${IMPACT_REQUESTS.slice(0,3).map(item => `
        <div class="impact-item">
          <div class="impact-icon">${item.icon}</div>
          <div class="impact-copy">
            <strong>${item.title}</strong>
            <span>${item.text}</span>
            <div class="impact-meta">
              <span class="impact-mini">${item.city}</span>
              <span class="impact-mini">${item.responses} respostas</span>
              <button class="mini-btn" onclick="answerImpactRequest('${item.id}')">Responder</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function ensureImpactChat() {
  const existing = CHATS.find(chat => chat.id === 'impact-support');
  if (existing) return existing;
  const chat = {
    id:'impact-support',
    type:'group',
    name:'Rede de Apoio Azimute',
    avatar:'ðŸ¤',
    online:false,
    typing:false,
    status:'Comunidade ativa',
    time:'agora',
    unread:1,
    last:'Azimute: bem-vindo Ã  rede de apoio.',
    messages:[
      {from:'them', text:'Azimute: bem-vindo Ã  rede de apoio. Aqui a comunidade combina companhia, ajuda local e suporte rÃ¡pido.', time:getTimeNow()},
    ]
  };
  CHATS.unshift(chat);
  return chat;
}

function joinSupportNetwork() {
  if (IMPACT_STATS.supportNetworkJoined) {
    const chat = ensureImpactChat();
    currentChatId = chat.id;
    showPage('messages');
    return;
  }
  IMPACT_STATS.supportNetworkJoined = true;
  IMPACT_STATS.activeGroups += 1;
  const chat = ensureImpactChat();
  currentChatId = chat.id;
  NOTIFS.unshift({
    type:'info',
    text:'VocÃª entrou na <strong>Rede de Apoio Azimute</strong> e jÃ¡ pode ajudar ou pedir companhia em viagem.',
    time:'agora',
    unread:true,
    page:'messages',
  });
  renderImpactModule();
  renderTrustHub();
  renderDesktopRail();
  renderNotifs();
  renderChats();
  showToast('ðŸ¤ VocÃª entrou na rede de apoio','ts');
}

function createImpactRequest(kind) {
  const request = kind === 'ajuda'
    ? {id:`ir${Date.now()}`, icon:'ðŸ™‹', title:'Ajuda oferecida por AndrÃ©', text:'AndrÃ© se disponibilizou para orientar viajantes sobre deslocamento seguro e leitura de contexto local.', city:'Online', responses:1}
    : {id:`ir${Date.now()}`, icon:'ðŸ§­', title:'AndrÃ© pediu companhia verificada', text:'Pedido de companhia para explorar a cidade com mais seguranca e trocar experiencia com a comunidade.', city:currentDestination, responses:0};
  IMPACT_REQUESTS.unshift(request);
  if (kind === 'companhia') IMPACT_STATS.safeMeetups += 1;
  const chat = ensureImpactChat();
  chat.messages.push({from:'me', text: kind === 'ajuda' ? 'Posso ajudar outros viajantes com orientacao de rota e contexto local.' : 'Procuro companhia verificada para explorar a cidade com mais seguranca.', time:getTimeNow()});
  chat.last = chat.messages[chat.messages.length - 1].text;
  chat.time = 'agora';
  currentChatId = chat.id;
  renderImpactModule();
  renderTrustHub();
  renderDesktopRail();
  renderChats();
  showToast(kind === 'ajuda' ? 'ðŸ™‹ Ajuda oferecida para a comunidade' : 'ðŸ§­ Pedido de companhia publicado','ts');
}

function answerImpactRequest(id) {
  const request = IMPACT_REQUESTS.find(item => item.id === id);
  if (!request) return;
  request.responses += 1;
  IMPACT_STATS.safeMeetups += 1;
  const chat = ensureImpactChat();
  chat.messages.push({from:'me', text:`Posso responder ao pedido "${request.title}" em ${request.city}.`, time:getTimeNow()});
  chat.last = `Novo apoio em ${request.city}`;
  chat.time = 'agora';
  currentChatId = chat.id;
  renderImpactModule();
  renderTrustHub();
  renderDesktopRail();
  renderChats();
  showToast('ðŸ¤ VocÃª respondeu a um pedido de apoio','ts');
}

function savePriceAlert(id) {
  const alert = PRICE_ALERTS.find(a => a.id === id);
  showToast(alert ? `ðŸ”” Alerta salvo: ${alert.route}` : 'ðŸ”” Alerta salvo','ts');
}

function renderFeedSideNews() {
  const targetCount = 10;
  const top = Array.from({length:targetCount}, (_,i) => NEWS_POSTS[(i + feedSideNewsOffset) % NEWS_POSTS.length]);
  const wrap = document.getElementById('feedSideNews');
  if (!wrap) return;
  wrap.innerHTML = top.map(n => `
    <article class="feed-side-item">
      <div class="feed-side-item-title">${n.title}</div>
      <div class="feed-side-item-meta">${repairMojibakeText(n.source)} · ${n.time} atras</div>
    </article>
  `).join('');
}

function renderCrisisCorridors() {
  const list = document.getElementById('corridorList');
  if (!list) return;
  list.innerHTML = CRISIS_CORRIDORS.map(c => `
    <article class="corridor-item">
      <div class="corridor-route">${c.route}</div>
      <div class="corridor-meta">${c.status} Â· ${c.window}</div>
    </article>
  `).join('');
}

function renderCrisisTimer() {
  const t = document.getElementById('crisisTimerLabel');
  if (!t) return;
  const mm = String(Math.floor(crisisCheckinLeft / 60)).padStart(2,'0');
  const ss = String(crisisCheckinLeft % 60).padStart(2,'0');
  t.textContent = `Check-in seguranÃ§a em ${mm}:${ss}`;
}

function startCrisisTimer() {
  if (crisisTimer) clearInterval(crisisTimer);
  crisisTimer = setInterval(() => {
    if (!crisisMode) return;
    crisisCheckinLeft--;
    if (crisisCheckinLeft <= 0) {
      crisisCheckinLeft = 180;
      showToast('âš ï¸ FaÃ§a check-in de seguranÃ§a com seus contatos','tw');
    }
    renderCrisisTimer();
  }, 1000);
}

function ackCrisisCheckin() {
  crisisCheckinLeft = 180;
  renderCrisisTimer();
  showToast('âœ… Check-in enviado para seus contatos','ts');
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
  const row = document.getElementById('storiesRow');
  if (!row) return;
  const addStoryBtn = `
    <button type="button" class="story story-add" onclick="openStoryComposer()" aria-label="Publicar um novo story">
      <div class="story-ring"><div class="story-add-circle">+</div></div>
    </button>`;

  const stories = STORIES.map(s =>
    `<div class="story" onclick="showToast('ðŸ“ Story de ${s.name} Â· ${s.status}','ts')">
      <div class="story-ring ${s.ring}"><img class="story-img" src="${s.img}" alt=""></div>
      <div class="story-name">${s.name} Â· ${s.status}</div>
    </div>`
  ).join('');

  row.innerHTML = addStoryBtn + stories;
}

function openStoryComposer() {
  const form = document.getElementById('storyComposer');
  const nameInput = document.getElementById('storyNameInput');
  if (!form) return;
  form.scrollIntoView({behavior:'smooth', block:'center'});
  setTimeout(() => nameInput?.focus({preventScroll:true}), 200);
}

function createStory() {
  const nameInput = document.getElementById('storyNameInput');
  const imgInput = document.getElementById('storyImgInput');
  const statusInput = document.getElementById('storyStatusInput');
  if (!nameInput) return;
  const name = nameInput.value.trim();
  if (!name) {
    showToast('Digite o @ do usuÃ¡rio do story','');
    return;
  }
  const img = (imgInput?.value.trim()) || `https://i.pravatar.cc/80?u=${encodeURIComponent(name)}`;
  const status = (statusInput?.value.trim()) || 'agora';
  STORIES.unshift({img, name, ring:'cr', status});
  if (STORIES.length > 20) STORIES.length = 20;
  renderStories();
  nameInput.value = '';
  if (imgInput) imgInput.value = '';
  if (statusInput) statusInput.value = '';
  showToast('ðŸ“¸ Story publicado!','ts');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  FRIENDS (Location)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
        <div class="lfl-loc">ðŸ“ ${f.loc}</div>
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
  showToast(locOn ? 'ðŸ“ LocalizaÃ§Ã£o compartilhada com amigos' : 'ðŸ”’ LocalizaÃ§Ã£o ocultada', locOn?'ts':'');
  document.getElementById('friendsOnline').style.display = locOn ? '' : 'none';
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  FEED
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const riskLabel = r => ({safe:'Seguro', caution:'Atencao', suspicious:'Suspeito', danger:'Perigo'}[r]);
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
            <span class="tweet-dot">Â·</span>
            <span class="tweet-time">${p.time}</span>
            <span class="risk-pill ${riskCls(p.risk)}">${riskLabel(p.risk)}</span>
          </div>
          <div class="fc-loc">${plainTextLocation(p.loc)}</div>
          ${(() => {
            const trust = postTrust(p);
            return `
              <div class="trust-row">
                <div class="trust-badge">${trust.label}</div>
                <div class="trust-meta">${trust.score}% de confianca</div>
              </div>
            `;
          })()}
          ${p.friendsOnly ? `<div style="padding-top:4px"><span style="background:rgba(0,229,184,.08);border:1px solid rgba(0,229,184,.2);border-radius:50px;font-size:.7rem;color:var(--accent);padding:2px 8px">Somente amigos</span></div>` : ''}
          <div class="fc-body" style="padding:7px 0 2px">
            <div class="fc-text">${p.text}</div>
            ${p.placeId ? `<div class="fc-place-link" onclick="openPlace('${p.placeId}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s-8-9.3-8-14a8 8 0 0 1 16 0c0 4.7-8 14-8 14z"/><circle cx="12" cy="8" r="3"/></svg>${PLACES.find(pl=>pl.id===p.placeId)?.name||'Ver local'}</div>` : ''}
            <div class="fc-tags">${p.tags.slice(0,2).map(t=>`<span class="tag">#${t}</span>`).join('')}</div>
          </div>
          <div class="fc-actions" style="padding:8px 0 0;border-top:none">
            <button class="fc-act" onclick="likeFc(this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>${p.likes}</button>
            <button class="fc-act" onclick="showToast('Comentarios em breve!','')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>${p.comments}</button>
            ${p.placeId ? `<button class="fc-act" onclick="openPlace('${p.placeId}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-9.3-8-14a8 8 0 0 1 16 0c0 4.7-8 14-8 14z"/><circle cx="12" cy="8" r="3"/></svg>Local</button>` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');
  sanitizeRenderedText(document.getElementById(container));
}

function likeFc(btn) {
  btn.classList.toggle('liked');
  const n = parseInt(btn.textContent.trim());
  btn.innerHTML = btn.innerHTML.replace(/\d+/, btn.classList.contains('liked') ? n+1 : n-1);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  EXPLORE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let explorePlaces = [...PLACES];
function renderExplore(places=PLACES) {
  const rankedPlaces = [...places].sort((a, b) => modePlaceScore(b) - modePlaceScore(a));
  document.getElementById('exploreList').innerHTML = rankedPlaces.map(p => `
    <div class="place-card-h" onclick="openPlace('${p.id}')">
      <div class="pch-icon">${p.emoji}</div>
      <div class="pch-info">
        <div class="pch-name">${p.name}</div>
        <div class="pch-loc">${plainTextLocation(`${p.city}, ${p.country}`)}</div>
        <div class="pch-meta">
          <span class="risk-pill ${riskCls(p.risk)}">${riskLabel(p.risk)}</span>
          ${(((p.scores.acessibilidade ?? 3) >= 4) && ((p.scores.seguranca ?? 3) >= 4)) ? `<span class="tag">Bom para 60+</span>` : ''}
          ${p.tags.slice(0,1).map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="place-adapt"><strong>${placeDecisionCopy(p)}</strong></div>
        <div class="place-adapt">${modePlaceHint(p)}</div>
      </div>
      <div class="pch-right">
        <div class="pch-score">${p.score}★</div>
        <div class="pch-reviews">${p.reviews} relatos</div>
      </div>
    </div>
  `).join('');
  sanitizeRenderedText(document.getElementById('exploreList'));
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  PLACE DRAWER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const starStr = n => 'â­'.repeat(Math.round(n)) + 'â˜†'.repeat(5-Math.round(n));
const barColor = s => s >= 4 ? 'var(--safe)' : s >= 3 ? 'var(--caution)' : 'var(--danger)';
const pct = s => Math.round((s/5)*100)+'%';

function openPlace(id) {
  const p = PLACES.find(pl=>pl.id===id);
  if (!p) return;
  const trust = placeTrust(p);

  const scoreLabels = {
    precos:'PreÃ§os', qualidade:'Qualidade', atendimento:'Atendimento', seguranca:'SeguranÃ§a',
    localizacao:'LocalizaÃ§Ã£o', limpeza:'Limpeza', preco_justo:'PreÃ§o Justo',
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
          <div style="font-size:.7rem;color:var(--muted2);margin-top:2px">${'â­'.repeat(r.stars)}${'â˜†'.repeat(5-r.stars)}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <div class="review-date">${r.date} atrÃ¡s</div>
          <span class="risk-pill ${riskCls(r.risk)}" style="font-size:.62rem">${riskLabel(r.risk)}</span>
        </div>
      </div>
      <div class="review-text">${r.text}</div>
    </div>
  `).join('');

  const tipsHtml = p.tips.map(t=>`<div class="tip-card"><div class="tip-icon">ðŸ’¡</div><div>${t}</div></div>`).join('');
  const photosHtml = p.photos.map(ph=>`<div class="photo-thumb">${ph}</div>`).join('');

  const typeLabel = {restaurant:'ðŸœ Restaurante', hostel:'ðŸ› Hostel', tourspot:'ðŸ“¸ Ponto TurÃ­stico', transport:'ðŸš— Transporte', market:'ðŸ› Mercado'}[p.type] || p.type;

  document.getElementById('drawerContent').innerHTML = `
    <div class="place-header">
      <div class="place-icon-wrap" style="background:var(--surface2)">${p.emoji}</div>
      <div style="flex:1">
        <div class="place-title">${p.name}</div>
        <div class="place-address"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-9.3-8-14a8 8 0 0 1 16 0c0 4.7-8 14-8 14z"/><circle cx="12" cy="8" r="3"/></svg>${p.address}</div>
        <div class="place-meta-row" style="margin-top:6px">
          <span style="font-size:.75rem;color:var(--muted2)">${typeLabel}</span>
          <span style="color:var(--muted2)">Â·</span>
          <span style="font-size:.75rem;color:var(--muted2)">${p.flag} ${p.city}</span>
        </div>
      </div>
    </div>

    <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:14px">
      <div>
        <div class="place-score-big">${p.score}</div>
        <div style="font-size:.8rem;color:var(--muted2)">${p.reviews} avaliaÃ§Ãµes</div>
      </div>
      <div style="flex:1">
        <div style="font-size:1.2rem">${'â­'.repeat(Math.round(p.score))}${'â˜†'.repeat(5-Math.round(p.score))}</div>
        <span class="risk-pill ${riskCls(p.risk)}" style="margin-top:5px;display:inline-flex">${riskLabel(p.risk)}</span>
      </div>
      <button class="btn btn-p btn-sm" onclick="closeDrawer();openPost()">âœï¸ Avaliar</button>
    </div>

    <div class="trust-panel">
      <div class="trust-panel-score">${trust.confidence}%</div>
      <div class="trust-panel-copy">
        <div class="trust-panel-title">Indice de confianca do local</div>
        <div class="trust-panel-sub">${trust.communityLabel} Â· ${trust.verifiedCount} de ${trust.total} relatos com identidade verificada</div>
      </div>
    </div>

    <div class="section-sep">PontuaÃ§Ã£o Detalhada</div>
    <div class="score-bars">${scoreRows}</div>

    <div class="section-sep">Fotos dos Viajantes</div>
    <div class="photos-row">${photosHtml}</div>

    <div class="section-sep">Dicas de SeguranÃ§a</div>
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  MAP
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const RISK_COLORS = {safe:'#22c55e', caution:'#f59e0b', suspicious:'#f97316', danger:'#ef4444'};
const TYPE_COLORS = {restaurant:'#a855f7', hostel:'#3b82f6', tourspot:'#ec4899', transport:'#06b6d4', market:'#84cc16'};

function initMap() {
  if (mapInit) return;
  mapInit = true;

  map = L.map('map', {center:[20,12], zoom:2, zoomControl:true});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'Â© OpenStreetMap contributors', maxZoom:18
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
          <div style="font-size:.73rem;color:#5a6478;margin-bottom:6px">ðŸ“ ${p.city}, ${p.country} ${p.flag}</div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
            <span style="background:${col}22;color:${col};padding:2px 7px;border-radius:50px;font-size:.68rem;font-weight:700">${riskLabel(p.risk)}</span>
            <span style="font-size:.72rem;color:#8892a4">${p.score}â­ Â· ${p.reviews} relatos</span>
          </div>
          <div style="font-size:.76rem;color:#8892a4;margin-bottom:8px">${p.reviews_list.length > 0 ? `"${p.reviews_list[0].text.substring(0,60)}..."` : ''}</div>
          <button onclick="closeDrawerIfOpen();openPlace('${p.id}')" style="
            display:block;width:100%;padding:7px;
            background:linear-gradient(135deg,#00e5b8,#0099cc);
            border:none;border-radius:8px;color:#000;font-weight:700;font-size:.78rem;
            cursor:pointer;font-family:'DM Sans',sans-serif;
          ">Ver detalhes e avaliaÃ§Ãµes â†’</button>
        </div>
      `, {className:'', maxWidth:240});

    marker.placeData = p;
    marker.placeId = p.id;
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

  WAR_ZONES.forEach(z => {
    const col = '#b91c1c';
    const circle = L.circle([z.lat, z.lng], {
      color:col,
      fillColor:col,
      fillOpacity:.18,
      opacity:.45,
      weight:2,
      radius:z.radius
    }).addTo(map);
    circle.riskType = 'danger';
    circle.placeType = 'war';
    circle.bindPopup(`
      <div style="font-family:'DM Sans',sans-serif;min-width:210px">
        <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;margin-bottom:4px">ðŸ”¥ ${z.label}</div>
        <div style="font-size:.75rem;color:#8892a4;line-height:1.45">${z.note}</div>
        <div style="margin-top:8px;font-size:.7rem;color:#b91c1c;font-weight:700">Zona de guerra ativa Â· ${z.source}</div>
      </div>
    `, {className:'', maxWidth:250});
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
          <div style="font-size:.75rem;color:#8892a4;margin-top:4px">ðŸ“ ${fc.f.loc}</div>
          <div style="font-size:.72rem;color:#22c55e;margin-top:2px">â— Online agora</div>
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
    toggleCrisisPanel(true);
    crisisCheckinLeft = 180;
    startCrisisTimer();
    showToast('ðŸš¨ Modo Crise ativado: zonas e corredores priorizados','tw');
  } else {
    if (crisisTimer) clearInterval(crisisTimer);
    crisisTimer = null;
    crisisCheckinLeft = 180;
    renderCrisisTimer();
    showToast('âœ… Modo Crise desativado','ts');
  }
  applyMapVisibility();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  NOTIFICATIONS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
  const sortedNotifs = [...NOTIFS].sort((a, b) => modeNotifWeight(b) - modeNotifWeight(a));
  document.getElementById('notifList').innerHTML = sortedNotifs.map(n=>`
    <div class="notif-item ${n.unread?'unread':''}">
      <div class="ni-icon" style="background:${niColors[n.type]};color:${niTColors[n.type]}">${niIcons[n.type]}</div>
      <div style="flex:1">
        <div class="ni-text">${n.text}</div>
        <div style="font-size:.7rem;color:var(--muted);margin-top:2px">${n.time} atras</div>
        ${notifActions(n, NOTIFS.indexOf(n))}
      </div>
      ${n.unread ? '<div class="unread-pip"></div>' : ''}
    </div>
  `).join('');
  sanitizeRenderedText(document.getElementById('notifList'));
}

function renderNews(type='all') {
  const sourceTypeLabel = {
    gov:'Governo',
    consular:'Consular',
    police:'Policia',
    meteo:'Meteorologia',
    transport:'Mobilidade'
  };
  const priorityLabel = {
    critical:'Critico',
    warning:'Atencao',
    info:'Informativo'
  };
  const list = NEWS_POSTS.filter(n => type === 'all' || n.type === type);
  document.getElementById('newsList').innerHTML = list.map(n => `
    <article class="news-card prio-${n.priority}">
      <div class="news-top">
        <div>
          <div class="news-source-row">
            <div class="news-source">${n.source}</div>
            <span class="source-badge ${n.sourceType}">Verificado</span>
          </div>
          <div class="news-country">${plainTextLocation(n.country)}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
          <div class="news-time">${n.time} atras</div>
          <span class="news-priority ${n.priority}">${priorityLabel[n.priority] || 'Informativo'}</span>
        </div>
      </div>
      <h3 class="news-title">${n.title}</h3>
      <p class="news-text">${n.text}</p>
      <div class="news-tags">${n.tags.map(t => `<span class="news-tag">${t}</span>`).join('')}</div>
      <a class="news-link" href="${n.url}" target="_blank" rel="noopener noreferrer">Ler comunicado oficial</a>
    </article>
  `).join('');
  sanitizeRenderedText(document.getElementById('newsList'));
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
  sanitizeRenderedText(document.getElementById('page-messages'));
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
    <button class="msg-new-group" onclick="showToast('ðŸ“ž Ajuda rapida em breve','')">Ajuda</button>
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
  const text = type === 'photo' ? 'ðŸ“· Foto compartilhada' : 'ðŸ“ LocalizaÃ§Ã£o compartilhada';
  chat.messages.push({from:'me', text, time:`${hh}:${mm}`});
  chat.last = text;
  chat.time = 'agora';
  renderChats();
  showToast(type === 'photo' ? 'ðŸ“· Foto enviada' : 'ðŸ“ LocalizaÃ§Ã£o enviada','ts');
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
    avatar:'ðŸ§­',
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
  showToast('ðŸ‘¥ Grupo criado com sucesso','ts');
}

function simulatePresence() {
  CHATS.forEach(c => {
    if (c.type !== 'direct') return;
    if (Math.random() > 0.65) c.online = !c.online;
    c.status = c.online ? 'Online agora' : `Visto hÃ¡ ${Math.floor(Math.random()*9)+1} min`;
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  NAVIGATION
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function showPage(pg) {
  if (!loggedIn) {
    openAuth();
    showToast('Entre na sua conta para acessar o Azimute','tw');
    return;
  }
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('act'));
  document.querySelectorAll('.bn-item').forEach(b=>b.classList.remove('act'));
  document.querySelectorAll('.x-nav-item').forEach(b=>b.classList.remove('act'));
  document.getElementById('page-'+pg).classList.add('act');
  syncVueState({ currentPage: pg });
  const navAlias = {news:'more'};
  const bn = document.getElementById('bn-'+(navAlias[pg] || pg));
  if (bn) bn.classList.add('act');
  const xnav = document.getElementById('xnav-'+(navAlias[pg] || pg));
  if (xnav) xnav.classList.add('act');
  if (pg==='map') {
    renderMapFocus();
    toggleCrisisPanel(crisisMode);
    setTimeout(() => {
      initMap();
      if (mapFocusPlaceId) {
        centerMapOnPlace(mapFocusPlaceId, 11, false);
      }
    }, 120);
  }
  if (pg==='profile') renderFeed('profileFeed', POSTS.filter(p=>p.handle===CURRENT_USER.handle));
  if (pg==='news') renderNews(currentNewsFilter);
  if (pg==='messages') renderChats();
  sanitizeRenderedText(document.body);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  AUTH
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function updateAuthGate() {
  const cancelBtn = document.getElementById('authCancelBtn');
  if (cancelBtn) cancelBtn.style.display = loggedIn ? '' : 'none';
}
function openAuth(){
  updateAuthGate();
  document.getElementById('authOv').classList.add('open');
}
function closeAuth(){
  if (!loggedIn) return;
  document.getElementById('authOv').classList.remove('open');
}
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
  updateAuthGate();
  ensureMoreLogoutCard();
  polishVisibleCopy();
  applyAdaptiveExperience();
  renderDestinationStrip();
  renderJourneyCard();
  renderSeniorHome();
  renderObjectiveModule();
  renderTrustHub();
  renderPriceAlerts();
  renderImpactModule();
  renderDesktopRail();
  showPage('feed');
  showToast('Bem-vindo de volta, Andre!','ts');
}
function doRegister() {
  const name = document.getElementById('regNameInput')?.value.trim() || 'Novo viajante';
  const age = parseInt(document.getElementById('regAgeInput')?.value || '35', 10);
  const selectedMode = document.getElementById('regModeInput')?.value || 'auto';
  CURRENT_USER.name = name;
  CURRENT_USER.handle = `@${slugifyTag(name).toLowerCase() || 'viajante.azimute'}`;
  CURRENT_USER.age = Number.isFinite(age) ? age : 35;
  CURRENT_USER.mode = selectedMode === 'auto' ? inferModeFromAge(CURRENT_USER.age) : selectedMode;
  loggedIn = true; closeAuth();
  document.getElementById('loginBtn').style.display='none';
  document.getElementById('avatarBtn').style.display='';
  updateAuthGate();
  ensureMoreLogoutCard();
  polishVisibleCopy();
  applyAdaptiveExperience();
  renderDestinationStrip();
  renderJourneyCard();
  renderSeniorHome();
  renderObjectiveModule();
  renderTrustHub();
  renderPriceAlerts();
  renderImpactModule();
  renderDesktopRail();
  renderNotifs();
  showPage('feed');
  showToast('Conta criada! Verifique seu e-mail para ativar.','ts');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  POST
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function logout() {
  loggedIn = false;
  updateAuthGate();
  document.getElementById('loginBtn').style.display = '';
  document.getElementById('avatarBtn').style.display = 'none';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('act'));
  document.querySelectorAll('.bn-item').forEach(b=>b.classList.remove('act'));
  document.getElementById('page-feed').classList.add('act');
  document.getElementById('bn-feed')?.classList.add('act');
  openAuth();
  showToast('Sessao encerrada','ts');
}

function openPost() {
  if (!loggedIn) { openAuth(); showToast('Faca login para postar','tw'); return; }
  document.getElementById('postPlaceInput').value = '';
  document.getElementById('postTypeInput').value = 'restaurant';
  document.getElementById('postTextInput').value = '';
  selectedRisk = 'safe';
  selectedStars = 4;
  document.querySelectorAll('.ropt').forEach(o => o.className = 'ropt');
  const safeRisk = document.querySelector('.ropt');
  if (safeRisk) safeRisk.classList.add('sel-safe');
  document.getElementById('foToggle').classList.remove('on');
  previewPostPlace('');
  setStars(selectedStars, true);
  document.getElementById('postModal').classList.add('open');
}
function closePost(){ document.getElementById('postModal').classList.remove('open'); }
function selRisk(el, r) {
  document.querySelectorAll('.ropt').forEach(o=>o.className='ropt');
  el.classList.add('sel-'+r);
  selectedRisk = r;
}
function setStars(n, silent=false) {
  selectedStars = n;
  document.querySelectorAll('.star-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx < n);
  });
  if (!silent) showToast(`Avaliacao: ${n} estrela${n>1?'s':''}!`,'ts');
}
function submitPost() {
  const placeInput = document.getElementById('postPlaceInput');
  const typeInput = document.getElementById('postTypeInput');
  const textInput = document.getElementById('postTextInput');
  const friendsOnly = document.getElementById('foToggle').classList.contains('on');
  const placeName = placeInput.value.trim();
  const text = textInput.value.trim();

  if (!placeName || !text) {
    showToast('Preencha local e relato para publicar','tw');
    return;
  }

  const matchedPlace = inferPlaceFromInput(placeName);
  const mappedType = matchedPlace?.type || typeInput.value || 'restaurant';
  const locationLabel = friendsOnly
    ? 'ðŸ“ Somente para amigos'
    : matchedPlace
      ? `${matchedPlace.name}, ${matchedPlace.city} ${matchedPlace.flag}`
      : placeName;
  const trustScore = Math.min(99, CURRENT_USER.trustScore - (friendsOnly ? 4 : 0) + selectedStars);
  const newPost = {
    id: Date.now(),
    user: CURRENT_USER.name,
    handle: CURRENT_USER.handle,
    avatar: CURRENT_USER.avatar,
    verified: CURRENT_USER.verified,
    loc: locationLabel,
    time: getRelativeNowLabel(),
    risk: selectedRisk,
    placeId: matchedPlace?.id || null,
    text: friendsOnly ? `ðŸ”’ [Visivel so para amigos] ${text}` : text,
    tags: [
      slugifyTag(placeName.split(',')[0]),
      slugifyTag(mappedType),
      slugifyTag(selectedRisk),
    ].filter(Boolean),
    likes: 0,
    comments: 0,
    friendsOnly,
    trustScore,
    confirmations: matchedPlace ? 3 : 1,
  };
  POSTS.unshift(newPost);

  if (matchedPlace) {
    matchedPlace.reviews += 1;
    matchedPlace.score = ((matchedPlace.score * (matchedPlace.reviews - 1)) + selectedStars) / matchedPlace.reviews;
    matchedPlace.risk = selectedRisk;
    matchedPlace.reviews_list.unshift({
      user: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar.replace('/80?', '/40?'),
      stars: selectedStars,
      date: 'agora',
      text,
      risk: selectedRisk,
      verified: true,
    });
    mapFocusPlaceId = matchedPlace.id;
    renderExplore();
    renderMapFocus();
  }

  renderFeed();
  renderFeed('profileFeed', POSTS.filter(p => p.handle === CURRENT_USER.handle));
  renderTrustHub();
  closePost();
  showToast(matchedPlace ? `Relato publicado e vinculado a ${matchedPlace.name}` : 'Relato publicado no feed em tempo real','ts');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  PROFILE TOGGLES
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function togglePriv(){
  const t=document.getElementById('privToggle');
  t.classList.toggle('on');
  showToast(t.classList.contains('on')?'ðŸŒ Perfil pÃºblico ativado':'ðŸ”’ Perfil privado ativado','');
}
function toggleLocProf(){
  const t=document.getElementById('locProfToggle');
  t.classList.toggle('on');
  showToast(t.classList.contains('on')?'ðŸ“ LocalizaÃ§Ã£o visÃ­vel para amigos':'ðŸ”’ LocalizaÃ§Ã£o ocultada','');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  TOAST
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let toastTimer;
function showToast(msg, type='') {
  clearTimeout(toastTimer);
  const t = document.getElementById('toast');
  t.textContent = repairMojibakeText(msg);
  t.className = `toast ${type} show`;
  toastTimer = setTimeout(()=>{ t.className='toast'; }, 3200);
}

// CSS inject for card animation
const style = document.createElement('style');
style.textContent = '@keyframes cardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(style);

