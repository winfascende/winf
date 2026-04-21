
import React, { useState } from 'react';
import { 
  Link, 
  Copy, 
  ExternalLink, 
  QrCode, 
  Smartphone, 
  Share2, 
  CheckCircle, 
  Zap,
  ChevronLeft,
  User,
  Phone,
  Globe,
  Monitor,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ViewState } from '../types';

interface ModuleConsultancyLinkProps {
  onBack: () => void;
  onOpenConsultancy: (territory: string) => void;
  user: any;
}

const ModuleConsultancyLink: React.FC<ModuleConsultancyLinkProps> = ({ onBack, onOpenConsultancy, user }) => {
  const [copied, setCopied] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState('Santos (Sede)');
  
  const territories = [
    { name: 'Santos (Sede)', slug: 'santos', phone: '5513999191510' },
    { name: 'Praia Grande', slug: 'praia-grande', phone: '5513999191510' },
    { name: 'Sorocaba', slug: 'sorocaba', phone: '5513999191510' },
    { name: 'Campina Grande', slug: 'campina-grande', phone: '5513999191510' }
  ];

  const currentTerritory = territories.find(t => t.name === selectedTerritory) || territories[0];

  // Simulated consultancy URL with territory slug
  const consultancyUrl = `https://winf.tech/${currentTerritory.slug}/${user?.id || 'oficial'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(consultancyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-winf-background p-6 md:p-10 animate-fade-in pb-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-6 mb-12">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">Link de Atendimento</h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Advanced Regional Engine</p>
          </div>
        </div>

        {/* Territory Selector for Advanced Plan */}
        <div className="mb-12 bg-[#0A0A0A] border border-white/5 rounded-[30px] p-8">
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={18} className="text-winf-primary" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Selecione a Unidade de Destino</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {territories.map((t) => (
              <button
                key={t.slug}
                onClick={() => setSelectedTerritory(t.name)}
                className={`py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${selectedTerritory === t.name ? 'bg-white text-black border-white' : 'bg-white/5 text-zinc-500 border-white/5 hover:border-white/10'}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Link Generation Card */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 p-20 bg-winf-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
             
             <div className="relative z-10">
               <div className="w-12 h-12 bg-winf-primary/10 rounded-2xl flex items-center justify-center text-winf-primary mb-8">
                 <Link size={24} />
               </div>
               <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Seu Link Exclusivo</h2>
               <p className="text-white/40 text-sm font-light leading-relaxed mb-10">
                 Envie este link para o seu cliente para que ele possa visualizar o simulador e os produtos com a sua marca.
               </p>

               <div className="flex items-center gap-2 p-4 bg-black border border-white/10 rounded-2xl mb-8">
                 <Globe size={16} className="text-white/20" />
                 <span className="flex-1 text-xs font-mono text-white/60 truncate">{consultancyUrl}</span>
                 <button 
                   onClick={handleCopy}
                   className="p-2 hover:bg-white/10 rounded-lg transition-all text-winf-primary"
                 >
                   {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                 </button>
               </div>
             </div>

             <div className="flex flex-col gap-4 relative z-10">
               <button 
                 onClick={() => onOpenConsultancy(selectedTerritory)}
                 className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-sm hover:bg-winf-primary hover:text-white transition-all flex items-center justify-center gap-3"
               >
                 Abrir Modo Apresentação <Monitor size={16} />
               </button>
               <p className="text-[8px] text-center text-white/20 font-bold uppercase tracking-[0.3em]">
                 Ideal para tablets e notebooks durante o atendimento presencial.
               </p>
             </div>
          </div>

          {/* QR Code Card */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 p-20 bg-winf-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
             
             <div className="relative z-10 mb-10">
               <div className="bg-white p-6 rounded-[32px] shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                 <QrCode size={180} className="text-black" />
               </div>
             </div>

             <div className="relative z-10">
               <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Acesso via QR Code</h3>
               <p className="text-white/40 text-xs font-light leading-relaxed mb-8 max-w-[200px] mx-auto">
                 Peça para o cliente escanear para abrir a consultoria direto no celular dele.
               </p>
               <button className="flex items-center gap-2 text-winf-primary text-[9px] font-black uppercase tracking-[0.3em] hover:opacity-80 transition-all">
                 <Share2 size={14} /> Compartilhar QR Code
               </button>
             </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 p-10 bg-white/[0.02] border border-white/5 rounded-[40px]">
          <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-8">Como utilizar esta ferramenta</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-white/40 font-black text-xs">01</div>
              <h4 className="text-sm font-bold uppercase tracking-widest">Atendimento Presencial</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed">Use o botão "Abrir Modo Apresentação" em um tablet para demonstrar o simulador ao vivo para o cliente.</p>
            </div>
            <div className="space-y-4">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-white/40 font-black text-xs">02</div>
              <h4 className="text-sm font-bold uppercase tracking-widest">Envio via WhatsApp</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed">Copie o link e envie para clientes que estão em fase de orçamento. Ele verá a consultoria com seus dados de contato.</p>
            </div>
            <div className="space-y-4">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-white/40 font-black text-xs">03</div>
              <h4 className="text-sm font-bold uppercase tracking-widest">Conversão de Leads</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed">O link é otimizado para conversão, com botões diretos para o seu WhatsApp de atendimento.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleConsultancyLink;
