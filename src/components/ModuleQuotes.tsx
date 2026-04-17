
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  FileSpreadsheet, 
  User, 
  Car, 
  Plus, 
  Trash2, 
  Printer, 
  Share2, 
  Bot, 
  Check, 
  DollarSign,
  Building2,
  Scissors,
  X,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { QuoteItem, ViewState } from '../types';
import { Skeleton } from './ui/LoadingSkeleton';
import QRCode from 'qrcode';
import { PDFDownloadLink } from '@react-pdf/renderer';
import QuotePDF from './QuotePDF';

const ModuleQuotes: React.FC<{onBack: () => void}> = ({ onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [projectType, setProjectType] = useState<'Automotive' | 'Architecture'>('Automotive');
  const [measurements, setMeasurements] = useState('');
  const [sqMeters, setSqMeters] = useState<number>(0);
  const [pixDiscount, setPixDiscount] = useState<number>(0);
  const [installments, setInstallments] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>('PIX');
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (selectedQuote) {
        QRCode.toDataURL(`https://winf-os.app/verify/${selectedQuote.id || 'new'}`)
            .then(url => setQrCodeUrl(url))
            .catch(err => console.error(err));
    }
  }, [selectedQuote]);

  const FILM_PRICES = {
    'Standard': 160,
    'BlackPro': 140,
    'Nano Cerâmica Invisible': 280,
    'Shield': 350,
    'White': 160
  };

  const { products, addQuote, fetchQuotes, quotes, fetchProducts, onChangeView, approveQuote, isLoading } = useWinf();

  useEffect(() => { fetchProducts(); }, []);

  const handleApplyMetragem = () => {
    if (sqMeters <= 0) return;
    
    const newItems: QuoteItem[] = Object.entries(FILM_PRICES).map(([name, price]) => ({
      description: `Película ${name} (${sqMeters}m²)`,
      quantity: sqMeters,
      unitPrice: price
    }));
    
    setItems(newItems);
  };

  const handleAddItem = (productId: string) => {
      const product = products.find(p => p.id === productId);
      if (product) {
          setItems([...items, { productId: product.id, description: product.name, quantity: 1, unitPrice: product.price }]);
      }
  };

  const handleAddCustomItem = () => {
      setItems([...items, { description: 'Serviço Personalizado', quantity: 1, unitPrice: 0 }]);
  };

  const updateItem = (index: number, field: keyof QuoteItem, value: any) => {
      const newItems = [...items];
      (newItems[index] as any)[field] = value;
      setItems(newItems);
  };

  const removeItem = (index: number) => {
      setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const totalWithDiscount = subtotal - pixDiscount;
  const installmentValue = totalWithDiscount / installments;
  
  const handleSaveQuote = async () => {
      if(!customerName || items.length === 0) return;
      setIsGenerating(true);
      const quoteData = {
          customerName,
          customerWhatsApp,
          customerAddress,
          customerCity,
          vehicleModel,
          items,
          totalAmount: totalWithDiscount,
          status: 'Pending',
          projectType,
          measurements,
          pixDiscount,
          paymentMethod,
          installments,
          installmentValue
      };
      await addQuote(quoteData);
      setIsGenerating(false);
      setSelectedQuote({ ...quoteData, createdAt: new Date().toISOString() });
      setShowPdfPreview(true);
      setCustomerName(''); setCustomerWhatsApp(''); setCustomerAddress(''); setCustomerCity(''); setVehicleModel(''); setItems([]); setMeasurements(''); setSqMeters(0); setPixDiscount(0); setInstallments(1);
  };

  const handleApprove = async (id: string) => {
      const ok = confirm("Deseja aprovar este orçamento e gerar o Pedido/OS?");
      if (ok) {
          await approveQuote(id);
          alert("Orçamento aprovado! Pedido e Ordem de Serviço gerados com sucesso.");
      }
  };

  // AI Suggestion based on project type and vehicle model
  const handleAiSuggest = () => {
      if (projectType === 'Automotive' && !vehicleModel) {
          return alert("Para sugestões automotivas, digite o modelo do veículo primeiro.");
      }
      if (projectType === 'Architecture' && !customerName) {
          return alert("Para sugestões arquitetônicas, digite o nome do cliente ou projeto.");
      }

      // Simulate AI suggestions based on project type
      if (projectType === 'Automotive') {
          setItems([
              ...items,
              { description: `Proteção AeroCore™ Nano-Ceramic (${vehicleModel || 'Veículo'})`, quantity: 1, unitPrice: 890 },
              { description: `Proteção NeoSkin™ PPF Frontal (${vehicleModel || 'Veículo'})`, quantity: 1, unitPrice: 3500 },
          ]);
      } else { // Architecture - Focused on Select, Security, White
          setItems([
              ...items,
              { description: 'Winf Select® IR-99 (Alta Performance)', quantity: 1, unitPrice: 550 },
              { description: 'Winf Security® (Anti-Intrusão)', quantity: 1, unitPrice: 420 },
              { description: 'Winf White® (Privacidade Total)', quantity: 1, unitPrice: 350 },
              { description: 'Consultoria de Eficiência Energética', quantity: 1, unitPrice: 200 },
          ]);
      }
  };

  // Filter products based on selected project type
  const filteredProducts = products.filter(p => 
      (projectType === 'Automotive' && (p.category === 'Mobile' || p.category === 'Automotivo' || p.name.includes('AeroCore') || p.name.includes('NeoSkin'))) ||
      (projectType === 'Architecture' && (p.category === 'Arquitetura' || p.name.includes('Select') || p.name.includes('Security') || p.name.includes('White') || p.name.includes('Invisible') || p.name.includes('Dual Reflect') || p.name.includes('BlackPro')))
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-winf-border pb-6">
            <div>
                <button onClick={onBack} className="flex items-center gap-2 text-winf-text_muted hover:text-winf-text_primary mb-2 transition-colors text-xs font-mono uppercase tracking-widest">
                    <ChevronLeft size={14} /> Voltar
                </button>
                <h1 className="text-3xl font-light text-winf-text_primary tracking-tight">NEUROMESH <span className="font-bold text-winf-text_muted">ESTIMATOR</span></h1>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setActiveTab('new')} className={`px-4 py-2 rounded text-xs font-bold uppercase transition-colors ${activeTab === 'new' ? 'bg-winf-primary/10 text-winf-primary' : 'text-winf-text_muted hover:text-winf-text_primary'}`}>Novo Orçamento</button>
                <button onClick={() => setActiveTab('history')} className={`px-4 py-2 rounded text-xs font-bold uppercase transition-colors ${activeTab === 'history' ? 'bg-winf-primary/10 text-winf-primary' : 'text-winf-text_muted hover:text-winf-text_primary'}`}>Histórico</button>
            </div>
        </div>

        {activeTab === 'new' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Project Type Selector */}
                    <div className="bg-winf-surface border border-winf-border rounded-xl p-6">
                        <h3 className="text-winf-text_primary font-bold mb-4 flex items-center gap-2">Tipo de Projeto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button 
                                onClick={() => setProjectType('Automotive')}
                                className={`flex items-center justify-center gap-3 py-4 rounded-lg border transition-all ${projectType === 'Automotive' ? 'bg-winf-primary/10 border-winf-primary/30 text-winf-text_primary' : 'bg-winf-background/40 border-winf-border text-winf-text_muted hover:border-winf-text_secondary'}`}
                            >
                                <Car size={20} /> Automotivo
                            </button>
                            <button 
                                onClick={() => setProjectType('Architecture')}
                                className={`flex items-center justify-center gap-3 py-4 rounded-lg border transition-all ${projectType === 'Architecture' ? 'bg-winf-primary/10 border-winf-primary/30 text-winf-text_primary' : 'bg-winf-background/40 border-winf-border text-winf-text_muted hover:border-winf-text_secondary'}`}
                            >
                                <Building2 size={20} /> Arquitetura
                            </button>
                        </div>
                    </div>

                    {/* Client Info */}
                    <div className="bg-winf-surface border border-winf-border rounded-xl p-6">
                        <h3 className="text-winf-text_primary font-bold mb-4 flex items-center gap-2"><User size={18}/> Dados do Cliente</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                placeholder="Nome do Cliente / Projeto" 
                                value={customerName} 
                                onChange={e => setCustomerName(e.target.value)} 
                                className="bg-winf-background border border-winf-border rounded p-3 text-winf-text_primary outline-none focus:border-winf-primary/50" 
                            />
                            <input 
                                placeholder="WhatsApp (ex: 11999998888)" 
                                value={customerWhatsApp} 
                                onChange={e => setCustomerWhatsApp(e.target.value)} 
                                className="bg-winf-background border border-winf-border rounded p-3 text-winf-text_primary outline-none focus:border-winf-primary/50" 
                            />
                            <input 
                                placeholder="Endereço" 
                                value={customerAddress} 
                                onChange={e => setCustomerAddress(e.target.value)} 
                                className="bg-winf-background border border-winf-border rounded p-3 text-winf-text_primary outline-none focus:border-winf-primary/50" 
                            />
                            <input 
                                placeholder="Cidade" 
                                value={customerCity} 
                                onChange={e => setCustomerCity(e.target.value)} 
                                className="bg-winf-background border border-winf-border rounded p-3 text-winf-text_primary outline-none focus:border-winf-primary/50" 
                            />
                            {projectType === 'Automotive' && (
                                <div className="relative md:col-span-2">
                                    <Car size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-winf-text_muted" />
                                    <input 
                                        placeholder="Modelo do Veículo (ex: Porsche 911)" 
                                        value={vehicleModel} 
                                        onChange={e => setVehicleModel(e.target.value)} 
                                        className="w-full bg-winf-background border border-winf-border rounded p-3 pl-10 text-winf-text_primary outline-none focus:border-winf-primary/50" 
                                    />
                                </div>
                            )}
                            {projectType === 'Architecture' && (
                                <div className="md:col-span-2 space-y-4">
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-bold text-winf-text_muted uppercase tracking-widest mb-1 block">Metragem Total (m²)</label>
                                            <input 
                                                type="number"
                                                placeholder="Ex: 15" 
                                                value={sqMeters || ''} 
                                                onChange={e => setSqMeters(parseFloat(e.target.value) || 0)} 
                                                className="w-full bg-winf-background border border-winf-border rounded p-3 text-winf-text_primary outline-none focus:border-winf-primary/50" 
                                            />
                                        </div>
                                        <button 
                                            onClick={handleApplyMetragem}
                                            className="bg-winf-primary text-winf-background px-6 py-3 rounded font-bold hover:bg-winf-primary_hover transition-all text-xs uppercase tracking-widest"
                                        >
                                            Gerar Opções
                                        </button>
                                    </div>
                                    <textarea 
                                        placeholder="Detalhes Adicionais da Obra" 
                                        value={measurements} 
                                        onChange={e => setMeasurements(e.target.value)} 
                                        className="w-full bg-winf-background border border-winf-border rounded p-3 text-winf-text_primary outline-none focus:border-winf-primary/50 h-24" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-winf-surface border border-winf-border rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-winf-text_primary font-bold flex items-center gap-2"><FileSpreadsheet size={18}/> Itens & Serviços</h3>
                            <button onClick={handleAiSuggest} className="text-xs bg-winf-primary/10 text-winf-primary border border-winf-primary/20 px-3 py-1 rounded flex items-center gap-1 hover:bg-winf-primary/20 transition-colors">
                                <Bot size={12}/> Sugestão AI
                            </button>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:items-center bg-winf-background/40 p-3 sm:p-2 rounded border border-winf-border">
                                    <input 
                                        value={item.description} 
                                        onChange={e => updateItem(idx, 'description', e.target.value)} 
                                        className="flex-1 bg-transparent text-winf-text_primary text-sm outline-none" 
                                        placeholder="Descrição"
                                    />
                                    <div className="flex gap-2 items-center">
                                        <div className="flex-1 sm:w-16">
                                            <label className="sm:hidden text-[8px] font-bold text-winf-text_muted uppercase mb-1 block">Qtd</label>
                                            <input 
                                                type="number" 
                                                value={item.quantity || ''} 
                                                onChange={e => updateItem(idx, 'quantity', parseInt(e.target.value) || 0)} 
                                                className="w-full sm:w-16 bg-winf-surface text-winf-text_primary text-center text-sm rounded outline-none p-1.5 sm:p-1 border border-winf-border" 
                                            />
                                        </div>
                                        <div className="flex-1 sm:w-24">
                                            <label className="sm:hidden text-[8px] font-bold text-winf-text_muted uppercase mb-1 block">Preço</label>
                                            <input 
                                                type="number" 
                                                value={item.unitPrice || ''} 
                                                onChange={e => updateItem(idx, 'unitPrice', parseFloat(e.target.value) || 0)} 
                                                className="w-full sm:w-24 bg-winf-surface text-winf-text_primary text-right text-sm rounded outline-none p-1.5 sm:p-1 border border-winf-border" 
                                            />
                                        </div>
                                        <button onClick={() => removeItem(idx)} className="text-winf-text_muted hover:text-winf-text_primary p-2 sm:p-1 mt-4 sm:mt-0"><Trash2 size={16}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <select onChange={e => { if(e.target.value) handleAddItem(e.target.value); e.target.value = ''; }} className="bg-winf-background border border-winf-border rounded p-2 text-winf-text_primary text-sm outline-none flex-1">
                                <option value="">Adicionar Produto do Catálogo...</option>
                                {filteredProducts.map(p => <option key={p.id} value={p.id}>{p.name} - R$ {p.price}</option>)}
                            </select>
                            <button onClick={handleAddCustomItem} className="bg-winf-primary/10 text-winf-primary px-3 rounded hover:bg-winf-primary/20 border border-winf-primary/20"><Plus size={18}/></button>
                        </div>
                    </div>
                </div>

                {/* Summary & Actions */}
                <div className="space-y-6">
                    <div className="bg-winf-surface border border-winf-border rounded-xl p-6">
                        <h3 className="text-winf-text_primary font-bold mb-4">Resumo & Condições</h3>
                        <div className="space-y-4 text-sm text-winf-text_secondary border-b border-winf-border pb-4 mb-4">
                            <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></div>
                            
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-winf-text_muted uppercase tracking-widest">Forma de Pagamento</label>
                                <select 
                                    value={paymentMethod}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                    className="w-full bg-winf-background border border-winf-border rounded p-2 text-winf-text_primary outline-none"
                                >
                                    <option value="PIX">PIX (À Vista)</option>
                                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                                    <option value="Cartão de Débito">Cartão de Débito</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Boleto">Boleto Bancário</option>
                                    <option value="Transferência">Transferência / TED</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-winf-text_muted uppercase tracking-widest">Desconto PIX / Especial (R$)</label>
                                <input 
                                    type="number" 
                                    value={pixDiscount || ''} 
                                    onChange={e => setPixDiscount(parseFloat(e.target.value) || 0)}
                                    className="w-full bg-winf-background border border-winf-border rounded p-2 text-winf-text_primary outline-none text-right"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-winf-text_muted uppercase tracking-widest">Parcelas</label>
                                    <input 
                                        type="number" 
                                        value={installments || ''} 
                                        onChange={e => setInstallments(parseInt(e.target.value) || 1)}
                                        className="w-full bg-winf-background border border-winf-border rounded p-2 text-winf-text_primary outline-none text-center"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-winf-text_muted uppercase tracking-widest text-right block">Valor Parcela</label>
                                    <div className="p-2 text-right text-winf-text_primary font-bold">R$ {installmentValue.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-winf-text_primary mb-6">
                            <span>Total</span>
                            <span className="text-winf-primary">R$ {totalWithDiscount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                        </div>
                        <div className="space-y-3">
                            {projectType === 'Architecture' && items.length > 0 && (
                                <button 
                                    onClick={() => onChangeView(ViewState.MODULE_WINF_CUT)}
                                    className="w-full bg-winf-primary/10 border border-winf-primary/20 text-winf-primary py-3 rounded font-bold hover:bg-winf-primary/20 transition-colors flex justify-center items-center gap-2"
                                >
                                    <Scissors size={18}/> Calcular Corte (Winf Precision™)
                                </button>
                            )}
                            <button onClick={handleSaveQuote} disabled={isGenerating} className="w-full bg-winf-primary text-winf-background py-3 rounded font-bold hover:bg-winf-primary_hover transition-colors flex justify-center items-center gap-2 shadow-lg shadow-winf-primary/10">
                                {isGenerating ? 'Processando...' : <><Check size={18}/> Salvar Orçamento</>}
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                {selectedQuote ? (
                                    <PDFDownloadLink 
                                        document={<QuotePDF quote={selectedQuote} qrCodeUrl={qrCodeUrl} />} 
                                        fileName={`WINF_Proposta_${selectedQuote.customerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`}
                                        className="bg-winf-surface border border-winf-border text-winf-text_primary py-2 rounded text-xs font-bold hover:bg-winf-surface_hover flex justify-center items-center gap-2"
                                    >
                                        {({ loading }) => (
                                            <><Printer size={14}/> {loading ? 'Gerando...' : 'Baixar PDF'}</>
                                        )}
                                    </PDFDownloadLink>
                                ) : (
                                    <button className="bg-winf-surface border border-winf-border text-winf-text_primary py-2 rounded text-xs font-bold hover:bg-winf-surface_hover flex justify-center items-center gap-2">
                                        <Printer size={14}/> Imprimir PDF
                                    </button>
                                )}
                                <button className="bg-winf-surface border border-winf-border text-winf-text_muted py-2 rounded text-xs font-bold hover:bg-winf-surface_hover flex justify-center items-center gap-2"><Share2 size={14}/> WhatsApp</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'history' && (
            <div className="bg-winf-card border border-winf-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left text-sm text-gray-300 min-w-[800px]">
                        <thead className="bg-white/5 text-xs uppercase text-gray-500">
                            <tr><th className="p-4">Data</th><th className="p-4">Cliente</th><th className="p-4">Cidade</th><th className="p-4">Tipo</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Ações</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}>
                                        <td className="p-4" colSpan={7}>
                                            <Skeleton className="h-8 w-full" />
                                        </td>
                                    </tr>
                                ))
                            ) : quotes.length === 0 ? (
                                <tr><td colSpan={7} className="p-8 text-center text-gray-500">Nenhum orçamento gerado.</td></tr>
                            ) : (
                                quotes.map(q => (
                                    <tr key={q.id} className="hover:bg-white/5">
                                        <td className="p-4">{new Date(q.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 font-bold text-white">{q.customerName}</td>
                                        <td className="p-4">{q.customerCity || 'N/A'}</td>
                                        <td className="p-4">{q.projectType || 'N/A'}</td>
                                        <td className="p-4 text-zinc-400 font-bold">R$ {q.totalAmount.toLocaleString('pt-BR')}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${q.status === 'Approved' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'}`}>
                                                {q.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => { setSelectedQuote(q); setShowPdfPreview(true); }}
                                                    className="p-1.5 bg-white/5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                                                    title="Ver PDF"
                                                >
                                                    <FileText size={14} />
                                                </button>
                                                {q.status !== 'Approved' && (
                                                    <button 
                                                        onClick={() => handleApprove(q.id)}
                                                        className="bg-white text-black px-3 py-1 rounded text-[10px] font-bold uppercase hover:bg-gray-200 transition-colors"
                                                    >
                                                        Aprovar
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* PDF Preview Modal */}
        <AnimatePresence>
            {showPdfPreview && selectedQuote && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={() => setShowPdfPreview(false)}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-6 md:p-12 font-sans"
                    >
                        <button 
                            onClick={() => setShowPdfPreview(false)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                        >
                            <X size={24} />
                        </button>

                        {/* PDF Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-black pb-6 md:pb-8 mb-6 md:mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-1">WINF PRECISION™</h2>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Relatório de Estimativa Técnica // Orçamento</p>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-sm font-bold">Data: {new Date(selectedQuote.createdAt).toLocaleDateString('pt-BR')}</p>
                                <p className="text-sm font-mono text-gray-500">REF: {selectedQuote.id?.substring(0, 8).toUpperCase() || 'NEW'}</p>
                            </div>
                        </div>

                        {/* Client Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Cliente / Projeto</h4>
                                <p className="text-base md:text-lg font-bold">{selectedQuote.customerName}</p>
                                <p className="text-sm text-gray-600">{selectedQuote.customerAddress}</p>
                                <p className="text-sm text-gray-600">{selectedQuote.customerCity}</p>
                                <p className="text-sm font-bold mt-2">{selectedQuote.customerWhatsApp}</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Especificações</h4>
                                <p className="text-sm font-bold">Tipo: {selectedQuote.projectType === 'Automotive' ? 'Automotivo' : 'Arquitetura'}</p>
                                {selectedQuote.vehicleModel && <p className="text-sm">Veículo: {selectedQuote.vehicleModel}</p>}
                                {selectedQuote.measurements && <p className="text-sm">Metragem: {selectedQuote.measurements}</p>}
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="overflow-x-auto no-scrollbar mb-8 md:mb-12">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-4 text-[10px] font-black uppercase tracking-widest">Descrição do Serviço / Produto</th>
                                        <th className="text-center py-4 text-[10px] font-black uppercase tracking-widest">Qtd/m²</th>
                                        <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest">Unitário</th>
                                        <th className="text-right py-4 text-[10px] font-black uppercase tracking-widest">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {selectedQuote.items.map((item: any, idx: number) => (
                                        <tr key={idx}>
                                            <td className="py-4">
                                                <p className="font-bold text-sm">{item.description}</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Garantia Vitalícia Winf OS™</p>
                                            </td>
                                            <td className="py-4 text-center text-sm">{item.quantity}</td>
                                            <td className="py-4 text-right text-sm">R$ {item.unitPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                            <td className="py-4 text-right text-sm font-bold">R$ {(item.quantity * item.unitPrice).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals & Conditions */}
                        <div className="flex justify-end mb-8 md:mb-12">
                            <div className="w-full sm:w-80 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal Bruto</span>
                                    <span className="font-bold">R$ {(selectedQuote.totalAmount + (selectedQuote.pixDiscount || 0)).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                                </div>
                                {selectedQuote.pixDiscount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 font-bold">
                                        <span>Desconto PIX Especial</span>
                                        <span>- R$ {selectedQuote.pixDiscount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xl md:text-2xl font-black border-t-2 border-black pt-3">
                                    <span>TOTAL</span>
                                    <span>R$ {selectedQuote.totalAmount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded mt-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Condições de Pagamento</p>
                                    <p className="text-sm font-bold">Método: {selectedQuote.paymentMethod || 'Não especificado'}</p>
                                    {selectedQuote.installments > 1 && (
                                        <p className="text-sm font-bold">Parcelado: {selectedQuote.installments}x de R$ {selectedQuote.installmentValue?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                                    )}
                                    <p className="text-[10px] text-gray-500 mt-1">* Sujeito a aprovação de crédito</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Warranties */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-gray-100 pt-8">
                            <div className="flex gap-3">
                                <ShieldCheck className="text-gray-300 shrink-0" size={32} />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest">Garantia</p>
                                    <p className="text-[9px] text-gray-500 leading-tight">Cobertura total contra desbotamento, bolhas e descolamento conforme termos Winf OS™.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <ShieldCheck className="text-gray-300 shrink-0" size={32} />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest">Performance</p>
                                    <p className="text-[9px] text-gray-500 leading-tight">Tecnologia AeroCore™ de rejeição infravermelha e proteção UV de 99%.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <ShieldCheck className="text-gray-300 shrink-0" size={32} />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest">Autenticidade</p>
                                    <p className="text-[9px] text-gray-500 leading-tight">Produto original com selo de autenticidade e registro em blockchain Winf.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row gap-4 no-print">
                            <PDFDownloadLink 
                                document={<QuotePDF quote={selectedQuote} qrCodeUrl={qrCodeUrl} />} 
                                fileName={`WINF_Proposta_${selectedQuote.customerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`}
                                className="flex-1 bg-black text-white py-4 rounded font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
                            >
                                {({ loading }) => (
                                    <><Printer size={16} /> {loading ? 'Compilando...' : 'Gerar Proposta (PDF)'}</>
                                )}
                            </PDFDownloadLink>
                            <button className="flex-1 bg-zinc-100 text-black py-4 rounded font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all">
                                <Share2 size={16} /> Enviar via WhatsApp
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default ModuleQuotes;
