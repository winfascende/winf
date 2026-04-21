import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  ThermometerSun, 
  MapPin, 
  CloudRain, 
  Zap, 
  Brain, 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Database,
  Network
} from 'lucide-react';
import { motion } from 'framer-motion';

const CITIES = [
  { id: 'santos', name: 'Santos (Sede)', temp: 31, condition: 'sun', trend: 'Alta Radiação UV', active: true },
  { id: 'pg', name: 'Praia Grande', temp: 33, condition: 'sun', trend: 'Umidade Costeira', active: true },
  { id: 'sorocaba', name: 'Sorocaba', temp: 29, condition: 'sun', trend: 'Clima Seco Interior', active: true },
  { id: 'cg', name: 'Campina Grande', temp: 26, condition: 'sun', trend: 'Ventos Alísios', active: true },
];

const SPECIALISTS = [
  { id: 'sales', name: 'WINF Sales Agent', role: 'Vendas & CRM', status: 'Processando 48 leads regionais', icon: Bot },
  { id: 'marketing', name: 'WINF Content Agent', role: 'Marketing Localizado', status: 'Otimizando OnePages por Cidade', icon: TrendingUp },
  { id: 'stock', name: 'WINF Logistics Agent', role: 'Abastecimento Advanced', status: 'Monitorando Consumo de Bobinas', icon: Database },
  { id: 'finance', name: 'WINF Financial Agent', role: 'Faturamento de Unidades', status: 'Calculando Royalties & Repasses', icon: Activity },
];

const ModuleWinfWorld: React.FC = () => {
  const [pulseLine, setPulseLine] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseLine(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 flex items-center gap-3">
            <Globe2 className="text-winf-primary" size={32} />
            WINF™ <span className="text-winf-primary">ADVANCED WORLD</span>
          </h1>
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
            Infraestrutura de Expansão Territorial AI-Powered
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-[#005c4b]/20 border border-[#00a884]/30 rounded-lg flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-[#00a884] ${pulseLine ? 'scale-150 opacity-50' : 'scale-100 opacity-100'} transition-all duration-500`}></div>
            <span className="text-xs font-bold text-[#00a884] tracking-widest uppercase">Ecosystem Online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Camadas da Direita (Core) */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* L4: The Governor */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-winf-primary/20 via-black to-black border border-winf-primary/30 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Brain size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-winf-primary/10 rounded-xl border border-winf-primary/30">
                  <Brain className="text-winf-primary" size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-winf-primary">Camada 4</span>
                  <h2 className="text-2xl font-black text-white uppercase">The Governor AI™</h2>
                </div>
              </div>
              <p className="text-sm text-gray-400 max-w-xl leading-relaxed mb-6">
                Orquestrador central do Plano Advanced. Monitora as 4 unidades ativas (Santos, PG, Sorocaba e Campina Grande). 
                Analisa qual praça está performando melhor e redireciona verba de marketing em tempo real para maximizar o ROI global do licenciado.
              </p>
              
              <div className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-white/5">
                <Network className="text-amber-400" size={20} />
                <div className="flex-1">
                  <p className="text-[10px] font-mono text-gray-500">ESTRATÉGIA ADVANCED ATUAL</p>
                  <p className="text-xs text-white">"Sorocaba apresenta 22% mais conversão em OnePages hoje. Priorizando distribuição de leads para Unidade Sorocaba nas próximas 6 horas."</p>
                </div>
                <span className="text-[10px] text-gray-600">Agora mesmo</span>
              </div>
            </div>
          </motion.div>

          {/* L3: Agentes Especialistas */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Camada 3</span>
              <h2 className="text-lg font-black text-white uppercase">Agentes Especialistas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPECIALISTS.map(spec => (
                <div key={spec.id} className="bg-[#0a0a0a] border border-white/5 p-5 rounded-2xl flex items-start gap-4 hover:border-white/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <spec.icon size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{spec.name}</h3>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">{spec.role}</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 text-amber-500 text-[9px] font-bold uppercase rounded">
                      <Zap size={10} /> {spec.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Camadas da Esquerda (Ambiente) */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* L1: Sensores do Mundo Real */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6"
          >
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Camada 1</span>
              <h2 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <ThermometerSun className="text-cyan-500" size={20} />
                Sensores Locais
              </h2>
            </div>
            
            <div className="space-y-3">
              {CITIES.map(city => (
                <div key={city.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    {city.condition === 'sun' ? <ThermometerSun size={16} className="text-amber-400" /> : <CloudRain size={16} className="text-blue-400" />}
                    <div>
                      <h4 className="text-xs font-bold text-white">{city.name}</h4>
                      <p className="text-[9px] text-gray-500">{city.trend}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-white">{city.temp}°</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* L2: Agentes Locais */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black border border-white/10 rounded-3xl p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="mb-6 relative z-20">
              <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Camada 2</span>
              <h2 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <MapPin className="text-green-500" size={20} />
                Agentes de Cidade
              </h2>
            </div>

            <div className="space-y-4 relative z-20">
              {CITIES.filter(c => c.active).map(city => (
                <div key={`agent-${city.id}`} className="border-l-2 border-green-500 pl-4 py-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Bot size={12} className="text-green-500" /> Agent {city.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {city.condition === 'sun' 
                      ? 'Acionado. Preparando lote de leads baseados na alta radiação UV.' 
                      : 'Standby. Convertendo agendamentos.'}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ModuleWinfWorld;
