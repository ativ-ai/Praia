
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { usePrompts } from '../../hooks/usePrompts';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { PROMPT_FRAMEWORKS, PROMPT_CATEGORIES } from '../../constants';
import { PromptFramework, PromptCategory, Prompt } from '../../types';
import { enhancePrompt, applyFrameworkToPrompt, generateProSpec, generateComponent } from '../../services/geminiService';
import Spinner from '../shared/Spinner';
import usePageTitle from '../../hooks/usePageTitle';
import Icon from '../shared/Icon';
import Tooltip from '../shared/Tooltip';
import Modal from '../shared/Modal';
import { marked } from 'marked';

// Declare Prism globally to avoid TS errors since we load it via CDN
declare const Prism: any;

const LYRA_ENHANCEMENT_OPTIONS = {
  targetAI: ['Gemini', 'ChatGPT', 'Claude', 'Llama 3', 'Mistral'],
  style: ['BASIC: Clarity & Structure', 'DETAIL: Reasoning & Robustness']
};

const PRO_SPEC_TEMPLATE = `# PRO-SPEC: [Feature Name]
> Version: 1.0 | Stack: [Tech Stack]

---

## [L1] PRODUCT INTENT (The Soul)
**User Story:** As a [User], I want [Goal] so that [Benefit].
**The Vibe:** [Adjectives, e.g., Minimalist, Fast, Professional]
**Core Value:** [Success Metric]

---

## [L2] TECHNICAL CONTRACTS (The Skeleton)
**Database:**
\`\`\`prisma
// Add schema here
\`\`\`

**API:**
- \`GET /api/resource\`: Returns list of resources.

---

## [L3] THE SHIELD (Security)
1. Auth required for all write operations.
2. Input validation using Zod.

---

## [L4] THE ENGINE (UX & Perf)
1. Optimistic updates for likes/comments.
2. Skeleton loaders for initial fetch.

---

## [L5] ORCHESTRATION (Instructions)
**Role:** Senior Engineer.
**Task:** Implement the features described in L1-L4.
`;

const LAYER_SNIPPETS = {
    L1: `## [L1] PRODUCT INTENT (The Soul)
**User Story:** 
**The Vibe:** 
**Core Value:** `,
    L2: `## [L2] TECHNICAL CONTRACTS (The Skeleton)
**Database:**
\`\`\`prisma

\`\`\`
**API:**`,
    L3: `## [L3] THE SHIELD (Security)
1. `,
    L4: `## [L4] THE ENGINE (UX & Perf)
1. `,
    L5: `## [L5] ORCHESTRATION (Instructions)
**Role:** Senior Engineer.
**Task:** `
};

