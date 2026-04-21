import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  Cpu, 
  Award, 
  Target, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Gem,
  Building2,
  Users,
  Briefcase
} from 'lucide-react';

interface PlanDetail {
  id: string;
  name: string;
  badge: string;
  icon: any;
  description: string;
  advantages: string[];
  earnings: string;
  mechanics: string;
  cta: string;
  color: string;
}

const plans: PlanDetail[] = [
  {
    id: 'select',
    name: 'WINF SELECT™',
    badge: 'ARQUITETURA DE ELITE',
    icon: Gem,
    description: 'O nível máximo de exclusividade para arquitetos e aplicadores focados no mercado de luxo residencial e corporativo.',
    advantages: [
      'Acesso à linha Select™ (American Technology)',
      'Suporte de engenharia para projetos complexos',
      'Certificação Digital de Autenticidade',
      'Exclusividade em produtos de alta transparência'
    ],
    earnings: 'Margens de 60% a 85% por projeto de alto padrão.',
    mechanics: 'O licenciado atua como um consultor técnico premium, especificando e executando soluções invisíveis de alta performance térmica.',
    cta: 'Tornar-se Select™',
    color: '#D4AF37' // Gold
  },
  {
    id: 'elite',
    name: 'WINF ELITE™',
    badge: 'OPERADOR DE ALTA PERFORMANCE',
    icon: Award,
    description: 'Focado em grandes obras e projetos de complexidade extrema, onde a performance técnica é o único critério de sucesso.',
    advantages: [
      'Acesso total às linhas AeroCore™ AIR e MARINE',
      'Prioridade no roteamento de leads corporativos',
      'Treinamento avançado em nanotecnologia',
      'Dashboard master de gestão de múltiplos técnicos'
    ],
    earnings: 'Faturamento projetado de R$ 50k a R$ 150k/mês.',
    mechanics: 'Unidades com capacidade técnica para atender desde frotas executivas até vidros estruturais de fachadas monumentais.',
    cta: 'Upgrade para Elite™',
    color: '#FFFFFF'
  },
  {
    id: 'advanced',
    name: 'WINF ADVANCED™',
    badge: 'UNIDADE OPERACIONAL REGIONAL',
    icon: Zap,
    description: 'O modelo ideal para expansão territorial rápida com foco em serviços automotivos e residenciais de alta rotatividade.',
    advantages: [
      'Exclusividade de território garantida',
      'Marketing centralizado com geração de leads IA',
      'WINF OS™ completo para gestão de estoque e CRM',
      'Suporte comercial para fechamento de grandes contas'
    ],
    earnings: 'Investimento com payback estimado em 12-18 meses.',
    mechanics: 'Operação otimizada com baixo custo fixo e alta demanda recorrente via ecossistema digital WINF.',
    cta: 'Consultar Território',
    color: '#00D1FF'
  },
  {
    id: 'enterprise',
    name: 'WINF ENTERPRISE™',
    badge: 'CENTRO DE DISTRIBUIÇÃO E LOGÍSTICA',
    icon: Building2,
    description: 'A infraestrutura que sustenta a rede. Gestão de estoque regional e suporte para grandes contas corporativas.',
    advantages: [
      'Distribuição direta de insumos para parceiros',
      'Gestão de contratos de manutenção preventiva',
      'Acesso ao valuation e equity do ecossistema',
      'Participação ativa no Board de inovação tecnológica'
    ],
    earnings: 'Escalabilidade global com múltiplos fluxos de receita.',
    mechanics: 'Funciona como o hub logístico e comercial de uma região, consolidando a dominância da marca em larga escala.',
    cta: 'Acesso Board Members',
    color: '#A855F7'
  }
];

