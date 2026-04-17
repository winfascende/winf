
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Search, Calendar, History, FileText, ChevronLeft, CheckCircle, Clock } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

type Tab = 'register' | 'history' | 'schedule';

const WarrantySystem: React.FC = () => {
  const { warranties, registerWarranty, fetchWarranties } = useWinf();
  const [activeTab, setActiveTab] = useState<Tab>('register');
  const [form, setForm] = useState({ customerName: '', customerEmail: '', productLine: 'AeroCore', purchaseDate: '' });

  useEffect(() => { fetchWarranties(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await registerWarranty(form as any);
      setForm({ customerName: '', customerEmail: '', productLine: 'AeroCore', purchaseDate: '' });
      alert("Garantia registrada com sucesso!");
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-winf-border pb-6">
            <div>
                <h1 className="text-3xl font-light text-white tracking-tight">SISTEMA DE <span className="font-bold text-green-500">GARANTIA</span></h1>
                <p className="text-gray-400 text-sm mt-1">Gestão de ativos protegidos e certificados digitais.</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-lg flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-500" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">{warranties.length} Ativos Protegidos</span>
            </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-winf-border">
            <button 
                onClick={() => setActiveTab('register')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'register' ? 'text-white border-b-2 border-green-500 bg-white/5' : 'text-gray-500 hover:text-white'}`}
            >
                <Plus size={16} /> Novo Registro
            </button>
            <button 
                onClick={() => setActiveTab('history')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'history' ? 'text-white border-b-2 border-green-500 bg-white/5' : 'text-gray-500 hover:text-white'}`}
            >
                <History size={16} /> Histórico
            </button>
            <button 
                onClick={() => setActiveTab('schedule')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${activeTab === 'schedule' ? 'text-white border-b-2 border-green-500 bg-white/5' : 'text-gray-500 hover:text-white'}`}
            >
                <Calendar size={16} /> Manutenção Agendada
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-12">
                
                {/* TAB: REGISTER */}
                {activeTab === 'register' && (
                    <div className="bg-winf-card border border-winf-border rounded-xl p-8 max-w-3xl mx-auto animate-slide-up">
                        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Dados da Aplicação</h3>
                                <p className="text-xs text-gray-500">Preencha os dados para gerar o certificado blockchain.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Cliente</label>
                                    <input value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} placeholder="Nome Completo" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-green-500 outline-none transition-colors" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Contato</label>
                                    <input value={form.customerEmail} onChange={e => setForm({...form, customerEmail: e.target.value})} placeholder="Email ou Telefone" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-green-500 outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Produto Aplicado</label>
                                    <select value={form.productLine} onChange={e => setForm({...form, productLine: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-green-500 outline-none appearance-none">
                                        <option value="AeroCore">AeroCore™ Nano-Ceramic</option>
                                        <option value="Select">Winf Select™ Architectural</option>
                                        <option value="NeoSkin">NeoSkin™ PPF Protection</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Data de Instalação</label>
                                    <div className="relative">
                                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input type="date" value={form.purchaseDate} onChange={e => setForm({...form, purchaseDate: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-green-500 outline-none" required />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-lg uppercase tracking-widest text-sm transition-all shadow-lg shadow-green-900/20">
                                    Emitir Certificado de Garantia
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* TAB: HISTORY */}
                {activeTab === 'history' && (
                    <div className="bg-winf-card border border-winf-border rounded-xl p-6 animate-slide-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold flex items-center gap-2"><History size={18}/> Registros Recentes</h3>
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input placeholder="Buscar serial..." className="bg-black border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs text-white w-48 focus:border-green-500 outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            {warranties.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">Nenhuma garantia registrada.</div>
                            ) : (
                                warranties.map(w => (
                                    <div key={w.id} className="flex flex-col md:flex-row justify-between items-center p-4 bg-white/5 rounded-lg border border-white/5 hover:border-green-500/30 transition-colors group">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-green-500 group-hover:border-green-500/50 transition-colors">
                                                <ShieldCheck size={18} />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold">{w.customerName}</p>
                                                <p className="text-xs text-gray-500 font-mono">{w.serialNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Produto</p>
                                                <p className="text-sm text-gray-300">{w.productLine}</p>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase bg-green-500/10 text-green-500 border border-green-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                                                <CheckCircle size={10} /> Ativa
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* TAB: SCHEDULE (New Calendar Feature) */}
                {activeTab === 'schedule' && (
                    <div className="bg-winf-card border border-winf-border rounded-xl p-8 text-center animate-slide-up flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 relative">
                            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></div>
                            <Calendar size={32} className="text-green-500 relative z-10" />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-2">Agendamento de <span className="font-bold">Retorno</span></h3>
                        <p className="text-gray-400 max-w-md mx-auto mb-8">
                            O sistema notifica automaticamente seus clientes quando for a hora da revisão periódica ou manutenção da aplicação.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl text-left">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-4">
                                <div className="bg-zinc-800/20 p-2 rounded text-zinc-400"><Clock size={20} /></div>
                                <div>
                                    <p className="text-white font-bold text-sm">Próxima Revisão</p>
                                    <p className="text-xs text-gray-500">João Silva - Porsche 911 (15 dias)</p>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-4 opacity-50">
                                <div className="bg-gray-700/20 p-2 rounded text-gray-400"><Calendar size={20} /></div>
                                <div>
                                    <p className="text-white font-bold text-sm">Agenda Vazia</p>
                                    <p className="text-xs text-gray-500">Nenhum retorno para hoje.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
  );
};
export default WarrantySystem;
