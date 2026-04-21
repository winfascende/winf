import React from 'react';
import { 
  Star, ArrowUpRight
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { MODULES_CONFIG, ADMIN_MODULES } from '../config/modules';

interface ToolCardProps {
  id: string;
  title: string;
  icon: any;
  desc: string;
  onClick: () => void;
  isComingSoon?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon: Icon, desc, onClick, isComingSoon, isFavorite, onToggleFavorite }) => (
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
      
      {!isComingSoon && (
        <div className="flex items-center gap-2">
          <button 
            onClick={onToggleFavorite}
            className={`p-1.5 rounded-lg transition-all ${isFavorite ? 'text-yellow-500' : 'text-winf-text_muted hover:text-white opacity-0 group-hover:opacity-100'}`}
          >
            <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <ArrowUpRight size={16} className="text-winf-text_muted group-hover:text-white transition-colors" />
        </div>
      )}
    </button>
    
    {/* Tooltip */}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 text-white text-xs rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-50 shadow-xl border border-white/10 pointer-events-none">
      {isComingSoon ? 'Este módulo será liberado em breve.' : desc}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
    </div>
  </div>
);

const ModulesList: React.FC<{ onNavigate: (view: any) => void; userRole?: string }> = ({ onNavigate, userRole }) => {
  const { favoriteModules, toggleFavoriteModule } = useWinf();

  const tools = [...MODULES_CONFIG];

  if (userRole === 'Admin') {
    tools.push({
      category: 'Administrativo',
      items: ADMIN_MODULES
    });
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Ferramentas</h1>
        <p className="text-sm text-winf-text_secondary">Acesso rápido aos módulos do sistema.</p>
      </div>

      {tools.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <div className="flex items-center gap-4 group/header">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-winf-text_muted pl-1 transition-colors group-hover/header:text-winf-primary">
              {section.category}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-winf-primary/20 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {section.items.map((tool) => (
              <ToolCard 
                key={tool.id} 
                id={tool.id}
                title={tool.title}
                icon={tool.icon}
                desc={tool.desc}
                isComingSoon={tool.isComingSoon}
                isFavorite={favoriteModules.includes(tool.id)}
                onToggleFavorite={(e) => {
                  e.stopPropagation();
                  toggleFavoriteModule(tool.id);
                }}
                onClick={() => onNavigate(tool.viewState)} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModulesList;