const LicensingPlans: React.FC = () => {
  const [activePlan, setActivePlan] = useState<string>(plans[0].id);

  return (
    <div className="w-full py-20">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Plan Selector */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="mb-10">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase text-white mb-4">
              Modelos de <span className="text-winf-primary italic">Licenciamento</span>
            </h2>
            <p className="text-winf-text_muted text-sm font-light uppercase tracking-widest leading-relaxed">
              Escolha seu nível de dominância no mercado de alta performance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`relative p-6 rounded-[32px] border transition-all duration-500 text-left overflow-hidden group ${
                  activePlan === plan.id
                    ? 'bg-winf-surface border-winf-primary/30 shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent border-winf-border hover:border-winf-primary/20'
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                     activePlan === plan.id ? 'bg-winf-primary text-black' : 'bg-winf-surface text-winf-text_muted'
                   }`}>
                      <plan.icon size={24} />
                   </div>
                   <div>
                     <p className={`text-[8px] font-black uppercase tracking-[0.3em] mb-1 ${
                       activePlan === plan.id ? 'text-winf-primary' : 'text-winf-text_muted/40'
                     }`}>
                       {plan.badge}
                     </p>
                     <h3 className={`text-xl font-black tracking-tighter uppercase ${
                       activePlan === plan.id ? 'text-white' : 'text-winf-text_muted'
                     }`}>
                       {plan.name}
                     </h3>
                   </div>
                </div>
                {activePlan === plan.id && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-winf-primary/5 to-transparent pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Details Display */}
        <div className="flex-1 w-full min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-winf-surface/50 border border-winf-border rounded-[48px] p-8 md:p-16 relative overflow-hidden h-full flex flex-col justify-between"
            >
              {/* Background Glow */}
              <div 
                className="absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-10 pointer-events-none rounded-full"
                style={{ backgroundColor: plans.find(p => p.id === activePlan)?.color }}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/5 border border-white/10 rounded-full">
                       <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: plans.find(p => p.id === activePlan)?.color }} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{plans.find(p => p.id === activePlan)?.badge}</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none">
                      {plans.find(p => p.id === activePlan)?.name}
                    </h2>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-3xl">
                    {React.createElement(plans.find(p => p.id === activePlan)!.icon, { size: 40, className: "text-white" })}
                  </div>
                </div>

                <p className="text-xl md:text-2xl font-light text-winf-text_muted leading-relaxed mb-16 max-w-2xl">
                  {plans.find(p => p.id === activePlan)?.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-winf-primary mb-6">Vantagens Estratégicas</h4>
                      <div className="space-y-4">
                        {plans.find(p => p.id === activePlan)?.advantages.map((adv, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <CheckCircle2 size={16} className="text-winf-primary shrink-0 mt-1" />
                            <span className="text-sm text-winf-text_muted leading-relaxed">{adv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-12">
                     <div className="p-8 border border-white/5 bg-white/[0.02] rounded-[32px]">
                        <div className="flex items-center gap-3 mb-4">
                           <TrendingUp size={18} className="text-winf-primary" />
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Ganhos Potenciais</h4>
                        </div>
                        <p className="text-xl font-bold text-white leading-relaxed">
                          {plans.find(p => p.id === activePlan)?.earnings}
                        </p>
                     </div>

                     <div className="p-8 border border-white/5 bg-white/[0.02] rounded-[32px]">
                        <div className="flex items-center gap-3 mb-4">
                           <Cpu size={18} className="text-winf-primary" />
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Engenharia Operacional</h4>
                        </div>
                        <p className="text-sm font-light text-winf-text_muted leading-relaxed italic">
                          "{plans.find(p => p.id === activePlan)?.mechanics}"
                        </p>
                     </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 relative z-10">
                 <button className="group w-full md:w-auto px-12 py-6 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.5em] transition-all hover:bg-winf-primary hover:shadow-[0_0_50px_rgba(var(--winf-primary-rgb),0.3)] active:scale-95 flex items-center justify-center gap-4">
                   {plans.find(p => p.id === activePlan)?.cta}
                   <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                 </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LicensingPlans;
