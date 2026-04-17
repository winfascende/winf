import React, { useState, useEffect } from 'react';
import { WINF_CONSTANTS } from '../constants';
import { FileText, Download, Printer } from 'lucide-react';
import { useWinf } from '../contexts/WinfContext';

interface ArchitectSpecGeneratorProps {
  onSpecChange?: (spec: { filmId: string; area: string }) => void;
}

const ArchitectSpecGenerator: React.FC<ArchitectSpecGeneratorProps> = ({ onSpecChange }) => {
  const { paradoxAnalysis } = useWinf();
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    filmId: WINF_CONSTANTS.portfolio.lines[0].items[0].id,
    area: '',
    glassType: 'Vidro Comum (Float)',
  });

  useEffect(() => {
    if (paradoxAnalysis) {
      const suggestedFilm = WINF_CONSTANTS.portfolio.lines
        .flatMap(line => line.items)
        .find(item => item.name.includes(paradoxAnalysis.celula_sugerida) || paradoxAnalysis.celula_sugerida.includes(item.name));
      
      if (suggestedFilm) {
        setFormData(prev => ({ ...prev, filmId: suggestedFilm.id }));
      }
    }
  }, [paradoxAnalysis]);

  const [generated, setGenerated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    if (onSpecChange) {
      onSpecChange({ filmId: newData.filmId, area: newData.area });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
    if (onSpecChange) {
      onSpecChange({ filmId: formData.filmId, area: formData.area });
    }
  };

  const generatePDF = () => {
    alert('Funcionalidade de geração de PDF em desenvolvimento.');
  };


  const selectedFilm = WINF_CONSTANTS.portfolio.lines
    .flatMap(line => line.items)
    .find(item => item.id === formData.filmId);

  return (
    <div className="p-8 bg-winf-surface border border-winf-border rounded-[40px]">
      <h2 className="text-3xl font-black uppercase tracking-tighter text-winf-text_primary mb-8">Gerador de Especificação Técnica</h2>
      
      {!generated ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/60 ml-2">Nome do Projeto</label>
            <input name="projectName" required onChange={handleInputChange} className="w-full bg-winf-background border border-winf-border rounded-xl px-6 py-4 text-sm text-winf-text_primary" placeholder="EX: RESIDÊNCIA ALTO PADRÃO" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/60 ml-2">Nome do Cliente</label>
            <input name="clientName" required onChange={handleInputChange} className="w-full bg-winf-background border border-winf-border rounded-xl px-6 py-4 text-sm text-winf-text_primary" placeholder="EX: FAMÍLIA SILVA" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/60 ml-2">Película Selecionada</label>
            <select name="filmId" value={formData.filmId} onChange={handleInputChange} className="w-full bg-winf-background border border-winf-border rounded-xl px-6 py-4 text-sm text-winf-text_primary">
              {WINF_CONSTANTS.portfolio.lines.flatMap(line => line.items).map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-winf-text_muted/60 ml-2">Área Total (m²)</label>
            <input name="area" type="number" required onChange={handleInputChange} className="w-full bg-winf-background border border-winf-border rounded-xl px-6 py-4 text-sm text-winf-text_primary" placeholder="EX: 150" />
          </div>
          <button type="submit" className="col-span-full mt-4 bg-winf-text_primary text-winf-background py-5 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-winf-text_primary/90 transition-all">
            Gerar Especificação
          </button>
        </form>
      ) : (
        <div className="space-y-8">
          <div className="p-8 bg-winf-background border border-winf-border rounded-2xl font-mono text-xs text-winf-text_primary space-y-4">
            <h3 className="text-lg font-black uppercase tracking-widest border-b border-winf-border pb-4">Especificação Técnica WINF™</h3>
            <p><strong>Projeto:</strong> {formData.projectName}</p>
            <p><strong>Cliente:</strong> {formData.clientName}</p>
            <p><strong>Película:</strong> {selectedFilm?.name}</p>
            <p><strong>Área:</strong> {formData.area} m²</p>
            <p><strong>Especificações:</strong> {selectedFilm?.specs?.join(', ')}</p>
            <p className="pt-4 text-winf-text_muted">Documento gerado automaticamente pelo WINF™ Architect AI.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setGenerated(false)} className="flex-1 py-4 border border-winf-border rounded-xl text-winf-text_primary font-bold uppercase tracking-widest">Nova Especificação</button>
            <button onClick={generatePDF} className="flex-1 py-4 bg-winf-primary text-winf-background rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2"><Download size={16}/> Baixar PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectSpecGenerator;
