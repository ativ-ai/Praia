

import React from 'react';
import { TrainingModule, TrainingCategory } from '../../types';
import { TRAINING_CATEGORY_COLORS, ITEM_TYPE_COLORS } from '../../constants';

interface TrainingCardProps {
  module: TrainingModule;
  onClick?: () => void;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  onCategoryClick?: (category: TrainingCategory) => void;
  onTypeClick?: () => void;
}

const ICONS: Record<string, string> = {
    // Fundamentals
    'google-prompting-essentials': '📋',
    'vibe-coding-intro': '💻',
    'art-of-asking': '❓',
    'prompt-engineering-guide': '🧪',
    'understanding-context-windows': '🪟',
    'gpe-responsible-ai': '🛡️',
    'cs-ai-terminology': '📖',
    // Advanced
    'prompt-pattern-catalog': '🧩',
    'chain-of-thought': '🧠',
    'mastering-parameters': '🎛️',
    'rag-technique': '📚',
    'gpe-refinement': '🔬',
    'gpe-multimodal': '🖼️',
    'cs-prompting-techniques-2': '🛠️',
    'cheatsheet-techniques': '📜',
    'anthropic-prompting-guide': '🅰️',
    'anthropic-interactive-tutorial': '🧑‍💻',
    'brightpool-prompt-eng-examples': '🧑‍🏫',
    'master-chatgpt-prompt-guide': '🔥',
    '135-ai-tools-infographic': '🧰',
    // Frameworks
    'intro-to-frameworks': '🏗️',
    'create-framework-deep-dive': '🛠️',
    'gpe-framework': '🏛️',
    'framework-craft': '👷',
    'craft-framework-guide': '👷',
    // Business & Marketing
    'ai-for-customer-service': '🎧',
    'market-research-with-ai': '📈',
    'edx-workplace-impact': '💼',
    'ipsos-global-attitudes': '🌍',
    'ai-pm-roadmap': '🗺️',
    // Creative & Media
    'creative-writing-partner': '✍️',
    'ai-for-video-scripts': '🎬',
    // Education
    'edu-activities': '🤸',
    'edu-lesson-plans': '🗒️',
    'edu-assessments': '✅',
    'edu-communication': '📨',
    'ai-skills-2025': '🚀',
    // OCR
    'agentic-ai-layers': '🧬',
    // New
    'future-of-work-jobs': '🧑‍💼',
    'lyra-methodology-training': '✨',
};

const TrainingCard: React.FC<TrainingCardProps> = ({ module, onClick, onFavorite, isFavorited, onCategoryClick, onTypeClick }) => {
    const categoryColorClass = TRAINING_CATEGORY_COLORS[module.category] || 'bg-slate-200 text-slate-800';
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

    const handleTypeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onTypeClick?.();
    };

    return (
        <article
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            onClick={onClick}
        >
            <div className="p-5 flex-grow cursor-pointer">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-grow flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-sky-100/70 rounded-full">
                            <span className="text-2xl text-sky-700" role="img" aria-label="training icon">{icon}</span>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-slate-800">{module.title}</h3>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <button
                                    onClick={onCategoryClick ? handleCategoryClick : undefined}
                                    disabled={!onCategoryClick}
                                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${categoryColorClass} ${onCategoryClick ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-sky-400' : 'cursor-default'}`}
                                >
                                    {module.category}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <button
                            onClick={onTypeClick ? handleTypeClick : undefined}
                            disabled={!onTypeClick}
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${ITEM_TYPE_COLORS.training} ${onTypeClick ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-sky-400' : 'cursor-default'}`}
                        >
                            Training
                        </button>
                    </div>
                </div>
                <p className="text-sm text-slate-600 mt-4 line-clamp-3">{module.description}</p>
            </div>
            <div className="bg-slate-50 p-3 flex justify-end items-center rounded-b-lg mt-auto">
                {onFavorite && (
                    <button
                        onClick={handleFavoriteClick}
                        title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                        className="p-1 rounded-full hover:bg-amber-100 transition-all duration-200 flex-shrink-0 transform hover:scale-125 active:scale-100"
                    >
                        <span className="text-xl" role="img" aria-label="favorite star">{isFavorited ? '⭐' : '☆'}</span>
                    </button>
                )}
            </div>
        </article>
    );
};

export default TrainingCard;