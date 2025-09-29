

import React, { useState, useRef, useEffect } from 'react';
import { GroupedPrompt, Prompt, PromptFolder, PromptCategory, PromptFramework } from '../../types';
import { PROMPT_CATEGORY_COLORS, PROMPT_FRAMEWORK_COLORS, ITEM_TYPE_COLORS, PROMPT_FRAMEWORKS, PROMPT_ICONS } from '../../constants';

interface PromptCardProps {
  item: GroupedPrompt | Prompt;
  onClick?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
  onMove?: (promptId: string, folderId: string | null) => void;
  folders?: PromptFolder[];
  onCategoryClick?: (category: PromptCategory) => void;
  onFrameworkClick?: (framework: PromptFramework) => void;
  onTypeClick?: () => void;
  onDelete?: () => void;
  isUserOwned?: boolean;
}

const isGroupedPrompt = (item: GroupedPrompt | Prompt): item is GroupedPrompt => {
  return 'prompts' in item && Array.isArray(item.prompts);
};

export const PromptCard: React.FC<PromptCardProps> = ({ item, onClick, onFavorite, isFavorited, onMove, folders = [], onCategoryClick, onFrameworkClick, onTypeClick, onDelete, isUserOwned }) => {
  const [moveMenuOpen, setMoveMenuOpen] = useState(false);
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const moveMenuRef = useRef<HTMLDivElement>(null);
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  
  const categoryColorClass = PROMPT_CATEGORY_COLORS[item.category] || 'bg-slate-200 text-slate-800';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moveMenuRef.current && !moveMenuRef.current.contains(event.target as Node)) {
        setMoveMenuOpen(false);
      }
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
    onFavorite?.();
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
    setOptionsMenuOpen(false);
  };

  const handleMove = (e: React.MouseEvent, folderId: string | null) => {
    e.stopPropagation();
    if (onMove && !isGroupedPrompt(item)) {
        onMove(item.id, folderId);
    }
    setMoveMenuOpen(false);
  };
  
  const toggleMoveMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOptionsMenuOpen(false);
    setMoveMenuOpen(prev => !prev);
  }
  
  const toggleOptionsMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMoveMenuOpen(false);
    setOptionsMenuOpen(prev => !prev);
  }

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onCategoryClick?.(item.category);
  };
  
  const handleFrameworkClick = (e: React.MouseEvent, framework: PromptFramework) => {
    e.stopPropagation();
    e.preventDefault();
    onFrameworkClick?.(framework);
  };

  const frameworks = isGroupedPrompt(item) ? item.frameworks : (item.framework ? [item.framework] : []);
  
  const iconId = isGroupedPrompt(item)
    ? item.prompts[0]?.id
    : (item as Prompt).originalPublicId || item.id;
  const icon = (iconId && PROMPT_ICONS[iconId]) ? PROMPT_ICONS[iconId] : '📝';
  const isUserSubmitted = isGroupedPrompt(item) && item.prompts[0] && !item.prompts[0].originalPublicId;


  const isMovable = onMove && !isGroupedPrompt(item);
  
  const categoryColor = PROMPT_CATEGORY_COLORS[item.category]?.split(' ')[0].replace('bg-', 'border-') || 'border-slate-300';

  return (
    <article 
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-1.5 ${categoryColor.replace('border-', 'bg-')}`}></div>
      <div className="p-5 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center bg-slate-100 rounded-lg">
                <span className="text-3xl" role="img" aria-label="prompt icon">{icon}</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <button 
                        onClick={onCategoryClick ? handleCategoryClick : undefined} 
                        disabled={!onCategoryClick} 
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block ${categoryColorClass} ${onCategoryClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                    >
                        {item.category}
                    </button>
                    {isUserSubmitted && <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-800">Community</span>}
                    {'version' in item && <span className="text-xs font-mono bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">v{item.version}</span>}
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4 line-clamp-3 leading-relaxed">{item.description}</p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/80 flex justify-between items-center">
            <div className="flex items-center gap-1.5 flex-wrap">
                {frameworks.map(fw => (
                    <button
                        key={fw}
                        onClick={onFrameworkClick ? (e) => handleFrameworkClick(e, fw) : undefined}
                        disabled={!onFrameworkClick}
                        className={`text-xs font-bold px-2 py-0.5 rounded ${PROMPT_FRAMEWORK_COLORS[fw] || 'bg-slate-200 text-slate-800'} ${onFrameworkClick ? 'cursor-pointer hover:ring-2 hover:ring-offset-1' : 'cursor-default'}`}
                    >
                        {fw}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-1">
              {isMovable && (
                  <div ref={moveMenuRef} className="relative">
                      <button onClick={toggleMoveMenu} title="Move to folder" className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                          <span className="material-symbols-outlined text-slate-500 text-xl leading-none">folder_open</span>
                      </button>
                      {moveMenuOpen && (
                          <div className="origin-bottom-right absolute right-0 bottom-full mb-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 animate-expand-in">
                              <div className="py-1">
                                  <button onClick={(e) => handleMove(e, null)} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                      All Prompts (Uncategorized)
                                  </button>
                                  {folders.map(folder => (
                                      <button key={folder.id} onClick={(e) => handleMove(e, folder.id)} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 truncate">
                                          {folder.name}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              )}
              {onFavorite && (
                  <button onClick={handleFavoriteClick} title={isFavorited ? "Remove from Favorites" : "Add to Favorites"} className="p-2 rounded-full hover:bg-amber-100 transition-colors">
                      <span className={`material-symbols-outlined text-xl leading-none ${isFavorited ? 'text-amber-500' : 'text-slate-400'}`} style={{fontVariationSettings: `'FILL' ${isFavorited ? 1 : 0}`}}>
                        star
                      </span>
                  </button>
              )}
               {onDelete && (
                  <div ref={optionsMenuRef} className="relative">
                    <button onClick={toggleOptionsMenu} title="More options" className="p-2 rounded-full hover:bg-slate-200 transition-colors">
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