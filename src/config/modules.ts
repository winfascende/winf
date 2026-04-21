import { 
  Zap, Globe, Star, ShoppingBag, Wallet, Scissors,
  GraduationCap, FileSpreadsheet, 
  Building2, ShieldCheck, Link, HelpCircle, Brain,
  Package, LayoutDashboard, Users, Target, Monitor, Cpu,
  Filter, MessageCircle, CalendarDays, PackageSearch, Blocks, Trophy
} from 'lucide-react';
import { ViewState } from '../types';

export interface ModuleItem {
  id: string;
  title: string;
  icon: any;
  desc: string;
  viewState: ViewState;
  isComingSoon?: boolean;
  isAdminOnly?: boolean;
}

export interface ModuleCategory {
  category: string;
  items: ModuleItem[];
}

export const MODULES_CONFIG: ModuleCategory[] = [
  { category: 'CRM & Vendas', items: [
      { id: 'sales_funnel', title: 'Funil & CRM', icon: Filter, desc: 'Gestão de Leads & Clientes', viewState: ViewState.SALES_FUNNEL },
      { id: 'quotes', title: 'Orçamentos Elite', icon: FileSpreadsheet, desc: 'Gerador de Propostas (PDF)', viewState: ViewState.MODULE_QUOTES },
      { id: 'whatsapp_hub', title: 'WhatsApp Central', icon: MessageCircle, desc: 'Chat & Automação de Mensagens', viewState: ViewState.MODULE_WHATSAPP_HUB },
      { id: 'consultancy', title: 'Consultoria Digital', icon: Link, desc: 'Atendimento & Portfolio', viewState: ViewState.MODULE_CONSULTANCY_LINK },
  ]},
  { category: 'Serviços & Operação', items: [
      { id: 'installations', title: 'Serviços & Agenda', icon: CalendarDays, desc: 'OS, Agendamentos e Garantia', viewState: ViewState.MODULE_INSTALLATIONS },
      { id: 'precision', title: 'Winf Precision™', icon: Scissors, desc: 'Otimizador de Corte (M²)', viewState: ViewState.MODULE_WINF_CUT },
      { id: 'molecular_twin', title: 'Molecular Twin™', icon: Cpu, desc: 'Simulador IA de Eficiência', viewState: ViewState.MODULE_MOLECULAR_TWIN },
      { id: 'catalog', title: 'Catálogo Oficial', icon: PackageSearch, desc: 'Conhecimento Técnico e Fichas', viewState: ViewState.PRODUCTS_CATALOG },
  ]},
  { category: 'Gestão Financeira & Caixa', items: [
      { id: 'financial', title: 'Fluxo de Caixa', icon: Wallet, desc: 'Receitas, Despesas e DRE', viewState: ViewState.MODULE_FINANCIAL },
      { id: 'stock', title: 'Winf Stock™', icon: Package, desc: 'Inventário de Bobinas', viewState: ViewState.MODULE_STOCK },
      { id: 'blackshop', title: 'Blackshop™', icon: ShoppingBag, desc: 'Reposição & Compras ERP B2B', viewState: ViewState.MODULE_BLACKSHOP },
  ]},
  { category: 'Growth & Ferramentas IA', items: [
      { id: 'brain', title: 'WINF BRAIN™', icon: Brain, desc: 'Inteligência Artificial Auxiliar', viewState: ViewState.MODULE_WINF_BRAIN },
      { id: 'arsenal', title: 'Arsenal Tático', icon: Zap, desc: 'Scripts Vencedores & Branding', viewState: ViewState.MODULE_ARSENAL },
      { id: 'integrations', title: 'Central de Integração', icon: Blocks, desc: 'Plataformas via Zapier/Webhooks', viewState: ViewState.MODULE_INTEGRATIONS },
  ]},
  { category: 'WINF™ Network', items: [
      { id: 'academy', title: 'Winf Academy™', icon: GraduationCap, desc: 'Trilhas de Aperfeiçoamento', viewState: ViewState.MODULE_ACADEMY },
      { id: 'wrank', title: 'W-Rank Oficial', icon: Trophy, desc: 'Missões & Nível de Autoridade', viewState: ViewState.W_RANK },
      { id: 'connect', title: 'Rede WINF', icon: Users, desc: 'Comunidade de Operadores', viewState: ViewState.MODULE_CONNECT },
      { id: 'faq', title: 'FAQ Central', icon: HelpCircle, desc: 'Guias e Resolução Rápida', viewState: ViewState.MODULE_FAQ },
  ]},
  { category: 'Expansão Física', items: [
      { id: 'kiosk', title: 'Kiosk Mode', icon: Monitor, desc: 'Atendimento Visual Totem', viewState: ViewState.MODULE_KIOSK_MODE, isComingSoon: false },
  ]}
];

export const ADMIN_MODULES: ModuleItem[] = [
  { id: 'board', title: 'The Board™', icon: LayoutDashboard, desc: 'Gestão de Rede de Licenciados', viewState: ViewState.MODULE_THE_BOARD, isAdminOnly: true },
  { id: 'catalog_admin', title: 'Gestor de Produtos', icon: Package, desc: 'Single Source of Truth', viewState: ViewState.MODULE_BLACKSHOP_ADMIN, isAdminOnly: true },
  { id: 'mission_control', title: 'Mission Control™', icon: Target, desc: 'Logística de Lead Flow', viewState: ViewState.MODULE_MISSION_CONTROL, isAdminOnly: true },
  { id: 'world', title: 'WINF™ WORLD', icon: Globe, desc: 'Mapeamento Global de Instalações', viewState: ViewState.MODULE_WINF_WORLD, isAdminOnly: true },
];

export const getAllModules = () => {
  const all: ModuleItem[] = [];
  MODULES_CONFIG.forEach(cat => all.push(...cat.items));
  all.push(...ADMIN_MODULES);
  return all;
};
