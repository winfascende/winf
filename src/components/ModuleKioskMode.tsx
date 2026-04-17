
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Thermometer, 
  Smartphone, 
  ChevronRight, 
  ChevronLeft, 
  QrCode, 
  CheckCircle, 
  Calendar,
  Car,
  CreditCard,
  X,
  Play,
  Maximize2,
  Building2,
  Lock,
  ArrowRight,
  // Fix: Added missing RefreshCw import
  RefreshCw
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

interface ModuleKioskModeProps {
  onExit: () => void;
}

type KioskState = 'IDLE' | 'MENU' | 'PRODUCT_SELECT' | 'DETAILS' | 'CART' | 'CHECKOUT' | 'SUCCESS';

// Lista atualizada com a nova Linha Arquitetura Oficial
const PRODUCTS = [
    // --- AUTOMOTIVO ---
    {
        id: 'aerocore-film',
        name: 'AeroCore™ Nano-Ceramic',
        category: 'Proteção Solar Automotiva',
        price: 890,
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop',
        benefits: ['Rejeição de Calor 99%', 'Visibilidade Noturna HD', 'Garantia Vitalícia'],
        description: 'A tecnologia mais avançada do mundo para controle térmico automotivo. Sinta a diferença imediata no conforto do seu veículo.'
    },
    {
        id: 'neoskin-ppf',
        name: 'NeoSkin™ PPF Protection',
        category: 'Proteção de Pintura',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1618557219623-64a2747bb7eb?q=80&w=2070&auto=format&fit=crop',
        benefits: ['Auto-Cura de Riscos', 'Brilho Intenso', 'Proteção contra Pedras'],
        description: 'Uma armadura invisível para seu veículo. A tecnologia de polímero com memória regenera riscos com o calor do sol.'
    },
    // --- ARQUITETURA (NOVOS) ---
    {
        id: 'invisible-arch',
        name: 'Winf Invisible®',
        category: 'Arquitetura',
        price: 450,
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2668&auto=format&fit=crop',
        benefits: ['Redução UV 100%', 'Bloqueio IR 86%', 'Garantia: 10 Anos'],
        description: 'IR Advanced Ceramic. A proteção definitiva para quem não abre mão da luz natural. Totalmente transparente, bloqueio térmico extremo.'
    },
    {
        id: 'dualreflect-arch',
        name: 'Winf Dual Reflect®',
        category: 'Arquitetura',
        price: 380,
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        benefits: ['Redução UV 99%', 'Bloqueio IR 81%', 'Garantia: 7 Anos'],
        description: 'Arquitetura Metalizada. O equilíbrio perfeito entre privacidade externa e visibilidade interna noturna. Eficiência térmica superior.'
    },
    {
        id: 'blackpro-arch',
        name: 'Winf BlackPro®',
        category: 'Arquitetura',
        price: 290,
        image: 'https://images.unsplash.com/photo-1502672260273-b3db776b971a?q=80&w=2070&auto=format&fit=crop',
        benefits: ['Redução UV 99%', 'Bloqueio IR 73%', 'Garantia: 7 Anos'],
        description: 'Arquitetura Não Metalizada (Fumê). Privacidade total com sofisticação urbana. Reduz o brilho excessivo e protege seus móveis.'
    },
    // --- GADGETS ---
    {
        id: 'screen-shield',
        name: 'Winf Gadget Shield',
        category: 'Acessórios',
        price: 150,
        image: 'https://images.unsplash.com/photo-1592899677712-a5a254503481?q=80&w=2070&auto=format&fit=crop',
        description: 'Proteção nanocerâmica para telas de iPhone e Android. Resistência contra impactos e riscos.',
        benefits: ['Toque Suave', 'Anti-Digitais', 'Instalação na Hora']
    }
];

