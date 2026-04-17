
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  FileText, 
  Download, 
  Share2, 
  Play, 
  Pause, 
  Music, 
  Search,
  BookOpen,
  Zap,
  ExternalLink,
  Smartphone,
  Globe,
  ShieldCheck,
  Headphones,
  ArrowRight
} from 'lucide-react';
import { ViewState } from '../types';

interface Asset {
  id: string;
  title: string;
  type: 'catalog' | 'tech' | 'audio';
  category: string;
  description: string;
  fileSize?: string;
  duration?: string;
  audioUrl?: string;
  script?: string;
}

const ARSENAL_DATA: Asset[] = [
  { 
    id: '1', 
    title: 'The Art of Protection: Volume I', 
    type: 'catalog', 
    category: 'Lifestyle', 
    description: 'Catálogo de luxo focado em experiência do usuário e estética de super-carros.', 
    fileSize: '18.4 MB' 
  },
  { 
    id: '2', 
    title: 'Select™ Architectural Series', 
    type: 'catalog', 
    category: 'Arquitetura', 
    description: 'Portfólio técnico para arquitetos de alto padrão e projetos corporativos.', 
    fileSize: '12.8 MB' 
  },
  { 
    id: '3', 
    title: 'Ficha Técnica: AeroCore™ Nano-Ceramic', 
    type: 'tech', 
    category: 'Técnico', 
    description: 'Dados brutos de rejeição IR (99%), bloqueio UV e fator de proteção FPS 1000+.', 
    fileSize: '1.2 MB' 
  },
  { 
    id: '4', 
    title: 'Áudio: A Ciência do IR-99', 
    type: 'audio', 
    category: 'Educação', 
    description: 'Explicação audível sobre como a nanotecnologia Winf bloqueia o calor sem escurecer o vidro.', 
    duration: '0:45',
    script: 'A nanocerâmica Winf não é apenas escura, ela é inteligente. Enquanto películas comuns absorvem calor, nossas moléculas AeroCore refletem o espectro infravermelho em 99%...'
  },
];

const ModuleArsenal: React.FC<{ onBack: () => void, onNavigate: (view: ViewState) => void }> = ({ onBack, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'catalog' | 'tech' | 'audio'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredAssets = ARSENAL_DATA.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || asset.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-20">
      {/* Header Tático */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/[0.03] pb-8 md:pb-10 gap-6 md:gap-8 px-4 md:px-0">
        <div className="w-full md:flex-1">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            <ChevronLeft size={14} /> Back to Hub
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-light text-white tracking-tighter leading-none">TACTICAL <span className="font-bold text-zinc-400">ARSENAL</span></h1>
          <p className="text-gray-600 text-[9px] md:text-xs mt-3 uppercase tracking-widest font-mono">Sales Intelligence & Technical Assets</p>
        </div>
        
        <div className="w-full md:w-72 relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input 
            type="text" 
            placeholder="Pesquisar munição..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/10 rounded-full py-3 pl-11 pr-4 text-[11px] text-white focus:border-zinc-700 focus:bg-white/[0.05] outline-none transition-all placeholder:text-gray-700"
          />
        </div>
      </div>

      {/* Grid: Bridge to Institutional Site */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0">
        <div 
           onClick={() => onNavigate(ViewState.INSTITUTIONAL_SITE)}
           className="bg-gradient-to-br from-zinc-800/20 to-black border border-zinc-700/30 p-6 md:p-10 rounded-2xl relative overflow-hidden group cursor-pointer hover:border-zinc-600 transition-all"
        >
            <div className="absolute top-0 right-0 p-16 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none group-hover:bg-zinc-800/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                        <Globe size={20} />
                    </div>
                    <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-tighter">Site Institucional</h3>
                </div>
                <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed font-light">
                    Personalize sua presença digital. O site oficial se adapta ao seu território para SEO local e conversão de autoridade.
                </p>
                <div className="inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-white text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    Visualizar Versão do Cliente <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-800/20 to-black border border-zinc-700/30 p-6 md:p-10 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-16 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none group-hover:bg-zinc-800/20 transition-all"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                        <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-tighter">Verificador de Garantia</h3>
                </div>
                <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed font-light">
                    Link público para o cliente verificar a autenticidade do seu certificado Winf™ PARTNERS diretamente no portal global.
                </p>
                <button className="inline-flex items-center justify-center w-full sm:w-auto gap-3 border border-white/10 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Gerar Link de Cliente <ArrowRight size={14} />
                </button>
            </div>
        </div>
      </div>

      {/* Tabs Minimalistas */}
      <div className="overflow-x-auto pb-2 px-4 md:px-0 scrollbar-hide">
        <div className="flex gap-1 bg-black/40 border border-white/5 p-1 rounded-lg w-fit">
          {[
            { id: 'all', label: 'Tudo', icon: Zap },
            { id: 'catalog', label: 'Catálogos', icon: BookOpen },
            { id: 'tech', label: 'Fichas Técnicas', icon: FileText },
            { id: 'audio', label: 'Neural Audios', icon: Music },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 md:px-6 py-2 md:py-2.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-zinc-800 text-white shadow-lg shadow-zinc-800/20' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <tab.icon size={12} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/10 transition-all"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:border-white/30 transition-all`}>
                  {asset.type === 'catalog' && <BookOpen size={20} strokeWidth={1.5} />}
                  {asset.type === 'tech' && <FileText size={20} strokeWidth={1.5} />}
                  {asset.type === 'audio' && <Headphones size={20} strokeWidth={1.5} />}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">{asset.category}</span>
              </div>
              
              <h3 className="text-white font-bold text-base uppercase tracking-tighter mb-3 group-hover:text-white transition-colors">{asset.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light mb-8">{asset.description}</p>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-6 relative z-10">
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                {asset.type === 'audio' ? asset.duration : asset.fileSize}
              </div>
              
              <div className="flex gap-3">
                {asset.type === 'audio' ? (
                  <button 
                    onClick={() => setPlayingId(playingId === asset.id ? null : asset.id)}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                  >
                    {playingId === asset.id ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                  </button>
                ) : (
                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                    <Download size={16} />
                  </button>
                )}
                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleArsenal;
