import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Package, Star, Zap, Diamond, CheckCircle2, 
  MessageSquare, Send, Bot, User as UserIcon, Loader2,
  TrendingUp, Award, Coins, ChevronRight, Calculator,
  ArrowRight, Shield
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { GoogleGenAI } from "@google/genai";
import ModuleProducts from './ModuleProducts';

const LICENSING_PLANS = [
  {
    id: 'select',
    title: 'WINF™ SELECT',
    subtitle: 'O Ponto de Ignição',
    price: 2500,
    icon: CheckCircle2,
    color: 'text-zinc-400',
    bg: 'bg-zinc-400/10',
    border: 'border-zinc-400/20',
    description: 'O portal de entrada para o ecossistema WINF. Digitaliza o seu conhecimento e certifica sua autoridade.',
    benefits: [
      'Academia WINF™ Completa',
      'Certificação Digital de Parceiro',
      'Comunidade de Networking',
      'Suporte Base Online',
      'Precificação de Entrada'
    ]
  },
  {
    id: 'elite',
    title: 'WINF™ ELITE',
    subtitle: 'O Instalador Cirúrgico',
    price: 5000,
    icon: Star,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    description: 'Para os puristas da perfeição. Domine o desperdício zero com ferramentas de corte de nível aeroespacial.',
    benefits: [
      'Software WINF CUT™ (Licença Pró)',
      'Kit de Ferramentas Exclusivo',
      'Tabela de Preços Diamante',
      'Desperdício de Material Zero',
      'Acesso a Lançamentos Restritos'
    ]
  },
  {
    id: 'advanced',
    title: 'WINF™ ADVANCED',
    subtitle: 'O Ecossistema Dominante',
    price: 7500,
    icon: Zap,
    color: 'text-winf-primary',
    bg: 'bg-winf-primary/10',
    border: 'border-winf-primary/20',
    description: 'Injeção de marketing digital local. Capturamos clientes para você enquanto você gerencia sua unidade.',
    benefits: [
      'Marketing Digital Local Ativo',
      'Site One Page WINF™ Customizado',
      'Treinamento Presencial Imersivo',
      'Kit Inicial de Películas High-End',
      'Leads Qualificados Direto no Zap'
    ]
  },
  {
    id: 'enterprise',
    title: 'WINF™ ENTERPRISE',
    subtitle: 'A Cadeira na Mesa',
    price: 15000,
    icon: Diamond,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
    description: 'Dite o mercado na sua macrorregião. Inteligência de território por Geofencing e conselho tático.',
    benefits: [
      'Estratégia Local de Geofencing',
      'Reuniões de Board com Fundadores',
      'Acompanhamento Mensal de KPIs',
      'Suporte Crítico 24/7 Red Line',
      'Prioridade Geográfica Vitalícia'
    ]
  }
];

