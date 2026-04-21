import React, { useState } from 'react';
import { Shield, Sun, Droplets, CheckCircle, ShoppingCart, Award, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingWinfSelectEliteProps {
  onBack?: () => void;
  onAddToCart?: () => void;
}

const LandingWinfSelectElite: React.FC<LandingWinfSelectEliteProps> = ({ onBack, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<'benefits' | 'specs'>('benefits');

  const handleBuy = () => {
    if (onAddToCart) {
      onAddToCart();
    } else {
      alert('Produto adicionado ao carrinho!');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black font-sans">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="text-xl font-bold tracking-widest uppercase border-l-2 border-[#D4AF37] pl-3">
          WINF<span className="text-white/50">™</span>
        </div>
        <div className="flex items-center gap-6">
          {onBack && (
            <button 
              onClick={onBack}
              className="text-[11px] uppercase tracking-[0.1em] text-white/50 hover:text-white transition-colors"
            >
              Voltar
            </button>
          )}
          <button 
            onClick={handleBuy}
            className="flex items-center gap-2 px-6 py-2 bg-[#D4AF37] hover:bg-[#F2D272] hover:scale-105 transition-all text-black text-xs uppercase tracking-widest font-bold rounded-none"
          >
            <ShoppingCart className="w-4 h-4" /> Comprar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 px-6 md:px-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-semibold">
                Série Elite
              </span>
              <span className="text-white/50 text-xs tracking-widest uppercase">Alta Performance Automotive</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-light leading-[0.9] tracking-[-0.02em] mb-8">
              Winf Select™ <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF37]">IR-99 Elite</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-white/60 font-light max-w-2xl leading-relaxed mb-10 border-l border-white/20 pl-6">
              Rejeição térmica incomparável e visibilidade cristalina. 
              A nanotecnologia de cerâmica mais avançada do mercado para quem exige exclusividade e conforto absoluto.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={handleBuy}
                className="group relative flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-sm uppercase tracking-[0.1em] font-bold overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <span className="relative z-10">Adquirir Agora</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-[#D4AF37] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics Strip */}
      <div className="border-y border-white/10 bg-black/40 backdrop-blur-md shrink-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { label: 'Rejeição IR (Infravermelho)', value: '99%' },
              { label: 'Bloqueio UV', value: '99.9%' },
              { label: 'Energia Solar Rejeitada (TSER)', value: 'Até 65%' },
              { label: 'Garantia', value: '10 Anos' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={idx !== 0 ? 'pl-8' : ''}
              >
                <div className="text-3xl md:text-5xl font-extralight tracking-tight text-[#D4AF37] mb-2">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features & Specs Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-12 mb-16 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab('benefits')}
            className={`text-xs uppercase tracking-[0.15em] pb-6 relative transition-colors ${activeTab === 'benefits' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Benefícios
            {activeTab === 'benefits' && (
              <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('specs')}
            className={`text-xs uppercase tracking-[0.15em] pb-6 relative transition-colors ${activeTab === 'specs' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Especificações Técnicas
            {activeTab === 'specs' && (
              <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
            )}
          </button>
        </div>

        {activeTab === 'benefits' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="bg-[#111] p-8 md:p-12 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
              <Sun className="w-10 h-10 text-[#D4AF37] mb-6 group-hover:rotate-45 transition-transform duration-500" />
              <h3 className="text-xl font-light mb-4">Rejeição Máxima de Calor</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Com impressionantes 99% de rejeição de raios infravermelhos (IR), o Winf Select™ Elite transforma o ambiente interno do seu veículo em um oásis de conforto térmico extremo, reduzindo significativamente a temperatura.
              </p>
            </div>
            
            <div className="bg-[#111] p-8 md:p-12 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
              <Shield className="w-10 h-10 text-[#D4AF37] mb-6 transform group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-light mb-4">Bloqueio UV 99.9%</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Escudo impenetrável contra raios ultravioleta. Protege não apenas a pele dos passageiros contra o envelhecimento precoce e riscos à saúde, mas preserva também o interior do veículo contra desbotamento.
              </p>
            </div>

            <div className="bg-[#111] p-8 md:p-12 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group">
              <Award className="w-10 h-10 text-[#D4AF37] mb-6" />
              <h3 className="text-xl font-light mb-4">10 Anos de Garantia</h3>
              <p className="text-sm text-white/60 leading-relaxed font-light">
                Confiança absoluta em nosso produto. O modelo IR-99 Elite conta com uma garantia estendida de fábrica de 10 anos contra desbotamento, bolhas ou delaminação. Desempenho duradouro comprovado.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'specs' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[#111] border border-white/10 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {[
                  { label: "VLT (Transmitância de Luz Visível)", value: "05%, 20%, 35%, 50%, 70%" },
                  { label: "Rejeição de Infravermelho (IRER)", value: "99%" },
                  { label: "Rejeição Total de Energia Solar (TSER)", value: "Até 65% (dependendo do VLT)" },
                  { label: "Rejeição de Raios UV (UVR)", value: "99.9%" },
                  { label: "Material / Tecnologia", value: "Nano Cerâmica Multi-layer" },
                  { label: "Redução de Ofuscamento", value: "Até 92% (modelo VLT 05%)" },
                  { label: "Espessura Total", value: "2.0 Mil" },
                  { label: "Garantia", value: "10 Anos" },
                ].map((spec, i) => (
                  <div key={i} className={`p-4 ${i % 2 === 0 ? 'bg-black/30' : 'bg-transparent'} flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 md:col-span-2`}>
                    <span className="text-[11px] uppercase tracking-[0.1em] text-white/50 mb-2 md:mb-0">{spec.label}</span>
                    <span className="font-mono text-sm tracking-tight text-[#D4AF37]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Footer / CTA Footer */}
      <footer className="py-24 px-6 md:px-12 bg-black border-t border-white/10 text-center">
        <h2 className="text-4xl font-light mb-6">Pronto para elevar o padrão?</h2>
        <p className="text-white/50 uppercase tracking-widest text-xs mb-10 max-w-lg mx-auto">
          Ofereça aos seus clientes a tecnologia mais avançada em proteção solar invisível.
        </p>
        <button 
          onClick={handleBuy}
          className="bg-[#D4AF37] text-black px-12 py-5 text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors"
        >
          COMPRAR WINF SELECT™ IR-99 Elite
        </button>
      </footer>
    </div>
  );
};

export default LandingWinfSelectElite;
