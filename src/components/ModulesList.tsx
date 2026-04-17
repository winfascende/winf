import React from 'react';
import { 
  Zap, Globe, Star, Gauge, ShoppingBag, Wallet, Scissors,
  GraduationCap, Briefcase, FileSpreadsheet, 
  Building2, ShieldCheck, MonitorPlay, ArrowUpRight,
  Package, LayoutDashboard, Users, Target, Monitor, Link, HelpCircle, Brain
} from 'lucide-react';
import { ViewState } from '../types';

interface ModulesListProps {
  onNavigate: (view: ViewState) => void;
  userRole?: string;
}

const ToolCard = ({ title, icon: Icon, desc, onClick, isComingSoon }: any) => (
  <div className="relative group/tooltip">
    <button 
      onClick={isComingSoon ? undefined : onClick} 
      className={`w-full flex items-center gap-4 p-4 bg-winf-surface border border-winf-border rounded-xl transition-all text-left group ${isComingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:bg-winf-surface_hover hover:border-winf-primary/30'}`}
    >
      <div className={`w-10 h-10 rounded-lg bg-winf-background border border-winf-border flex items-center justify-center text-winf-text_secondary transition-colors ${!isComingSoon && 'group-hover:text-white group-hover:bg-winf-primary/20'}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white truncate">{title}</h3>
          {isComingSoon && (
            <span className="text-[7px] font-black uppercase tracking-tighter bg-winf-primary/20 text-winf-primary px-1.5 py-0.5 rounded">Em breve</span>
          )}
        </div>
        <p className="text-xs text-winf-text_secondary truncate">{desc}</p>
      </div>
      {!isComingSoon && <ArrowUpRight size={16} className="text-winf-text_muted group-hover:text-white transition-colors" />}
    </button>
    
    {/* Tooltip */}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 text-white text-xs rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-50 shadow-xl border border-white/10 pointer-events-none">
      {isComingSoon ? 'Este módulo será liberado em breve.' : desc}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
    </div>
  </div>
);

const ModulesList: React.FC<ModulesListProps> = ({ onNavigate, userRole }) => {
  const tools = [
    { category: 'Comercial', items: [
        { title: 'Consultoria Digital', icon: Link, desc: 'Link de Atendimento & QR Code', action: () => onNavigate(ViewState.MODULE_CONSULTANCY_LINK) },
        { title: 'WINF BRAIN™', icon: Brain, desc: 'Inteligência Artificial Central', action: () => onNavigate(ViewState.MODULE_WINF_BRAIN) },
        { title: 'Orçamentos Elite', icon: FileSpreadsheet, desc: 'Gerador de Propostas', action: () => onNavigate(ViewState.MODULE_QUOTES) },
        { title: 'Blackshop™', icon: ShoppingBag, desc: 'Loja Oficial Winf', action: () => onNavigate(ViewState.SALES_FUNNEL) },
    ]},
    { category: 'Operacional', items: [
        { title: 'Winf Stock™', icon: Package, desc: 'Gestão de Materiais', action: () => onNavigate(ViewState.MODULE_STOCK) },
        { title: 'Financeiro', icon: Wallet, desc: 'Gestão de Caixa', action: () => onNavigate(ViewState.MODULE_FINANCIAL) },
        { title: 'Winf Academy™', icon: GraduationCap, desc: 'Treinamento & Certificação', action: () => onNavigate(ViewState.MODULE_ACADEMY) },
    ]},
    { category: 'Técnico', items: [
        { title: 'Winf Precision™', icon: Scissors, desc: 'Otimizador de Corte', action: () => onNavigate(ViewState.MODULE_WINF_CUT) },
        { title: 'Gestão de Serviços', icon: ShieldCheck, desc: 'Instalações & Garantias', action: () => onNavigate(ViewState.MODULE_INSTALLATIONS) },
        { title: 'Catálogo Pro', icon: Package, desc: 'Produtos & Fichas Técnicas', action: () => onNavigate(ViewState.PRODUCTS_CATALOG) },
    ]},
    { category: 'Estratégico', items: [
        { title: 'Arsenal Tático', icon: Zap, desc: 'Scripts & Marketing', action: () => onNavigate(ViewState.MODULE_ARSENAL) },
        { title: 'Central de Integrações', icon: Globe, desc: 'Zapier, Webhooks e APIs', action: () => onNavigate(ViewState.MODULE_INTEGRATIONS) },
        { title: 'Rede de Operadores', icon: Users, desc: 'Winf Connect™ Community', action: () => onNavigate(ViewState.MODULE_CONNECT) },
        { title: 'W-Rank', icon: Star, desc: 'Nível & Performance', action: () => onNavigate(ViewState.W_RANK) },
        { title: 'FAQ Central', icon: HelpCircle, desc: 'Suporte & Dúvidas', action: () => onNavigate(ViewState.MODULE_FAQ) },
    ]},
    { category: 'Expansão', items: [
        { title: 'Kiosk Mode', icon: Monitor, desc: 'Interface de Varejo Shopping', action: () => {}, isComingSoon: true },
        { title: 'Studio Flagship', icon: Building2, desc: 'Gestão de Loja Conceito', action: () => {}, isComingSoon: true },
    ]}
  ];

  if (userRole === 'Admin') {
    tools.push({
      category: 'Administrativo',
      items: [
        { title: 'The Board™', icon: LayoutDashboard, desc: 'Gestão de Rede', action: () => onNavigate(ViewState.MODULE_THE_BOARD) },
        { title: 'Gestor Catálogo', icon: Package, desc: 'Single Source of Truth', action: () => onNavigate(ViewState.MODULE_BLACKSHOP_ADMIN) },
        { title: 'Mission Control™', icon: Target, desc: 'Distribuição de Leads', action: () => onNavigate(ViewState.MODULE_MISSION_CONTROL) },
        { title: 'WINF™ WORLD', icon: Globe, desc: 'Orquestração de Agentes Global', action: () => onNavigate(ViewState.MODULE_WINF_WORLD) },
      ]
    });
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Ferramentas</h1>
        <p className="text-sm text-winf-text_secondary">Acesso rápido aos módulos do sistema.</p>
      </div>

      {tools.map((section, idx) => (
        <div key={idx} className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-winf-text_muted pl-1">{section.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {section.items.map((tool, tIdx) => (
              <ToolCard key={tIdx} {...tool} onClick={tool.action} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModulesList;
