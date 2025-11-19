
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { GroupedPrompt, AITool, TrainingModule, Prompt, PromptFramework } from '../../types';
import { PUBLIC_PROMPTS, PUBLIC_AI_TOOLS, PUBLIC_TRAINING_MODULES, PROMPT_CATEGORY_COLORS, AI_TOOL_CATEGORY_COLORS, TRAINING_CATEGORY_COLORS, ITEM_TYPE_COLORS } from '../../constants';
import { usePrompts } from '../../hooks/usePrompts';
import { useAITools } from '../../hooks/useAITools';
import { useTraining } from '../../hooks/useTraining';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { useSEO } from '../../hooks/useSEO';
import Spinner from '../shared/Spinner';
import Icon from '../shared/Icon';

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const allGroupedPrompts = (() => {
    const groups: Record<string, Prompt[]> = {};
    PUBLIC_PROMPTS.forEach(prompt => {
      if (!groups[prompt.title]) {
        groups[prompt.title] = [];
      }
      groups[prompt.title].push(prompt);
    });

    return Object.values(groups).map((promptsInGroup): GroupedPrompt => {
      const firstPrompt = promptsInGroup[0];
      const groupId = slugify(firstPrompt.title);
      
      return {
        type: 'grouped-prompt',
        id: groupId,
        title: firstPrompt.title,
        description: firstPrompt.description,
        category: firstPrompt.category,
        prompts: promptsInGroup.sort((a,b) => (a.framework || '').localeCompare(b.framework || '')),
        frameworks: promptsInGroup.map(p => p.framework).filter((fw): fw is PromptFramework => !!fw),
        createdAt: Math.max(...promptsInGroup.map(p => p.createdAt || 0)),
      };
    });
})();

type DetailItem = GroupedPrompt | (AITool & { type: 'tool', title: string }) | (TrainingModule & { type: 'training' });

