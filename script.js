// ════════════════════════════════
//  DATA
// ════════════════════════════════
const PLACES = [
  {
    id:'p1', type:'restaurant', name:'Pad Thai Nana', city:'Bangkok', country:'Tailândia', flag:'🇹🇭',
    state:null, emoji:'🍜', photo:null, lat:13.740, lng:100.555, risk:'caution',
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
    state:null, emoji:'🛏', photo:null, lat:13.744, lng:100.534, risk:'safe',
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
    state:null, emoji:'🛕', photo:null, lat:13.7474, lng:100.4929, risk:'safe',
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
    state:null, emoji:'🥩', photo:null, lat:-34.6345, lng:-58.3630, risk:'suspicious',
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
    state:null, emoji:'🛏', photo:null, lat:6.2086, lng:-75.5659, risk:'safe',
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
    state:null, emoji:'🏛️', photo:null, lat:31.6295, lng:-7.9811, risk:'suspicious',
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
    state:null, emoji:'🍜', photo:null, lat:35.6595, lng:139.7004, risk:'safe',
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
    state:null, emoji:'🏰', photo:null, lat:45.7073, lng:13.7068, risk:'safe',
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
  {
    id:'p9', type:'hostel', name:'Lisbon Chill Hub', city:'Lisboa', country:'Portugal', flag:'🇵🇹',
    state:null, emoji:'🛏', photo:null, lat:38.7223, lng:-9.1393, risk:'safe',
    address:'Rua da Alegria 45, Lisboa', score:4.5, reviews:210,
    tags:['Hostel','Centro','Seguro'],
    scores:{localizacao:4.9, seguranca:4.7, limpeza:4.5, preco_justo:4.1},
    tips:['Chegue cedo para conseguir cama de baixo no dorm.','Use o elétrico 28 apenas fora do pico para evitar furtos.'],
    photos:['🛏','☕','🏙️'],
    reviews_list:[
      {user:'Marina G.', avatar:'https://i.pravatar.cc/40?img=5', stars:5, date:'4 dias', text:'Equipe ótima, lockers grandes e localização excelente perto do Rossio.', risk:'safe', verified:true},
    ]
  },
  {
    id:'p10', type:'restaurant', name:'Mama Jollof', city:'Lagos', country:'Nigéria', flag:'🇳🇬',
    state:null, emoji:'🍛', photo:null, lat:6.4654, lng:3.4064, risk:'caution',
    address:'Ikeja, Lagos', score:3.4, reviews:58,
    tags:['Comida Nigeriana','Popular','Movimentado'],
    scores:{precos:3.5, qualidade:3.8, atendimento:3.0, seguranca:2.6},
    tips:['Prefira pagar em cartão ou transfer, evite notas grandes.','Peça preço antes de sentar. Região movimentada à noite.'],
    photos:['🍛','🌶️','🥤'],
    reviews_list:[
      {user:'Chinedu O.', avatar:'https://i.pravatar.cc/40?img=62', stars:3, date:'1 sem', text:'Comida boa, atendimento lento. Guardem celular à vista.', risk:'caution', verified:false},
    ]
  },
  {
    id:'p11', type:'tourspot', name:'Cristo Redentor', city:'Rio de Janeiro', country:'Brasil', flag:'🇧🇷',
    state:'RJ', emoji:'⛰️', photo:null, lat:-22.9519, lng:-43.2105, risk:'safe',
    address:'Parque Nacional da Tijuca, Rio de Janeiro', score:4.8, reviews:2200,
    tags:['Iconico','Vista','Familiar'],
    scores:{beleza:5.0, seguranca:4.2, acessibilidade:3.8, custo_beneficio:4.5},
    tips:['Compre ingresso online para evitar filas no trem do Corcovado.','Evite chegar de carro particular, prefira vans oficiais.'],
    photos:['⛰️','☀️','📸'],
    reviews_list:[
      {user:'Luana S.', avatar:'https://i.pravatar.cc/40?img=30', stars:5, date:'3 dias', text:'Vista absurda e segurança ok dentro do parque. Só cuidado no acesso do Cosme Velho.', risk:'safe', verified:true},
    ]
  },
  {
    id:'p12', type:'restaurant', name:'Trattoria Turistica Centro', city:'Roma', country:'Itália', flag:'🇮🇹',
    state:null, emoji:'🍝', photo:null, lat:41.9028, lng:12.4964, risk:'caution',
    address:'Via Nazionale 120, Roma', score:3.0, reviews:95,
    tags:['Turístico','Preço alto','Massas'],
    scores:{precos:2.1, qualidade:3.4, atendimento:3.0, seguranca:3.5},
    tips:['Peça menu com preços visíveis. Evite taxa de “coperto” abusiva.','Fique atento a garçons oferecendo vinho “casa” sem preço.'],
    photos:['🍝','🍷','💳'],
    reviews_list:[
      {user:'Simone P.', avatar:'https://i.pravatar.cc/40?img=9', stars:2, date:'2 sem', text:'Conta veio com itens que não pedi. Só resolveu depois de insistir.', risk:'caution', verified:true},
    ]
  },
  {
    id:'p13', type:'hostel', name:'Berlin Makers Hostel', city:'Berlim', country:'Alemanha', flag:'🇩🇪',
    state:null, emoji:'🛏', photo:null, lat:52.5200, lng:13.4050, risk:'safe',
    address:'Kreuzberg, Berlin', score:4.4, reviews:310,
    tags:['Hostel','Cowork','Seguro'],
    scores:{localizacao:4.7, seguranca:4.6, limpeza:4.3, preco_justo:4.0},
    tips:['Lockers eletrônicos, leve adaptador europeu.','Mercados 24h por perto, região movimentada mas segura.'],
    photos:['🛏','💻','🍺'],
    reviews_list:[
      {user:'Jonas K.', avatar:'https://i.pravatar.cc/40?img=15', stars:4, date:'1 mes', text:'Bom para trabalhar e fazer amigos. Segurança ok.', risk:'safe', verified:false},
    ]
  },
  {
    id:'p14', type:'tourspot', name:'Central Park', city:'Nova York', country:'EUA', flag:'🇺🇸',
    state:'NY', emoji:'🌳', photo:null, lat:40.7829, lng:-73.9654, risk:'safe',
    address:'Central Park, New York', score:4.7, reviews:3400,
    tags:['Parque','Caminhada','Fotografia'],
    scores:{beleza:4.8, seguranca:4.3, acessibilidade:4.4, custo_beneficio:4.6},
    tips:['Evite áreas menos movimentadas à noite.','Bike-sharing é barato, mas prenda a bike com trava boa.'],
    photos:['🌳','🚴','🗽'],
    reviews_list:[
      {user:'Amy L.', avatar:'https://i.pravatar.cc/40?img=19', stars:5, date:'5 dias', text:'Lindo no pôr do sol. Me senti segura nas trilhas principais.', risk:'safe', verified:true},
    ]
  },
  {
    id:'p15', type:'restaurant', name:'Taqueria Doña Luz', city:'Cidade do México', country:'México', flag:'🇲🇽',
    state:'CDMX', emoji:'🌮', photo:null, lat:19.4326, lng:-99.1332, risk:'safe',
    address:'Roma Norte, CDMX', score:4.6, reviews:180,
    tags:['Tacos','Local','Barato'],
    scores:{precos:4.8, qualidade:4.7, atendimento:4.2, seguranca:4.0},
    tips:['Pago só em dinheiro. Não aceite “taco especial” sem preço.','Pimenta forte, peça salsas separadas.'],
    photos:['🌮','🌶️','🥤'],
    reviews_list:[
      {user:'Bruno H.', avatar:'https://i.pravatar.cc/40?img=70', stars:5, date:'1 semana', text:'Taco al pastor perfeito e barato. Rua movimentada e segura.', risk:'safe', verified:false},
    ]
  },
  {
    id:'p16', type:'tourspot', name:'Table Mountain', city:'Cape Town', country:'África do Sul', flag:'🇿🇦',
    state:null, emoji:'⛰️', photo:null, lat:-33.9628, lng:18.4098, risk:'caution',
    address:'Table Mountain National Park, Cape Town', score:4.7, reviews:950,
    tags:['Trilha','Vista','Natureza'],
    scores:{beleza:5.0, seguranca:3.5, acessibilidade:3.6, custo_beneficio:4.4},
    tips:['Suba de manhã cedo, leve casaco.','Evite trilhas isoladas sozinho; use grupos ou teleférico.'],
    photos:['⛰️','🚠','🌤️'],
    reviews_list:[
      {user:'Zanele M.', avatar:'https://i.pravatar.cc/40?img=71', stars:4, date:'9 dias', text:'Vista incrível, mas vi relatos de furtos em trilhas vazias. Vá acompanhado.', risk:'caution', verified:true},
    ]
  },
  {
    id:'p17', type:'hostel', name:'Nairobi Transit Hub', city:'Nairobi', country:'Quênia', flag:'🇰🇪',
    state:null, emoji:'🛏', photo:null, lat:-1.2921, lng:36.8219, risk:'suspicious',
    address:'Westlands, Nairobi', score:3.6, reviews:140,
    tags:['Hostel','Próximo ao aeroporto','Básico'],
    scores:{localizacao:4.0, seguranca:3.1, limpeza:3.5, preco_justo:3.8},
    tips:['Use somente taxistas indicados pelo hostel.','Guarde passaporte no cofre da recepção.'],
    photos:['🛏','✈️','☕'],
    reviews_list:[
      {user:'Aisha K.', avatar:'https://i.pravatar.cc/40?img=77', stars:3, date:'2 semanas', text:'Bom para uma noite. Regiao movimentada, fique atento a pickpockets.', risk:'suspicious', verified:false},
    ]
  },
  {
    id:'p18', type:'restaurant', name:'Bistro Marais', city:'Paris', country:'França', flag:'🇫🇷',
    state:null, emoji:'🥖', photo:null, lat:48.8566, lng:2.3522, risk:'safe',
    address:'Rue Vieille du Temple, Paris', score:4.2, reviews:260,
    tags:['Bistrô','Vinho','Clássico'],
    scores:{precos:3.5, qualidade:4.5, atendimento:4.0, seguranca:4.4},
    tips:['Evite mesas externas com bolsa à mostra.','Gorjeta não é obrigatória, mas 5-10% é bem-vindo.'],
    photos:['🥖','🍷','🧀'],
    reviews_list:[
      {user:'Claire D.', avatar:'https://i.pravatar.cc/40?img=11', stars:4, date:'3 dias', text:'Comida ótima, preço ok para Paris. Rua segura e movimentada.', risk:'safe', verified:true},
    ]
  },
];

const FRIENDS = [
  {name:'Carlos M.', handle:'@carlos.world', avatar:'https://i.pravatar.cc/80?img=12', loc:'Khaosan Rd, Bangkok', dist:'1.2 km', online:true},
  {name:'Ana Lima', handle:'@ana.trips', avatar:'https://i.pravatar.cc/80?img=25', loc:'Chatuchak Market, Bangkok', dist:'8.4 km', online:true},
  {name:'Pedro A.', handle:'@pedroviaja', avatar:'https://i.pravatar.cc/80?img=33', loc:'Tokyo, Japao', dist:'4700 km', online:false},
];

const SENIOR_GROUPS = [
  {name:'Portugal 60+ Primavera', pace:'Ritmo leve', members:18, safety:'Hospedagens centrais e acessíveis', action:'Entrar no grupo'},
  {name:'Buenos Aires Cultural 65+', pace:'Passeios curtos', members:11, safety:'Pequenos grupos com apoio mútuo', action:'Ver roteiro'},
  {name:'Serra Gaúcha com Companhia', pace:'Ônibus e caminhadas curtas', members:24, safety:'Check-in diário e roteiro tranquilo', action:'Pedir convite'},
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
  {type:'info', text:'<strong>Carlos Menezes</strong> começou a te seguir.', time:'12min', unread:true, page:'profile'},
  {type:'caution', text:'Área de <strong>atenção detectada</strong> próxima à Khaosan Road. Você está a 1.2km.', time:'45min', unread:true, placeId:'p1', city:'Bangkok'},
  {type:'safe', text:'Seu relato sobre Medellín recebeu <strong>178 curtidas</strong> 🔥', time:'2h', unread:false, placeId:'p5', city:'Medellín'},
  {type:'friend', text:'<strong>Ana Lima</strong> está a 8km de você em Bangkok. Toque para ver no mapa.', time:'3h', unread:false, city:'Bangkok'},
  {type:'danger', text:'<strong>Novo alerta</strong> de cobrança abusiva no distrito de Nana, Bangkok.', time:'6h', unread:false, placeId:'p1', city:'Bangkok'},
  {type:'info', text:'<strong>Pedro Alves</strong> e <strong>+5 pessoas</strong> curtiram seu relato sobre Selina Medellín.', time:'1d', unread:false, placeId:'p5', city:'Medellín'},
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
  },
  {
    id:'c4',
    type:'group',
    name:'Mulheres Solo América do Sul',
    avatar:'👭',
    online:false,
    typing:false,
    status:'27 membros',
    time:'12min',
    unread:6,
    last:'Bruna: taxi seguro em Medellin?',
    messages:[
      {from:'them', text:'Marina: hostel seguro em Lima - Pariwana.', time:'11:55'},
      {from:'them', text:'Bruna: taxi seguro em Medellin?', time:'11:58'},
      {from:'me', text:'Use inDriver/Uber, evitar street taxi de noite.', time:'12:00'}
    ]
  },
  {
    id:'c5',
    type:'group',
    name:'Europa Rail Friends',
    avatar:'🚆',
    online:false,
    typing:false,
    status:'18 membros',
    time:'35min',
    unread:2,
    last:'Leo: greve parcial em Paris amanhã.',
    messages:[
      {from:'them', text:'Leo: greve parcial em Paris amanhã.', time:'35min'},
      {from:'them', text:'Sara: reservar Flixbus backup?', time:'33min'}
    ]
  },
  {
    id:'c6',
    type:'direct',
    name:'Guia Cairo (Hassan)',
    avatar:'https://i.pravatar.cc/80?img=41',
    online:true,
    typing:false,
    status:'Online agora',
    time:'agora',
    unread:1,
    last:'Consigo te pegar no aeroporto.',
    messages:[
      {from:'them', text:'Consigo te pegar no aeroporto. Envie horario.', time:'agora'}
    ]
  },
  {
    id:'c7',
    type:'group',
    name:'Trilha Table Mountain',
    avatar:'⛰️',
    online:false,
    typing:false,
    status:'9 membros',
    time:'1h',
    unread:3,
    last:'Sibusiso: subir 7h ok?',
    messages:[
      {from:'them', text:'Sibusiso: subir 7h ok?', time:'1h'},
      {from:'them', text:'Lara: levar jaqueta corta-vento', time:'58min'},
      {from:'me', text:'Estarei lá 6:50. Vamos juntos.', time:'55min'}
    ]
  },
  {
    id:'c8',
    type:'direct',
    name:'Host Lisboa',
    avatar:'https://i.pravatar.cc/80?img=52',
    online:false,
    typing:false,
    status:'Visto há 2h',
    time:'2h',
    unread:0,
    last:'Check-in confirmado para amanhã',
    messages:[
      {from:'them', text:'Check-in confirmado para amanhã 14h.', time:'2h'},
      {from:'me', text:'Obrigado! Alguma dica de restaurante local?', time:'2h'}
    ]
  }
];

