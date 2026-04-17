
import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Terminal, 
  Globe, 
  Database, 
  MessageSquare, 
  Smartphone, 
  Clock, 
  Zap, 
  Shield, 
  Activity,
  Server,
  Network,
  Bot,
  Mic,
  Search,
  FileCode,
  Share2,
  ChevronRight,
  Plus,
  Play,
  Square,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useWinf } from '../contexts/WinfContext';
import { AgentCommand } from '../types';

const ModuleNeuralBridge: React.FC = () => {
  const { agentState, dispatchAgentCommand } = useWinf();
  const [command, setCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const capabilities = [
    { id: 'FILE', name: 'Arquivos', icon: FileCode, desc: 'Ler, criar, editar e organizar workspace', status: 'ready' },
    { id: 'TERMINAL', name: 'Terminal', icon: Terminal, desc: 'Shell, scripts e automação', status: 'ready' },
    { id: 'WEB', name: 'Web', icon: Search, desc: 'Pesquisa e extração de conteúdo', status: 'active' },
    { id: 'SCHEDULE', name: 'Agendamentos', icon: Clock, desc: 'Cron jobs e lembretes automáticos', status: 'ready' },
    { id: 'DEVICE', name: 'Dispositivos', icon: Smartphone, desc: 'Controle Android/iOS pareados', status: 'ready' },
    { id: 'MEMORY', name: 'Memória', icon: Database, desc: 'Contexto e decisões entre sessões', status: 'ready' },
    { id: 'SUBAGENT', name: 'Subagentes', icon: Bot, desc: 'Sessões paralelas complexas', status: 'active' },
    { id: 'VOICE', name: 'Voz', icon: Mic, desc: 'Conversão TTS (Text-to-Speech)', status: 'ready' },
    { id: 'MESSAGE', name: 'Mensagens', icon: MessageSquare, desc: 'WhatsApp, Telegram, Discord', status: 'ready' },
    { id: 'SKILL', name: 'Skills', icon: Zap, desc: 'ClawHub, E-mail, Clima, Segurança', status: 'ready' },
  ];

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || isProcessing) return;
    
    setIsProcessing(true);
    await dispatchAgentCommand({
      type: 'TERMINAL',
      action: command
    });
    
    setIsProcessing(false);
    setCommand('');
  };

  const executeQuickAction = async (type: AgentCommand['type'], action: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    await dispatchAgentCommand({ type, action });
    setIsProcessing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/40 border border-white/5 p-8 rounded-xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-winf-primary"></div>
        <div className="absolute top-0 right-0 p-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800/10 border border-zinc-700/20 rounded-full">
            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">UPLINK_ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-winf-primary/10 border border-winf-primary/20 rounded-lg flex items-center justify-center">
            <Server size={32} className="text-winf-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Neural Bridge <span className="text-winf-primary">v2.5</span></h1>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mt-1">Hostinger VPS | Kimi K2.5 Core | Dockerized</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded text-center">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">CPU_LOAD</p>
            <p className="text-xl font-mono font-black text-white">12.4%</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded text-center">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">MEM_USAGE</p>
            <p className="text-xl font-mono font-black text-white">1.4GB</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded text-center">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">ACTIVE_AGENTS</p>
            <p className="text-xl font-mono font-black text-winf-primary">{agentState.activeAgents}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded text-center">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">MEMORY_PTS</p>
            <p className="text-xl font-mono font-black text-white">{agentState.memoryPoints}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Capabilities Grid */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
              <Zap size={14} className="text-winf-primary" />
              Agent Capabilities & Skills
            </h2>
            <button className="text-[10px] font-bold text-winf-primary uppercase tracking-widest hover:underline">
              Gerenciar Skills
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((cap) => (
              <div 
                key={cap.id}
                onClick={() => executeQuickAction(cap.id as any, `Initialize ${cap.name}`)}
                className="group bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:bg-white/[0.04] hover:border-winf-primary/30 transition-all cursor-pointer relative overflow-hidden"
              >
                {cap.status === 'active' && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-winf-primary/5 blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${cap.status === 'active' ? 'bg-winf-primary/20 text-winf-primary' : 'bg-white/5 text-gray-500'} group-hover:scale-110 transition-transform`}>
                    <cap.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-black text-white uppercase tracking-wider">{cap.name}</h3>
                      {cap.status === 'active' && (
                        <span className="flex items-center gap-1.5 text-[8px] font-bold text-winf-primary uppercase tracking-widest">
                          <div className="w-1 h-1 bg-winf-primary rounded-full animate-ping"></div>
                          In Use
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal & Logs */}
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
            <Terminal size={14} className="text-winf-primary" />
            Neural Terminal
          </h2>

          <div className="bg-black border border-white/10 rounded-xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/50"></div>
              </div>
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">kimi@winf-vps: ~</span>
            </div>
            
            <div className="flex-1 p-4 font-mono text-[11px] space-y-1 overflow-y-auto no-scrollbar bg-[#050505]">
              {agentState.logs.map((log, i) => (
                <div key={i} className={log.startsWith('>') ? 'text-winf-primary' : log.startsWith('[ERROR]') ? 'text-zinc-500' : log.includes('[SUCCESS]') ? 'text-zinc-400' : 'text-gray-400'}>
                  {log}
                </div>
              ))}
              {isProcessing && (
                <div className="text-winf-primary animate-pulse">_</div>
              )}
              <div className="h-1"></div>
            </div>

            <form onSubmit={handleCommand} className="p-4 bg-white/[0.02] border-t border-white/10 flex items-center gap-3">
              <ChevronRight size={14} className="text-winf-primary" />
              <input 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                disabled={isProcessing}
                placeholder={isProcessing ? "PROCESSING..." : "ENTER COMMAND..."}
                className="bg-transparent border-none outline-none text-[11px] font-mono text-white w-full placeholder:text-gray-800 uppercase tracking-widest"
              />
            </form>
          </div>

          {/* Quick Actions */}
          <div className="bg-winf-primary/5 border border-winf-primary/20 p-6 rounded-xl">
            <h3 className="text-[10px] font-black text-winf-primary uppercase tracking-[0.2em] mb-4">Ações Rápidas do Agente</h3>
            <div className="space-y-3">
              <button 
                onClick={() => executeQuickAction('MEMORY', 'Sync Memory Core')}
                className="w-full flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded hover:bg-white/[0.05] transition-all group"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white">Sincronizar Memória</span>
                <RefreshCw size={14} className={`text-gray-600 group-hover:text-winf-primary ${isProcessing ? 'animate-spin' : ''}`} />
              </button>
              <button 
                onClick={() => executeQuickAction('MEMORY', 'Clear Context Cache')}
                className="w-full flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded hover:bg-white/[0.05] transition-all group"
              >
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white">Limpar Cache de Contexto</span>
                <RefreshCw size={14} className={`text-gray-600 group-hover:text-winf-primary ${isProcessing ? 'animate-spin' : ''}`} />
              </button>
              <button 
                onClick={() => executeQuickAction('TERMINAL', 'Restart Docker Container')}
                className="w-full flex items-center justify-between p-3 bg-zinc-800/5 border border-zinc-700/20 rounded hover:bg-zinc-800/10 transition-all group"
              >
                <span className="text-[10px] font-bold text-zinc-500/70 uppercase tracking-widest group-hover:text-white">Reiniciar Container Core</span>
                <RefreshCw size={14} className={`text-zinc-500/50 group-hover:text-white ${isProcessing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleNeuralBridge;
