
import React from 'react';
import { AITool, AIToolCategory } from '../../types';
import { AI_TOOL_CATEGORY_COLORS } from '../../constants';
import Icon from './Icon';

interface AIToolCardProps {
  tool: AITool;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  onClick?: () => void;
  onCategoryClick?: (category: AIToolCategory) => void;
}

const AIToolCard: React.FC<AIToolCardProps> = ({ tool, onFavorite, isFavorited, onClick, onCategoryClick }) => {
  const categoryColorClass = AI_TOOL_CATEGORY_COLORS[tool.category] || 'bg-slate-100 text-slate-800';
  const categoryBorderClass = categoryColorClass.split(' ')[0].replace('bg-', 'border-');

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

  return (
    <article 
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
        <div className={`h-1.5 ${categoryColorClass.split(' ')[0]}`}></div>
        <div className="p-5 flex-grow flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start gap-4">
                    <img src={tool.iconUrl} alt={`${tool.name} logo`} className="h-14 w-14 rounded-lg object-cover flex-shrink-0 border border-slate-200 bg-white" />
                    <div className="flex-grow">
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">{tool.name}</h3>
                        <button 
                            onClick={onCategoryClick ? handleCategoryClick : undefined} 
                            disabled={!onCategoryClick} 
                            className={`text-xs font-semibold mt-1.5 px-2.5 py-0.5 rounded-full inline-block ${categoryColorClass} ${onCategoryClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                        >
                            {tool.category}
                        </button>
                    </div>
                </div>
                <p className="text-sm text-slate-600 mt-4 line-clamp-3 leading-relaxed">{tool.description}</p>
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
                {onFavorite && (
                    <button onClick={handleFavoriteClick} title={isFavorited ? "Remove from Favorites" : "Add to Favorites"} className="p-2 rounded-full hover:bg-amber-100 transition-colors">
                        <span className={`material-symbols-outlined text-xl leading-none ${isFavorited ? 'text-amber-500' : 'text-slate-400'}`} style={{fontVariationSettings: `'FILL' ${isFavorited ? 1 : 0}`}}>
                            star
                        </span>
                    </button>
                )}
            </div>
        </div>
    </article>
  );
};

export default AIToolCard;