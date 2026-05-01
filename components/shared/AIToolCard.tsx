
import React, { useState, useRef, useEffect } from 'react';
import { AITool, AIToolCategory } from '../../types';
import { AI_TOOL_CATEGORY_COLORS, AI_TOOL_CATEGORY_DISPLAY, AI_TOOL_CATEGORY_ICONS } from '../../constants';
import Icon from './Icon';

interface AIToolCardProps {
  tool: AITool;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  onClick?: () => void;
  onCategoryClick?: (category: AIToolCategory) => void;
  onDelete?: () => void;
  isUserOwned?: boolean;
}

const AIToolCard: React.FC<AIToolCardProps> = ({ tool, onFavorite, isFavorited, onClick, onCategoryClick, onDelete, isUserOwned }) => {
  const categoryColorClass = AI_TOOL_CATEGORY_COLORS[tool.category] || 'bg-slate-100 text-slate-800';
  const displayCategory = AI_TOOL_CATEGORY_DISPLAY[tool.category] || tool.category;
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  
  const iconName = AI_TOOL_CATEGORY_ICONS[tool.category] || "smart_toy";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) {
        setOptionsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(tool.originalPublicId || tool.id);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
    setOptionsMenuOpen(false);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onCategoryClick?.(tool.category);
  };
  
  const toggleOptionsMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOptionsMenuOpen(prev => !prev);
  }

  return (
    <article 
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
        <div className={`h-1.5 ${categoryColorClass.split(' ')[0]}`}></div>
        <div className="p-5 flex-grow flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 shadow-sm">
                        <span className="material-symbols-outlined text-3xl text-indigo-500">{iconName}</span>
                    </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">{tool.name}</h3>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={onCategoryClick ? handleCategoryClick : undefined} 
                                    disabled={!onCategoryClick} 
                                    className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md inline-block ${categoryColorClass} ${onCategoryClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                                >
                                    {displayCategory}
                                </button>
                                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                                    {tool.priceModel}
                                </span>
                            </div>
                        </div>
                </div>
                <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">{tool.description}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200/80 flex justify-between items-center">
                <a 
                    href={tool.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={handleLinkClick}
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    Visit Tool <Icon name="link" className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-1">
                    {onFavorite && (
                        <button onClick={handleFavoriteClick} className="p-2 rounded-full hover:bg-amber-100 transition-colors">
                            <span className={`material-symbols-outlined text-xl leading-none ${isFavorited ? 'text-amber-500' : 'text-slate-400'}`} style={{fontVariationSettings: `'FILL' ${isFavorited ? 1 : 0}`}}>
                                star
                            </span>
                        </button>
                    )}
                    {onDelete && (
                      <div ref={optionsMenuRef} className="relative">
                        <button onClick={toggleOptionsMenu} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                            <span className="material-symbols-outlined text-slate-500 text-xl">more_vert</span>
                        </button>
                        {optionsMenuOpen && (
                          <div className="origin-bottom-right absolute right-0 bottom-full mb-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 animate-expand-in">
                            <div className="py-1">
                               <button onClick={handleDeleteClick} className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 ${isUserOwned ? 'text-red-700 hover:bg-red-50' : 'text-amber-700 hover:bg-amber-50'}`}>
                                  <span className="material-symbols-outlined text-xl">{isUserOwned ? 'delete' : 'star'}</span>
                                  <span>{isUserOwned ? 'Delete Forever' : 'Remove Favorite'}</span>
                               </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
            </div>
        </div>
    </article>
  );
};

export default AIToolCard;
