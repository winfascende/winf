
import React, { useState } from 'react';
import { ChevronLeft, Zap, Store, Box, Smartphone, LayoutGrid, Award, CheckCircle, Play, Activity, ArrowUpRight, TrendingUp, ShieldCheck, Cpu, Monitor, Scissors, X, MessageSquare, Star, Lock, Building2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WINF_CONSTANTS } from '../constants';

interface LandingKioskProps {
  onBack: () => void;
  onActivate?: () => void;
}

const LandingKiosk: React.FC<LandingKioskProps> = ({ onBack, onActivate }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [modalType, setModalType] = useState<'invite' | 'service'>('invite');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCtaClick = (type: 'invite' | 'service' = 'invite') => {
    setModalType(type);
    setShowInviteModal(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/30 overflow-x-hidden">
      
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
                    <span className="text-[7px] font-black text-white/40 uppercase tracking-widest hidden md:block">RETAIL MACHINE</span>
                  </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">
              <button onClick={() => { onBack(); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">A Marca</button>
              <button onClick={() => { onBack(); }} className="hover:text-white transition-colors">Licenciamentos</button>
              <button className="text-white font-black">Kiosks</button>
              <button className="hover:text-white transition-colors">Franquias</button>
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
                    { name: 'Kiosks', active: true },
                    { name: 'Franquias', onClick: () => { setIsMenuOpen(false); } }
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
             className="absolute inset-0 bg-cover bg-center grayscale opacity-40 contrast-125"
             style={{ backgroundImage: `url(${(WINF_CONSTANTS as any).assets.kioskArchitecture})` }}
           />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,#050505_100%)]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505]"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6 md:px-8 animate-fade-in flex flex-col items-center">
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-winf-primary/30 bg-winf-primary/5 text-winf-primary text-[9px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12">
              <Building2 size={12} /> ARQUITETURA DE ALTO PADRÃO • EXCLUSIVO WINF™
           </div>
           <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 md:mb-10 uppercase italic">
              EXPERIÊNCIA<br/>
              IMERSIVA.
           </h1>
           <p className="text-white/40 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12 md:mb-16">
              O Winf™ Kiosk Architecture é o epicentro da tecnologia de proteção solar. Um ponto de demonstração exclusivo onde o luxo encontra a engenharia molecular para transformar ambientes residenciais e industriais.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center w-full sm:w-auto">
             <button onClick={() => handleCtaClick('service')} className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all text-center shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                Agendar Consultoria Técnica
             </button>
           </div>
        </div>
      </header>

      {/* Discovery Section - Key Deliverables */}
      <section className="py-40 bg-[#020202] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center mb-24">
            <h2 className="text-[10px] font-black text-winf-primary uppercase tracking-[0.5em] mb-4">Núcleo de Experiência</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-light text-white uppercase tracking-tighter">O ECOSSISTEMA <span className="font-bold">INCLUSIVO.</span></h3>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                icon: Cpu, 
                title: "WINF™ OS Integrado", 
                desc: "Terminal touch para agendamento instantâneo de visitas, registro de medidas e upload de fotos do projeto." 
              },
              { 
                icon: Monitor, 
                title: "Simulação VR", 
                desc: "Realidade virtual imersiva que permite ao cliente visualizar a transformação do ambiente antes da aplicação." 
              },
              { 
                icon: Activity, 
                title: "Teste de Eficiência", 
                desc: "Demonstração real de calor e rejeição IR, provando a performance superior das películas Select™." 
              },
              { 
                icon: Box, 
                title: "Packaging Elite", 
                desc: "Apresentação física de amostras, embalagens exclusivas e liners premium para escolha do acabamento." 
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[32px] hover:bg-white/10 hover:border-white/30 transition-all duration-500 group">
                <feature.icon size={32} className="text-winf-primary mb-8 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">{feature.title}</h4>
                <p className="text-gray-500 text-[11px] leading-relaxed uppercase tracking-wider">{feature.desc}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Visual Proof Section */}
      <section className="py-40 bg-[#050505] relative">
         <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
                <img 
                  src={(WINF_CONSTANTS as any).assets.beforeAfter01} 
                  className="w-full h-auto rounded-[40px] shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000"
                  alt="Architectural Result"
                  referrerPolicy="no-referrer"
                />
            </div>
            <div className="lg:w-1/2 space-y-10">
                <div className="inline-block px-4 py-2 bg-winf-primary/10 border border-winf-primary/20 rounded-full">
                    <span className="text-[10px] font-black text-winf-primary uppercase tracking-widest">Performance Architectural</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                  DOMINÂNCIA <br/> TÉRMICA.
                </h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  Não vendemos películas para celular. Entregamos soluções de alta engenharia para quem exige conforto absoluto. O Kiosk é o ponto de contato onde a visita técnica é formalizada com precisão molecular.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/5">
                   <div>
                      <div className="text-3xl font-black text-white">Select™</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Tecnologia Americana</div>
                   </div>
                   <div>
                      <div className="text-3xl font-black text-white">White™</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Estética Decorativa</div>
                   </div>
                </div>
            </div>
         </div>
      </section>

      {/* Operational Model Section */}
      <section className="py-40 bg-[#020202] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-16 rounded-[48px] overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Users size={200} />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-8">MODELO DE OPERAÇÃO DE ELITE</h2>
                    <p className="text-gray-400 mb-12 text-lg">
                      Cada Kiosk conta com um administrador centralizado que orquestra uma rede de <span className="text-white font-bold">2 ou mais aplicadores autorizados WINF™</span>, formalizados para prestação de serviço de alto nível no shopping. 
                      <br/><br/>
                      Membros do nível <span className="text-white font-bold italic underline">SELECT</span> podem se qualificar para atuar na ponta da prestação de serviço, servindo como o braço técnico da Unidade de Varejo.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgb(34,197,94)]"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Aprovação Shopping</span>
                        </div>
                        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgb(34,197,94)]"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Instaladores de Elite</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Immersive Gallery Section */}
      <section className="py-40 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
            <h2 className="text-[10px] font-black text-winf-primary uppercase tracking-[0.5em] mb-4">Galeria de Ativos</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-light text-white uppercase tracking-tighter">PREENÇA EM <span className="font-bold italic">LUXO.</span></h3>
        </div>
        
        <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar px-6 md:px-20 pb-20">
          {[
            { img: (WINF_CONSTANTS as any).assets.kiosk, label: "Interface de Atendimento" },
            { img: (WINF_CONSTANTS as any).assets.kioskVR, label: "Imersão VR" },
            { img: (WINF_CONSTANTS as any).assets.kioskArchitecture, label: "Engenharia em Tela" },
            { img: (WINF_CONSTANTS as any).assets.kioskImmersive, label: "Atendimento Consultivo" },
            { img: (WINF_CONSTANTS as any).assets.kioskPackaging, label: "Exclusividade Select™" }
          ].map((item, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 relative group shrink-0">
               <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
               <div className="absolute bottom-10 left-10">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{item.label}</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investment Summary */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-20">
                <h3 className="text-[10px] font-black text-winf-primary uppercase tracking-[0.5em] mb-4">Investimento Turnkey</h3>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter">R$ 120.000</h2>
                <p className="text-gray-500 text-[10px] md:text-sm mt-6 uppercase tracking-widest leading-relaxed">Projeto, Hardware Imersivo, Software WINF OS e Treinamento Master.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20 max-w-2xl mx-auto">
                <div className="flex-1 p-6 rounded-3xl border border-white/5 bg-white/5">
                    <p className="text-[10px] font-black text-white/40 mb-2 uppercase tracking-widest">Payback Est.</p>
                    <p className="text-2xl font-black text-white uppercase tracking-tighter">12 a 18 Meses</p>
                </div>
                <div className="flex-1 p-6 rounded-3xl border border-white/5 bg-white/5">
                    <p className="text-[10px] font-black text-white/40 mb-2 uppercase tracking-widest">Modelo</p>
                    <p className="text-2xl font-black text-white uppercase tracking-tighter">Turnkey Elite</p>
                </div>
            </div>
            
            <button onClick={() => handleCtaClick('invite')} className="w-full py-6 bg-white text-black font-black text-xs uppercase tracking-[0.5em] rounded-full hover:scale-[1.02] transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] mb-6">
                Solicitar Reserva de Território
            </button>
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest">Exclusivo para membros Advanced e Enterprise selecionados.</p>
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
