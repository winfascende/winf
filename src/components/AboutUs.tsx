
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Globe, Cpu, Users, ArrowLeft } from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/30 overflow-x-hidden relative">
      {/* Global Overlays */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
      </div>
      
      {/* Navigation - System Command bar */}
      <nav className="fixed top-6 left-0 right-0 z-[80] transition-all duration-500 flex justify-center px-4">
        <div className={`relative w-full max-w-[1400px] border border-white/5 rounded-[32px] bg-black/40 backdrop-blur-2xl h-16 md:h-20 flex items-center px-4 md:px-10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="relative w-full flex justify-between items-center z-10">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 group text-[10px] font-black uppercase tracking-[0.4em] text-white/70 hover:text-white transition-all shrink-0"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span className="font-black tracking-tighter text-base md:text-xl uppercase italic">WINF™</span>
                <div className="hidden sm:flex items-center gap-2 px-2 py-0.5 rounded-full border border-winf-primary/20 bg-winf-primary/5">
                  <div className="w-1 h-1 bg-winf-primary rounded-full animate-pulse"></div>
                  <span className="text-[7px] font-black text-winf-primary uppercase tracking-widest text-zinc-300">ABOUT US</span>
                </div>
            </div>
            <div className="w-10 sm:w-20"></div> {/* Spacer balance */}
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <section className="mb-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.5em] text-winf-primary mb-8"
            >
              Nossa Missão // Proteção Molecular
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] mb-12"
            >
              ENGENHARIA <br/>
              <span className="text-[12px] text-white/60 italic">DE DOMINAÇÃO.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto"
            >
              A Winf™ não é apenas uma marca de películas. Somos um ecossistema de alta tecnologia focado na preservação e valorização de ativos de alto padrão através da ciência molecular.
            </motion.p>
          </section>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {[
              {
                icon: <Shield className="text-winf-primary" size={32} />,
                title: "PROTEÇÃO ABSOLUTA",
                desc: "Desenvolvemos barreiras invisíveis que protegem contra o tempo, o clima e o desgaste, mantendo a integridade original de cada superfície."
              },
              {
                icon: <Cpu className="text-winf-primary" size={32} />,
                title: "TECNOLOGIA NÚCLEO",
                desc: "Nossas fórmulas são desenvolvidas em laboratórios de ponta, utilizando nanotecnologia para criar ligações moleculares indestrutíveis."
              },
              {
                icon: <Globe className="text-winf-primary" size={32} />,
                title: "VISÃO GLOBAL",
                desc: "Presente nos principais polos de luxo, a Winf™ estabelece o padrão mundial para o que significa proteção de ativos premium."
              },
              {
                icon: <Target className="text-winf-primary" size={32} />,
                title: "PRECISÃO CIRÚRGICA",
                desc: "Cada aplicação é um processo de engenharia, executado por licenciados treinados para atingir a perfeição estética e funcional."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[40px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
              >
                <div className="mb-8 p-4 rounded-2xl bg-white/5 inline-block group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                <p className="text-white/90 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mission Statement & History */}
          <section className="relative p-12 md:p-24 rounded-[60px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <Shield size={300} />
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 italic text-winf-primary">Nossa Visão Global</h2>
                <div className="space-y-6 text-base text-white/60 font-light leading-relaxed">
                  <p>
                    A WINF™ não é para todos. Somos a resposta brutal para a ineficiência térmica, reservada apenas para aqueles que não aceitam o padrão vigente. Elevamos a proteção de ativos ao nível da engenharia molecular. O acesso ao nosso ecossistema é restrito, garantindo que a precisão de nossa tecnologia alcance apenas projetos que exigem o absoluto.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 italic text-winf-primary">Engenharia de Materiais</h2>
                <div className="space-y-6 text-base text-white/60 font-light leading-relaxed">
                  <p>
                    Nossas raízes são brasileiras, nossa visão é global. Forjamos parcerias de elite com os centros mais avançados de materiais da Terra. Não buscamos volume; buscamos excelência. Somos seletivos com cada projeto que recebe a chancela molecular da Select™, AeroCore™, NeoSkin™ ou Glass+ Home.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-[11px] font-black text-white/70 uppercase tracking-[0.5em]">WINF™ INTERNATIONAL GROUP // MISSION CONTROL</p>
      </footer>
    </div>
  );
};

export default AboutUs;
