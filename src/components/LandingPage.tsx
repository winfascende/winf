
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  Zap, 
  Globe, 
  Check, 
  Lock, 
  Cpu, 
  TrendingUp, 
  Diamond, 
  ShieldCheck,
  Store,
  Box,
  Users,
  Briefcase,
  Target,
  Info,
  CheckCircle,
  Building2,
  Instagram,
  Smartphone,
  GalleryVerticalEnd,
  Star,
  X,
  Loader,
  DollarSign,
  Activity,
  FileText,
  Wand2,
  FileSpreadsheet,
  Layers,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from '../types';
import { WINF_CONSTANTS } from '../constants';
import { useWinf } from '../contexts/WinfContext';

interface LandingPageProps {
  onEnter: () => void;
  onNavigateToMarketingPage: (view: ViewState) => void;
}

// --- DATA STRUCTURE FOR BUSINESS MODELS ---
const MODELS_DATA = [
  {
    id: 'select_partner',
    title: 'SELECT',
    subtitle: 'CERTIFIED PARTNER',
    price: 2500,
    color: 'text-white',
    border: 'border-white/5',
    bg: 'bg-white/[0.01]',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
    description: 'O nível de entrada oficial para o ecossistema Winf™. Foco em treinamento Academy e acesso à comunidade de elite.',
    payback: '1 a 2 meses',
    deliverables: [
        'Acesso ao Portal Winf™ Academy',
        'Treinamentos Online Completos',
        'Comunidade Exclusiva no Discord',
        'Suporte via Chat',
        'Selo de Parceiro Select'
    ],
    scenarios: [
        { name: 'Conservador', revenue: 4500 },
        { name: 'Moderado', revenue: 8000 },
        { name: 'Agressivo', revenue: 12000 }
    ],
    investment_breakdown: [
        'Taxa de Adesão Select',
        'Acesso à Plataforma Academy',
        'Suporte Técnico'
    ],
    operational_steps: [
        '1. Cadastro e Validação.',
        '2. Acesso ao Academy.',
        '3. Início dos Treinamentos.',
        '4. Networking na Comunidade.'
    ],
    financials: {
        scenario: 'Freelancer Certificado',
        monthly_potential: 'R$ 4.500 a R$ 12.000',
        profit_margin: '80%',
        note: 'Baseado em indicações e serviços de consultoria técnica.'
    },
    demand: 'Alta',
    territory: 'Global',
    status: 'DISPONÍVEL'
  },
  {
    id: 'elite_partner',
    title: 'ELITE',
    subtitle: 'ELITE INSTALLER',
    price: 5000,
    color: 'text-white',
    border: 'border-white/10',
    bg: 'bg-white/[0.02]',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000',
    description: 'Para o instalador de alta performance que busca a chancela Elite. Inclui certificação técnica avançada e ferramentas exclusivas.',
    payback: '2 a 4 meses',
    deliverables: [
        'Tudo do Select',
        'Certificação Técnica Elite',
        'Kit de Ferramentas Profissional',
        'Tabela de Preços Parceiro Elite',
        'Acesso ao Winf Cut™ (Avançado)'
    ],
    scenarios: [
        { name: 'Conservador', revenue: 8000 },
        { name: 'Moderado', revenue: 15000 },
        { name: 'Agressivo', revenue: 25000 }
    ],
    investment_breakdown: [
        'Taxa de Certificação Elite',
        'Kit de Ferramentas Master',
        'Acesso Full ao Software de Corte'
    ],
    operational_steps: [
        '1. Prova de Proficiência Elite.',
        '2. Recebimento do Kit Master.',
        '3. Treinamento Winf Cut™ Pro.',
        '4. Habilitação no Sistema Elite.'
    ],
    financials: {
        scenario: 'Instalador de Elite',
        monthly_potential: 'R$ 8.000 a R$ 25.000',
        profit_margin: '70%',
        note: 'Baseado em aplicações diretas com material premium.'
    },
    demand: 'Alta',
    territory: 'Regional',
    status: 'DISPONÍVEL'
  },
  {
    id: 'advanced',
    title: 'ADVANCED',
    subtitle: 'LICENCIADO ELITE',
    price: 7500,
    color: 'text-white',
    border: 'border-white/10',
    bg: 'bg-white/[0.02]',
    image: 'https://images.unsplash.com/photo-1614062848658-e501822b5ad4?auto=format&fit=crop&q=80&w=1000',
    description: 'O ponto de entrada para o ecossistema Winf™. Ideal para aplicadores autônomos ou pequenos estúdios que buscam a certificação oficial e acesso à tecnologia molecular.',
    payback: '3 a 6 meses',
    deliverables: [
        'Acesso ao Portal Winf™ PARTNERS',
        'One Page Personalizada',
        'Treinamento Presencial',
        'Kit de Produtos Inicial',
        'Marketing Digital Ativo',
        'Certificação Oficial'
    ],
    scenarios: [
        { name: 'Conservador', revenue: 8500 },
        { name: 'Moderado', revenue: 15000 },
        { name: 'Agressivo', revenue: 25000 }
    ],
    investment_breakdown: [
        'Taxa de Licenciamento',
        'Kit de Insumos Start',
        'Acesso à Plataforma',
        'Material de PDV'
    ],
    operational_steps: [
        '1. Credenciamento e Validação.',
        '2. Treinamento Técnico Presencial.',
        '3. Setup da One Page.',
        '4. Início das Operações.'
    ],
    financials: {
        scenario: 'Aplicador Solo',
        monthly_potential: 'R$ 8.500 a R$ 25.000',
        profit_margin: '60%',
        note: 'Baseado em 10 a 20 aplicações mensais de ticket médio.'
    },
    demand: 'Alta Procura',
    territory: 'Expansão Ativa',
    status: 'OPERACIONAL'
  },
  {
    id: 'enterprise',
    title: 'ENTERPRISE',
    subtitle: 'BOARD MEMBER',
    price: 15000,
    color: 'text-white',
    border: 'border-white/20',
    bg: 'bg-white/[0.05]',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000',
    description: 'Para empresários que desejam escalar a operação. Inclui estratégias de Geofencing, suporte prioritário e participação no conselho de decisões da marca.',
    payback: '4 a 8 meses',
    deliverables: [
        'Tudo do Advanced',
        'Consultoria Estratégica',
        'Estratégia GEOFENCING',
        'Suporte Integral 24/7',
        'Participação no Conselho',
        'Prioridade de Estoque'
    ],
    scenarios: [
        { name: 'Conservador', revenue: 25000 },
        { name: 'Moderado', revenue: 45000 },
        { name: 'Agressivo', revenue: 85000 }
    ],
    investment_breakdown: [
        'Taxa Enterprise',
        'Consultoria de Setup',
        'Créditos de Tráfego Pago',
        'Acesso ao Board'
    ],
    operational_steps: [
        '1. Alinhamento Estratégico.',
        '2. Definição de Raio Geofencing.',
        '3. Setup de Campanhas Locais.',
        '4. Gestão de KPIs.'
    ],
    financials: {
        scenario: 'Gestão de Rede',
        monthly_potential: 'R$ 25.000 a R$ 85.000',
        profit_margin: '50%',
        note: 'Considerando revenda e serviços de alta complexidade.'
    },
    demand: 'Esgotando',
    territory: 'Limitado',
    status: 'CRÍTICO'
  },
  {
    id: 'kiosk',
    title: 'KIOSK RETAIL',
    subtitle: 'RETAIL MACHINE',
    price: 120000,
    color: 'text-white',
    border: 'border-white/20',
    bg: 'bg-white/5',
    image: 'https://images.unsplash.com/photo-1534452286302-2f5631f5a13a?auto=format&fit=crop&q=80&w=1000',
    description: 'A máquina de imprimir dinheiro em Shoppings. Venda de gadgets (películas de celular) com altíssima margem + Captação de leads para Auto/Arq.',
    payback: '12 a 18 meses',
    deliverables: [
        'Projeto Modular Shopping',
        'Hardware de Varejo Winf™',
        'Estoque de Gadgets Premium',
        'Software Kiosk Mode',
        'Treinamento de Atendimento',
        'Marketing de Fluxo'
    ],
    scenarios: [
        { name: 'Fluxo Baixo', revenue: 45000 },
        { name: 'Fluxo Médio', revenue: 85000 },
        { name: 'Fluxo Alto', revenue: 150000 }
    ],
    investment_breakdown: [
        'Fabricação do Kiosk',
        'Hardware e Software',
        'Estoque Inicial Gadgets',
        'Taxa de Franquia'
    ],
    operational_steps: [
        '1. Seleção do Ponto.',
        '2. Montagem do Kiosk.',
        '3. Treinamento de Staff.',
        '4. Inauguração.'
    ],
    financials: {
        scenario: 'Varejo de Shopping',
        monthly_potential: 'R$ 45.000 a R$ 150.000',
        profit_margin: '40%',
        note: 'Lucro composto: Venda direta + Comissão de Leads.'
    },
    demand: 'Explosiva',
    territory: 'Shopping Centers',
    status: 'EM BREVE',
    availabilityNote: 'Fase final de homologação de hardware.'
  },
  {
    id: 'studio',
    title: 'STUDIO FLAGSHIP',
    subtitle: 'FLAGSHIP MASTER',
    price: 250000,
    color: 'text-white',
    border: 'border-white/30',
    bg: 'bg-white/5',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    description: 'O topo da cadeia alimentar. Uma loja conceito física que domina a região. Estética automotiva de luxo, arquitetura e ponto de encontro.',
    payback: '18 a 24 meses',
    deliverables: [
        'Exclusividade Territorial',
        'Projeto Studio de Luxo',
        'Estoque Massivo (Car/Arch)',
        'Acesso ao Universo Dark™',
        'Marketing de Dominância',
        'Mentoria Direta CEO'
    ],
    scenarios: [
        { name: 'Standard', revenue: 120000 },
        { name: 'Premium', revenue: 250000 },
        { name: 'Elite', revenue: 500000 }
    ],
    investment_breakdown: [
        'Projeto Arquitetônico',
        'Estoque de Lançamento',
        'Marketing de Impacto',
        'Taxa Master'
    ],
    operational_steps: [
        '1. Viabilidade de Ponto.',
        '2. Obras e Adequação.',
        '3. Recrutamento Squad.',
        '4. Evento High Society.'
    ],
    financials: {
        scenario: 'Centro de Luxo',
        monthly_potential: 'R$ 120.000 a R$ 500.000+',
        profit_margin: '35%',
        note: 'Modelo de escala real com equipe técnica e comercial.'
    },
    demand: 'Exclusiva',
    territory: 'Cidades Polo',
    status: 'EM BREVE',
    availabilityNote: 'Aguardando liberação de cotas territoriais.'
  }
];

