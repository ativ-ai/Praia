
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { usePrompts } from '../../hooks/usePrompts';
import { useAITools } from '../../hooks/useAITools';
import { useTraining } from '../../hooks/useTraining';
import { useAuth } from '../../hooks/useAuth';
import { Prompt, AITool, TrainingModule, GroupedPrompt } from '../../types';
import { PromptCard } from '../shared/PromptCard';
import AIToolCard from '../shared/AIToolCard';
import TrainingCard from '../shared/TrainingCard';
import Spinner from '../shared/Spinner';
import Modal from '../shared/Modal';
import { PUBLIC_PROMPTS, PUBLIC_TRAINING_MODULES, PUBLIC_AI_TOOLS } from '../../constants';
import { useNotification } from '../../hooks/useNotification';
import usePageTitle from '../../hooks/usePageTitle';
import Icon from '../shared/Icon';

type PraiaItem = (Prompt & { itemType: 'prompt' }) | (AITool & { itemType: 'tool' }) | (TrainingModule & { itemType: 'training' });

const MyPraia: React.FC = () => {
  usePageTitle('My Praia');
  const { prompts, folders, loading: promptsLoading, getPromptsInFolder, createFolder, deletePrompt, toggleFavoritePrompt, movePrompt } = usePrompts();
  const { tools, loading: toolsLoading, toggleFavoriteTool, deleteTool, saveTool, isToolFavorited } = useAITools();
  const { trainings, loading: trainingsLoading, toggleFavoriteTraining, deleteTraining, saveTraining, isTrainingFavorited } = useTraining();
  const { isAdmin } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'prompts' | 'tools' | 'training'>('prompts');
  const { addNotification } = useNotification();

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  
  const [selectedItem, setSelectedItem] = useState<PraiaItem | null>(null);
  const navigate = useNavigate();

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName('');
    }
  };
  
  const promptsToShow = getPromptsInFolder(selectedFolderId);
  
  const loading = useMemo(() => promptsLoading || toolsLoading || trainingsLoading, [promptsLoading, toolsLoading, trainingsLoading]);

  const handleExport = () => {
    let dataToExport: any[] = [];
    let headers: string[] = [];
    let filename = '';

    const escapeCSV = (field: any): string => {
        if (field === null || field === undefined) {
            return '';
        }
        const str = String(field);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    switch (activeTab) {
      case 'prompts':
        if (promptsToShow.length === 0) {
            addNotification('No prompts to export.', 'info');
            return;
        }
        headers = ['id', 'title', 'description', 'category', 'promptText', 'framework', 'frameworkData', 'folderId', 'isFavorited', 'originalPublicId'];
        dataToExport = promptsToShow.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            category: p.category,
            promptText: p.promptText,
            framework: p.framework || '',
            frameworkData: JSON.stringify(p.frameworkData || {}),
            folderId: p.folderId || '',
            isFavorited: p.isFavorited || false,
            originalPublicId: p.originalPublicId || ''
        }));
        filename = 'my_praia_prompts.csv';
        break;
      case 'tools':
        if (tools.length === 0) {
            addNotification('No tools to export.', 'info');
            return;
        }
        headers = ['id', 'name', 'description', 'category', 'link', 'iconUrl', 'isFavorited', 'originalPublicId'];
        dataToExport = tools.map(t => ({
            id: t.id,
            name: t.name,
            description: t.description,
            category: t.category,
            link: t.link,
            iconUrl: t.iconUrl,
            isFavorited: t.isFavorited || false,
            originalPublicId: t.originalPublicId || ''
        }));
        filename = 'my_praia_tools.csv';
        break;
      case 'training':
        if (trainings.length === 0) {
            addNotification('No training to export.', 'info');
            return;
        }
        headers = ['id', 'title', 'description', 'category', 'content', 'isFavorited', 'originalPublicId'];
        dataToExport = trainings.map(t => {
            const fullModule = t.originalPublicId ? PUBLIC_TRAINING_MODULES.find(m => m.id === t.originalPublicId) || t : t;
            return {
                id: t.id,
                title: t.title,
                description: t.description,
                category: t.category,
                content: JSON.stringify(fullModule.content),
                isFavorited: t.isFavorited || false,
                originalPublicId: t.originalPublicId || ''
            };
        });
        filename = 'my_praia_training.csv';
        break;
      default:
        return;
    }

    const csvContent = [
        headers.join(','),
        ...dataToExport.map(row => 
            headers.map(header => escapeCSV(row[header])).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addNotification(`${filename} downloaded.`, 'success');
  };

  if (loading) {
      return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }
  
  const tabClasses = (tabName: 'prompts' | 'tools' | 'training') => 
    `px-4 py-2 font-medium text-sm rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
        activeTab === tabName
        ? 'border-sky-500 text-sky-600'
        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
    }`;
    
  const getModalTitle = (item: PraiaItem | null): string => {
    if (!item) return '';
    return 'name' in item ? item.name : item.title;
  }

  const handleDeleteItem = async (item: PraiaItem) => {
    if (window.confirm(`Are you sure you want to delete "${'name' in item ? item.name : item.title}"?`)) {
      if (item.itemType === 'prompt') {
        if (item.isFavorited) {
          await toggleFavoritePrompt(item.originalPublicId!);
        } else {
          await deletePrompt(item.id);
        }
      } else if (item.itemType === 'tool') {
        if (item.isFavorited) {
          await toggleFavoriteTool(item.originalPublicId!);
        } else {
          await deleteTool(item.id);
        }
      } else if (item.itemType === 'training') {
        if (item.isFavorited) {
          await toggleFavoriteTraining(item.originalPublicId!);
        } else {
          await deleteTraining(item.id);
        }
      }
      setSelectedItem(null);
    }
  };

  const renderModalContent = () => {
    if (!selectedItem) return null;

    const isUserOwned = !selectedItem.originalPublicId;
    const canEditAndDelete = isUserOwned || isAdmin;

    const handleCopy = () => {
      if ('promptText' in selectedItem) {
          navigator.clipboard.writeText(selectedItem.promptText);
          addNotification('Prompt copied to clipboard!', 'success');
      }
    };
    
    return (
        <div>
            <p className="text-base text-slate-600 mb-4">{selectedItem.description}</p>
            {selectedItem.itemType === 'prompt' && (
                <pre className="w-full bg-slate-800 text-slate-200 p-4 rounded-md font-mono text-sm whitespace-pre-wrap break-words overflow-x-auto">
                    {selectedItem.promptText}
                </pre>
            )}
            {selectedItem.itemType === 'training' && (
                <div className="space-y-4 mt-6 pt-4 border-t border-slate-200">
                    {selectedItem.content?.map((contentItem) => (
                        <div key={contentItem.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="font-semibold text-sky-800">{contentItem.title}</h4>
                            <p className="mt-1 text-sm text-slate-700 whitespace-pre-wrap">{contentItem.details}</p>
                            {contentItem.mediaUrl && (
                                <div className="mt-3">
                                    {contentItem.mediaType === 'image' ? (
                                        <img src={contentItem.mediaUrl} alt={contentItem.title} className="rounded-lg shadow-md border w-full" />
                                    ) : contentItem.mediaType === 'video' ? (
                                        <div className="aspect-video">
                                            <iframe
                                                className="w-full h-full rounded-lg"
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
            )}
             <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-2">
                <div className="flex gap-2 flex-wrap">
                    {selectedItem.itemType === 'tool' && (
                        <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2">
                            Visit Tool <span role="img" aria-label="link">🔗</span>
                        </a>
                    )}
                    {canEditAndDelete && (
                        <button onClick={() => {navigate(`/${selectedItem.itemType}-studio/${selectedItem.id}`); setSelectedItem(null);}} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                           <span role="img" aria-label="edit">✏️</span> Edit
                        </button>
                    )}
                    {selectedItem.itemType === 'prompt' && (
                        <>
                         <button onClick={() => {navigate('/prompt-studio', { state: { prompt: selectedItem } }); setSelectedItem(null);}} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                            <span role="img" aria-label="template">📝</span> Use as Template
                        </button>
                        <button onClick={handleCopy} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                            <span role="img" aria-label="copy">📋</span> Copy
                        </button>
                        </>
                    )}
                </div>
                 <div className="flex gap-2 flex-wrap">
                    {canEditAndDelete ? (
                        <button onClick={() => handleDeleteItem(selectedItem)} className="bg-red-100 text-red-700 font-bold py-2 px-4 rounded-lg hover:bg-red-200 transition-colors">
                            Delete
                        </button>
                    ): (
                         <button onClick={() => handleDeleteItem(selectedItem)} className="bg-amber-100 text-amber-800 font-bold py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2">
                            <span role="img" aria-label="unfavorite">⭐</span> Remove Favorite
                        </button>
                    )}
                 </div>
            </div>
        </div>
    );
  };
  

  const newContentLinks = [
      { to: "/prompt-studio", label: "New Prompt", icon: "📝" },
      { to: "/tool-studio", label: "New Tool", icon: "🛠️" },
      { to: "/training-studio", label: "New Training", icon: "🎓" },
  ];

  return (
    <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">My Praia</h1>
                <p className="mt-2 text-xl text-slate-600">Your personal library of prompts, tools, and training.</p>
            </div>
            <div className="flex-shrink-0 flex flex-wrap gap-2">
                {newContentLinks.map(link => (
                    <Link key={link.to} to={link.to} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700">
                        <span className="-ml-1 mr-2" role="img" aria-label="add">{link.icon}</span>
                        {link.label}
                    </Link>
                ))}
                <button
                    onClick={handleExport}
                    disabled={
                        (activeTab === 'prompts' && promptsToShow.length === 0) ||
                        (activeTab === 'tools' && tools.length === 0) ||
                        (activeTab === 'training' && trainings.length === 0)
                    }
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-sky-700 bg-sky-100 hover:bg-sky-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Icon name="download" className="-ml-1 mr-2 h-5 w-5" />
                    Export CSV
                </button>
            </div>
        </div>
        
        <div className="mb-6">
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    <button onClick={() => setActiveTab('prompts')} className={tabClasses('prompts')}>My Prompts ({prompts.length})</button>
                    <button onClick={() => setActiveTab('tools')} className={tabClasses('tools')}>My Tools ({tools.length})</button>
                    <button onClick={() => setActiveTab('training')} className={tabClasses('training')}>My Training ({trainings.length})</button>
                </nav>
            </div>
        </div>

        {activeTab === 'prompts' && (
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-1/4 xl:w-1/5 flex-shrink-0">
                    <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Folders</h2>
                        <nav className="space-y-1">
                            <button 
                                onClick={() => setSelectedFolderId(null)}
                                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedFolderId === null ? 'bg-sky-100 text-sky-800' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                <span className="mr-3 text-xl" role="img" aria-label="folder">📁</span>
                                All Prompts
                            </button>
                            {folders.map(folder => (
                                <button 
                                    key={folder.id}
                                    onClick={() => setSelectedFolderId(folder.id)}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedFolderId === folder.id ? 'bg-sky-100 text-sky-800' : 'text-slate-600 hover:bg-slate-100'}`}
                                >
                                    <span className="mr-3 text-xl" role="img" aria-label="folder">📁</span>
                                    <span className="truncate">{folder.name}</span>
                                </button>
                            ))}
                        </nav>
                        <form onSubmit={handleCreateFolder} className="mt-4 pt-4 border-t border-slate-200">
                            <input
                                type="text"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="New folder name..."
                                className="w-full text-sm border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                            />
                            <button type="submit" className="w-full mt-2 bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-300 transition-colors">
                                Create Folder
                            </button>
                        </form>
                    </div>
                </aside>
                <main className="flex-grow">
                    {promptsToShow.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {promptsToShow.map((prompt: Prompt) => (
                                <PromptCard 
                                    key={prompt.id} 
                                    item={prompt} 
                                    onClick={() => setSelectedItem({...prompt, itemType: 'prompt'})}
                                    onFavorite={prompt.originalPublicId ? () => toggleFavoritePrompt(prompt.originalPublicId!) : undefined}
                                    isFavorited={!!prompt.isFavorited}
                                    onMove={movePrompt}
                                    folders={folders}
                                />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                            <span className="mx-auto text-5xl text-slate-400" role="img" aria-label="folder">📁</span>
                            <h3 className="mt-2 text-lg font-medium text-slate-900">
                                {selectedFolderId ? 'This folder is empty' : 'No Prompts Yet'}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                {selectedFolderId ? 'Move prompts here or create a new one.' : 'Create your first prompt or add one from the AI Community Hub.'}
                            </p>
                        </div>
                    )}
                </main>
            </div>
        )}
        
        {activeTab === 'tools' && (
             <main>
                {tools.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tools.map((tool) => (
                            <AIToolCard 
                                key={tool.id} 
                                tool={tool} 
                                onClick={() => setSelectedItem({...tool, itemType: 'tool'})}
                                onFavorite={tool.originalPublicId ? () => toggleFavoriteTool(tool.originalPublicId!) : undefined}
                                isFavorited={!!tool.isFavorited}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                        <span className="mx-auto text-5xl text-slate-400" role="img" aria-label="tools">🛠️</span>
                        <h3 className="mt-2 text-lg font-medium text-slate-900">No Tools Saved</h3>
                        <p className="mt-1 text-sm text-slate-500">
                           Create your first tool, or discover and favorite new AI tools in the <Link to="/prompts" className="text-sky-600 font-medium hover:underline">Community Hub</Link>.
                        </p>
                    </div>
                )}
            </main>
        )}

        {activeTab === 'training' && (
             <main>
                {trainings.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainings.map((module) => {
                           // For favorites, we only store a stub. We need to get full data from constants.
                           const fullModuleData = module.originalPublicId ? PUBLIC_TRAINING_MODULES.find(m => m.id === module.originalPublicId) : module;
                           if (!fullModuleData) return null;
                           // Combine the favorite data (like id) with the full public data
                           const displayModule = { ...fullModuleData, ...module };

                           return (
                               <TrainingCard 
                                   key={module.id} 
                                   module={displayModule}
                                   onClick={() => setSelectedItem({...displayModule, itemType: 'training'})}
                                   onFavorite={module.originalPublicId ? () => toggleFavoriteTraining(module.originalPublicId!) : undefined}
                                   isFavorited={!!module.isFavorited}
                               />
                           )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                        <span className="mx-auto text-5xl text-slate-400" role="img" aria-label="academic cap">🎓</span>
                        <h3 className="mt-2 text-lg font-medium text-slate-900">No Training Saved</h3>
                        <p className="mt-1 text-sm text-slate-500">
                           Create a module, or explore the <Link to="/prompts" className="text-sky-600 font-medium hover:underline">Community Hub</Link> to find and save helpful training.
                        </p>
                    </div>
                )}
            </main>
        )}
        <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={getModalTitle(selectedItem)}
        >
          {renderModalContent()}
        </Modal>
    </div>
  );
};

export default MyPraia;
