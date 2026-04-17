
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Home, 
  Search, 
  Library, 
  ListMusic, 
  Heart, 
  Settings, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  Clock, 
  MoreHorizontal,
  Disc,
  Headphones,
  Radio,
  Mic2,
  Music,
  Car, Plane, Building, Anchor, Shield, Award, Rocket, Leaf, Zap, Moon
} from 'lucide-react';

interface ModuleSpotifyProps {
  onBack: () => void;
}

type Tab = 'home' | 'explore' | 'library' | 'playlists' | 'favorites' | 'settings';

const FEATURED = [
  {
    id: 1,
    title: 'Winf Premium Collection',
    desc: 'Uma coleção exclusiva de faixas premium selecionadas para acompanhar sua experiência Winf™.',
    stats: '25 faixas • 1h 45min',
    icon: Music,
    color: 'from-green-600 to-green-900',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'AeroCore™ MOBILE Drive',
    desc: 'A trilha sonora perfeita para suas viagens com proteção AeroCore™ MOBILE.',
    stats: '18 faixas • 1h 20min',
    icon: Car,
    color: 'from-zinc-800 to-zinc-900',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'AeroCore™ AIR Ambience',
    desc: 'Sons ambientes para voos tranquilos com a proteção AeroCore™ AIR.',
    stats: '15 faixas • 1h 10min',
    icon: Plane,
    color: 'from-zinc-800 to-purple-900',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop'
  }
];

const PLAYLISTS = [
  { id: 1, title: 'Winf Select™ Workspace', desc: 'Música para ambientes de trabalho.', count: '12 faixas', duration: '55min', icon: Building, color: 'text-gray-300' },
  { id: 2, title: 'AeroCore™ MARINE Waves', desc: 'Sons náuticos para sua experiência.', count: '10 faixas', duration: '48min', icon: Anchor, color: 'text-zinc-400' },
  { id: 3, title: 'NeoSkin™ ADV-X Intensity', desc: 'Batidas intensas para proteção extrema.', count: '15 faixas', duration: '1h 05min', icon: Shield, color: 'text-red-400' },
  { id: 4, title: 'Winf Ascend™ Focus', desc: 'Música para concentração e excelência.', count: '20 faixas', duration: '1h 30min', icon: Award, color: 'text-winf-ascend_green' },
  { id: 5, title: 'W.A.R.P.™ Soundscape', desc: 'Paisagens sonoras para parceiros.', count: '8 faixas', duration: '42min', icon: Rocket, color: 'text-gray-400' },
  { id: 6, title: 'Cuidar & Conectar™ Nature', desc: 'Sons da natureza para sustentabilidade.', count: '14 faixas', duration: '1h 10min', icon: Leaf, color: 'text-green-400' },
  { id: 7, title: 'Winf™ Driver Beats', desc: 'Ritmos para automação de conteúdo.', count: '16 faixas', duration: '1h 15min', icon: Zap, color: 'text-zinc-400' },
  { id: 8, title: 'Universo Dark™ Ambient', desc: 'Atmosfera exclusiva para investidores.', count: '10 faixas', duration: '50min', icon: Moon, color: 'text-zinc-400' },
];

const TRACKS = [
  { id: 1, title: 'Winf™ Harmony', artist: 'Winf Sound Experience', album: 'Winf Premium Collection', duration: '5:12', playing: true },
  { id: 2, title: 'Carbon Reflection', artist: 'AeroCore™ Ensemble', album: 'AeroCore™ MOBILE Drive', duration: '4:35', playing: false },
  { id: 3, title: 'Stratospheric Dreams', artist: 'GravityZero', album: 'AeroCore™ AIR Ambience', duration: '6:18', playing: false },
  { id: 4, title: 'Deep Blue Horizon', artist: 'Marine Soundwaves', album: 'AeroCore™ MARINE Waves', duration: '4:52', playing: false },
  { id: 5, title: 'Invisible Shield', artist: 'Select Architects', album: 'Winf Select™ Workspace', duration: '3:45', playing: false },
  { id: 6, title: 'Ascend to Excellence', artist: 'Certification Masters', album: 'Winf Ascend™ Focus', duration: '5:30', playing: false },
  { id: 7, title: 'Eco Pulse', artist: 'Sustainable Beats', album: 'Cuidar & Conectar™ Nature', duration: '4:15', playing: false },
  { id: 8, title: 'Dark Matter Investment', artist: 'Universo Obscuro', album: 'Universo Dark™ Ambient', duration: '5:55', playing: false },
];

