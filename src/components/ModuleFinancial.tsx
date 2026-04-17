
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Plus, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Settings,
  Calendar,
  CheckCircle,
  Users,
  Car,
  Layers,
  ArrowUpRight,
  Search,
  PieChart
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, CartesianGrid, Pie, Cell } from 'recharts';
import { useWinf } from '../contexts/WinfContext';
import { Skeleton } from './ui/LoadingSkeleton';

const FILM_OPTIONS = [
    'AeroCore™ Nano-Ceramic',
    'Winf Select™ Architectural',
    'NeoSkin™ PPF Gloss',
    'NeoSkin™ PPF Matte',
    'Standard Carbon Dyed',
    'Outros Serviços'
];

interface Client {
    id: string;
    name: string;
    vehicle: string;
    phone: string;
}

// Dados simulados baseados no Manual V5 (Mix de Produtos)
const MONTHLY_PROJECTION = [
    { name: 'Sem 1', revenue: 8500, cost: 950 },
    { name: 'Sem 2', revenue: 9200, cost: 1100 },
    { name: 'Sem 3', revenue: 11500, cost: 1050 },
    { name: 'Sem 4', revenue: 11300, cost: 1100 },
];

const REVENUE_MIX = [
    { name: 'BlackPro', value: 16200, color: '#ffffff' }, // 3 rolos
    { name: 'Dual Reflect', value: 12600, color: '#a1a1aa' }, // 2 rolos
    { name: 'Invisible', value: 11700, color: '#71717a' }, // 1 rolo
];

