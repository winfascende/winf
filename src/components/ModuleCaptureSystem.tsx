
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Filter, 
  Plus, 
  Eye, 
  EyeOff, 
  Lock as LockIcon, 
  Bot as BotIcon,
  Zap,
  Target,
  AlertCircle,
  Skull,
  Crosshair,
  TrendingUp,
  Brain,
  Radar,
  Store,
  Globe,
  Smartphone,
  Radio,
  MessageSquare
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { Lead } from '../types';
import { LeadItemSkeleton } from './ui/LoadingSkeleton';

const ModuleCaptureSystem: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { user, leads, publicLeads, fetchLeads, fetchPublicLeads, addLead, gamify, distributeLead, addInstallationJob, isLoading } = useWinf();
  const [revealSensitive, setRevealSensitive] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<Lead | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'radar'>('list');
  const [isScanning, setIsScanning] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'public'>('personal');

  useEffect(() => { 
    if (user?.id) fetchLeads(); 
    fetchPublicLeads();
  }, [user?.id]);

  const canViewSensitive = user?.role === 'Admin' || user?.role === 'Licenciado';

  const handleConvertToSquad = async () => {
    if (!selectedTarget) return;
    setIsConverting(true);
    
    // Simulate Order Creation
    const osId = `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 999)}`;
    
    // Create Installation Job
    await addInstallationJob({
      service_order_id: osId,
      customer_name: selectedTarget.name,
      vehicle_model: selectedTarget.interest.includes('AeroCore') ? 'Porsche 911 (Simulado)' : 'Veículo Premium',
      collaborator_id: '1', // Default to first tech for demo
    });

    gamify('SALE_CLOSED');
    alert(`Lead convertido! Ordem de Serviço ${osId} enviada para o Squad.`);
    setIsConverting(false);
    setSelectedTarget(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-white border-white bg-white/10';
    if (score >= 50) return 'text-yellow-500 border-yellow-500 bg-yellow-500/10';
    return 'text-gray-500 border-gray-800 bg-gray-900';
  };

  const getZoneLabel = (score: number) => {
    if (score >= 80) return 'ZONA DE ATAQUE';
    if (score >= 50) return 'ZONA DE PRESSÃO';
    return 'ZONA DE OBSERVAÇÃO';
  };

  const simulateIncomingLead = async () => {
      setIsScanning(true);
      
      // Simulação de "Listening" da rede
      setTimeout(async () => {
          const sources = [
              { src: 'Winf™ Kiosk (Shopping)', interest: 'AeroCore™ Full (QR Code)', score: 85 },
              { src: 'Instagram Ads', interest: 'NeoSkin™ Matte', score: 72 },
              { src: 'W.A.R.P. GeoSearch', interest: 'Blindagem Arquitetônica', score: 90 }
          ];
          const randomSource = sources[Math.floor(Math.random() * sources.length)];
          
          await addLead({
              name: `Alvo Detectado #${Math.floor(Math.random() * 9999)}`,
              contact: '(XX) 9XXXX-XXXX',
              source: randomSource.src,
              interest: randomSource.interest,
              status: 'Novo Sinal',
              ai_score: 95,
              dominance_score: randomSource.score,
              decay_level: 100
          });
          
          gamify('LEAD_ADDED');
          setIsScanning(false);
          setViewMode('list'); // Switch back to list to show new item
      }, 3000);
  };

  const simulateWhatsAppLead = async () => {
      setIsScanning(true);
      const lead = { name: `Lead WhatsApp #${Math.floor(Math.random() * 999)}`, city: 'Santos' };
      
      setTimeout(async () => {
          await distributeLead(lead);
          await addLead({
              name: lead.name,
              contact: '(13) 9XXXX-XXXX',
              source: 'WhatsApp Central',
              interest: 'Atendimento Regional',
              status: 'Distribuído',
              ai_score: 88,
              dominance_score: 75,
              decay_level: 100
          });
          gamify('LEAD_ADDED');
          setIsScanning(false);
          setViewMode('list');
      }, 2000);
  };

  const sortedLeads = [...leads].sort((a, b) => b.dominance_score - a.dominance_score);

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-fade-in pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/[0.03] pb-10 gap-8">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                    <ChevronLeft size={14} /> Mission Control
                </button>
                <h1 className="text-5xl font-heading font-light text-white tracking-tighter">CAPTURE <span className="font-bold text-winf-capture">PREMIUM</span></h1>
                <p className="text-gray-600 text-xs mt-4 uppercase tracking-widest font-mono">Territory Dominance Engine // Phase Bravo</p>
            </div>
            
            <div className="flex gap-3 bg-black border border-white/10 p-1 rounded-lg">
               <button 
                 onClick={() => setViewMode('list')}
                 className={`px-6 py-2.5 rounded text-[9px] font-bold uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 Lista Tática
               </button>
               <button 
                 onClick={() => setViewMode('radar')}
                 className={`px-6 py-2.5 rounded text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${viewMode === 'radar' ? 'bg-winf-capture text-white shadow-lg shadow-green-900/20' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 <Radar size={12} /> Radar de Fontes
               </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
            
            {/* LEFT COLUMN: LIST OR RADAR */}
            <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/5 rounded-sm overflow-hidden h-[700px] flex flex-col relative">
                
                {viewMode === 'list' && (
                    <>
                        <div className="p-6 border-b border-white/[0.03] bg-white/[0.01] flex justify-between items-center">
                            <div className="flex gap-6">
                                <button 
                                    onClick={() => setActiveTab('personal')}
                                    className={`text-[9px] font-black uppercase tracking-widest transition-colors ${activeTab === 'personal' ? 'text-winf-capture' : 'text-gray-600 hover:text-white'}`}
                                >
                                    Meus Leads ({leads.length})
                                </button>
                                <button 
                                    onClick={() => setActiveTab('public')}
                                    className={`text-[9px] font-black uppercase tracking-widest transition-colors ${activeTab === 'public' ? 'text-winf-capture' : 'text-gray-600 hover:text-white'}`}
                                >
                                    Radar Público ({publicLeads.length})
                                </button>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={simulateIncomingLead} disabled={isScanning} className="text-[9px] font-bold text-winf-capture uppercase tracking-widest hover:text-white flex items-center gap-2">
                                    {isScanning ? <span className="animate-pulse">Buscando Sinal...</span> : <><Radio size={12} /> Simular Entrada</>}
                                </button>
                                <button onClick={() => setRevealSensitive(!revealSensitive)} className="text-gray-600 hover:text-white">
                                    {revealSensitive ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-white/[0.02]">
                            {isLoading ? (
                                <div className="divide-y divide-white/[0.02]">
                                    <LeadItemSkeleton />
                                    <LeadItemSkeleton />
                                    <LeadItemSkeleton />
                                    <LeadItemSkeleton />
                                    <LeadItemSkeleton />
                                </div>
                            ) : (activeTab === 'personal' ? sortedLeads : publicLeads).length === 0 ? (
                                <div className="p-20 text-center text-gray-600">
                                    <Target size={48} className="mx-auto mb-4 opacity-20" />
                                    <p className="text-xs uppercase font-black tracking-widest">Nenhum sinal detectado nesta zona.</p>
                                </div>
                            ) : (
                                (activeTab === 'personal' ? sortedLeads : publicLeads).map((lead) => (
                                    <div 
                                        key={lead.id} 
                                        onClick={() => setSelectedTarget(lead)}
                                        className={`p-6 cursor-pointer transition-all flex items-center gap-6 group ${selectedTarget?.id === lead.id ? 'bg-white/[0.03] border-l-2 border-winf-capture' : 'hover:bg-white/[0.01]'}`}
                                    >
                                        <div className={`w-12 h-12 rounded border flex flex-col items-center justify-center font-mono ${getScoreColor(lead.dominance_score)}`}>
                                            <span className="text-xs font-bold">{lead.dominance_score}</span>
                                            <span className="text-[6px] font-black uppercase">Dom</span>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white font-bold text-sm uppercase tracking-wider truncate group-hover:text-winf-capture transition-colors">{lead.name}</h4>
                                            <div className="flex gap-4 mt-1 items-center">
                                                <p className="text-[9px] text-gray-600 font-mono uppercase truncate">{lead.interest}</p>
                                                <div className="h-1 w-1 bg-gray-800 rounded-full"></div>
                                                <div className="flex items-center gap-1 text-[9px] text-gray-500 font-mono">
                                                    {lead.source.includes('Kiosk') ? <Store size={8} /> : lead.source.includes('Web') || lead.source.includes('Ads') ? <Globe size={8} /> : <Target size={8} />}
                                                    {lead.source}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className={`text-[8px] font-black uppercase tracking-widest ${lead.dominance_score >= 80 ? 'text-white' : 'text-gray-600'}`}>{getZoneLabel(lead.dominance_score)}</p>
                                            <div className="mt-1 flex gap-0.5 justify-end">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-3 h-1 rounded-sm ${i < (lead.decay_level / 20) ? 'bg-winf-capture' : 'bg-gray-900'}`}></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {viewMode === 'radar' && (
                    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-black">
                        {/* Radar Visual */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,78,59,0.2)_0%,transparent_70%)]"></div>
                        <div className="relative w-[400px] h-[400px] border border-winf-capture/20 rounded-full flex items-center justify-center">
                            <div className="absolute w-[250px] h-[250px] border border-winf-capture/20 rounded-full"></div>
                            <div className="absolute w-[100px] h-[100px] border border-winf-capture/20 rounded-full bg-winf-capture/5"></div>
                            
                            {/* Scanning Line */}
                            <div className={`absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent to-winf-capture origin-left animate-[spin_3s_linear_infinite] ${isScanning ? 'opacity-100' : 'opacity-20'}`}></div>

                            {/* Center Hub */}
                            <div className="z-10 bg-black border border-winf-capture p-4 rounded-full shadow-[0_0_20px_rgba(6,78,59,0.5)]">
                                <Radio size={24} className="text-winf-capture animate-pulse" />
                            </div>

                            {/* Detected Nodes (Visualizing where leads come from) */}
                            <div className="absolute top-10 right-20 flex flex-col items-center animate-pulse">
                                <Globe size={16} className="text-zinc-400 mb-1" />
                                <span className="text-[8px] text-zinc-400 font-bold bg-black/50 px-1">WEB</span>
                            </div>
                            <div className="absolute bottom-20 left-10 flex flex-col items-center animate-pulse delay-75">
                                <Store size={16} className="text-yellow-400 mb-1" />
                                <span className="text-[8px] text-yellow-400 font-bold bg-black/50 px-1">KIOSK</span>
                            </div>
                            <div className="absolute top-20 left-20 flex flex-col items-center animate-pulse delay-150">
                                <Smartphone size={16} className="text-zinc-400 mb-1" />
                                <span className="text-[8px] text-zinc-400 font-bold bg-black/50 px-1">SOCIAL</span>
                            </div>
                        </div>

                        <div className="absolute bottom-10 text-center space-y-2">
                            <h3 className="text-white font-bold text-lg tracking-tight">REDE DE INTERCEPTAÇÃO ATIVA</h3>
                            <p className="text-gray-500 text-xs max-w-sm mx-auto">
                                O sistema monitora Kiosks físicos, campanhas digitais e tráfego W.A.R.P. para injetar leads diretamente na sua lista tática.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                                <button 
                                    onClick={simulateWhatsAppLead}
                                    disabled={isScanning}
                                    className="bg-green-600 text-white px-8 py-3 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-green-500 transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageSquare size={14} />
                                    {isScanning ? 'ROTEANDO...' : 'SIMULAR WHATSAPP CENTRAL'}
                                </button>
                                <button 
                                    onClick={simulateIncomingLead}
                                    disabled={isScanning}
                                    className="bg-winf-capture text-white px-8 py-3 rounded-sm font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-green-700 transition-all"
                                >
                                    {isScanning ? 'RASTREANDO SINAL...' : 'FORÇAR VARREDURA (SIMULAÇÃO)'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: TARGET HUD (INTELLIGENCE) */}
            <div className="lg:col-span-5 bg-[#080808] border border-white/5 rounded-sm p-10 flex flex-col relative overflow-hidden">
                {!selectedTarget ? (
                    <div className="flex-1 flex flex-col items-center justify-center opacity-10">
                        <Crosshair size={60} className="text-gray-500 mb-6" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Aguardando Seleção de Alvo</p>
                    </div>
                ) : (
                    <div className="animate-fade-in space-y-10 h-full flex flex-col">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white font-bold text-2xl tracking-tighter uppercase">{selectedTarget.name}</h3>
                                <p className="text-[10px] text-winf-capture font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                                    <Skull size={12} className="text-white" /> High-Priority Alpha Target
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] text-gray-600 font-mono">ID: {selectedTarget.id.slice(0,8)}</span>
                                <p className="text-green-500 font-mono text-xs mt-1">Sinal Ativo</p>
                            </div>
                        </div>

                        {/* ORIGIN INTELLIGENCE */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                                <p className="text-[8px] text-gray-500 uppercase font-bold mb-1">Origem do Sinal</p>
                                <p className="text-xs text-white font-bold flex items-center gap-2">
                                    {selectedTarget.source.includes('Kiosk') && <Store size={12} className="text-yellow-500"/>}
                                    {selectedTarget.source}
                                </p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                                <p className="text-[8px] text-gray-500 uppercase font-bold mb-1">Interesse Primário</p>
                                <p className="text-xs text-white font-bold truncate">{selectedTarget.interest}</p>
                            </div>
                        </div>

                        {/* NEUROPARADOX INTEGRATION */}
                        <div className="bg-black/40 border border-winf-darkpurple/30 p-6 rounded-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Brain size={40} className="text-zinc-500" />
                            </div>
                            <h4 className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <BotIcon size={14} /> NeuroParadox™ Intel
                            </h4>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[8px] text-gray-600 uppercase font-bold mb-1">Verdade Inconveniente</p>
                                    <p className="text-xs text-gray-300 font-light italic leading-relaxed">
                                        {selectedTarget.last_paradox_truth || "Sinal não processado pelo módulo NeuroParadox."}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[8px] text-gray-600 uppercase font-bold mb-1">Manobra Recomendada</p>
                                    <p className="text-xs text-white font-bold tracking-tight">
                                        {selectedTarget.last_paradox_maneuver || "Aguardando análise comportamental."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ENGAGEMENT ZONE */}
                        <div className="mt-auto space-y-4">
                            <button 
                                onClick={handleConvertToSquad}
                                disabled={isConverting}
                                className="w-full py-5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.05)] disabled:opacity-50"
                            >
                                <Crosshair size={14} className={isConverting ? 'animate-spin' : ''} />
                                {isConverting ? 'Convertendo...' : 'Iniciar Protocolo de Fechamento'}
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="py-4 bg-white/5 border border-white/10 text-[9px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-all">Ver Histórico</button>
                                <button className="py-4 bg-white/5 border border-white/10 text-[9px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-all">Exportar NDA</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ModuleCaptureSystem;
