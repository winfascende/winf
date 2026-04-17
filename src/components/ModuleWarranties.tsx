import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Search, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  FileText,
  ExternalLink,
  User,
  Mail
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { WarrantyRegistration } from '../types';

const ModuleWarranties: React.FC = () => {
  const { warranties } = useWinf();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWarranties = warranties.filter(w => 
    w.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'expired': return 'text-red-400 bg-red-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-8 h-8 text-white" />
            WINF WARRANTY SYSTEM™
          </h1>
          <p className="text-gray-400">Gestão de Garantias e Certificados Digitais</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar por cliente, e-mail ou número de série..."
          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/30 transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredWarranties.length > 0 ? (
          filteredWarranties.map((warranty) => (
            <motion.div
              key={warranty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{warranty.customerName}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {warranty.customerEmail}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(warranty.status)}`}>
                      {warranty.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">Produto</p>
                      <p className="text-sm text-white font-medium">{warranty.productLine}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">Série / Instalação</p>
                      <p className="text-sm text-white font-mono">{warranty.serialNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">Data de Instalação</p>
                      <p className="text-sm text-white">{new Date(warranty.purchaseDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">Expiração</p>
                      <p className="text-sm text-white flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        {/* Assuming 10 years for demo if not specified */}
                        {new Date(new Date(warranty.purchaseDate).setFullYear(new Date(warranty.purchaseDate).getFullYear() + 10)).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col justify-end gap-2 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                    <FileText className="w-4 h-4" />
                    Ver Certificado
                  </button>
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Página Pública
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-black/20 border border-dashed border-white/10 rounded-3xl">
            <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma garantia encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleWarranties;
