export interface ProductCatalogData {
  id: string;
  name: string;
  badge: string;
  subname: string;
  category: 'arch' | 'auto';
  image: string;
  shortDescription: string;
  fullDescription: string;
  keyMetrics: {
    ir: string;
    uv: string;
    tser: string;
    warranty: string;
  };
  benefits: {
    title: string;
    description: string;
    icon: string; // we will map these in the component
  }[];
  specs: {
    vlt: string;
    irer: string;
    tsr: string;
    thickness: string;
    material: string;
    glareReduction: string;
  };
}

export const PRODUCT_CATALOG: ProductCatalogData[] = [
  {
    id: 'invisible-arch',
    name: 'Winf Invisible®',
    subname: 'Série Transparente Nanocerâmica',
    badge: 'LUZ NATURAL ABSOLUTA',
    category: 'arch',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2668&auto=format&fit=crop',
    shortDescription: 'O bloqueio térmico extremo para quem não abre mão da luz natural e transparência total.',
    fullDescription: 'A linha Winf Invisible® utiliza nanotecnologia de cerâmica avançada para rejeitar o calor infravermelho e os perigosos raios UV sem escurecer os vidros. Ideal para vitrines de lojas, apartamentos de alto padrão e condomínios onde a estética da fachada não pode ser alterada. O equilíbrio perfeito entre performance climática e elegância invisível.',
    keyMetrics: {
      ir: 'Até 90%',
      uv: '99.9%',
      tser: 'Até 55%',
      warranty: '10 Anos'
    },
    benefits: [
      { title: 'Rejeição Térmica Extrema', description: 'Mesmo sendo transparente, atua como um escudo molecular contra as ondas de calor, reduzindo drasticamente o uso do ar-condicionado.', icon: 'Sun' },
      { title: 'Estética Preservada', description: 'Não altera as cores originais da fachada nem bloqueia a vista do ambiente, atendendo as regras mais restritas de condomínios.', icon: 'Eye' },
      { title: 'Proteção Anti-Desbotamento', description: 'Bloqueia 99.9% da radiação UV, o principal causador do desbotamento de móveis, pisos de madeira, obras de arte e cortinas.', icon: 'Shield' }
    ],
    specs: {
      vlt: '70% a 80%',
      irer: 'Até 65%',
      tsr: '55%',
      thickness: '2 Mil',
      material: 'Nanocerâmica Avançada SEM Metais',
      glareReduction: '15%'
    }
  },
  {
    id: 'blackpro-arch',
    name: 'Winf BlackPro®',
    subname: 'Série Arquitetônica Clássica (Fumê)',
    badge: 'CONFORTO E PRIVACIDADE',
    category: 'arch',
    image: 'https://images.unsplash.com/photo-1502672260273-b3db776b971a?q=80&w=2070&auto=format&fit=crop',
    shortDescription: 'Privacidade total e sofisticação urbana. Reduz o brilho excessivo e garante total conforto visual.',
    fullDescription: 'A série BlackPro® oferece o visual refinado da arquitetura moderna, trazendo conforto térmico e enorme redução de brilho em ambientes ensolarados. Sua coloração escura proporciona um altíssimo nível de privacidade, impedindo a visão de quem está de fora, e transformando espaços corporativos e residenciais em ambientes altamente produtivos e confortáveis.',
    keyMetrics: {
      ir: 'Até 73%',
      uv: '99%',
      tser: 'Até 60%',
      warranty: '7 Anos'
    },
    benefits: [
      { title: 'Controle de Ofuscamento', description: 'Sua forte redução de brilho elimina reflexos em telas de computador e televisão, garantindo conforto visual.', icon: 'Eye' },
      { title: 'Privacidade Diurna', description: 'Impede quase completamente a visibilidade de fora para dentro durante o dia, fornecendo discrição máxima.', icon: 'Shield' },
      { title: 'Estética Minimalista', description: 'O tom carvão profundo confere modernidade aos vidros e esconde cortinas despadronizadas nas fachadas.', icon: 'Droplets' }
    ],
    specs: {
      vlt: '5% a 35%',
      irer: 'Até 52%',
      tsr: '60%',
      thickness: '1.5 Mil',
      material: 'Carbono Não-Metalizado de Alta Densidade',
      glareReduction: 'Até 95%'
    }
  },
  {
    id: 'dualreflect-arch',
    name: 'Winf Dual Reflect®',
    subname: 'Performance Refletiva Espelhada',
    badge: 'EFFICIÊNCIA TÉRMICA MASTER',
    category: 'arch',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    shortDescription: 'O poder térmico do espelhado voltado para o exterior, mantendo a visibilidade clara do interior à noite.',
    fullDescription: 'A linha Dual Reflect® foi projetada para enfrentar fachadas que recebem altos volumes de insolação extrema. Ela funciona com duas camadas distintas: o lado externo possui uma alta refletividade para rebater o calor violentamente como um escudo de espelho, enquanto o lado interno possui baixa refletividade, garantindo que o cliente continue podendo ver a vista noturna pela janela (algo que espelhados comuns estragam).',
    keyMetrics: {
      ir: 'Até 81%',
      uv: '99.9%',
      tser: 'Até 82%',
      warranty: '10 Anos'
    },
    benefits: [
      { title: 'Escudo Térmico Extremo', description: 'Altíssima rejeição total de energia solar. Reflete o calor de volta para o ambiente externo antes de cruzar o vidro.', icon: 'Sun' },
      { title: 'Visão Noturna Clara', description: 'O efeito "Refletivo Duplo" reduz o espelhamento interno à noite. Você vê lá fora com extrema clareza.', icon: 'Eye' },
      { title: 'Design Arquitetônico', description: 'Visual externo imponente, refletindo o céu ou o ambiente em volta e ocultando totalmente o interior do imóvel.', icon: 'Shield' }
    ],
    specs: {
      vlt: '15% a 25%',
      irer: 'Até 75%',
      tsr: '82%',
      thickness: '2 Mil',
      material: 'Composição Metalizada Multicamadas',
      glareReduction: 'Até 85%'
    }
  },
  {
    id: 'aerocore-auto',
    name: 'Winf AeroCore™',
    subname: 'Nanocerâmica Automotiva de Precisão',
    badge: 'CONTROLE TÉRMICO EXTREMO',
    category: 'auto',
    image: 'https://images.unsplash.com/photo-1611016186450-41da9d07372d?q=80&w=2600&auto=format&fit=crop',
    shortDescription: 'Nanotecnologia cerâmica veicular para máxima rejeição de calor (IR) preservando a conectividade.',
    fullDescription: 'Desenvolvida com nano-partículas cristalinas infundidas, a AeroCore™ é a resposta definitiva para altas temperaturas no trânsito. Sua formulação não-metalizada garante que não haverá nenhuma interferência em sinais de GPS, Wi-Fi ou celular dentro do interior do seu veículo, proporcionando uma viagem fresca e plenamente conectada.',
    keyMetrics: {
      ir: 'Até 99%',
      uv: '99.9%',
      tser: 'Até 68%',
      warranty: 'Vitalícia*'
    },
    benefits: [
      { title: 'Zero Interferência', description: 'Totalmente livre de metais, assegurando fluidez no uso de celulares, fastpass (pedágio) e navegadores GPS.', icon: 'Shield' },
      { title: 'Rejeição IR Pura', description: 'Sua densa malha de cerâmica intercepta a radiação infravermelha com até 99% de eficácia, aliviando extremo o ar-condicionado.', icon: 'Sun' },
      { title: 'Ampla Margem de Color', description: 'Disponível do ultra-escuro (5%) para privacidade máxima até as versões mais claras, sem tons aroxeados com o tempo.', icon: 'Eye' }
    ],
    specs: {
      vlt: '5% a 70%',
      irer: 'Até 68%',
      tsr: '68%',
      thickness: '1.5 Mil',
      material: 'Nanocerâmica Infundida Extrudada',
      glareReduction: 'Até 93%'
    }
  },
  {
    id: 'neoskin-auto',
    name: 'Winf NeoSkin™',
    subname: 'Paint Protection Film (PPF)',
    badge: 'BLINDAGEM INVISÍVEL',
    category: 'auto',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=2574&auto=format&fit=crop',
    shortDescription: 'O escudo auto-regenerativo definitivo para a pintura original do seu veículo.',
    fullDescription: 'Winf NeoSkin™ redefine a blindagem externa automotiva. Feita a partir de poliuretano alifático ultra-transparente, ela reveste a pintura do seu carro criando uma barreira ultra-resistente contra arranhões, pedriscos de estradas, manchas de insetos e chuva ácida. Seus componentes termoplásticos permitem a auto-regeneração ("Self-Healing") ao contato com o calor do sol.',
    keyMetrics: {
      ir: 'N/A',
      uv: '100%',
      tser: 'N/A',
      warranty: '10 Anos'
    },
    benefits: [
      { title: 'Self-Healing (Regeneração)', description: 'Arranhões leves desaparecem milagrosamente apenas com a exposição ao calor solar ou lavagem com água quente.', icon: 'Droplets' },
      { title: 'Anti-Amarelamento', description: 'Química formulada para resistir à degradação oxidativa, mantendo-se incrivelmente transparente durante toda sua vida útil.', icon: 'Sun' },
      { title: 'Proteção Focada no Impacto', description: 'Possui 8 mils de espessura militar concebida para absorver impactos secos de cascalho e detritos sem danificar o verniz original.', icon: 'Shield' }
    ],
    specs: {
      vlt: '100% (Transparente)',
      irer: 'N/A',
      tsr: 'N/A',
      thickness: '8 Mil',
      material: 'Poliuretano Alifático Thermoplástico + TopCoat',
      glareReduction: '0%'
    }
  },
  {
    id: 'aerocore-white-auto',
    name: 'Winf AeroCore™ White',
    subname: 'Série Nanocristalina para Para-brisas',
    badge: 'MÁXIMA LUMINOSIDADE',
    category: 'auto',
    image: 'https://images.unsplash.com/photo-1542382103-997f7422f6d0?q=80&w=2670&auto=format&fit=crop',
    shortDescription: 'Toda a proteção da cerâmica AeroCore com máxima transparência exigida por lei para vidros frontais.',
    fullDescription: 'Especialmente desenvolvida para quem não pode ou não quer escurecer os vidros (como nos para-brisas), a AeroCore™ White filtra o sol de forma inteligente limitando apenas a banda quente da luz. Oferece o frescor impressionante da puríssima nanocerâmica sem perder um centímetro sequer da sua visão noturna ou estética original cristalográfica.',
    keyMetrics: {
      ir: 'Até 90%',
      uv: '99.9%',
      tser: 'Até 55%',
      warranty: 'Vitalícia*'
    },
    benefits: [
      { title: 'Visão Noturna Perfeita', description: 'Por ser extremamente limpa e transparente, é a opção mais segura para dirigir sob neblina, chuva, ou em vias sem iluminação.', icon: 'Eye' },
      { title: 'Escudo Frontal', description: 'O para-brisas é o maior canal de calor de um carro. Bloqueá-lo com a linha White reduz a fadiga ocular do motorista.', icon: 'Sun' },
      { title: '100% Legal', description: 'Sua marcação óptica respeita facilmente todas as normas globais de transmitância luminosa para vidros dianteiros.', icon: 'Shield' }
    ],
    specs: {
      vlt: '75% a 80%',
      irer: 'Até 60%',
      tsr: '55%',
      thickness: '1.5 Mil',
      material: 'Nanocerâmica Cristalina Clear',
      glareReduction: 'Até 10%'
    }
  },
  {
    id: 'aerocore-security-auto',
    name: 'Winf AeroCore™ Security',
    subname: 'Blindagem Térmica e Estrutural',
    badge: 'ANTIVANDALISMO EXTREMO',
    category: 'auto',
    image: 'https://images.unsplash.com/photo-1621360662232-a50e599b8287?q=80&w=2684&auto=format&fit=crop',
    shortDescription: 'Climatização cerâmica combinada com uma malha estrutural antiesmagamento e segurança contra roubos.',
    fullDescription: 'A AeroCore™ Security é onde a termodinâmica encontra a física de impacto. Ao integrar nossa exclusiva rejeição fóton-cerâmica com polímeros multicamadas ultraespessos, criamos uma película Antivandalismo de altíssimo nível. Ela age contendo o estilhaçamento do vidro em tentativas de intrusão (smash-and-grab) ou acidentes veiculares severos.',
    keyMetrics: {
      ir: 'Até 95%',
      uv: '99.9%',
      tser: 'Até 63%',
      warranty: '10 Anos'
    },
    benefits: [
      { title: 'Proteção Antivandalismo', description: 'Estrutura laminada robusta (PS4/PS8) projetada para segurar os detritos do vidro e resistir a ataques físicos no semáforo.', icon: 'Shield' },
      { title: 'Segurança Passiva em Acidentes', description: 'Em capotamentos ou colisões, a película evita que os estilhaços perigosos do vidro sejam atirados contra os ocupantes do veículo.', icon: 'Shield' },
      { title: 'O Conforto da AeroCore', description: 'Todo esse poder de blindagem invisível ainda vem atrelado à capacidade de manter seu carro absurdamente frio sob o sol.', icon: 'Sun' }
    ],
    specs: {
      vlt: '5% a 35%',
      irer: 'Até 65%',
      tsr: '63%',
      thickness: '4 Mil (PS4) / 8 Mil (PS8)',
      material: 'Laminado Polímero Estrutural Tensional + Nanocerâmica',
      glareReduction: 'Até 90%'
    }
  }
];