const ModuleSpotify: React.FC<ModuleSpotifyProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(33); // 33%

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-winf-border pb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-2 transition-colors text-sm">
            <ChevronLeft size={16} /> Voltar aos Módulos
          </button>
          <h1 className="text-3xl font-light text-white tracking-tight">SPOTIFY <span className="font-bold text-[#1DB954]">WINF</span><span className="text-xs align-top ml-1 text-gray-500">™</span></h1>
          <p className="text-gray-400 text-sm mt-1">
            Playlists curadas e experiências sonoras exclusivas do ecossistema Winf.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
                <p className="text-white font-bold text-sm">Carlos Mendes</p>
                <p className="text-[10px] text-[#1DB954] font-bold tracking-widest uppercase">Premium User</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1DB954] to-green-800 p-[2px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-white text-sm">CM</div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar (Desktop) / Top Bar (Mobile) */}
        <div className="lg:col-span-2 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 no-scrollbar">
          {[
            { id: 'home', icon: Home, label: 'Início' },
            { id: 'explore', icon: Search, label: 'Explorar' },
            { id: 'library', icon: Library, label: 'Biblioteca' },
            { id: 'playlists', icon: ListMusic, label: 'Playlists' },
            { id: 'favorites', icon: Heart, label: 'Favoritos' },
            { id: 'settings', icon: Settings, label: 'Configurações' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-[#1DB954] text-black font-bold shadow-[0_0_15px_rgba(29,185,84,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-10 space-y-8">
          
          {/* Now Playing Hero */}
          <div className="bg-gradient-to-r from-gray-900 to-black border border-winf-border rounded-xl p-6 md:p-8 relative overflow-hidden group">
            {/* Ambient Background Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1DB954]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-end">
               {/* Album Art */}
               <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-lg shadow-2xl relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(29,185,84,0.2)] transition-shadow duration-500">
                  <img 
                    src={TRACKS[0].playing ? "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop" : ""} 
                    alt="Album Art" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                       <Disc size={32} className={`text-white ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse shadow-lg">
                     Ao Vivo
                  </div>
               </div>

               {/* Track Info & Controls */}
               <div className="flex-1 w-full">
                  <div className="mb-6 text-center md:text-left">
                     <h3 className="text-xs text-[#1DB954] font-bold uppercase tracking-widest mb-1">Tocando Agora</h3>
                     <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">Winf™ Harmony</h2>
                     <p className="text-lg text-gray-300">Winf Sound Experience</p>
                     <p className="text-sm text-gray-500">Álbum: Winf Premium Collection</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6 group/progress">
                     <div className="flex justify-between text-xs text-gray-500 font-mono mb-2">
                        <span>1:45</span>
                        <span>5:12</span>
                     </div>
                     <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden cursor-pointer">
                        <div 
                          className="h-full bg-[#1DB954] relative group-hover/progress:bg-[#1ed760] transition-colors"
                          style={{ width: `${progress}%` }}
                        >
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
                        </div>
                     </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center md:justify-start gap-6">
                     <button className="text-gray-400 hover:text-white transition-colors"><Shuffle size={20} /></button>
                     <button className="text-gray-300 hover:text-white transition-colors"><SkipBack size={28} /></button>
                     <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                     >
                        {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                     </button>
                     <button className="text-gray-300 hover:text-white transition-colors"><SkipForward size={28} /></button>
                     <button className="text-gray-400 hover:text-white transition-colors"><Repeat size={20} /></button>
                     
                     <div className="ml-auto hidden md:flex items-center gap-2 group/volume">
                        <Volume2 size={20} className="text-gray-400" />
                        <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden cursor-pointer">
                           <div className="w-[70%] h-full bg-gray-500 group-hover/volume:bg-white transition-colors"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div>
             <h3 className="text-xl font-bold text-white mb-4">Destaques</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FEATURED.map((item) => (
                   <div key={item.id} className="bg-winf-card border border-winf-border rounded-xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
                      <div className="relative h-32 overflow-hidden">
                         <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                         <img src={item.image} alt={item.title} className="w-full h-full object-cover mix-blend-overlay" />
                         <div className="absolute bottom-3 left-4 flex items-center gap-2">
                            <div className="p-2 bg-black/30 backdrop-blur-md rounded-lg text-white">
                               <item.icon size={20} />
                            </div>
                         </div>
                      </div>
                      <div className="p-4">
                         <h4 className="text-lg font-bold text-white mb-1 group-hover:text-winf-spotify transition-colors">{item.title}</h4>
                         <p className="text-xs text-gray-400 mb-3 line-clamp-2">{item.desc}</p>
                         <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                            <Headphones size={12} /> {item.stats}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Playlists Grid */}
             <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-bold text-white">Playlists Winf™</h3>
                   <div className="flex gap-2">
                      {['Todas', 'Recentes', 'Populares', 'Exclusivas'].map((filter, i) => (
                         <button key={i} className={`text-xs px-3 py-1 rounded-full border transition-colors ${i === 0 ? 'bg-white text-black border-white' : 'border-winf-border text-gray-400 hover:text-white hover:border-gray-500'}`}>
                            {filter}
                         </button>
                      ))}
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {PLAYLISTS.map((playlist) => (
                      <div key={playlist.id} className="flex items-center gap-4 p-3 rounded-xl bg-winf-card border border-winf-border hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer group">
                         <div className="w-16 h-16 rounded-lg bg-black flex items-center justify-center shrink-0 border border-winf-border group-hover:border-gray-500 transition-colors shadow-lg">
                            <playlist.icon size={24} className={playlist.color} />
                         </div>
                         <div className="min-w-0">
                            <h4 className="text-white font-bold text-sm truncate group-hover:text-winf-spotify transition-colors">{playlist.title}</h4>
                            <p className="text-xs text-gray-500 truncate mb-1">{playlist.desc}</p>
                            <p className="text-[10px] text-gray-600 font-mono">{playlist.count} • {playlist.duration}</p>
                         </div>
                         <button className="ml-auto w-8 h-8 rounded-full bg-[#1DB954] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                            <Play size={12} fill="black" className="ml-0.5" />
                         </button>
                      </div>
                   ))}
                </div>
             </div>

             {/* Recent Tracks List */}
             <div className="lg:col-span-1 bg-winf-card border border-winf-border rounded-xl overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-winf-border">
                   <h3 className="text-lg font-bold text-white">Faixas Recentes</h3>
                </div>
                <div className="overflow-y-auto max-h-[500px] flex-1 no-scrollbar">
                   {TRACKS.map((track, idx) => (
                      <div key={track.id} className={`flex items-center gap-3 p-3 hover:bg-white/5 transition-colors cursor-pointer group ${track.playing ? 'bg-white/5' : ''}`}>
                         <span className={`text-xs font-mono w-4 text-center ${track.playing ? 'text-[#1DB954]' : 'text-gray-600'}`}>
                            {track.playing ? <div className="flex gap-0.5 justify-center items-end h-3"><div className="w-0.5 bg-[#1DB954] h-2 animate-pulse"></div><div className="w-0.5 bg-[#1DB954] h-3 animate-pulse delay-75"></div><div className="w-0.5 bg-[#1DB954] h-1.5 animate-pulse delay-150"></div></div> : idx + 1}
                         </span>
                         <div className="min-w-0 flex-1">
                            <h4 className={`text-sm font-medium truncate ${track.playing ? 'text-[#1DB954]' : 'text-white'}`}>{track.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{track.artist}</p>
                         </div>
                         <span className="text-xs text-gray-600 font-mono">{track.duration}</span>
                      </div>
                   ))}
                </div>
                <div className="p-4 border-t border-winf-border text-center">
                   <button className="text-xs text-gray-400 hover:text-white transition-colors">Ver histórico completo</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleSpotify;