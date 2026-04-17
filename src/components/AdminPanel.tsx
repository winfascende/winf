
import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Shield, 
  UserCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Award, 
  TrendingUp,
  Lock,
  Unlock,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { User } from '../types';

const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { members, fetchMembers, updateUserRole, user: currentUser } = useWinf();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const filteredUsers = members.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roles = ['All', 'Admin', 'Licensee', 'Member'];

  return (
    <div className="flex flex-col h-full bg-black text-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-900/30 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
              <Shield size={20} className="text-winf-primary" />
              Painel de Controle <span className="text-winf-primary">Board</span>
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Gestão de Permissões e Membros</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-winf-primary/10 border border-winf-primary/20">
            <UserCheck size={14} className="text-winf-primary" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-winf-primary">
              {members.length} Membros Ativos
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 border-r border-white/5 p-6 space-y-8 bg-zinc-900/10">
          <div>
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 block">Pesquisar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
              <input 
                type="text"
                placeholder="Nome ou Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-winf-primary/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 block">Nível de Acesso</label>
            <div className="space-y-2">
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    roleFilter === role 
                    ? 'bg-winf-primary text-black' 
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {role === 'All' ? 'Todos' : role}
                  {roleFilter === role && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-winf-primary/5 border border-winf-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Lock size={14} className="text-winf-primary" />
              <span className="text-[10px] font-black uppercase tracking-tighter text-winf-primary">Acesso Restrito</span>
            </div>
            <p className="text-[9px] text-zinc-500 leading-relaxed font-medium">
              Apenas administradores de nível Board podem conceder ou revogar permissões exclusivas.
            </p>
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((u, idx) => (
                <motion.div
                  key={u.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-zinc-900/40 border border-white/5 rounded-2xl p-4 hover:border-winf-primary/30 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden relative group-hover:border-winf-primary/50 transition-colors">
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                        ) : (
                          <Users size={20} className="text-zinc-600" />
                        )}
                        <div className="absolute inset-0 bg-winf-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold uppercase tracking-tight">{u.name}</h3>
                          <span className={`text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${
                            u.role === 'Admin' ? 'bg-winf-primary text-black' : 
                            u.role === 'Licensee' ? 'bg-blue-500/20 text-blue-400' : 
                            'bg-white/5 text-zinc-500'
                          }`}>
                            {u.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                            <Mail size={10} />
                            {u.email}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-winf-primary/60">
                            <Award size={10} />
                            {u.w_rank_level || 'Initiate'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">WinfCoins</span>
                        <span className="text-xs font-bold text-winf-primary">{u.winfCoins?.toLocaleString() || 0}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <select 
                          value={u.role}
                          onChange={(e) => updateUserRole(u.id, e.target.value)}
                          disabled={u.id === currentUser?.id}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-tighter focus:outline-none focus:border-winf-primary/50 transition-colors disabled:opacity-50"
                        >
                          <option value="Member">Member</option>
                          <option value="Licensee">Licensee</option>
                          <option value="Admin">Admin</option>
                        </select>
                        
                        <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredUsers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
                <Users size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest">Nenhum membro encontrado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
