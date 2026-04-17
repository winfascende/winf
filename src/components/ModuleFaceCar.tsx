import React, { useState, useEffect } from 'react';
import { ChevronLeft, Car, Plus, Lock, Unlock, Zap, Thermometer } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

const ModuleFaceCar: React.FC<{onBack: () => void, onGamificationAction: any}> = ({ onBack, onGamificationAction }) => {
  const { vehicles, fetchVehicles, addVehicle, updateVehicle } = useWinf();
  const [showAdd, setShowAdd] = useState(false);
  const [model, setModel] = useState('');

  useEffect(() => { fetchVehicles(); }, []);

  const handleAdd = async () => {
      await addVehicle({ model, plate: 'ABC-1234', status: 'Parked', battery_level: 90 });
      setShowAdd(false); setModel('');
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-winf-border pb-4">
             <button onClick={onBack} className="flex gap-2 text-gray-400 hover:text-white"><ChevronLeft /> Voltar</button>
             <h1 className="text-2xl text-white">FACE<span className="font-bold text-red-500">CAR</span></h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(v => (
                <div key={v.id} className="bg-winf-card border border-winf-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-16 bg-red-500/10 rounded-full blur-xl"></div>
                    <Car size={32} className="text-white mb-4" />
                    <h3 className="text-xl font-bold text-white">{v.model}</h3>
                    <p className="text-xs text-gray-500 mb-6">{v.plate} • {v.status}</p>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => updateVehicle(v.id, { status: 'Locked' })} className="p-2 bg-white/5 rounded flex justify-center text-gray-400 hover:text-white"><Lock size={16} /></button>
                        <button onClick={() => updateVehicle(v.id, { status: 'Unlocked' })} className="p-2 bg-white/5 rounded flex justify-center text-gray-400 hover:text-white"><Unlock size={16} /></button>
                        <button onClick={() => updateVehicle(v.id, { status: 'Running' })} className="p-2 bg-white/5 rounded flex justify-center text-gray-400 hover:text-white"><Zap size={16} /></button>
                    </div>
                </div>
            ))}
            <button onClick={() => setShowAdd(true)} className="border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 h-[200px]">
                <Plus size={32} />
            </button>
        </div>

        {showAdd && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#111] p-6 rounded-xl w-full max-w-sm border border-winf-border">
                    <h3 className="text-white font-bold mb-4">Novo Veículo</h3>
                    <input value={model} onChange={e => setModel(e.target.value)} placeholder="Modelo" className="w-full bg-black border border-white/10 rounded p-2 text-white mb-4" />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setShowAdd(false)} className="text-gray-400 text-sm">Cancelar</button>
                        <button onClick={handleAdd} className="bg-red-600 text-white px-4 py-2 rounded text-sm font-bold">Salvar</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
export default ModuleFaceCar;