const COMMUNITY_PULSE = [
  {num:'128', lab:'Relatos hoje'},
  {num:'43', lab:'Alertas úteis'},
  {num:'17', lab:'Amigos próximos'},
];

const IMPACT_PILLARS = [
  {icon:'🤝', title:'Combate ao isolamento', text:'Grupos e conversas ajudam viajantes a encontrar companhia segura e rede de apoio real durante a viagem.'},
  {icon:'🛡️', title:'Seguranca compartilhada', text:'Relatos confiaveis da comunidade reduzem golpes, desinformacao e decisao no escuro em destinos desconhecidos.'},
  {icon:'🌍', title:'Valor social local', text:'O app estimula troca com moradores, economia local e deslocamentos mais conscientes com base em experiencia real.'},
];

const IMPACT_STATS = {
  safeMeetups: 320,
  avoidedRisks: 78,
  activeGroups: 54,
  supportNetworkJoined: false,
};

const IMPACT_REQUESTS = [
  {id:'ir1', icon:'🧭', title:'Companhia para explorar o centro', text:'Julia quer companhia verificada para caminhar no centro de Medellín no fim da tarde.', city:'Medellín', responses:3},
  {id:'ir2', icon:'🆘', title:'Ajuda com tradução e deslocamento', text:'Hassan precisa de apoio rápido para chegar a um hostel seguro no Cairo.', city:'Cairo', responses:5},
  {id:'ir3', icon:'☕', title:'Encontro com viajantes e moradores', text:'Grupo local abriu roda de conversa com viajantes em San Salvador.', city:'San Salvador', responses:8},
];

