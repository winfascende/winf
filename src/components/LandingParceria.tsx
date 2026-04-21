import React, { useState, useEffect } from 'react';
import { ChevronLeft, Zap, BookOpen, Layers, CheckCircle, Star, ArrowRight, ShieldCheck, Target, ArrowLeft, Check, Diamond, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCommercialDeckPDF } from '../lib/pdfGenerator';

interface LandingParceriaProps {
  onBack: () => void;
  onActivate?: () => void;
  planType?: 'select' | 'elite' | 'advanced' | 'enterprise';
  backgroundImage?: string;
}

const LandingParceria: React.FC<LandingParceriaProps> = ({ onBack, onActivate, planType = 'advanced', backgroundImage }) => {
  const isEnterprise = planType === 'enterprise';
  const isElite = planType === 'elite';
  const isSelect = planType === 'select';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const heroImages = [
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070', // Porsche
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070', // Porsche Studio
    'https://images.unsplash.com/photo-1600880212319-7837e5bb0a9c?q=80&w=2070', // Architects/Partners
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      generateCommercialDeckPDF();
      setIsGeneratingPdf(false);
    }, 1200);
  };
  
  const planData = {
    select: {
      title: 'SELECT',
      subtitle: 'O Ponto de Ignição',
      price: '2.500',
      icon: CheckCircle,
      benefits: [
        'Acesso à Academia WINF',
        'Treinamentos Online Completos',
        'Comunidade de Networking (Discord)',
        'Suporte Base via Chat',
        'Precificação de Parceiro (Maior Margem)'
      ]
    },
    elite: {
      title: 'ELITE',
      subtitle: 'O Instalador Cirúrgico',
      price: '5.000',
      icon: Star,
      benefits: [
        'Acesso ao WINF CUT™ (Software)',
        'Certificação Técnica Rigorosa',
        'Kit Exclusivo de Ferramentas Pro',
        'Tabela de Precificação Diamante',
        'Acesso Restrito a Lançamentos'
      ]
    },
    advanced: {
      title: 'ADVANCED',
      subtitle: 'O Ecossistema Dominante',
      price: '7.500',
      icon: Zap,
      benefits: [
        'Marketing Digital Local Ativado',
        'One Page Personalizada (Site)',
        'Treinamento Presencial Imersivo',
        'Kit Inicial de Películas Premium',
        'Captação de Projetos High-End'
      ]
    },
    enterprise: {
      title: 'ENTERPRISE',
      subtitle: 'A Cadeira na Mesa (Board Member)',
      price: '15.000',
      icon: Diamond,
      benefits: [
        'Reuniões Diretas c/ Fundadores',
        'Estratégia Local de Geofencing',
        'Acompanhamento Mensal de KPIs',
        'Suporte Crítico Linha Direta 24/7',
        'Prioridade em Novas Distribuições'
      ]
    }
  };

  const currentPlan = planData[planType];
  const PlanIcon = currentPlan.icon;

  const handleCtaClick = () => {
    if (onActivate) {
      onActivate();
    } else {
      alert('Protocolo de Iniciação Ativado. Redirecionando para Check-in Seguro.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/90 backdrop-blur-xl transition-all duration-300 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 md:gap-3 text-gray-400 hover:text-white transition-colors group">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform md:w-5 md:h-5"/> <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest">Abortar</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]"></span>
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">Oportunidade Flash: Encerrando</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#080808] to-[#020202]"></div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
              style={{ 
                backgroundImage: `url(${heroImages[currentImageIndex]})`,
              }}
            />
          </AnimatePresence>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,#050505_100%)]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 animate-fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 backdrop-blur-md shadow-lg">
            <Target size={12} /> PROTOCOLO DE INICIAÇÃO // {currentPlan.title}
          </div>
          
          <h1 className="text-4xl md:text-8xl font-medium tracking-tighter mb-6 leading-[0.9] text-white drop-shadow-2xl uppercase">
            DOMINE O <br/>
            <span className="text-white font-bold">MERCADO.</span>
          </h1>
          
          <p className="text-gray-300 text-base md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Você não está apenas comprando um kit. Você está adquirindo uma infraestrutura de guerra para dominar o setor de Window Film na sua região com o modelo <strong>{currentPlan.title}</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-6">
            <button 
                onClick={handleCtaClick}
                className="w-full sm:w-auto px-10 md:px-14 py-5 bg-white text-black rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 group relative overflow-hidden"
            >
                <span className="relative z-10 flex items-center gap-2">Ativar {currentPlan.title} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className={`w-full sm:w-auto px-8 py-5 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border ${
                    isGeneratingPdf 
                    ? 'border-white/10 bg-white/5 text-gray-400 cursor-wait'
                    : 'border-white/30 text-white hover:bg-white hover:text-black'
                }`}
            >
                {isGeneratingPdf ? (
                    <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> GERANDO PDF...</>
                ) : (
                    <><Download size={16} /> BAIXAR PROSPECTO</>
                )}
            </button>
          </div>
        </div>
      </section>

      {/* Value Stack - Aggressive */}
      <section className="py-24 bg-[#020202] border-t border-white/5 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                
                {/* Left: The Arsenal */}
                <div>
                    <h3 className="text-3xl text-white font-light mb-2">SEU ARSENAL <span className="font-bold text-white">TÁTICO</span></h3>
                    <p className="text-gray-500 text-sm mb-10 max-w-sm">Ferramentas desenhadas para esmagar a ineficiência no nível {currentPlan.title}.</p>
                    
                    <div className="space-y-8">
                        {[
                            { title: 'Winf™ Driver', desc: 'Seu cockpit em tempo real. Controle métricas, receita por hora (Velocity) e saúde do negócio.', icon: Zap },
                            { title: 'Acesso Blackshop', desc: 'Compre direto da fonte. Margens protegidas, produtos exclusivos que o mercado não tem.', icon: Layers },
                            { title: 'Winf™ Academy Elite', desc: 'Não é "cursinho". É treinamento de guerra para vendas High Ticket.', icon: BookOpen },
                            { title: 'W-Rank & Gamification', desc: 'Seu status importa. Suba de nível, desbloqueie recompensas e ganhe autoridade.', icon: Star },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-5 group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1 group-hover:text-white transition-colors">{item.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: The Offer Card */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 blur-3xl opacity-20 animate-pulse"></div>
                    <div className="bg-[#080808] border border-white/10 rounded-3xl p-10 relative z-10 shadow-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <PlanIcon size={120} />
                        </div>
                        
                        <div className="flex justify-between items-center mb-8">
                            <span className="bg-white/20 text-white border border-white/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{currentPlan.subtitle}</span>
                            {isEnterprise && (
                                <span className="bg-white text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                    <Star size={10} fill="currentColor"/> Popular
                                </span>
                            )}
                        </div>
                        
                        <div className="mb-2">
                            <span className="text-sm text-gray-500 mr-2">R$</span>
                            <span className="text-6xl font-bold text-white tracking-tighter">{currentPlan.price}</span>
                        </div>
                        <p className="text-gray-400 text-xs mb-8 border-b border-white/10 pb-8">
                            {isEnterprise ? 'O nível mais alto de parceria estratégica e suporte integral.' : 
                             isElite ? 'Certificação técnica superior para instaladores de alta performance.' :
                             isSelect ? 'O ponto de entrada oficial para o ecossistema de elite Winf™.' :
                             'Entrada sólida no ecossistema com infraestrutura completa.'}
                        </p>
                        
                        <div className="space-y-4 mb-8">
                            {currentPlan.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs text-gray-300">
                                    <CheckCircle size={14} className="text-white/50" /> <span>{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={handleCtaClick}
                            className="w-full py-5 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all mb-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
                        >
                            {isEnterprise ? 'Falar com o Board' : 'COMEÇAR AGORA'}
                        </button>
                        <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest">
                            Aprovação sujeita a análise de território.
                        </p>
                    </div>
                </div>

            </div>
        </div>
      </section>
    </div>
  );
};

export default LandingParceria;