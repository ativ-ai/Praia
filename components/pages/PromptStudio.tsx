
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { usePrompts } from '../../hooks/usePrompts';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { PROMPT_FRAMEWORKS, PROMPT_CATEGORIES, LYRA_ENHANCEMENT_OPTIONS } from '../../constants';
import { PromptFramework, PromptCategory, Prompt } from '../../types';
import { enhancePrompt, applyFrameworkToPrompt } from '../../services/geminiService';
import Spinner from '../shared/Spinner';
import usePageTitle from '../../hooks/usePageTitle';
import Icon from '../shared/Icon';
import Tooltip from '../shared/Tooltip';
import Modal from '../shared/Modal';

const PromptStudio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getPromptById, savePrompt } = usePrompts();
  const { addNotification } = useNotification();
  const { user } = useAuth();

  // Main prompt state
  const [title, setTitle] = useState('');
  const [promptText, setPromptText] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PromptCategory>('Ideation');
  const [activeFramework, setActiveFramework] = useState<PromptFramework | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isCommunityCopy, setIsCommunityCopy] = useState(false);
  
  // Save Modal state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  // Toolkit state
  const [activeToolTab, setActiveToolTab] = useState<'enhance' | 'structure'>('enhance');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancementTargetAI, setEnhancementTargetAI] = useState(LYRA_ENHANCEMENT_OPTIONS.targetAI[0]);
  const [enhancementStyle, setEnhancementStyle] = useState(LYRA_ENHANCEMENT_OPTIONS.style[0]);
  const [isApplyingFramework, setIsApplyingFramework] = useState(false);

  // Comparison view state
  const [diffOriginalText, setDiffOriginalText] = useState<string | null>(null);
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [rewrittenPrompt, setRewrittenPrompt] = useState<string | null>(null);
  
  usePageTitle(id ? 'Edit Prompt' : 'Create New Prompt');

  useEffect(() => {
    const promptFromState = location.state?.prompt as Prompt | undefined;
    
    if (promptFromState) {
        // Using as a template, it becomes a private copy
        setTitle(`${promptFromState.title} (Copy)`);
        setPromptText(promptFromState.promptText);
        setDescription(promptFromState.description);
        setCategory(promptFromState.category);
        setActiveFramework(promptFromState.framework || null);
        setIsPublic(false);
        setIsCommunityCopy(false); // It's a new prompt for the user
    } else if (id) {
      // Editing an existing prompt
      const promptToEdit = getPromptById(id);
      if (promptToEdit) {
        setTitle(promptToEdit.title);
        setPromptText(promptToEdit.promptText);
        setDescription(promptToEdit.description);
        setCategory(promptToEdit.category);
        setActiveFramework(promptToEdit.framework || null);
        setIsPublic(!!promptToEdit.isPublic);
        setIsCommunityCopy(!!promptToEdit.originalPublicId);
      } else {
        addNotification('Prompt not found!', 'error');
        navigate('/my-praia');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.state, navigate, addNotification]);
  
  const clearComparison = () => {
    setDiffOriginalText(null);
    setEnhancedPrompt(null);
    setRewrittenPrompt(null);
  }

  const handleEnhance = async () => {
    if (!promptText.trim()) {
      addNotification('Please enter some text in the prompt editor to enhance.', 'info');
      return;
    }
    clearComparison();
    setIsEnhancing(true);
    setDiffOriginalText(promptText);
    try {
      const result = await enhancePrompt(promptText, enhancementTargetAI, enhancementStyle);
      setEnhancedPrompt(result);
    } catch (error: any) {
      addNotification(error.message, 'error');
      clearComparison();
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleApplyFramework = async () => {
    if (!promptText.trim()) {
      addNotification('Please enter your original prompt text before applying a framework.', 'info');
      return;
    }
    if (!activeFramework) {
      addNotification('Please select a framework to apply from the dropdown.', 'info');
      return;
    }
    clearComparison();
    setIsApplyingFramework(true);
    setDiffOriginalText(promptText);
    try {
      const result = await applyFrameworkToPrompt(promptText, activeFramework);
      setRewrittenPrompt(result);
    } catch (error: any) {
      addNotification(error.message, 'error');
      clearComparison();
    } finally {
      setIsApplyingFramework(false);
    }
  };
  
  const acceptChanges = (newText: string | null) => {
    if (newText) {
        setPromptText(newText);
        addNotification('Changes applied to editor!', 'success');
    }
    clearComparison();
  }
  
  const handleOpenSaveModal = () => {
    if (!promptText.trim()) {
      addNotification('Please enter some prompt text before saving.', 'error');
      return;
    }
    if (!user) {
        addNotification('Please log in to save your prompt.', 'info');
        navigate('/login', { state: { from: location } });
        return;
    }
    setModalTitle(title);
    setModalDescription(description);
    setIsSaveModalOpen(true);
  };

  const handleFinalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim() || !modalDescription.trim()) {
      addNotification('Please fill out the Title and Description fields.', 'error');
      return;
    }
    
    const promptToSave: Omit<Prompt, 'id' | 'createdAt' | 'uid' | 'isFavorited' | 'originalPublicId' | 'historyId' | 'version' | 'isLatest'> & { id?: string } = {
      title: modalTitle,
      promptText,
      description: modalDescription,
      category,
      framework: activeFramework,
      isPublic,
      folderId: id ? getPromptById(id)?.folderId : null
    };
    if (id && !location.state?.prompt) {
      promptToSave.id = id;
    }
    await savePrompt(promptToSave);
    setIsSaveModalOpen(false);
    navigate('/my-praia');
  };

  const TabButton: React.FC<{ tabName: 'enhance' | 'structure'; icon: string; label: string }> = ({ tabName, icon, label }) => (
    <button
      type="button"
      onClick={() => setActiveToolTab(tabName)}
      className={`flex-1 flex items-center justify-center gap-2 p-3 font-bold text-sm transition-colors border-b-2 ${activeToolTab === tabName ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:bg-slate-100'}`}
    >
      <Icon name={icon} className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  const generatedText = enhancedPrompt || rewrittenPrompt;

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl">{id && !location.state?.prompt ? 'Edit Prompt' : 'Create New Prompt'}</h1>
                <p className="text-lg text-slate-600 mt-1">Craft, enhance, and save prompts to your personal library.</p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
                <button type="button" onClick={() => navigate(-1)} className="bg-white text-slate-700 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-100 border border-slate-300 transition-colors">
                    Cancel
                </button>
                <button type="button" onClick={handleOpenSaveModal} className="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
                    Save Prompt
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-6">
            <div>
              <label htmlFor="promptText" className="block text-sm font-bold text-slate-700 mb-1">Prompt Text Editor</label>
              <textarea id="promptText" value={promptText} onChange={e => setPromptText(e.target.value)} rows={15} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm bg-slate-900 text-slate-100 placeholder-slate-500" placeholder="Act as a..." required></textarea>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value as PromptCategory)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        {PROMPT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="flex items-center text-sm font-bold text-slate-700 mb-1">Share to Community Hub <Tooltip text="Making a prompt public allows other users to view and use it from the Community Hub." /></label>
                    <div className={`mt-2 flex items-center p-2 rounded-lg ${isCommunityCopy ? 'bg-slate-100' : ''}`}>
                        <label htmlFor="isPublic" className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="isPublic"
                                checked={isPublic}
                                onChange={e => setIsPublic(e.target.checked)}
                                className="sr-only peer"
                                disabled={isCommunityCopy}
                            />
                            <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                            <span className="ml-3 text-sm font-medium text-slate-600">{isPublic ? 'Public' : 'Private'}</span>
                        </label>
                    </div>
                     {isCommunityCopy && <p className="text-xs text-slate-500 mt-1">Prompts saved from the community cannot be re-shared.</p>}
                </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6 sticky top-28">
             <div className="bg-white rounded-xl shadow-lg border border-slate-200">
                <div className="flex border-b border-slate-200">
                    <TabButton tabName="enhance" icon="sparkles" label="Enhance" />
                    <TabButton tabName="structure" icon="beaker" label="Structure" />
                </div>
                <div className="p-6">
                  {activeToolTab === 'enhance' ? (
                     <div className="space-y-4 animate-fade-in">
                        <p className="text-sm text-slate-600 -mt-2">Use our AI assistant, Lyra, to optimize your prompt.</p>
                        <div>
                          <label htmlFor="targetAI" className="flex items-center text-xs font-medium text-slate-600">Target AI <Tooltip text="Select the AI model you intend to use this prompt with. Lyra will tailor the optimization for that model's specific strengths." /></label>
                          <select id="targetAI" value={enhancementTargetAI} onChange={e => setEnhancementTargetAI(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                            {LYRA_ENHANCEMENT_OPTIONS.targetAI.map(ai => <option key={ai} value={ai}>{ai}</option>)}
                          </select>
                        </div>
                        <button type="button" onClick={handleEnhance} disabled={isEnhancing} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md">
                          {isEnhancing ? <><Spinner size="h-5 w-5" /> Enhancing...</> : 'Enhance with Lyra'}
                        </button>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-fade-in">
                      <p className="text-sm text-slate-600 -mt-2">Assign a framework tag and optionally rewrite your prompt to fit its structure.</p>
                       <div>
                          <label htmlFor="framework-applicator" className="flex items-center text-xs font-medium text-slate-600">Assign Framework <Tooltip text="Tag your prompt with a framework for better organization and discovery." /></label>
                          <select id="framework-applicator" value={activeFramework || ''} onChange={e => setActiveFramework(e.target.value as PromptFramework)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                            <option value="">None</option>
                            {Object.entries(PROMPT_FRAMEWORKS).map(([key, fw]) => <option key={key} value={key}>{fw.name}</option>)}
                          </select>
                        </div>
                        <button type="button" onClick={handleApplyFramework} disabled={isApplyingFramework || !activeFramework} className="w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md">
                          {isApplyingFramework ? <><Spinner size="h-5 w-5" /> Applying...</> : 'Rewrite Prompt to Fit'}
                        </button>
                    </div>
                  )}
                </div>
            </div>

            {(isEnhancing || isApplyingFramework || generatedText) && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                        <Icon name="compare_arrows" className="w-6 h-6 text-indigo-600" />
                        Review Changes
                    </h3>
                    <button type="button" onClick={clearComparison} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                        <Icon name="close" className="w-5 h-5"/>
                    </button>
                  </div>
                  
                  {isEnhancing || isApplyingFramework ? (
                     <div className="flex items-center justify-center h-48 bg-slate-100 rounded-md">
                        <Spinner />
                        <span className="ml-4 text-slate-600">Generating...</span>
                    </div>
                  ) : generatedText && diffOriginalText && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Original</h4>
                                <div className="p-3 bg-slate-100 rounded-md text-sm text-slate-800 whitespace-pre-wrap break-words max-h-64 overflow-y-auto border border-slate-200">
                                    {diffOriginalText}
                                </div>
                            </div>
                             <div>
                                <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Generated</h4>
                                <div className="p-3 bg-green-50 rounded-md text-sm text-green-900 whitespace-pre-wrap break-words max-h-64 overflow-y-auto border border-green-200">
                                    {generatedText}
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={() => acceptChanges(generatedText)} className="w-full text-center bg-green-600 text-white font-bold py-2.5 px-3 text-sm rounded-lg hover:bg-green-700 transition-colors">
                            Accept Changes
                        </button>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} title="Save Prompt">
        <form onSubmit={handleFinalSave} className="space-y-4">
          <div>
            <label htmlFor="modalTitle" className="block text-sm font-bold text-slate-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modalTitle" 
              value={modalTitle} 
              onChange={e => setModalTitle(e.target.value)} 
              className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
              required 
              placeholder="e.g., Creative Blog Post Ideas"
            />
          </div>
          <div>
            <label htmlFor="modalDescription" className="block text-sm font-bold text-slate-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea 
              id="modalDescription" 
              value={modalDescription} 
              onChange={e => setModalDescription(e.target.value)} 
              rows={3} 
              className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
              required
              placeholder="e.g., Generates 10 SEO-friendly titles for a blog about sustainable fashion."
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <button type="button" onClick={() => setIsSaveModalOpen(false)} className="bg-white text-slate-700 font-bold py-2.5 px-5 rounded-lg hover:bg-slate-100 border border-slate-300 transition-colors">
                Cancel
            </button>
            <button type="submit" className="bg-indigo-600 text-white font-bold py-2.5 px-5 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
                Save Prompt
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PromptStudio;