const ModuleKioskMode: React.FC<ModuleKioskModeProps> = ({ onExit }) => {
    const { addOrder } = useWinf();
    const [state, setState] = useState<KioskState>('IDLE');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [secretTapCount, setSecretTapCount] = useState(0); 
    const [scheduleDate, setScheduleDate] = useState('');

    // Reset to idle if inactive for 2 minutes
    useEffect(() => {
        const timer = setTimeout(() => {
            if (state !== 'IDLE') setState('IDLE');
        }, 120000);
        return () => clearTimeout(timer);
    }, [state]);

    const handleSecretTap = () => {
        setSecretTapCount(prev => {
            const newVal = prev + 1;
            if (newVal >= 5) {
                const pass = prompt("ADMIN KEYPAD (Donos Apenas):");
                if (pass === "winf2025") onExit();
                return 0;
            }
            return newVal;
        });
    };

    const handleCheckout = () => {
        // Mock order creation
        setState('SUCCESS');
        setTimeout(() => setState('IDLE'), 10000);
    };

    // --- IDLE SCREEN (ATTRACT MODE) ---
    if (state === 'IDLE') {
        return (
            <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center cursor-pointer" onClick={() => setState('MENU')}>
                {/* Background Video Simulator */}
                <div className="absolute inset-0 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop" 
                        className="w-full h-full object-cover opacity-40 animate-[pulse_8s_ease-in-out_infinite] scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
                </div>
                
                <div className="relative z-10 text-center animate-fade-in space-y-12 max-w-4xl px-10">
                    <div className="w-40 h-40 mx-auto bg-zinc-800/5 border border-zinc-700/40 rounded-full flex items-center justify-center backdrop-blur-sm relative">
                        <Zap size={80} className="text-zinc-400 drop-shadow-[0_0_20px_rgba(37,99,235,0.8)]" fill="currentColor" />
                        <div className="absolute inset-0 rounded-full border border-zinc-700/20 animate-ping"></div>
                    </div>
                    
                    <div className="space-y-4">
                        <h1 className="text-7xl md:text-9xl font-heading font-black text-white tracking-tighter leading-none mb-4 uppercase">
                            WINF <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-winf-aerocore_blue via-white to-zinc-950">GROUP.</span>
                        </h1>
                        <div className="h-1 w-24 bg-zinc-800 mx-auto rounded-full mb-8"></div>
                        <p className="text-2xl text-gray-400 font-light tracking-[0.4em] uppercase">Touch to Experience Supremacy</p>
                    </div>

                    <div className="flex justify-center gap-10 opacity-50 grayscale">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Porsche_logo.svg" className="h-8 invert" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Ferrari_logo.svg" className="h-8 invert" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Mercedes-Benz_logo.svg" className="h-8 invert" />
                    </div>
                </div>

                {/* Secret Admin Trigger (Top Left Corner) */}
                <div className="absolute top-0 left-0 w-32 h-32 z-50" onClick={(e) => { e.stopPropagation(); handleSecretTap(); }}></div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col font-sans text-white overflow-hidden selection:bg-none">
            
            {/* Kiosk Header */}
            <div className="h-24 border-b border-white/10 flex items-center justify-between px-10 bg-[#0a0a0a]">
                <div className="flex items-center gap-4" onClick={() => setState('MENU')}>
                    {/* Secret Tap Area on Logo */}
                    <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center cursor-pointer active:scale-95 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.3)]" onClick={(e) => { e.stopPropagation(); handleSecretTap(); }}>
                        <span className="font-black text-2xl">W</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-widest">WINF RETAIL</h2>
                        <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">Nucleus v5.0 // Sync Ready</p>
                    </div>
                </div>
                {state !== 'MENU' && state !== 'SUCCESS' && (
                    <button onClick={() => setState('MENU')} className="flex items-center gap-2 text-gray-500 hover:text-white uppercase font-black tracking-widest text-xs border border-white/10 px-6 py-2.5 rounded-full transition-all">
                        <X size={16} /> Abort Operation
                    </button>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">
                
                {/* --- MENU CATEGORIAS --- */}
                {state === 'MENU' && (
                    <div className="h-full p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
                        <div 
                            onClick={() => { setSelectedCategory('Proteção Solar Automotiva'); setState('PRODUCT_SELECT'); }}
                            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-10 flex flex-col justify-end relative group cursor-pointer hover:border-zinc-700 transition-all duration-500"
                        >
                            <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            <div className="relative z-10">
                                <Car size={48} className="text-zinc-400 mb-4" />
                                <h3 className="text-3xl font-bold uppercase mb-2">Automotivo</h3>
                                <p className="text-gray-400 text-sm">Películas Térmicas AeroCore™</p>
                            </div>
                        </div>

                        <div 
                            onClick={() => { setSelectedCategory('Arquitetura'); setState('PRODUCT_SELECT'); }}
                            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-10 flex flex-col justify-end relative group cursor-pointer hover:border-winf-ascend_green transition-all duration-500"
                        >
                            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            <div className="relative z-10">
                                <Building2 size={48} className="text-winf-ascend_green mb-4" />
                                <h3 className="text-3xl font-bold uppercase mb-2">Arquitetura</h3>
                                <p className="text-gray-400 text-sm">Invisible, Dual Reflect & BlackPro</p>
                            </div>
                        </div>

                        <div 
                            onClick={() => { setSelectedCategory('Proteção de Pintura'); setState('PRODUCT_SELECT'); }}
                            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-10 flex flex-col justify-end relative group cursor-pointer hover:border-zinc-700 transition-all duration-500"
                        >
                            <img src="https://images.unsplash.com/photo-1618557219623-64a2747bb7eb?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            <div className="relative z-10">
                                <ShieldCheck size={48} className="text-zinc-400 mb-4" />
                                <h3 className="text-3xl font-bold uppercase mb-2">PPF Protection</h3>
                                <p className="text-gray-400 text-sm">NeoSkin™ Shield</p>
                            </div>
                        </div>

                        <div 
                            onClick={() => { setSelectedCategory('Acessórios'); setState('PRODUCT_SELECT'); }}
                            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-10 flex flex-col justify-end relative group cursor-pointer hover:border-green-500 transition-all duration-500"
                        >
                            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            <div className="relative z-10">
                                <Smartphone size={48} className="text-green-500 mb-4" />
                                <h3 className="text-3xl font-bold uppercase mb-2">Gadgets</h3>
                                <p className="text-gray-400 text-sm">Proteção Mobile & Acessórios</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- SELEÇÃO DE PRODUTOS --- */}
                {state === 'PRODUCT_SELECT' && (
                    <div className="h-full p-10 flex flex-col animate-fade-in">
                        <div className="flex items-center gap-6 mb-12">
                             <button onClick={() => setState('MENU')} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all"><ChevronLeft size={24}/></button>
                             <h2 className="text-4xl font-heading font-light text-white uppercase tracking-tight">
                                CATEGORIA: <span className="font-bold text-zinc-400">{selectedCategory}</span>
                             </h2>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 px-4">
                            {PRODUCTS.filter(p => p.category === selectedCategory).map(product => (
                                <div key={product.id} className="bg-[#0A0A0A] border border-white/[0.05] rounded-[2rem] overflow-hidden group hover:border-zinc-700/40 transition-all duration-500">
                                    <div className="h-72 overflow-hidden relative">
                                        <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 text-white font-black px-4 py-1.5 text-[9px] uppercase tracking-widest rounded-full">
                                            W-ELITE ATSET
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">{product.name}</h3>
                                        <p className="text-gray-500 text-sm mb-8 leading-relaxed font-light line-clamp-2">{product.description}</p>
                                        
                                        <div className="flex justify-between items-center border-t border-white/[0.03] pt-6">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Valor Unitário</span>
                                                <span className="text-2xl font-mono text-zinc-400 font-bold">R$ {product.price}</span>
                                            </div>
                                            <button 
                                                onClick={() => { setSelectedProduct(product); setState('DETAILS'); }}
                                                className="bg-white text-black px-8 py-3.5 rounded-sm font-black uppercase tracking-widest hover:bg-zinc-800 hover:text-white transition-all text-[10px] shadow-lg"
                                            >
                                                Ver Detalhes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- DETALHES & AGENDAMENTO --- */}
                {state === 'DETAILS' && selectedProduct && (
                    <div className="h-full flex flex-col lg:flex-row animate-slide-up bg-[#050505]">
                        <div className="lg:w-1/2 h-64 lg:h-full relative overflow-hidden">
                            <img src={selectedProduct.image} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-16 left-16 max-w-lg">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4 block">Product Dossier</span>
                                <h2 className="text-6xl font-heading font-bold text-white mb-4 tracking-tighter leading-none">{selectedProduct.name}</h2>
                                <p className="text-2xl text-gray-400 font-mono">R$ {selectedProduct.price},00</p>
                            </div>
                        </div>
                        
                        <div className="lg:w-1/2 p-16 lg:p-24 flex flex-col justify-center bg-[#080808] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-40 bg-zinc-800/5 rounded-full blur-[100px] pointer-events-none"></div>
                            
                            <div className="space-y-12 mb-16 relative z-10">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Benefícios Técnicos</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {selectedProduct.benefits.map((benefit: string, i: number) => (
                                            <div key={i} className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl">
                                                <CheckCircle size={20} className="text-zinc-400" />
                                                <span className="text-lg font-light text-gray-200">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-400 leading-relaxed text-lg font-light italic border-l-4 border-zinc-700 pl-8">
                                    {selectedProduct.description}
                                </p>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6">Disponibilidade de Instalação</label>
                                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                        {['Hoje', 'Amanhã', 'Sexta', 'Sábado', 'Segunda'].map(day => (
                                            <button 
                                                key={day} 
                                                onClick={() => setScheduleDate(day)}
                                                className={`px-8 py-5 rounded-2xl border font-bold text-lg min-w-[140px] transition-all flex flex-col items-center gap-1 ${scheduleDate === day ? 'bg-zinc-800 border-zinc-700 text-white shadow-lg' : 'bg-black/40 border-white/10 text-gray-500 hover:border-white/30'}`}
                                            >
                                                <span className="text-xs uppercase tracking-widest opacity-60">Dia</span>
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setState('CHECKOUT')}
                                    className="w-full py-7 bg-white text-black text-xs font-black uppercase tracking-[0.4em] rounded-sm hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(255,255,255,0.1)] group"
                                >
                                    Confirmar Escolha <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- CHECKOUT (PAGAMENTO) --- */}
                {state === 'CHECKOUT' && (
                    <div className="h-full flex items-center justify-center p-10 animate-fade-in relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        
                        <div className="bg-[#0A0A0A] border border-white/[0.05] p-16 rounded-[3rem] max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 shadow-2xl relative z-10">
                            <div className="space-y-12">
                                <h3 className="text-gray-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6">Faturamento de Pedido</h3>
                                <div className="flex gap-8 mb-8 pb-12 border-b border-white/[0.05]">
                                    <div className="w-32 h-32 rounded-3xl overflow-hidden border border-white/10 shrink-0">
                                        <img src={selectedProduct.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="text-3xl font-bold text-white uppercase tracking-tight mb-2">{selectedProduct.name}</h4>
                                        <p className="text-sm text-zinc-400 font-bold uppercase tracking-widest mb-4">Agendado: {scheduleDate || 'Imediato'}</p>
                                        <p className="text-4xl font-mono text-white font-bold">R$ {selectedProduct.price},00</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-between text-xl font-light text-gray-400">
                                        <span>Subtotal Operacional</span>
                                        <span className="font-mono">R$ {selectedProduct.price},00</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-light text-zinc-400">
                                        <span>Incentivo Kiosk Exclusive</span>
                                        <span className="font-mono">- R$ 50,00</span>
                                    </div>
                                    <div className="flex justify-between text-4xl font-bold pt-8 border-t border-white/10">
                                        <span className="uppercase tracking-tighter">Total</span>
                                        <span className="text-zinc-400 font-mono tracking-tighter">R$ {selectedProduct.price - 50},00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center text-center bg-[#050505] p-12 rounded-[2.5rem] border border-white/[0.03] shadow-inner">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-10">Sincronização Financeira (PIX)</p>
                                <div className="bg-white p-6 rounded-[2rem] mb-10 shadow-[0_0_60px_rgba(255,255,255,0.1)] relative">
                                    <QrCode size={240} className="text-black" />
                                    <div className="absolute inset-0 border-[10px] border-black rounded-[2rem] pointer-events-none"></div>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-400 animate-pulse mb-10">
                                    <RefreshCw size={16} className="animate-spin" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Aguardando Gateway de Pagamento...</span>
                                </div>
                                
                                <button 
                                    onClick={handleCheckout}
                                    className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] rounded-sm hover:bg-zinc-800 hover:text-white transition-all shadow-xl text-xs"
                                >
                                    Confirmar Liquidação
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- SUCESSO --- */}
                {state === 'SUCCESS' && (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-scale-up p-10 bg-[#050505] relative overflow-hidden">
                        <div className="absolute inset-0 bg-green-500/5 blur-[150px] rounded-full pointer-events-none"></div>
                        <div className="w-40 h-40 bg-green-500 rounded-full flex items-center justify-center mb-12 shadow-[0_0_100px_rgba(34,197,94,0.4)] relative z-10">
                            <CheckCircle size={80} className="text-black" />
                        </div>
                        <h2 className="text-6xl md:text-8xl font-heading font-black text-white mb-6 tracking-tighter uppercase relative z-10">TRANSACÇÃO<br/><span className="text-green-500">CONCLUÍDA.</span></h2>
                        <p className="text-2xl text-gray-400 max-w-2xl leading-relaxed mb-16 font-light relative z-10">
                            Seu agendamento foi injetado com sucesso no ecossistema **Winf**. O comprovante digital e as instruções de acesso foram enviados para o seu terminal.
                        </p>
                        <div className="flex items-center gap-4 text-[10px] text-gray-600 font-black uppercase tracking-[0.5em] animate-pulse relative z-10">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Resetando Terminal em 10 segundos...
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ModuleKioskMode;
