
import React, { useState } from 'react';
import { Users, Shield, Map, CreditCard, Search, MoreVertical, CheckCircle, XCircle, Mail, Phone, ExternalLink, Award, Zap, ChevronRight } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { motion } from 'framer-motion';

interface ModuleTheBoardProps {
    onBack?: () => void;
}

const ModuleTheBoard: React.FC<ModuleTheBoardProps> = ({ onBack }) => {
    const { members, updateUserCoins } = useWinf();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMember, setSelectedMember] = useState<any>(null);

    const filteredMembers = members.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleGrantCoins = async (memberId: string) => {
        const amount = prompt("Quantidade de WinfCoins a conceder:");
        if (amount && !isNaN(parseInt(amount))) {
            // In a real app, this would be a specific admin function
            alert(`Concedendo ${amount} WinfCoins para o membro.`);
        }
    };

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
                        <h1 className="text-4xl font-light text-winf-text_primary tracking-tight">THE <span className="font-bold text-winf-text_muted">BOARD™</span></h1>
                        <p className="text-winf-text_muted text-sm">Controle Central: Gestão de Membros, Territórios e Performance de Rede.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-winf-surface border border-winf-border px-6 py-3 rounded-2xl">
                    <div className="text-right">
                        <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Total de Membros</p>
                        <p className="text-winf-text_primary font-bold text-xl">{members.length}</p>
                    </div>
                    <div className="w-px h-8 bg-winf-border"></div>
                    <div className="text-right">
                        <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Ativos Hoje</p>
                        <p className="text-winf-primary font-bold text-xl">12</p>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Members List */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-winf-surface border border-winf-border rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-winf-border flex flex-col md:flex-row justify-between items-center gap-4">
                            <h3 className="text-winf-text_primary font-bold flex items-center gap-2"><Users size={18} className="text-winf-text_muted" /> Rede de Parceiros</h3>
                            <div className="relative w-full md:w-80">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-winf-text_muted" />
                                <input 
                                    type="text" 
                                    placeholder="Buscar por nome, email ou cidade..." 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full bg-winf-background border border-winf-border py-2.5 pl-12 pr-4 rounded-xl text-winf-text_primary text-sm outline-none focus:border-winf-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-winf-text_secondary">
                                <thead className="bg-winf-background text-[10px] uppercase font-black tracking-widest text-winf-text_muted">
                                    <tr>
                                        <th className="p-6">Membro</th>
                                        <th className="p-6">Plano</th>
                                        <th className="p-6">Território</th>
                                        <th className="p-6">Performance</th>
                                        <th className="p-6 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-winf-border">
                                    {filteredMembers.map(member => (
                                        <tr 
                                            key={member.id} 
                                            onClick={() => setSelectedMember(member)}
                                            className={`hover:bg-winf-background/40 transition-colors cursor-pointer ${selectedMember?.id === member.id ? 'bg-winf-background/60' : ''}`}
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <img src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random`} className="w-10 h-10 rounded-full border border-winf-border" />
                                                    <div>
                                                        <p className="text-winf-text_primary font-bold">{member.name}</p>
                                                        <p className="text-[10px] text-winf-text_muted">{member.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${member.role === 'Admin' ? 'bg-winf-primary/10 text-winf-primary' : 'bg-winf-background/40 text-winf-text_muted'}`}>
                                                    {member.role}
                                                </span>
                                            </td>
                                            <td className="p-6 text-xs">
                                                {member.address?.city || 'N/A'}, {member.address?.state || 'N/A'}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1 bg-winf-background rounded-full overflow-hidden w-16">
                                                        <div className="h-full bg-winf-primary" style={{ width: '75%' }}></div>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-winf-text_primary">75%</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <button className="p-2 hover:bg-winf-background/60 rounded-lg transition-colors text-winf-text_muted hover:text-winf-text_primary">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Member Detail Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {selectedMember ? (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-winf-surface border border-winf-border rounded-3xl p-8 space-y-8 sticky top-6"
                        >
                            <div className="text-center space-y-4">
                                <img src={selectedMember.avatar || `https://ui-avatars.com/api/?name=${selectedMember.name}&background=random`} className="w-24 h-24 rounded-full border-2 border-winf-border mx-auto" />
                                <div>
                                    <h3 className="text-2xl font-bold text-winf-text_primary">{selectedMember.name}</h3>
                                    <p className="text-winf-text_muted text-sm">{selectedMember.company || 'Autônomo'}</p>
                                </div>
                                <div className="flex justify-center gap-2">
                                    <span className="bg-winf-primary/10 text-winf-primary text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1">
                                        <Award size={10} /> {selectedMember.w_rank_level}
                                    </span>
                                    <span className="bg-winf-background text-winf-text_primary text-[10px] font-black px-3 py-1 rounded-full border border-winf-border">
                                        XP {selectedMember.w_rank_xp}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-winf-background/40 p-4 rounded-2xl border border-winf-border text-center">
                                    <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest mb-1">WinfCoins</p>
                                    <p className="text-winf-text_primary font-bold text-lg">W$ {selectedMember.winfCoins.toLocaleString()}</p>
                                </div>
                                <div className="bg-winf-background/40 p-4 rounded-2xl border border-winf-border text-center">
                                    <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest mb-1">Status</p>
                                    <p className="text-winf-primary font-bold text-lg flex items-center justify-center gap-1">
                                        <CheckCircle size={14} /> Ativo
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-winf-text_primary font-bold text-xs uppercase tracking-widest border-b border-winf-border pb-2 flex items-center gap-2">
                                    <Shield size={14} className="text-winf-text_muted" /> Ações de Gestão
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                    <button onClick={() => handleGrantCoins(selectedMember.id)} className="w-full py-3 bg-winf-primary/10 hover:bg-winf-primary/20 text-winf-primary rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-winf-primary/20">
                                        <Zap size={14} /> Conceder WinfCoins
                                    </button>
                                    <button className="w-full py-3 bg-winf-background/40 hover:bg-winf-background/60 text-winf-text_muted rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-winf-border">
                                        <Shield size={14} /> Alterar Permissões
                                    </button>
                                    <button className="w-full py-3 bg-winf-background/40 hover:bg-winf-background/60 text-winf-text_primary rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-winf-border">
                                        <Mail size={14} /> Enviar Credenciais
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-winf-text_primary font-bold text-xs uppercase tracking-widest border-b border-winf-border pb-2 flex items-center gap-2">
                                    <Phone size={14} className="text-winf-text_muted" /> Contato
                                </h4>
                                <div className="space-y-2 text-sm text-winf-text_secondary">
                                    <div className="flex items-center gap-3"><Mail size={14} /> {selectedMember.email}</div>
                                    <div className="flex items-center gap-3"><Phone size={14} /> {selectedMember.phone || 'Não informado'}</div>
                                    <div className="flex items-center gap-3"><Map size={14} /> {selectedMember.address?.city}, {selectedMember.address?.state}</div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-winf-surface border border-dashed border-winf-border rounded-3xl p-12 text-center space-y-4 flex flex-col items-center justify-center h-full min-h-[400px]">
                            <Users size={48} className="text-winf-text_muted/30" />
                            <p className="text-winf-text_muted text-sm">Selecione um membro para visualizar detalhes e gerenciar conta.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModuleTheBoard;
