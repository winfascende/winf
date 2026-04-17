import React, { useEffect, useState, useRef } from 'react';
import ArchitectSpecGenerator from './ArchitectSpecGenerator';
import FilmVisualizer from './FilmVisualizer';
import { 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle, 
  Thermometer,
  Sun,
  Bot,
  MessageSquare,
  MessageCircle,
  Send,
  X,
  TrendingUp,
  Calculator,
  Activity,
  Cpu,
  Layers,
  Shield,
  Zap,
  Lock,
  Phone,
  Mail,
  MapPin,
  Network,
  Database,
  Award,
  ShieldCheck,
  Target,
  Building2,
  UserCheck,
  PlayCircle
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { GoogleGenAI } from "@google/genai";
import { WINF_CONSTANTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewState } from '../types';
import SimulatorTechnicalCharts from './SimulatorTechnicalCharts';

interface InstitutionalSiteProps {
  onBack: () => void;
  territory?: string;
  onNavigateToAccess?: (view?: ViewState) => void;
  onNavigateToCatalog?: () => void;
}

const ICON_MAP: Record<string, any> = {
  Cpu,
  Layers,
  Shield,
  Zap
};

const FilmCard = ({ item, onSelect }: any) => {
  const assetUrl = (WINF_CONSTANTS as any).assets?.[item.id] || `https://picsum.photos/seed/${item.id}/800/600`;
  const [isExpanded, setIsExpanded] = useState(false);
  const description = item.desc || "";
  const shouldTruncate = description.length > 100;
  const displayDescription = isExpanded || !shouldTruncate ? description : `${description.substring(0, 100)}...`;

  return (
    <motion.div 
      whileHover={{ y: -12, scale: 1.02 }}
      className="bg-winf-surface border border-winf-border rounded-[30px] md:rounded-[40px] overflow-hidden group hover:border-winf-primary/50 transition-all duration-700 flex flex-col h-full relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] product-card-container"
    >
      <div className="relative h-48 md:h-72 overflow-hidden">
        <img 
          src={assetUrl} 
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-125 opacity-30 group-hover:opacity-60 grayscale group-hover:grayscale-0" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-winf-surface via-winf-surface/20 to-transparent"></div>
        
        <div className="absolute top-6 md:top-8 left-6 md:left-8 flex items-center gap-3">
           <div className="w-2 h-2 bg-winf-primary rounded-full shadow-[0_0_10px_var(--winf-primary)] animate-pulse"></div>
           <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-winf-text_muted">WINF™ PARTNERS ELITE</span>
        </div>

        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 right-6 md:right-10">
          <div className="inline-block px-3 py-1 bg-winf-primary/20 border border-winf-primary/30 rounded-full mb-3 md:mb-4">
            <span className="text-[7px] md:text-[8px] font-black text-winf-primary uppercase tracking-[0.3em]">{item.target}</span>
          </div>
          <h3 className="text-2xl md:text-5xl font-black text-winf-text_primary tracking-tighter leading-none uppercase group-hover:text-winf-primary transition-colors duration-500 flex items-center gap-3">
            {item.name}
            <PlayCircle size={24} className="text-winf-primary/50 group-hover:text-winf-primary transition-colors" />
          </h3>
        </div>
      </div>
      
      <div className="p-6 md:p-10 flex-1 flex flex-col">
        <div className="mb-6 md:mb-10">
          <p className="text-winf-text_muted text-sm md:text-base leading-relaxed font-light group-hover:text-winf-text_primary transition-colors duration-500">
            {displayDescription}
          </p>
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-winf-primary text-[10px] font-black uppercase tracking-[0.2em] mt-2 hover:underline focus:outline-none"
            >
              {isExpanded ? 'Ver Menos' : 'Ver Mais'}
            </button>
          )}
        </div>
        
        <div className="space-y-4 mb-12">
          {item.specs.map((spec: string, idx: number) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-winf-border group/spec">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-winf-primary/40 rounded-full group-hover/spec:bg-winf-primary transition-colors"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-winf-text_muted group-hover/spec:text-winf-text_primary transition-colors">Spec_{idx + 1}</span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-winf-text_primary group-hover/spec:text-winf-primary transition-colors">{spec}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
            onSelect(item.name);
            document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
          }} 
          className="w-full py-5 bg-winf-background border border-winf-border text-winf-text_primary rounded-[24px] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-winf-primary hover:text-winf-background hover:border-winf-primary hover:shadow-[0_0_30px_rgba(var(--winf-primary-rgb),0.4)] transition-all duration-500 mt-auto flex items-center justify-center gap-3 active:scale-95"
        >
           {WINF_CONSTANTS.portfolio.cta} <ArrowRight size={14} />
        </button>
      </div>
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-winf-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </motion.div>
  );
};

