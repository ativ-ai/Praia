
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { usePrompts } from '../../hooks/usePrompts';
import { useAITools } from '../../hooks/useAITools';
import { useTraining } from '../../hooks/useTraining';
import { useAuth } from '../../hooks/useAuth';
import { Prompt, AITool, TrainingModule } from '../../types';
import { PromptCard } from '../shared/PromptCard';
import AIToolCard from '../shared/AIToolCard';
import TrainingCard from '../shared/TrainingCard';
import Spinner from '../shared/Spinner';
import Modal from '../shared/Modal';
import { PUBLIC_TRAINING_MODULES } from '../../constants';
import { useNotification } from '../../hooks/useNotification';
import usePageTitle from '../../hooks/usePageTitle';
import Icon from '../shared/Icon';

type PraiaItem = (Prompt & { itemType: 'prompt' }) | (AITool & { itemType: 'tool' }) | (TrainingModule & { itemType: 'training' });

const MyPraia: React.FC = () => {
  usePageTitle('My Praia');
  const { prompts, folders, loading: promptsLoading, getPromptsInFolder, createFolder, deletePrompt, toggleFavoritePrompt, movePrompt, getPromptHistory, revertToVersion } = usePrompts();
  const { tools, loading: toolsLoading, toggleFavoriteTool, deleteTool } = useAITools();
  const { trainings, loading: trainingsLoading, toggleFavoriteTraining, deleteTraining } = useTraining();
  const { user, logout, isAdmin } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'prompts' | 'tools' | 'training' | 'profile'>('prompts');
  const { addNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  
  const [selectedItem, setSelectedItem] = useState<PraiaItem | null>(null);
  const [historyVisible, setHistoryVisible] = useState(false);
  const navigate = useNavigate();

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName('');
    }
  };
  
  const filteredPrompts = useMemo(() => {
      const promptsInFolder = getPromptsInFolder(selectedFolderId);
      if (!searchTerm) return promptsInFolder;
      return promptsInFolder.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [getPromptsInFolder, selectedFolderId, searchTerm]);

  const filteredTools = useMemo(() => {
    if (!searchTerm) return tools;
    return tools.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [tools, searchTerm]);

  const filteredTrainings = useMemo(() => {
    if (!searchTerm) return trainings;
    return trainings.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [trainings, searchTerm]);
  
  const loading = useMemo(() => promptsLoading || toolsLoading || trainingsLoading, [promptsLoading, toolsLoading, trainingsLoading]);

  const handleOpenModal = (item: PraiaItem) => {
    setSelectedItem(item);
    setHistoryVisible(false); // Reset history view on open
  };

  const handleRevert = async (versionId: string) => {
    await revertToVersion(versionId);
    setSelectedItem(null); // Close modal on revert
  };

  if (loading) {
      return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }
  
  const tabClasses = (tabName: 'prompts' | 'tools' | 'training' | 'profile') => 
    `px-4 py-2.5 font-bold text-sm rounded-lg transition-all transform hover:scale-105 whitespace-nowrap flex items-center gap-2 ${
        activeTab === tabName
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-slate-600 hover:bg-slate-200'
    }`;
    
  const getModalTitle = (item: PraiaItem | null): string => {
    if (!item) return '';
    return 'name' in item ? item.name : item.title;
  }

  const handleDeleteItem = async (item: PraiaItem) => {
    const confirmMessage = item.itemType === 'prompt' 
        ? `Are you sure you want to delete "${item.title}" and its entire version history?`
        : `Are you sure you want to delete "${'name' in item ? item.name : item.title}"?`;
    
    if (window.confirm(confirmMessage)) {
      if (item.itemType === 'prompt') {
        if (item.isFavorited && item.originalPublicId) {
          await toggleFavoritePrompt(item.originalPublicId);
        } else {
          await deletePrompt(item.id);
        }
      } else if (item.itemType === 'tool') {
        if (item.isFavorited && item.originalPublicId) {
          await toggleFavoriteTool(item.originalPublicId);
        } else {
          await deleteTool(item.id);
        }
      } else if (item.itemType === 'training') {
        if (item.isFavorited && item.originalPublicId) {
          await toggleFavoriteTraining(item.originalPublicId);
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
            <p className="text-base text-slate-600 mb-4 leading-relaxed">{selectedItem.description}</p>
            {selectedItem.itemType === 'prompt' && (
                <>
                <pre className="w-full bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap break-words overflow-x-auto">
                    {selectedItem.promptText}
                </pre>
                <div className="mt-4 border-t border-slate-200 pt-4">
                    <button onClick={() => setHistoryVisible(!historyVisible)} className="flex justify-between items-center w-full font-bold text-slate-700 hover:bg-slate-100 p-2 rounded-md">
                        <span>Version History ({getPromptHistory(selectedItem.historyId).length})</span>
                        <Icon name={historyVisible ? 'chevronUp' : 'chevronDown'} className="w-5 h-5 transition-transform" />
                    </button>
                    {historyVisible && (
                        <div className="mt-2 space-y-2 max-h-60 overflow-y-auto pr-2 animate-fade-in">
                            {getPromptHistory(selectedItem.historyId).map(version => (
                                <div key={version.id} className="p-3 bg-slate-100 rounded-md flex justify-between items-center text-sm">
                                    <div>
                                        <span className={`font-bold ${version.isLatest ? 'text-indigo-600' : ''}`}>Version {version.version} {version.isLatest && '(Latest)'}</span>
                                        <span className="text-xs text-slate-500 ml-2">
                                            {new Date(version.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => handleRevert(version.id)}
                                        disabled={version.isLatest}
                                        className="text-xs font-bold bg-white border border-slate-300 px-2.5 py-1 rounded-md hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Revert
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                </>
            )}
            {selectedItem.itemType === 'training' && (
                <div className="space-y-4 mt-6 pt-4 border-t border-slate-200">
                    {selectedItem.content?.map((contentItem) => (
                        <div key={contentItem.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="font-semibold text-indigo-800">{contentItem.title}</h4>
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
                                <div className="mt-3 p-3 bg-slate-900 text-slate-200 rounded text-sm font-mono whitespace-pre-wrap break-words">
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
                        <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                            Visit Tool <Icon name="link" className="w-5 h-5" />
                        </a>
                    )}
                    {canEditAndDelete && (
                        <button onClick={() => {navigate(`/${selectedItem.itemType}-studio/${selectedItem.id}`); setSelectedItem(null);}} className="bg-slate-100 text-slate-700 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                           <Icon name="pencil" className="w-5 h-5" /> Edit
                        </button>
                    )}
                    {selectedItem.itemType === 'prompt' && (
                        <>
                         <button onClick={() => {navigate('/prompt-studio', { state: { prompt: selectedItem } }); setSelectedItem(null);}} className="bg-slate-100 text-slate-700 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                            <Icon name="edit" className="w-5 h-5" /> Use as Template
                        </button>
                        <button onClick={handleCopy} className="bg-slate-100 text-slate-700 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                            <Icon name="copy" className="w-5 h-5" /> Copy
                        </button>
                        </>
                    )}
                </div>
                 <div className="flex gap-2 flex-wrap">
                    {canEditAndDelete ? (
                        <button onClick={() => handleDeleteItem(selectedItem)} className="bg-red-100 text-red-700 font-bold py-2.5 px-5 rounded-lg hover:bg-red-200 transition-colors">
                            Delete
                        </button>
                    ): (
                         <button onClick={() => handleDeleteItem(selectedItem)} className="bg-amber-100 text-amber-800 font-bold py-2.5 px-5 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2">
                           <span className="material-symbols-outlined" style={{fontVariationSettings: `'FILL' 1`}}>star</span> Remove Favorite
                        </button>
                    )}
                 </div>
            </div>
        </div>
    );
  };
  

  const newContentLinks = [
      { to: "/prompt-studio", label: "New Prompt", icon: "edit" },
      { to: "/tool-studio", label: "New Tool", icon: "construction" },
      { to: "/training-studio", label: "New Training", icon: "draw" },
  ];

  return (
    <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-6xl">My Praia</h1>
                <p className="mt-2 text-xl text-slate-600">Your personal library of prompts, tools, and training.</p>
            </div>
            <div className="flex-shrink-0 flex flex-wrap gap-2">
                {newContentLinks.map(link => (
                    <Link key={link.to} to={link.to} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:scale-105">
                        <span className="material-symbols-outlined -ml-1 mr-2">{link.icon}</span>
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
        
        <div className="mb-6 bg-slate-100 p-2 rounded-xl inline-flex flex-wrap items-center gap-2 border border-slate-200">
            <button onClick={() => setActiveTab('prompts')} className={tabClasses('prompts')}><Icon name="lightbulb" className="w-5 h-5" /> Prompts ({prompts.length})</button>
            <button onClick={() => setActiveTab('tools')} className={tabClasses('tools')}><Icon name="cpuChip" className="w-5 h-5" /> Tools ({tools.length})</button>
            <button onClick={() => setActiveTab('training')} className={tabClasses('training')}><Icon name="academicCap" className="w-5 h-5" /> Training ({trainings.length})</button>
            <button onClick={() => setActiveTab('profile')} className={tabClasses('profile')}><span className="material-symbols-outlined">person</span> Profile</button>
        </div>

        {activeTab !== 'profile' && (
             <div className="relative mb-6">
                 <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                 <input
                     type="text"
                     placeholder={`Search your ${activeTab}...`}
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full max-w-lg pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base shadow-sm placeholder-slate-400"
                 />
             </div>
        )}

        {activeTab === 'prompts' && (
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-1/4 xl:w-1/5 flex-shrink-0">
                    <div className="bg-white p-4 rounded-xl shadow-md sticky top-28">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Folders</h2>
                        <nav className="space-y-1">
                            <button 
                                onClick={() => setSelectedFolderId(null)}
                                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedFolderId === null ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                <span className="material-symbols-outlined mr-3 text-xl">folder</span>
                                All Prompts
                            </button>
                            {folders.map(folder => (
                                <button 
                                    key={folder.id}
                                    onClick={() => setSelectedFolderId(folder.id)}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${selectedFolderId === folder.id ? 'bg-indigo-100 text-indigo-800' : 'text-slate-600 hover:bg-slate-100'}`}
                                >
                                    <span className="material-symbols-outlined mr-3 text-xl">folder</span>
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
                                className="w-full text-sm border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button type="submit" className="w-full mt-2 bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-300 transition-colors">
                                Create Folder
                            </button>
                        </form>
                    </div>
                </aside>
                <main className="flex-grow">
                    {filteredPrompts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredPrompts.map((prompt: Prompt) => (
                                <PromptCard 
                                    key={prompt.id} 
                                    item={prompt} 
                                    onClick={() => handleOpenModal({...prompt, itemType: 'prompt'})}
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
                                {searchTerm ? 'No matches found' : selectedFolderId ? 'This folder is empty' : 'No Prompts Yet'}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                {searchTerm ? 'Try a different search term.' : selectedFolderId ? 'Move prompts here or create a new one.' : 'Create your first prompt or add one from the Hub.'}
                            </p>
                        </div>
                    )}
                </main>
            </div>
        )}
        
        {activeTab === 'tools' && (
             <main>
                {filteredTools.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredTools.map((tool) => (
                            <AIToolCard 
                                key={tool.id} 
                                tool={tool} 
                                onClick={() => handleOpenModal({...tool, itemType: 'tool'})}
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
                           {searchTerm ? 'No tools match your search.' : <>Create your first tool, or discover new ones in the <Link to="/tools" className="text-indigo-600 font-medium hover:underline">Tools Hub</Link>.</>}
                        </p>
                    </div>
                )}
            </main>
        )}

        {activeTab === 'training' && (
             <main>
                {filteredTrainings.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTrainings.map((module) => {
                           const fullModuleData = module.originalPublicId ? PUBLIC_TRAINING_MODULES.find(m => m.id === module.originalPublicId) : module;
                           if (!fullModuleData) return null;
                           const displayModule = { ...fullModuleData, ...module };

                           return (
                               <TrainingCard 
                                   key={module.id} 
                                   module={displayModule}
                                   onClick={() => handleOpenModal({...displayModule, itemType: 'training'})}
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
                           {searchTerm ? 'No training modules match your search.' : <>Create a module, or explore the <Link to="/training" className="text-indigo-600 font-medium hover:underline">Training Center</Link> to find and save helpful lessons.</>}
                        </p>
                    </div>
                )}
            </main>
        )}

        {activeTab === 'profile' && (
             <main className="animate-fade-in">
                <div className="max-w-lg mx-auto">
                    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                        <div className="p-8 text-center">
                            <img 
                                className="h-32 w-32 rounded-full ring-4 ring-indigo-200 mx-auto mb-4" 
                                src={user!.photoURL} 
                                alt="User profile" 
                            />
                            <h2 className="text-3xl font-bold text-slate-900">{user!.displayName}</h2>
                            <p className="text-md text-slate-500 mt-1">{user!.email}</p>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                            <button 
                                onClick={logout} 
                                className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
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