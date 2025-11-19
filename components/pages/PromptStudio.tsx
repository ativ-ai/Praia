
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { usePrompts } from '../../hooks/usePrompts';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { PROMPT_FRAMEWORKS, PROMPT_CATEGORIES, LYRA_ENHANCEMENT_OPTIONS } from '../../constants';
import { PromptFramework, PromptCategory, Prompt } from '../../types';
import { enhancePrompt, applyFrameworkToPrompt, generateProSpec } from '../../services/geminiService';
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
  
  // UI State
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Save Modal state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  // Toolkit state
  const [activeToolTab, setActiveToolTab] = useState<'enhance' | 'structure' | 'prospec'>('enhance');
  
  // Processing States
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isApplyingFramework, setIsApplyingFramework] = useState(false);
  const [isGeneratingProSpec, setIsGeneratingProSpec] = useState(false);

  // Options
  const [enhancementTargetAI, setEnhancementTargetAI] = useState(LYRA_ENHANCEMENT_OPTIONS.targetAI[0]);
  const [enhancementStyle, setEnhancementStyle] = useState(LYRA_ENHANCEMENT_OPTIONS.style[0]);

  // Result state
  const [resultOriginalText, setResultOriginalText] = useState<string | null>(null);
  const [resultGeneratedText, setResultGeneratedText] = useState<string | null>(null);
  const [resultType, setResultType] = useState<'Enhancement' | 'Framework' | 'PRO-SPEC' | null>(null);
  
  usePageTitle(id ? 'Edit Prompt' : 'Prompt Studio');

  useEffect(() => {
    const promptFromState = location.state?.prompt as Prompt | undefined;
    
    if (promptFromState) {
        setTitle(`${promptFromState.title} (Copy)`);
        setPromptText(promptFromState.promptText);
        setDescription(promptFromState.description);
        setCategory(promptFromState.category);
        setActiveFramework(promptFromState.framework || null);
        setIsPublic(false);
        setIsCommunityCopy(false);
    } else if (id) {
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

  // Handle Escape key to exit full screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);
  
  const clearResult = () => {
    setResultOriginalText(null);
    setResultGeneratedText(null);
    setResultType(null);
  }

  const handleEnhance = async () => {
    if (!promptText.trim()) {
      addNotification('Please enter some text in the prompt editor to enhance.', 'info');
      return;
    }
    clearResult();
    setIsEnhancing(true);
    setResultOriginalText(promptText);
    try {
      const result = await enhancePrompt(promptText, enhancementTargetAI, enhancementStyle);
      setResultGeneratedText(result);
      setResultType('Enhancement');
    } catch (error: any) {
      addNotification(error.message, 'error');
      clearResult();
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
    clearResult();
    setIsApplyingFramework(true);
    setResultOriginalText(promptText);
    try {
      const result = await applyFrameworkToPrompt(promptText, activeFramework);
      setResultGeneratedText(result);
      setResultType('Framework');
    } catch (error: any) {
      addNotification(error.message, 'error');
      clearResult();
    } finally {
      setIsApplyingFramework(false);
    }
  };

  const handleGenerateProSpec = async () => {
    if (!promptText.trim()) {
        addNotification('Please describe your product idea or intent in the editor first.', 'info');
        return;
    }
    clearResult();
    setIsGeneratingProSpec(true);
    setResultOriginalText(promptText);
    try {
        const result = await generateProSpec(promptText);
        setResultGeneratedText(result);
        setResultType('PRO-SPEC');
    } catch (error: any) {
        addNotification(error.message, 'error');
        clearResult();
    } finally {
        setIsGeneratingProSpec(false);
    }
  };
  
  const acceptChanges = () => {
    if (resultGeneratedText) {
        setPromptText(resultGeneratedText);
        addNotification('Content applied to editor!', 'success');
        if (resultType === 'PRO-SPEC') {
            // Automatically suggest updating title/description for a spec if empty
            if (!title) setTitle('New PRO-SPEC');
            if (!category) setCategory('Code Generation');
        }
    }
    clearResult();
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

  const TabButton: React.FC<{ tabName: 'enhance' | 'structure' | 'prospec'; icon: string; label: string }> = ({ tabName, icon, label }) => (
    <button
      type="button"
      onClick={() => setActiveToolTab(tabName)}
      className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 font-bold text-sm transition-colors rounded-lg ${activeToolTab === tabName ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'}`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );

  const isProcessing = isEnhancing || isApplyingFramework || isGeneratingProSpec;

  return (
    <div className="max-w-[1600px] mx-auto animate-fade-in h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 flex-shrink-0">
        <div className="flex items-center gap-4">
             <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg">
                <span className="material-symbols-outlined text-2xl">design_services</span>
            </div>
            <div>
                <h1 className="text-2xl font-black text-slate-900">{id && !location.state?.prompt ? 'Edit Prompt' : 'Prompt Studio'}</h1>
                <p className="text-sm text-slate-500 font-medium">Design, Refine, Engineer.</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate(-1)} className="text-slate-600 font-bold py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors">
                Exit
            </button>
            <button type="button" onClick={handleOpenSaveModal} className="bg-slate-900 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg hover:bg-slate-800 transition-all transform hover:scale-105 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">save</span> Save
            </button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0 relative">
        
        {/* Main Editor Area */}
        <div className={`${isFullScreen ? 'fixed inset-0 z-[100] w-full h-full rounded-none' : 'lg:w-2/3 rounded-2xl'} flex flex-col bg-white shadow-sm border border-slate-200 overflow-hidden transition-all duration-300`}>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <label htmlFor="promptText" className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">edit_note</span>
                    Editor
                </label>
                <div className="flex items-center gap-3">
                    {promptText.length > 0 && (
                        <span className="text-xs font-mono text-slate-400">{promptText.length} chars</span>
                    )}
                    <button 
                        onClick={() => setIsFullScreen(!isFullScreen)} 
                        className="text-slate-400 hover:text-indigo-600 transition-colors p-1 rounded-md hover:bg-slate-100"
                        title={isFullScreen ? "Exit Full Screen (Esc)" : "Enter Full Screen"}
                    >
                        <span className="material-symbols-outlined text-xl block">
                            {isFullScreen ? 'close_fullscreen' : 'open_in_full'}
                        </span>
                    </button>
                </div>
            </div>
            <textarea 
                id="promptText" 
                value={promptText} 
                onChange={e => setPromptText(e.target.value)} 
                className={`flex-grow w-full p-6 resize-none focus:outline-none font-mono text-sm text-slate-800 leading-relaxed placeholder-slate-400 ${isFullScreen ? 'md:px-24 lg:px-40 text-base' : ''}`}
                placeholder="Start typing your prompt or idea here..." 
                spellCheck={false}
            ></textarea>
        </div>
          
        {/* Tools Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-4 min-h-0">
             {/* Tab Navigation */}
             <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex gap-1 flex-shrink-0">
                <TabButton tabName="enhance" icon="auto_awesome" label="Enhance" />
                <TabButton tabName="structure" icon="dashboard" label="Structure" />
                <TabButton tabName="prospec" icon="integration_instructions" label="PRO-SPEC" />
            </div>

            {/* Tool Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-grow flex flex-col overflow-hidden relative">
                
                {/* Processing Overlay */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4 animate-fade-in">
                        <Spinner size="h-10 w-10" />
                        <p className="font-bold text-slate-700 animate-pulse">
                            {isEnhancing ? 'Lyra is optimizing...' : isApplyingFramework ? 'Structuring prompt...' : 'Architecting Spec...'}
                        </p>
                    </div>
                )}

                {/* Tool Panel Content */}
                {!resultGeneratedText ? (
                    <div className="p-6 overflow-y-auto">
                         {activeToolTab === 'enhance' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                    <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined">auto_awesome</span>
                                        Lyra Optimizer
                                    </h3>
                                    <p className="text-sm text-indigo-700 mt-1">
                                        Uses the 4-D methodology to clarify intent and maximize AI performance.
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target AI Model</label>
                                    <select value={enhancementTargetAI} onChange={e => setEnhancementTargetAI(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                                        {LYRA_ENHANCEMENT_OPTIONS.targetAI.map(ai => <option key={ai} value={ai}>{ai}</option>)}
                                    </select>
                                </div>

                                <button onClick={handleEnhance} className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                                    Enhance Prompt
                                </button>
                            </div>
                        )}

                        {activeToolTab === 'structure' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                                    <h3 className="font-bold text-sky-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined">dashboard</span>
                                        Framework Applicator
                                    </h3>
                                    <p className="text-sm text-sky-700 mt-1">
                                        Rewrite your prompt to fit a proven engineering framework.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Framework</label>
                                    <select value={activeFramework || ''} onChange={e => setActiveFramework(e.target.value as PromptFramework)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none transition-all">
                                        <option value="">Choose a framework...</option>
                                        {Object.entries(PROMPT_FRAMEWORKS).map(([key, fw]) => <option key={key} value={key}>{fw.name}</option>)}
                                    </select>
                                    {activeFramework && (
                                        <p className="mt-3 text-xs text-slate-500 bg-slate-100 p-3 rounded-lg border border-slate-200">
                                            {PROMPT_FRAMEWORKS[activeFramework].description}
                                        </p>
                                    )}
                                </div>

                                <button onClick={handleApplyFramework} disabled={!activeFramework} className="w-full bg-sky-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-sky-700 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Apply Structure
                                </button>
                            </div>
                        )}

                        {activeToolTab === 'prospec' && (
                             <div className="space-y-6 animate-fade-in">
                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                    <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined">integration_instructions</span>
                                        PRO-SPEC Generator
                                    </h3>
                                    <p className="text-sm text-emerald-700 mt-1">
                                        Turn a vague idea ("vibe") into a rigorous 5-layer engineering specification for Vibe Coding.
                                    </p>
                                </div>

                                <div className="text-sm text-slate-600 space-y-2 px-1">
                                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span> Generates L1-L5 Documentation</p>
                                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span> Includes DB Schema & API Contracts</p>
                                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span> Defines Security & Performance Rules</p>
                                </div>

                                <button onClick={handleGenerateProSpec} className="w-full bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                                    Generate Spec
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    // Result View
                    <div className="flex flex-col h-full animate-slide-up">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <span className={`material-symbols-outlined ${resultType === 'PRO-SPEC' ? 'text-emerald-600' : resultType === 'Framework' ? 'text-sky-600' : 'text-indigo-600'}`}>
                                    {resultType === 'PRO-SPEC' ? 'integration_instructions' : resultType === 'Framework' ? 'dashboard' : 'auto_awesome'}
                                </span>
                                {resultType} Result
                            </h3>
                            <button onClick={clearResult} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {resultType !== 'PRO-SPEC' && (
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Original</h4>
                                    <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-500 line-clamp-3 border border-slate-200 font-mono">
                                        {resultOriginalText}
                                    </div>
                                </div>
                            )}
                            
                            <div>
                                <h4 className={`text-xs font-bold uppercase mb-2 ${resultType === 'PRO-SPEC' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                                    {resultType === 'PRO-SPEC' ? 'Generated Spec' : 'Optimized Output'}
                                </h4>
                                <div className={`p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap font-mono border shadow-inner ${resultType === 'PRO-SPEC' ? 'bg-emerald-50 text-emerald-900 border-emerald-100' : 'bg-indigo-50 text-indigo-900 border-indigo-100'}`}>
                                    {resultGeneratedText}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-white flex gap-3">
                             <button onClick={clearResult} className="flex-1 py-3 px-4 font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                Discard
                            </button>
                            <button onClick={acceptChanges} className={`flex-[2] py-3 px-4 font-bold text-white rounded-lg shadow-md transition-transform hover:scale-[1.02] active:scale-95 ${resultType === 'PRO-SPEC' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                                Use in Editor
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

      </div>

      {/* Save Modal */}
      <Modal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} title="Save to My Praia">
        <form onSubmit={handleFinalSave} className="space-y-6">
          <div>
            <label htmlFor="modalTitle" className="block text-sm font-bold text-slate-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modalTitle" 
              value={modalTitle} 
              onChange={e => setModalTitle(e.target.value)} 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
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
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
              required
              placeholder="e.g., Generates 10 SEO-friendly titles for a blog about sustainable fashion."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value as PromptCategory)} className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                        {PROMPT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="flex items-center text-sm font-bold text-slate-700 mb-1">Share to Community <Tooltip text="Public prompts are visible to everyone in the Community Hub." /></label>
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
                     {isCommunityCopy && <p className="text-xs text-slate-500 mt-1">Community copies cannot be re-shared publicly.</p>}
                </div>
            </div>
            
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
            <button type="button" onClick={() => setIsSaveModalOpen(false)} className="bg-white text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-slate-100 border border-slate-300 transition-colors">
                Cancel
            </button>
            <button type="submit" className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-[1.02]">
                Save Prompt
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PromptStudio;
