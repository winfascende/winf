
import React, { useState } from 'react';
import { ChevronLeft, Zap, Store, Box, Smartphone, LayoutGrid, Award, CheckCircle, Play, Activity, ArrowUpRight, TrendingUp, ShieldCheck, Cpu, Monitor, Scissors, X, MessageSquare, Star, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WINF_CONSTANTS } from '../constants';

interface LandingKioskProps {
  onBack: () => void;
  onActivate?: () => void;
}

const LandingKiosk: React.FC<LandingKioskProps> = ({ onBack, onActivate }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [modalType, setModalType] = useState<'invite' | 'service'>('invite');

  const handleCtaClick = (type: 'invite' | 'service' = 'invite') => {
    setModalType(type);
    setShowInviteModal(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[80] border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl h-20 md:h-24 flex items-center">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 w-full flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-10">
            <button onClick={onBack} className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><ChevronLeft size={20} className="md:w-6 md:h-6" /></button>
            <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => { window.scrollTo(0,0); }}>
                <span className="font-black tracking-tighter text-xl md:text-2xl uppercase">Winf™ PARTNERS</span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
            <button className="hover:text-white transition-colors">A Marca</button>
            <button className="hover:text-white transition-colors">Licenciamentos</button>
            <button className="hover:text-white transition-colors">Kiosks</button>
            <button className="hover:text-white transition-colors">Franquias</button>
          </div>

          <button onClick={handleCtaClick} className="hidden sm:block bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-white/90 transition-all">
            Portal
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-center grayscale opacity-30 contrast-125"
             style={{ backgroundImage: `url(${(WINF_CONSTANTS as any).assets.kiosk})` }}
           />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,#050505_100%)]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505]"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6 md:px-8 animate-fade-in flex flex-col items-center">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-8 md:mb-12">
              <ShieldCheck size={12} /> EXPANSÃO POR CONVITE • EXCLUSIVO ADVANCED
           </div>
           <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 md:mb-10 uppercase">
              RETAIL<br/>
              MACHINE.
           </h1>
           <p className="text-white/40 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12 md:mb-16">
              O Winf™ Kiosk é uma oportunidade estratégica de varejo, disponível exclusivamente para licenciados <span className="text-white font-bold">Advanced</span> e <span className="text-white font-bold">Enterprise</span> via convite direto.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center w-full sm:w-auto">
             <button onClick={() => handleCtaClick('service')} className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all text-center">
                Solicitar Atendimento Exclusivo
             </button>
           </div>
        </div>
      </header>

      {/* Componentes do Dossiê Técnico (CAPEX Details) */}
      <section className="py-32 bg-[#020202] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center mb-20">
            <h2 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.4em] mb-4">Engenharia do Ativo</h2>
            <h3 className="text-4xl font-heading font-light text-white">O QUE ESTÁ <span className="font-bold">INCLUSO.</span></h3>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#080808] border border-white/5 p-10 rounded-2xl group hover:border-white/40 transition-all">
                <Box size={32} className="text-white mb-6" />
                <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-widest">Projeto Modular</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Estrutura de alumínio aeroespacial anodizado, iluminação LED dinâmica e mobiliário planejado para 12m².</p>
            </div>
            <div className="bg-[#080808] border border-white/5 p-10 rounded-2xl group hover:border-white/40 transition-all">
                <Monitor size={32} className="text-white mb-6" />
                <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-widest">Winf™ PARTNERS Kiosk Ed.</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Terminal touch 24" com software de gestão em tempo real, CRM de atendimento e checkout PIX integrado.</p>
            </div>
            <div className="bg-[#080808] border border-white/5 p-10 rounded-2xl group hover:border-white/40 transition-all">
                <Scissors size={32} className="text-white mb-6" />
                <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-widest">W-Cut Hardware</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Plotter de precisão micronizada para corte de películas protetoras de gadgets sob demanda (Zero desperdício).</p>
            </div>
        </div>
      </section>

      {/* Investment Table */}
      <section className="py-40 bg-[#050505] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-light mb-24">ESTRUTURA DE <span className="font-bold text-white">INVESTIMENTO</span></h2>
            
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-16 shadow-2xl">
                <div className="text-left space-y-6 flex-1">
                    <p className="text-white/50 font-bold uppercase tracking-[0.4em] text-xs">Total Capex Estimado</p>
                    <h2 className="text-7xl font-bold text-white tracking-tighter">R$ 120k</h2>
                    <p className="text-gray-500 text-sm max-w-sm">Valor turnkey: projeto, hardware, software, treinamento e estoque inicial estratégico.</p>
                </div>
                
                <div className="w-px h-40 bg-white/5 hidden md:block"></div>

                <div className="flex-1 w-full space-y-4">
                    <div className="flex justify-between items-center p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <span className="text-xs text-amber-500 uppercase tracking-widest font-bold">Status</span>
                        <span className="text-white font-mono font-bold flex items-center gap-2"><Lock size={12}/> INVITE ONLY</span>
                    </div>
                    <button onClick={() => handleCtaClick('invite')} className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/90 transition-all shadow-xl">
                        Solicitar Convite
                    </button>
                    <p className="text-[9px] text-white/20 uppercase tracking-widest mt-4">
                        Apenas para membros Advanced/Enterprise.
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
                  {modalType === 'invite' ? <Store size={32} /> : <MessageSquare size={32} />}
                </div>

                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">
                  {modalType === 'invite' ? 'Expansão de Varejo' : 'Consultoria de Ativo'}
                </h3>

                <p className="text-white/40 text-sm font-light leading-relaxed mb-10">
                  {modalType === 'invite' 
                    ? 'A implantação de Winf™ Kiosks em shoppings e centros comerciais é uma oportunidade estratégica restrita a licenciados qualificados.'
                    : 'Agende uma conversa com nosso time de expansão para analisar o potencial de faturamento da sua região e os requisitos técnicos.'}
                </p>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 mt-1">
                      <ShieldCheck size={14} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Elegibilidade</h4>
                      <p className="text-white/20 text-[10px] uppercase tracking-widest">Exclusivo para membros Advanced ou Enterprise.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 mt-1">
                      <Zap size={14} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Interação Ativa</h4>
                      <p className="text-white/20 text-[10px] uppercase tracking-widest">Convites liberados conforme seu desempenho no ecossistema.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 mt-1">
                      <Star size={14} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-1">Turnkey Solution</h4>
                      <p className="text-white/20 text-[10px] uppercase tracking-widest">Entrega completa: do projeto à operação faturando.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (onActivate) {
                      onActivate();
                      setShowInviteModal(false);
                    } else {
                      alert('Interesse registrado no Protocolo de Expansão. Nosso time entrará em contato.');
                      setShowInviteModal(false);
                    }
                  }}
                  className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-white/90 transition-all"
                >
                  Confirmar Protocolo
                </button>
              </div>

              {/* Background Decorative Element */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="py-20 text-center border-t border-white/5">
        <p className="text-[10px] text-gray-700 uppercase tracking-[0.5em]">Winf™ PARTNERS // Retail Excellence Division © 2025</p>
      </footer>
    </div>
  );
};

export default LandingKiosk;
