import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import { Package, Shield, Sun, Eye, Thermometer, ChevronRight, Search, Filter } from 'lucide-react';

const ModuleProducts: React.FC = () => {
  const { products, user } = useWinf();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleGenerateOrder = (product: any) => {
    alert(`Pedido gerado para ${product.name}. A central processará e encaminhará para o instalador mais apropriado.`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-winf-text_primary tracking-tight">WINF GLASS INTELLIGENCE™</h1>
          <p className="text-winf-text_muted mt-1">Catálogo técnico e performance de produtos</p>
        </div>
        <div className="flex bg-winf-surface p-1 rounded-xl border border-winf-border">
          <button 
            onClick={() => setShowPricing(false)}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${!showPricing ? 'bg-winf-text_primary text-winf-background' : 'text-winf-text_muted hover:text-winf-text_primary'}`}
          >
            FICHA TÉCNICA
          </button>
          <button 
            onClick={() => setShowPricing(true)}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${showPricing ? 'bg-winf-primary text-winf-background' : 'text-winf-text_muted hover:text-winf-text_primary'}`}
          >
            TABELA DE PREÇOS
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-winf-text_muted" />
          <input
            type="text"
            placeholder="Buscar produto ou tecnologia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-winf-surface border border-winf-border rounded-lg pl-10 pr-4 py-2 text-winf-text_primary focus:ring-2 focus:ring-winf-primary focus:border-transparent outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${!selectedCategory ? 'bg-winf-primary text-winf-background' : 'bg-winf-surface text-winf-text_muted hover:text-winf-text_primary'}`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as string)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-winf-primary text-winf-background' : 'bg-winf-surface text-winf-text_muted hover:text-winf-text_primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-winf-surface border border-winf-border rounded-xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-winf-border flex justify-between items-start">
              <div>
                <div className="text-xs font-mono text-winf-primary mb-1">{product.line || 'WINF SERIES'}</div>
                <h3 className="text-xl font-bold text-winf-text_primary">{product.name}</h3>
                <p className="text-sm text-winf-text_muted mt-2 line-clamp-2">{product.description}</p>
              </div>
              <div className="bg-winf-background p-3 rounded-lg border border-winf-border">
                <Package className="w-6 h-6 text-winf-primary" />
              </div>
            </div>

            <div className="p-6 flex-1 space-y-6">
              {!showPricing ? (
                <>
                  <div>
                    <h4 className="text-sm font-semibold text-winf-text_primary mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-winf-primary" />
                      WINF PERFORMANCE SYSTEM™
                    </h4>
                    
                    <div className="space-y-4">
                      <PerformanceBar label="Thermal Intelligence" score={product.thermal_score || 0} icon={<Thermometer className="w-4 h-4" />} />
                      <PerformanceBar label="Light Intelligence" score={product.light_score || 0} icon={<Sun className="w-4 h-4" />} />
                      <PerformanceBar label="Shield Intelligence" score={product.shield_score || 0} icon={<Shield className="w-4 h-4" />} />
                      <PerformanceBar label="Privacy Intelligence" score={product.privacy_score || 0} icon={<Eye className="w-4 h-4" />} />
                    </div>
                  </div>

                  {product.availableWidths && product.availableWidths.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-black text-winf-text_muted uppercase tracking-widest mb-3">Larguras Disponíveis (Roll Widths)</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.availableWidths.map(width => (
                          <span key={width} className="px-3 py-1 bg-winf-background border border-winf-border rounded text-[10px] font-mono text-winf-text_primary">
                            {width}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  <div className="bg-winf-background p-6 rounded-2xl border border-winf-border space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-winf-text_muted uppercase tracking-widest">Preço Especial Arquiteto</span>
                      <span className="text-2xl font-black text-winf-primary">R$ {(product.price || 250).toLocaleString('pt-BR')} / m²</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-winf-border/50">
                      <span className="text-xs text-winf-text_muted uppercase tracking-widest">Lucratividade Estimada</span>
                      <span className="text-lg font-bold text-green-500">+ 35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-winf-text_muted uppercase tracking-widest">Retorno por Projeto</span>
                      <span className="text-lg font-bold text-winf-text_primary">Alto Impacto</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-winf-primary/5 border border-winf-primary/20 rounded-xl">
                    <p className="text-[10px] text-winf-primary font-bold uppercase tracking-widest leading-relaxed">
                      * Valores exclusivos para membros do ecossistema AeroCore Architect AI™. 
                      O pedido será processado pela central e encaminhado para a equipe técnica homologada.
                    </p>
                  </div>

                  <button 
                    onClick={() => handleGenerateOrder(product)}
                    className="w-full bg-winf-primary text-winf-background py-4 rounded-xl font-black uppercase tracking-widest hover:bg-winf-primary_hover transition-all shadow-lg shadow-winf-primary/20"
                  >
                    Gerar Pedido & Garantia
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 bg-winf-background border-t border-winf-border flex justify-between items-center">
              <div className="text-sm text-winf-text_muted">
                Garantia: <span className="text-winf-text_primary font-medium">{product.warranty_years || 5} Anos</span>
              </div>
              {!showPricing && (
                <button className="text-winf-primary hover:text-winf-primary_hover text-sm font-medium flex items-center gap-1 transition-colors">
                  Ver Ficha Técnica <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PerformanceBar = ({ label, score, icon }: { label: string, score: number, icon: React.ReactNode }) => {
  // Score is out of 10
  const normalizedScore = Math.min(Math.max(score, 0), 10);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-winf-text_muted flex items-center gap-1.5">
          {icon} {label}
        </span>
        <span className="text-xs font-mono text-winf-text_primary">{normalizedScore}/10</span>
      </div>
      <div className="h-2 w-full bg-winf-background rounded-full overflow-hidden border border-winf-border/50">
        <div 
          className="h-full bg-winf-primary transition-all duration-1000 ease-out"
          style={{ width: `${(normalizedScore / 10) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ModuleProducts;
