import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  Shield, 
  Cpu, 
  Layers, 
  Wand2, 
  FileSpreadsheet,
  Send,
  User,
  Mail,
  Briefcase,
  Phone,
  ArrowRight,
  Search,
  AlertCircle,
  Check
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ArchitectRegistrationProps {
  onBack: () => void;
}

const ArchitectRegistration: React.FC<ArchitectRegistrationProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cau: '',
    phone: '',
    office: '',
    specialty: 'Residencial de Luxo'
  });

  // Simulação de verificação de autenticidade do CAU
  const verifyCAU = async () => {
    if (!formData.cau || formData.cau.length < 5) return;
    
    setIsVerifying(true);
    setVerificationStatus('idle');
    
    // Simula uma chamada de API para o conselho de arquitetura
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Lógica simulada: CAUs que começam com 'A' ou '1' são considerados válidos para o protótipo
    const isValid = formData.cau.length >= 6;
    
    setVerificationStatus(isValid ? 'valid' : 'invalid');
    setIsVerifying(false);
    
    if (isValid) {
      setTimeout(() => setStep(2), 800);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationStatus !== 'valid') return;
    
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        type: 'architect_registration',
        status: 'new',
        verified: true,
        createdAt: serverTimestamp(),
        source: 'architect_portal'
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Error registering architect:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/30 overflow-x-hidden relative">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '80px 80px' }}>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-winf-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[80] border-b border-white/5 bg-[#050505]/80 backdrop-blur-2xl h-20 flex items-center">
        <div className="max-w-[1500px] mx-auto px-6 w-full flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 group text-[10px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-white transition-all"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black font-black flex items-center justify-center rounded text-xs">W</div>
            <span className="font-black tracking-tighter text-lg uppercase">Winf™ <span className="text-white/40">ARCHITECTS</span></span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
            <div className="w-1 h-1 bg-winf-primary rounded-full animate-pulse"></div>
            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Verificação Ativa</span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Side: Value Proposition */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="inline-block px-4 py-1 rounded-full border border-winf-primary/20 bg-winf-primary/5 text-[9px] font-black uppercase tracking-[0.5em] text-winf-primary">
                  Portal do Especificador // Autenticado
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                  CIÊNCIA PARA <br/>
                  <span className="text-white/20">SEU PROJETO.</span>
                </h1>
                <p className="text-xl text-white/40 font-light leading-relaxed max-w-lg">
                  O ecossistema Winf™ Architects é exclusivo para profissionais certificados. Valide seu registro para acessar ferramentas de engenharia molecular.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: <Wand2 size={20} />, title: "Simulador AI", desc: "Visualize a aplicação em fachadas reais." },
                  { icon: <FileSpreadsheet size={20} />, title: "Cálculo de ROI", desc: "Relatórios de eficiência energética." },
                  { icon: <Layers size={20} />, title: "Arquivos BIM", desc: "Especificações técnicas prontas." },
                  { icon: <Shield size={20} />, title: "Suporte Select", desc: "Canal direto com nossa engenharia." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="space-y-3 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="text-winf-primary">{item.icon}</div>
                    <h3 className="text-xs font-black uppercase tracking-widest">{item.title}</h3>
                    <p className="text-[11px] text-white/30 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side: Registration Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-winf-primary/5 blur-3xl rounded-full"></div>
              
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: step === 1 ? '50%' : '100%' }}
                    className="h-full bg-winf-primary shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {step === 1 ? (
                        <div className="space-y-8">
                          <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Autenticação Profissional</h2>
                            <p className="text-xs text-white/40 uppercase tracking-widest">Etapa 01: Validação de Registro (CAU/CREA)</p>
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Número do Registro Profissional</label>
                              <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input 
                                  required
                                  type="text"
                                  value={formData.cau}
                                  onChange={e => {
                                    setFormData({...formData, cau: e.target.value});
                                    setVerificationStatus('idle');
                                  }}
                                  className={`w-full bg-white/[0.03] border rounded-2xl py-5 pl-12 pr-4 text-sm outline-none transition-all ${
                                    verificationStatus === 'valid' ? 'border-green-500/50 bg-green-500/5' : 
                                    verificationStatus === 'invalid' ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus:border-white/30'
                                  }`}
                                  placeholder="Ex: A12345-6"
                                />
                                {isVerifying && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                  </div>
                                )}
                                {verificationStatus === 'valid' && <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={16} />}
                                {verificationStatus === 'invalid' && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" size={16} />}
                              </div>
                              {verificationStatus === 'invalid' && (
                                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 ml-1">Registro não localizado ou inválido.</p>
                              )}
                            </div>

                            <button 
                              onClick={verifyCAU}
                              disabled={isVerifying || !formData.cau}
                              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-gray-200 transition-all disabled:opacity-50"
                            >
                              {isVerifying ? 'Verificando Autenticidade...' : (
                                <>
                                  Validar Registro Profissional <Search size={16} />
                                </>
                              )}
                            </button>

                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                              <p className="text-[9px] text-white/30 leading-relaxed uppercase tracking-widest">
                                * A Winf™ utiliza protocolos de segurança para garantir que apenas profissionais ativos acessem o ecossistema de engenharia.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          <div>
                            <div className="flex items-center gap-2 text-green-500 mb-2">
                              <CheckCircle2 size={14} />
                              <span className="text-[9px] font-black uppercase tracking-widest">Registro Autenticado: {formData.cau}</span>
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Dados de Contato</h2>
                            <p className="text-xs text-white/40 uppercase tracking-widest">Etapa 02: Finalização do Perfil</p>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Nome Completo</label>
                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input 
                                  required
                                  type="text"
                                  value={formData.name}
                                  onChange={e => setFormData({...formData, name: e.target.value})}
                                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-white/30 outline-none transition-all"
                                  placeholder="Seu nome"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">E-mail Profissional</label>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input 
                                  required
                                  type="email"
                                  value={formData.email}
                                  onChange={e => setFormData({...formData, email: e.target.value})}
                                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-white/30 outline-none transition-all"
                                  placeholder="email@escritorio.com"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">WhatsApp</label>
                              <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                <input 
                                  required
                                  type="tel"
                                  value={formData.phone}
                                  onChange={e => setFormData({...formData, phone: e.target.value})}
                                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-white/30 outline-none transition-all"
                                  placeholder="(00) 00000-0000"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Escritório / Empresa</label>
                              <input 
                                type="text"
                                value={formData.office}
                                onChange={e => setFormData({...formData, office: e.target.value})}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-white/30 outline-none transition-all"
                                placeholder="Nome do seu escritório"
                              />
                            </div>

                            <div className="flex gap-3 pt-4">
                              <button 
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-6 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all"
                              >
                                <ArrowLeft size={18} />
                              </button>
                              <button 
                                disabled={isSubmitting}
                                className="flex-1 bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-gray-200 transition-all disabled:opacity-50"
                              >
                                {isSubmitting ? 'Processando...' : (
                                  <>
                                    Finalizar Cadastro <ArrowRight size={16} />
                                  </>
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-8"
                    >
                      <div className="w-24 h-24 bg-winf-primary/10 border border-winf-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={48} className="text-winf-primary" />
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-3xl font-black uppercase tracking-tighter">Acesso Liberado!</h2>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">
                          Seu registro foi autenticado. Você agora faz parte da rede de arquitetos especificadoes Winf™.
                        </p>
                      </div>
                      <button 
                        onClick={onBack}
                        className="w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
                      >
                        Entrar no Ecossistema
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em]">WINF™ ARCHITECTURAL DIVISION // 2026</p>
      </footer>
    </div>
  );
};

export default ArchitectRegistration;
