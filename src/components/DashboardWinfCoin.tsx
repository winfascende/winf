import React, { useEffect } from 'react';
import { Coins, TrendingUp, ShoppingCart } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

const DashboardWinfCoin: React.FC<{user: any, onRedeem: any}> = ({ user, onRedeem }) => {
  const { coinLedger, fetchCoinLedger } = useWinf();
  useEffect(() => { fetchCoinLedger(); }, []);

  return (
    <div className="space-y-8">
        <div className="text-center mb-8">
             <h2 className="text-4xl text-white">WINF<span className="font-bold text-zinc-400">COIN</span>™</h2>
             <p className="text-gray-400 text-sm">Saldo: {user.winfCoins} WC</p>
        </div>
        
        <div className="bg-winf-card border border-winf-border rounded-xl p-8">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-winf-border pb-4">Extrato de Transações</h3>
            <div className="space-y-4">
                {coinLedger.map(entry => (
                    <div key={entry.id} className="flex justify-between items-center p-3 bg-white/5 rounded">
                        <div>
                            <p className="text-white font-medium break-words max-w-[70%]">{entry.description}</p>
                            <p className="text-xs text-gray-500">{new Date(entry.created_at).toLocaleString()}</p>
                        </div>
                        <span className={`font-bold ${entry.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {entry.amount > 0 ? '+' : ''}{entry.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
export default DashboardWinfCoin;