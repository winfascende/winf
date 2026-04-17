import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Sun, 
  Thermometer, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Phone, 
  MessageSquare,
  ChevronLeft,
  Activity,
  Cpu,
  Layers,
  ArrowUpRight,
  PlayCircle,
  Download,
  Factory,
  Globe2,
  MessageCircle,
  Bot,
  X,
  Send,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WINF_CONSTANTS } from '../constants';
import FilmVisualizer from './FilmVisualizer';
import SimulatorTechnicalCharts from './SimulatorTechnicalCharts';
import { GoogleGenAI } from "@google/genai";

interface PublicConsultancyProps {
  partnerName?: string;
  partnerPhone?: string;
  onBack?: () => void;
}

const LUXURY_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
];

const PublicConsultancy: React.FC<PublicConsultancyProps> = ({ 
  partnerName = "WINF™ Oficial", 
  partnerPhone = "5513999191510",
  onBack
}) => {
  const [sunIntensity, setSunIntensity] = useState(85);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Olá. Sou o Neuromesh AI™, assistente virtual da WINF™. Como posso ajudar no seu projeto hoje?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [filmId, setFilmId] = useState('select-pro');
  const [area, setArea] = useState(50);

  const commonTemp = Math.round(20 + (sunIntensity * 0.21));
  const winfTemp = Math.round(20 + (sunIntensity * 0.035));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Você é o Neuromesh AI, assistente virtual da WINF (marca de películas de alta performance). Responda de forma curta, técnica e premium. O usuário perguntou: ${userMsg}`
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'Processamento concluído.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sistemas ocupados. Por favor, contate um especialista humano.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % LUXURY_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sendToWhatsApp = () => {
    const msg = encodeURIComponent(`Olá! Estou visualizando a consultoria digital da WINF™ e gostaria de mais informações sobre a proteção molecular.`);
    window.open(`https://wa.me/${partnerPhone}?text=${msg}`, '_blank');
  };

  const FilmCard = ({ item }: any) => {
    const assetUrl = (WINF_CONSTANTS as any).assets?.[item.id] || `https://picsum.photos/seed/${item.id}/800/600`;

    return (
      <motion.div 
        whileHover={{ y: -12, scale: 1.02 }}
        className="bg-winf-surface border border-winf-border rounded-[30px] md:rounded-[40px] overflow-hidden group hover:border-winf-primary/50 transition-all duration-700 flex flex-col h-full relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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
             <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-winf-text_muted">WINF™ SELECT SERIES</span>
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
          <p className="text-winf-text_muted text-sm md:text-base leading-relaxed font-light group-hover:text-winf-text_primary transition-colors duration-500 mb-6 md:mb-10">{item.desc}</p>
          
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
            onClick={sendToWhatsApp}
            className="w-full py-5 bg-winf-background border border-winf-border text-winf-text_primary rounded-[24px] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-winf-primary hover:text-winf-background hover:border-winf-primary hover:shadow-[0_0_30px_rgba(var(--winf-primary-rgb),0.4)] transition-all duration-500 mt-auto flex items-center justify-center gap-3 active:scale-95"
          >
             Solicitar Orçamento <ArrowRight size={14} />
          </button>
        </div>
        
        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-winf-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </motion.div>
    );
  };

  // Filter only Select and White lines for the end customer
  const customerLines = WINF_CONSTANTS.portfolio.lines.filter(
    line => line.id === 'select' || line.id === 'select-white'
  );
  
  const [activeLine, setActiveLine] = useState(customerLines[0]?.id);

  return (
    <div className="min-h-screen bg-winf-background text-winf-text_primary font-sans selection:bg-winf-primary/20 overflow-x-hidden relative">
      
      {/* Film Grain Noise Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Global Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(to right, var(--winf-text_primary) 1px, transparent 1px), linear-gradient(to bottom, var(--winf-text_primary) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      {/* Header */}
      <nav className="fixed top-0 w-full z-[80] border-b border-winf-border bg-winf-background/80 backdrop-blur-xl h-20 flex items-center">
        <div className="max-w-[1500px] mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            {onBack && (
              <button onClick={onBack} className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <ChevronLeft size={20} />
              </button>
            )}
            <div className="flex items-center gap-2">
                <span className="font-black tracking-tighter text-xl uppercase">WINF™</span>
                <span className="w-1.5 h-1.5 bg-winf-primary rounded-full animate-pulse"></span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-4">
              <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">Consultoria por:</span>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">{partnerName}</span>
            </div>
            <button onClick={sendToWhatsApp} className="bg-white text-black px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all">
              Falar Agora
            </button>
          </div>
        </div>
      </nav>

      {/* Hero / Intro */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,#050505_80%)]"></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-winf-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-transparent text-winf-primary text-[9px] font-black uppercase tracking-[0.4em] mb-8"
          >
            CONSULTORIA DIGITAL EXCLUSIVA
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 uppercase"
          >
            A Ciência da <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/20">Proteção Térmica.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-12"
          >
            Bem-vindo à sua experiência de consultoria personalizada. Explore como a tecnologia molecular WINF™ transforma o conforto do seu ambiente, reduzindo calor e bloqueando raios UV sem perder a transparência.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Testar Simulador
            </button>
            <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all">
              Ver Catálogo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Ultra Luxury Carousel & Dark Factory Section */}
      <section className="py-20 px-6 bg-[#050505] relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Carousel */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={LUXURY_IMAGES[currentImageIndex]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Arquitetura de Alto Padrão"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 mb-2">Envidraçamento Ultra Luxury</p>
                <p className="text-white text-lg font-light">Proteção invisível para fachadas de alto padrão.</p>
              </div>
            </div>

            {/* Dark Factory Content */}
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-transparent text-white/40 text-[9px] font-bold uppercase tracking-[0.4em] mb-8">
                ORIGEM & TECNOLOGIA
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] mb-8 uppercase">
                O Estado da Arte em <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/20">Nanotecnologia.</span>
              </h2>
              <p className="text-white/60 text-base font-light leading-relaxed mb-10">
                Nossas películas são desenvolvidas sob o conceito <strong className="text-white font-bold">Dark Factory</strong> — fábricas 100% automatizadas onde a precisão robótica substitui a intervenção humana, garantindo zero defeitos operacionais.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.02]">
                  <Globe2 className="text-winf-primary mb-4" size={24} />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Estados Unidos</h3>
                  <p className="text-xs text-white/40 leading-relaxed">Origem das patentes, engenharia de materiais e polímeros de alta performance.</p>
                </div>
                <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.02]">
                  <Factory className="text-winf-primary mb-4" size={24} />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">China</h3>
                  <p className="text-xs text-white/40 leading-relaxed">Manufatura de precisão em instalações Dark Factory de última geração.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulator" className="py-20 lg:py-40 px-6 lg:px-10 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-transparent text-white/40 text-[9px] font-bold uppercase tracking-[0.4em] mb-8 lg:mb-10">
                WINF™ THERMAL SHIELD SIMULATOR
              </div>
              <h2 className="text-3xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6 lg:mb-10 uppercase text-white">
                Visualize a <span className="text-winf-primary italic">Eficiência</span> Molecular
              </h2>
              <p className="text-white/60 text-base lg:text-xl font-light leading-relaxed mb-8 lg:mb-12 max-w-xl">
                Ajuste a intensidade da radiação solar e compare em tempo real como a tecnologia WINF™ mantém o equilíbrio térmico enquanto películas comuns falham.
              </p>

              <div className="space-y-8 md:space-y-12 bg-white/[0.02] p-6 md:p-10 rounded-[30px] md:rounded-[40px] border border-white/5">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Intensidade Solar (W/m²)</label>
                    <span className="text-2xl font-mono font-bold text-winf-primary">{sunIntensity * 10}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sunIntensity} 
                    onChange={(e) => setSunIntensity(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-red-500/60">
                      <Thermometer size={16} />
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">Película Comum</span>
                    </div>
                    <div className="text-3xl md:text-4xl font-black tracking-tighter text-white">{commonTemp}°C</div>
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
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">WINF™ Shield</span>
                    </div>
                    <div className="text-3xl md:text-4xl font-black tracking-tighter text-winf-primary">{winfTemp}°C</div>
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

            <div className="relative aspect-square rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Heat Overlay */}
              <motion.div 
                animate={{ opacity: sunIntensity / 100 * 0.6 }}
                className="absolute inset-0 bg-gradient-to-t from-red-500/40 to-transparent mix-blend-overlay"
              />

              {/* Glass Comparison */}
              <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full border-r border-white/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-500/10 backdrop-blur-[2px]"></div>
                  <div className="absolute top-6 md:top-10 left-4 md:left-10 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/40">ZONA_VULNERÁVEL</div>
                </div>
                <div className="w-1/2 h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-winf-primary/5 backdrop-blur-[10px]"></div>
                  <div className="absolute top-6 md:top-10 right-4 md:right-10 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-winf-primary">ZONA_PROTEGIDA</div>
                  
                  {/* Scanning Line */}
                  <motion.div 
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-winf-primary/50 shadow-[0_0_20px_rgba(var(--winf-primary-rgb),0.5)]"
                  />
                </div>
              </div>

              <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-[90%] md:w-auto px-4 md:px-8 py-3 md:py-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="flex items-center justify-center gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="text-[7px] md:text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Redução IR</div>
                    <div className="text-lg md:text-xl font-black text-white">99.9%</div>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-[7px] md:text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Bloqueio UV</div>
                    <div className="text-lg md:text-xl font-black text-white">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto mt-20">
          <SimulatorTechnicalCharts intensity={sunIntensity} filmId={filmId} area={area} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">Por que escolher a WINF™?</h2>
            <p className="text-white/40 text-lg font-light max-w-2xl mx-auto">
              Tecnologia desenvolvida para oferecer o máximo de conforto sem alterar a estética da sua fachada.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Thermometer, title: "Conforto Térmico", desc: "Redução drástica do calor interno, diminuindo a necessidade de ar-condicionado." },
              { icon: Sun, title: "Bloqueio UV", desc: "Proteção de 99% contra os raios UV, evitando o desbotamento de móveis e pisos." },
              { icon: Shield, title: "Garantia Oficial", desc: "Instalação certificada com garantia de até 10 anos, rastreável digitalmente." }
            ].map((benefit, idx) => (
              <div key={idx} className="p-8 border border-white/5 rounded-3xl bg-[#080808] hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6">
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{benefit.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Lineup (Filtered for Customers) */}
      <section id="portfolio" className="py-32 px-6 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">Catálogo de Soluções</h2>
            <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
              Conheça nossas linhas exclusivas para arquitetura residencial e corporativa.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {customerLines.map((line) => (
              <button 
                key={line.id}
                onClick={() => setActiveLine(line.id)}
                className={`px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2 ${
                  activeLine === line.id 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                }`}
              >
                {line.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeLine}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {customerLines.find(l => l.id === activeLine)?.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {customerLines.find(l => l.id === activeLine)?.items.map((item) => (
                  <FilmCard key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-20 text-center">
            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-transparent text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all">
              <Download size={16} /> Baixar Catálogo Completo (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Film Visualizer (Gallery) */}
      <section id="film-visualizer" className="py-20 md:py-40 px-6 md:px-10 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1500px] mx-auto">
          <FilmVisualizer />
        </div>
      </section>

      {/* VSL Section */}
      <section className="py-20 md:py-40 px-6 md:px-10 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[800px] md:h-[800px] bg-winf-primary/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-transparent text-white/40 text-[9px] font-bold uppercase tracking-[0.4em] mb-8">
            WINF™ MASTERCLASS
          </div>
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-12 text-white">
            A Verdade Sobre <span className="text-winf-primary italic">Proteção Solar</span>
          </h2>
          
          <div className="relative aspect-video rounded-[20px] md:rounded-[40px] overflow-hidden border border-white/10 bg-black shadow-2xl group cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-winf-primary/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(var(--winf-primary-rgb),0.5)] group-hover:scale-110 transition-transform">
                <PlayCircle size={32} className="ml-1 md:ml-2 md:w-10 md:h-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-transparent text-white/40 text-[9px] font-bold uppercase tracking-[0.4em] mb-8">
                SOBRE A WINF™
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-8 text-white leading-[1.1]">
                Engenharia de <br/><span className="text-winf-primary italic">Alta Performance.</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-6">
                A WINF™ nasceu para redefinir o padrão global de proteção solar e segurança arquitetônica. Não somos apenas distribuidores de películas; somos desenvolvedores de nanotecnologia.
              </p>
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8">
                Nossas instalações são executadas exclusivamente por uma rede de elite certificada, garantindo que a performance do produto em laboratório seja exatamente a mesma entregue na sua fachada.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">10+</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mt-1">Anos de Garantia</div>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white">100%</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mt-1">Dark Factory</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-[30px] md:rounded-[40px] overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="WINF About" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 text-white">Dúvidas Frequentes</h2>
            <p className="text-white/40 text-base md:text-lg font-light">Tudo o que você precisa saber sobre a tecnologia WINF™.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "As películas WINF™ escurecem o ambiente?", a: "Não necessariamente. Nossa linha WINF Select™ utiliza nanocerâmica para bloquear o calor (IR) e os raios UV sem a necessidade de escurecer o vidro, mantendo a transparência e a luminosidade natural do ambiente." },
              { q: "Qual a durabilidade do material?", a: "Nossas películas de alta performance possuem garantia oficial de até 10 anos contra desbotamento, descascamento e perda de eficiência térmica, registrada digitalmente via WINF OS™." },
              { q: "Como funciona a instalação?", a: "A instalação é realizada exclusivamente por nossa rede de parceiros certificados (WINF Authorized Glass Techs™), garantindo aplicação perfeita, sem bolhas ou imperfeições, com padrão de excelência internacional." },
              { q: "A película ajuda na economia de energia?", a: "Sim. Ao bloquear até 99% da energia solar rejeitada (calor), o ambiente interno permanece mais fresco, reduzindo drasticamente o esforço e o consumo de energia do ar-condicionado." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className="font-bold text-xs md:text-sm uppercase tracking-widest text-white pr-4">{faq.q}</span>
                  <ChevronLeft className={`text-white/40 transition-transform shrink-0 ${openFaq === idx ? '-rotate-90' : 'rotate-180'}`} size={20} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-white/60 text-xs md:text-sm font-light leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-16 border-b border-white/10">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-winf-primary flex items-center justify-center">
                  <span className="text-black font-black text-lg tracking-tighter">W</span>
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase text-white">WINF™</span>
              </div>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-8">
                A primeira marca de películas de alta performance a integrar nanotecnologia, software e inteligência artificial em um ecossistema único.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"><Instagram size={16} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"><Youtube size={16} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"><Linkedin size={16} /></a>
              </div>
            </div>

            <div className="text-left md:text-right w-full md:w-auto">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-white">Pronto para transformar seu ambiente?</h3>
              <button onClick={sendToWhatsApp} className="w-full md:w-auto bg-winf-primary text-black px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-winf-primary/90 transition-all shadow-[0_0_30px_rgba(var(--winf-primary-rgb),0.3)]">
                Falar com Consultor
              </button>
            </div>
          </div>

          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20 text-center md:text-left">
              © {new Date().getFullYear()} WINF™ DIGITAL CONSULTANCY // {partnerName}
            </p>
            <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">
              <a href="#" className="hover:text-white/60 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white/60 transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[90]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendToWhatsApp}
          className="w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(37,211,102,0.3)] relative group"
        >
          <div className="absolute -inset-2 bg-[#25D366]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        </motion.button>
      </div>

      {/* Neuromesh AI Floating Chat */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90]">
        <AnimatePresence>
          {aiOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-16 md:bottom-20 right-0 w-[calc(100vw-48px)] sm:w-[350px] md:w-[450px] h-[500px] md:h-[600px] max-h-[80vh] bg-[#080808]/95 backdrop-blur-2xl border border-white/10 rounded-[24px] md:rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative z-20 shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white flex items-center justify-center text-black">
                    <Bot size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-white">NEUROMESH.AI™</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[7px] md:text-[8px] font-bold text-white/40 uppercase tracking-widest">Core Processing Active</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setAiOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                    <X size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 custom-scrollbar relative z-20">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-[10px] md:text-xs leading-relaxed font-mono ${
                      msg.role === 'ai' 
                        ? 'bg-white/5 border border-white/10 text-white/80' 
                        : 'bg-white text-black font-bold ml-auto'
                    }`}>
                      {msg.role === 'ai' && <div className="text-[7px] md:text-[8px] font-black text-winf-primary mb-2 tracking-[0.3em] uppercase">NEUROMESH_CORE_V5.0</div>}
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 md:p-6 border-t border-white/10 bg-white/5 relative z-20 shrink-0">
                <div className="relative">
                  <input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="PROCESSAR COMANDO..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-mono focus:outline-none focus:border-white/40 transition-all placeholder:text-white/20 text-white"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all"
                  >
                    <Send size={12} className="md:w-3.5 md:h-3.5" />
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
          className="w-14 h-14 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(255,255,255,0.2)] relative group"
        >
          <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {aiOpen ? <X className="w-6 h-6 md:w-7 md:h-7" /> : <Bot className="w-6 h-6 md:w-7 md:h-7" />}
        </motion.button>
      </div>

    </div>
  );
};

export default PublicConsultancy;
