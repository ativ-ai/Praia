
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PUBLIC_AI_TOOLS, AI_TOOL_CATEGORIES } from '../../constants';
import { useAITools } from '../../hooks/useAITools';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import AIToolCard from '../shared/AIToolCard';
import { useSEO } from '../../hooks/useSEO';
import { AIToolCategory } from '../../types';
import Icon from '../shared/Icon';

const AIToolsHub: React.FC = () => {
  useSEO({
    title: 'AI Tools Directory',
    description: 'Explore the definitive directory of AI tools for every task. Filter by category to find the perfect AI solution.',
    keywords: ['AI Tools Directory', 'Best AI Apps', 'Generative AI Tools', 'Productivity', 'Coding Assistants', 'Design Tools']
  });

  const [selectedCategory, setSelectedCategory] = useState<AIToolCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const { toggleFavoriteTool, isToolFavorited } = useAITools();

  const handleFavoriteTool = (id: string) => {
    if (!user) {
      addNotification('Please log in to add favorites.', 'info');
      navigate('/login', { state: { from: location } });
      return;
    }
    toggleFavoriteTool(id);
  };
  
  const handleCategoryClick = (category: AIToolCategory) => {
    setSelectedCategory(category);
  };

  const filteredTools = useMemo(() => {
    return PUBLIC_AI_TOOLS.filter(tool => {
        const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
        const matchesSearch = searchTerm === '' || 
                              tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const CategoryPill: React.FC<{ category: AIToolCategory | 'All' }> = ({ category }) => {
    const isActive = selectedCategory === category;
    
    return (
      <button
        onClick={() => setSelectedCategory(category)}
        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
            isActive
            ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105'
            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
        }`}
      >
        {category}
      </button>
    )
  }

  return (
    <div className="animate-fade-in min-h-screen">
      {/* Hero Section */}
      <div className="relative py-12 md:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
            <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-6 animate-bounce-slow">
                <span className="text-4xl" role="img" aria-label="tools">🛠️</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
                The AI Tool <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Directory</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Discover the best AI applications for writing, coding, design, and productivity. Curated and categorized for modern builders.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-xl flex items-center p-2 border border-slate-200 focus-within:border-indigo-500 transition-colors">
                    <span className="material-symbols-outlined text-slate-400 ml-3 text-xl">search</span>
                    <input
                        type="text"
                        placeholder="Search tools (e.g., 'Video Generator', 'Jasper')..."
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
      
      {/* Filters & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Category Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar mask-image-linear-gradient">
            <CategoryPill category="All" />
            {AI_TOOL_CATEGORIES.map(cat => <CategoryPill key={cat} category={cat} />)}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">
                {selectedCategory === 'All' ? 'All Tools' : selectedCategory}
                <span className="ml-2 text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{filteredTools.length}</span>
            </h2>
        </div>

        {/* Grid */}
        {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
                <AIToolCard 
                    key={tool.id}
                    tool={tool}
                    onClick={() => navigate(`/detail/tool/${tool.id}`, { state: { background: location } })}
                    onFavorite={() => handleFavoriteTool(tool.originalPublicId || tool.id)}
                    isFavorited={isToolFavorited(tool.originalPublicId || tool.id)}
                    onCategoryClick={handleCategoryClick}
                />
            ))}
        </div>
        ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">No tools found</h3>
                <p className="text-slate-500 mt-2">
                    We couldn't find any tools matching "{searchTerm}" in {selectedCategory}.
                </p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                    className="mt-6 text-indigo-600 font-bold hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIToolsHub;
