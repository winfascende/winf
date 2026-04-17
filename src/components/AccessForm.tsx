
import React, { useState } from 'react';
import { ChevronLeft, Loader, CheckCircle, AlertTriangle, User, MapPin, Phone, Mail, Award, Clock, Target, MessageSquare, Diamond, Activity } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';
import { ViewState } from '../types';

interface AccessFormProps {
  onBack: () => void;
}

const AccessForm: React.FC<AccessFormProps> = ({ onBack }) => {
  const { addLead, gamify } = useWinf();
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    state: '',
    whatsapp: '',
    email: '',
    actuaComo: '',
    tempoExperiencia: '',
    porqueAcesso: '',
    maiorDesafio: '',
    competirPor: '', 
    diferencialElite: '', 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!formData.fullName || !formData.city || !formData.state || !formData.actuaComo || !formData.tempoExperiencia || !formData.porqueAcesso || !formData.maiorDesafio || !formData.competirPor || !formData.diferencialElite) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.whatsapp && !formData.email) {
      setError('Por favor, forneça pelo menos um método de contato (WhatsApp ou Email).');
      setIsSubmitting(false);
      return;
    }

    const leadContact = formData.whatsapp || formData.email;
    const leadInterest = `
      Atua como: ${formData.actuaComo}
      Tempo de experiência: ${formData.tempoExperiencia}
      Por que quer acesso: ${formData.porqueAcesso}
      Maior desafio: ${formData.maiorDesafio}
      Competir por: ${formData.competirPor}
      Diferencial elite: ${formData.diferencialElite}
    `.trim();

    try {
      const { success, error: submitError } = await addLead({
        name: formData.fullName,
        contact: leadContact,
        source: 'Formulário de Acesso',
        interest: leadInterest,
        status: 'Pending Analysis',
        ai_score: 0, 
      });

      if (success) {
        setIsSubmitted(true);
        gamify('LEAD_ADDED'); 
      } else {
        setError(submitError || 'Ocorreu um erro ao enviar sua solicitação. Tente novamente.');
      }
    } catch (e: any) { 
      setError(`Erro de conexão: ${e.message || 'Verifique sua internet.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-6 bg-winf-deep-black text-winf-premium-white animate-fade-in">
        <div className="w-24 h-24 mx-auto bg-black border-2 border-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)] mb-8">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-heading font-light text-white tracking-tight mb-4">
          SOLICITAÇÃO ENVIADA <span className="font-bold text-green-500">COM SUCESSO.</span>
        </h2>
        <p className="text-gray-400 max-w-md mx-auto text-center text-lg leading-relaxed mb-8">
          Sua análise está em andamento. Caso aprovado(a), você será contatado(a) por um de nossos especialistas.
        </p>
        <button
          onClick={onBack}
          className="bg-white text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.15em] hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Retornar
        </button>
        <p className="text-[9px] text-gray-600 uppercase tracking-widest mt-12">
          Winf™ PARTNERS
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col relative overflow-hidden bg-winf-deep-black font-sans text-winf-premium-white">
      {/* Background Grid - Matrix Style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#050505_1px,transparent_1px),linear-gradient(to_bottom,#050505_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-20 flex justify-between items-center border-b border-white/5 pb-4 mb-4 p-6">
        <button
          onClick={onBack}
          className="flex gap-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> ABORTAR SOLICITAÇÃO
        </button>
        <div className="flex items-center gap-3">
          <Activity size={16} className="text-gray-600" />
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            PROTOCOLO: INICIAÇÃO
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 relative z-10 max-w-4xl mx-auto w-full animate-fade-in">
        <div className="w-full bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
          {/* Top Header do Formulário */}
          <div className="text-center mb-8 pb-4 border-b border-white/5">
            <div className="flex items-center justify-center mb-4">
              <svg className="h-8 w-auto" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 10H8L4 30H10L12.5 18L15 30H21L23.5 18L26 30H32L28 10H21.5L18 24L14.5 10Z" className="fill-white stroke-white" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M42 10H36V30H42V10Z" className="fill-white"/>
                <path d="M68 10H62V30H56V10H50V30H60L68 18V10Z" className="fill-white"/>
                <path d="M76 10H90V15H82V18H88V23H82V30H76V10Z" className="fill-white"/>
                <circle cx="96" cy="28" r="3" className="fill-winf-aerocore_blue" />
              </svg>
            </div>
            <h1 className="text-3xl font-heading font-light text-white tracking-tight">
              SOLICITAÇÃO DE <span className="font-bold text-zinc-400">ACESSO</span>
            </h1>
            <h2 className="text-xl font-heading font-light text-white tracking-tight mb-4">
              ECOSSISTEMA <span className="font-bold text-winf-primary">Winf™ PARTNERS</span>
            </h2>
            <p className="text-gray-500 text-xs max-w-sm mx-auto leading-relaxed">
              Este formulário não garante aprovação. Cada solicitação é analisada estrategicamente.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 w-full">
            {/* Bloco 1 — Identificação Essencial */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-2 pb-2 border-b border-white/5 flex items-center gap-2">
                <User size={18} className="text-zinc-400" /> Identificação Essencial
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-xs font-bold text-gray-500 uppercase">Nome Completo</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-zinc-700 outline-none transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-xs font-bold text-gray-500 uppercase">Cidade</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Sua cidade"
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-zinc-700 outline-none transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="state" className="text-xs font-bold text-gray-500 uppercase">Estado (UF)</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="UF"
                    maxLength={2}
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-zinc-700 outline-none transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="text-xs font-bold text-gray-500 uppercase">WhatsApp (preferencial)</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(DDD) 9xxxx-xxxx"
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-zinc-700 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase">Email (alternativo)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-zinc-700 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 2 — Experiência & Visão */}
            <div className="space-y-8 mt-8">
              <h3 className="text-xl font-bold text-white mb-2 pb-2 border-b border-white/5 flex items-center gap-2">
                <Award size={18} className="text-zinc-400" /> Sua Experiência e Visão
              </h3>
              
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-500 uppercase block">Atua como</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'Aplicador de películas', label: 'Aplicador', icon: <Award size={16} />, desc: 'Técnico Especialista' },
                    { id: 'Arquiteto/Designer', label: 'Arquiteto', icon: <Diamond size={16} />, desc: 'Especificador' },
                    { id: 'Vidraceiro', label: 'Vidraceiro', icon: <Target size={16} />, desc: 'Soluções em Vidro' },
                    { id: 'Investidor', label: 'Investidor', icon: <Activity size={16} />, desc: 'Business Partner' },
                    { id: 'Outro', label: 'Outro', icon: <User size={16} />, desc: 'Outras Áreas' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, actuaComo: option.id }))}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all gap-3 group relative overflow-hidden ${
                        formData.actuaComo === option.id 
                          ? 'bg-winf-primary border-winf-primary text-black shadow-[0_0_30px_rgba(37,99,235,0.4)] scale-105 z-10' 
                          : 'bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className={`${formData.actuaComo === option.id ? 'text-black' : 'text-gray-600 group-hover:text-winf-primary'} transition-colors`}>
                        {option.icon}
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none">{option.label}</p>
                        <p className={`text-[7px] uppercase tracking-widest mt-1 ${formData.actuaComo === option.id ? 'text-black/60' : 'text-gray-700'}`}>{option.desc}</p>
                      </div>
                      {formData.actuaComo === option.id && (
                        <div className="absolute top-1 right-1">
                          <CheckCircle size={12} className="text-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-500 uppercase block">Tempo de Experiência</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'Menos de 1 ano', label: '< 1 Ano' },
                    { id: '1-3 anos', label: '1-3 Anos' },
                    { id: '3-5 anos', label: '3-5 Anos' },
                    { id: 'Mais de 5 anos', label: '5+ Anos' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tempoExperiencia: option.id }))}
                      className={`flex items-center justify-center p-4 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                        formData.tempoExperiencia === option.id 
                          ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105 z-10' 
                          : 'bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="porqueAcesso" className="text-xs font-bold text-gray-500 uppercase">Por que você busca acesso ao Ecossistema Winf™?</label>
                <textarea
                  id="porqueAcesso"
                  name="porqueAcesso"
                  value={formData.porqueAcesso}
                  onChange={handleChange}
                  placeholder="Descreva seus objetivos e motivações..."
                  rows={3}
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-zinc-700 outline-none transition-colors"
                  required
                ></textarea>
              </div>
              <div className="space-y-2">
                <label htmlFor="maiorDesafio" className="text-xs font-bold text-gray-500 uppercase">Qual o seu maior desafio atual no mercado?</label>
                <textarea
                  id="maiorDesafio"
                  name="maiorDesafio"
                  value={formData.maiorDesafio}
                  onChange={handleChange}
                  placeholder="Geração de leads, diferenciação, acesso a produtos de ponta, etc."
                  rows={2}
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-zinc-700 outline-none transition-colors"
                  required
                ></textarea>
              </div>
            </div>

            {/* Bloco 3 — Posicionamento Estratégico */}
            <div className="space-y-8 mt-8">
              <h3 className="text-xl font-bold text-white mb-2 pb-2 border-b border-white/5 flex items-center gap-2">
                <Target size={18} className="text-zinc-400" /> Posicionamento Estratégico
              </h3>
              
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-500 uppercase block">Por qual tipo de cliente você deseja competir?</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'Mercado de massa (preço)', label: 'Massa', desc: 'Foco em Preço' },
                    { id: 'Mercado premium (qualidade/serviço)', label: 'Premium', desc: 'Qualidade' },
                    { id: 'Mercado de luxo (exclusividade/status)', label: 'Luxo', desc: 'Exclusividade' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, competirPor: option.id }))}
                      className={`flex flex-col p-4 rounded-xl border transition-all text-left ${
                        formData.competirPor === option.id 
                          ? 'bg-zinc-800 border-zinc-500 text-white shadow-lg' 
                          : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest mb-1">{option.label}</span>
                      <span className="text-[9px] text-gray-500">{option.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="diferencialElite" className="text-xs font-bold text-gray-500 uppercase">O que você considera um "diferencial de elite" no seu mercado?</label>
                <textarea
                  id="diferencialElite"
                  name="diferencialElite"
                  value={formData.diferencialElite}
                  onChange={handleChange}
                  placeholder="Ex: tecnologia exclusiva, atendimento personalizado, marca forte, etc."
                  rows={2}
                  className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-zinc-700 outline-none transition-colors"
                  required
                ></textarea>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400 text-xs animate-slide-up">
                <AlertTriangle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-zinc-800 text-white font-bold text-sm uppercase tracking-[0.2em] rounded-lg hover:bg-zinc-800 transition-all shadow-[0_0_20px_rgba(113,113,122,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {isSubmitting ? <Loader size={18} className="animate-spin" /> : <MessageSquare size={18} />}
              {isSubmitting ? 'ENVIANDO SOLICITAÇÃO...' : 'ENVIAR SOLICITAÇÃO DE ACESSO'}
            </button>
          </form>
        </div>
        <p className="text-[9px] text-gray-600 uppercase tracking-widest mt-12 mb-4">
          Winf™ PARTNERS
        </p>
      </div>
    </div>
  );
};

export default AccessForm;