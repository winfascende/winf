
import React, { useState } from 'react';
import { 
  GraduationCap, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  Star, 
  Trophy, 
  Zap, 
  ChevronRight, 
  Lock, 
  Search,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWinf } from '../contexts/WinfContext';
import AcademyCertificate from './AcademyCertificate';

const ModuleAcademy: React.FC = () => {
    const { user, gamify } = useWinf();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [showCertificate, setShowCertificate] = useState(false);

    const courses = [
        {
            id: 'c1',
            title: 'Winf Cut™: Otimização de Corte',
            desc: 'Aprenda a reduzir o desperdício em até 40% usando nossa ferramenta de plano de corte.',
            duration: '45 min',
            lessons: 8,
            level: 'Iniciante',
            category: 'Técnico',
            thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
            reward: 50,
            completed: true
        },
        {
            id: 'c2',
            title: 'Vendas de Elite: O Método Winf',
            desc: 'Como vender valor, não preço. Técnicas de fechamento para arquitetura e automotivo.',
            duration: '1h 20min',
            lessons: 12,
            level: 'Intermediário',
            category: 'Vendas',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
            reward: 100,
            completed: false
        },
        {
            id: 'c3',
            title: 'Instalação de Invisible® Series',
            desc: 'Técnicas avançadas para aplicação de películas de alta performance sem marcas.',
            duration: '2h 15min',
            lessons: 15,
            level: 'Avançado',
            category: 'Instalação',
            thumbnail: 'https://images.unsplash.com/photo-1618557219623-64a2747bb7eb?auto=format&fit=crop&q=80&w=800',
            reward: 250,
            completed: false
        },
        {
            id: 'c4',
            title: 'Gestão de Estoque com Winf Stock™',
            desc: 'Domine o controle de rolos e evite rupturas de estoque em sua operação.',
            duration: '30 min',
            lessons: 5,
            level: 'Iniciante',
            category: 'Gestão',
            thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
            reward: 30,
            completed: false
        }
    ];

    const filteredCourses = courses.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCompleteLesson = () => {
        gamify('ACADEMY_COMPLETED');
        setShowCertificate(true);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-winf-border pb-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-light text-winf-text_primary tracking-tight">WINF <span className="font-bold text-winf-primary">ASCEND™</span></h1>
                    <p className="text-winf-text_muted text-sm">Plataforma de Treinamento de Elite // Evolução Winf™.</p>
                </div>
                <div className="flex items-center gap-4 bg-winf-surface border border-winf-border px-6 py-3 rounded-2xl">
                    <div className="text-right">
                        <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Winf™ Knowledge</p>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-winf-background rounded-full overflow-hidden">
                                <div className="w-1/4 h-full bg-winf-primary"></div>
                            </div>
                            <p className="text-winf-text_primary font-bold text-sm">{user?.quantum_knowledge || 0} XP</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-winf-border"></div>
                    <div className="text-right">
                        <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Nível</p>
                        <p className="text-winf-primary font-bold text-sm">MEMBRO ELITE</p>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            <AnimatePresence>
                {showCertificate && selectedCourse && (
                    <AcademyCertificate 
                        courseTitle={selectedCourse.title}
                        userName={user?.name || 'Membro Winf'}
                        date={new Date().toLocaleDateString()}
                        onClose={() => setShowCertificate(false)}
                    />
                )}
            </AnimatePresence>

            {/* Featured Course */}
            {!selectedCourse && (
                <div className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer" onClick={() => setSelectedCourse(courses[1])}>
                    <img 
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1920" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt="Featured"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-winf-background via-winf-background/40 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 space-y-4 max-w-xl">
                        <div className="flex items-center gap-2">
                            <span className="bg-winf-surface text-winf-text_primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Destaque</span>
                            <span className="bg-winf-primary/10 backdrop-blur-md text-winf-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                <Coins size={10} /> +100 WinfCoins
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-winf-text_primary leading-tight">Vendas de Elite: O Método Winf</h2>
                        <p className="text-winf-text_secondary text-sm">Domine a psicologia de vendas aplicada a películas de alta performance e aumente seu ticket médio.</p>
                        <button className="bg-winf-primary text-winf-background px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-winf-primary_hover transition-all">
                            <PlayCircle size={18} /> Começar Agora
                        </button>
                    </div>
                </div>
            )}

            {/* Course Grid */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-winf-text_primary font-bold text-xl flex items-center gap-2"><BookOpen size={20} className="text-winf-text_muted" /> Cursos Disponíveis</h3>
                    <div className="relative w-full md:w-80">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-winf-text_muted" />
                        <input 
                            type="text" 
                            placeholder="Buscar cursos..." 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-winf-surface border border-winf-border py-2.5 pl-12 pr-4 rounded-xl text-winf-text_primary text-sm outline-none focus:border-winf-primary transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map(course => (
                        <motion.div 
                            key={course.id}
                            whileHover={{ y: -5 }}
                            className="bg-winf-surface border border-winf-border rounded-3xl overflow-hidden flex flex-col group cursor-pointer"
                            onClick={() => setSelectedCourse(course)}
                        >
                            <div className="relative h-40 overflow-hidden">
                                <img 
                                    src={course.thumbnail} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute top-4 left-4 bg-winf-background/60 backdrop-blur-md text-winf-text_primary text-[9px] font-black px-2 py-1 rounded uppercase">
                                    {course.category}
                                </div>
                                {course.completed && (
                                    <div className="absolute top-4 right-4 bg-green-500 text-winf-background p-1 rounded-full">
                                        <CheckCircle2 size={14} />
                                    </div>
                                )}
                            </div>
                            <div className="p-5 space-y-4 flex-1 flex flex-col">
                                <div className="space-y-2 flex-1">
                                    <h4 className="text-winf-text_primary font-bold text-sm group-hover:text-winf-primary transition-colors">{course.title}</h4>
                                    <p className="text-winf-text_secondary text-[11px] leading-relaxed line-clamp-2">{course.desc}</p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-winf-border">
                                    <div className="flex items-center gap-3 text-[10px] text-winf-text_muted">
                                        <span className="flex items-center gap-1"><Clock size={10} /> {course.duration}</span>
                                        <span className="flex items-center gap-1"><Award size={10} /> {course.level}</span>
                                    </div>
                                    <div className="text-winf-text_secondary font-bold text-xs flex items-center gap-1">
                                        <Coins size={12} /> {course.reward}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Course Detail Modal */}
            <AnimatePresence>
                {selectedCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCourse(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-winf-surface border border-winf-border rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="h-64 md:h-auto relative">
                                    <img 
                                        src={selectedCourse.thumbnail} 
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-winf-surface to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="w-16 h-16 bg-winf-primary rounded-full flex items-center justify-center text-winf-background shadow-xl shadow-winf-primary/10 hover:scale-110 transition-transform">
                                            <PlayCircle size={32} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-winf-text_muted font-black uppercase tracking-widest">{selectedCourse.category}</span>
                                            <span className="text-winf-border">•</span>
                                            <span className="text-[10px] text-winf-text_muted font-black uppercase tracking-widest">{selectedCourse.level}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-winf-text_primary">{selectedCourse.title}</h3>
                                        <p className="text-winf-text_secondary text-sm leading-relaxed">{selectedCourse.desc}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-winf-background/40 p-4 rounded-2xl border border-winf-border">
                                            <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Aulas</p>
                                            <p className="text-winf-text_primary font-bold">{selectedCourse.lessons}</p>
                                        </div>
                                        <div className="bg-winf-background/40 p-4 rounded-2xl border border-winf-border">
                                            <p className="text-[10px] text-winf-text_muted uppercase font-black tracking-widest">Recompensa</p>
                                            <p className="text-winf-text_secondary font-bold flex items-center gap-1"><Coins size={14} /> {selectedCourse.reward}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-bold text-winf-text_primary">Conteúdo do Curso</p>
                                        <div className="space-y-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-winf-background/50 rounded-xl text-xs text-winf-text_secondary">
                                                    <span className="flex items-center gap-3">
                                                        <span className="text-winf-text_muted">0{i}</span>
                                                        Módulo de Introdução {i}
                                                    </span>
                                                    <Lock size={12} className="text-winf-text_muted" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button 
                                            onClick={() => setSelectedCourse(null)}
                                            className="flex-1 py-3 bg-winf-background/50 hover:bg-winf-background text-winf-text_primary font-bold rounded-xl transition-all border border-winf-border"
                                        >
                                            Fechar
                                        </button>
                                        <button 
                                            onClick={handleCompleteLesson}
                                            className="flex-1 py-3 bg-winf-primary hover:bg-winf-primary_hover text-winf-background font-bold rounded-xl transition-all shadow-lg shadow-winf-primary/5"
                                        >
                                            Iniciar Aula
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ModuleAcademy;
