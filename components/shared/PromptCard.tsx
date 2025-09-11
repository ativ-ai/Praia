
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
}

const isGroupedPrompt = (item: GroupedPrompt | Prompt): item is GroupedPrompt => {
  return 'prompts' in item && Array.isArray(item.prompts);
};

export const PromptCard: React.FC<PromptCardProps> = ({ item, onClick, onFavorite, isFavorited, onMove, folders = [], onCategoryClick, onFrameworkClick, onTypeClick }) => {
  const [moveMenuOpen, setMoveMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const categoryColorClass = PROMPT_CATEGORY_COLORS[item.category] || 'bg-slate-200 text-slate-800';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMoveMenuOpen(false);
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

  const handleMove = (e: React.MouseEvent, folderId: string | null) => {
    e.stopPropagation();
    if (onMove && !isGroupedPrompt(item)) {
        onMove(item.id, folderId);
    }
    setMoveMenuOpen(false);
  };
  
  const toggleMoveMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMoveMenuOpen(prev => !prev);
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

  const handleTypeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onTypeClick?.();
  };

  const frameworks = isGroupedPrompt(item) ? item.frameworks : (item.framework ? [item.framework] : []);
  
  const iconId = isGroupedPrompt(item)
    ? item.prompts[0]?.id
    : (item as Prompt).originalPublicId || item.id;
  const icon = (iconId && PROMPT_ICONS[iconId]) ? PROMPT_ICONS[iconId] : '📝';

  const isMovable = onMove && !isGroupedPrompt(item);

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full" onClick={onClick}>
      <div className="p-5 flex-grow cursor-pointer">
        <div className="flex justify-between items-start gap-2">
            <div className="flex-grow flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-sky-100/70 rounded-full">
                    <span className="text-2xl text-sky-700" role="img" aria-label="prompt icon">{icon}</span>
                </div>
                <div className="flex-grow">
                    <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <button onClick={onCategoryClick ? handleCategoryClick : undefined} disabled={!onCategoryClick} className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColorClass} ${onCategoryClick ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-sky-400' : 'cursor-default'}`}>{item.category}</button>
                    </div>
                </div>
            </div>
          <div className="flex-shrink-0">
            <button onClick={onTypeClick ? handleTypeClick : undefined} disabled={!onTypeClick} className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${ITEM_TYPE_COLORS.prompt} ${onTypeClick ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-sky-400' : 'cursor-default'}`}>Prompt</button>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-4 line-clamp-3">{item.description}</p>
      </div>
      <div className="bg-slate-50 p-3 flex justify-between items-center rounded-b-lg mt-auto">
        <div className="flex items-center gap-2 flex-wrap">
            {frameworks.map(fw => (
                <button
                    key={fw}
                    onClick={onFrameworkClick ? (e) => handleFrameworkClick(e, fw) : undefined}
                    disabled={!onFrameworkClick}
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${PROMPT_FRAMEWORK_COLORS[fw] || 'bg-slate-200 text-slate-800'} ${onFrameworkClick ? 'cursor-pointer hover:ring-2 hover:ring-offset-1' : 'cursor-default'}`}
                >
                    {fw}
                </button>
            ))}
        </div>
        <div className="flex items-center gap-1">
            {isMovable && (
                <div ref={menuRef} className="relative">
                    <button onClick={toggleMoveMenu} title="Move to folder" className="p-1 rounded-full hover:bg-slate-200 transition-all duration-200 transform hover:scale-125 active:scale-100">
                        <span className="text-xl" role="img" aria-label="move to folder">📁</span>
                    </button>
                    {moveMenuOpen && (
                        <div className="origin-bottom-right absolute right-0 bottom-full mb-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                                <button onClick={(e) => handleMove(e, null)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    All Prompts (Uncategorized)
                                </button>
                                {folders.map(folder => (
                                    <button key={folder.id} onClick={(e) => handleMove(e, folder.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        {folder.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {onFavorite && (
                <button onClick={handleFavoriteClick} title={isFavorited ? "Remove from Favorites" : "Add to Favorites"} className="p-1 rounded-full hover:bg-amber-100 transition-all duration-200 transform hover:scale-125 active:scale-100">
                    <span className="text-xl" role="img" aria-label="favorite star">{isFavorited ? '⭐' : '☆'}</span>
                </button>
            )}
        </div>
      </div>
    </article>
  );
};
