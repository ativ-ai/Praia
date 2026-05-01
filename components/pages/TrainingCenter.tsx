
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PUBLIC_TRAINING_MODULES, TRAINING_CATEGORIES, TRAINING_CATEGORY_DISPLAY, TRAINING_CATEGORY_ICONS } from '../../constants';
import { useTraining } from '../../hooks/useTraining';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import TrainingCard from '../shared/TrainingCard';
import { useSEO } from '../../hooks/useSEO';
import { TrainingCategory } from '../../types';
import Icon from '../shared/Icon';

interface CategoryPillProps {
  category: TrainingCategory | 'All';
  isSelected: boolean;
  count: number;
  onClick: (category: TrainingCategory | 'All') => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ category, isSelected, onClick, count }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 border flex items-center gap-2 ${
          isSelected
          ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200 transform -translate-y-0.5'
          : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600 hover:shadow-md'
      }`}
    >
      <span className="material-symbols-outlined text-lg">{category === 'All' ? 'school' : (TRAINING_CATEGORY_ICONS[category] || 'school')}</span>
      {category === 'All' ? 'All Modules' : (TRAINING_CATEGORY_DISPLAY[category] || category)}
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
        {count}
      </span>
    </button>
  );
};

const TrainingCenter: React.FC = () => {
  useSEO({
    title: 'Training Center',
    description: 'Master prompt engineering with curated training modules. Learn frameworks, system prompting, and Vibe Coding.',
    keywords: ['AI Training', 'Learn Prompting', 'Prompt Engineering Course', 'Vibe Coding Tutorial', 'AI Education']
  });

  const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const { toggleFavoriteTraining, isTrainingFavorited } = useTraining();

  const handleFavoriteTraining = (id: string) => {
    if (!user) {
      addNotification('Please log in to add favorites.', 'info');
      navigate('/login', { state: { from: location } });
      return;
    }
    toggleFavoriteTraining(id);
  };
  
  const handleCategoryClick = (category: TrainingCategory) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const filteredModules = useMemo(() => {
    const sortedModules = [...PUBLIC_TRAINING_MODULES].sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    return sortedModules.filter(module => {
        const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
        const matchesSearch = searchTerm === '' || 
                              module.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              module.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="animate-fade-in min-h-screen">
      {/* Hero Section */}
      <div className="relative py-12 md:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
             <div className="inline-block p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-6 animate-bounce-slow">
                <span className="material-symbols-outlined text-4xl text-emerald-600">school</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
                The Training <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Center</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Level up your AI skills. From prompting fundamentals to advanced Vibe Coding architectures.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-xl flex items-center p-2 border border-slate-200 focus-within:border-emerald-500 transition-colors">
                    <span className="material-symbols-outlined text-slate-400 ml-3 text-xl">search</span>
                    <input
                        type="text"
                        placeholder="Search modules (e.g., 'Vibe Coding', 'Basics')..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 font-medium outline-none"
                    />
                     {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl block">close</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Category Scroll */}
        <div className="flex items-center gap-3 overflow-x-auto pb-10 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            <CategoryPill 
                category="All" 
                isSelected={selectedCategory === 'All'} 
                count={PUBLIC_TRAINING_MODULES.length}
                onClick={setSelectedCategory} 
            />
            {TRAINING_CATEGORIES.map(cat => (
                <CategoryPill 
                    key={cat} 
                    category={cat} 
                    isSelected={selectedCategory === cat} 
                    count={PUBLIC_TRAINING_MODULES.filter(m => m.category === cat).length}
                    onClick={setSelectedCategory} 
                />
            ))}
        </div>

        {/* Results Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
            <div>
                <h2 className="text-3xl font-black text-slate-900">
                    {selectedCategory === 'All' ? 'All Modules' : (TRAINING_CATEGORY_DISPLAY[selectedCategory] || selectedCategory)}
                </h2>
                <p className="text-slate-500 font-medium mt-1">
                    Showing educational resources available for study
                </p>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Modules Count</span>
                <span className="flex items-center justify-center min-w-[3rem] h-10 px-4 bg-emerald-600 text-white rounded-xl font-black text-lg">{filteredModules.length}</span>
            </div>
        </div>
        
        {/* Grid */}
        {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredModules.map((module) => (
                  <TrainingCard 
                      key={module.id}
                      module={module}
                      onClick={() => navigate(`/detail/training/${module.id}`, { state: { background: location }})}
                      onFavorite={() => handleFavoriteTraining(module.originalPublicId || module.id)}
                      isFavorited={isTrainingFavorited(module.originalPublicId || module.id)}
                      onCategoryClick={handleCategoryClick}
                    />
              ))}
            </div>
        ) : (
             <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="academicCap" className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No training modules found</h3>
                <p className="text-slate-500 mt-2">
                   We couldn't find anything matching "{searchTerm}" in {selectedCategory}.
                </p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                    className="mt-6 text-emerald-600 font-bold hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default TrainingCenter;
