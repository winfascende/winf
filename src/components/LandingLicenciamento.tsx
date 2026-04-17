
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ShieldCheck, Award, Box, Zap, Globe, MessageCircle, CheckCircle, ArrowUpRight, TrendingUp, Cpu, Star, Rocket, Target, Diamond, Building2, Store, X, Activity, Crown, Lock, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WINF_CONSTANTS } from '../constants';
import ApplicationModal from './ApplicationModal';

interface LandingLicenciamentoProps {
  onBack: () => void;
  onNavigateToStudio?: () => void;
  onNavigateToKiosk?: () => void;
  onActivate?: () => void;
}

const PricingTier = ({ title, price, payback, benefits, isRecommended, isFranchise, isKiosk, isLocked, ctaLabel, onClick }: any) => (
    <div className={`relative bg-[#080808] border ${isFranchise ? 'border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.05)] bg-amber-500/[0.01]' : isKiosk ? 'border-amber-500/10 shadow-[0_0_40px_rgba(245,158,11,0.05)] bg-amber-500/[0.01]' : isRecommended ? 'border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.1)]' : 'border-white/5'} p-8 rounded-2xl flex flex-col h-full group hover:scale-[1.02] transition-all duration-500`}>
        {isFranchise ? (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <Crown size={10} /> FLAGSHIP MASTER
            </div>
        ) : isKiosk ? (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500/80 text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <Store size={10} /> RETAIL MACHINE
            </div>
        ) : isRecommended && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                MAIS POPULAR
            </div>
        )}
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isFranchise || isKiosk ? 'text-amber-500' : isRecommended ? 'text-white' : 'text-gray-500'}`}>{title}</h4>
                {isLocked && <Lock size={12} className="text-amber-500/50" />}
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white tracking-tighter">R$ {price}</span>
            </div>
            {payback && (
                <div className="mt-2 text-[10px] text-amber-500 font-bold uppercase tracking-widest">
                    Payback: {payback}
                </div>
            )}
        </div>
        <ul className="space-y-3 mb-10 flex-1">
            {benefits.map((benefit: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-[11px] text-gray-400 leading-relaxed">
                    <CheckCircle size={12} className={isFranchise || isKiosk ? 'text-amber-500/50' : 'text-white/50'} /> {benefit}
                </li>
            ))}
        </ul>
        <button 
          onClick={onClick}
          className={`w-full py-4 rounded-lg font-bold text-[9px] uppercase tracking-[0.2em] transition-all ${
            isFranchise || isKiosk
            ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/10' 
            : isRecommended 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black'
          }`}
        >
            {isLocked ? <span className="flex items-center justify-center gap-2"><Lock size={12}/> {ctaLabel || 'Solicitar Convite'}</span> : (ctaLabel || 'Selecionar Plano')}
        </button>
    </div>
);

const LandingLicenciamento: React.FC<LandingLicenciamentoProps> = ({ onBack, onNavigateToStudio, onNavigateToKiosk, onActivate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  const heroImages = [
    (WINF_CONSTANTS as any).assets.aerocoreForest,
    (WINF_CONSTANTS as any).assets.aerocoreStudio,
    (WINF_CONSTANTS as any).assets.studio,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCtaClick = (tier: string) => {
    if (tier === 'PORTAL') {
        if (onActivate) onActivate();
        else setIsAppModalOpen(true);
        return;
    }
    setSelectedTier(tier);
    setIsAppModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[80] border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl h-20 md:h-24 flex items-center">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 w-full flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-10">
            <button onClick={onBack} className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><ChevronLeft size={20} className="md:w-6 md:h-6" /></button>
            <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => { window.scrollTo(0,0); setIsMenuOpen(false); }}>
                <span className="font-black tracking-tighter text-xl md:text-2xl uppercase">Winf™ PARTNERS</span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
            <button className="hover:text-white transition-colors">A Marca</button>
            <button className="hover:text-white transition-colors">Licenciamentos</button>
            <button onClick={onNavigateToKiosk} className="hover:text-white transition-colors">Kiosks</button>
            <button onClick={onNavigateToStudio} className="hover:text-white transition-colors">Franquias</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => handleCtaClick('PORTAL')} className="hidden sm:block bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] hover:bg-white/90 transition-all">
              Portal
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Activity size={24} className="rotate-90" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-[70] bg-[#050505] transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 text-[12px] font-bold uppercase tracking-[0.5em] text-white/60">
            <button onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">A Marca</button>
            <button onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Licenciamentos</button>
            <button onClick={() => { onNavigateToKiosk?.(); setIsMenuOpen(false); }} className="hover:text-white transition-colors">Kiosks</button>
            <button onClick={() => { onNavigateToStudio?.(); setIsMenuOpen(false); }} className="hover:text-white transition-colors">Franquias</button>
            <button onClick={() => { handleCtaClick('PORTAL'); setIsMenuOpen(false); }} className="mt-4 bg-white text-black px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.4em]">Portal do Parceiro</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
           <AnimatePresence mode="wait">
             <motion.div 
               key={currentImageIndex}
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 0.3, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 2, ease: "easeInOut" }}
               className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
               style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
             />
           </AnimatePresence>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,#050505_100%)]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#050505]"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6 md:px-8 animate-fade-in flex flex-col items-center">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-[9px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12">
              <Rocket size={12} className="text-amber-500" /> Oportunidade de Expansão 2026
           </div>
           <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 md:mb-10 uppercase">
              ESCALABILIDADE<br/>
              SEM LIMITES.
           </h1>
           <p className="text-white/40 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12 md:mb-16">
              Seja você um aplicador de elite, arquiteto visionário ou investidor estratégico, a Winf™ PARTNERS oferece a infraestrutura tecnológica para você dominar o mercado de proteção térmica.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center w-full sm:w-auto">
             <button onClick={() => window.scrollTo({ top: document.getElementById('plans')?.offsetTop, behavior: 'smooth' })} className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all text-center shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Explorar Licenciamentos
             </button>
             <button onClick={() => handleCtaClick('CONSULTORIA')} className="w-full sm:w-auto border border-white/10 text-white px-10 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all text-center">
                Falar com Especialista
             </button>
           </div>
        </div>
      </header>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-[#020202] border-t border-white/5 relative">
        <div className="max-w-[1500px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <PricingTier 
                    title="SELECT (Partner)" 
                    price="2.500" 
                    payback="< 1 mês"
                    benefits={[
                        "Acesso ao Portal Winf™ Academy",
                        "Treinamentos Online Completos",
                        "Comunidade Exclusiva",
                        "Suporte via Chat",
                        "Selo de Parceiro Select"
                    ]}
                    onClick={() => handleCtaClick('SELECT')}
                    ctaLabel="QUERO SER SELECT"
                />
                <PricingTier 
                    title="ELITE (Installer)" 
                    price="5.000" 
                    payback="< 1 mês"
                    benefits={[
                        "Tudo do Select",
                        "Certificação Técnica Elite",
                        "Kit de Ferramentas Profissional",
                        "Tabela de Preços Parceiro Elite",
                        "Acesso ao Winf Cut™ Pro"
                    ]}
                    onClick={() => handleCtaClick('ELITE')}
                    ctaLabel="QUERO SER ELITE"
                />
                <PricingTier 
                    title="ADVANCED (Licenciado)" 
                    price="7.500" 
                    payback="< 1 mês"
                    benefits={[
                        "Acesso ao Portal Winf™ PARTNERS",
                        "One Page Personalizada",
                        "Treinamento Presencial",
                        "Kit de Produtos Inicial",
                        "Marketing Digital Ativo",
                        "Certificação Oficial"
                    ]}
                    onClick={() => handleCtaClick('ADVANCED')}
                    ctaLabel="COMEÇAR AGORA"
                />
                <PricingTier 
                    title="INTERPRETE (Professional)" 
                    price="15.000" 
                    payback="< 1 mês"
                    isRecommended
                    benefits={[
                        "Benefícios do ADVANCED",
                        "Acompanhamento de Negócio",
                        "Consultoria Estratégica",
                        "Estratégia GEOFENCING",
                        "Suporte Integral 24/7",
                        "Certificação Master"
                    ]}
                    onClick={() => handleCtaClick('INTERPRETE')}
                    ctaLabel="FALAR COM O BOARD"
                />
                <PricingTier 
                    title="KIOSK RETAIL" 
                    price="120.000" 
                    payback="6 - 12 meses"
                    isKiosk
                    isLocked
                    benefits={[
                        "Projeto Modular Shopping",
                        "Hardware de Varejo Winf™ PARTNERS",
                        "Estoque de Gadgets Premium",
                        "Software Kiosk Mode",
                        "Treinamento de Atendimento",
                        "Marketing de Fluxo"
                    ]}
                    onClick={() => handleCtaClick('KIOSK')}
                    ctaLabel="SOLICITAR CONVITE"
                />
                <PricingTier 
                    title="STUDIO FLAGSHIP" 
                    price="250.000" 
                    payback="12 - 18 meses"
                    isFranchise
                    isLocked
                    benefits={[
                        "Exclusividade Territorial",
                        "Projeto Studio de Luxo",
                        "Estoque Massivo (Car/Arch)",
                        "Acesso ao Universo Dark™",
                        "Marketing de Dominância",
                        "Mentoria Direta CEO"
                    ]}
                    onClick={() => handleCtaClick('STUDIO')}
                    ctaLabel="SOLICITAR CONVITE"
                />
            </div>
        </div>
      </section>

      <ApplicationModal 
        isOpen={isAppModalOpen} 
        onClose={() => setIsAppModalOpen(false)} 
        initialTier={selectedTier}
      />

      {/* Recurrent Revenue Pitch */}
      <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
                <h3 className="text-4xl font-heading font-bold text-white mb-8 tracking-tighter">O PODER DO <span className="text-white">VAREJO MODULAR.</span></h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">
                    O <strong>Winf™ Kiosk</strong> é a nossa unidade de ataque rápido. Com ticket médio de R$ 450 e um dos maiores faturamentos por m² do varejo, ele garante liquidez imediata e visibilidade de marca em pontos de altíssimo tráfego.
                </p>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-white text-3xl font-bold font-mono">R$ 450</p>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Ticket Médio Gadgets</p>
                    </div>
                    <div>
                        <p className="text-white text-3xl font-bold font-mono">12m²</p>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Compacto & Lucrativo</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#080808] border border-white/10 p-12 rounded-3xl relative shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Store size={100} className="text-white" /></div>
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-10">Unit Economics: Kiosk</h4>
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <span className="text-sm text-gray-400">Faturamento Alvo / Mês</span>
                        <span className="text-2xl font-bold text-white font-mono">R$ 45.000 — R$ 80.000</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <span className="text-sm text-gray-400">Margem Líquida</span>
                        <span className="text-2xl font-bold text-white font-mono">25% — 35%</span>
                    </div>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest text-center pt-6">
                        "O Kiosk é a porta de entrada para o ecossistema AeroCore™ no varejo físico."
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Profitability Calculator Section */}
      <section className="py-32 bg-[#020202] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">Calculadora de<br/>Lucratividade</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
              Números reais da operação Winf. Analise a margem bruta por metro quadrado aplicado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {(WINF_CONSTANTS as any).portfolio.lines[0].items.map((item: any) => {
              const costPerMeter = item.financials.costPerRoll / item.financials.metersPerRoll;
              const profitPerMeter = item.financials.salePricePerMeter - costPerMeter;
              const margin = (profitPerMeter / item.financials.salePricePerMeter) * 100;

              return (
                <div key={item.id} className="bg-[#080808] border border-white/5 p-10 rounded-3xl hover:border-white/20 transition-all group">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h4 className="text-white font-black text-xl uppercase tracking-tighter mb-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Linha Select™</p>
                    </div>
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                      <TrendingUp size={18} />
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Custo do Material (m²)</span>
                      <span className="text-white font-mono">R$ {costPerMeter.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Preço Final Aplicado (m²)</span>
                      <span className="text-white font-mono">R$ {item.financials.salePricePerMeter.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Lucro Bruto / m²</span>
                      <span className="text-3xl font-bold text-white font-mono">R$ {profitPerMeter.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Margem de Contribuição</span>
                    <span className="text-amber-500 font-bold">{margin.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technician Career Section */}
      <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-10 leading-none">Escalabilidade<br/>Técnica</h2>
              <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
                Nossa rede não escala apenas em faturamento, mas em capital humano. Formamos os melhores aplicadores do país através da <strong>Winf™ Academy</strong>.
              </p>

              <div className="space-y-8">
                {(WINF_CONSTANTS as any).technician.careerPath.map((step: any, i: number) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="text-white/20 font-black text-2xl font-mono leading-none">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-1">{step.role}</h4>
                      <p className="text-white/30 text-[11px] uppercase tracking-widest">{step.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#080808] border border-white/10 p-12 rounded-[40px] relative">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest">Earnings Report</h4>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">Média Salarial Brasil</p>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">Ganhos Iniciais (Junior/Pleno)</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white tracking-tighter">{(WINF_CONSTANTS as any).technician.initialEarnings}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">Ganhos Elite (Senior/Master)</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white tracking-tighter">{(WINF_CONSTANTS as any).technician.seniorEarnings}</span>
                  </div>
                </div>
                <div className="pt-10 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Comissionamento Variável</span>
                    <span className="text-white font-bold">{(WINF_CONSTANTS as any).technician.commission}</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-12 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/90 transition-all">
                Candidatar-se à Academy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Management & Access Levels */}
      <section className="py-32 bg-[#020202] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40 mb-6">
              {(WINF_CONSTANTS as any).teamManagement.badge}
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">{(WINF_CONSTANTS as any).teamManagement.title}</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
              {(WINF_CONSTANTS as any).teamManagement.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {(WINF_CONSTANTS as any).teamManagement.accessLevels.map((level: any, i: number) => {
              const IconComponent = level.icon === 'Shield' ? ShieldCheck : level.icon === 'Cpu' ? Cpu : level.icon === 'Scissors' ? Scissors : TrendingUp;
              return (
                <div key={i} className="bg-[#080808] border border-white/5 p-8 rounded-3xl hover:border-white/20 transition-all group">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 group-hover:text-white transition-colors mb-8">
                    <IconComponent size={24} />
                  </div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4">{level.role}</h4>
                  <p className="text-white/30 text-[11px] leading-relaxed">
                    {level.access}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-white/[0.02] to-transparent border border-white/5 rounded-[40px] p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Lock size={200} className="text-white" />
            </div>
            <div className="max-w-2xl relative z-10">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">
                {(WINF_CONSTANTS as any).teamManagement.credentials.title}
              </h3>
              <p className="text-white/40 text-lg font-light leading-relaxed mb-10">
                {(WINF_CONSTANTS as any).teamManagement.credentials.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/60 uppercase tracking-widest">
                  Rastreabilidade Total
                </div>
                <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/60 uppercase tracking-widest">
                  Acessos Criptografados
                </div>
                <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/60 uppercase tracking-widest">
                  Logs de Operação
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {(WINF_CONSTANTS as any).teamManagement.dashboardFeatures.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-white/40 text-[11px] uppercase tracking-widest">
                    <CheckCircle size={12} className="text-amber-500" /> {feature}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleCtaClick('TEAM_MANAGEMENT')}
                className="px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-white/90 transition-all"
              >
                Configurar Dashboard de Equipe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingLicenciamento;
