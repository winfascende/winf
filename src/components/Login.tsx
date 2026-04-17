
import React, { useState } from 'react';
import { Hexagon, ArrowRight, Mail, Lock, Loader, Key, ShieldCheck } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

const Login: React.FC = () => {
  const { login, loginAsPrototype } = useWinf();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const { success, error: authError } = await login(email, password);
      if (!success) {
        setError(authError || "Credenciais inválidas.");
        setIsLoading(false);
      }
      // If success, the context/App.tsx handles the view switch via user state change
    } catch (e) {
      setError("Erro de conexão.");
      setIsLoading(false);
    }
  };

  const handlePrototypeAccess = async () => {
    setIsLoading(true);
    await loginAsPrototype();
    // Context handles redirection
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-zinc-800/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-zinc-800/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <div className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 animate-fade-in">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-black border border-zinc-700/30 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(113,113,122,0.2)]">
            <Hexagon size={28} className="text-zinc-400 md:size-[32px]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-light text-white tracking-widest">WINF <span className="font-bold">OS</span></h1>
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.3em] mt-1">Acesso Restrito // Licenciados</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-zinc-400 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:border-zinc-700 focus:ring-1 focus:ring-winf-aerocore_blue/50 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Senha</label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-zinc-400 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:border-zinc-700 focus:ring-1 focus:ring-winf-aerocore_blue/50 outline-none transition-all text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400 text-xs animate-slide-up">
              <ShieldCheck size={14} />
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-800 hover:bg-zinc-800 text-white font-bold py-3.5 rounded-lg uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(113,113,122,0.3)] hover:shadow-[0_0_30px_rgba(113,113,122,0.5)] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader size={16} className="animate-spin" /> : <><Key size={16} /> Acessar Sistema</>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500 mb-4">Ambiente de Demonstração?</p>
          <button 
            onClick={handlePrototypeAccess}
            disabled={isLoading}
            className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
          >
            {isLoading ? <Loader size={14} className="animate-spin" /> : <>Acessar Protótipo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-6 text-[10px] text-gray-600 uppercase tracking-widest">
        Winf Partners © 2025. Secure Connection.
      </div>
    </div>
  );
};

export default Login;
    