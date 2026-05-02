
import React, { useState, useMemo, useEffect } from 'react';
import { PUBLIC_PROMPTS, PROMPT_CATEGORIES, PROMPT_CATEGORY_DISPLAY, PROMPT_CATEGORY_ICONS } from '../../constants';
import { usePrompts } from '../../hooks/usePrompts';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { PromptCategory, Prompt, GroupedPrompt, PromptFramework } from '../../types';
import { PromptCard } from '../shared/PromptCard';
import { useLocation, useNavigate } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

const ITEMS_PER_PAGE = 12;

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const CommunityHub: React.FC = () => {
  useSEO({
    title: 'Prompt Hub & Library',
    description: 'Explore our curated library of high-performance AI prompts. Find templates for marketing, coding, writing, and productivity optimized for Gemini and ChatGPT.',
    keywords: ['AI Prompt Library', 'Prompt Hub', 'Marketing Prompts', 'Coding Prompts', 'Best ChatGPT Prompts', 'Gemini Prompts']
  });

  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | 'All'>('All');
  const [selectedFramework, setSelectedFramework] = useState<PromptFramework | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { toggleFavoritePrompt, prompts: myPrompts, userPublicPrompts } = usePrompts();
  const myFavoritedPromptIds = useMemo(() => new Set(myPrompts.filter(p => p.isFavorited && p.originalPublicId).map(p => p.originalPublicId!)), [myPrompts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, selectedFramework]);
  
  const handleFavoritePrompt = (id: string) => {
    if(!user) {
        addNotification('Please log in to add favorites.', 'info');
        navigate('/login', { state: { from: location } });
        return;
    }
    toggleFavoritePrompt(id);
  }

  const groupedAndCombinedPrompts = useMemo(() => {
    // Group the official curated prompts by title
    const officialGroups: Record<string, Prompt[]> = {};
    PUBLIC_PROMPTS.forEach(prompt => {
      if (!officialGroups[prompt.title]) {
        officialGroups[prompt.title] = [];
      }
      officialGroups[prompt.title].push(prompt);
    });

    const officialGroupedPrompts: GroupedPrompt[] = Object.values(officialGroups).map((promptsInGroup): GroupedPrompt => {
      const firstPrompt = promptsInGroup[0];
      const groupId = slugify(firstPrompt.title);
      
      return {
        type: 'grouped-prompt',
        id: groupId,
        title: firstPrompt.title,
        description: firstPrompt.description,
        category: firstPrompt.category,
        prompts: promptsInGroup.sort((a,b) => (a.framework || '').localeCompare(b.framework || '')),
        frameworks: [...new Set(promptsInGroup.map(p => p.framework).filter((fw): fw is PromptFramework => !!fw))],
        createdAt: Math.max(...promptsInGroup.map(p => p.createdAt || 0)),
      };
    });

    // Convert user-submitted public prompts into the GroupedPrompt format
    const userGroupedPrompts: GroupedPrompt[] = userPublicPrompts.map(prompt => ({
        type: 'grouped-prompt',
        id: prompt.historyId, // Use historyId for a unique, stable ID
        title: prompt.title,
        description: prompt.description,
        category: prompt.category,
        prompts: [prompt],
        frameworks: prompt.framework ? [prompt.framework] : [],
        createdAt: prompt.createdAt,
    }));

    // Combine both lists and sort by creation date (newest first)
    return [...officialGroupedPrompts, ...userGroupedPrompts].sort((a, b) => b.createdAt - a.createdAt);
  }, [userPublicPrompts]);


  const filteredItems = useMemo(() => {
    return groupedAndCombinedPrompts.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFramework = selectedFramework === 'All' || item.frameworks.includes(selectedFramework);
      return matchesCategory && matchesSearch && matchesFramework;
    });
  }, [searchTerm, selectedCategory, selectedFramework, groupedAndCombinedPrompts]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  
  const handleCardClick = (itemUrl: string) => {
    navigate(itemUrl, { state: { background: location } });
  };
  
  const handleCategoryFilterClick = (category: PromptCategory) => {
    setSearchTerm('');
    setSelectedFramework('All');
    setSelectedCategory(category);
  };
  
  const handleFrameworkFilterClick = (framework: PromptFramework) => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedFramework(framework);
  };

  return (
    <div className="animate-fade-in min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.05),transparent)] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-sm font-bold mb-8 animate-bounce-slow">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
                The Prompt Architect's Library
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-emerald-500">AI Conversation.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                Explore high-performance prompts curated for builders. Engineered to eliminate hallucinations and maximize deterministic output.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl flex items-center p-3 border border-white/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                    <span className="material-symbols-outlined text-slate-400 ml-4 text-2xl">search</span>
                    <input
                        type="text"
                        placeholder="Search prompts by title, description or tag..."
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
        
        {/* Compact Columns Filter Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-8xl text-indigo-600">grid_view</span>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-12 relative z-10">
                {/* Categories Column */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-10 pb-10 border-b border-slate-100">
                        <button
                            onClick={() => {setSelectedCategory('All'); setSelectedFramework('All');}}
                            className={`w-full px-3 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 border flex flex-col items-center justify-center gap-1.5 text-center ${
                                selectedCategory === 'All' && selectedFramework === 'All'
                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200 transform -translate-y-1'
                                : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30'
                            }`}
                        >
                            <span className={`material-symbols-outlined text-lg ${selectedCategory === 'All' && selectedFramework === 'All' ? 'text-white' : 'text-slate-400 opacity-60'}`}>auto_awesome</span>
                            <span className="leading-tight">ALL PROMPTS</span>
                        </button>
                        {PROMPT_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryFilterClick(cat)}
                                className={`w-full px-3 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 border flex flex-col items-center justify-center gap-1.5 text-center ${
                                    selectedCategory === cat
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200 transform -translate-y-1'
                                    : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30'
                                }`}
                            >
                                <span className={`material-symbols-outlined text-lg ${selectedCategory === cat ? 'text-white' : 'text-slate-400 opacity-60'}`}>
                                    {PROMPT_CATEGORY_ICONS[cat] || 'chat'}
                                </span>
                                <span className="leading-tight">{PROMPT_CATEGORY_DISPLAY[cat] || cat}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Frameworks Column */}
                <div className="lg:col-span-1 border-tl lg:border-l lg:border-slate-100 lg:pl-12 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <span className="material-symbols-outlined block">extension</span>
                            </span>
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Frameworks</h3>
                        </div>
                        
                        <div className="relative group">
                            <select
                                value={selectedFramework}
                                onChange={(e) => setSelectedFramework(e.target.value as PromptFramework | 'All')}
                                className="w-full bg-emerald-50/50 text-emerald-800 border border-emerald-100/50 hover:border-emerald-300 rounded-xl px-4 py-3.5 text-xs font-black appearance-none focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all cursor-pointer shadow-sm group-hover:shadow-md"
                            >
                                <option value="All">ALL FRAMEWORKS</option>
                                {Object.values(PromptFramework).map(fw => (
                                    <option key={fw} value={fw}>{fw}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600 transition-transform group-hover:scale-110">
                                <span className="material-symbols-outlined text-sm block">unfold_more</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] leading-tight text-slate-400 font-bold uppercase tracking-widest mb-2">Pro Tip:</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Use the dropdown to filter by engineering framework.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Results Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
            <div>
                <h2 className="text-3xl font-black text-slate-900">
                    {selectedCategory === 'All' ? (selectedFramework === 'All' ? 'Curated Specs' : selectedFramework) : selectedCategory}
                </h2>
                <p className="text-slate-500 font-medium mt-1">
                    Orchestrate intelligence with precision-engineered artifacts
                </p>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Spec Count</span>
                <span className="flex items-center justify-center min-w-[3rem] h-10 px-4 bg-slate-900 text-white rounded-xl font-black text-lg">{filteredItems.length}</span>
            </div>
        </div>

        {filteredItems.length > 0 ? (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedItems.map(item => {
                const itemUrl = `/detail/prompt/${item.id}`;
                const favoritedPromptInGroup = item.prompts.find(p => myFavoritedPromptIds.has(p.id));
                const isGroupFavorited = !!favoritedPromptInGroup;
                const promptIdForAction = favoritedPromptInGroup?.originalPublicId || item.prompts[0]?.id;
              return (
                  <PromptCard 
                      key={item.id}
                      item={item} 
                      onClick={() => handleCardClick(itemUrl)}
                      onFavorite={promptIdForAction ? () => handleFavoritePrompt(promptIdForAction) : undefined}
                      isFavorited={isGroupFavorited}
                      onCategoryClick={handleCategoryFilterClick}
                      onFrameworkClick={handleFrameworkFilterClick}
                  />
              );
          })}
        </div>
        {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-3 bg-white border border-slate-200 text-sm font-bold rounded-2xl shadow-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <span className="material-symbols-outlined text-sm align-middle mr-1">arrow_back</span>
                    Previous
                </button>
                <span className="text-sm font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    Page <span className="text-slate-900">{currentPage}</span> of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 bg-white border border-slate-200 text-sm font-bold rounded-2xl shadow-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Next
                    <span className="material-symbols-outlined text-sm align-middle ml-1">arrow_forward</span>
                </button>
            </div>
        )}
        </>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Prompts Found</h3>
            <p className="mt-2 text-slate-500">
                We couldn't find any prompts matching your criteria.
            </p>
            <div className="mt-6 flex justify-center gap-4">
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setSelectedFramework('All');}}
                    className="text-slate-500 font-bold hover:underline"
                >
                    Clear all filters
                </button>
                <Link to="/prompt-studio" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-slate-900 transition-all transform hover:scale-105">
                    <span className="material-symbols-outlined mr-2">add</span>
                    Create a New Prompt
                </Link>
            </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default CommunityHub;