const TREND_ROUTES = [
  {route:'Bangkok → Chiang Mai', meta:'Alta troca de dicas para transporte noturno', risk:'⚠️ Atenção em táxis sem taxímetro'},
  {route:'Medellín → Guatapé', meta:'Subiu 62% em relatos positivos esta semana', risk:'✅ Rota considerada segura de dia'},
  {route:'Marrakech → Essaouira', meta:'Comunidade sugere tour fechado em grupo', risk:'🟠 Evite guias na rua'},
];

// Países (lista simplificada ISO/UN)
const COUNTRY_LIST = [
  'Afeganistão','África do Sul','Albânia','Alemanha','Andorra','Angola','Antígua e Barbuda','Arábia Saudita','Argélia','Argentina','Armênia','Austrália','Áustria','Azerbaijão',
  'Bahamas','Bahrein','Bangladesh','Barbados','Bélgica','Belize','Benim','Bielorrússia','Bolívia','Bósnia e Herzegovina','Botsuana','Brasil','Brunei','Bulgária','Burkina Faso','Burundi',
  'Butão','Cabo Verde','Camarões','Camboja','Canadá','Catar','Cazaquistão','Chade','Chile','China','Chipre','Colômbia','Comores','Congo','Coreia do Norte','Coreia do Sul','Costa do Marfim','Costa Rica','Croácia','Cuba',
  'Dinamarca','Djibuti','Dominica','Egito','El Salvador','Emirados Árabes Unidos','Equador','Eritreia','Eslováquia','Eslovênia','Espanha','Estados Unidos','Estônia','Eswatini','Etiópia',
  'Fiji','Filipinas','Finlândia','França','Gabão','Gâmbia','Gana','Geórgia','Granada','Grécia','Guatemala','Guiana','Guiné','Guiné-Bissau','Guiné Equatorial',
  'Haiti','Honduras','Hungria','Iêmen','Ilhas Marshall','Ilhas Maurício','Ilhas Salomão','Índia','Indonésia','Irã','Iraque','Irlanda','Islândia','Israel','Itália',
  'Jamaica','Japão','Jordânia','Kiribati','Kosovo','Kuwait','Laos','Lesoto','Letônia','Líbano','Libéria','Líbia','Liechtenstein','Lituânia','Luxemburgo',
  'Macedônia do Norte','Madagáscar','Malásia','Malawi','Maldivas','Mali','Malta','Marrocos','Mauritânia','México','Mianmar','Micronésia','Moçambique','Moldávia','Mônaco','Mongólia','Montenegro',
  'Namíbia','Nauru','Nepal','Nicarágua','Níger','Nigéria','Noruega','Nova Zelândia','Omã','Países Baixos','Palau','Panamá','Papua-Nova Guiné','Paquistão','Paraguai','Peru','Polônia','Portugal',
  'Quênia','Quirguistão','Reino Unido','República Centro-Africana','República Dominicana','República Tcheca','Romênia','Ruanda','Rússia',
  'Samoa','San Marino','Santa Lúcia','São Cristóvão e Nevis','São Tomé e Príncipe','São Vicente e Granadinas','Seicheles','Senegal','Serra Leoa','Sérvia','Singapura','Síria','Somália','Sri Lanka','Sudão','Sudão do Sul','Suécia','Suíça','Suriname',
  'Tailândia','Taiwan','Tanzânia','Togo','Tonga','Trinidad e Tobago','Tunísia','Turcomenistão','Turquia','Tuvalu',
  'Ucrânia','Uganda','Uruguai','Uzbequistão',
  'Vanuatu','Vaticano','Venezuela','Vietnã','Zâmbia','Zimbábue'
].sort((a,b)=>a.localeCompare(b,'pt',{sensitivity:'base'}));

const STATE_MAP = {
  'brasil': ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'],
  'estados unidos': ['CA','NY','FL','TX','WA','MA','IL','NV','CO'],
  'méxico': ['CDMX','JAL','NLE','BCN'],
  'canadá': ['ON','BC','QC'],
};

const PRICE_ALERTS = [
  {id:'pa1', route:'São Paulo → Lisboa', price:'R$ 3.450', drop:'-18%', crowd:'Lotação baixa', crowdLevel:'low', window:'mai/26', source:'Voos', note:'Queda monitorada 48h'},
  {id:'pa2', route:'Rio → Buenos Aires', price:'R$ 1.180', drop:'-12%', crowd:'Lotação alta', crowdLevel:'high', window:'Páscoa', source:'Voos', note:'Feriado empurrando demanda'},
  {id:'pa3', route:'Porto → Algarve · hotel', price:'€ 88/noite', drop:'-22%', crowd:'Lotação moderada', crowdLevel:'mid', window:'jun/26', source:'Hotéis', note:'Fora de pico de verão'},
  {id:'pa4', route:'Medellín · cowork', price:'US$ 21/dia', drop:'-9%', crowd:'Lotação baixa', crowdLevel:'low', window:'abr/26', source:'Cowork', note:'Inclui cadeira dedicada'},
];

