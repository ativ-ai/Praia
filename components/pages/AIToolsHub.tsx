
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PUBLIC_AI_TOOLS, AI_TOOL_CATEGORIES, AI_TOOL_CATEGORY_DISPLAY, AI_TOOL_CATEGORY_ICONS } from '../../constants';
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
        className={`w-full px-3 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 border flex flex-col items-center justify-center gap-1.5 text-center ${
            isActive
            ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200 transform -translate-y-1'
            : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30'
        }`}
      >
        <span className={`material-symbols-outlined text-lg ${isActive ? 'text-white' : 'text-slate-400 opacity-60'}`}>
          {category === 'All' ? 'auto_awesome' : (AI_TOOL_CATEGORY_ICONS[category] || 'smart_toy')}
        </span>
        <span className="leading-tight">
          {category === 'All' ? 'ALL TOOLS' : (AI_TOOL_CATEGORY_DISPLAY[category] || category)}
        </span>
      </button>
    )
  }

  return (
    <div className="animate-fade-in min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.05),transparent)] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-sm font-bold mb-8 animate-bounce-slow">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
                Curated AI Directory
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Command the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">AI Ecosystem</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                Access a curated directory of specialized agents and multimodal giants. The definitive infrastructure for the next generation of builders.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl flex items-center p-3 border border-white/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                    <span className="material-symbols-outlined text-slate-400 ml-4 text-2xl">search</span>
                    <input
                        type="text"
                        placeholder="Search for tools, features or workflows..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 font-semibold text-lg outline-none"
                    />
                     {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="mr-3 p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all"
                        >
                            <span className="material-symbols-outlined text-2xl block">close</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
      
      {/* Filters & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 mb-10">
            <CategoryPill category="All" />
            {AI_TOOL_CATEGORIES.map(cat => <CategoryPill key={cat} category={cat} />)}
        </div>

        {/* Results Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
            <div>
                <h2 className="text-3xl font-black text-slate-900">
                    {selectedCategory === 'All' ? 'All Resources' : (AI_TOOL_CATEGORY_DISPLAY[selectedCategory] || selectedCategory)}
                </h2>
                <p className="text-slate-500 font-medium mt-1">
                    Showing available solutions in the current workspace
                </p>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tool Count</span>
                <span className="flex items-center justify-center min-w-[3rem] h-10 px-4 bg-slate-900 text-white rounded-xl font-black text-lg">{filteredTools.length}</span>
            </div>
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