const ModuleBlackshop: React.FC = () => {
  const { user } = useWinf();
  const [activeTab, setActiveTab] = useState<'products' | 'licensing'>('products');
  const [showAi, setShowAi] = useState(false);
  const [selectedPlanCompare, setSelectedPlanCompare] = useState<string | null>(null);
  
  // AI Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleAiAsk = async (planId?: string) => {
    setShowAi(true);
    if (!planId) return;

    const plan = LICENSING_PLANS.find(p => p.id === planId);
    if (!plan) return;

    const initialAsk = `Quero comparar o plano ${plan.title} com os outros. O que ele tem de melhor para o meu momento?`;
    await processAiResponse(initialAsk);
  };

  const processAiResponse = async (text: string) => {
    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setIsAiTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({ 
        model: "gemini-2.0-flash",
        config: {
          systemInstruction: `Você é o WINF UPGRADE AI™, assistente especialista em expensão de negócios da rede WINF.
Sua missão é ajudar o parceiro a escolher o plano de licenciamento ideal.
Planos Disponíveis:
- SELECT (R$ 2.500): Entrada, formação técnica e networking.
- ELITE (R$ 5.000): Foco técnico e software Winf Cut™ para eficiência de instalação.
- ADVANCED (R$ 7.500): Foco comercial com marketing digital injetado pela matriz.
- ENTERPRISE (R$ 15.000): Domínio de território, suporte VIP e conselho.

Sempre responda de forma consultiva, comparando benefícios e tempo de retorno (payback). Use o tom Apple: limpo, focado em valor e experiência.
Contexto do usuário: Nome: ${user?.name}, Nível Atual: ${user?.role || 'Membro'}.
Seja empático e mostre como o upgrade vai resolver as dores atuais dele.`
        }
      });

      const response = await chat.sendMessage({ message: text });
      setChatMessages(prev => [...prev, { role: 'ai', text: response.text }]);
    } catch (e) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "O terminal neural está em sincronização. Tente novamente em instantes." }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleCheckout = (plan: any) => {
    alert(`Acordo para o plano ${plan.title} iniciado via Protocolo Blackshop. Um especialista financeiro entrará em contato para finalizar a ativação.`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-winf-primary" />
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">WINF BLACKSHOP™</h1>
          </div>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Single Source of Profit // Hub de Evolução</p>
        </div>
        
        <div className="flex bg-[#0a0a0a] p-1.5 rounded-2xl border border-white/5 shadow-2xl">
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'products' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            <Package size={14} /> SUPRIMENTOS
          </button>
          <button 
            onClick={() => setActiveTab('licensing')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'licensing' ? 'bg-winf-primary text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            <Award size={14} /> UPGRADES DE LICENÇA
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'products' ? (
          <motion.div 
            key="products"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ModuleProducts />
          </motion.div>
        ) : (
          <motion.div 
            key="licensing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            {/* Intro Hero */}
            <div className="bg-gradient-to-br from-winf-primary/10 to-transparent border border-winf-primary/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-winf-primary/5 blur-[100px] group-hover:bg-winf-primary/10 transition-all"></div>
               <div className="relative z-10 max-w-3xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-winf-primary/20 border border-winf-primary/30 rounded-full text-[9px] font-black text-winf-primary uppercase tracking-[0.2em]">
                     <TrendingUp size={12} /> Roadmap de Carreira
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                    EVOLUA SEU NEGÓCIO <br/>
                    PARA O <span className="text-winf-primary">PRÓXIMO NÍVEL.</span>
                  </h2>
                  <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                    A Blackshop é o portal de evolução da rede. Escolha seu licenciamento e desbloqueie ferramentas de marketing, suporte estratégico e prioridade de leads.
                  </p>
                  <button 
                    onClick={() => handleAiAsk()}
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all group"
                  >
                    <Bot size={18} /> Conversar com Winf Upgrade AI™
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LICENSING_PLANS.map((plan) => (
                <div key={plan.id} className={`bg-[#0a0a0a] border ${plan.border} rounded-[2rem] p-8 flex flex-col h-full hover:scale-[1.02] transition-all duration-500 group relative`}>
                  {plan.id === 'advanced' && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-winf-primary text-black px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl shadow-winf-primary/20">
                      Mais Procurado
                    </div>
                  )}
                  
                  <div className="mb-8">
                     <div className={`p-4 rounded-2xl ${plan.bg} ${plan.color} w-fit mb-6 border border-white/5`}>
                        <plan.icon size={28} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-xl font-black text-white tracking-tighter uppercase mb-1">{plan.title}</h3>
                     <p className={`text-[10px] font-bold uppercase tracking-widest ${plan.color}`}>{plan.subtitle}</p>
                     <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-xs text-gray-400">R$</span>
                        <span className="text-3xl font-black text-white">{plan.price.toLocaleString('pt-BR')}</span>
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Investimento</span>
                     </div>
                  </div>

                  <p className="text-gray-400 text-xs leading-relaxed mb-8 grow">
                    {plan.description}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {plan.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-[10px] text-gray-300 uppercase font-medium tracking-wide">
                        <CheckCircle2 size={12} className={plan.color} /> {b}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 pt-6 border-t border-white/5">
                    <button 
                      onClick={() => handleAiAsk(plan.id)}
                      className="w-full py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <Bot size={14} /> Comparar com IA
                    </button>
                    <button 
                      onClick={() => handleCheckout(plan)}
                      className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${plan.id === 'select' ? 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black' : 'bg-winf-primary text-black hover:bg-winf-primary_hover shadow-lg shadow-winf-primary/10'}`}
                    >
                      Selecionar Plano
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Overlay */}
      <AnimatePresence>
        {showAi && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#050505] border-l border-white/10 z-[100] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 bg-[#080808] flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-winf-primary/10 rounded-xl flex items-center justify-center text-winf-primary">
                     <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tighter">WINF UPGRADE AI™</h3>
                    <p className="text-[10px] text-winf-primary font-bold uppercase tracking-widest">Consultor de Evolução</p>
                  </div>
               </div>
               <button onClick={() => setShowAi(false)} className="text-gray-500 hover:text-white p-2">
                 <ArrowRight size={20} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
               {chatMessages.length === 0 && (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                    <MessageSquare size={40} className="text-gray-600" />
                    <p className="text-xs font-mono uppercase tracking-widest text-gray-500">Qual a sua dúvida sobre <br/> as licenças WINF™?</p>
                 </div>
               )}
               
               {chatMessages.map((msg, i) => (
                 <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-white text-black' : 'bg-[#111] text-gray-300 border border-white/5'}`}>
                      {msg.text}
                    </div>
                 </div>
               ))}
               {isAiTyping && (
                 <div className="flex justify-start">
                   <div className="bg-[#111] p-4 rounded-2xl border border-white/5 flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-winf-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-winf-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-winf-primary rounded-full" />
                   </div>
                 </div>
               )}
               <div ref={chatEndRef} />
            </div>

            <div className="p-6 bg-[#080808] border-t border-white/10">
               <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
                  <button onClick={() => processAiResponse('Como funciona o Geofencing?')} className="shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-400 hover:text-white transition-all">Geofencing?</button>
                  <button onClick={() => processAiResponse('Qual o payback do Elite?')} className="shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-400 hover:text-white transition-all">Payback Elite?</button>
                  <button onClick={() => processAiResponse('Advanced vs Enterprise')} className="shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-400 hover:text-white transition-all">Qual melhor?</button>
               </div>
               <div className="relative">
                 <input 
                   type="text" 
                   value={chatInput}
                   onChange={e => setChatInput(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && chatInput.trim() && !isAiTyping && processAiResponse(chatInput)}
                   placeholder="Tire suas dúvidas..."
                   className="w-full bg-black border border-white/10 rounded-xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-winf-primary transition-all"
                 />
                 <button 
                  onClick={() => { if(chatInput.trim() && !isAiTyping) processAiResponse(chatInput); setChatInput(''); }}
                  disabled={!chatInput.trim() || isAiTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-winf-primary text-black rounded-lg hover:bg-winf-primary_hover disabled:opacity-50 transition-all font-bold"
                 >
                   {isAiTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Quote */}
      <div className="flex flex-col items-center text-center space-y-4 pt-10">
        <Shield size={32} className="text-gray-700" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 max-w-sm">
          Transação Segura // Criptografia Nível 256-bit AES <br/>
          WINF FINANCIAL BOARD™ CONTROLLED
        </p>
      </div>

    </div>
  );
};

export default ModuleBlackshop;
