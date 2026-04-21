
import React from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Instagram, 
  Globe, 
  Zap, 
  Shield, 
  Award, 
  Clock,
  ArrowRight,
  Target,
  Users,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CityOnePageProps {
  city: string;
  partnerName?: string;
  partnerAvatar?: string;
  onBack: () => void;
}

const CityOnePage: React.FC<CityOnePageProps> = ({ city, partnerName = 'Winf Partner', partnerAvatar, onBack }) => {
  const getCityDetails = (cityName: string) => {
    switch (cityName.toLowerCase()) {
      case 'santos':
        return {
          title: 'WINF™ SANTOS',
          subtitle: 'Unidade Piloto de Dominância',
          description: 'A base zero da tecnologia Winf™ no Brasil. Referência absoluta em aplicações AeroCore™ e Blindagem Arquitetônica de alta precisão.',
          image: 'https://images.unsplash.com/photo-1590603703183-7150c44f29c7?auto=format&fit=crop&q=80&w=1000',
          stats: { clients: '1.200+', projects: '450+', score: 98 }
        };
      case 'praia grande':
        return {
          title: 'WINF™ PRAIA GRANDE',
          subtitle: 'Expansão Litoral Sul',
          description: 'Dominância estratégica no litoral sul. Tecnologia molecular aplicada à arquitetura hospitalar e residencial de alto padrão.',
          image: 'https://images.unsplash.com/photo-1544413647-7950c3327d70?auto=format&fit=crop&q=80&w=1000',
          stats: { clients: '800+', projects: '280+', score: 95 }
        };
      case 'sorocaba':
        return {
          title: 'WINF™ SOROCABA',
          subtitle: 'Polo Industrial & Luxo',
          description: 'O hub de tecnologia Winf™ no interior paulista. Foco em soluções corporativas e frotas de luxo com NeoSkin™ Matte.',
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
          stats: { clients: '500+', projects: '190+', score: 92 }
        };
      case 'campina grande':
        return {
          title: 'WINF™ CAMPINA GRANDE',
          subtitle: 'Inovação Nordeste',
          description: 'Trazendo a revolução da engenharia de películas para o polo tecnológico do Nordeste. Proteção térmica extrema para climas severos.',
          image: 'https://images.unsplash.com/photo-1629138634568-edbe6ee879ab?auto=format&fit=crop&q=80&w=1000',
          stats: { clients: '350+', projects: '120+', score: 90 }
        };
      default:
        return {
          title: `WINF™ ${cityName.toUpperCase()}`,
          subtitle: 'Unidade Autorizada',
          description: 'Parte do ecossistema de elite Winf™. Tecnologia de ponta, consultoria técnica e proteção molecular para veículos e arquitetura.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
          stats: { clients: '100+', projects: '50+', score: 85 }
        };
    }
  };

  const details = getCityDetails(city);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-winf-primary/30 pb-20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors">
          <ChevronLeft size={16} /> Voltar ao Sistema
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-winf-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Unidade Online</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 z-0">
          <img src={details.image} alt={city} className="w-full h-full object-cover grayscale brightness-[0.3] contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl space-y-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-winf-primary/30 bg-winf-primary/5 text-winf-primary text-[9px] font-black uppercase tracking-[0.4em] mb-4">
            {details.subtitle}
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            {details.title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            {details.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Solicitar Orçamento <Phone size={14} />
            </button>
            <button className="px-10 py-4 bg-transparent border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-white/5 transition-all">
              Falar com Especialista
            </button>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <div className="absolute bottom-0 w-full bg-white/[0.02] border-y border-white/5 backdrop-blur-xl">
           <div className="max-w-[1400px] mx-auto grid grid-cols-3 divide-x divide-white/5">
              <div className="py-8 text-center">
                 <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">{details.stats.clients}</p>
                 <p className="text-[8px] md:text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-1">Clientes Satisfeitos</p>
              </div>
              <div className="py-8 text-center">
                 <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">{details.stats.projects}</p>
                 <p className="text-[8px] md:text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-1">Projetos Entregues</p>
              </div>
              <div className="py-8 text-center">
                 <p className="text-2xl md:text-4xl font-black text-winf-primary tracking-tighter">{details.stats.score}</p>
                 <p className="text-[8px] md:text-[9px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-1">Winf Core™ Score</p>
              </div>
           </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-32 space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-[10px] font-black text-winf-primary uppercase tracking-[0.5em]">Lineup de Elite</h2>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">NOSSAS ESPECIALIDADES</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: 'AEROCORE™ AUTOMOTIVE', 
              desc: 'Películas de cerâmica molecular com rejeição térmica real de até 99%. Proteção UVA/UVB total.',
              icon: Zap
            },
            { 
              title: 'BLINDAGEM ARQUITETÔNICA', 
              desc: 'Segurança extrema para residências e empresas. Resistência a impactos e fragmentação de vidro.',
              icon: Shield
            },
            { 
              title: 'NEOSKIN™ MATTE', 
              desc: 'Personalização premium com acabamento fosco acetinado. Proteção contra riscos e regeneração térmica.',
              icon: Award
            }
          ].map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ translateY: -10 }}
              className="p-10 bg-zinc-900/50 border border-white/5 rounded-[2rem] space-y-6 group"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white group-hover:bg-winf-primary group-hover:text-black transition-all">
                <service.icon size={24} />
              </div>
              <h4 className="text-xl font-black tracking-tighter uppercase italic">{service.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{service.desc}</p>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-winf-primary flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Saiba Mais <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partner Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
         <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-winf-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden grayscale border-4 border-white/5 shrink-0 relative z-10">
              {partnerAvatar ? (
                <img src={partnerAvatar} alt={partnerName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-3xl font-black text-zinc-600">
                  {partnerName.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
               <div className="flex flex-col md:flex-row items-center gap-4">
                  <h4 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-white">{partnerName}</h4>
                  <span className="px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <CheckCircle2 size={10} /> Parceiro Autorizado
                  </span>
               </div>
               <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
                 Especialista em Engenharia de Películas com mais de 10 anos de experiência no mercado premium. Lidera a operação Winf™ em {city} com foco absoluto em entrega técnica impecável.
               </p>
               <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
                 <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest">
                   <Phone size={14} className="text-winf-primary" /> Atendimento VIP
                 </div>
                 <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest">
                   <Instagram size={14} className="text-winf-primary" /> @winf_{city.replace(' ', '_').toLowerCase()}
                 </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Footer */}
      <footer className="text-center py-20 px-6 space-y-10">
         <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">PRONTO PARA A<br/><span className="text-winf-primary">TRANSFORMAÇÃO?</span></h2>
         <p className="text-zinc-500 text-sm uppercase tracking-[0.5em]">Santos • Praia Grande • Sorocaba • Campina Grande</p>
         <div className="flex justify-center gap-4">
            <button className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
               <Instagram size={20} />
            </button>
            <button className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
               <Globe size={20} />
            </button>
            <button className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
               <Phone size={20} />
            </button>
         </div>
         <p className="text-[10px] text-zinc-700 font-mono uppercase tracking-[0.2em] pt-10">
            Powered by Winf OS™ Control Room // All Rights Reserved 2024
         </p>
      </footer>
    </div>
  );
};

export default CityOnePage;