interface ItemDetailPageProps {
    isModal?: boolean;
    setModalTitle?: (title: string) => void;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ isModal = false, setModalTitle }) => {
    const { itemType, itemId } = useParams<{ itemType: 'prompt' | 'tool' | 'training', itemId: string }>();
    const navigate = useNavigate();
    const { userPublicPrompts } = usePrompts();

    const [item, setItem] = useState<DetailItem | null | undefined>(undefined);
    const [activePromptId, setActivePromptId] = useState<string>('');

    useEffect(() => {
        let foundItem: DetailItem | undefined;
        if (itemType === 'prompt') {
            foundItem = allGroupedPrompts.find(p => p.id === itemId);
            if (!foundItem) {
                const userPrompt = userPublicPrompts.find(p => p.historyId === itemId);
                if (userPrompt) {
                    foundItem = {
                        type: 'grouped-prompt',
                        id: userPrompt.historyId,
                        title: userPrompt.title,
                        description: userPrompt.description,
                        category: userPrompt.category,
                        prompts: [userPrompt],
                        frameworks: userPrompt.framework ? [userPrompt.framework] : [],
                        createdAt: userPrompt.createdAt,
                    };
                }
            }
        } else if (itemType === 'tool') {
            const tool = PUBLIC_AI_TOOLS.find(t => t.id === itemId);
            if (tool) {
                foundItem = { ...tool, type: 'tool', title: tool.name };
            }
        } else if (itemType === 'training') {
            const module = PUBLIC_TRAINING_MODULES.find(t => t.id === itemId);
            if (module) {
                foundItem = { ...module, type: 'training' };
            }
        }

        if (foundItem) {
            setItem(foundItem);
            if(setModalTitle) setModalTitle(foundItem.title);
        } else {
            setItem(null);
        }

        if (foundItem?.type === 'grouped-prompt' && foundItem.prompts.length > 0) {
            setActivePromptId(foundItem.prompts[0].id);
        }

    }, [itemType, itemId, setModalTitle, userPublicPrompts]);

    // Prepare schema data for SEO hook
    const schemaData = useMemo(() => {
        if (!item) return null;
        if(item.type === 'grouped-prompt') {
            const activePrompt = item.prompts.find(p => p.id === activePromptId) || item.prompts[0];
            return {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": `How to use the "${item.title}" prompt`,
                "description": item.description,
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Understand the Prompt",
                        "text": item.description
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Copy and Use the Prompt Text",
                        "text": activePrompt.promptText
                    }
                ]
            };
        } else if (item.type === 'tool') {
            return {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": item.name,
                "description": item.description,
                "applicationCategory": item.category,
                "url": item.link,
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            };
        } else if (item.type === 'training') {
             return {
                "@context": "https://schema.org",
                "@type": "LearningResource",
                "name": item.title,
                "description": item.description,
                "learningResourceType": item.category,
                "teaches": item.content.map(c => c.title).join(', ')
            };
        }
        return null;
    }, [item, activePromptId]);

    // SEO Hook
    useSEO({
        title: item ? item.title : (item === null ? 'Not Found' : 'Loading...'),
        description: item?.description,
        keywords: item ? ['category' in item ? item.category : ''] : [],
        schema: schemaData
    });


    const { user } = useAuth();
    const { addNotification } = useNotification();
    const { toggleFavoritePrompt, prompts: myPrompts } = usePrompts();
    const { toggleFavoriteTool, isToolFavorited } = useAITools();
    const { toggleFavoriteTraining, isTrainingFavorited } = useTraining();
    
    const myFavoritedPromptIds = useMemo(() => new Set(myPrompts.filter(p => p.isFavorited && p.originalPublicId).map(p => p.originalPublicId!)), [myPrompts]);

    const handleFavoritePrompt = (id: string) => {
        if(!user) {
            addNotification('Please log in to add favorites.', 'info');
            navigate('/login');
            return;
        }
        toggleFavoritePrompt(id);
    };

    const handleFavoriteTool = (id: string) => {
        if (!user) {
          addNotification('Please log in to add favorites.', 'info');
          navigate('/login');
          return;
        }
        toggleFavoriteTool(id);
    };
      
    const handleFavoriteTraining = (id: string) => {
        if (!user) {
          addNotification('Please log in to add favorites.', 'info');
          navigate('/login');
          return;
        }
        toggleFavoriteTraining(id);
    };
    
    const handleUseAsTemplate = (promptToEdit: Prompt) => {
        navigate('/prompt-studio', { state: { prompt: promptToEdit } });
    };

    const renderContent = () => {
        if (!item) return null;

        if (item.type === 'grouped-prompt') {
            const activePrompt = item.prompts.find(p => p.id === activePromptId);
            if (!activePrompt) return null;
    
            const isFavorited = myFavoritedPromptIds.has(activePrompt.id);
            const handleCopy = () => {
                navigator.clipboard.writeText(activePrompt.promptText);
                addNotification('Prompt copied to clipboard!', 'success');
            };
    
            const tabClasses = (prompt: Prompt) => `px-4 py-2 font-medium text-sm rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
                activePromptId === prompt.id
                ? 'border-sky-500 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`;
    
            return (
                <div>
                     {!isModal && (
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${ITEM_TYPE_COLORS.prompt}`}>Prompt</span>
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${PROMPT_CATEGORY_COLORS[item.category]}`}>{item.category}</span>
                        </div>
                     )}
                     {item.prompts.length > 1 && (
                      <div className="border-b border-slate-200">
                          <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Frameworks">
                              {item.prompts.map(p => (
                                  <button key={p.id} onClick={() => setActivePromptId(p.id)} className={tabClasses(p)}>
                                      {p.framework}
                                  </button>
                              ))}
                          </nav>
                      </div>
                    )}
                    <div className="pt-4">
                      <p className="text-base text-slate-600 mb-4">{activePrompt.description}</p>
                      <pre className="w-full bg-slate-800 text-slate-200 p-4 rounded-md font-mono text-sm whitespace-pre-wrap break-words overflow-x-auto">
                          {activePrompt.promptText}
                      </pre>
                      <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                          <div className="flex gap-2">
                              <button onClick={() => handleUseAsTemplate(activePrompt)} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                                  <span className="text-xl" role="img" aria-label="edit">✏️</span>
                                  Use as Template
                              </button>
                              <button onClick={handleCopy} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                                  <span className="text-xl" role="img" aria-label="copy">📋</span>
                                  Copy
                              </button>
                          </div>
                          <button onClick={() => handleFavoritePrompt(activePrompt.id)} className="bg-amber-100 text-amber-800 font-bold py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2">
                               <span className="text-xl" role="img" aria-label="favorite star">{isFavorited ? '⭐' : '☆'}</span>
                               {isFavorited ? 'Favorited' : 'Favorite'}
                          </button>
                      </div>
                    </div>
                </div>
            );
        }
    
        if (item.type === 'tool') {
            const isFavorited = isToolFavorited(item.id);
             return (
                <div>
                     {!isModal && (
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${ITEM_TYPE_COLORS.tool}`}>Tool</span>
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${AI_TOOL_CATEGORY_COLORS[item.category]}`}>{item.category}</span>
                        </div>
                     )}
                    <p className="text-base text-slate-600 mb-4">{item.description}</p>
                    
                    <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2">
                             Visit Tool <span className="text-base" role="img" aria-label="link">🔗</span>
                        </a>
                        <button onClick={() => handleFavoriteTool(item.id)} className="bg-amber-100 text-amber-800 font-bold py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2">
                            <span className="text-xl" role="img" aria-label="favorite star">{isFavorited ? '⭐' : '☆'}</span>
                             {isFavorited ? 'Favorited' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            );
        }
    
        if (item.type === 'training') {
            const isFavorited = isTrainingFavorited(item.id);
            return (
                <div className="space-y-4">
                    {!isModal && (
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${ITEM_TYPE_COLORS.training}`}>Training</span>
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${TRAINING_CATEGORY_COLORS[item.category]}`}>{item.category}</span>
                        </div>
                    )}
                    <p className="text-base text-slate-600 mb-4">{item.description}</p>
                    
                    <div className="space-y-4 mt-6 pt-4 border-t border-slate-200">
                        {item.content.map((contentItem) => (
                            <div key={contentItem.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <h4 className="font-semibold text-sky-800">{contentItem.title}</h4>
                                <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">{contentItem.details}</p>
                                {contentItem.mediaUrl && (
                                    <div className="mt-3">
                                        {contentItem.mediaType === 'image' ? (
                                            <a href={contentItem.mediaUrl} target="_blank" rel="noopener noreferrer">
                                                <img src={contentItem.mediaUrl} alt={contentItem.title} className="rounded-lg shadow-md border w-full hover:opacity-90 transition-opacity" />
                                            </a>
                                        ) : contentItem.mediaType === 'video' ? (
                                            <div className="aspect-video">
                                                <iframe
                                                    className="w-full h-full rounded-lg shadow-md border"
                                                    src={contentItem.mediaUrl}
                                                    title={contentItem.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        ) : null}
                                    </div>
                                )}
                                {contentItem.example && (
                                    <div className="mt-3 p-3 bg-slate-800 text-slate-200 rounded text-sm font-mono whitespace-pre-wrap break-words">
                                       <span className="font-bold text-amber-400 text-xs block mb-1 tracking-wider uppercase">Example</span>
                                       {contentItem.example}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
    
                    <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                        <button onClick={() => handleFavoriteTraining(item.id)} className="bg-amber-100 text-amber-800 font-bold py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2">
                            <span className="text-xl" role="img" aria-label="favorite star">{isFavorited ? '⭐' : '☆'}</span>
                            {isFavorited ? 'Favorited' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            );
        }
    
        return null;
    };
    
    if (item === undefined) {
        return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    }

    if (item === null) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                <span className="mx-auto text-5xl text-slate-400" role="img" aria-label="Not found">🤷</span>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">Item Not Found</h3>
                <p className="mt-1 text-base text-slate-500">The item you are looking for does not exist.</p>
                <div className="mt-6">
                    <Link to="/prompts" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700">
                        Back to Hub
                    </Link>
                </div>
            </div>
        );
    }

    if (isModal) {
        return renderContent();
    }
    
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">{item.title}</h1>
            {renderContent()}
        </div>
    );
};

export default ItemDetailPage;