const InstitutionalSite: React.FC<InstitutionalSiteProps> = ({ onBack, territory = "SANTOS", onNavigateToAccess }) => {
  const { addLead } = useWinf();
  const [showArchitectForm, setShowArchitectForm] = useState(false);
  const [architectSpec, setArchitectSpec] = useState({ filmId: WINF_CONSTANTS.portfolio.lines[0].items[0].id, area: '100' });
  const [architectFormData, setArchitectFormData] = useState({ name: '', email: '', cau: '', city: '', phone: '', office: '' });
  const [isVerifying, setIsVerifying] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleSpecChange = (filmId: string, area: string) => {
    setArchitectSpec({ filmId, area });
  };
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([{role: 'ai', text: `Conexão estabelecida. Eu sou o NEUROMESH.AI™, o núcleo de processamento do ecossistema Winf™ PARTNERS em ${territory}. Posso realizar cálculos de blindagem térmica para seu projeto agora mesmo. Qual a m² aproximada ou medidas dos seus vidros?`}]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendToWhatsApp = () => {
      const msg = encodeURIComponent(`Olá Winf™ PARTNERS ${territory}! Gostaria de solicitar uma consultoria técnica para meu projeto.`);
      window.open(`https://wa.me/5513999191510?text=${msg}`, '_blank');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userText = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: userText,
            config: {
                systemInstruction: `Você é o NEUROMESH.AI™, a inteligência central de processamento da Winf™ PARTNERS em ${territory}.
                Seu foco absoluto: Cálculos de Blindagem Térmica Arquitetônica e Automotiva de Elite.
                DIRETRIZES:
                - Seja técnico, sofisticado e eficiente.
                - Use termos: 'Célula de Blindagem', 'Conforto Molecular', 'Yield Energético', 'Winf™ Shield'.
                - PROIBIDO: 'Insulfilm' ou 'Película'. Use 'Ativo', 'Célula' ou 'Tecnologia'.
                - Sempre finalize oferecendo o botão de WhatsApp para 'Sincronizar Medição Técnica'.`
            }
        });
        setMessages(prev => [...prev, { role: 'ai', text: response.text || "Dados processados. Gostaria de sincronizar com a unidade física?" }]);
    } catch (e) {
        setMessages(prev => [...prev, { role: 'ai', text: "Ruído na rede neural. Por favor, utilize o canal direto de WhatsApp para falar com um humano." }]);
    } finally {
        setIsTyping(false);
    }
  };

  const [sunIntensity, setSunIntensity] = useState(85);

  const commonTemp = Math.round(20 + (sunIntensity * 0.21));
  const winfTemp = Math.round(20 + (sunIntensity * 0.035));
  const [activeLine, setActiveLine] = useState(WINF_CONSTANTS.portfolio.lines[0].id);

  return (
    <div className="min-h-screen bg-winf-background text-winf-text_primary font-sans selection:bg-winf-primary/20 overflow-x-hidden relative">
      {/* Film Grain Noise Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Global Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(to right, var(--winf-text_primary) 1px, transparent 1px), linear-gradient(to bottom, var(--winf-text_primary) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[80] border-b border-winf-border bg-winf-background/80 backdrop-blur-xl h-16 md:h-24 flex items-center">
        <div className="max-w-[1500px] mx-auto px-4 md:px-10 w-full flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-10">
            <button onClick={onBack} className="text-winf-text_muted hover:text-winf-text_primary transition-colors p-2 hover:bg-winf-surface rounded-full"><ChevronLeft size={20} className="md:w-6 md:h-6" /></button>
            <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => { window.scrollTo(0,0); setIsMenuOpen(false); }}>
                <span className="font-black tracking-tighter text-xl md:text-2xl uppercase">{WINF_CONSTANTS.header.logo}</span>
                <span className="w-1.5 h-1.5 bg-winf-primary rounded-full animate-pulse"></span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-winf-text_muted">
            {WINF_CONSTANTS.header.nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-winf-text_primary transition-colors">{item.name}</a>
            ))}
            <a href="#architect-spec-generator" className="hover:text-winf-text_primary transition-colors">Spec Generator</a>
            <a href="#film-visualizer" className="hover:text-winf-text_primary transition-colors">Visualizer</a>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => onNavigateToAccess?.(ViewState.PUBLIC_PORTAL)} className="hidden sm:block border border-winf-border text-winf-text_primary px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-winf-surface transition-all">
              Acessar Ecossistema
            </button>
            <button onClick={sendToWhatsApp} className="hidden sm:block bg-winf-text_primary text-winf-background px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-winf-text_primary/90 transition-all">
              {WINF_CONSTANTS.header.cta}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-winf-text_muted hover:text-winf-text_primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Activity size={24} className="rotate-90" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-[70] bg-winf-background lg:hidden flex flex-col"
            >
              <div className="flex-1 overflow-y-auto pt-24 pb-10 px-6 flex flex-col">
                <div className="flex flex-col items-start gap-6 text-lg font-black uppercase tracking-widest text-winf-text_muted w-full">
                  {WINF_CONSTANTS.header.nav.map((item) => (
                    <a key={item.id} href={`#${item.id}`} onClick={() => setIsMenuOpen(false)} className="hover:text-winf-text_primary transition-colors w-full text-left py-3 border-b border-winf-border">{item.name}</a>
                  ))}
                  <a href="#architect-spec-generator" onClick={() => setIsMenuOpen(false)} className="hover:text-winf-text_primary transition-colors w-full text-left py-3 border-b border-winf-border">Spec Generator</a>
                  <a href="#film-visualizer" onClick={() => setIsMenuOpen(false)} className="hover:text-winf-text_primary transition-colors w-full text-left py-3 border-b border-winf-border">Visualizer</a>
                </div>
                
                <div className="mt-auto pt-10 flex flex-col gap-4">
                  <button onClick={() => { onNavigateToAccess?.(ViewState.PUBLIC_PORTAL); setIsMenuOpen(false); }} className="w-full bg-winf-surface border border-winf-border text-winf-text_primary px-6 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                    <Lock size={18} /> Acessar Ecossistema
                  </button>
                  <button onClick={() => { sendToWhatsApp(); setIsMenuOpen(false); }} className="w-full bg-winf-text_primary text-winf-background px-6 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                    {WINF_CONSTANTS.header.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--winf-primary-rgb),0.05)_0%,var(--winf-background)_80%)]"></div>
           <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center grayscale contrast-125 mix-blend-overlay"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop)',
            }}
          />
          {/* Glass Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-winf-background/20 to-winf-background"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-winf-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-winf-text_primary/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl px-6 md:px-8 flex flex-col items-center">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-winf-primary text-[10px] font-black uppercase tracking-[0.8em] mb-6"
           >
             FIM DA GUERRA DE PREÇOS // DOMINÂNCIA TERRITORIAL
           </motion.div>

           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-winf-border bg-winf-surface/50 backdrop-blur-md text-winf-text_muted text-[10px] font-black uppercase tracking-[0.5em] mb-12 shadow-2xl"
           >
              <div className="w-1.5 h-1.5 rounded-full bg-winf-primary animate-ping"></div>
              A Única Barreira Contra a Commoditização
           </motion.div>
           
           <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-[10rem] font-black tracking-tighter leading-[0.75] mb-12 uppercase italic group"
           >
              NÃO VENDEMOS <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-winf-text_primary via-winf-text_primary to-winf-text_primary/10 relative">
                PELÍCULAS.
                <span className="absolute inset-0 text-winf-text_primary/20 blur-sm animate-glitch opacity-0 group-hover:opacity-100">PELÍCULAS.</span>
              </span>
           </motion.h1>
           
           <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-16 relative"
           >
              <div className="absolute -inset-4 bg-winf-text_primary/5 blur-2xl rounded-full"></div>
              <h2 className="relative text-2xl md:text-5xl font-light tracking-[0.3em] text-winf-text_primary uppercase italic">
                CONSTRUÍMOS O <span className="font-black">PADRÃO.</span>
              </h2>
           </motion.div>

           <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-winf-text_muted text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-20 tracking-tight"
           >
              A WINF™ é o primeiro ecossistema integrado de alta performance. 
              Unimos nanotecnologia, software de gestão e inteligência artificial em uma única barreira tecnológica.
           </motion.p>
           
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-8 items-center w-full sm:w-auto"
           >
              <a href="#produtos" className="w-full sm:w-auto bg-winf-text_primary text-winf-background px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-winf-text_primary/90 transition-all text-center shadow-[0_0_40px_rgba(var(--winf-text_primary-rgb),0.2)] active:scale-95">
                Explorar Tecnologia
              </a>
              <button onClick={onNavigateToAccess} className="w-full sm:w-auto bg-transparent border border-winf-border text-winf-text_primary px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-winf-surface transition-all backdrop-blur-sm active:scale-95">
                Acesso ao Ecossistema
              </button>
           </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-winf-text_muted">Scroll to Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-winf-primary to-transparent"></div>
        </motion.div>
      </header>

      {/* 4 Pillars Section */}
      <section id="tecnologia" className="py-20 md:py-32 px-6 md:px-10 bg-winf-background border-y border-winf-border">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-6 uppercase text-winf-text_primary">Os 4 Pilares do Ecossistema</h2>
            <p className="text-winf-text_muted text-base md:text-lg font-light max-w-2xl mx-auto">Quando produto, software, rede e dados operam em sincronia, criamos uma barreira tecnológica impossível de ser copiada.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Layers, title: 'Tecnologia de Produto', desc: 'Linhas WINF Select™ e AeroCore™ com nanotecnologia avançada e WINF PERFORMANCE SYSTEM™.' },
              { icon: Cpu, title: 'Plataforma Digital', desc: 'WINF OS™: O cérebro da operação. CRM, ERP, estoque e certificação digital em um só lugar.' },
              { icon: Network, title: 'Rede de Operadores', desc: 'WINF Authorized Glass Techs™. Profissionais certificados, avaliados e conectados nacionalmente.' },
              { icon: Zap, title: 'Motor de Marketing', desc: 'Geração de demanda automatizada e distribuição de leads via inteligência artificial.' }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-winf-surface border border-winf-border p-8 md:p-10 rounded-[30px] md:rounded-[40px] hover:border-winf-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-winf-background rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-winf-text_primary group-hover:text-winf-background transition-all border border-winf-border">
                  <pillar.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-3 md:mb-4 text-winf-text_primary">{pillar.title}</h3>
                <p className="text-winf-text_muted text-xs md:text-sm font-light leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 md:py-32 bg-winf-background border-y border-winf-border overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-winf-primary/20 rounded-full blur-[100px] md:blur-[150px]"></div>
        </div>
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 md:gap-16"
          >
            <div className="flex-1 w-full">
              <span className="text-winf-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-8 block">WINF™ DIGITAL MANIFESTO</span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase italic leading-[0.9] md:leading-[0.85] mb-8 break-words text-winf-text_primary">
                FIM DO <span className="text-winf-text_primary">PAPEL.</span><br/>
                <span className="text-winf-text_muted/20">INÍCIO DA</span><br/>
                <span className="text-winf-primary">RASTREABILIDADE.</span>
              </h2>
            </div>
            <div className="max-w-xl pb-6 md:pb-12 w-full">
              <p className="text-winf-text_muted text-xl md:text-3xl font-light leading-tight mb-8 md:mb-12 tracking-tight">
                Eliminamos a burocracia física para dar lugar à segurança absoluta. Cada instalação Winf™ é um ativo digital rastreável, imutável e eterno.
              </p>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-8 md:w-12 h-px bg-winf-primary"></div>
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] text-winf-text_muted">A Nova Era da Proteção</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WINF OS & Certificate */}
      <section id="os" className="py-20 md:py-32 px-6 md:px-10 bg-winf-text_primary text-winf-background border-y border-winf-border/10">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-winf-background/5 p-6 md:p-12 rounded-[30px] md:rounded-[40px] border border-winf-background/10 shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-winf-background opacity-10"></div>
                <div className="flex items-center justify-between mb-12 border-b border-winf-background/10 pb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-winf-background rounded-2xl flex items-center justify-center text-winf-text_primary shadow-xl">
                      <Award size={24} />
                    </div>
                    <div>
                      <span className="font-black text-2xl tracking-tighter block uppercase">WINF™ CERTIFICATE</span>
                      <span className="text-[9px] font-mono text-winf-background/40 uppercase tracking-[0.3em]">Digital Asset Verification</span>
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-winf-background border border-winf-background/10 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-700">
                    <div className="w-14 h-14 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WINF-VERIFY')] bg-cover opacity-80 invert"></div>
                  </div>
                </div>
                <div className="space-y-8 font-mono text-[11px]">
                  {[
                    { label: 'ID Instalação', value: 'WINF-8992-TX' },
                    { label: 'Ativo Tecnológico', value: 'NanoCeramic 70 Elite' },
                    { label: 'Operador Certificado', value: 'Elite Tech SP-01' },
                    { label: 'Status de Garantia', value: '10 Anos (Ativa)', color: 'text-green-600' }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-winf-background/5 pb-4 group/row">
                      <span className="text-winf-background/40 uppercase tracking-[0.2em]">{row.label}</span>
                      <span className={`font-black uppercase tracking-widest ${row.color || 'text-winf-background'} group-hover/row:translate-x-[-4px] transition-transform`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-8 border-t border-winf-background/5 flex justify-between items-center">
                   <span className="text-[8px] font-black text-winf-background/30 uppercase tracking-[0.5em]">Secured by WINF OS™ Blockchain</span>
                   <ShieldCheck size={16} className="text-winf-background/30" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 uppercase leading-[0.9]">
                O FIM DA ERA DO PAPEL.
              </h2>
              <p className="text-lg md:text-xl text-winf-background/60 mb-6 md:mb-8 font-light leading-relaxed">
                Substituímos garantias físicas e manuais por um ecossistema de rastreabilidade total. Através do WINF OS™, toda instalação gera um ativo digital imutável.
              </p>
              <p className="text-lg md:text-xl text-winf-background/60 mb-8 md:mb-10 font-light leading-relaxed">
                O cliente recebe um QR Code que comprova a autenticidade do material, a qualificação do instalador e o prazo exato da garantia. Transparência total.
              </p>
              <button onClick={onNavigateToAccess} className="w-full sm:w-auto bg-winf-background text-winf-text_primary px-10 py-4 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-winf-background/90 transition-all text-center">
                Acessar WINF OS
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfólio Sistemas de Proteção */}
      <section id="produtos" className="py-40 px-10 bg-winf-background relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto">
           <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="max-w-3xl">
                 <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-winf-border bg-transparent text-winf-text_muted text-[9px] font-bold uppercase tracking-[0.4em] mb-10">
                    {WINF_CONSTANTS.portfolio.badge}
                 </div>
                 <h2 className="text-6xl md:text-8xl font-black text-winf-text_primary tracking-tighter leading-[0.9] uppercase">{WINF_CONSTANTS.portfolio.title}</h2>
              </div>
              <div className="max-w-sm md:text-right pb-4">
                 <p className="text-winf-text_muted text-lg font-light leading-relaxed">{WINF_CONSTANTS.portfolio.subtitle}</p>
              </div>
           </div>

           {/* Tab Switcher */}
           <div className="flex flex-wrap gap-4 mb-16 border-b border-winf-border pb-8">
              {WINF_CONSTANTS.portfolio.lines.map((line) => (
                <button 
                  key={line.id}
                  onClick={() => setActiveLine(line.id)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all relative overflow-hidden ${
                    activeLine === line.id 
                      ? 'bg-winf-text_primary text-winf-background' 
                      : 'bg-winf-surface text-winf-text_muted hover:bg-winf-surface/80 hover:text-winf-text_primary'
                  }`}
                >
                  {line.name}
                  {activeLine === line.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-winf-primary" />
                  )}
                </button>
              ))}
           </div>

           <AnimatePresence mode="wait">
             <motion.div 
               key={activeLine}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="space-y-20"
             >
                {/* Line Header */}
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-winf-primary/10 text-winf-primary text-[8px] font-black uppercase tracking-[0.3em] rounded">
                      {WINF_CONSTANTS.portfolio.lines.find(l => l.id === activeLine)?.context}
                    </span>
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 text-winf-text_primary">
                    {WINF_CONSTANTS.portfolio.lines.find(l => l.id === activeLine)?.name}
                  </h3>
                  <p className="text-winf-text_muted text-lg font-light leading-relaxed">
                    {WINF_CONSTANTS.portfolio.lines.find(l => l.id === activeLine)?.desc}
                  </p>
                </div>

                {/* Line Items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {WINF_CONSTANTS.portfolio.lines.find(l => l.id === activeLine)?.items.length ? (
                    WINF_CONSTANTS.portfolio.lines.find(l => l.id === activeLine)?.items.map((item) => (
                      <FilmCard 
                        key={item.id}
                        item={item}
                        onSelect={() => {}}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-20 border border-dashed border-winf-border rounded-[40px] flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-winf-surface rounded-full flex items-center justify-center text-winf-text_muted/20 mb-6">
                        <Cpu size={32} />
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-widest text-winf-text_muted/40 mb-2">Engenharia em Processamento</h4>
                      <p className="text-winf-text_muted/20 text-sm font-light">As especificações técnicas desta linha serão liberadas em breve.</p>
                    </div>
                  )}
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </section>

      {/* Core AI */}
      <section id="ai" className="py-32 px-10 bg-winf-background border-t border-winf-border">
        <div className="max-w-[1500px] mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-winf-border bg-transparent text-winf-text_muted text-[9px] font-bold uppercase tracking-[0.4em] mb-10">
            <Database className="w-4 h-4 text-winf-text_primary" />
            <span>WINF CORE AI™</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-[0.9] text-winf-text_primary">
            O cérebro da operação.
          </h2>
          <p className="text-winf-text_muted text-lg font-light max-w-3xl mx-auto mb-20 leading-relaxed">
            Nossa infraestrutura na nuvem é orquestrada por agentes de inteligência artificial que qualificam leads, geram orçamentos, roteirizam instalações e distribuem demanda automaticamente para a rede.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'WINF CONCIERGE AI™', desc: 'Atendimento inicial, qualificação de leads e integração via WhatsApp.' },
              { title: 'WINF SALES AI™', desc: 'Apresentação técnica, geração de orçamentos e fechamento comercial.' },
              { title: 'WINF REGISTRY AI™', desc: 'Validação de dados e emissão automática de certificados e garantias.' }
            ].map((agent, i) => (
              <div key={i} className="bg-winf-surface border border-winf-border p-10 rounded-[40px] text-left hover:border-winf-primary/30 transition-all">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-winf-text_primary">{agent.title}</h3>
                <p className="text-winf-text_muted text-sm font-light leading-relaxed">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jornada do Cliente */}
      <section id="jornada" className="py-40 px-10 bg-winf-background border-t border-winf-border">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-winf-border bg-transparent text-winf-text_muted text-[9px] font-bold uppercase tracking-[0.4em] mb-10">
              {WINF_CONSTANTS.journey.badge}
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-winf-text_primary">{WINF_CONSTANTS.journey.title}</h2>
            <p className="text-winf-text_muted text-lg font-light leading-relaxed max-w-2xl mx-auto">{WINF_CONSTANTS.journey.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {WINF_CONSTANTS.journey.steps.map((step, idx) => {
              const Icon = ICON_MAP[step.icon];
              return (
                <div key={idx} className="p-8 border border-winf-border rounded-3xl bg-transparent hover:bg-winf-surface transition-all group">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-12 bg-winf-surface rounded-2xl flex items-center justify-center text-winf-text_primary group-hover:bg-winf-text_primary group-hover:text-winf-background transition-all border border-winf-border">
                      <Icon size={24} />
                    </div>
                    <span className="text-4xl font-black text-winf-text_muted/10">{step.id}</span>
                  </div>
                  <div className="text-[9px] font-bold text-winf-text_muted/40 uppercase tracking-[0.4em] mb-4">{step.status}</div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-winf-text_primary">{step.title}</h3>
                  <p className="text-winf-text_muted text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architects & Elite */}
      <section id="arquitetos" className="py-20 md:py-40 px-6 md:px-10 bg-winf-background border-t border-winf-border">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-winf-border bg-transparent text-winf-text_muted text-[9px] font-bold uppercase tracking-[0.4em] mb-8 md:mb-10">
                {WINF_CONSTANTS.architects.badge}
              </div>
              <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-winf-text_primary">{WINF_CONSTANTS.architects.title}</h2>
              <p className="text-winf-text_muted text-base md:text-lg font-light leading-relaxed mb-8 md:mb-12 max-w-lg">
                {WINF_CONSTANTS.architects.description}
              </p>
              <div className="space-y-6 md:space-y-8">
                {WINF_CONSTANTS.architects.resources.map((res, idx) => (
                  <div key={idx} className="flex gap-4 md:gap-6">
                    <div className="w-10 h-10 bg-winf-surface rounded-xl flex items-center justify-center text-winf-text_primary shrink-0 border border-winf-border">
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest mb-1 md:mb-2 text-winf-text_primary">{res.title}</h4>
                      <p className="text-winf-text_muted/40 text-[10px] md:text-xs font-light leading-relaxed">{res.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={onNavigateToAccess} className="mt-10 md:mt-12 bg-winf-text_primary text-winf-background px-8 md:px-10 py-3.5 md:py-4 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-winf-text_primary/90 transition-all">
                {WINF_CONSTANTS.architects.cta}
              </button>
              <button 
                onClick={() => setShowArchitectForm(true)}
                className="mt-4 block text-winf-text_muted/40 hover:text-winf-text_primary text-[8px] font-black uppercase tracking-[0.4em] transition-colors"
              >
                Cadastrar-se Gratuitamente no Portal
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {WINF_CONSTANTS.architects.tiers.map((tier, idx) => (
                <div key={idx} className={`p-6 md:p-10 border border-winf-border rounded-[30px] bg-winf-surface relative overflow-hidden group`}>
                  <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10 group-hover:opacity-20 transition-all">
                    <Shield size={60} className="md:w-20 md:h-20 text-winf-text_primary" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter mb-2 md:mb-4 text-winf-text_primary">{tier.name}</h3>
                    <p className="text-winf-text_muted text-xs md:text-sm font-light leading-relaxed max-w-xs">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architect Spec Generator */}
      <section id="architect-spec-generator" className="py-20 md:py-40 px-6 md:px-10 bg-winf-background border-t border-winf-border">
        <div className="max-w-[1500px] mx-auto">
          <ArchitectSpecGenerator onSpecChange={handleSpecChange} />
        </div>
      </section>

      {/* Film Visualizer */}
      <section id="film-visualizer" className="py-20 md:py-40 px-6 md:px-10 bg-winf-background border-t border-winf-border">
        <div className="max-w-[1500px] mx-auto">
          <FilmVisualizer />
        </div>
      </section>

      {/* Rede Operacional */}
      <section id="rede" className="py-20 md:py-40 px-6 md:px-10 bg-winf-background border-t border-winf-border">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-winf-border bg-transparent text-winf-text_muted text-[9px] font-bold uppercase tracking-[0.4em] mb-8 md:mb-10">
              {(WINF_CONSTANTS as any).operationalNetwork.badge}
            </div>
            <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 md:mb-8 uppercase text-winf-text_primary">{(WINF_CONSTANTS as any).operationalNetwork.title}</h2>
            <p className="text-winf-text_muted text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">{(WINF_CONSTANTS as any).operationalNetwork.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(WINF_CONSTANTS as any).operationalNetwork.models.map((model: any, idx: number) => (
              <div key={idx} className="p-8 border border-winf-border rounded-3xl bg-transparent hover:bg-winf-surface transition-all group">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-winf-text_primary">{model.name}</h3>
                <p className="text-winf-text_muted/40 text-sm font-light leading-relaxed mb-8">{model.desc}</p>
                <div className="space-y-3">
                  {model.features.map((feature: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-winf-text_muted/20 rounded-full"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-winf-text_muted/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulator" className="py-20 lg:py-40 px-6 lg:px-10 bg-winf-background border-t border-winf-border relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-winf-border bg-transparent text-winf-text_muted text-[9px] font-bold uppercase tracking-[0.4em] mb-8 lg:mb-10">
                WINF™ THERMAL SHIELD SIMULATOR
              </div>
              <h2 className="text-3xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6 lg:mb-10 uppercase text-winf-text_primary">
                Visualize a <span className="text-winf-primary italic">Eficiência</span> Molecular
              </h2>
              <p className="text-winf-text_muted text-base lg:text-xl font-light leading-relaxed mb-8 lg:mb-12 max-w-xl">
                Ajuste a intensidade da radiação solar e compare em tempo real como a tecnologia WINF™ mantém o equilíbrio térmico enquanto películas comuns falham.
              </p>

              <div className="space-y-8 md:space-y-12 bg-winf-surface p-6 md:p-10 rounded-[30px] md:rounded-[40px] border border-winf-border">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-winf-text_muted/40">Intensidade Solar (W/m²)</label>
                    <span className="text-2xl font-mono font-bold text-winf-primary">{sunIntensity * 10}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sunIntensity} 
                    onChange={(e) => setSunIntensity(parseInt(e.target.value))}
                    className="w-full h-1 bg-winf-border rounded-lg appearance-none cursor-pointer accent-winf-text_primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-red-500/60">
                      <Thermometer size={16} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Película Comum</span>
                    </div>
                    <div className="text-4xl font-black tracking-tighter text-winf-text_primary">{commonTemp}°C</div>
                    <div className="w-full h-1 bg-red-500/20 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: `${(commonTemp / 50) * 100}%` }}
                        className="h-full bg-red-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-winf-primary">
                      <Shield size={16} />
                      <span className="text-[9px] font-black uppercase tracking-widest">WINF™ Shield</span>
                    </div>
                    <div className="text-4xl font-black tracking-tighter text-winf-primary">{winfTemp}°C</div>
                    <div className="w-full h-1 bg-winf-primary/20 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: `${(winfTemp / 50) * 100}%` }}
                        className="h-full bg-winf-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-[60px] overflow-hidden border border-winf-border group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
              <div className="absolute inset-0 bg-winf-background/40"></div>
              
              {/* Heat Overlay */}
              <motion.div 
                animate={{ opacity: sunIntensity / 100 * 0.6 }}
                className="absolute inset-0 bg-gradient-to-t from-red-500/40 to-transparent mix-blend-overlay"
              />

              {/* Glass Comparison */}
              <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full border-r border-winf-border/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-500/10 backdrop-blur-[2px]"></div>
                  <div className="absolute top-10 left-10 text-[10px] font-black uppercase tracking-[0.4em] text-winf-text_primary/40">ZONA_VULNERÁVEL</div>
                </div>
                <div className="w-1/2 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-winf-primary/5 backdrop-blur-[10px]"></div>
                  <div className="absolute top-10 right-10 text-[10px] font-black uppercase tracking-[0.4em] text-winf-primary">ZONA_PROTEGIDA</div>
                  
                  {/* Scanning Line */}
                  <motion.div 
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-winf-primary/50 shadow-[0_0_20px_rgba(var(--winf-primary-rgb),0.5)]"
                  />
                </div>
              </div>

              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-8 py-4 bg-winf-background/80 backdrop-blur-xl border border-winf-border rounded-2xl">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-[8px] font-black text-winf-text_muted/40 uppercase tracking-widest mb-1">Redução IR</div>
                    <div className="text-xl font-black text-winf-text_primary">99.9%</div>
                  </div>
                  <div className="w-px h-8 bg-winf-border"></div>
                  <div className="text-center">
                    <div className="text-[8px] font-black text-winf-text_muted/40 uppercase tracking-widest mb-1">Bloqueio UV</div>
                    <div className="text-xl font-black text-winf-text_primary">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto">
          <SimulatorTechnicalCharts intensity={sunIntensity} filmId={architectSpec.filmId} area={architectSpec.area} />
        </div>
      </section>

      {/* Kiosk Retail Gallery Section */}
      <section className="py-20 lg:py-40 px-6 lg:px-10 bg-winf-background relative overflow-hidden border-t border-winf-border">
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 lg:mb-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-winf-border bg-transparent text-winf-primary text-[9px] font-bold uppercase tracking-[0.4em] mb-8">
                Visualização de Unidade
              </div>
              <h2 className="text-3xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase text-winf-text_primary">
                O Padrão <span className="text-winf-primary italic">Kiosk Retail</span>
              </h2>
              <p className="text-winf-text_muted/40 text-sm lg:text-lg font-light mt-6 uppercase tracking-widest">
                Ponto de venda ágil em locais de alto fluxo. Design compacto, baixo custo operacional e alta rotatividade.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Design Compacto", 
                img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2072&auto=format&fit=crop",
                tag: "ÁGIL"
              },
              { 
                title: "Atendimento Rápido", 
                img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2072&auto=format&fit=crop",
                tag: "FLUXO"
              },
              { 
                title: "Display Tecnológico", 
                img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2072&auto=format&fit=crop",
                tag: "VITRINE"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-winf-border"
              >
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-winf-background via-winf-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="inline-block px-3 py-1 bg-winf-primary/20 border border-winf-primary/30 rounded-full mb-4">
                    <span className="text-[8px] font-black text-winf-primary uppercase tracking-[0.3em]">{item.tag}</span>
                  </div>
                  <h3 className="text-2xl font-black text-winf-text_primary uppercase tracking-tighter">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AeroCore Studio Gallery Section */}
      <section className="py-20 lg:py-40 px-6 lg:px-10 bg-winf-background relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 lg:mb-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-winf-border bg-transparent text-winf-primary text-[9px] font-bold uppercase tracking-[0.4em] mb-8">
                Visualização de Unidade
              </div>
              <h2 className="text-3xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase text-winf-text_primary">
                O Padrão <span className="text-winf-primary italic">AeroCore™ Studio</span>
              </h2>
              <p className="text-winf-text_muted/40 text-sm lg:text-lg font-light mt-6 uppercase tracking-widest">
                A materialização do luxo automotivo e arquitetônico. Espaços projetados para performance e experiência imersiva.
              </p>
            </div>
            <div className="flex gap-4">
               <div className="text-right">
                  <p className="text-[8px] font-black text-winf-text_muted/20 uppercase tracking-[0.3em] mb-1">Status da Rede</p>
                  <p className="text-xs font-bold text-winf-text_primary uppercase tracking-widest">Expansão Global Ativa</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Lounge de Experiência", 
                img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2072&auto=format&fit=crop",
                tag: "EXCLUSIVO"
              },
              { 
                title: "Laboratório Técnico", 
                img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2072&auto=format&fit=crop",
                tag: "PRECISÃO"
              },
              { 
                title: "Showroom Select™", 
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2072&auto=format&fit=crop",
                tag: "ELITE"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative aspect-[4/5] rounded-[40px] overflow-hidden border border-winf-border"
              >
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-winf-background via-winf-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                <div className="absolute top-8 left-8">
                  <span className="px-3 py-1 bg-winf-surface/50 backdrop-blur-md border border-winf-border rounded-full text-[8px] font-black text-winf-text_primary uppercase tracking-widest">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute bottom-10 left-10 right-10">
                  <h4 className="text-2xl font-black text-winf-text_primary uppercase tracking-tighter mb-2">{item.title}</h4>
                  <div className="w-0 group-hover:w-full h-1 bg-winf-primary transition-all duration-700"></div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-10 md:p-16 bg-winf-surface/50 border border-winf-border rounded-[50px] flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-4xl font-black text-winf-text_primary uppercase tracking-tighter mb-4">Sua Unidade Projetada por IA</h3>
              <p className="text-winf-text_muted/40 text-sm font-light leading-relaxed uppercase tracking-widest">
                Utilizamos o AeroCore Architect AI™ para simular o fluxo operacional e a estética da sua futura franquia antes mesmo da primeira pedra ser colocada.
              </p>
            </div>
            <button 
              onClick={() => window.open('https://wa.me/5513999191510', '_blank')}
              className="px-12 py-6 bg-winf-text_primary text-winf-background font-black uppercase tracking-[0.3em] rounded-full hover:bg-winf-text_primary/90 transition-all shadow-[0_20px_50px_rgba(var(--winf-text_primary-rgb),0.1)]"
            >
              Consultar Viabilidade
            </button>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section id="lead-capture" className="py-20 lg:py-40 px-6 lg:px-10 bg-winf-background border-t border-winf-border relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-winf-primary/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-winf-border bg-transparent text-winf-text_muted text-[9px] font-bold uppercase tracking-[0.4em] mb-8 lg:mb-10">
                Protocolo de Início
              </div>
              <h2 className="text-3xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6 lg:mb-10 uppercase text-winf-text_primary">
                Inicie sua <span className="text-winf-primary italic">Transformação</span>
              </h2>
              <p className="text-winf-text_muted text-base lg:text-xl font-light leading-relaxed mb-8 lg:mb-12 max-w-xl">
                Nossos agentes de IA estão prontos para processar sua solicitação e rotear seu atendimento para a unidade de elite mais próxima.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, title: "Processamento Neural", desc: "Sua solicitação é analisada em tempo real pelo WINF CORE AI™." },
                  { icon: Zap, title: "Roteamento Inteligente", desc: "Conexão imediata com o parceiro certificado ideal para seu projeto." },
                  { icon: Target, title: "Atendimento de Elite", desc: "Padrão internacional de instalação e suporte técnico." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl border border-winf-border flex items-center justify-center bg-winf-surface group-hover:border-winf-primary/50 transition-all">
                      <item.icon size={20} className="text-winf-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest mb-1 text-winf-text_primary">{item.title}</h4>
                      <p className="text-winf-text_muted/40 text-xs font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-16 rounded-[30px] md:rounded-[40px] border border-winf-border bg-winf-surface/80 backdrop-blur-3xl relative overflow-hidden group/form scanline-overlay">
              <div className="scanline-overlay-line"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-winf-text_primary/5 to-transparent rounded-[30px] md:rounded-[40px] pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-winf-text_primary/20 to-transparent"></div>
              
              <form className="space-y-6 md:space-y-10 relative z-10" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const lead = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  interest: formData.get('interest'),
                  city: formData.get('city'),
                  source: 'Site Institucional'
                };
                addLead(lead).then(res => {
                  if (res.success) {
                    alert('Protocolo ativado. Nossos agentes estão processando seu perfil.');
                    (e.target as HTMLFormElement).reset();
                  }
                });
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3 group/input">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-winf-text_muted/30 ml-2 group-focus-within/input:text-winf-text_primary transition-colors">01_Identificação</label>
                    <input name="name" required className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-winf-text_primary/40 focus:bg-winf-text_primary/[0.05] transition-all placeholder:text-winf-text_primary/10 text-winf-text_primary" placeholder="NOME COMPLETO" />
                  </div>
                  <div className="space-y-3 group/input">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-winf-text_muted/30 ml-2 group-focus-within/input:text-winf-text_primary transition-colors">02_Comunicação</label>
                    <input name="phone" required className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-winf-text_primary/40 focus:bg-winf-text_primary/[0.05] transition-all placeholder:text-winf-text_primary/10 text-winf-text_primary" placeholder="WHATSAPP" />
                  </div>
                </div>

                <div className="space-y-3 group/input">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-winf-text_muted/30 ml-2 group-focus-within/input:text-winf-text_primary transition-colors">03_Endpoint Digital</label>
                  <input name="email" type="email" required className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-winf-text_primary/40 focus:bg-winf-text_primary/[0.05] transition-all placeholder:text-winf-text_primary/10 text-winf-text_primary" placeholder="E-MAIL CORPORATIVO" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3 group/input">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-winf-text_muted/30 ml-2 group-focus-within/input:text-winf-text_primary transition-colors">04_Geolocalização</label>
                    <input name="city" required className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-winf-text_primary/40 focus:bg-winf-text_primary/[0.05] transition-all placeholder:text-winf-text_primary/10 text-winf-text_primary" placeholder="CIDADE / ESTADO" />
                  </div>
                  <div className="space-y-3 group/input">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-winf-text_muted/30 ml-2 group-focus-within/input:text-winf-text_primary transition-colors">05_Vetor de Interesse</label>
                    <div className="relative">
                      <select name="interest" className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-xl px-6 py-5 text-sm focus:outline-none focus:border-winf-text_primary/40 focus:bg-winf-text_primary/[0.05] transition-all appearance-none cursor-pointer uppercase tracking-widest text-winf-text_primary">
                        <option className="bg-winf-surface">WINF SELECT™ (ARQUITETURA)</option>
                        <option className="bg-winf-surface">WINF AEROCORE™ (AUTOMOTIVO)</option>
                        <option className="bg-winf-surface">WINF WHITELINE™ (DESIGN)</option>
                        <option className="bg-winf-surface">SEJA UM PARCEIRO LICENCIADO</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 text-winf-text_primary">
                        <Activity size={14} />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full bg-winf-text_primary text-winf-background py-5 md:py-7 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] hover:bg-winf-text_primary/90 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)] active:scale-[0.98] relative overflow-hidden group/btn">
                  <span className="relative z-10">Ativar Protocolo de Atendimento</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-winf-background/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contato & Footer */}
      <footer id="contato" className="py-20 md:py-32 bg-winf-background border-t border-winf-border">
         <div className="max-w-[1500px] mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20 pb-20 md:pb-32 border-b border-winf-border">
               <div className="max-w-xl">
                  <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-8 md:mb-10 text-winf-text_primary">{WINF_CONSTANTS.contact.title}</h2>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={sendToWhatsApp} className="bg-winf-text_primary text-winf-background px-10 py-4 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-winf-text_primary/90 transition-all">
                       {WINF_CONSTANTS.contact.cta}
                    </button>
                    <button onClick={onNavigateToAccess} className="bg-transparent border border-winf-border text-winf-text_primary px-10 py-4 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-winf-surface transition-all">
                       Acesso ao Ecossistema
                    </button>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div>
                     <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-winf-text_muted/40 mb-6">Comunicação Direta</h4>
                     <div className="space-y-4">
                        <a href={`tel:${WINF_CONSTANTS.contact.phone}`} className="flex items-center gap-4 text-winf-text_muted/80 hover:text-winf-text_primary transition-colors group">
                           <div className="w-10 h-10 rounded-full border border-winf-border flex items-center justify-center group-hover:bg-winf-text_primary group-hover:text-winf-background transition-all"><Phone size={14} /></div>
                           <span className="text-sm font-mono tracking-widest">{WINF_CONSTANTS.contact.phone}</span>
                        </a>
                        <a href={`mailto:${WINF_CONSTANTS.contact.email}`} className="flex items-center gap-4 text-winf-text_muted/80 hover:text-winf-text_primary transition-colors group">
                           <div className="w-10 h-10 rounded-full border border-winf-border flex items-center justify-center group-hover:bg-winf-text_primary group-hover:text-winf-background transition-all"><Mail size={14} /></div>
                           <span className="text-sm font-mono tracking-widest">{WINF_CONSTANTS.contact.email}</span>
                        </a>
                     </div>
                  </div>
                  <div>
                     <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-winf-text_muted/40 mb-6">Headquarters</h4>
                     <div className="flex items-start gap-4 text-winf-text_muted/80">
                        <div className="w-10 h-10 rounded-full border border-winf-border flex items-center justify-center shrink-0"><MapPin size={14} /></div>
                        <span className="text-sm font-mono tracking-widest leading-relaxed">{WINF_CONSTANTS.contact.location}</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-winf-text_primary flex items-center justify-center">
                     <span className="text-winf-background font-black text-lg tracking-tighter">W</span>
                  </div>
                  <span className="font-black text-2xl tracking-tighter uppercase text-winf-text_primary">{WINF_CONSTANTS.header.logo}</span>
               </div>
               <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-winf-text_muted/40 text-center md:text-right">
                  {WINF_CONSTANTS.footer.copyright}
               </p>
            </div>
         </div>
      </footer>

      {/* Architect Registration Modal */}
      <AnimatePresence>
        {showArchitectForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowArchitectForm(false)}
              className="absolute inset-0 bg-winf-background/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-winf-surface border border-winf-border rounded-[40px] p-12 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-winf-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-winf-text_primary/5 rounded-full text-winf-text_muted/40 text-[8px] font-black uppercase tracking-widest mb-4">
                    <Building2 size={10} /> Architect Portal Access
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-winf-text_primary">Cadastro <span className="text-winf-text_muted/40">Gratuito.</span></h2>
                </div>
                <button onClick={() => setShowArchitectForm(false)} className="p-2 hover:bg-winf-text_primary/5 rounded-full transition-colors text-winf-text_muted/20 hover:text-winf-text_primary">
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                setIsVerifying(true);
                
                // Simulação de Verificação de Autenticidade
                setTimeout(() => {
                  const lead = {
                    ...architectFormData,
                    interest: 'WINF SELECT™ (ARQUITETURA)',
                    source: 'Portal do Arquiteto (Cadastro Verificado)'
                  };
                  addLead(lead).then(res => {
                    setIsVerifying(false);
                    if (res.success) {
                      alert('AUTENTICIDADE VERIFICADA. Cadastro realizado com sucesso. Você receberá o acesso ao Portal Select Pro em breve.');
                      setShowArchitectForm(false);
                      setArchitectFormData({ name: '', email: '', cau: '', city: '', phone: '', office: '' });
                    }
                  });
                }, 2500);
              }}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/30 ml-2">Nome Completo</label>
                      <input 
                        required
                        value={architectFormData.name}
                        onChange={e => setArchitectFormData({...architectFormData, name: e.target.value})}
                        className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-winf-text_primary/40 transition-all placeholder:text-winf-text_primary/5 text-winf-text_primary" 
                        placeholder="EX: ARQ. GABRIEL MOURA" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/30 ml-2">Escritório / Empresa</label>
                      <input 
                        required
                        value={architectFormData.office}
                        onChange={e => setArchitectFormData({...architectFormData, office: e.target.value})}
                        className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-winf-text_primary/40 transition-all placeholder:text-winf-text_primary/5 text-winf-text_primary" 
                        placeholder="NOME DO ESCRITÓRIO" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/30 ml-2">E-mail Profissional</label>
                      <input 
                        required
                        type="email"
                        value={architectFormData.email}
                        onChange={e => setArchitectFormData({...architectFormData, email: e.target.value})}
                        className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-winf-text_primary/40 transition-all placeholder:text-winf-text_primary/5 text-winf-text_primary" 
                        placeholder="EMAIL@ESCRITORIO.COM" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/30 ml-2">WhatsApp (Verificação)</label>
                      <input 
                        required
                        value={architectFormData.phone}
                        onChange={e => setArchitectFormData({...architectFormData, phone: e.target.value})}
                        className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-winf-text_primary/40 transition-all placeholder:text-winf-text_primary/5 text-winf-text_primary" 
                        placeholder="(00) 00000-0000" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/30 ml-2">CAU / Registro Profissional</label>
                      <div className="relative">
                        <input 
                          required
                          value={architectFormData.cau}
                          onChange={e => setArchitectFormData({...architectFormData, cau: e.target.value})}
                          className="w-full bg-winf-text_primary/[0.02] border border-winf-primary/30 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-winf-primary transition-all placeholder:text-winf-text_primary/5 font-mono tracking-widest text-winf-text_primary" 
                          placeholder="A00000-0" 
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <UserCheck size={14} className="text-winf-primary opacity-50" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/30 ml-2">Cidade / UF</label>
                      <input 
                        required
                        value={architectFormData.city}
                        onChange={e => setArchitectFormData({...architectFormData, city: e.target.value})}
                        className="w-full bg-winf-text_primary/[0.02] border border-winf-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-winf-text_primary/40 transition-all placeholder:text-winf-text_primary/5 text-winf-text_primary" 
                        placeholder="EX: SÃO PAULO - SP" 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isVerifying}
                  className={`w-full py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl mt-4 flex items-center justify-center gap-3 ${
                    isVerifying ? 'bg-winf-surface text-winf-text_primary/40 cursor-wait' : 'bg-winf-text_primary text-winf-background hover:bg-winf-text_primary/90'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <Activity size={16} className="animate-pulse text-winf-primary" />
                      Verificando Autenticidade...
                    </>
                  ) : (
                    'Solicitar Acesso Imediato'
                  )}
                </button>
                
                <div className="p-4 bg-winf-primary/5 border border-winf-primary/10 rounded-xl">
                  <p className="text-[8px] text-winf-primary text-center uppercase tracking-widest leading-relaxed font-bold">
                    * Sistema AeroCore™ Architect AI: Verificamos a validade do registro profissional 
                    para garantir a integridade técnica do ecossistema Select Pro.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-10 left-10 z-[90]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://wa.me/5513999191510', '_blank')}
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(37,211,102,0.3)] relative group"
        >
          <div className="absolute -inset-2 bg-[#25D366]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <MessageCircle size={28} />
        </motion.button>
      </div>

      {/* Neuromesh AI Floating Chat */}
      <div className="fixed bottom-10 right-10 z-[90]">
        <AnimatePresence>
          {aiOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-[350px] md:w-[450px] h-[600px] bg-winf-surface/95 backdrop-blur-2xl border border-winf-border rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden scanline-overlay"
            >
              <div className="scanline-overlay-line"></div>
              {/* Chat Header */}
              <div className="p-6 border-b border-winf-border flex items-center justify-between bg-winf-text_primary/5 relative z-20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-winf-text_primary flex items-center justify-center text-winf-background">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-winf-text_primary">NEUROMESH.AI™</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[8px] font-bold text-winf-text_muted/40 uppercase tracking-widest">Core Processing Active</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => window.open('https://wa.me/5513999191510', '_blank')} 
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-full transition-all group/wa"
                  >
                    <MessageCircle size={14} className="group-hover/wa:scale-110 transition-transform" />
                    <span className="text-[8px] font-black uppercase tracking-widest hidden sm:block">Falar com Humano</span>
                  </button>
                  <button onClick={() => setAiOpen(false)} className="p-2 hover:bg-winf-text_primary/10 rounded-full transition-colors text-winf-text_primary">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-20">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed font-mono ${
                      msg.role === 'ai' 
                        ? 'bg-winf-text_primary/5 border border-winf-border text-winf-text_primary/80' 
                        : 'bg-winf-text_primary text-winf-background font-bold ml-auto'
                    }`}>
                      {msg.role === 'ai' && <div className="text-[8px] font-black text-winf-primary mb-2 tracking-[0.3em] uppercase">NEUROMESH_CORE_V5.0</div>}
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-winf-text_primary/5 border border-winf-border p-4 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-winf-text_primary/40 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-winf-text_primary/40 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1 h-1 bg-winf-text_primary/40 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Actions / WhatsApp Link */}
              <div className="px-6 py-2 border-t border-winf-border bg-winf-text_primary/[0.02] flex justify-center">
                <button 
                  onClick={() => window.open('https://wa.me/5513999191510', '_blank')}
                  className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-green-500 hover:text-green-400 transition-colors"
                >
                  <MessageCircle size={12} />
                  Não encontrou o que procurava? Fale com um especialista
                </button>
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-winf-border bg-winf-text_primary/5 relative z-20">
                <div className="relative">
                  <input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="PROCESSAR COMANDO..."
                    className="w-full bg-winf-background/50 border border-winf-border rounded-xl px-6 py-4 text-xs font-mono focus:outline-none focus:border-winf-text_primary/40 transition-all placeholder:text-winf-text_primary/10 text-winf-text_primary"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-winf-text_primary text-winf-background rounded-lg hover:bg-winf-text_primary/90 transition-all"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAiOpen(!aiOpen)}
          className="w-16 h-16 bg-winf-text_primary text-winf-background rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group"
        >
          <div className="absolute -inset-2 bg-winf-text_primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {aiOpen ? <X size={24} /> : <Bot size={24} />}
        </motion.button>
      </div>
    </div>
  );
};

export default InstitutionalSite;
