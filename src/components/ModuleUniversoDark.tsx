
import React, { useState } from 'react';
import { ChevronLeft, Lock, BarChart2, PieChart, TrendingUp, Loader, CheckCircle, Zap, Target, DollarSign, TrendingDown, ShieldCheck, Briefcase, Building2, Diamond, Store } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useWinf } from '../contexts/WinfContext';

interface ModuleUniversoDarkProps {
  onBack: () => void;
}

const GROWTH_DATA = [
  { step: 'Início', arr: 0.6, equity: 10 },
  { step: 'Fase 1', arr: 3.1, equity: 25 },
  { step: 'Fase 2', arr: 6.3, equity: 45 },
  { step: 'Fase 3', arr: 15.8, equity: 70 },
  { step: 'Meta', arr: 31.8, equity: 90 },
];

const ModuleUniversoDark: React.FC<ModuleUniversoDarkProps> = ({ onBack }) => {
  const { gamify } = useWinf();
  const [accessStatus, setAccessStatus] = useState<'IDLE' | 'LOADING' | 'PENDING'>('IDLE');

  const handleRequestAccess = () => {
    setAccessStatus('LOADING');
    setTimeout(() => { setAccessStatus('PENDING'); gamify('REDEEM'); }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 bg-black">
      {/* Header CEO Style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-white mb-2 transition-colors text-[10px] font-bold uppercase tracking-widest">
            <ChevronLeft size={14} /> Back to Core
          </button>
          <h1 className="text-4xl font-heading font-light text-white tracking-tight uppercase">UNIVERSO <span className="font-bold text-zinc-500">DARK</span></h1>
          <p className="text-gray-500 text-xs mt-1 max-w-2xl font-mono uppercase tracking-widest">Equity & Growth Dashboard // Board Access Only</p>
        </div>
        <div className="flex items-center gap-4 bg-zinc-900/10 border border-winf-darkpurple/30 px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(75,0,130,0.2)]">
          <div>
            <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest text-right">Valuation Alvo (Meta)</p>
            <p className="text-2xl text-white font-bold font-mono">R$ 90.000.000</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#050505] border border-white/5 rounded-sm p-8 relative overflow-hidden group shadow-2xl">
           <div className="flex justify-between items-start mb-12 relative z-10">
              <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-1">Crescimento Total do Ecossistema</h3>
                 <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">5k Licenças + 100 Hubs + 200 Kiosks</p>
              </div>
              <div className="text-right"><p className="text-[10px] text-gray-600 font-mono">VALUATION PROJETADO (R$ MILHÕES)</p></div>
           </div>

           <div className="h-[350px] w-full grayscale group-hover:grayscale-0 transition-all duration-700">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={GROWTH_DATA}>
                    <defs><linearGradient id="darkGrowth" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4B0082" stopOpacity={0.4}/><stop offset="95%" stopColor="#4B0082" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                    <XAxis dataKey="step" stroke="#444" tick={{fill: '#444', fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#444" tick={{fill: '#444', fontSize: 10, fontFamily: 'monospace'}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #4B0082', borderRadius: '4px', fontSize: '10px' }} />
                    <Area type="monotone" dataKey="equity" stroke="#4B0082" strokeWidth={3} fillOpacity={1} fill="url(#darkGrowth)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-gradient-to-br from-[#0a0a0a] to-[#050005] border border-winf-darkpurple/50 p-8 rounded-sm relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-10"><Diamond size={80} className="text-zinc-500" /></div>
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-6">Oportunidade Anjo</h4>
              <p className="text-3xl font-heading font-bold text-white mb-2 leading-none">R$ 110.000</p>
              <p className="text-xs text-gray-500 mb-8 border-b border-white/5 pb-6">Retorno 5X Alvo: R$ 550.000</p>
              <button onClick={handleRequestAccess} className="w-full py-4 bg-zinc-900 text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-purple-900 transition-all">Solicitar Proposta</button>
           </div>

           <div className="bg-[#080808] border border-white/5 p-8 rounded-sm">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6">Receita Recorrente Insumos</h4>
              <div className="space-y-6">
                 <div>
                    <p className="text-[9px] text-gray-600 uppercase font-bold mb-1 flex items-center gap-2"><Store size={10} className="text-zinc-400" /> Kiosk Fleet (Meta 200)</p>
                    <p className="text-xl font-mono text-white font-bold">R$ 1.2M /mês</p>
                 </div>
                 <div>
                    <p className="text-[9px] text-gray-600 uppercase font-bold mb-1 flex items-center gap-2"><Zap size={10} className="text-winf-ascend" /> License Network (Meta 5.000)</p>
                    <p className="text-xl font-mono text-zinc-400 font-bold">R$ 600k /mês</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-black via-[#0a000a] to-black border-y border-winf-darkpurple/20 p-20 text-center">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-light text-white leading-tight">
               "Nossa rede de Kiosks é a antena que capta o tráfego do varejo e o converte em <span className="font-bold text-zinc-500">ativos de alta recorrência</span>."
            </h2>
         </div>
      </div>
    </div>
  );
};

export default ModuleUniversoDark;
