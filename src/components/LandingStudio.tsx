
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Diamond, Globe, Cpu, Target, Layers, Sparkles, CheckCircle, Lock, Crown, Upload, Wand2, RefreshCw, Camera, ScanLine, Maximize2, ShieldCheck, AlertTriangle, Building2, TrendingUp, X, MessageSquare, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { WINF_CONSTANTS } from '../constants';

interface LandingStudioProps {
  onBack: () => void;
  onActivate?: () => void;
}

// --- DIRETRIZES VISUAIS AEROCORE ---
const WINF_ARCH_PROMPT = `
  TRANSFORMAÇÃO ARQUITETÔNICA - ESTILO AEROCORE™:
  Transforme esta fachada comercial em uma Flagship Store automotiva de ultra-luxo futurista da marca 'WINF'.
  ESTILO: Cyberpunk Clean, Dark Luxury, High-Tech.
`;

const STUDIO_SHOWCASE = [
  {
    id: 1,
    title: "FRANQUIA ALPHA",
    location: "São Paulo, BR (Flagship)",
    specs: "800m² • 6 Bays • Customer Lounge",
    image: (WINF_CONSTANTS as any).assets.aerocoreStudio
  },
  {
    id: 2,
    title: "STUDIO BETA",
    location: "Balneário Camboriú, BR",
    specs: "450m² • Glass Box • LED Tunnel",
    image: (WINF_CONSTANTS as any).assets.aerocoreMulti
  }
];

const CONCEPT_GALLERY = [
  {
    title: "Cyberpunk Flagship",
    desc: "Fachada em vidro negro com iluminação LED dinâmica e bays de alta performance.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Industrial Luxury",
    desc: "Conceito loft com concreto aparente, estruturas metálicas e foco em estética automotiva.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Minimalist Studio",
    desc: "Linhas limpas, iluminação zenital e ambiente asséptico para aplicações de precisão.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Tech Experience",
    desc: "Showroom integrado com realidade aumentada e lounge de experiência para o cliente.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1000"
  }
];

const LandingStudio: React.FC<LandingStudioProps> = ({ onBack, onActivate }) => {
  const [facadeImage, setFacadeImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [modalType, setModalType] = useState<'invite' | 'service'>('invite');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCtaClick = (type: 'invite' | 'service' = 'invite') => {
    setModalType(type);
    setShowInviteModal(true);
  };

  const handleSimulateDesign = async () => {
    if (!facadeImage) return;
    setIsGenerating(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const facadeBase64 = facadeImage.split(',')[1];
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ inlineData: { mimeType: 'image/png', data: facadeBase64 } }, { text: WINF_ARCH_PROMPT }] }
        });
        if (response.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            setGeneratedImage(`data:image/png;base64,${response.candidates[0].content.parts[0].inlineData.data}`);
        }
    } catch (e) { console.error(e); } finally { setIsGenerating(false); }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800/30 overflow-x-hidden">
      
      {/* Navigation - System Command Bar */}
      <nav className="fixed top-6 left-0 right-0 z-[80] transition-all duration-500 flex justify-center px-4">
        <div className={`relative w-full max-w-[1400px] border border-white/5 rounded-[32px] overflow-hidden transition-all duration-700 ${isMenuOpen ? 'bg-[#050505] h-[85vh]' : 'bg-[#050505]/80 backdrop-blur-2xl h-16 md:h-20 shadow-[0_20px_40px_rgba(0,0,0,0.5)]'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="relative h-16 md:h-20 px-4 md:px-10 w-full flex justify-between items-center z-10">
            <div className="flex items-center gap-2 md:gap-8 shrink-0">
              <button 
                onClick={onBack} 
                className="text-zinc-500 hover:text-white transition-colors p-1.5 md:p-2 hover:bg-white/5 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}>
                  <span className="font-black tracking-tighter text-base md:text-xl uppercase italic shrink-0">WINF™</span>
                  <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                    <span className="text-[7px] font-black text-white/40 uppercase tracking-widest hidden md:block">STUDIO MASTER</span>
                  </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">
              <button onClick={() => { onBack(); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">A Marca</button>
              <button onClick={() => { onBack(); }} className="hover:text-white transition-colors">Licenciamentos</button>
              <button onClick={() => { window.history.back(); }} className="hover:text-white transition-colors">Kiosks</button>
              <button className="text-white font-black">Franquias</button>
            </div>

            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <button onClick={() => handleCtaClick()} className="hidden sm:block bg-white text-black px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all">
                Portal
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-9 h-9 md:w-10 md:h-10 flex flex-col items-center justify-center gap-1 md:gap-1.5 rounded-full bg-white/5 border border-white/10 lg:hidden"
              >
                <motion.div 
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-4 md:w-5 h-0.5 bg-white origin-center transition-all"
                />
                <motion.div 
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-4 md:w-5 h-0.5 bg-white transition-all"
                />
                <motion.div 
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-4 md:w-5 h-0.5 bg-white origin-center transition-all"
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pt-20 flex flex-col p-6 bg-black z-[60]"
              >
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar py-4">
                  {[
                    { name: 'A Marca', onClick: () => { onBack(); setIsMenuOpen(false); } },
                    { name: 'Licenciamentos', onClick: () => { onBack(); setIsMenuOpen(false); } },
                    { name: 'Kiosks', onClick: () => { window.history.back(); setIsMenuOpen(false); } },
                    { name: 'Franquias', active: true }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => { if(item.onClick) item.onClick(); else setIsMenuOpen(false); }}
                      className={`text-2xl md:text-4xl font-black uppercase tracking-tighter text-left py-4 border-b border-white/5 ${item.active ? 'text-white italic' : 'text-zinc-700 hover:text-white transition-colors'}`}
                    >
                      {item.name}
                    </button>
                  ))}
                  <button onClick={() => { handleCtaClick(); setIsMenuOpen(false); }} className="mt-8 bg-white text-black px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest text-center">Portal do Parceiro</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-center grayscale opacity-30 contrast-125"
             style={{ backgroundImage: `url(${(WINF_CONSTANTS as any).assets.studio})` }}
           />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,#050505_100%)]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505]"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6 md:px-8 animate-fade-in flex flex-col items-center">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-8 md:mb-12">
              <Lock size={12} /> APENAS POR CONVITE • EXCLUSIVO PARA LICENCIADOS
           </div>
           <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 md:mb-10 uppercase">
              FRANQUIA<br/>
              FLAGSHIP.
           </h1>
           <p className="text-white/40 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12 md:mb-16">
              O Studio AeroCore™ é a materialização do luxo automotivo. Uma oportunidade restrita a membros do ecossistema <span className="text-white font-bold">Advanced</span> e <span className="text-white font-bold">Enterprise</span>.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center w-full sm:w-auto">
             <button onClick={() => handleCtaClick('invite')} className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all text-center">
                Solicitar Convite de Expansão
             </button>
             <button onClick={() => handleCtaClick('service')} className="w-full sm:w-auto border border-white/20 text-white px-10 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all text-center">
                Atendimento Exclusivo
             </button>
           </div>
        </div>
      </header>

      {/* --- DESIGN AI SIMULATOR --- */}
      <section className="py-32 bg-[#020202] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-white/40 uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2">
                    <Cpu size={16} /> AeroCore Architect AI™
                </h2>
                <h3 className="text-4xl md:text-5xl font-light text-white mb-6">
                    A SUA FRANQUIA <span className="font-bold">PROJETADA.</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <div 
                        className={`aspect-video rounded-xl border-2 border-dashed ${facadeImage ? 'border-white/50' : 'border-white/10'} flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:border-white/30`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {facadeImage ? <img src={facadeImage} className="w-full h-full object-cover opacity-60" /> : <div className="text-center"><Camera size={32} className="text-gray-400 mx-auto mb-2" /><p className="text-xs text-gray-500">Upload de Fachada</p></div>}
                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if(f) { const r = new FileReader(); r.onload = () => setFacadeImage(r.result as string); r.readAsDataURL(f); } }} />
                    </div>
                    <button onClick={handleSimulateDesign} disabled={!facadeImage || isGenerating} className="w-full py-5 bg-white text-black font-bold text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 rounded-sm disabled:opacity-50 hover:bg-white/90 transition-all">
                        {isGenerating ? <><ScanLine size={16} className="animate-spin" /> Processando...</> : <><Wand2 size={16} /> Simular Flagship</>}
                    </button>
                </div>
                <div className="aspect-video rounded-xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                    {generatedImage ? <img src={generatedImage} className="w-full h-full object-cover animate-fade-in" /> : <p className="text-[10px] uppercase font-bold tracking-widest text-gray-700">Aguardando Input</p>}
                </div>
            </div>

            {/* Concept Gallery */}
            <div className="mt-32">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h4 className="text-[10px] font-black text-winf-primary uppercase tracking-[0.4em] mb-4">Galeria de Conceitos</h4>
                        <h5 className="text-3xl font-bold text-white uppercase tracking-tighter">Modelos de Estúdios <span className="text-white/20">AeroCore™</span></h5>
                    </div>
                    <p className="text-xs text-white/40 max-w-md md:text-right uppercase tracking-widest leading-relaxed">
                        Exploração visual de arquitetura de alta performance para licenciados que buscam o próximo nível de presença física.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CONCEPT_GALLERY.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900"
                        >
                            <img 
                                src={item.image} 
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                            <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h6 className="text-sm font-black text-white uppercase tracking-widest mb-2">{item.title}</h6>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
                <div>
                    <h2 className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em] mb-4">Portfólio de Franquias</h2>
                    <h3 className="text-4xl md:text-6xl font-heading font-light text-white uppercase">Studios <span className="font-bold text-gray-500">Operacionais.</span></h3>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {STUDIO_SHOWCASE.map((studio) => (
                    <div key={studio.id} className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                        <img src={studio.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <h4 className="text-2xl font-bold text-white mb-2">{studio.title}</h4>
                            <p className="text-sm text-gray-400 mb-1">{studio.location}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{studio.specs}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* The Black Card Section */}
      <section className="py-40 bg-black border-t border-white/5 relative overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
                <h3 className="text-4xl font-light text-white mb-10 leading-tight">Vantagem de <br/><span className="font-bold text-white">Franqueado Master</span></h3>
                <div className="space-y-12">
                    {[
                        { title: 'Território Blindado', desc: 'Exclusividade total na sua região metropolitana.', icon: Globe },
                        { title: 'Dossiê Universo Dark', desc: 'Dados confidenciais de expansão e equity do grupo.', icon: Layers },
                        { title: 'Lucratividade de Elite', desc: 'Margens de serviço que podem superar 300%.', icon: TrendingUp },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                            <div className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-white/5 transition-all">
                                <item.icon size={24} />
                            </div>
                            <div>
                                <h4 className="text-2xl text-white font-bold mb-3">{item.title}</h4>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl blur-[80px]"></div>
                <div className="bg-[#050505] border border-amber-500/20 rounded-xl p-16 relative z-10 flex flex-col items-center text-center shadow-2xl">
                    <div className="w-20 h-20 rounded-full bg-black border border-amber-500/30 flex items-center justify-center mb-10">
                        <Lock size={32} className="text-amber-500" />
                    </div>
                    <p className="text-xs font-bold text-amber-500/60 uppercase tracking-[0.3em] mb-6">Acesso Restrito</p>
                    <h2 className="font-heading font-bold text-white mb-4 tracking-tighter text-7xl uppercase">INVITE <br/>ONLY</h2>
                    <div className="w-16 h-1 bg-amber-500 rounded-full mb-10 shadow-[0_0_20px_rgba(245,158,11,0.4)]"></div>
                    <button onClick={() => handleCtaClick('invite')} className="w-full py-5 bg-amber-500 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-amber-400 transition-all">
                        Solicitar Convite
                    </button>
                    <p className="mt-6 text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">
                        Disponível apenas para licenciados Advanced/Enterprise ativos.
                    </p>
                </div>
            </div>
         </div>
      </section>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInviteModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#080808] border border-white/10 rounded-[32px] p-8 md:p-16 overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <div className="absolute top-0 right-0 p-6 md:p-8 z-20">
                <button onClick={() => setShowInviteModal(false)} className="text-white/20 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 mb-10">
                  {modalType === 'invite' ? <Crown size={32} /> : <MessageSquare size={32} />}
                </div>

                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">
                  {modalType === 'invite' ? 'Protocolo de Expansão' : 'Atendimento Exclusivo'}
                </h3>

                <p className="text-white/40 text-sm font-light leading-relaxed mb-10">
                  {modalType === 'invite' 
                    ? 'A Franquia Flagship Winf™ é um ativo de alta performance restrito. O acesso é concedido via convite direto ou análise de mérito para licenciados Advanced/Enterprise.'
                    : 'Solicite um atendimento personalizado com nosso board de expansão para entender o modelo de negócio e os requisitos de elegibilidade.'}
                </p>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 mt-1">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Pré-requisito</h4>
                      <p className="text-white/20 text-[10px] uppercase tracking-widest">Licenciamento Advanced ou Enterprise ativo.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 mt-1">
                      <Zap size={14} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Análise de Mérito</h4>
                      <p className="text-white/20 text-[10px] uppercase tracking-widest">Convites automáticos baseados em suas interações na plataforma.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 mt-1">
                      <Star size={14} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Suporte VIP</h4>
                      <p className="text-white/20 text-[10px] uppercase tracking-widest">Acompanhamento direto para estruturação da sua Flagship.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (onActivate) {
                      onActivate();
                      setShowInviteModal(false);
                    } else {
                      alert('Solicitação enviada com sucesso. Aguarde o contato do nosso Board.');
                      setShowInviteModal(false);
                    }
                  }}
                  className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-white/90 transition-all"
                >
                  Confirmar Interesse
                </button>
              </div>

              {/* Background Decorative Element */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingStudio;
