
import React from 'react';
import { AITool, AIToolCategory } from '../../types';
import { AI_TOOL_CATEGORY_COLORS, ITEM_TYPE_COLORS } from '../../constants';

interface AIToolCardProps {
  tool: AITool;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  onClick?: () => void;
  onCategoryClick?: (category: AIToolCategory) => void;
  onTypeClick?: () => void;
}

const AIToolCard: React.FC<AIToolCardProps> = ({ tool, onFavorite, isFavorited, onClick, onCategoryClick, onTypeClick }) => {
  const categoryColorClass = AI_TOOL_CATEGORY_COLORS[tool.category] || 'bg-sky-100 text-sky-800';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(tool.originalPublicId || tool.id);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onCategoryClick?.(tool.category);
  };

  const handleTypeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onTypeClick?.();
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full" onClick={onClick}>
      <div className="p-5 flex-grow cursor-pointer">
        <div className="flex justify-between items-start gap-2">
            <div className="flex-grow flex items-start gap-4">
                <img src={tool.iconUrl} alt={`${tool.name} logo`} className="h-10 w-10 rounded-full object-cover flex-shrink-0 border border-slate-200 bg-white" />
                <div className="flex-grow">
                    <h3 className="text-lg font-bold text-slate-800">{tool.name}</h3>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <button onClick={onCategoryClick ? handleCategoryClick : undefined} disabled={!onCategoryClick} className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColorClass} ${onCategoryClick ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-sky-400' : 'cursor-default'}`}>{tool.category}</button>
                    </div>
                </div>
            </div>
          <div className="flex-shrink-0">
            <button onClick={onTypeClick ? handleTypeClick : undefined} disabled={!onTypeClick} className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${ITEM_TYPE_COLORS.tool} ${onTypeClick ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-sky-400' : 'cursor-default'}`}>Tool</button>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-4 line-clamp-3">{tool.description}</p>
      </div>
      <div className="bg-slate-50 p-3 flex justify-between items-center rounded-b-lg mt-auto">
        <a 
            href={tool.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={handleLinkClick}
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
        >
            Visit Tool <span className="text-base" role="img" aria-label="link">🔗</span>
        </a>
         {onFavorite && (
            <button onClick={handleFavoriteClick} title={isFavorited ? "Remove from Favorites" : "Add to Favorites"} className="p-1 rounded-full hover:bg-amber-100 transition-all duration-200 flex-shrink-0 transform hover:scale-125 active:scale-100">
                <span className="text-xl" role="img" aria-label="favorite star">{isFavorited ? '⭐' : '☆'}</span>
            </button>
        )}
      </div>
    </article>
  );
};

export default AIToolCard;
