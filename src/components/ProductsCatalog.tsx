import React from 'react';
import { PRODUCT_CATALOG } from '../data/productCatalogData';
import { ChevronLeft, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductsCatalogProps {
  onBack: () => void;
  onSelectProduct?: (productId: string) => void;
}

const ProductsCatalog: React.FC<ProductsCatalogProps> = ({ onBack, onSelectProduct }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="text-xl font-bold tracking-widest uppercase border-l-2 border-white/50 pl-3">
            CATÁLOGO WINF<span className="text-white/50">™</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight mb-6">
            Coleção <span className="font-medium text-white">Arquitetura e Automotiva</span>
          </h1>
          <p className="text-lg text-white/50 font-light max-w-2xl mx-auto">
            Descubra as mais avançadas membranas nanocerâmicas para performance térmica e conforto do seu ambiente, seja casa ou empresa.
          </p>
        </motion.div>
      </section>

      {/* Catalog Grid */}
      <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCT_CATALOG.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group cursor-pointer bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-white/30 transition-all hover:-translate-y-2 flex flex-col"
              onClick={() => onSelectProduct && onSelectProduct(product.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest text-white/90 border border-white/20 rounded-full font-semibold">
                  {product.category === 'arch' ? 'Arquitetura' : 'Automotivo'}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">{product.badge}</div>
                <h3 className="text-2xl font-light mb-1">{product.name}</h3>
                <h4 className="text-xs text-white/60 italic mb-4">{product.subname}</h4>
                <p className="text-sm text-white/50 font-light line-clamp-3 mb-8 flex-1">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between mt-auto">
                   <div className="flex items-center gap-2 text-xs text-white/40">
                     <Shield size={14} className="text-white/40" /> {product.keyMetrics.warranty}
                   </div>
                   <div className="text-[10px] uppercase tracking-widest flex items-center gap-2 text-white/50 group-hover:text-white transition-colors font-bold">
                     Ver Detalhes <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsCatalog;
