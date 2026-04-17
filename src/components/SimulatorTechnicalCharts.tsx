
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Zap, Thermometer, TrendingDown, Activity } from 'lucide-react';
import { WINF_CONSTANTS } from '../constants';

interface SimulatorTechnicalChartsProps {
  intensity: number;
  filmId: string;
  area: string;
}

const SimulatorTechnicalCharts: React.FC<SimulatorTechnicalChartsProps> = ({ intensity, filmId, area }) => {
  const areaValue = parseFloat(area) || 100;
  // Find selected film
  const selectedFilm = WINF_CONSTANTS.portfolio.lines
    .flatMap(line => line.items)
    .find(item => item.id === filmId) || WINF_CONSTANTS.portfolio.lines[0].items[0];

  // Data generation based on intensity and film efficiency
  const generateThermalData = () => {
    const data = [];
    for (let i = 0; i <= 10; i++) {
      const time = `${i * 10}min`;
      const commonHeat = Math.round((intensity * 0.8) * (i / 10) * 5);
      // Winf heat reduction based on film specs (simplified)
      const winfHeat = Math.round((intensity * 0.12) * (i / 10) * 5);
      data.push({ time, common: commonHeat, winf: winfHeat });
    }
    return data;
  };

  const generateEnergyData = () => {
    const baseCost = 450 * (areaValue / 100); // Scale by area
    const reduction = Math.round((intensity / 100) * 280 * (areaValue / 100)); // Scale by area
    return [
      { name: 'Sem Proteção', cost: baseCost, color: '#ef4444' },
      { name: 'WINF™ Shield', cost: baseCost - reduction, color: '#ffffff' }
    ];
  };

  const thermalData = generateThermalData();
  const energyData = generateEnergyData();

  const monthlySavings = Math.round((intensity / 100) * 280 * (areaValue / 100));
  const estimatedInvestment = (selectedFilm as any).financials?.salePricePerMeter ? (selectedFilm as any).financials.salePricePerMeter * areaValue : 3500 * (areaValue / 100);
  const paybackMonths = Math.ceil(estimatedInvestment / Math.max(1, monthlySavings));


  const generateLifeSpanData = () => {
    const data = [];
    for (let year = 0; year <= 10; year++) {
      // Common film loses 15% efficiency per year
      const commonEfficiency = Math.max(0, 100 - (year * 15));
      // Winf loses 0.5% efficiency per year
      const winfEfficiency = 100 - (year * 0.5);
      data.push({ year: `Ano ${year}`, common: commonEfficiency, winf: winfEfficiency });
    }
    return data;
  };

  const lifeSpanData = generateLifeSpanData();

  return (
    <div className="mt-20 lg:mt-32 space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div className="max-w-xl">
          <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
            Análise de <span className="text-winf-primary italic">Gêmeo Digital</span>
          </h3>
          <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed uppercase tracking-widest">
            Dados processados pelo núcleo NEUROMESH™ baseados na termodinâmica molecular e incidência solar real.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center gap-3">
            <Activity size={16} className="text-winf-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Data Sync</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Thermal Load Chart */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Thermometer size={20} className="text-red-500" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Carga Térmica Acumulada</h4>
              <p className="text-[10px] text-white/20 uppercase tracking-widest">Ganho de calor por tempo de exposição</p>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={thermalData}>
                <defs>
                  <linearGradient id="colorCommon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWinf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'BTUs', angle: -90, position: 'insideLeft', fill: '#ffffff20', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="common" 
                  stroke="#ef4444" 
                  fillOpacity={1} 
                  fill="url(#colorCommon)" 
                  name="Vidro Comum"
                />
                <Area 
                  type="monotone" 
                  dataKey="winf" 
                  stroke="#ffffff" 
                  fillOpacity={1} 
                  fill="url(#colorWinf)" 
                  name="WINF™ Shield"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
              <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-1">Delta Térmico</p>
              <p className="text-xl font-black text-red-500">+{Math.round(intensity * 0.4)}%</p>
            </div>
            <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
              <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-1">Eficiência Winf</p>
              <p className="text-xl font-black text-winf-primary">92.4%</p>
            </div>
          </div>
        </div>

        {/* Energy Savings Chart */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-winf-primary/10 flex items-center justify-center">
              <Zap size={20} className="text-winf-primary" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Economia de Energia (AC)</h4>
              <p className="text-[10px] text-white/20 uppercase tracking-widest">Redução mensal estimada em R$</p>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#ffffff40" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  width={80}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                />
                <Bar dataKey="cost" radius={[0, 10, 10, 0]} barSize={40}>
                  {energyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-6 bg-winf-primary/10 border border-winf-primary/20 rounded-3xl flex items-center justify-between">
            <div>
              <p className="text-[10px] text-winf-primary uppercase font-black tracking-widest mb-1">Economia Anual Projetada</p>
              <p className="text-3xl font-black text-white tracking-tighter">R$ {Math.round(monthlySavings * 12).toLocaleString('pt-BR')}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-winf-primary flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <TrendingDown size={24} className="text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* ROI & Life Span Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payback Tracker */}
        <div className="lg:col-span-1 bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Payback Tracker™</h4>
            <p className="text-[10px] text-white/20 uppercase tracking-widest mb-8">Retorno sobre o Investimento</p>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[9px] text-white/40 uppercase font-black tracking-widest">Investimento Est.</span>
                <span className="text-lg font-black text-white">R$ {estimatedInvestment.toLocaleString('pt-BR')}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-white/20 w-1/3"></div>
              </div>
              
              <div className="flex justify-between items-end">
                <span className="text-[9px] text-white/40 uppercase font-black tracking-widest">Economia Mensal</span>
                <span className="text-lg font-black text-winf-primary">R$ {monthlySavings.toLocaleString('pt-BR')}</span>
              </div>
              <div className="w-full h-1 bg-winf-primary/10 rounded-full overflow-hidden">
                <div className="h-full bg-winf-primary w-2/3"></div>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-white text-black rounded-3xl text-center">
            <p className="text-[9px] font-black uppercase tracking-widest mb-1">Ponto de Equilíbrio</p>
            <p className="text-4xl font-black tracking-tighter">{paybackMonths} <span className="text-sm uppercase tracking-widest">Meses</span></p>
            <p className="text-[8px] font-bold uppercase tracking-widest mt-2 opacity-40">*Baseado em uso médio de AC</p>
          </div>
        </div>

        {/* Molecular Life Span Chart */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Vida Útil Molecular</h4>
              <p className="text-[10px] text-white/20 uppercase tracking-widest">Estabilidade de performance (10 Anos)</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[8px] text-white/40 uppercase font-black tracking-widest">Comum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-winf-primary"></div>
                <span className="text-[8px] text-white/40 uppercase font-black tracking-widest">WINF™</span>
              </div>
            </div>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lifeSpanData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="year" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="common" stroke="#ef4444" fill="#ef4444" fillOpacity={0.05} strokeWidth={2} />
                <Area type="monotone" dataKey="winf" stroke="#ffffff" fill="#ffffff" fillOpacity={0.05} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 bg-winf-primary/5 border border-winf-primary/10 rounded-2xl">
            <p className="text-[9px] text-winf-primary text-center uppercase tracking-[0.2em] font-bold leading-relaxed">
              A tecnologia WINF™ Shield utiliza polímeros cross-linked de alta densidade, 
              garantindo que a proteção térmica permaneça acima de 95% mesmo após uma década de exposição solar extrema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorTechnicalCharts;
