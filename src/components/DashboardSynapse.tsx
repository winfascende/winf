import React, { useEffect } from 'react';
import { Network, Users, ShoppingBag, Globe, Activity } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

const DashboardSynapse: React.FC = () => {
  const { totalLeads, totalMembers, totalOrders, recentActivities, fetchTotalLeads, fetchTotalMembers, fetchTotalOrders, fetchRecentActivities } = useWinf();

  useEffect(() => { fetchTotalLeads(); fetchTotalMembers(); fetchTotalOrders(); fetchRecentActivities(); }, []);

  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-light text-white">Winf <span className="font-bold">Synapse</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-winf-card border border-winf-border p-6 rounded-xl text-center">
                <Users size={32} className="text-zinc-400 mx-auto mb-2" />
                <h3 className="text-3xl font-bold text-white">{totalMembers}</h3>
                <p className="text-xs text-gray-500 uppercase">Membros</p>
            </div>
            <div className="bg-winf-card border border-winf-border p-6 rounded-xl text-center">
                <Globe size={32} className="text-green-400 mx-auto mb-2" />
                <h3 className="text-3xl font-bold text-white">{totalLeads}</h3>
                <p className="text-xs text-gray-500 uppercase">Leads Globais</p>
            </div>
            <div className="bg-winf-card border border-winf-border p-6 rounded-xl text-center">
                <ShoppingBag size={32} className="text-zinc-400 mx-auto mb-2" />
                <h3 className="text-3xl font-bold text-white">{totalOrders}</h3>
                <p className="text-xs text-gray-500 uppercase">Pedidos</p>
            </div>
        </div>

        <div className="bg-winf-card border border-winf-border rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 flex gap-2 items-center"><Activity size={18}/> Feed de Atividade Real</h3>
            <div className="space-y-4">
                {recentActivities.map(act => (
                    <div key={act.id} className="border-l-2 border-zinc-700 pl-4 py-1">
                        <p className="text-sm text-white">{act.description}</p>
                        <p className="text-xs text-gray-500">{new Date(act.created_at).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
export default DashboardSynapse;