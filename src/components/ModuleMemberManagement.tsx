import React, { useEffect } from 'react';
import { ChevronLeft, Users, Trash2 } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

const ModuleMemberManagement: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const { user, members, fetchMembers, deleteProfile } = useWinf();

  useEffect(() => { if (user?.role === 'Admin') fetchMembers(); }, [user]);

  if (user?.role !== 'Admin') return <div className="text-white p-8">Acesso Restrito.</div>;

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-winf-border pb-4">
             <button onClick={onBack} className="flex gap-2 text-gray-400 hover:text-white"><ChevronLeft /> Voltar</button>
             <h1 className="text-2xl text-white">GESTÃO DE <span className="font-bold text-zinc-400">MEMBROS</span></h1>
        </div>
        
        <div className="bg-winf-card border border-winf-border rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-white/5 text-xs uppercase">
                    <tr><th className="p-4">Nome</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Coins</th><th className="p-4">Ações</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {members.map(m => (
                        <tr key={m.id}>
                            <td className="p-4 font-bold text-white">{m.name}</td>
                            <td className="p-4">{m.email}</td>
                            <td className="p-4"><span className="bg-white/10 px-2 py-1 rounded text-xs">{m.role}</span></td>
                            <td className="p-4 font-mono">{m.winfCoins}</td>
                            <td className="p-4">
                                <button onClick={() => deleteProfile(m.id)} className="text-gray-500 hover:text-white"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};
export default ModuleMemberManagement;