const PromptStudio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getPromptById, savePrompt, getPromptHistory } = usePrompts();
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
  
  // History State
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // UI State
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [editorView, setEditorView] = useState<'write' | 'preview'>('write');
  
  // Save Modal state
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  // Toolkit state
  const [activeToolTab, setActiveToolTab] = useState<'enhance' | 'structure' | 'vibe' | 'prospec'>('enhance');
  const [vibeMode, setVibeMode] = useState<'spec' | 'component'>('spec');
  
  // Processing States
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isApplyingFramework, setIsApplyingFramework] = useState(false);
  const [isVibeProcessing, setIsVibeProcessing] = useState(false);

  // Options
  const [enhancementTargetAI, setEnhancementTargetAI] = useState(LYRA_ENHANCEMENT_OPTIONS.targetAI[0]);
  const [enhancementStyle, setEnhancementStyle] = useState(LYRA_ENHANCEMENT_OPTIONS.style[0]);

  // Result state
  const [resultOriginalText, setResultOriginalText] = useState<string | null>(null);
  const [resultGeneratedText, setResultGeneratedText] = useState<string | null>(null);
  const [resultType, setResultType] = useState<'Enhancement' | 'Framework' | 'PRO-SPEC' | 'Component' | null>(null);
  
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
        setHistoryId(null); // Copies start with new history
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
        setHistoryId(promptToEdit.historyId);
      } else {
        addNotification('Prompt not found!', 'error');
        navigate('/my-praia');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.state, navigate, addNotification]);

  // Highlight Code when entering Preview Mode
  useEffect(() => {
    if (editorView === 'preview' && typeof Prism !== 'undefined') {
        setTimeout(() => Prism.highlightAll(), 0);
    }
  }, [editorView, promptText]);

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

  const handleVibeGenerate = async () => {
    if (!promptText.trim()) {
        addNotification('Please describe your product idea, vibe, or requirements in the editor first.', 'info');
        return;
    }
    clearResult();
    setIsVibeProcessing(true);
    setResultOriginalText(promptText);
    try {
        let result;
        if (vibeMode === 'spec') {
             result = await generateProSpec(promptText);
             setResultType('PRO-SPEC');
        } else {
             result = await generateComponent(promptText);
             setResultType('Component');
        }
        setResultGeneratedText(result);
    } catch (error: any) {
        addNotification(error.message, 'error');
        clearResult();
    } finally {
        setIsVibeProcessing(false);
    }
  };
  
  const acceptChanges = () => {
    if (resultGeneratedText) {
        setPromptText(resultGeneratedText);
        addNotification('Content applied to editor!', 'success');
        if (resultType === 'PRO-SPEC' || resultType === 'Component') {
            if (!title) setTitle(resultType === 'PRO-SPEC' ? 'New PRO-SPEC' : 'New Component');
            if (!category) setCategory('Code Generation');
        }
    }
    clearResult();
  }

  const downloadArtifact = () => {
      if (!resultGeneratedText) return;
      const extension = resultType === 'Component' ? 'tsx' : 'md';
      const mimeType = resultType === 'Component' ? 'text/plain' : 'text/markdown';
      const defaultName = resultType === 'Component' ? 'Component' : 'pro-spec';
      
      const blob = new Blob([resultGeneratedText], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || defaultName}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addNotification('File downloaded successfully.', 'success');
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

  const handleLoadVersion = (version: Prompt) => {
    if (window.confirm('Loading a previous version will replace your current editor content. Are you sure?')) {
        setTitle(version.title);
        setPromptText(version.promptText);
        setDescription(version.description);
        setCategory(version.category);
        setActiveFramework(version.framework || null);
        setShowHistory(false);
        addNotification(`Version ${version.version} loaded.`, 'success');
    }
  };
  
  const insertProSpecTemplate = () => {
    if (promptText.trim() && !window.confirm("This will replace your current content. Continue?")) return;
    setPromptText(PRO_SPEC_TEMPLATE);
    setCategory('Code Generation');
    setEditorView('write'); // Switch to write mode
    addNotification('PRO-SPEC template inserted.', 'success');
  };
  
  const insertLayerSnippet = (layer: keyof typeof LAYER_SNIPPETS) => {
      setPromptText(prev => prev + (prev ? '\n\n' : '') + LAYER_SNIPPETS[layer]);
      setEditorView('write');
      addNotification(`${layer} snippet added.`, 'success');
  };

  const TabButton: React.FC<{ tabName: 'enhance' | 'structure' | 'vibe' | 'prospec'; icon: string; label: string }> = ({ tabName, icon, label }) => (
    <button
      type="button"
      onClick={() => setActiveToolTab(tabName)}
      className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 font-bold text-sm transition-colors rounded-lg ${activeToolTab === tabName ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200'}`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const isProcessing = isEnhancing || isApplyingFramework || isVibeProcessing;

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
            {id && !location.state?.prompt && historyId && (
                <button type="button" onClick={() => setShowHistory(true)} className="text-slate-600 font-bold py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">history</span>
                    History
                </button>
            )}
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
            <div className="p-2 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <div className="flex gap-1">
                     <button 
                        onClick={() => setEditorView('write')} 
                        className={`px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors ${editorView === 'write' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                     >
                        <span className="material-symbols-outlined text-lg">edit_note</span> Write
                     </button>
                     <button 
                        onClick={() => setEditorView('preview')} 
                        className={`px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors ${editorView === 'preview' ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                     >
                        <span className="material-symbols-outlined text-lg">visibility</span> Preview
                     </button>
                </div>

                <div className="flex items-center gap-3 px-2">
                    <button
                        onClick={insertProSpecTemplate}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-colors"
                        title="Insert PRO-SPEC Template"
                    >
                        <span className="material-symbols-outlined text-lg text-emerald-600">integration_instructions</span>
                        <span className="hidden sm:inline">Insert Template</span>
                    </button>
                    <div className="h-4 w-px bg-slate-300 mx-1"></div>
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

            {editorView === 'write' ? (
                <textarea 
                    id="promptText" 
                    value={promptText} 
                    onChange={e => setPromptText(e.target.value)} 
                    className={`flex-grow w-full p-6 resize-none focus:outline-none font-mono text-sm text-slate-800 leading-relaxed placeholder-slate-400 ${isFullScreen ? 'md:px-24 lg:px-40 text-base' : ''}`}
                    placeholder="Start typing your prompt, vibe, or PRO-SPEC here..." 
                    spellCheck={false}
                ></textarea>
            ) : (
                <div className={`flex-grow w-full p-8 overflow-y-auto prose prose-slate max-w-none ${isFullScreen ? 'md:px-24 lg:px-40' : ''}`}>
                    {promptText ? (
                        <div dangerouslySetInnerHTML={{ __html: marked.parse(promptText) }}></div>
                    ) : (
                        <p className="text-slate-400 italic text-center mt-10">Nothing to preview yet.</p>
                    )}
                </div>
            )}
        </div>
          
        {/* Tools Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-4 min-h-0">
             {/* Tab Navigation */}
             <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex gap-1 flex-shrink-0 overflow-x-auto">
                <TabButton tabName="enhance" icon="auto_awesome" label="Lyra" />
                <TabButton tabName="structure" icon="dashboard" label="Struct" />
                <TabButton tabName="vibe" icon="bolt" label="Vibe" />
                <TabButton tabName="prospec" icon="integration_instructions" label="Spec" />
            </div>

            {/* Tool Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-grow flex flex-col overflow-hidden relative">
                
                {/* Processing Overlay */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4 animate-fade-in">
                        <Spinner size="h-10 w-10" />
                        <p className="font-bold text-slate-700 animate-pulse">
                            {isEnhancing ? 'Lyra is optimizing...' : isApplyingFramework ? 'Structuring prompt...' : 'Generating Vibe Artifact...'}
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

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Optimization Style</label>
                                    <select value={enhancementStyle} onChange={e => setEnhancementStyle(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                                        {LYRA_ENHANCEMENT_OPTIONS.style.map(s => <option key={s} value={s}>{s}</option>)}
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

                        {activeToolTab === 'vibe' && (
                             <div className="space-y-6 animate-fade-in">
                                <div className="bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-100">
                                    <h3 className="font-bold text-fuchsia-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined">bolt</span>
                                        Vibe Generator
                                    </h3>
                                    <p className="text-sm text-fuchsia-700 mt-1">
                                        Quickly transform ideas into artifacts.
                                    </p>
                                </div>

                                {/* Mode Switcher */}
                                <div className="flex p-1 bg-slate-100 rounded-lg">
                                    <button 
                                        onClick={() => setVibeMode('spec')}
                                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${vibeMode === 'spec' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Feature Spec
                                    </button>
                                    <button 
                                        onClick={() => setVibeMode('component')}
                                        className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${vibeMode === 'component' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        UI Component
                                    </button>
                                </div>

                                <div className="text-sm text-slate-600 space-y-2 px-1">
                                     {vibeMode === 'spec' ? (
                                         <>
                                            <p className="font-medium text-slate-800">AI-Generated 5-Layer Spec</p>
                                            <p className="text-xs text-slate-500">Automatically writes a full PRO-SPEC based on your vibe description.</p>
                                         </>
                                     ) : (
                                         <>
                                            <p className="font-medium text-slate-800">AI-Generated Component</p>
                                            <p className="text-xs text-slate-500">Automatically codes a React+Tailwind component based on your description.</p>
                                         </>
                                     )}
                                </div>

                                <button onClick={handleVibeGenerate} className={`w-full text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${vibeMode === 'spec' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-fuchsia-600 hover:bg-fuchsia-700'}`}>
                                    {vibeMode === 'spec' ? 'Generate Spec' : 'Generate Component'}
                                </button>
                            </div>
                        )}

                        {activeToolTab === 'prospec' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                    <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                                        <span className="material-symbols-outlined">integration_instructions</span>
                                        PRO-SPEC Builder
                                    </h3>
                                    <p className="text-sm text-emerald-700 mt-1">
                                        Manually architect rigorous specs to eliminate AI context drift.
                                    </p>
                                </div>
                                
                                <div className="space-y-3">
                                    <button onClick={insertProSpecTemplate} className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-indigo-300 transition-all flex items-center gap-3 group">
                                        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-md group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-lg">description</span>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-800">Insert Full Template</div>
                                            <div className="text-xs text-slate-500">Start a fresh PRO-SPEC file</div>
                                        </div>
                                    </button>
                                    
                                    <h4 className="text-xs font-bold text-slate-400 uppercase pt-2 px-1">Append Layers</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {Object.entries(LAYER_SNIPPETS).map(([key, snippet]) => (
                                            <button 
                                                key={key}
                                                onClick={() => insertLayerSnippet(key as keyof typeof LAYER_SNIPPETS)}
                                                className="text-left px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded hover:bg-white hover:border-slate-300 transition-colors flex items-center justify-between"
                                            >
                                                <span>{key} Snippet</span>
                                                <span className="material-symbols-outlined text-slate-400 text-sm">add</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 border border-slate-200 mt-4">
                                    <strong>Tip:</strong> Use the "Preview" tab in the editor to see syntax highlighting for your code blocks.
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Result View
                    <div className="flex flex-col h-full animate-slide-up">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <span className={`material-symbols-outlined ${resultType === 'PRO-SPEC' ? 'text-emerald-600' : resultType === 'Component' ? 'text-fuchsia-600' : resultType === 'Framework' ? 'text-sky-600' : 'text-indigo-600'}`}>
                                    {resultType === 'PRO-SPEC' ? 'integration_instructions' : resultType === 'Component' ? 'code_blocks' : resultType === 'Framework' ? 'dashboard' : 'auto_awesome'}
                                </span>
                                {resultType} Result
                            </h3>
                            <button onClick={clearResult} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {resultType !== 'PRO-SPEC' && resultType !== 'Component' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Original</h4>
                                        <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-500 border border-slate-200 font-mono h-full overflow-y-auto max-h-96">
                                            {resultOriginalText}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-indigo-600 uppercase mb-2">Optimized</h4>
                                        <div className={`p-3 rounded-lg text-xs border font-mono h-full overflow-y-auto max-h-96 whitespace-pre-wrap ${resultType === 'Framework' ? 'bg-sky-50 text-sky-900 border-sky-100' : 'bg-indigo-50 text-indigo-900 border-indigo-100'}`}>
                                            {resultGeneratedText}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {(resultType === 'PRO-SPEC' || resultType === 'Component') && (
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <h4 className={`text-xs font-bold uppercase ${resultType === 'PRO-SPEC' ? 'text-emerald-600' : 'text-fuchsia-600'}`}>
                                            {resultType === 'PRO-SPEC' ? 'Generated Spec' : 'Generated Code'}
                                        </h4>
                                        <button 
                                            onClick={downloadArtifact} 
                                            className={`text-xs font-bold flex items-center gap-1 px-2 py-1 rounded transition-colors ${resultType === 'PRO-SPEC' ? 'text-emerald-600 hover:text-emerald-700 bg-emerald-50' : 'text-fuchsia-600 hover:text-fuchsia-700 bg-fuchsia-50'}`}
                                        >
                                            <span className="material-symbols-outlined text-sm">download</span> Download .{resultType === 'Component' ? 'tsx' : 'md'}
                                        </button>
                                    </div>
                                    <div className={`p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap font-mono border shadow-inner ${resultType === 'PRO-SPEC' ? 'bg-emerald-50 text-emerald-900 border-emerald-100' : 'bg-fuchsia-50 text-fuchsia-900 border-fuchsia-100'}`}>
                                        {resultGeneratedText}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-white flex gap-3">
                             <button onClick={clearResult} className="flex-1 py-3 px-4 font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                Discard
                            </button>
                            <button onClick={acceptChanges} className={`flex-[2] py-3 px-4 font-bold text-white rounded-lg shadow-md transition-transform hover:scale-[1.02] active:scale-95 ${resultType === 'PRO-SPEC' ? 'bg-emerald-600 hover:bg-emerald-700' : resultType === 'Component' ? 'bg-fuchsia-600 hover:bg-fuchsia-700' : resultType === 'Framework' ? 'bg-sky-600 hover:bg-sky-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
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
      
      {/* History Modal */}
      <Modal isOpen={showHistory} onClose={() => setShowHistory(false)} title="Version History">
        <div className="space-y-3">
            {historyId && getPromptHistory(historyId).map((v) => (
                <div key={v.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                        <div className="font-bold text-slate-800 flex items-center">
                            Version {v.version} 
                            {v.isLatest && <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full ml-2 font-semibold uppercase tracking-wide">Latest</span>}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{new Date(v.createdAt).toLocaleString()}</div>
                    </div>
                    <button onClick={() => handleLoadVersion(v)} className="px-4 py-2 text-sm font-bold text-indigo-700 bg-white border border-indigo-100 hover:bg-indigo-50 rounded-lg shadow-sm transition-colors">
                        Load
                    </button>
                </div>
            ))}
            {(!historyId || getPromptHistory(historyId || '').length === 0) && (
                <div className="text-center py-8">
                     <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">history_toggle_off</span>
                     <p className="text-slate-500">No history available for this prompt.</p>
                </div>
            )}
        </div>
      </Modal>
    </div>
  );
};

export default PromptStudio;