const ModelDetailModal: React.FC<{ model: any, onClose: () => void, onProceed: (model: any) => void }> = ({ model, onClose, onProceed }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#050505]/98 backdrop-blur-3xl overflow-y-auto"
        >
            <div className="max-w-6xl w-full bg-[#0a0a0a] border border-white/5 rounded-[40px] overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                {/* Subtle Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] select-none z-0">
                    <div className="text-[12rem] font-black text-white whitespace-nowrap tracking-tighter">
                        WINF PARTNERS
                    </div>
                </div>

                {loading ? (
                    <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
                            <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 animate-pulse mb-2">Autenticando Acesso</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Preparando Dossiê de Performance...</p>
                        </div>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col lg:flex-row min-h-[80vh]"
                    >
                        {/* Left: Visual & Info */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:w-1/2 relative bg-[#0d0d0d] p-8 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5"
                        >
                            <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
                                <img src={model.image} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <button onClick={onClose} className="mb-8 md:mb-12 flex items-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors group">
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Radar
                                </button>
                                <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 uppercase tracking-tighter leading-none">
                                    {model.title}
                                </h2>
                                <p className="text-white/40 text-base md:text-lg font-light leading-relaxed mb-8 md:mb-10 max-w-md">
                                    {model.description}
                                </p>
                                
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/20 w-20 md:w-24 shrink-0">Investimento</div>
                                        <div className="h-px flex-1 bg-white/5"></div>
                                        <div className="text-xl md:text-2xl font-black text-white tracking-tighter">R$ {model.price.toLocaleString()}</div>
                                    </div>
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/20 w-20 md:w-24 shrink-0">Payback Est.</div>
                                        <div className="h-px flex-1 bg-white/5"></div>
                                        <div className="text-xl md:text-2xl font-black text-white tracking-tighter">{model.payback}</div>
                                    </div>
                                    {model.availabilityNote && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 rounded-2xl bg-winf-primary/5 border border-winf-primary/20"
                                        >
                                            <div className="flex items-center gap-3 text-winf-primary">
                                                <div className="w-1.5 h-1.5 bg-winf-primary rounded-full animate-pulse"></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{model.availabilityNote}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <div className="relative z-10 mt-12 md:mt-16">
                                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 md:mb-6">Entregáveis Premium</div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    {model.deliverables.map((item: string, i: number) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + (i * 0.1) }}
                                            className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-bold text-white/60 uppercase tracking-widest"
                                        >
                                            <div className="w-1 h-1 bg-white rounded-full"></div> {item}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Financial Scenarios */}
                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="lg:w-1/2 p-8 md:p-16 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8 md:mb-12">
                                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Projeção de Performance</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-[8px] md:text-[9px] font-bold text-green-500 uppercase tracking-widest">Live Data Simulation</span>
                                </div>
                            </div>

                            <div className="space-y-6 md:space-y-8 flex-1">
                                {model.scenarios.map((scenario: any, i: number) => (
                                    <div key={i} className="group">
                                        <div className="flex items-center justify-between mb-3 md:mb-4">
                                            <h5 className="text-[10px] md:text-[11px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                                                Cenário {scenario.name}
                                            </h5>
                                            <div className="text-lg md:text-xl font-black text-white tracking-tighter">
                                                R$ {scenario.revenue.toLocaleString()} <span className="text-[9px] md:text-[10px] text-white/20 font-bold uppercase tracking-widest ml-1">/mês</span>
                                            </div>
                                        </div>
                                        <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(scenario.revenue / 100000) * 100}%` }}
                                                transition={{ duration: 1, delay: 0.6 + (i * 0.2) }}
                                                className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                            />
                                        </div>
                                        <div className="mt-2 md:mt-3 flex justify-between text-[8px] md:text-[9px] font-bold text-white/20 uppercase tracking-widest">
                                            <span>Lucro Líquido Est.</span>
                                            <span className="text-white/40">R$ {(scenario.revenue * 0.4).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-white/5">
                                <button 
                                    onClick={() => onProceed(model)}
                                    className="w-full py-5 md:py-6 bg-white text-black font-black text-[10px] md:text-[11px] uppercase tracking-[0.5em] rounded-2xl hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] mb-4 md:mb-6"
                                >
                                    Solicitar Credenciamento
                                </button>
                                <p className="text-center text-[8px] md:text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
                                    Sujeito a análise de perfil e disponibilidade territorial.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onNavigateToMarketingPage }) => {
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920',
    (WINF_CONSTANTS as any).assets.aerocoreStudio,
    (WINF_CONSTANTS as any).assets.architects,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenModel = (modelId: string) => {
      const model = MODELS_DATA.find(m => m.id === modelId);
      if (model) setSelectedModel(model);
  };

  const handleProceed = () => {
      // Dependendo do modelo, podemos redirecionar para páginas específicas ou para o formulário de contato
      if (selectedModel?.id === 'select_partner') {
          onNavigateToMarketingPage(ViewState.LANDING_PARCERIA_SELECT);
      } else if (selectedModel?.id === 'elite_partner') {
          onNavigateToMarketingPage(ViewState.LANDING_PARCERIA_ELITE);
      } else if (selectedModel?.id === 'advanced') {
          onNavigateToMarketingPage(ViewState.LANDING_PARCERIA_ADVANCED);
      } else if (selectedModel?.id === 'enterprise') {
          onNavigateToMarketingPage(ViewState.LANDING_PARCERIA_ENTERPRISE);
      } else if (selectedModel?.id === 'kiosk') {
          onNavigateToMarketingPage(ViewState.LANDING_KIOSK);
      } else if (selectedModel?.id === 'studio') {
          onNavigateToMarketingPage(ViewState.LANDING_STUDIO);
      } else {
          // Para outros modelos, pode ir para um form de cadastro ou checkout (aqui simulado como Parceria)
          onNavigateToMarketingPage(ViewState.LANDING_PARCERIA); 
      }
      setSelectedModel(null);
  };

  return (
    <div className="min-h-screen bg-winf-background text-winf-text_primary font-sans selection:bg-winf-primary/30 overflow-x-hidden relative transition-colors duration-300">
      {/* Global Overlays - Refined Aesthetic */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.01]" 
           style={{ backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`, backgroundSize: '100px 100px' }}>
      </div>
      
      {/* System Status Bar - Simplified */}
      <div className="fixed top-0 w-full z-[90] h-0.5 bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>

      {/* Detail Modal */}
      {selectedModel && (
          <ModelDetailModal 
            model={selectedModel} 
            onClose={() => setSelectedModel(null)} 
            onProceed={handleProceed}
          />
      )}

      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[80] border-b border-winf-border bg-winf-background/80 backdrop-blur-2xl h-16 md:h-24 flex items-center">
        <div className="max-w-[1500px] mx-auto px-4 md:px-10 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => { window.scrollTo(0,0); setIsMenuOpen(false); }}>
              <div className="relative">
                <span className="font-black tracking-tighter text-lg md:text-2xl uppercase relative z-10">Winf™ PARTNERS</span>
                <motion.div 
                  className="absolute -inset-1 bg-winf-primary/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="hidden sm:flex items-center gap-2 px-2 py-0.5 rounded border border-winf-border bg-winf-surface">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[7px] font-black text-winf-text_muted uppercase tracking-widest">BOARD_ACCESS</span>
              </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-winf-text_muted">
            <button onClick={() => onNavigateToMarketingPage(ViewState.INSTITUTIONAL_SITE)} className="hover:text-winf-text_primary transition-all hover:tracking-[0.6em]">A Marca</button>
            <button onClick={() => onNavigateToMarketingPage(ViewState.ABOUT_US)} className="hover:text-winf-text_primary transition-all hover:tracking-[0.6em]">Sobre Nós</button>
            <button onClick={() => onNavigateToMarketingPage(ViewState.PRODUCTS_CATALOG)} className="hover:text-winf-text_primary transition-all hover:tracking-[0.6em]">Catálogo</button>
            <a href="#models" className="hover:text-winf-text_primary transition-all hover:tracking-[0.6em]">Licenciamento</a>
            <button onClick={() => onNavigateToMarketingPage(ViewState.LANDING_KIOSK)} className="hover:text-winf-text_primary transition-all hover:tracking-[0.6em]">Kiosks</button>
            <button onClick={() => onNavigateToMarketingPage(ViewState.LANDING_STUDIO)} className="hover:text-winf-text_primary transition-all hover:tracking-[0.6em]">Franquias</button>
            <a href="#social" className="hover:text-winf-text_primary transition-all hover:tracking-[0.6em]">Galeria</a>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => onNavigateToMarketingPage(ViewState.PUBLIC_CONSULTANCY)} className="hidden md:block border border-winf-border text-winf-text_muted px-4 py-2.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] hover:bg-winf-surface hover:text-winf-text_primary transition-all">
              Visão do Cliente
            </button>
            <button onClick={onEnter} className="bg-winf-primary text-winf-background px-4 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(var(--winf-primary-rgb),0.2)]">
              Login
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <GalleryVerticalEnd size={24} className="rotate-90" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-[70] bg-[#050505] transition-all duration-500 lg:hidden flex flex-col ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex-1 overflow-y-auto pt-24 pb-10 px-6 flex flex-col">
            <div className="flex flex-col items-start gap-6 text-xl font-black uppercase tracking-[0.2em] text-white/80 w-full">
              <button onClick={() => { onNavigateToMarketingPage(ViewState.INSTITUTIONAL_SITE); setIsMenuOpen(false); }} className="hover:text-white transition-colors w-full text-left py-4 border-b border-white/10">A MARCA</button>
              <button onClick={() => { onNavigateToMarketingPage(ViewState.ABOUT_US); setIsMenuOpen(false); }} className="hover:text-white transition-colors w-full text-left py-4 border-b border-white/10">SOBRE NÓS</button>
              <button onClick={() => { onNavigateToMarketingPage(ViewState.PRODUCTS_CATALOG); setIsMenuOpen(false); }} className="hover:text-white transition-colors w-full text-left py-4 border-b border-white/10">CATÁLOGO</button>
              <a href="#models" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors w-full text-left py-4 border-b border-white/10">LICENCIAMENTO</a>
              <button onClick={() => { onNavigateToMarketingPage(ViewState.LANDING_KIOSK); setIsMenuOpen(false); }} className="hover:text-white transition-colors w-full text-left py-4 border-b border-white/10">KIOSKS</button>
              <button onClick={() => { onNavigateToMarketingPage(ViewState.LANDING_STUDIO); setIsMenuOpen(false); }} className="hover:text-white transition-colors w-full text-left py-4 border-b border-white/10">FRANQUIAS</button>
              <a href="#social" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors w-full text-left py-4 border-b border-white/10">GALERIA</a>
            </div>
            
            <div className="mt-auto pt-10 flex flex-col gap-4">
              <button onClick={() => { onNavigateToMarketingPage(ViewState.PUBLIC_CONSULTANCY); setIsMenuOpen(false); }} className="w-full border border-winf-border text-winf-text_muted px-6 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-winf-surface transition-all">
                Visão do Cliente
              </button>
              <button onClick={() => { onEnter(); setIsMenuOpen(false); }} className="w-full bg-winf-primary text-black px-6 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(var(--winf-primary-rgb),0.3)]">
                <Lock size={18} /> Portal do Parceiro
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,#050505_80%)]"></div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.45, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center grayscale contrast-110 brightness-75"
              style={{ 
                backgroundImage: `url(${heroImages[currentImageIndex]})`,
              }}
            />
          </AnimatePresence>
          
          {/* Elite Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#050505]"></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
          
          {/* Mission Control Grid Overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          {/* Terminal Data Stream Effect - Removed for sophistication */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.01] pointer-events-none">
             <div className="absolute top-0 left-10 h-full w-px bg-white/10"></div>
             <div className="absolute top-0 right-10 h-full w-px bg-white/20"></div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-6xl px-6 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl text-white/30 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-12"
          >
            <span>NÚCLEO ESTRATÉGICO</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="relative mb-8 md:mb-10"
          >
            <h1 className="text-4xl sm:text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.85] uppercase">
              WINF <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                PARTNERS
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-12 md:mb-16 relative"
          >
            <h2 className="text-base md:text-2xl font-light tracking-[0.2em] md:tracking-[0.4em] text-white/60 uppercase max-w-4xl mx-auto leading-relaxed">
              <span className="font-bold text-white">Proteção Molecular.</span> Do Digital ao Massivo.
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center w-full sm:w-auto"
          >
            <a href="#models" className="w-full sm:w-auto bg-white text-black px-10 md:px-12 py-4 md:py-5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all text-center shadow-xl active:scale-95 group flex items-center justify-center gap-3">
              Explorar Modelos <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button onClick={() => window.scrollTo({ top: document.getElementById('budget')?.offsetTop, behavior: 'smooth' })} className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-10 md:px-12 py-4 md:py-5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white/5 transition-all backdrop-blur-sm active:scale-95">
              Radar de Investimento
            </button>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white/20">Mission Control</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
        </motion.div>
      </header>

      {/* VSL Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black text-winf-primary uppercase tracking-[0.5em] mb-4"
            >
              Protocolo de Acesso
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter"
            >
              Cansado de disputar centavos? <span className="text-winf-primary">Decodifique o Ecossistema Winf™</span>
            </motion.h3>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group"
          >
            {/* Video Placeholder / VSL UI */}
            <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:scale-105 transition-transform duration-1000" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920)' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-24 h-24 md:w-32 md:h-32 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_80px_rgba(255,255,255,0.5)] transition-all"
              >
                <ArrowRight size={40} className="ml-2" />
              </motion.button>
              <div className="text-center">
                <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white mb-2">Manifesto Winf™</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Análise Estratégica: 4:20 min</p>
              </div>
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-winf-primary rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Winf™ Partners Ecosystem Overview</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-winf-primary"></div>
                </div>
                <span className="text-[10px] font-mono text-white/40">01:24 / 04:20</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-winf-primary/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-winf-primary/5 to-transparent pointer-events-none"></div>
      </section>

      {/* MODELS SECTION (UPDATED) */}
      <section id="models" className="py-32 bg-[#050505] relative border-t border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center mb-16 md:mb-24">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] mb-4 md:mb-6"
                >
                  DOMINAÇÃO MULTICAMADA
                </motion.h2>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-7xl font-bold text-white leading-[0.9] mb-6 md:mb-8 uppercase tracking-tighter"
                >
                    DIFERENTES <span className="text-winf-primary italic">NÍVEIS</span> DE PODER.
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/40 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0"
                >
                    Do licenciamento digital ao varejo de alto tráfego e estúdios de luxo. Escolha como você quer monetizar a tecnologia Winf™ PARTNERS.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {MODELS_DATA.map((model, index) => (
                    <motion.div 
                      key={model.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex flex-col p-10 rounded-[40px] border transition-all duration-700 group overflow-hidden ${
                        model.id === 'enterprise' 
                          ? 'bg-white/[0.08] border-white/30 scale-[1.02] shadow-[0_20px_60px_rgba(255,255,255,0.05)]' 
                          : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                        {/* Status Badge */}
                        <div className="absolute top-6 right-6 flex flex-col items-end gap-2 z-20">
                            {model.id === 'enterprise' && (
                                <span className="px-3 py-1 bg-white text-black text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                                    Recomendado
                                </span>
                            )}
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-md rounded border border-white/10">
                                <div className={`w-1 h-1 rounded-full animate-pulse ${
                                    model.status === 'CRÍTICO' ? 'bg-red-500' : 
                                    model.status === 'OPERACIONAL' ? 'bg-green-500' : 'bg-blue-500'
                                }`}></div>
                                <span className="text-[7px] font-black text-white/60 uppercase tracking-widest">{model.status}</span>
                            </div>
                        </div>

                        {/* Background Glow */}
                        <div className={`absolute -top-24 -right-24 w-64 h-64 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000 ${
                            model.id === 'enterprise' ? 'bg-white/10 opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100'
                        }`}></div>

                        {/* System Scanning Animation */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-y-full group-hover:animate-scan pointer-events-none z-10"></div>

                        <div className="mb-10 relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 ${model.id === 'enterprise' ? 'bg-white/10' : 'bg-white/10'}`}>
                                    {model.id === 'advanced' && <Zap size={20} className="text-white"/>}
                                    {model.id === 'enterprise' && <Diamond size={20} className="text-white"/>}
                                    {model.id === 'kiosk' && <Store size={20} className="text-white"/>}
                                    {model.id === 'studio' && <Building2 size={20} className="text-white"/>}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 leading-none mb-1">{model.subtitle}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[8px] font-bold text-winf-primary uppercase tracking-widest">{model.demand}</span>
                                        <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                                        <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{model.territory}</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter leading-none group-hover:text-winf-primary transition-colors duration-500">{model.title}</h4>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm text-white/40 font-bold">R$</span>
                                <span className="text-5xl font-black text-white tracking-tighter">
                                    {model.price.toLocaleString('pt-BR')}
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-12 flex-1 relative z-10">
                            {model.deliverables.slice(0, 5).map((item, i) => (
                                <li key={i} className="flex items-start gap-4 text-[11px] text-white/60 font-medium uppercase tracking-wider leading-tight group-hover:text-white/80 transition-colors">
                                    <Check size={14} className="text-winf-primary shrink-0 mt-0.5" /> {item}
                                </li>
                            ))}
                            {model.deliverables.length > 5 && (
                                <li className="text-[9px] font-black text-white/20 uppercase tracking-widest pl-8">+ {model.deliverables.length - 5} Vantagens Elite</li>
                            )}
                        </ul>

                        <button 
                            onClick={() => handleOpenModel(model.id)} 
                            className={`w-full py-6 font-black text-[10px] uppercase tracking-[0.5em] rounded-2xl transition-all relative z-10 active:scale-95 ${
                                model.id === 'enterprise'
                                    ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_40px_rgba(255,255,255,0.1)]'
                                    : 'bg-transparent border border-white/10 text-white hover:bg-white hover:text-black hover:border-white'
                            }`}
                        >
                            Explorar Dossiê
                        </button>

                        {/* Decorative Corner */}
                        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </motion.div>
                ))}
            </div>

            {/* ARCHITECTS SPECIAL SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-12 md:p-20 rounded-[60px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent overflow-hidden relative group"
            >
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                    <Building2 size={300} />
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-[0.5em] text-winf-primary mb-8">
                            Portal do Especificador // Architects
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic leading-[0.9]">
                            É ARQUITETO? <br/>
                            <span className="text-white/20">CADASTRE-SE GRÁTIS.</span>
                        </h2>
                        <p className="text-lg text-white/60 font-light leading-relaxed max-w-xl mb-12">
                            Tenha acesso exclusivo ao nosso ecossistema de engenharia molecular. Utilize nossas ferramentas de simulação AI, cálculo de ROI energético e especificações técnicas para elevar o padrão dos seus projetos.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <button 
                                onClick={() => onNavigateToMarketingPage(ViewState.ARCHITECT_REGISTRATION)}
                                className="bg-white text-black px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all shadow-2xl flex items-center gap-3 group"
                            >
                                Registrar Gratuitamente <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02]">
                                <CheckCircle size={16} className="text-winf-primary" />
                                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Acesso Imediato</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { icon: <Wand2 size={24} />, title: "Simulação AI", desc: "Fachadas em tempo real." },
                            { icon: <FileSpreadsheet size={24} />, title: "Dossiê ROI", desc: "Dados de eficiência." },
                            { icon: <Layers size={24} />, title: "Arquivos BIM", desc: "Especificação pronta." },
                            { icon: <Shield size={24} />, title: "Suporte Pro", desc: "Engenharia dedicada." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl hover:border-white/20 transition-all">
                                <div className="text-winf-primary mb-4">{item.icon}</div>
                                <h4 className="text-xs font-black uppercase tracking-widest mb-2">{item.title}</h4>
                                <p className="text-[10px] text-white/30 leading-relaxed uppercase font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* INVESTMENT RADAR SECTION (ELITE REFINEMENT) */}
      <section id="budget" className="py-40 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center mb-32">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-6"
                >
                  RADAR DE PERFORMANCE // Q2-2026
                </motion.h2>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-10"
                >
                  TRANSPARÊNCIA <span className="text-white/20">FINANCEIRA.</span>
                </motion.h3>
                <div className="flex justify-center mb-10">
                    <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[8px] font-black text-white/60 uppercase tracking-[0.3em]">LIVE DATA SIMULATION // ACTIVE</span>
                    </div>
                </div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/40 text-lg max-w-2xl mx-auto font-light leading-relaxed"
                >
                  Compare os modelos de negócio e entenda o potencial de retorno sobre seu investimento. Sem letras miúdas, apenas engenharia de lucro Winf™.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Advanced vs Enterprise Comparison */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/[0.02] border border-white/5 rounded-[40px] p-10 md:p-16 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={80} className="text-white" />
                    </div>
                    
                    <h4 className="text-2xl font-black text-white mb-12 flex items-center gap-4 uppercase tracking-tighter">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        ESCALABILIDADE DE MARGEM
                    </h4>
                    
                    <div className="space-y-16">
                        <div className="relative pl-10 border-l border-white/10">
                            <div className="absolute -left-1 top-0 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            <h5 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">ADVANCED (BASE)</h5>
                            <p className="text-[11px] text-white/40 mb-6 uppercase tracking-widest font-medium">Foco em execução técnica e autoridade local.</p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Lucro/m²</p>
                                    <p className="text-2xl font-black text-white tracking-tighter">R$ 122</p>
                                </div>
                                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Potencial/m</p>
                                    <p className="text-2xl font-black text-white tracking-tighter">R$ 30k</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative pl-10 border-l border-white/10">
                            <div className="absolute -left-1 top-0 w-2 h-2 bg-white/40 rounded-full"></div>
                            <h5 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">ENTERPRISE (SCALE)</h5>
                            <p className="text-[11px] text-white/40 mb-6 uppercase tracking-widest font-medium">Foco em gestão de território e rede de aplicadores.</p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Lucro/m²</p>
                                    <p className="text-2xl font-black text-white tracking-tighter">R$ 144</p>
                                </div>
                                <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Potencial/m</p>
                                    <p className="text-2xl font-black text-white tracking-tighter">R$ 60k</p>
                                </div>
                            </div>
                            <p className="text-[9px] text-white/20 mt-6 font-bold uppercase tracking-[0.2em] italic">
                                *O Enterprise herda toda a estrutura do Advanced e adiciona camadas de gestão e tráfego pago.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* High Ticket Models */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/[0.02] border border-white/5 rounded-[40px] p-10 md:p-16 flex flex-col relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={80} className="text-white" />
                    </div>

                    <h4 className="text-2xl font-black text-white mb-12 flex items-center gap-4 uppercase tracking-tighter">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        MODELOS DE ALTO TICKET
                    </h4>
                    
                    <div className="flex-1 space-y-10">
                        <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 hover:border-white/20 transition-colors">
                            <div className="flex justify-between items-center mb-6">
                                <h5 className="text-lg font-black text-white uppercase tracking-tighter">KIOSK RETAIL <span className="text-winf-primary text-[10px] ml-2">(EM BREVE)</span></h5>
                                <span className="text-[9px] text-white/20 font-black uppercase tracking-[0.3em] border border-white/10 px-3 py-1 rounded-full">PAYBACK: 12-18M</span>
                            </div>
                            <p className="text-[11px] text-white/40 mb-8 uppercase tracking-widest leading-relaxed">Operação de fluxo em shoppings. Venda recorrente de acessórios Winf™ PARTNERS.</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Margem Média</p>
                                    <p className="text-3xl font-black text-white tracking-tighter">400%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Potencial/m</p>
                                    <p className="text-3xl font-black text-white tracking-tighter">R$ 120k</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 hover:border-white/20 transition-colors">
                            <div className="flex justify-between items-center mb-6">
                                <h5 className="text-lg font-black text-white uppercase tracking-tighter">STUDIO FLAGSHIP <span className="text-winf-primary text-[10px] ml-2">(EM BREVE)</span></h5>
                                <span className="text-[9px] text-white/20 font-black uppercase tracking-[0.3em] border border-white/10 px-3 py-1 rounded-full">PAYBACK: 18-24M</span>
                            </div>
                            <p className="text-[11px] text-white/40 mb-8 uppercase tracking-widest leading-relaxed">Centro de experiências e dominação regional. O auge da marca.</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Ticket Médio</p>
                                    <p className="text-3xl font-black text-white tracking-tighter">R$ 3.5k</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-2">Potencial/m</p>
                                    <p className="text-3xl font-black text-white tracking-tighter">R$ 500k+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* GALLERY SECTION (IMMERSIVE ALBUM - ELITE REFINEMENT) */}
      <section id="social" className="py-40 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                <div className="max-w-2xl">
                   <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-8 flex items-center gap-3"
                   >
                      <GalleryVerticalEnd size={14} /> PORTFÓLIO VISUAL // ELITE_ASSETS
                   </motion.h2>
                   <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter"
                   >
                      A ESTÉTICA DA <span className="text-white/20">PERFEIÇÃO.</span>
                   </motion.h3>
                </div>
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/40 text-lg max-w-sm leading-relaxed text-right font-light"
                >
                    Onde a engenharia encontra a arte. Explore as aplicações reais da tecnologia Winf™ em ativos de ultra-luxo.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[1000px] md:h-[700px]">
                {/* 1. Supercars (Large Vertical) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-[40px] overflow-hidden md:col-span-1 md:row-span-2 border border-white/5 bg-white/[0.02]"
                >
                    <img src={(WINF_CONSTANTS as any).assets.aerocoreForest} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
                    
                    {/* Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-[0.05] transition-opacity select-none z-10">
                        <div className="text-6xl font-black text-white whitespace-nowrap rotate-[-15deg]">CONFIDENTIAL</div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.5em] mb-4">01 // ASSET_CORE</p>
                        <h4 className="text-4xl font-black text-white uppercase tracking-tighter">Supercars</h4>
                    </div>
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity scanline-overlay"></div>
                </motion.div>

                {/* 2. Arquitetura (Square) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="group relative rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.02]"
                >
                    <img src={(WINF_CONSTANTS as any).assets.studio} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-8 left-8">
                        <p className="text-[10px] text-white/70 font-black uppercase tracking-[0.3em]">Arquitetura</p>
                    </div>
                </motion.div>

                {/* 3. Lifestyle (Square) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="group relative rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.02]"
                >
                    <img src={(WINF_CONSTANTS as any).assets.kiosk} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-8 left-8">
                        <p className="text-[10px] text-white/70 font-black uppercase tracking-[0.3em]">Lifestyle</p>
                    </div>
                </motion.div>

                {/* 4. Detailing (Wide) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="group relative rounded-[40px] overflow-hidden md:col-span-2 border border-white/5 bg-white/[0.02]"
                >
                    <img src={(WINF_CONSTANTS as any).assets.aerocoreMulti} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
                    
                    {/* Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-[0.05] transition-opacity select-none z-10">
                        <div className="text-8xl font-black text-white whitespace-nowrap rotate-[-15deg]">CONFIDENTIAL</div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-12">
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.5em] mb-4">04 // PROCESS_FLOW</p>
                        <h4 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Detailing</h4>
                        <p className="text-[11px] text-white/40 uppercase tracking-widest max-w-md hidden md:block font-medium leading-relaxed">Processos de correção de pintura e aplicação de NeoSkin™ PPF com precisão cirúrgica em laboratórios certificados.</p>
                    </div>
                </motion.div>
            </div>
            
            <div className="mt-24 text-center">
                 <a 
                    href="https://www.instagram.com/winfpartners" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-[0.4em] border border-white/10 px-10 py-5 rounded-full hover:bg-white hover:text-black transition-all group"
                >
                    <Instagram size={18} /> Acessar Galeria Oficial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </a>
            </div>
        </div>
      </section>

      {/* Dark Factory / Industry Section */}
      <section className="py-40 bg-[#020202] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center grayscale mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <div className="w-1.5 h-1.5 bg-winf-primary rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.5em]">ORIGEM TECNOLÓGICA // DARK_FACTORY_PROTOCOL</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Nascida no silêncio das <span className="text-winf-primary">Dark Factories.</span>
            </h2>
            
            <div className="space-y-8">
              <p className="text-xl md:text-3xl font-light text-white/60 leading-tight tracking-tight max-w-4xl mx-auto italic">
                "Onde a precisão não admite erro humano. O zumbido constante dos servos-motores e a ausência de luz revelam uma indústria de última geração, forjada no coração da inovação tecnológica global."
              </p>
              
              <p className="text-sm md:text-lg font-medium text-white/30 leading-relaxed max-w-3xl mx-auto uppercase tracking-widest">
                Não é apenas fabricação; é engenharia molecular em escala massiva. Sinta o ar de quem domina a produção mundial. O poder está no resultado, no toque do material, na perfeição do mícron.
              </p>

              {/* Molecular Specs & Certifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-left group hover:border-winf-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-winf-primary/10 flex items-center justify-center">
                      <Cpu size={16} className="text-winf-primary" />
                    </div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Molecular_Core</h4>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { label: "DENSIDADE_NANO", value: "0.02μm" },
                      { label: "ESTRUTURA_POLI", value: "CROSS-LINKED" },
                      { label: "RESISTÊNCIA_TÉRMICA", value: "1400°C+" }
                    ].map((spec, i) => (
                      <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest">{spec.label}</span>
                        <span className="text-[9px] text-white/60 font-mono">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-left group hover:border-winf-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-winf-primary/10 flex items-center justify-center">
                      <ShieldCheck size={16} className="text-winf-primary" />
                    </div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Certificações_Origem</h4>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { label: "PROTOCOLO_DARK", value: "VERIFIED" },
                      { label: "ISO_MOLECULAR", value: "9001:2026" },
                      { label: "LAB_CERTIFIED", value: "SANTOS-ALPHA" }
                    ].map((spec, i) => (
                      <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest">{spec.label}</span>
                        <span className="text-[9px] text-winf-primary font-mono">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-left group hover:border-winf-primary/30 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-winf-primary/10 flex items-center justify-center">
                      <Activity size={16} className="text-winf-primary" />
                    </div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Processo_Industrial</h4>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { label: "HUMAN_ERROR_RATE", value: "0.000%" },
                      { label: "ATMOSFERA_CONTROL", value: "NÍVEL_ZERO" },
                      { label: "YIELD_PRODUÇÃO", value: "99.98%" }
                    ].map((spec, i) => (
                      <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest">{spec.label}</span>
                        <span className="text-[9px] text-white/60 font-mono">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-12 flex justify-center gap-12 opacity-20">
              <div className="flex flex-col items-center gap-2">
                <Cpu size={32} />
                <span className="text-[8px] font-black uppercase tracking-widest">AI_DRIVEN</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Layers size={32} />
                <span className="text-[8px] font-black uppercase tracking-widest">NANO_LAYER</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield size={32} />
                <span className="text-[8px] font-black uppercase tracking-widest">MIL_SPEC</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer (ELITE REFINEMENT) */}
      <footer className="py-32 border-t border-white/5 bg-[#010203] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-16">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center gap-4">
                        <span className="font-black text-white tracking-tighter text-xl uppercase">WINF™ PARTNERS</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">GLOBAL_EXPANSION_CORE // EST. 2025</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                    <button onClick={() => onNavigateToMarketingPage(ViewState.LANDING_LICENCIAMENTO)} className="hover:text-white transition-all hover:tracking-[0.6em]">Licenciamentos</button>
                    <button onClick={() => onNavigateToMarketingPage(ViewState.LANDING_KIOSK)} className="hover:text-white transition-all hover:tracking-[0.6em]">Kiosks</button>
                    <button onClick={() => onNavigateToMarketingPage(ViewState.LANDING_STUDIO)} className="hover:text-white transition-all hover:tracking-[0.6em]">Franquias</button>
                </div>

                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02]">
                        <ShieldCheck size={16} className="text-white/40" />
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">SECURED_NUCLEUS_V6.0</span>
                    </div>
                    <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest">© 2026 WINF INTERNATIONAL GROUP. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
