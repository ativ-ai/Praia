
import React, { useState, useMemo, useEffect } from 'react';
import { PUBLIC_PROMPTS, PROMPT_CATEGORIES } from '../../constants';
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
    title: 'Prompts Hub',
    description: 'Discover a vast library of curated AI prompts for marketing, coding, writing, and more. Optimized for Gemini, ChatGPT, and Claude.',
    keywords: ['AI Prompts', 'Prompt Library', 'Prompt Hub', 'Marketing Prompts', 'Coding Prompts']
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
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-6xl">Prompts Hub</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">Discover high-quality prompts, curated by experts and the community.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8 sticky top-28 z-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                    type="text"
                    placeholder="Search prompts by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base shadow-sm placeholder-slate-400"
                    />
                </div>
            </div>
            <div className="md:col-span-1">
              <label htmlFor="category-filter" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full py-3 px-3 border border-slate-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                  <option value="All">All Categories</option>
                  {PROMPT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="md:col-span-1">
                 <label htmlFor="framework-filter" className="block text-sm font-medium text-slate-700 mb-1">Framework</label>
                <select
                    id="framework-filter"
                    value={selectedFramework}
                    onChange={(e) => setSelectedFramework(e.target.value as any)}
                    className="w-full py-3 px-3 border border-slate-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="All">All Frameworks</option>
                    {Object.values(PromptFramework).map(fw => <option key={fw} value={fw}>{fw}</option>)}
                </select>
            </div>
            <div className="md:col-span-1 flex items-end">
                <p className="text-sm font-medium text-slate-700 w-full text-right">
                {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} found.
                </p>
            </div>
        </div>
      </div>
      
      {filteredItems.length > 0 ? (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    className="px-4 py-2 bg-white border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>
                <span className="text-sm text-slate-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        )}
        </>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md animate-fade-in">
            <span className="mx-auto text-6xl text-slate-400" role="img" aria-label="search">🔍</span>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">No Prompts Found</h3>
            <p className="mt-2 text-base text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
            <div className="mt-6">
                <Link to="/prompt-studio" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105">
                    <span className="material-symbols-outlined mr-2">add</span>
                    Create a New Prompt
                </Link>
            </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;
