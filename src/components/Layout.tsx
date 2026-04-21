import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search,
  Grid, 
  Star, 
  Coins, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  ChevronLeft,
  Brain,
  CheckCircle2
} from 'lucide-react';
import { ViewState } from '../types';
import { useWinf } from '../contexts/WinfContext';
import { getAllModules } from '../config/modules';
import AgentAutomationsEngine from './AgentAutomationsEngine';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: any;
  onChangeView: (view: any) => void;
  user: any;
  onLogout: () => void;
  notification: any;
  onCloseNotification: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onChangeView, 
  user, 
  onLogout, 
  notification, 
  onCloseNotification 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const { agentInsights, markInsightAsRead, favoriteModules } = useWinf();

  const allModules = getAllModules();
  const favoriteItems = allModules.filter(m => favoriteModules?.includes(m.id) || false);

  const unreadInsights = agentInsights?.filter(i => !i.is_read) || [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onChangeView(ViewState.SEARCH);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onChangeView]);

  const navItems = [
    { id: ViewState.DASHBOARD_WINF, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.MODULES, label: 'Ferramentas', icon: Grid },
    { id: ViewState.W_RANK, label: 'W-Rank', icon: Star },
    { id: ViewState.DASHBOARD_WINFCOIN, label: 'WinfCoin', icon: Coins },
    { id: ViewState.PROFILE, label: 'Meu Perfil', icon: User },
  ];

  const handleNavClick = (view: ViewState) => {
    onChangeView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-winf-background text-winf-text_primary flex overflow-hidden selection:bg-winf-primary/30">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-winf-surface border-r border-winf-border transform transition-transform duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-winf-border">
          <div className="flex items-center gap-2">
            <span className="font-black tracking-tighter text-xl uppercase text-white">WINF™ OS</span>
            <span className="w-1.5 h-1.5 bg-winf-primary rounded-full animate-pulse"></span>
          </div>
          <button className="lg:hidden text-winf-text_muted hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isToolView = !navItems.find(i => i.id === currentView);
            const isActive = currentView === item.id || (item.id === ViewState.MODULES && isToolView);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-winf-primary/10 text-winf-primary border border-winf-primary/20' 
                    : 'text-winf-text_muted hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-winf-primary' : 'text-winf-text_muted'} />
                {item.label}
              </button>
            );
          })}

          {/* Favoritos Section */}
          {favoriteItems.length > 0 && (
            <div className="pt-6 space-y-2">
              <div className="flex items-center gap-2 px-4 mb-2">
                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-winf-text_muted">Favoritos</span>
              </div>
              {favoriteItems.map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleNavClick(module.viewState)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    currentView === module.viewState 
                      ? 'bg-winf-primary/5 text-winf-text_primary border-winf-primary/20' 
                      : 'text-winf-text_muted hover:bg-white/5 hover:text-white border-transparent'
                  }`}
                >
                  <module.icon size={14} strokeWidth={1.5} />
                  <span className="truncate">{module.title}</span>
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* User Area */}
        <div className="p-4 border-t border-winf-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-winf-primary/20 border border-winf-primary/30 flex items-center justify-center text-winf-primary font-black">
              {user?.name?.charAt(0) || 'W'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-winf-text_muted truncate">{user?.role || 'Membro'}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Topbar */}
        <header className="h-20 bg-winf-background/80 backdrop-blur-xl border-b border-winf-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-winf-text_muted hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-black uppercase tracking-widest text-white hidden sm:block">
                {navItems.find(i => i.id === currentView)?.label || 'WINF™ OS'}
              </h2>
              {!navItems.find(i => i.id === currentView) && (
                <button 
                  onClick={() => onChangeView(ViewState.MODULES)}
                  className="hidden sm:flex items-center gap-2 text-xs font-bold text-winf-text_muted hover:text-white transition-colors bg-winf-surface px-3 py-1.5 rounded-full border border-winf-border"
                >
                  <ChevronLeft size={14} /> Voltar
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Toggle */}
            <button 
              onClick={() => onChangeView(ViewState.SEARCH)}
              className="flex items-center gap-2 px-3 py-1.5 bg-winf-surface border border-winf-border rounded-full text-winf-text_muted hover:text-white transition-all group"
              title="Busca Global (Ctrl+K)"
            >
              <Search size={14} className="group-hover:text-winf-primary transition-colors" />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">Buscar...</span>
              <kbd className="hidden md:flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[9px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* WinfCoin Balance */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-winf-surface border border-winf-border rounded-full">
              <Coins size={14} className="text-yellow-500" />
              <span className="text-xs font-bold text-white">{user?.winfCoins || 0}</span>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsInsightsOpen(!isInsightsOpen)}
                className="relative p-2 text-winf-text_muted hover:text-white transition-colors rounded-full hover:bg-winf-surface"
              >
                <Brain size={20} className={unreadInsights.length > 0 ? "text-purple-400 animate-pulse" : ""} />
                {unreadInsights.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full"></span>
                )}
              </button>

              <AnimatePresence>
                {isInsightsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                      <h3 className="text-sm font-bold text-white uppercase tracking-tight flex items-center gap-2">
                        <Brain size={16} className="text-purple-400" />
                        WINF AI Insights
                      </h3>
                      <span className="text-xs font-mono text-gray-500">{unreadInsights.length} novos</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {agentInsights && agentInsights.length > 0 ? (
                        agentInsights.map(insight => (
                          <div key={insight.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${!insight.is_read ? 'bg-purple-500/5' : ''}`}>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xs font-bold text-white">{insight.title}</h4>
                              {!insight.is_read && (
                                <button 
                                  onClick={() => markInsightAsRead(insight.id)}
                                  className="text-gray-500 hover:text-green-400 transition-colors"
                                  title="Marcar como lido"
                                >
                                  <CheckCircle2 size={14} />
                                </button>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">{insight.content}</p>
                            <span className="text-[10px] text-gray-600 mt-2 block font-mono">
                              {new Date(insight.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          Nenhum insight gerado ainda.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-winf-text_muted hover:text-white transition-colors rounded-full hover:bg-winf-surface">
              <Bell size={20} />
              {notification && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-winf-primary rounded-full animate-pulse"></span>
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <AgentAutomationsEngine />
          
          {/* Notification Toast */}
          {notification && (
            <div className="absolute top-6 right-6 z-50 bg-winf-surface border border-winf-primary/30 shadow-[0_0_30px_rgba(var(--winf-primary-rgb),0.2)] rounded-xl p-4 flex items-start gap-3 max-w-sm animate-in slide-in-from-top-4">
              <div className="text-winf-primary mt-0.5">
                <Bell size={16} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white mb-1">{notification.title}</h4>
                <p className="text-xs text-winf-text_muted">{notification.message}</p>
              </div>
              <button onClick={onCloseNotification} className="text-winf-text_muted hover:text-white">
                <X size={14} />
              </button>
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