const TRAVEL_DASH = {
  stats: [
    {num:'41', lab:'Países'},
    {num:'167', lab:'Cidades'},
    {num:'420', lab:'Dias na estrada'},
  ],
  countries: [
    {name:'Venezuela', visits:8, flag:'🇻🇪'},
    {name:'El Salvador', visits:7, flag:'🇸🇻'},
    {name:'Egito', visits:6, flag:'🇪🇬'},
    {name:'Colômbia', visits:6, flag:'🇨🇴'},
    {name:'Japão', visits:5, flag:'🇯🇵'},
    {name:'China', visits:4, flag:'🇨🇳'},
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

const WAR_ZONES = [
  {lat:48.6,lng:37.8,risk:'danger',radius:380000,label:'Leste da Ucrânia',note:'Frente ativa ampla na região do Donbas e arredores',source:'CFR / ICRC'},
  {lat:31.45,lng:34.45,risk:'danger',radius:150000,label:'Gaza e entorno imediato',note:'Conflito ativo e risco extremo de deslocamento',source:'ICRC / CFR'},
  {lat:15.5,lng:32.5,risk:'danger',radius:320000,label:'Sudão central (Khartoum)',note:'Guerra em curso com impacto urbano severo',source:'ACLED / CFR'},
  {lat:13.9,lng:25.4,risk:'danger',radius:300000,label:'Darfur',note:'Combates e crise humanitária persistente',source:'ACLED / ICRC'},
  {lat:23.8,lng:95.9,risk:'danger',radius:420000,label:'Myanmar central e norte',note:'Múltiplas frentes armadas e deslocamento interno',source:'CFR / ACLED'},
  {lat:-1.7,lng:29.2,risk:'danger',radius:260000,label:'Leste da RDC',note:'Confrontos recorrentes na região de Goma e Kivu',source:'ICRC / CFR'},
  {lat:15.6,lng:47.8,risk:'danger',radius:420000,label:'Iêmen',note:'Conflito prolongado e ambiente de segurança altamente volátil',source:'CFR / ICRC'}
];

// ════════════════════════════════
//  STATE
// ════════════════════════════════
let loggedIn = false;
let mapInit = false;
let map, allMarkers = [], clusterMarkers = [], allLayers = [];
let currentFilter = 'all';
let clusterMode = true;
let heatVisible = true;
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
  name:'André Nômade Raiz',
  handle:'@nomaderaizofc',
  avatar:'https://pt.quizur.com/_image?href=https://dev-beta.quizur.com/storage/v1/object/public//imagens//21272631/8603928c-a346-4ae6-9f59-1b5cb297694e.png&w=1024&h=1024&f=webp',
  verified:true,
  trustScore:98,
  trustLabel:'Nomade raiz confiavel',
  loc:'🌎 no mundo',
  age:41,
  mode:'explorador',
};

const EXPERIENCE_MODES = {
  explorador: {
    label:'Explorador',
    journeyTitle:'Ritmo dinâmico, social e urbano',
    contextCopy:'O Azimute vai priorizar mobilidade, grupos rápidos e alertas urbanos para esse destino.',
    groupsTitle:'Grupos e companhia',
    groupsSub:'Conecte-se com pessoas do mesmo ritmo e interesse para viajar junto.',
    profileBio:'Viajante independente | Gosta de descobrir lugares novos, socializar e circular com autonomia',
    verifyTitle:'Perfil explorador verificado ✓',
    verifySub:'Identidade validada e preferências de mobilidade social confirmadas para grupos, alertas e relatos.',
    dashTitle:'Painel de Viagens Explorador',
    dashSub:'Resumo de destinos, encontros sociais e experiências dinâmicas dos últimos 24 meses',
    badges:[
      {text:'🌆 Social ativo', color:'var(--accent)'},
      {text:'🛡 Relatos confiáveis', color:'var(--safe)'},
      {text:'⚡ Ritmo urbano', color:'var(--caution)'},
    ],
    groups:[
      {name:'Cidade sem roteiro fixo', pace:'Mais livre', members:26, safety:'Encontros em pontos centrais e movimentados', action:'Entrar no grupo'},
      {name:'Hostels e cafés culturais', pace:'Social', members:19, safety:'Pontos públicos e verificados', action:'Ver roteiro'},
      {name:'Exploradores de fim de tarde', pace:'Passeios curtos', members:14, safety:'Check-in de retorno combinado', action:'Pedir convite'},
    ],
  },
  equilibrado: {
    label:'Equilibrado',
    journeyTitle:'Segurança, planejamento e flexibilidade',
    contextCopy:'O Azimute vai priorizar equilíbrio entre segurança, conforto e vida social nesse destino.',
    groupsTitle:'Grupos e companhia',
    groupsSub:'Encontre grupos de viagem e companhia com interesses e ritmo compatíveis.',
    profileBio:'Viajante que equilibra segurança, planejamento e liberdade | Prefere boas recomendações e grupo confiável',
    verifyTitle:'Perfil equilibrado verificado ✓',
    verifySub:'Identidade validada e preferências de viagem confirmadas para grupos, alertas e relatos.',
    dashTitle:'Painel de Viagens',
    dashSub:'Resumo de destinos, grupos e experiências relevantes dos últimos 24 meses',
    badges:[
      {text:'🤝 Companhia ativa', color:'var(--accent)'},
      {text:'🛡 Relatos confiáveis', color:'var(--safe)'},
      {text:'🧭 Boa organização', color:'var(--caution)'},
    ],
    groups:[
      {name:'Portugal com ritmo leve', pace:'Equilibrado', members:18, safety:'Hospedagens centrais e roteiros claros', action:'Entrar no grupo'},
      {name:'Buenos Aires cultural', pace:'Passeios médios', members:13, safety:'Planejamento com pontos seguros', action:'Ver roteiro'},
      {name:'Serra Gaúcha com companhia', pace:'Confortável', members:17, safety:'Check-in diário e apoio mútuo', action:'Pedir convite'},
    ],
  },
  conforto: {
    label:'Conforto e apoio',
    journeyTitle:'Mais clareza, conforto e suporte social',
    contextCopy:'O Azimute vai priorizar segurança, acessibilidade e grupos de companhia para esse destino.',
    groupsTitle:'Grupos e companhia',
    groupsSub:'Encontre grupos de viagem e pessoas com perfil parecido com o seu.',
    profileBio:'Viajante que valoriza conforto, clareza e companhia segura | Prefere roteiros tranquilos e boa acessibilidade',
    verifyTitle:'Perfil conforto e apoio verificado ✓',
    verifySub:'Identidade validada e preferências de viagem confirmadas para grupos, alertas e relatos.',
    dashTitle:'Painel de Viagens Conforto',
    dashSub:'Resumo de destinos, grupos e experiências mais confortáveis dos últimos 24 meses',
    badges:[
      {text:'🤝 Companhia ativa', color:'var(--accent)'},
      {text:'🛡 Relatos confiáveis', color:'var(--safe)'},
      {text:'🧭 Roteiros tranquilos', color:'var(--caution)'},
    ],
    groups:[
      {name:'Portugal conforto e apoio', pace:'Ritmo leve', members:18, safety:'Hospedagens centrais e acessíveis', action:'Entrar no grupo'},
      {name:'Buenos Aires 60+ cultural', pace:'Passeios curtos', members:11, safety:'Pequenos grupos com apoio mútuo', action:'Ver roteiro'},
      {name:'Serra Gaúcha com companhia', pace:'Ônibus e caminhadas curtas', members:24, safety:'Check-in diário e roteiro tranquilo', action:'Pedir convite'},
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

const DESTINATIONS = ['Bangkok', 'Buenos Aires', 'Medellín', 'Marrakech', 'Tóquio', 'Trieste'];
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
    return place.risk === 'safe' ? 'Bom para quem quer explorar com autonomia e mobilidade.' : 'Vale ir com atenção ao entorno e horários.';
  }
  if (CURRENT_USER.mode === 'conforto') {
    const acess = place.scores.acessibilidade ?? 3;
    const segur = place.scores.seguranca ?? 3;
    return (acess >= 4 && segur >= 4)
      ? 'Boa opção para viagens mais confortáveis, com acessibilidade e ambiente seguro.'
      : 'Confira acessibilidade, deslocamento e horário antes de incluir no roteiro.';
  }
  return place.risk === 'safe'
    ? 'Boa combinação entre segurança, conforto e experiência.'
    : 'Melhor visitar com planejamento e atenção ao contexto local.';
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
    profileHandle.textContent = `${CURRENT_USER.handle} · ${CURRENT_USER.age} anos · ${mode.label}`;
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
    profileHandle.textContent = `${CURRENT_USER.handle} · ${CURRENT_USER.age} anos · ${CURRENT_USER.loc}`;
  }
};

function centerMapOnPlace(placeId, zoom = 12, openPopup = true) {
  if (!map) return;
  clusterMode = false;
  const toggle = document.getElementById('clusterToggle');
  if (toggle) toggle.checked = false;
  applyMapVisibility();
  const marker = allMarkers.find(item => item.placeId === placeId);
  const place = PLACES.find(item => item.id === placeId);
  if (!marker || !place) return;
  marker.addTo(map);
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
    hint.textContent = `Local reconhecido: ${matchedPlace.name}, ${matchedPlace.city}. Seu relato também reforçará esse ponto no mapa.`;
    return;
  }
  hint.textContent = 'Novo local: seu relato será publicado no feed, mas sem vínculo com um ponto já existente.';
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

function renderTransparency() {
  const wrap = document.getElementById('transparencyCard');
  if (!wrap) return;
  const metrics = [
    {label:'Tempo médio de resposta', value:'7 min', sub:'Alertas críticos comunidade + moderação'},
    {label:'Taxa de falsos positivos', value:'3%', sub:'Base últimos 30 dias'},
    {label:'Alertas verificados', value:'82%', sub:'Com identidade confirmada'},
    {label:'Incidentes evitados', value:`${IMPACT_STATS.avoidedRisks}%`, sub:'Relatos que evitaram risco'},
  ];
  wrap.innerHTML = `
    <div class="trust-head">
      <div>
        <div class="trust-title">Transparência e segurança</div>
        <div class="trust-sub">Métricas públicas reforçam confiança na rede.</div>
      </div>
      <span class="crowd-pill lvl-low">Aberto</span>
    </div>
    <div class="transparency-metrics">
      ${metrics.map(m => `
        <div class="trans-item">
          <strong>${m.value}</strong>
          <span>${m.label}</span>
          <span style="color:var(--muted2);display:block;margin-top:3px">${m.sub}</span>
        </div>
      `).join('')}
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
    .replace(/·/g, '·')
    .replace(/Atenção/g, 'Atencao')
    .replace(/Segurança/g, 'Seguranca')
    .replace(/Experiência/g, 'Experiencia')
    .replace(/Atualizações/g, 'Atualizacoes')
    .replace(/Notícias/g, 'Noticias')
    .replace(/Países/g, 'Paises')
    .replace(/Confiança/g, 'Confianca')
    .replace(/Nível/g, 'Nivel')
    .replace(/Avaliação/g, 'Avaliacao')
    .replace(/Localização/g, 'Localizacao')
    .replace(/Público/g, 'Publico')
    .replace(/usuários/g, 'usuarios')
    .replace(/você/g, 'voce')
    .replace(/está/g, 'esta')
    .replace(/SÉRIO/g, 'SERIO')
    .replace(/também/g, 'tambem')
    .replace(/preços/g, 'precos')
    .replace(/as 19h/g, 'as 19h')
    .replace(/✓/g, '')
    .replace(/⭐/g, '★')
    .replace(/☆/g, '☆')
    .replace(/●/g, '●')
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
  renderTransparency();
  renderMapFocus();
  renderFeedFilters();
  renderFeed();
  applyAdaptiveExperience();
  renderNotifs();
  if (document.getElementById('page-map').classList.contains('act')) {
    centerMapOnPlace(mapFocusPlaceId, 11, false);
  }
  showToast(`📍 Destino atualizado para ${city}`,'ts');
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
  showToast('✅ Alerta atualizado','ts');
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
  showToast(currentTheme === 'light' ? '☀️ Modo claro ativado' : '🌙 Modo escuro ativado','');
}

// ════════════════════════════════
//  ACESSIBILIDADE / INCLUSAO
// ════════════════════════════════
const accessibilityPrefs = {
  largeText: false,
  highContrast: false,
  seniorMode: false,
  translateEn: false,
};

function toggleLargeText() {
  accessibilityPrefs.largeText = !accessibilityPrefs.largeText;
  document.body.classList.toggle('large-text', accessibilityPrefs.largeText);
  showToast(accessibilityPrefs.largeText ? '🧓 Texto grande ativado' : '🧓 Texto normal','ts');
}

function toggleHighContrast() {
  accessibilityPrefs.highContrast = !accessibilityPrefs.highContrast;
  document.body.classList.toggle('high-contrast', accessibilityPrefs.highContrast);
  showToast(accessibilityPrefs.highContrast ? '⚡ Alto contraste ativo' : '⚡ Contraste padrão','ts');
}

function toggleSeniorMode() {
  accessibilityPrefs.seniorMode = !accessibilityPrefs.seniorMode;
  document.body.classList.toggle('senior-mode', accessibilityPrefs.seniorMode);
  // forca modo conforto
  CURRENT_USER.mode = accessibilityPrefs.seniorMode ? 'conforto' : (CURRENT_USER.mode || 'equilibrado');
  applyAdaptiveExperience();
  showToast(accessibilityPrefs.seniorMode ? '🧭 Modo idoso simplificado' : 'Modo padrão restabelecido','ts');
}

function toggleTranslate() {
  accessibilityPrefs.translateEn = !accessibilityPrefs.translateEn;
  document.body.classList.toggle('lang-en', accessibilityPrefs.translateEn);
  showToast(accessibilityPrefs.translateEn ? '🌐 Tradução simultânea simulada (PT → EN)' : '🌐 Tradução desativada','ts');
}

// Sidebar toggle (mobile)
function toggleSidebar(force=null) {
  const open = force === null ? !document.body.classList.contains('sidebar-open') : force;
  document.body.classList.toggle('sidebar-open', open);
  document.getElementById('sideOverlay')?.classList.toggle('vis', open);
}

function openAccessModal() {
  document.getElementById('accessModal')?.classList.add('open');
}
function closeAccessModal() {
  document.getElementById('accessModal')?.classList.remove('open');
}
const accessModalEl = document.getElementById('accessModal');
if (accessModalEl) {
  accessModalEl.addEventListener('click', e => { if (e.target === accessModalEl) closeAccessModal(); });
}

// ════════════════════════════════
//  BOOT
// ════════════════════════════════
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
      renderTransparency();
      renderTravelDashboard();
      renderFeedFilters();
      renderFeed();
      renderFriends();
      populateExploreFilters();
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

function quickAddStory() {
  const name = prompt('Usuário do story (@exemplo):', '@voce');
  if (!name) return;
  const status = prompt('Quando foi publicado?', 'agora') || 'agora';
  const img = `https://i.pravatar.cc/80?u=${encodeURIComponent(name)}`;
  STORIES.unshift({img, name, ring:'cr', status});
  if (STORIES.length > 20) STORIES.length = 20;
  renderStories();
  showToast('📸 Story publicado!','ts');
}

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

function renderPriceAlerts() {
  const wrap = document.getElementById('seniorGroupList');
  if (!wrap) return;
  const mode = currentModeConfig();
  wrap.innerHTML = mode.groups.slice(0, 3).map(g => `
    <div class="price-row">
      <div class="price-info">
        <div class="price-route">${g.name}</div>
        <div class="price-meta">${g.members} membros · ${g.pace}</div>
      </div>
      <div class="price-right">
        <span class="crowd-pill lvl-low">Verificado</span>
        <button class="mini-btn" onclick="showToast('🤝 ${g.action}: ${g.name}','ts')">${g.action}</button>
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
    <div class="transparency-row">
      <div class="transp-card">
        <div class="transp-title">Selo Local Verificado</div>
        <div class="transp-copy">Emitido quando ha 3+ relatos verificados nos ultimos 30 dias e risco controlado.</div>
        <div class="transp-pill">${PLACES.filter(p=>placeTrust(p).verifiedCount>=3).length} locais elegiveis</div>
      </div>
      <div class="transp-card">
        <div class="transp-title">Fontes oficiais</div>
        <div class="transp-copy">Alertas consulares, clima, mobilidade e seguranca alimentam o painel automaticamente.</div>
        <div class="transp-pill">Gov · Consular · Meteo · Policia</div>
      </div>
      <div class="transp-card">
        <div class="transp-title">LGPD by design</div>
        <div class="transp-copy">Localizacao so sai com consentimento e vira dado agregado apos 24h.</div>
        <div class="transp-pill">Anonimizacao ativa</div>
      </div>
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
    avatar:'🤝',
    online:false,
    typing:false,
    status:'Comunidade ativa',
    time:'agora',
    unread:1,
    last:'Azimute: bem-vindo à rede de apoio.',
    messages:[
      {from:'them', text:'Azimute: bem-vindo à rede de apoio. Aqui a comunidade combina companhia, ajuda local e suporte rápido.', time:getTimeNow()},
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
    text:'Você entrou na <strong>Rede de Apoio Azimute</strong> e já pode ajudar ou pedir companhia em viagem.',
    time:'agora',
    unread:true,
    page:'messages',
  });
  renderImpactModule();
  renderTrustHub();
  renderDesktopRail();
  renderNotifs();
  renderChats();
  showToast('🤝 Você entrou na rede de apoio','ts');
}

function createImpactRequest(kind) {
  const request = kind === 'ajuda'
    ? {id:`ir${Date.now()}`, icon:'🙋', title:'Ajuda oferecida por André', text:'André se disponibilizou para orientar viajantes sobre deslocamento seguro e leitura de contexto local.', city:'Online', responses:1}
    : {id:`ir${Date.now()}`, icon:'🧭', title:'André pediu companhia verificada', text:'Pedido de companhia para explorar a cidade com mais seguranca e trocar experiencia com a comunidade.', city:currentDestination, responses:0};
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
  showToast(kind === 'ajuda' ? '🙋 Ajuda oferecida para a comunidade' : '🧭 Pedido de companhia publicado','ts');
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
  showToast('🤝 Você respondeu a um pedido de apoio','ts');
}

function savePriceAlert(id) {
  const alert = PRICE_ALERTS.find(a => a.id === id);
  showToast(alert ? `🔔 Alerta salvo: ${alert.route}` : '🔔 Alerta salvo','ts');
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
  const row = document.getElementById('storiesRow');
  if (!row) return;
  const addStoryBtn = `
    <button type="button" class="story story-add" onclick="quickAddStory()" aria-label="Publicar um novo story">
      <div class="story-ring"><div class="story-add-circle">+</div></div>
    </button>`;

  const stories = STORIES.map(s =>
    `<div class="story" onclick="showToast('📍 Story de ${s.name} · ${s.status}','ts')">
      <div class="story-ring ${s.ring}"><img class="story-img" src="${s.img}" alt=""></div>
      <div class="story-name">${s.name} · ${s.status}</div>
    </div>`
  ).join('');

  row.innerHTML = addStoryBtn + stories;
}

function openStoryComposer() {
  const form = document.getElementById('storyComposer');
  if (!form) { quickAddStory(); return; }
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
    showToast('Digite o @ do usuário do story','');
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
  showToast('📸 Story publicado!','ts');
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
let currentFeedCityFilter = 'all';
let currentFeedRiskFilter = 'all';
const riskLabel = r => ({safe:'Seguro', caution:'Atencao', suspicious:'Suspeito', danger:'Perigo'}[r]);
const riskCls = r => `rp-${r}`;

function postCity(post) {
  if (post.placeId) {
    const place = PLACES.find(pl => pl.id === post.placeId);
    return place?.city || '';
  }
  const loc = (post.loc || '').split(',')[0].trim();
  return loc || 'Local não informado';
}

function renderFeedFilters() {
  // filtros removidos do feed
}

function setFeedCityFilter(value, btn) {
  // filtros removidos
}

function setFeedRiskFilter(value, btn) {
  // filtros removidos
}

function renderFeed(container='feedCards', posts=POSTS) {
  if (container === 'feedCards') {
    const sk = document.getElementById('feedSkeleton');
    if (sk) sk.classList.add('hide');
  }

  const filtered = posts.filter(p => {
    return true; // filtros removidos
  });

  document.getElementById(container).innerHTML = filtered.map((p, i) => `
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
            <button class="fc-act" onclick="openReportModal('${p.placeId || ''}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Reportar</button>
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

// ════════════════════════════════
//  EXPLORE
// ════════════════════════════════
let explorePlaces = [...PLACES];
let currentCountryFilter = 'all'; // stored em minúsculas
let currentStateFilter = 'all';   // minúsculas
let currentCityFilter = 'all';    // minúsculas
function renderExplore(places=PLACES) {
  const sk = document.getElementById('exploreSkeleton');
  if (sk) sk.classList.add('hide');
  const rankedPlaces = [...places]
    .filter(p => currentCountryFilter === 'all' || p.country.toLowerCase() === currentCountryFilter)
    .filter(p => currentStateFilter === 'all' || (p.state || '').toLowerCase() === currentStateFilter)
    .filter(p => currentCityFilter === 'all' || p.city.toLowerCase() === currentCityFilter)
    .sort((a, b) => modePlaceScore(b) - modePlaceScore(a));
  if (!rankedPlaces.length) {
    document.getElementById('exploreList').innerHTML = `
      <div class="card" style="margin:0 14px;padding:14px">
        <div style="font-family:var(--font-d);font-weight:700;font-size:.96rem;margin-bottom:4px">Nenhum resultado</div>
        <div style="color:var(--muted2);font-size:.82rem;margin-bottom:10px">Tente outra categoria ou remova filtros para ver mais locais.</div>
        <button class="btn btn-g btn-sm" onclick="setCat('all', this); filterExplore('')">Limpar filtros</button>
      </div>`;
    return;
  }
  document.getElementById('exploreList').innerHTML = rankedPlaces.map(p => {
    const trust = placeTrust(p);
    return `
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
          <div class="trust-mini">
            <span class="trust-pill">${trust.confidence}% selo comunidade</span>
            <span class="trust-note">${trust.verifiedCount}/${trust.total} relatos verificados</span>
          </div>
        </div>
        <div class="pch-right">
          <div class="pch-score">${p.score}★</div>
          <div class="pch-reviews">${p.reviews} relatos</div>
        </div>
      </div>
    `;
  }).join('');
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

function populateExploreFilters() {
  const countrySel = document.getElementById('countryFilter');
  const citySel = document.getElementById('cityFilter');
  if (countrySel) {
    countrySel.innerHTML = `<option value="all">Todos os países</option>` +
      COUNTRY_LIST.map(c => {
        const val = c.toLowerCase();
        return `<option value="${val}" ${val===currentCountryFilter?'selected':''}>${c}</option>`;
      }).join('');
  }
  const states = STATE_MAP[currentCountryFilter] || [];
  const stateSel = document.getElementById('stateFilter');
  if (stateSel) {
    if (states.length) {
      stateSel.disabled = false;
      stateSel.innerHTML = `<option value="all">Todos os estados</option>` + states.map(s=>`<option value="${s.toLowerCase()}" ${s.toLowerCase()===currentStateFilter?'selected':''}>${s}</option>`).join('');
    } else {
      stateSel.disabled = true;
      stateSel.innerHTML = `<option value="all">Sem estados</option>`;
      currentStateFilter = 'all';
    }
  }

  const cities = PLACES
    .filter(p => currentCountryFilter==='all' || p.country.toLowerCase()===currentCountryFilter)
    .filter(p => currentStateFilter==='all' || (p.state||'').toLowerCase()===currentStateFilter)
    .map(p => p.city.toLowerCase());
  const cityOptions = Array.from(new Set(cities)).sort();
  if (citySel) {
    citySel.innerHTML = `<option value="all">Todas as cidades</option>` +
      cityOptions.map(c => `<option value="${c}" ${c===currentCityFilter?'selected':''}>${c}</option>`).join('');
  }
}

function setCountryFilter(val) {
  currentCountryFilter = val.toLowerCase();
  currentStateFilter = 'all';
  currentCityFilter = 'all';
  populateExploreFilters();
  renderExplore();
}

function setCityFilter(val) {
  currentCityFilter = val.toLowerCase();
  renderExplore();
}

function setStateFilter(val) {
  currentStateFilter = val.toLowerCase();
  currentCityFilter = 'all';
  populateExploreFilters();
  renderExplore();
}

function useBrowserLocation() {
  if (!navigator.geolocation) { showToast('Geolocalização não suportada',''); return; }
  navigator.geolocation.getCurrentPosition(pos => {
    const here = {lat:pos.coords.latitude, lng:pos.coords.longitude};
    const closest = PLACES
      .map(p => ({p, d: distanceKm({lat:p.lat,lng:p.lng}, here)}))
      .sort((a,b)=>a.d-b.d)[0];
    if (closest) {
      currentCountryFilter = closest.p.country.toLowerCase();
      currentStateFilter = (closest.p.state || 'all').toLowerCase();
      currentCityFilter = closest.p.city.toLowerCase();
      populateExploreFilters();
      renderExplore();
      showToast(`📍 Filtrado para ${closest.p.city}, ${closest.p.country}`,'ts');
    }
  }, () => showToast('Não foi possível obter localização',''));
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
  mapFocusPlaceId = id;
  const p = PLACES.find(pl=>pl.id===id);
  if (!p) return;
  const trust = placeTrust(p);

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

    <div class="trust-panel">
      <div class="trust-panel-score">${trust.confidence}%</div>
      <div class="trust-panel-copy">
        <div class="trust-panel-title">Indice de confianca do local</div>
        <div class="trust-panel-sub">${trust.communityLabel} · ${trust.verifiedCount} de ${trust.total} relatos com identidade verificada</div>
      </div>
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
      <button class="btn btn-danger" style="flex:1" onclick="openReportModal('${p.id}')">🚨 Reportar golpe</button>
      <button class="btn btn-p" style="flex:1" onclick="goToMap('${p.id}')">Ver no Mapa</button>
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

function goToMap(placeId) {
  mapFocusPlaceId = placeId;
  closeDrawer();
  showPage('map');
  setTimeout(() => centerMapOnPlace(placeId, 13, true), 200);
}

// ════════════════════════════════
//  MAP
// ════════════════════════════════
const RISK_COLORS = {safe:'#22c55e', caution:'#f59e0b', suspicious:'#f97316', danger:'#ef4444'};
const TYPE_COLORS = {restaurant:'#a855f7', hostel:'#3b82f6', tourspot:'#ec4899', transport:'#06b6d4', market:'#84cc16'};
const RISK_ORDER = {danger:4, suspicious:3, caution:2, safe:1};

function distanceKm(a, b) {
  const toRad = d => d * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function clusterPlaces(list, radiusKm = 8) {
  const clusters = [];
  list.forEach(p => {
    let target = clusters.find(c => distanceKm(c, p) <= radiusKm);
    if (!target) {
      clusters.push({lat:p.lat, lng:p.lng, members:[p]});
      return;
    }
    target.members.push(p);
    // recompute centroid
    target.lat = target.members.reduce((s, m) => s + m.lat, 0) / target.members.length;
    target.lng = target.members.reduce((s, m) => s + m.lng, 0) / target.members.length;
  });
  return clusters;
}

function initMap() {
  if (mapInit) return;
  mapInit = true;

  map = L.map('map', {center:[20,12], zoom:2, zoomControl:true});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'© OpenStreetMap contributors', maxZoom:18
  }).addTo(map);

  // Place markers (individual)
  PLACES.forEach(p => {
    const col = RISK_COLORS[p.risk];
    const typeCol = TYPE_COLORS[p.type] || col;
    const bgImg = p.photo ? `background-image:url('${p.photo}');background-size:cover;background-position:center;` : '';

    const icon = L.divIcon({
      html: `<div style="
        position:relative;width:34px;height:34px;border-radius:50%;
        ${bgImg || `background:${col};`}
        border:3px solid rgba(255,255,255,.9);
        box-shadow:0 6px 14px rgba(0,0,0,.28);
        display:flex;align-items:center;justify-content:center;
        font-size:15px;cursor:pointer;color:#000;
      ">${bgImg ? '' : p.emoji}</div>`,
      className:'', iconSize:[34,34], iconAnchor:[17,17]
    });

    const marker = L.marker([p.lat, p.lng], {icon})
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
    marker.placeId = p.id;
    marker.riskType = p.risk;
    marker.placeType = p.type;
    allMarkers.push(marker);
  });

  // Cluster markers
  const clusters = clusterPlaces(PLACES, 10);
  clusters.forEach(c => {
    if (!c.members || c.members.length <= 1) return;
    const worst = c.members.reduce((worst, cur) => {
      return (RISK_ORDER[cur.risk] || 0) > (RISK_ORDER[worst] || 0) ? cur.risk : worst;
    }, 'safe');
    const main = c.members[0];
    const icon = L.divIcon({
      html:`<div style="
        position:relative;width:40px;height:40px;border-radius:50%;
        background:${RISK_COLORS[worst] || '#3b82f6'};
        border:4px solid rgba(255,255,255,.9);
        box-shadow:0 4px 16px ${(RISK_COLORS[worst]||'#3b82f6')}66;
        display:flex;align-items:center;justify-content:center;
        color:#000;font-weight:800;font-family:'Syne',sans-serif;font-size:.9rem;
      ">${c.members.length}</div>`,
      className:'', iconSize:[40,40], iconAnchor:[20,20]
    });
    const clusterMarker = L.marker([c.lat, c.lng], {icon});
    clusterMarker.riskType = worst;
    clusterMarker.placeType = 'cluster';
    clusterMarker.groupPlaces = c.members.map(m => m.id);
    clusterMarker.on('click', () => {
      clusterMode = false;
      const toggle = document.getElementById('clusterToggle');
      if (toggle) toggle.checked = false;
      applyMapVisibility();
      const target = allMarkers.find(m => clusterMarker.groupPlaces.includes(m.placeId));
      if (target) {
        target.addTo(map);
        target.openPopup();
      }
    });
    clusterMarkers.push(clusterMarker);
  });

  // Heatmap circles
  PLACES.forEach(p => {
    const col = RISK_COLORS[p.risk];
    const circle = L.circle([p.lat, p.lng], {
      color:col, fillColor:col, fillOpacity:.07, opacity:.15, weight:1, radius:100000
    });
    circle.riskType = p.risk;
    circle.placeType = p.type;
    circle.isHeat = true;
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
    });
    circle.riskType = z.risk;
    circle.placeType = 'global-zone';
    circle.isHeat = true;
    allLayers.push(circle);
  });

  // Crisis zones (visible only when crisis mode is ON)
  CRISIS_ZONES.forEach(z => {
    const col = RISK_COLORS[z.risk] || RISK_COLORS.danger;
    const circle = L.circle([z.lat, z.lng], {
      color:col, fillColor:col, fillOpacity:0, opacity:0, weight:2, radius:z.radius
    });
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
    });
    circle.riskType = 'danger';
    circle.placeType = 'war';
    circle.isHeat = true;
    circle.bindPopup(`
      <div style="font-family:'DM Sans',sans-serif;min-width:210px">
        <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;margin-bottom:4px">🔥 ${z.label}</div>
        <div style="font-size:.75rem;color:#8892a4;line-height:1.45">${z.note}</div>
        <div style="margin-top:8px;font-size:.7rem;color:#b91c1c;font-weight:700">Zona de guerra ativa · ${z.source}</div>
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
  const ms = document.getElementById('mapSkeleton');
  if (ms) ms.classList.add('hide');
}

function closeDrawerIfOpen() {
  // For popup button calls
}

function applyMapVisibility() {
  if (!map) return;
  const showPlaces = !clusterMode;
  const showClusters = clusterMode;

  allMarkers.forEach(m => {
    const match = currentFilter==='all' || m.riskType===currentFilter || m.placeType===currentFilter;
    if (showPlaces && match) m.addTo(map); else map.removeLayer(m);
  });

  clusterMarkers.forEach(m => {
    const match = currentFilter==='all' || m.riskType===currentFilter || m.placeType===currentFilter;
    if (showClusters && match) m.addTo(map); else map.removeLayer(m);
  });

  allLayers.forEach(l => {
    const match = currentFilter==='all' || l.riskType===currentFilter || l.placeType===currentFilter;
    const blockedByCrisis = l.isCrisis && !crisisMode;
    const blockedHeat = l.isHeat && !heatVisible;
    const show = match && !blockedByCrisis && !blockedHeat;
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

function toggleClusterMode(on=true) {
  clusterMode = !!on;
  applyMapVisibility();
}

function toggleHeat(on=true) {
  heatVisible = !!on;
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

function reportIncident(id=null, kind='post') {
  const now = getTimeNow();
  NOTIFS.unshift({
    type:'danger',
    text:`Alerta recebido${kind==='place' ? ' para o local' : ''}${id ? ` (${id})` : ''}. Equipe e comunidade vão priorizar.`,
    time:'agora',
    unread:true,
    placeId: kind==='place' ? id : null,
    city: currentDestination
  });
  renderNotifs();
  showToast('🚨 Alerta enviado para moderação e apoio','ts');
}

function requestRapidHelp() {
  const chat = ensureImpactChat();
  chat.messages.push({from:'me', text:'Preciso de ajuda imediata neste destino.', time:getTimeNow()});
  chat.last = 'Ajuda Já acionada';
  chat.time = 'agora';
  currentChatId = chat.id;
  renderChats();
  showToast('🤝 Rede de apoio acionada','ts');
}

function openReportModal(placeId='') {
  const placeSelect = document.getElementById('reportPlaceInput');
  if (placeSelect) {
    placeSelect.innerHTML = PLACES.map(p => `<option value="${p.id}" ${p.id===placeId?'selected':''}>${p.name} · ${p.city}</option>`).join('');
  }
  document.getElementById('reportDescInput').value = '';
  document.getElementById('reportModal').classList.add('open');
}

function closeReportModal() {
  document.getElementById('reportModal').classList.remove('open');
}

function submitReport() {
  const type = document.getElementById('reportTypeInput').value;
  const placeId = document.getElementById('reportPlaceInput').value;
  const desc = document.getElementById('reportDescInput').value.trim();
  reportIncident(placeId || null, type);
  if (desc) {
    showToast('Descrição enviada para moderação','ts');
  }
  closeReportModal();
}

function renderChats() {
  const sk = document.getElementById('chatSkeleton');
  if (sk) sk.classList.add('hide');
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
    <button class="msg-new-group" onclick="showToast('📞 Ajuda rapida em breve','')">Ajuda</button>
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
  const navAlias = {};
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

function switchHubTab(btn) {
  const target = btn?.dataset?.target;
  document.querySelectorAll('.hub-tab').forEach(b => b.classList.toggle('act', b === btn));
  document.querySelectorAll('.hub-pane').forEach(p => p.classList.remove('act'));
  const pane = document.getElementById(target);
  if (pane) pane.classList.add('act');
}

// ════════════════════════════════
//  AUTH
// ════════════════════════════════
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
  renderTransparency();
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
  renderTransparency();
  renderPriceAlerts();
  renderImpactModule();
  renderDesktopRail();
  renderNotifs();
  showPage('feed');
  showToast('Conta criada! Verifique seu e-mail para ativar.','ts');
}

// ════════════════════════════════
//  POST
// ════════════════════════════════
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
    ? '📍 Somente para amigos'
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
    text: friendsOnly ? `🔒 [Visivel so para amigos] ${text}` : text,
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
  t.textContent = repairMojibakeText(msg);
  t.className = `toast ${type} show`;
  toastTimer = setTimeout(()=>{ t.className='toast'; }, 3200);
}

// CSS inject for card animation
const style = document.createElement('style');
style.textContent = '@keyframes cardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(style);
