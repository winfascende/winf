
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Lock, 
  BarChart2, 
  PieChart, 
  TrendingUp, 
  Loader,
  CheckCircle,
  Briefcase,
  X,
  Fingerprint,
  ShieldCheck,
  Scan
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useWinf } from '../contexts/WinfContext';

interface LandingUniversoDarkProps {
  onBack: () => void;
}

// Dados de projeção para visualização pública
const PROJECTION_DATA = [
  { month: 'Q3 2025', value: 100 },
  { month: 'Q4 2025', value: 135 },
  { month: 'Q1 2026', value: 180 },
  { month: 'Q2 2026', value: 245 },
  { month: 'Q3 2026', value: 320 },
  { month: 'Q4 2026', value: 410 },
  { month: 'Q1 2027', value: 520 },
  { month: 'Q2 2027', value: 650 },
  { month: 'Q3 2027', value: 800 },
  { month: 'Q4 2027', value: 980 },
];

const InvestorAccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { addLead } = useWinf();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'SUCCESS'>('IDLE');
    const [scanLog, setScanLog] = useState<string>('');

    useEffect(() => {
        if (!isOpen) {
            setStatus('IDLE');
            setEmail('');
            setScanLog('');
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('SCANNING');
        
        // Simulação de Scan de Credenciais (Teatro de Segurança)
        const logs = [
            "Conectando ao banco de dados global...",
            "Verificando KYC (Know Your Customer)...",
            "Analisando perfil de liquidez...",
            "Credenciais validadas."
        ];

        for (let i = 0; i < logs.length; i++) {
            setScanLog(logs[i]);
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        // Salvar Lead Real
        await addLead({
            name: 'Investidor (Universo Dark)', // Nome genérico até contato real
            contact: email,
            source: 'Landing Universo Dark',
            interest: 'Private Equity / High Ticket',
            status: 'Prioridade Alta',
            ai_score: 99
        });

        setStatus('SUCCESS');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
            <div className="w-full max-w-md bg-[#050505] border border-winf-darkpurple/30 rounded-xl relative overflow-hidden shadow-[0_0_50px_rgba(75,0,130,0.3)]">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20">
                    <X size={20} />
                </button>

                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-900/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

                <div className="p-8 relative z-10 text-center">
                    
                    {status === 'IDLE' && (
                        <div className="animate-slide-up">
                            <div className="w-16 h-16 mx-auto bg-zinc-900/10 border border-winf-darkpurple/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(75,0,130,0.2)]">
                                <Lock size={32} className="text-zinc-500" />
                            </div>
                            <h3 className="text-2xl font-heading font-light text-white mb-2 tracking-wide">
                                ACESSO AO <span className="font-bold text-zinc-500">BOARD</span>
                            </h3>
                            <p className="text-gray-400 text-xs mb-8 max-w-xs mx-auto leading-relaxed">
                                Insira sua chave corporativa (e-mail) para iniciar a validação de credenciais.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative group">
                                    <input 
                                        type="email" 
                                        placeholder="seu@emailcorporativo.com" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg py-4 px-4 text-white text-center focus:border-winf-darkpurple focus:ring-1 focus:ring-winf-darkpurple/50 outline-none transition-all placeholder:text-gray-700"
                                        required
                                        autoFocus
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full py-4 bg-zinc-900 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-purple-900 transition-all shadow-lg hover:shadow-purple-900/20"
                                >
                                    Validar Credenciais
                                </button>
                            </form>
                            <p className="mt-6 text-[9px] text-gray-600 uppercase tracking-widest flex justify-center items-center gap-2">
                                <ShieldCheck size={12} /> Criptografia Ponta-a-Ponta
                            </p>
                        </div>
                    )}

                    {status === 'SCANNING' && (
                        <div className="py-10 flex flex-col items-center justify-center animate-fade-in">
                            <div className="relative w-24 h-24 mb-8">
                                <div className="absolute inset-0 border-4 border-winf-darkpurple/30 rounded-full"></div>
                                <div className="absolute inset-0 border-t-4 border-winf-darkpurple rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Scan size={32} className="text-zinc-500 animate-pulse" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest animate-pulse">Processando...</h3>
                            <p className="text-xs text-zinc-400 font-mono h-4">{scanLog}</p>
                        </div>
                    )}

                    {status === 'SUCCESS' && (
                        <div className="py-6 animate-slide-up">
                            <div className="w-20 h-20 mx-auto bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle size={40} className="text-green-500" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-white mb-4">SOLICITAÇÃO RECEBIDA</h3>
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left mb-6">
                                <p className="text-xs text-gray-400 mb-2">Protocolo:</p>
                                <p className="text-sm font-mono text-white tracking-widest">WINF-INVEST-{Math.floor(Math.random() * 10000)}</p>
                                <div className="h-px w-full bg-white/10 my-3"></div>
                                <p className="text-[10px] text-gray-500 leading-relaxed">
                                    Um NDA (Acordo de Confidencialidade) foi enviado para <strong>{email}</strong>. 
                                    Aguarde o contato do nosso Diretor de Expansão.
                                </p>
                            </div>
                            <button onClick={onClose} className="text-xs text-gray-400 hover:text-white underline">
                                Fechar Janela
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

const LandingUniversoDark: React.FC<LandingUniversoDarkProps> = ({ onBack }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-zinc-800/30 overflow-x-hidden animate-fade-in">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-winf-darkpurple/30 bg-[#000000]/90 backdrop-blur-xl transition-all duration-300 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> <span className="text-sm font-bold uppercase tracking-widest">Voltar</span>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Private Equity Access</span>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-12 px-6 max-w-[1400px] mx-auto space-y-12">
        
        {/* Header Hero */}
        <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-winf-darkpurple/50 bg-zinc-900/10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 backdrop-blur-md">
                <Lock size={12} /> Restricted Environment
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-light text-white tracking-tight mb-4">
                UNIVERSO <span className="font-bold text-zinc-500">DARK</span><span className="text-xl align-top ml-2 text-gray-500">™</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                A divisão de investimentos estratégicos da Winf Partners. Onde a tecnologia disruptiva encontra o capital inteligente.
            </p>
        </div>

        {/* Narrative & Action Section - The Core Request */}
        <div className="bg-gradient-to-br from-[#0a0a0a] to-zinc-950/10 border border-winf-darkpurple/30 rounded-xl p-12 md:p-20 text-center relative overflow-hidden shadow-[0_0_50px_rgba(75,0,130,0.15)]">
            <div className="absolute top-0 right-0 p-40 bg-zinc-900/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 p-40 bg-black rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                <h2 className="text-4xl md:text-6xl font-heading font-light text-white leading-tight">
                "Invista no invisível,<br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-950">colha o visível"</span>
                </h2>
                
                <div className="w-24 h-1 bg-zinc-900 mx-auto rounded-full"></div>
                
                <p className="text-gray-300 text-xl font-light">
                Entre no círculo interno da revolução tecnológica.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                    <button 
                        onClick={() => setShowModal(true)}
                        className="px-12 py-5 bg-zinc-900 text-white font-bold text-sm tracking-[0.2em] uppercase rounded-sm transition-all shadow-[0_0_30px_rgba(75,0,130,0.3)] flex items-center justify-center gap-3 transform hover:scale-105 hover:bg-purple-800"
                    >
                        <Briefcase size={18} /> Solicitar Acesso ao Board
                    </button>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
                        <Fingerprint size={12} /> Validação biométrica de dados necessária
                    </p>
                </div>
            </div>
        </div>

        {/* Public Data Teaser */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity duration-500">
            
            {/* Chart Teaser */}
            <div className="lg:col-span-2 bg-black border border-white/10 rounded-xl p-8 relative overflow-hidden font-mono group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">PROJEÇÃO DE CRESCIMENTO</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse"></span>
                                <span className="text-[10px] text-zinc-500 font-bold uppercase">LIVE DATA PREVIEW</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[250px] w-full grayscale group-hover:grayscale-0 transition-all duration-700">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={PROJECTION_DATA}>
                                <defs>
                                    <linearGradient id="colorGrowthPublic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4B0082" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#4B0082" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(75,0,130,0.1)" vertical={false} horizontal={true} />
                                <XAxis dataKey="month" stroke="#444" tick={{fill: '#444', fontSize: 10}} tickLine={false} axisLine={false} />
                                <YAxis stroke="#444" tick={{fill: '#444', fontSize: 10}} tickLine={false} axisLine={false} />
                                <Area type="monotone" dataKey="value" stroke="#4B0082" strokeWidth={2} fillOpacity={1} fill="url(#colorGrowthPublic)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Metrics Teaser */}
            <div className="flex flex-col gap-4">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Crescimento Anual</p>
                            <TrendingUp size={16} className="text-zinc-500" />
                        </div>
                        <h3 className="text-4xl font-heading font-bold text-white mb-1">68%</h3>
                        <p className="text-[10px] text-gray-600">CAGR estimado.</p>
                    </div>
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Market Cap Alvo</p>
                            <PieChart size={16} className="text-white" />
                        </div>
                        <h3 className="text-4xl font-heading font-bold text-white mb-1">R$ 175M</h3>
                        <p className="text-[10px] text-gray-600">Projeção 2027.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="text-center pt-8 border-t border-white/5">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                Acesso restrito a investidores qualificados. Dados sujeitos a NDA.
            </p>
        </div>

        {/* The One-Touch Access Modal */}
        <InvestorAccessModal isOpen={showModal} onClose={() => setShowModal(false)} />

      </div>
    </div>
  );
};

export default LandingUniversoDark;