const ModuleFinancial: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { transactions, fetchTransactions, addTransaction, isLoading } = useWinf();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'clients' | 'config'>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Total simulado do mês (Baseado no Manual V5)
  const simulatedTotalRevenue = 40500;
  const simulatedTotalCost = 4200;
  const simulatedNet = simulatedTotalRevenue - simulatedTotalCost;

  useEffect(() => { fetchTransactions(); }, []);

  // Use real transactions if available, otherwise use simulation for dashboard look
  const displayTransactions = transactions.length > 0 ? transactions : [
      { id: 't1', description: 'Aplicação Invisible (Residência Alphaville)', amount: 5800, type: 'income', paymentMethod: 'Pix', date: new Date().toISOString() },
      { id: 't2', description: 'Aplicação BlackPro (Escritório)', amount: 2400, type: 'income', paymentMethod: 'Credit', date: new Date().toISOString() },
      { id: 't3', description: 'Compra Estoque (1x Invisible)', amount: 1400, type: 'expense', paymentMethod: 'Boleto', date: new Date().toISOString() },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-fade-in pb-20">
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/[0.03] pb-10 gap-8">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                    <ChevronLeft size={14} /> System Base
                </button>
                <h1 className="text-5xl font-heading font-light text-white tracking-tighter">FINANCIAL <span className="font-bold text-winf-ascend_green">CORE</span></h1>
                <p className="text-gray-600 text-xs mt-4 uppercase tracking-widest">Fluxo de Caixa & Unit Economics // V6.0</p>
            </div>
            
            <div className="flex gap-1 bg-[#080808] border border-white/5 p-1 rounded">
                <button onClick={() => setActiveTab('dashboard')} className={`px-5 py-2 text-[9px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === 'dashboard' ? 'bg-white/5 text-white' : 'text-gray-600 hover:text-gray-400'}`}>Visão Geral</button>
                <button onClick={() => setActiveTab('transactions')} className={`px-5 py-2 text-[9px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === 'transactions' ? 'bg-white/5 text-white' : 'text-gray-600 hover:text-gray-400'}`}>Extrato</button>
                <button onClick={() => setActiveTab('clients')} className={`px-5 py-2 text-[9px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === 'clients' ? 'bg-white/5 text-white' : 'text-gray-600 hover:text-gray-400'}`}>Clientes</button>
            </div>
        </div>

        {activeTab === 'dashboard' && (
            <div className="space-y-10">
                {/* Clean KPI Cards based on V5 Manual Projection */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                    <div className="bg-[#0A0A0A] border border-white/[0.03] p-10 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 bg-winf-ascend_green/5 rounded-full blur-xl"></div>
                        <p className="text-[8px] text-gray-600 uppercase font-black tracking-[0.4em] mb-6">Faturamento Bruto</p>
                        <div className="flex items-baseline gap-2 relative z-10">
                           <span className="text-4xl font-mono font-bold text-white tracking-tighter">R$ {simulatedTotalRevenue.toLocaleString()}</span>
                           <TrendingUp size={14} className="text-winf-ascend_green" />
                        </div>
                    </div>
                    <div className="bg-[#0A0A0A] border border-white/[0.03] p-10 group">
                        <p className="text-[8px] text-gray-600 uppercase font-black tracking-[0.4em] mb-6">Custo de Material (CMV)</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-mono font-bold text-white tracking-tighter">R$ {simulatedTotalCost.toLocaleString()}</span>
                        </div>
                        <p className="text-[9px] text-gray-500 mt-2">Aprox. 10.3% da Receita</p>
                    </div>
                    <div className="bg-[#0A0A0A] border border-white/[0.03] p-10 group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800"></div>
                        <p className="text-[8px] text-gray-600 uppercase font-black tracking-[0.4em] mb-6">Lucro Operacional</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-mono font-bold text-zinc-400 tracking-tighter">R$ {simulatedNet.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="bg-[#0A0A0A] border border-white/[0.03] p-10 group">
                        <p className="text-[8px] text-gray-600 uppercase font-black tracking-[0.4em] mb-6">Ticket Médio (m²)</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-mono font-bold text-zinc-400 tracking-tighter">R$ 173,00</span>
                        </div>
                        <p className="text-[9px] text-gray-500 mt-2">Mix: Black/Dual/Invisible</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Chart Area */}
                    <div className="lg:col-span-8 bg-[#080808] border border-white/[0.05] p-10 rounded-sm">
                        <div className="flex justify-between items-center mb-10">
                           <h3 className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.3em]">Curva de Crescimento (4 Semanas)</h3>
                           <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 text-zinc-400 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                              <Plus size={14} /> Registrar Transação
                           </button>
                        </div>
                        <div className="h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={MONTHLY_PROJECTION}>
                                 <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                                 <XAxis dataKey="name" stroke="#333" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                                 <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #111', fontSize: '10px'}} />
                                 <Area type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                                 <Area type="monotone" dataKey="cost" stroke="#52525b" strokeWidth={2} fillOpacity={0} />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Revenue Mix */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0A0A0A] border border-white/[0.03] p-8 rounded-sm h-full flex flex-col">
                           <h3 className="text-gray-600 font-bold text-[9px] uppercase tracking-[0.3em] mb-8">Mix de Receita</h3>
                           <div className="flex-1 min-h-[200px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={REVENUE_MIX} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {REVENUE_MIX.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <p className="text-[8px] text-gray-500 uppercase font-bold">Total</p>
                                    <p className="text-sm text-white font-bold">R$ 40.5k</p>
                                </div>
                           </div>
                           <div className="space-y-3 mt-4">
                                {REVENUE_MIX.map(item => (
                                    <div key={item.name} className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                                            <span className="text-gray-400">{item.name}</span>
                                        </div>
                                        <span className="font-mono font-bold text-white">R$ {item.value.toLocaleString()}</span>
                                    </div>
                                ))}
                           </div>
                        </div>
                    </div>
                </div>
                
                {/* Recent Transactions List */}
                <div className="bg-[#080808] border border-white/[0.05] p-8 rounded-sm">
                    <h3 className="text-gray-600 font-bold text-[9px] uppercase tracking-[0.3em] mb-6">Lançamentos Recentes</h3>
                    <div className="space-y-1">
                        {isLoading ? (
                            <div className="space-y-4 p-4">
                                <Skeleton className="h-12 w-full" count={3} />
                            </div>
                        ) : displayTransactions.length === 0 ? (
                            <div className="p-12 text-center text-gray-600">
                                <DollarSign size={32} className="mx-auto mb-4 opacity-20" />
                                <p className="text-xs uppercase font-black tracking-widest">Nenhuma transação registrada.</p>
                            </div>
                        ) : (
                            displayTransactions.map((t: any) => (
                                <div key={t.id} className="flex justify-between items-center p-4 hover:bg-white/[0.02] border-b border-white/[0.02] last:border-0 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded bg-white/5 ${t.type === 'income' ? 'text-white' : 'text-zinc-500'}`}>
                                            <DollarSign size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-zinc-400 transition-colors">{t.description}</p>
                                            <p className="text-[10px] text-gray-600 uppercase tracking-widest">{new Date(t.date).toLocaleDateString()} • {t.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <span className={`font-mono font-bold ${t.type === 'income' ? 'text-white' : 'text-zinc-500'}`}>
                                        {t.type === 'income' ? '+' : '-'} R$ {t.amount.toLocaleString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        )}
        
        {/* Placeholder for Add Modal */}
        {showAddModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                <div className="w-full max-w-md bg-[#0A0A0A] border border-white/5 p-10 rounded relative z-10 animate-slide-up">
                    <h3 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Nova Operação</h3>
                    <div className="space-y-4 text-center">
                        <p className="text-gray-500 text-[11px] uppercase tracking-widest">Interface de Lançamento Ativa</p>
                        <button onClick={() => setShowAddModal(false)} className="w-full py-4 bg-zinc-800 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded">Confirmar Registro</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ModuleFinancial;
