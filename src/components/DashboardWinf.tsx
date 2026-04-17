
import React, { useEffect, useState } from 'react';
import { 
  Activity,
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  Clock,
  Target,
  Zap,
  Plus,
  FileText,
  Shield,
  ChevronRight,
  Scissors,
  GraduationCap,
  Wallet,
  CheckCircle2,
  Link,
  Grid,
  MessageSquare,
  Box
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { ViewState } from '../types';
import { GoogleGenAI } from "@google/genai";
import { MetricSkeleton, LeadItemSkeleton } from './ui/LoadingSkeleton';

interface DashboardWinfProps {
    user: any;
    data: any;
    onChangeView: (view: ViewState) => void;
}

const QuickAction = ({ label, icon: Icon, onClick, color }: any) => (
  <motion.button 
    whileHover={{ scale: 1.02, translateY: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-winf-surface border border-winf-border hover:bg-winf-surface_hover hover:border-winf-primary/30 transition-all shadow-lg hover:shadow-winf-primary/5 group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-winf-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className={`p-3.5 rounded-xl bg-winf-background border border-white/5 group-hover:border-winf-primary/20 transition-colors ${color}`}>
        <Icon size={22} />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-winf-text_secondary group-hover:text-white transition-colors">{label}</span>
  </motion.button>
);

const MetricCard = ({ label, value, sub, icon: Icon, isLoading }: any) => {
  if (isLoading) return <MetricSkeleton />;
  
  return (
    <motion.div 
      whileHover={{ translateY: -4 }}
      className="bg-winf-surface border border-winf-border rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group cursor-default shadow-xl hover:shadow-winf-primary/5"
    >
       <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none group-hover:scale-110 transition-transform duration-500">
          <Icon size={80} />
       </div>
       <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-winf-primary/5 rounded-full blur-2xl group-hover:bg-winf-primary/10 transition-all"></div>
       
       <div className="relative z-10">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-winf-text_muted mb-2 group-hover:text-winf-text_secondary transition-colors">{label}</p>
          <h3 className="text-3xl font-mono font-bold text-winf-text_primary tracking-tighter">{value}</h3>
       </div>
       <div className="relative z-10 flex items-center gap-1.5 text-[10px] text-green-500 font-bold uppercase tracking-widest">
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
          {sub}
       </div>
    </motion.div>
  );
};

const DashboardWinf: React.FC<DashboardWinfProps> = ({ user, onChangeView }) => {
  const { leads, fetchUserPerformanceMetrics, isLoading } = useWinf();
  const [insight, setInsight] = useState<string>("INITIALIZING_ELITE_SYSTEMS...");
  const isAdmin = user?.role === 'Admin' || user?.role === 'Licenciado';
  
  useEffect(() => { 
    fetchUserPerformanceMetrics(); 
    const greetings = [
      "BEM-VINDO À ELITE, PARCEIRO. VAMOS DOMINAR O MERCADO HOJE.",
      "SUA JORNADA WINF™ PARTNERS COMEÇA COM FOCO TOTAL.",
      "PERFORMANCE É O NOSSO DNA. PRONTO PARA OS PRÓXIMOS LEADS?",
      "O COCKPIT ESTÁ PRONTO. SUA VISÃO DE MERCADO NUNCA FOI TÃO CLARA."
    ];
    setTimeout(() => setInsight(greetings[Math.floor(Math.random() * greetings.length)]), 1000);
  }, []);

  const highPriorityLeads = leads.slice(0, 4);

  const systemActivity = [
    { id: 1, type: 'lead', text: 'Novo lead detectado em Santos (BlackPro)', time: '2m atrás' },
    { id: 2, type: 'sale', text: 'Venda confirmada: Kit Studio Alpha', time: '15m atrás' },
    { id: 3, type: 'rank', text: 'Você subiu para o Top 10 regional', time: '1h atrás' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12"
    >
        {/* Welcome Hero Section - High Impact Minimalist */}
        <motion.div 
          variants={itemVariants}
          className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-winf-surface border border-winf-border p-6 lg:p-16 shadow-2xl"
        >
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-0"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-winf-primary/5 rounded-full blur-[100px] animate-pulse"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
                <div className="space-y-4 lg:space-y-6 max-w-2xl">
                    <div className="inline-flex items-center gap-3 px-3 lg:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] lg:text-[10px] font-medium uppercase tracking-[0.3em] text-winf-primary">
                        ACESSO DE ELITE CONFIRMADO
                    </div>
                    <h1 className="text-2xl sm:text-4xl lg:text-7xl font-black text-winf-text_primary tracking-tighter leading-[0.9] uppercase italic">
                        BEM-VINDO AO <br />
                        <span className="text-winf-primary">ECOSSISTEMA WINF™</span>
                    </h1>
                    <p className="text-base lg:text-xl text-winf-text_secondary font-light max-w-lg leading-relaxed">
                        Você não é apenas um aplicador. Você é um <span className="text-winf-text_primary font-bold italic">Parceiro Estratégico</span>. Use nossas ferramentas de elite para escalar seu faturamento.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-2 lg:pt-4">
                        <button 
                            onClick={() => onChangeView(ViewState.MODULE_ACADEMY)}
                            className="px-6 lg:px-10 py-3 lg:py-4 bg-white text-black hover:bg-zinc-200 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
                        >
                            Iniciar Treinamento <ChevronRight size={16} />
                        </button>
                        <button 
                            onClick={() => onChangeView(ViewState.INSTITUTIONAL_SITE)}
                            className="px-6 lg:px-10 py-3 lg:py-4 bg-transparent hover:bg-white/5 border border-white/10 text-white text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all active:scale-95"
                        >
                            Ver Site Institucional
                        </button>
                    </div>
                </div>
                
                {/* Quick Stats Pod */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full lg:w-auto">
                    <div className="bg-winf-background/60 backdrop-blur-xl border border-winf-border p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] text-center min-w-[140px] lg:min-w-[180px] shadow-2xl">
                        <p className="text-[8px] lg:text-[10px] font-black text-winf-text_muted uppercase tracking-[0.3em] mb-2 lg:mb-3">Seu Rank</p>
                        <p className="text-3xl lg:text-5xl font-black text-winf-primary italic tracking-tighter">#12</p>
                    </div>
                    <div className="bg-winf-background/60 backdrop-blur-xl border border-winf-border p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] text-center min-w-[140px] lg:min-w-[180px] shadow-2xl">
                        <p className="text-[8px] lg:text-[10px] font-black text-winf-text_muted uppercase tracking-[0.3em] mb-2 lg:mb-3">WinfCoins</p>
                        <p className="text-3xl lg:text-5xl font-black text-winf-text_primary italic tracking-tighter">{user.winfCoins.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Action Grid - Mobile Friendly */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <QuickAction label="Atendimento" icon={MessageSquare} color="text-winf-text_primary" onClick={() => onChangeView(ViewState.MODULE_CONSULTANCY_LINK)} />
            <QuickAction label="Orçamentos" icon={FileText} color="text-winf-text_secondary" onClick={() => onChangeView(ViewState.MODULE_QUOTES)} />
            <QuickAction label="Winf Precision™" icon={Scissors} color="text-winf-text_secondary" onClick={() => onChangeView(ViewState.MODULE_WINF_CUT)} />
            <QuickAction 
                label={isAdmin ? "Gestão Rede" : "Rede"} 
                icon={Users} 
                color="text-winf-text_secondary" 
                onClick={() => onChangeView(isAdmin ? ViewState.MODULE_THE_BOARD : ViewState.MODULE_CONNECT)} 
            />
            <QuickAction label="Academy" icon={GraduationCap} color="text-winf-text_secondary" onClick={() => onChangeView(ViewState.MODULE_ACADEMY)} />
            <QuickAction label="Estoque" icon={Box} color="text-winf-text_muted" onClick={() => onChangeView(ViewState.MODULE_STOCK)} />
        </motion.div>

        {/* Admin Control Room - Elite Access */}
        {isAdmin && (
            <motion.div variants={itemVariants} className="bg-zinc-900/80 border border-winf-primary/20 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-10 shadow-2xl shadow-winf-primary/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 lg:p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target size={80} className="text-winf-primary lg:w-[120px] lg:h-[120px]" />
                </div>
                <div className="relative z-10 space-y-4 lg:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-winf-primary rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                        <h2 className="text-xl lg:text-3xl font-black text-white tracking-tighter uppercase italic">WINF OS™ CONTROL ROOM</h2>
                    </div>
                    <p className="text-sm lg:text-base text-zinc-400 max-w-2xl font-medium">Acesso privilegiado ao núcleo do ecossistema. Monitore a performance global, gerencie licenciados e ajuste os algoritmos de IA em tempo real.</p>
                    <div className="flex flex-wrap gap-3 lg:gap-4 pt-2 lg:pt-4">
                        <button onClick={() => onChangeView(ViewState.MODULE_THE_BOARD)} className="bg-white text-black px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-black uppercase tracking-widest text-[10px] lg:text-xs hover:bg-zinc-200 transition-all">The Board™</button>
                        <button onClick={() => onChangeView(ViewState.MODULE_MISSION_CONTROL)} className="bg-zinc-800 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-black uppercase tracking-widest text-[10px] lg:text-xs hover:bg-zinc-700 transition-all">Mission Control™</button>
                        <button onClick={() => onChangeView(ViewState.MODULE_DATA_CORE)} className="bg-zinc-800 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-black uppercase tracking-widest text-[10px] lg:text-xs hover:bg-zinc-700 transition-all">Data Core™</button>
                    </div>
                </div>
            </motion.div>
        )}

        {/* System Activity & Intelligence Pulse */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-winf-surface border border-winf-border rounded-[2rem] p-8 relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-winf-primary/5 rounded-full -mr-48 -mt-48 blur-[100px] group-hover:bg-winf-primary/10 transition-all duration-1000"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-winf-text_muted">Status do Ecossistema: <span className="text-green-500">OPERACIONAL</span></span>
                        </div>
                        <h2 className="text-2xl font-black text-winf-text_primary tracking-tighter uppercase italic">Inteligência Winf™ Ativa</h2>
                        <p className="text-base text-winf-text_secondary font-mono tracking-tight">{insight}</p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-winf-text_muted uppercase tracking-[0.3em] mb-1">Latência Neural</p>
                            <p className="text-2xl font-mono font-bold text-winf-text_primary tracking-tighter">14ms</p>
                        </div>
                        <div className="w-px h-12 bg-winf-border"></div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-winf-text_muted uppercase tracking-[0.3em] mb-1">Sincronização</p>
                            <p className="text-2xl font-mono font-bold text-winf-primary tracking-tighter">99.8%</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Activity Feed */}
            <div className="lg:col-span-4 bg-winf-surface border border-winf-border rounded-[2rem] p-8 shadow-xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-winf-text_muted mb-6">Atividade Recente</h3>
                <div className="space-y-5">
                    {systemActivity.map(item => (
                        <div key={item.id} className="flex items-start gap-4 group cursor-default">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 transition-all duration-300 group-hover:scale-150 ${item.type === 'lead' ? 'bg-winf-text_primary shadow-[0_0_8px_rgba(var(--winf-primary-rgb),0.5)]' : item.type === 'sale' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-winf-text_muted'}`}></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-winf-text_primary font-bold leading-tight group-hover:text-winf-primary transition-colors">{item.text}</p>
                                <p className="text-[9px] text-winf-text_muted uppercase tracking-widest mt-1.5 font-mono">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-winf-surface border border-winf-border rounded-[2rem] p-8 flex flex-col justify-between group cursor-pointer hover:border-winf-primary/30 transition-all shadow-xl hover:shadow-winf-primary/5">
                <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-winf-primary group-hover:text-black transition-all">
                        <Zap size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-white/40 group-hover:text-white transition-colors" />
                </div>
                <div className="mt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-winf-text_muted mb-2">Ação Recomendada</p>
                    <h3 className="text-2xl font-black text-winf-text_primary leading-none uppercase italic tracking-tighter">Gere um Orçamento Elite</h3>
                </div>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricCard label="Faturamento" value="R$ 42.500" sub="+12% ESSA SEMANA" icon={DollarSign} isLoading={isLoading} />
                <MetricCard label="Leads Ativos" value={leads.length.toString()} sub="5 NOVOS HOJE" icon={Users} isLoading={isLoading} />
            </div>
        </motion.div>

        {/* Gamification Metrics - Elite Vision */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-winf-surface/50 border border-winf-border rounded-2xl p-6 flex flex-col gap-4 shadow-lg hover:border-winf-primary/20 transition-all">
                <div className="flex items-center gap-3 text-winf-primary">
                    <Target size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Winf™ Knowledge</span>
                </div>
                <div className="flex items-end justify-between">
                    <span className="text-3xl font-mono font-bold text-winf-text_primary tracking-tighter">{user.winf_knowledge || 0}</span>
                    <span className="text-[9px] text-winf-text_muted font-black uppercase tracking-widest">Level {Math.floor((user.winf_knowledge || 0) / 100) + 1}</span>
                </div>
                <div className="w-full h-1.5 bg-winf-background rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(user.winf_knowledge || 0) % 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-winf-primary shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    ></motion.div>
                </div>
            </div>
            <div className="bg-winf-surface/50 border border-winf-border rounded-2xl p-6 flex flex-col gap-4 shadow-lg hover:border-zinc-500/20 transition-all">
                <div className="flex items-center gap-3 text-zinc-400">
                    <Zap size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Cortex Influence™</span>
                </div>
                <div className="flex items-end justify-between">
                    <span className="text-3xl font-mono font-bold text-winf-text_primary tracking-tighter">{user.cortex_influence || 0}</span>
                    <span className="text-[9px] text-winf-text_muted font-black uppercase tracking-widest">Reach {user.cortex_influence || 0}x</span>
                </div>
                <div className="w-full h-1.5 bg-winf-background rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((user.cortex_influence || 0), 100)}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-zinc-600"
                    ></motion.div>
                </div>
            </div>
            <div className="bg-winf-surface/50 border border-winf-border rounded-2xl p-6 flex flex-col gap-4 shadow-lg hover:border-winf-text_secondary/20 transition-all">
                <div className="flex items-center gap-3 text-winf-text_secondary">
                    <Activity size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Memory™</span>
                </div>
                <div className="flex items-end justify-between">
                    <span className="text-3xl font-mono font-bold text-white tracking-tighter">{user.neural_memory || 0}%</span>
                    <span className="text-[9px] text-winf-text_muted font-black uppercase tracking-widest">Retention</span>
                </div>
                <div className="w-full h-1.5 bg-winf-background rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${user.neural_memory || 0}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-winf-text_secondary"
                    ></motion.div>
                </div>
            </div>
            <div className="bg-winf-surface/50 border border-winf-border rounded-2xl p-6 flex flex-col gap-4 shadow-lg hover:border-green-500/20 transition-all">
                <div className="flex items-center gap-3 text-green-500">
                    <Shield size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Tactical Assets™</span>
                </div>
                <div className="flex items-end justify-between">
                    <span className="text-3xl font-mono font-bold text-white tracking-tighter">{user.tactical_assets || 0}</span>
                    <span className="text-[9px] text-winf-text_muted font-black uppercase tracking-widest">Deployed</span>
                </div>
                <div className="w-full h-1.5 bg-winf-background rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((user.tactical_assets || 0) * 10, 100)}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                    ></motion.div>
                </div>
            </div>
        </motion.div>

        {/* Protocolo de Ativação - Onboarding de Elite */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Onboarding Checklist */}
            <div className="lg:col-span-5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Protocolo de Ativação</h3>
                    <span className="text-[9px] bg-winf-primary text-black px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.2)]">60% Concluído</span>
                </div>
                <div className="bg-winf-surface border border-winf-border rounded-[2rem] p-8 space-y-6 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-winf-primary/5 rounded-full -mr-24 -mt-24 blur-[80px]"></div>
                    
                    <div className="flex items-center gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                            <CheckCircle2 size={14} />
                        </div>
                        <span className="text-sm text-white font-medium group-hover:text-winf-primary transition-colors">Configurar Perfil e Winf ID</span>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                            <CheckCircle2 size={14} />
                        </div>
                        <span className="text-sm text-white font-medium group-hover:text-winf-primary transition-colors">Primeiro Acesso Winf Academy</span>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-winf-background border border-winf-primary/30 flex items-center justify-center text-winf-primary">
                            <div className="w-2 h-2 rounded-full bg-winf-primary animate-ping"></div>
                        </div>
                        <span className="text-sm text-white font-black italic group-hover:text-winf-primary transition-colors">Realizar Primeiro Pedido BlackShop</span>
                    </div>
                    <div className="flex items-center gap-4 group opacity-40">
                        <div className="w-6 h-6 rounded-full bg-winf-background border border-white/10 flex items-center justify-center text-winf-text_muted"></div>
                        <span className="text-sm text-gray-500 font-medium">Registrar Primeira Garantia</span>
                    </div>
                    
                    <button 
                        onClick={() => onChangeView(ViewState.MODULE_ACADEMY)}
                        className="w-full mt-6 py-4 bg-winf-primary hover:bg-winf-primary_hover text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
                    >
                        Continuar Integração <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>

            {/* Priority List */}
            <div className="lg:col-span-7">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Radar de Oportunidades</h3>
                    <button onClick={() => onChangeView(ViewState.MODULE_CAPTURE)} className="text-[9px] text-winf-primary hover:text-white transition-colors font-black uppercase tracking-widest">Ver todos</button>
                </div>
                
                <div className="bg-winf-surface border border-winf-border rounded-[2rem] overflow-hidden divide-y divide-white/[0.03] shadow-xl">
                    {isLoading ? (
                        <div className="divide-y divide-white/[0.03]">
                            <LeadItemSkeleton />
                            <LeadItemSkeleton />
                            <LeadItemSkeleton />
                        </div>
                    ) : highPriorityLeads.length === 0 ? (
                        <div className="p-16 text-center flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-winf-background border border-white/5 rounded-full flex items-center justify-center text-winf-text_muted">
                                <Target size={32} />
                            </div>
                            <p className="text-sm text-winf-text_muted font-mono uppercase tracking-widest">Nenhum lead pendente. Ótimo trabalho!</p>
                        </div>
                    ) : (
                        highPriorityLeads.map((lead) => (
                            <div 
                                key={lead.id} 
                                onClick={() => onChangeView(ViewState.MODULE_CAPTURE)}
                                className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-2.5 h-2.5 rounded-full ${lead.dominance_score > 80 ? 'bg-winf-primary animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-zinc-700'}`}></div>
                                    <div>
                                        <p className="text-base font-black text-white group-hover:text-winf-primary transition-colors uppercase italic tracking-tight">{lead.name}</p>
                                        <p className="text-[10px] text-winf-text_secondary font-mono uppercase tracking-widest mt-1">{lead.interest} • {lead.source}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-[11px] font-mono font-bold text-white leading-none">{lead.dominance_score}%</p>
                                        <p className="text-[7px] text-winf-text_muted font-black uppercase tracking-widest mt-1">DOMINANCE_SCORE</p>
                                    </div>
                                    <ChevronRight size={20} className="text-winf-text_muted group-hover:text-white transition-all group-hover:translate-x-1" />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </motion.div>
    </motion.div>
  );
};

export default DashboardWinf;
