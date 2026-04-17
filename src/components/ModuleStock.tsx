
import React, { useState } from 'react';
import { Package, Plus, Minus, History, TrendingUp, AlertCircle, Search, Filter, ChevronRight, ArrowDownLeft, ArrowUpRight, Scissors, Bot } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleStockProps {
    onBack?: () => void;
}

const ModuleStock: React.FC<ModuleStockProps> = ({ onBack }) => {
    const { stockItems, stockHistory, updateStock, user, gamify, dispatchAgentCommand } = useWinf();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isAgentProcessing, setIsAgentProcessing] = useState(false);

    const handleAgentReplenish = async () => {
        const lowStockItems = stockItems.filter(i => i.remaining_meters < 5);
        if (lowStockItems.length === 0) return;

        setIsAgentProcessing(true);
        const itemNames = lowStockItems.map(i => i.product_name).join(', ');
        
        await dispatchAgentCommand({
            type: 'MESSAGE',
            action: `Solicitar reposição de estoque baixo: ${itemNames}`,
            payload: { items: lowStockItems }
        });

        setIsAgentProcessing(false);
        alert(`Agente Neural acionado para reposição de: ${itemNames}`);
    };

    const filteredStock = stockItems.filter(item => 
        item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayHistory = stockHistory.length > 0 ? stockHistory.slice(0, 5) : [
        { type: 'OUT', product_name: 'Winf Invisible®', amount: 2.4, date: new Date().toISOString(), ref: 'Orçamento #Q-128' },
        { type: 'IN', product_name: 'Winf BlackPro®', amount: 30.0, date: new Date().toISOString(), ref: 'Compra BlackShop' },
        { type: 'OUT', product_name: 'Winf Dual Reflect®', amount: 1.8, date: new Date(Date.now() - 86400000).toISOString(), ref: 'Orçamento #Q-127' },
    ];

    const totalStockValue = stockItems.reduce((acc, item) => acc + (item.remaining_meters * 15), 0); // Mock value per meter

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-winf-border pb-8">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button 
                            onClick={onBack}
                            className="p-3 bg-winf-surface hover:bg-winf-surface_hover rounded-xl transition-all text-winf-text_muted hover:text-winf-text_primary"
                        >
                            <ChevronRight size={20} className="rotate-180" />
                        </button>
                    )}
                    <div className="space-y-1">
                        <h1 className="text-4xl font-light text-winf-text_primary tracking-tight">WINF <span className="font-bold text-winf-primary">STOCK™</span></h1>
                        <p className="text-winf-text_muted text-sm">Gestão de Materiais: Controle de entrada, saída e otimização de rolos.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="bg-winf-primary hover:bg-winf-primary_hover text-winf-background px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-winf-primary/10"
                    >
                        <Plus size={18} /> Nova Entrada
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-winf-surface border border-winf-border p-6 rounded-2xl space-y-2">
                    <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Total em Estoque</p>
                    <h3 className="text-2xl font-bold text-winf-text_primary">{stockItems.reduce((acc, i) => acc + i.remaining_meters, 0).toFixed(1)}m</h3>
                    <div className="flex items-center gap-1 text-[10px] text-winf-text_muted font-bold">
                        <TrendingUp size={10} /> +5.2% vs mês anterior
                    </div>
                </div>
                <div className="bg-winf-surface border border-winf-border p-6 rounded-2xl space-y-2">
                    <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Valor Estimado</p>
                    <h3 className="text-2xl font-bold text-winf-text_primary">R$ {totalStockValue.toLocaleString()}</h3>
                    <p className="text-[10px] text-winf-text_muted">Baseado em custo médio</p>
                </div>
                <div className="bg-winf-surface border border-winf-border p-6 rounded-2xl space-y-2">
                    <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Rolos Ativos</p>
                    <h3 className="text-2xl font-bold text-winf-text_primary">{stockItems.length}</h3>
                    <p className="text-[10px] text-winf-text_muted">Prontos para corte</p>
                </div>
                <div className="bg-winf-surface border border-winf-border p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Alertas de Reposição</p>
                            <h3 className="text-2xl font-bold text-amber-500">{stockItems.filter(i => i.remaining_meters < 5).length}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                            <AlertCircle size={10} /> Itens abaixo de 5m
                        </div>
                    </div>
                    {stockItems.filter(i => i.remaining_meters < 5).length > 0 && (
                        <button 
                            onClick={handleAgentReplenish}
                            disabled={isAgentProcessing}
                            className="w-full py-2 bg-winf-primary/10 hover:bg-winf-primary/20 border border-winf-primary/20 rounded-lg text-[10px] font-black text-winf-primary uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                        >
                            <Bot size={12} className={isAgentProcessing ? 'animate-pulse' : ''} />
                            {isAgentProcessing ? 'Acionando Agente...' : 'Solicitar Reposição via Agente'}
                        </button>
                    )}
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-winf-surface border border-winf-border rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-winf-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-winf-text_primary font-bold flex items-center gap-2"><Package size={18} className="text-winf-text_muted" /> Inventário de Rolos</h3>
                    <div className="relative w-full md:w-80">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-winf-text_muted" />
                        <input 
                            type="text" 
                            placeholder="Buscar material..." 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-winf-background border border-winf-border py-2.5 pl-12 pr-4 rounded-xl text-winf-text_primary text-sm outline-none focus:border-winf-primary transition-all"
                        />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-winf-text_muted">
                        <thead className="bg-winf-background/50 text-[10px] uppercase font-black tracking-widest text-winf-text_muted">
                            <tr>
                                <th className="p-6">Material</th>
                                <th className="p-6">Largura</th>
                                <th className="p-6">Total Original</th>
                                <th className="p-6">Disponível</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-winf-border">
                            {filteredStock.map(item => (
                                <tr key={item.id} className="hover:bg-winf-background/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-winf-background rounded-lg flex items-center justify-center text-winf-text_muted border border-winf-border">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <p className="text-winf-text_primary font-bold">{item.product_name}</p>
                                                <p className="text-[10px] text-winf-text_muted">ID: {item.id.slice(0,8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 font-mono text-winf-text_primary">{item.width}m</td>
                                    <td className="p-6 font-mono text-winf-text_primary">{item.total_meters}m</td>
                                    <td className="p-6">
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[10px] font-bold">
                                                <span className="text-winf-text_primary">{item.remaining_meters.toFixed(1)}m</span>
                                                <span className="text-winf-text_muted">{Math.round((item.remaining_meters / item.total_meters) * 100)}%</span>
                                            </div>
                                            <div className="w-32 h-1.5 bg-winf-background rounded-full overflow-hidden border border-winf-border">
                                                <div 
                                                    className={`h-full transition-all duration-1000 ${item.remaining_meters < 5 ? 'bg-amber-500' : 'bg-winf-primary'}`}
                                                    style={{ width: `${(item.remaining_meters / item.total_meters) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        {item.remaining_meters < 5 ? (
                                            <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-2 py-1 rounded uppercase">Crítico</span>
                                        ) : (
                                            <span className="bg-winf-primary/10 text-winf-primary text-[10px] font-black px-2 py-1 rounded uppercase">Estável</span>
                                        )}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 bg-winf-background hover:bg-winf-surface rounded-lg text-winf-text_muted hover:text-winf-text_primary transition-all border border-winf-border">
                                                <History size={16} />
                                            </button>
                                            <button className="p-2 bg-winf-background hover:bg-winf-surface rounded-lg text-winf-text_muted hover:text-winf-text_primary transition-all border border-winf-border">
                                                <Scissors size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Movements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-winf-surface border border-winf-border rounded-3xl p-6 space-y-6">
                    <h3 className="text-winf-text_primary font-bold flex items-center gap-2"><History size={18} className="text-winf-text_muted" /> Movimentações Recentes</h3>
                    <div className="space-y-4">
                        {displayHistory.map((m, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-winf-background rounded-2xl border border-winf-border">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${m.type === 'IN' ? 'bg-winf-primary/10 text-winf-primary' : 'bg-winf-text_muted/10 text-winf-text_muted'}`}>
                                        {m.type === 'IN' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                    </div>
                                    <div>
                                        <p className="text-winf-text_primary font-bold text-sm">{m.product_name}</p>
                                        <p className="text-[10px] text-winf-text_muted">{m.ref || 'Movimentação'} • {new Date(m.date).toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className={`font-mono font-bold ${m.type === 'IN' ? 'text-winf-primary' : 'text-winf-text_muted'}`}>
                                    {m.type === 'IN' ? '+' : '-'}{m.amount}m
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Optimization Insight */}
                <div className="bg-winf-surface border border-winf-border rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <TrendingUp size={120} className="text-winf-text_primary" />
                    </div>
                    <div className="space-y-4 relative z-10">
                        <div className="w-12 h-12 bg-winf-primary rounded-2xl flex items-center justify-center text-winf-background shadow-lg shadow-winf-primary/20">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-winf-text_primary">Insight de Otimização</h3>
                        <p className="text-winf-text_muted text-sm leading-relaxed">
                            Seu aproveitamento de material subiu <span className="text-winf-text_primary font-bold">14%</span> este mês usando o Winf Cut™. Isso representa uma economia direta de <span className="text-winf-text_primary font-bold text-lg">R$ 1.240</span> em desperdício evitado.
                        </p>
                    </div>
                    <button className="w-full mt-8 py-4 bg-winf-primary hover:bg-winf-primary_hover text-winf-background font-bold rounded-2xl transition-all shadow-lg shadow-winf-primary/20">
                        Ver Relatório de Desperdício
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModuleStock;
