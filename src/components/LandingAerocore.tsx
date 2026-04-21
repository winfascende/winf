import React, { useEffect, useState } from 'react';
import { Shield, ChevronRight, Lock, Eye, Award, Globe, Headphones, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingAerocore: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sua solicitação foi recebida. Analisaremos seu perfil e entraremos em contato em caso de aprovação.');
    setShowInviteModal(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Funcionalidade de login será implementada na integração com o backend.');
    setShowLoginModal(false);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-zinc-300 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Navbar Minimalist */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={onBack}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col">
              <span className="text-white font-black tracking-[0.3em] text-lg leading-none">AEROCORE<span className="text-xs align-top">™</span></span>
              <span className="text-[8px] text-zinc-500 tracking-[0.4em] uppercase">Elite Stealth Technology</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              Já possui convite?
            </button>
            <button 
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all"
            >
              <Lock size={12} /> Solicitar Acesso
            </button>
          </div>
        </div>
      </nav>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInviteModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-12 w-full max-w-lg mx-4 rounded-sm"
            >
              <button 
                onClick={() => setShowInviteModal(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-[0.1em] mb-2">Solicitar Acesso Exclusivo</h3>
                <p className="text-sm text-zinc-500">AEROCORE™ é restrito. Preencha seus dados para análise de perfil.</p>
              </div>

              <form onSubmit={handleInviteSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Nome Completo</label>
                  <input type="text" required className="w-full bg-[#050505] border border-white/10 p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Email (Corporativo ou Pessoal)</label>
                  <input type="email" required className="w-full bg-[#050505] border border-white/10 p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Empresa (Opcional)</label>
                  <input type="text" className="w-full bg-[#050505] border border-white/10 p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Veículo / Aeronave (Ex: Porsche 911 GT3)</label>
                  <input type="text" className="w-full bg-[#050505] border border-white/10 p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                </div>
                
                <button type="submit" className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors mt-4">
                  Enviar Solicitação
                </button>

                <div className="text-center pt-4 border-t border-white/5 mt-6">
                  <p className="text-xs text-zinc-500">
                    Já possui um convite? {' '}
                    <button type="button" onClick={() => { setShowInviteModal(false); setShowLoginModal(true); }} className="text-white hover:underline transition-all">
                      Fazer Login
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-12 w-full max-w-md mx-4 rounded-sm"
            >
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8 text-center space-y-4">
                <Lock size={32} className="text-white/20 mx-auto" />
                <h3 className="text-xl font-black text-white uppercase tracking-[0.1em]">Acesso Restrito</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">Insira suas credenciais Aerocore™</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Email de Acesso</label>
                  <input type="email" required className="w-full bg-[#050505] border border-white/10 p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Password Key</label>
                  <input type="password" required className="w-full bg-[#050505] border border-white/10 p-4 text-white focus:outline-none focus:border-white/30 transition-colors font-mono tracking-widest text-lg" />
                </div>
                
                <button type="submit" className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors mt-4 flex justify-center items-center gap-2">
                  <Lock size={14} /> Desbloquear
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614165936126-2ed18e471b3b?auto=format&fit=crop&q=80" 
            alt="Aerocore Background" 
            className="w-full h-full object-cover opacity-20 filter grayscale blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center space-y-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block border border-white/10 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full mb-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">Exclusividade Absoluta</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none"
          >
            AEROCORE<span className="text-zinc-500 font-light text-4xl align-top">™</span>
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-3xl text-zinc-400 font-light tracking-[0.2em] uppercase"
          >
            Elite Stealth Technology
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-zinc-500 mt-8"
          >
            AEROCORE™ representa o ápice da tecnologia de proteção solar, desenvolvida originalmente para aplicações militares classificadas e agora disponível exclusivamente para um seleto grupo de clientes por convite.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-zinc-500"
          >
            Nossa tecnologia proprietária oferece proteção invisível com performance superior comprovada, garantindo durabilidade excepcional e estética impecável para os veículos, aeronaves e embarcações mais exclusivos do mundo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-12"
          >
            <button 
              onClick={() => setShowInviteModal(true)}
              className="bg-zinc-800 text-white border border-zinc-700 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center gap-4 mx-auto"
            >
              <Lock size={16} /> Solicitar Convite <ChevronRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Differentials Grid */}
      <section className="py-32 border-t border-white/5 bg-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
            {/* Cell 1 */}
            <div className="bg-[#050505] p-12 space-y-6 hover:bg-[#0a0a0a] transition-colors">
              <Shield className="w-8 h-8 text-zinc-600" />
              <h3 className="text-white text-sm font-bold uppercase tracking-widest">LIFETIME GUARANTEE™</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Garantia vitalícia em todos os produtos, transferível para o próximo proprietário.
              </p>
            </div>
            {/* Cell 2 */}
            <div className="bg-[#050505] p-12 space-y-6 hover:bg-[#0a0a0a] transition-colors">
              <Zap className="w-8 h-8 text-zinc-600" />
              <h3 className="text-white text-sm font-bold uppercase tracking-widest">TECNOLOGIA MILITAR</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Desenvolvida originalmente para aplicações militares classificadas de alta performance.
              </p>
            </div>
            {/* Cell 3 */}
            <div className="bg-[#050505] p-12 space-y-6 hover:bg-[#0a0a0a] transition-colors">
              <Eye className="w-8 h-8 text-zinc-600" />
              <h3 className="text-white text-sm font-bold uppercase tracking-widest">NANOTECNOLOGIA INVISÍVEL</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Proteção molecular avançada praticamente imperceptível mesmo sob inspeção detalhada.
              </p>
            </div>
            {/* Cell 4 */}
            <div className="bg-[#050505] p-12 space-y-6 hover:bg-[#0a0a0a] transition-colors">
              <Lock className="w-8 h-8 text-zinc-600" />
              <h3 className="text-white text-sm font-bold uppercase tracking-widest">ACESSO RESTRITO</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Disponível exclusivamente por convite para um seleto grupo de clientes.
              </p>
            </div>
            {/* Cell 5 */}
            <div className="bg-[#050505] p-12 space-y-6 hover:bg-[#0a0a0a] transition-colors">
              <Award className="w-8 h-8 text-zinc-600" />
              <h3 className="text-white text-sm font-bold uppercase tracking-widest">CERTIFICAÇÃO GLOBAL</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Certificada pelos mais rigorosos padrões internacionais de qualidade e performance.
              </p>
            </div>
            {/* Cell 6 */}
            <div className="bg-[#050505] p-12 space-y-6 hover:bg-[#0a0a0a] transition-colors">
              <Headphones className="w-8 h-8 text-zinc-600" />
              <h3 className="text-white text-sm font-bold uppercase tracking-widest">SUPORTE PREMIUM</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Atendimento personalizado 24/7 em qualquer lugar do mundo para nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Universe Section */}
      <section className="py-32 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-6">Universo Aerocore™</h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              O universo AEROCORE™ abrange uma linha completa de soluções de proteção para os mais exclusivos veículos, aeronaves, embarcações e residências de alto padrão, garantindo performance superior e estética impecável em qualquer aplicação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <UniverseCard 
              image="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80"
              title="Automotive Elite"
              desc="Proteção invisível para veículos de ultra-luxo, com tecnologia de auto-regeneração avançada e proteção UV superior."
            />
            <UniverseCard 
              image="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80"
              title="Aircraft Stealth"
              desc="Desenvolvida especificamente para aeronaves executivas, oferecendo proteção térmica e UV excepcional em grandes altitudes."
            />
            <UniverseCard 
              image="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80"
              title="Marine Shield"
              desc="Proteção superior contra os elementos marinhos mais agressivos, preservando o acabamento de embarcações de luxo."
            />
            <UniverseCard 
              image="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
              title="Glass + Home"
              desc="Solução arquitetônica premium para residências e edifícios de alto padrão, oferecendo conforto térmico e privacidade."
            />
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-32 bg-black border-t border-white/5 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <span className="text-[10px] text-zinc-500 tracking-[0.4em] uppercase border border-white/10 px-4 py-1.5 rounded-full">Especificações Técnicas</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase">Performance<br/>Suprema</h2>
              <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed">
                <p>
                  A tecnologia AEROCORE™ representa o estado da arte em proteção solar, oferecendo performance incomparável em todos os aspectos mensuráveis.
                </p>
                <p>
                  Com rejeição de até 99,9% dos raios UV e IR, nossa tecnologia proprietária garante conforto térmico excepcional e proteção contra desbotamento, preservando o interior dos veículos, aeronaves e embarcações mais exclusivos do mundo.
                </p>
                <p>
                  A estrutura molecular avançada proporciona claridade óptica superior, sem distorções ou interferências na visibilidade, mesmo em condições de baixa luminosidade.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-white text-xs tracking-widest uppercase mb-4">Aplicação Exclusiva</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  A aplicação dos produtos AEROCORE™ é realizada exclusivamente por técnicos certificados, que passam por um rigoroso processo de treinamento e certificação para garantir a perfeição em cada instalação.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10 w-1/3"></div>
              <img 
                src="https://images.unsplash.com/photo-1620800683072-466a9f738fe2?auto=format&fit=crop&q=80" 
                alt="Molecular Technology" 
                className="w-full h-[600px] object-cover grayscale opacity-50 rounded-lg"
              />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 z-20 space-y-4">
                <div className="bg-[#050505]/90 backdrop-blur border border-white/10 p-6 flex items-center gap-4 w-72">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Bloqueio IR</div>
                    <div className="text-white font-mono text-xl">99.9%</div>
                  </div>
                </div>
                <div className="bg-[#050505]/90 backdrop-blur border border-white/10 p-6 flex items-center gap-4 w-72 ml-8">
                  <div className="w-2 h-2 bg-zinc-600 rounded-full"></div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Proteção UV</div>
                    <div className="text-white font-mono text-xl">99.9%</div>
                  </div>
                </div>
                <div className="bg-[#050505]/90 backdrop-blur border border-white/10 p-6 flex items-center gap-4 w-72 ml-16">
                  <div className="w-2 h-2 bg-zinc-800 rounded-full"></div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Distorção Óptica</div>
                    <div className="text-white font-mono text-xl">0.00%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="border-y border-white/5 bg-[#0a0a0a] py-8 overflow-hidden">
        <div className="flex justify-center flex-wrap gap-8 md:gap-16 items-center max-w-[1400px] mx-auto px-6 text-[10px] md:text-xs text-zinc-600 uppercase tracking-widest font-black">
          <span className="hover:text-white transition-colors cursor-default">Veículo Automotivo</span>
          <span className="hidden md:inline text-zinc-800">X</span>
          <span className="hover:text-white transition-colors cursor-default">Aeronave Executiva</span>
          <span className="hidden md:inline text-zinc-800">X</span>
          <span className="hover:text-white transition-colors cursor-default">Embarcação de Luxo</span>
          <span className="hidden md:inline text-zinc-800">X</span>
          <span className="hover:text-white transition-colors cursor-default">Residência de Alto Padrão</span>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 flex justify-center items-center">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-12">
          <div className="text-6xl text-zinc-800 font-serif leading-none">"</div>
          <p className="text-xl md:text-3xl text-zinc-300 font-light leading-relaxed tracking-wide italic">
            AEROCORE™ superou todas as minhas expectativas. A combinação de proteção, estética e a garantia de um serviço impecável é simplesmente incomparável.
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-[1px] bg-white/20 mb-4"></div>
            <p className="text-white text-sm font-bold uppercase tracking-widest">John Smith</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">CEO, Luxury Yachts Inc.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-white font-black tracking-[0.3em] text-sm">AEROCORE<span className="text-[8px] align-top">™</span></span>
          </div>
          <div className="flex items-center gap-8 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
          <div className="text-[10px] text-zinc-700 tracking-widest uppercase">
            © 2026 AEROCORE™. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

const UniverseCard: React.FC<{ image: string, title: string, desc: string }> = ({ image, title, desc }) => {
  return (
    <div className="group relative overflow-hidden rounded-sm border border-white/10 bg-[#050505]">
      <div className="absolute top-4 left-4 z-20">
        <span className="text-[8px] border border-white/20 bg-black/50 backdrop-blur px-2 py-1 uppercase tracking-[0.2em] text-zinc-300">
          Exclusivo
        </span>
      </div>
      <div className="h-64 overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover filter grayscale opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
      </div>
      <div className="p-8 pb-10 space-y-4 relative z-10 bg-[#050505]">
        <h3 className="text-lg font-black text-white uppercase tracking-widest">{title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default LandingAerocore;
