

import React from 'react';
import { TrainingModule, TrainingCategory } from '../../types';
import { TRAINING_CATEGORY_COLORS } from '../../constants';

interface TrainingCardProps {
  module: TrainingModule;
  onClick?: () => void;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  onCategoryClick?: (category: TrainingCategory) => void;
}

const ICONS: Record<string, string> = {
    'google-prompting-essentials': '📋',
    'vibe-coding-intro': '💻',
    'master-chatgpt-prompt-guide': '🔥',
    '135-ai-tools-infographic': '🧰',
    'craft-framework-guide': '👷',
};

const TrainingCard: React.FC<TrainingCardProps> = ({ module, onClick, onFavorite, isFavorited, onCategoryClick }) => {
    const categoryColorClass = TRAINING_CATEGORY_COLORS[module.category] || 'bg-slate-200 text-slate-800';
    const categoryBorderClass = categoryColorClass.split(' ')[0].replace('bg-', 'border-');
    const icon = ICONS[module.id] || '🎓';

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onFavorite?.(module.originalPublicId || module.id);
    };

    const handleCategoryClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onCategoryClick?.(module.category);
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
                        <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center bg-slate-100 rounded-lg">
                            <span className="text-3xl" role="img" aria-label="training icon">{icon}</span>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{module.title}</h3>
                            <button 
                                onClick={onCategoryClick ? handleCategoryClick : undefined} 
                                disabled={!onCategoryClick} 
                                className={`text-xs font-semibold mt-1.5 px-2.5 py-0.5 rounded-full inline-block ${categoryColorClass} ${onCategoryClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                            >
                                {module.category}
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-4 line-clamp-3 leading-relaxed">{module.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/80 flex justify-end items-center">
                    {onFavorite && (
                        <button
                            onClick={handleFavoriteClick}
                            title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                            className="p-2 rounded-full hover:bg-amber-100 transition-colors"
                        >
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

export default TrainingCard;