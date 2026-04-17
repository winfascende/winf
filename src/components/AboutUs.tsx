
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
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[80] border-b border-white/5 bg-[#050505]/80 backdrop-blur-2xl h-20 md:h-24 flex items-center">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 w-full flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 group text-[10px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white transition-all"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <div className="flex items-center gap-3">
            <span className="font-black tracking-tighter text-xl uppercase">Winf™ ABOUT</span>
            <div className="w-2 h-2 bg-winf-primary rounded-full animate-pulse"></div>
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </nav>

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <section className="mb-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-[0.5em] text-winf-primary mb-8"
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
              <span className="text-white/20">DE DOMINAÇÃO.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto"
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
                <p className="text-white/40 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Mission Statement */}
          <section className="relative p-12 md:p-24 rounded-[60px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <Shield size={300} />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 italic">O ECOSSISTEMA WINF™</h2>
              <div className="space-y-6 text-lg text-white/60 font-light leading-relaxed max-w-2xl">
                <p>
                  Nascemos da necessidade de elevar o padrão do mercado de proteção de superfícies. Onde outros veem apenas um produto, nós vemos uma oportunidade de aplicar ciência e design.
                </p>
                <p>
                  Nossa missão é capacitar parceiros ao redor do mundo com as ferramentas, o conhecimento e a tecnologia necessários para dominar seus mercados locais, oferecendo aos clientes finais uma experiência de proteção sem precedentes.
                </p>
                <p className="text-white font-medium italic">
                  "A excelência não é um ato, mas um hábito de engenharia."
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">WINF™ INTERNATIONAL GROUP // MISSION CONTROL</p>
      </footer>
    </div>
  );
};

export default AboutUs;
