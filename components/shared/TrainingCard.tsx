
import React, { useState, useRef, useEffect } from 'react';
import { TrainingModule, TrainingCategory } from '../../types';
import { TRAINING_CATEGORY_COLORS, TRAINING_CATEGORY_DISPLAY, TRAINING_CATEGORY_ICONS } from '../../constants';
import Tooltip from './Tooltip';

interface TrainingCardProps {
  module: TrainingModule;
  onClick?: () => void;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  onCategoryClick?: (category: TrainingCategory) => void;
  onDelete?: () => void;
  isUserOwned?: boolean;
}

const ICONS: Record<string, string> = {
    'google-prompting-essentials': 'assignment',
    'vibe-coding-intro': 'code',
    'master-chatgpt-prompt-guide': 'local_fire_department',
    '135-ai-tools-infographic': 'grid_view',
    'craft-framework-guide': 'architecture',
};

const TrainingCard: React.FC<TrainingCardProps> = ({ module, onClick, onFavorite, isFavorited, onCategoryClick, onDelete, isUserOwned }) => {
    const categoryColorClass = TRAINING_CATEGORY_COLORS[module.category] || 'bg-slate-200 text-slate-800';
    const displayCategory = TRAINING_CATEGORY_DISPLAY[module.category] || module.category;
    const iconName = ICONS[module.id] || TRAINING_CATEGORY_ICONS[module.category] || 'school';
    const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
    const optionsMenuRef = useRef<HTMLDivElement>(null);
    
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
        onFavorite?.(module.originalPublicId || module.id);
    };

    const handleCategoryClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onCategoryClick?.(module.category);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.();
        setOptionsMenuOpen(false);
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
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center bg-slate-100 rounded-lg">
                            <span className="material-symbols-outlined text-3xl text-emerald-600">{iconName}</span>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{module.title}</h3>
                            <Tooltip text={`Filter by Category: ${module.category}`} position="bottom">
                                <button 
                                    onClick={onCategoryClick ? handleCategoryClick : undefined} 
                                    disabled={!onCategoryClick} 
                                    className={`text-xs font-semibold mt-1.5 px-2.5 py-0.5 rounded-full inline-block ${categoryColorClass} ${onCategoryClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                                >
                                    {displayCategory}
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-4 line-clamp-3 leading-relaxed">{module.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/80 flex justify-end items-center gap-1">
                    {onFavorite && (
                        <Tooltip text={isFavorited ? "Remove from Favorites" : "Add to Favorites"}>
                            <button
                                onClick={handleFavoriteClick}
                                className="p-2 rounded-full hover:bg-amber-100 transition-colors"
                            >
                                <span className={`material-symbols-outlined text-xl leading-none ${isFavorited ? 'text-amber-500' : 'text-slate-400'}`} style={{fontVariationSettings: `'FILL' ${isFavorited ? 1 : 0}`}}>
                                    star
                                </span>
                            </button>
                        </Tooltip>
                    )}
                    {onDelete && (
                        <div ref={optionsMenuRef} className="relative">
                            <Tooltip text="More Options">
                                <button onClick={toggleOptionsMenu} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                                <span className="material-symbols-outlined text-slate-500 text-xl">more_vert</span>
                                </button>
                            </Tooltip>
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
        </article>
    );
};

export default TrainingCard;
