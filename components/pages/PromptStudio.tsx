
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { usePrompts } from '../../hooks/usePrompts';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { PROMPT_FRAMEWORKS, PROMPT_CATEGORIES } from '../../constants';
import { PromptFramework, PromptCategory, Prompt } from '../../types';
import { enhancePrompt, applyFrameworkToPrompt, generateProSpec, generateComponent } from '../../services/geminiService';
import Spinner from '../shared/Spinner';
import { useSEO } from '../../hooks/useSEO';
import Modal from '../shared/Modal';
import Tooltip from '../shared/Tooltip';
import { marked } from 'marked';

// Declare Prism globally
declare const Prism: any;

const LYRA_ENHANCEMENT_OPTIONS = {
  targetAI: ['Gemini', 'ChatGPT', 'Claude', 'Llama 3', 'Mistral'],
  style: ['Basic', 'Detail']
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
1. Optimistic UI updates for likes/comments.
2. Skeleton loaders for initial fetch.

---

## [L5] ORCHESTRATION (Instructions)
**Role:** Senior Engineer.
**Task:** Implement the features described in L1-L4.
`;

const VIBE_TEMPLATE = `# THE VIBE
> Describe the emotional feel, aesthetic, and core purpose.
"A minimalistic, zen-like task manager that feels like a breath of fresh air. Soft shadows, ample whitespace, pastel accent colors."

# CORE FEATURES
- [ ] Fast task entry
- [ ] Drag and drop organization
- [ ] "Focus Mode" toggle

# TECH STACK PREFERENCE
- React + Tailwind
- Framer Motion for smooth transitions`;

const VIBE_STARTERS = [
    { title: 'Modern SaaS', text: 'A clean, high-performance SaaS dashboard with a sidebar, stat cards, and a data table. Use a deep navy and electric blue color palette. High density but breathable.' },
    { title: 'Zen Landing', text: 'A minimalist, calming landing page for a meditation app. Flowing layout, soft pastel gradients, elegant serif typography, and subtle scroll reveal animations.' },
    { title: 'Futuristic HUD', text: 'A dark, cyberpunk-themed interface for a spaceship cockpit. Neon cyan accents, glowing lines, animated data visualizations, and monospace fonts.' }
];

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
  const { getPromptById, savePrompt, getPromptHistory, revertToVersion } = usePrompts();
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
  const [expandedVersionId, setExpandedVersionId] = useState<string | null>(null);

  // UI State
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [editorView, setEditorView] = useState<'write' | 'preview'>('write');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
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
  
  const pageTitle = id && !location.state?.prompt ? 'Edit Prompt' : 'Prompt Studio';
  useSEO({
    title: pageTitle,
    description: 'Craft, optimize, and structure your AI prompts using Lyra AI, PRO-SPEC, and Vibe Coding frameworks.',
    keywords: ['Prompt Editor', 'Lyra', 'Prompt Optimizer', 'PRO-SPEC']
  });

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
        setHistoryId(null);
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
  }, [id, location.state, navigate, addNotification]);

  useEffect(() => {
    if (editorView === 'preview' && typeof Prism !== 'undefined') {
        setTimeout(() => Prism.highlightAll(), 0);
    }
  }, [editorView, promptText]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSaveModalOpen || showHistory) return;
        setIsFullScreen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSaveModalOpen, showHistory]);
  
  const clearResult = () => {
    setResultOriginalText(null);
    setResultGeneratedText(null);
    setResultType(null);
  }

  const handleEnhance = async () => {
    if (!promptText.trim()) {
      addNotification('Please enter text to enhance.', 'info');
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
      addNotification('Please enter text before applying a framework.', 'info');
      return;
    }
    if (!activeFramework) {
      addNotification('Please select a framework.', 'info');
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
        addNotification('Please describe your product vibe first.', 'info');
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
        addNotification('Applied to editor!', 'success');
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
      addNotification('Downloaded.', 'success');
  }
  
  const handleOpenSaveModal = () => {
    if (!promptText.trim()) {
      addNotification('Editor is empty.', 'error');
      return;
    }
    if (!user) {
        addNotification('Please log in to save.', 'info');
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
      addNotification('Title and Description required.', 'error');
      return;
    }
    
    const promptToSave: any = {
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
    if (window.confirm('Replace editor content with this version?')) {
        setTitle(version.title);
        setPromptText(version.promptText);
        setDescription(version.description);
        setCategory(version.category);
        setActiveFramework(version.framework || null);
        setShowHistory(false);
        addNotification(`Version ${version.version} loaded.`, 'success');
    }
  };

  const handleRevertVersion = async (version: Prompt) => {
      if (window.confirm(`Revert to Version ${version.version}? This creates a new latest version.`)) {
          const newVersion = await revertToVersion(version.id);
          if (newVersion) {
              setShowHistory(false);
              navigate(`/prompt-studio/${newVersion.id}`, { replace: true });
          }
      }
  };
  
  const insertTemplate = (template: string, cat: string = 'Code Generation', msg: string = 'Template inserted.') => {
    if (promptText.trim() && !window.confirm("Replace current content?")) return;
    setPromptText(template);
    if(cat) setCategory(cat as PromptCategory);
    setActiveFramework(null); // Clear framework selection as we are inserting a template
    setEditorView('write');
    addNotification(msg, 'success');
  };

  const insertLayerSnippet = (layer: keyof typeof LAYER_SNIPPETS) => {
      // Check if the layer already exists in the prompt text
      if (promptText.includes(`[${layer}]`)) {
          addNotification(`Layer [${layer}] is already present.`, 'info');
          return;
      }
      setPromptText(prev => prev + (prev ? '\n\n' : '') + LAYER_SNIPPETS[layer]);
      setEditorView('write');
      addNotification(`${layer} snippet added.`, 'success');
  };

  const handleClear = () => {
      if (!promptText) return;
      if (window.confirm('Clear editor?')) {
          setPromptText('');
          addNotification('Cleared.', 'info');
          if (textAreaRef.current) {
              textAreaRef.current.focus();
          }
      }
  };

  const handlePaste = async () => {
      try {
          const text = await navigator.clipboard.readText();
          if (!text) return;
          if (textAreaRef.current) {
              const textarea = textAreaRef.current;
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              // Use textarea.value instead of promptText to avoid stale state in async closure
              const currentVal = textarea.value;
              const newText = currentVal.substring(0, start) + text + currentVal.substring(end);
              setPromptText(newText);
              setTimeout(() => {
                   if(textAreaRef.current) {
                       const newCursorPos = start + text.length;
                       textAreaRef.current.focus();
                       textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
                   }
              }, 0);
              addNotification('Pasted!', 'success');
          } else {
              setPromptText(prev => prev + text);
          }
      } catch (err) {
          addNotification('Paste failed. Use Ctrl+V.', 'error');
      }
  };

  const isProcessing = isEnhancing || isApplyingFramework || isVibeProcessing;

  return (
    <div className={`flex flex-col animate-fade-in ${isFullScreen ? 'fixed inset-0 z-50 bg-slate-50' : 'h-[calc(100vh-8rem)]'}`}>
      
      {/* 1. Simplified Top Header */}
      {!isFullScreen && (
        <div className="flex justify-between items-center mb-6 flex-shrink-0 px-1">
            <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200">
                    <span className="material-symbols-outlined text-indigo-600 text-2xl">design_services</span>
                </div>
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">
                        {id && !location.state?.prompt ? 'Edit Prompt' : 'Prompt Studio'}
                    </h1>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Design. Refine. Engineer.</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                 {id && !location.state?.prompt && historyId && (
                    <Tooltip text="Versions" position="bottom">
                         <button onClick={() => setShowHistory(true)} className="p-2 text-slate-500 hover:bg-white hover:text-slate-800 rounded-lg transition-all border border-transparent hover:border-slate-200 hover:shadow-sm">
                            <span className="material-symbols-outlined text-xl">history</span>
                        </button>
                    </Tooltip>
                 )}
                 <div className="h-6 w-px bg-slate-300 mx-1"></div>
                 <Tooltip text="Exit Studio" position="bottom">
                    <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                        Exit
                    </button>
                </Tooltip>
                 <Tooltip text="Save Prompt" position="bottom">
                    <button onClick={handleOpenSaveModal} className="px-5 py-2 text-sm font-bold bg-slate-900 text-white rounded-lg shadow-md hover:bg-slate-800 hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">save</span> Save
                    </button>
                </Tooltip>
            </div>
        </div>
      )}

      {/* 2. Introduction Section */}
      {!isFullScreen && (
          <div className="mb-6 animate-slide-up px-1" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                      <span className="material-symbols-outlined text-6xl text-indigo-600">architecture</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">The Architect's Workspace</h2>
                  <p className="text-slate-600 text-sm max-w-4xl leading-relaxed">
                      Welcome to the Prompt Studio, the command center for AI orchestration. This is your professional environment to transform vague intent into deterministic execution. 
                      Leverage our <strong>PRO-SPEC</strong> methodology to architect rigorous technical contracts, or use the <strong>Lyra AI</strong> optimizer to eliminate context drift and hallucinations. 
                      Here, we don't just chat with AI—we engineer the future of autonomous systems.
                  </p>
              </div>
          </div>
      )}

      {/* 3. Main Work Area */}
      <div className={`flex-grow flex gap-6 min-h-0 ${isFullScreen ? 'p-4' : ''}`}>
        
        {/* LEFT COLUMN: The Document Editor (Canvas) */}
        <div className={`flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 relative ${isFullScreen ? 'w-full max-w-5xl mx-auto shadow-2xl' : 'w-full lg:w-2/3'}`}>
            
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white z-10">
                 <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setEditorView('write')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${editorView === 'write' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Write
                    </button>
                    <button 
                        onClick={() => setEditorView('preview')}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${editorView === 'preview' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Preview
                    </button>
                 </div>

                 <div className="flex items-center gap-1">
                    {promptText.length > 0 && (
                        <span className="text-[10px] font-mono text-slate-400 mr-3 hidden sm:inline-block">{promptText.length} chars</span>
                    )}
                    <Tooltip text="Copy" position="bottom">
                        <button onClick={() => {navigator.clipboard.writeText(promptText); addNotification('Copied', 'success')}} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                            <span className="material-symbols-outlined text-lg">content_copy</span>
                        </button>
                    </Tooltip>
                    {editorView === 'write' && (
                        <>
                            <Tooltip text="Paste" position="bottom">
                                <button onClick={handlePaste} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                                    <span className="material-symbols-outlined text-lg">content_paste</span>
                                </button>
                            </Tooltip>
                            <Tooltip text="Clear" position="bottom">
                                <button onClick={handleClear} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </Tooltip>
                        </>
                    )}
                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                    <Tooltip text={isFullScreen ? "Exit Full Screen" : "Focus Mode"} position="bottom">
                        <button onClick={() => setIsFullScreen(!isFullScreen)} className={`p-1.5 rounded-md transition-colors ${isFullScreen ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}>
                            <span className="material-symbols-outlined text-lg">{isFullScreen ? 'close_fullscreen' : 'open_in_full'}</span>
                        </button>
                    </Tooltip>
                 </div>
            </div>

            {/* The Canvas or Result Comparison */}
            <div className="flex-grow relative overflow-hidden flex flex-col transition-all duration-300">
                {resultGeneratedText && (resultType === 'Enhancement' || resultType === 'Framework') ? (
                    <div className="flex-grow flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden animate-fade-in group">
                        {/* Original View */}
                        <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
                            <div className="px-6 py-3 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Original Prompt</span>
                                <span className="text-[10px] font-mono text-slate-300">{resultOriginalText?.length} chars</span>
                            </div>
                            <div className="flex-grow p-6 overflow-y-auto prose prose-slate prose-sm max-w-none">
                                <div className="text-slate-500 font-mono text-xs whitespace-pre-wrap leading-relaxed opacity-80">{resultOriginalText}</div>
                            </div>
                        </div>

                        {/* Enhanced View */}
                        <div className="flex-1 flex flex-col min-h-0 bg-white relative">
                            <div className="px-6 py-3 border-b border-indigo-50 flex justify-between items-center bg-indigo-50/30">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Lyra Optimized</span>
                                    <div className="px-1.5 py-0.5 rounded bg-indigo-500 text-[8px] font-bold text-white uppercase animate-pulse">New</div>
                                </div>
                                <span className="text-[10px] font-mono text-indigo-300">{resultGeneratedText?.length} chars</span>
                            </div>
                            <div className="flex-grow p-6 overflow-y-auto prose prose-indigo prose-sm max-w-none">
                                <div className="text-slate-800 font-mono text-xs whitespace-pre-wrap leading-relaxed font-medium">{resultGeneratedText}</div>
                            </div>
                            
                            {/* Action Floating Bar */}
                            <div className="absolute bottom-6 left-6 right-6 flex gap-3 p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <button onClick={clearResult} className="flex-1 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                                    Discard Changes
                                </button>
                                <button onClick={acceptChanges} className="flex-[2] py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                    Accept & Apply To Editor
                                </button>
                            </div>
                        </div>
                    </div>
                ) : editorView === 'write' ? (
                    <textarea 
                        id="promptText" 
                        ref={textAreaRef}
                        value={promptText} 
                        onChange={e => setPromptText(e.target.value)} 
                        className="flex-grow w-full p-6 sm:p-8 resize-none focus:outline-none font-mono text-sm sm:text-base text-slate-800 leading-relaxed placeholder-slate-300"
                        placeholder="Start typing your prompt, vibe, or spec here..." 
                        spellCheck={false}
                    ></textarea>
                ) : (
                    <div className="flex-grow w-full p-6 sm:p-8 overflow-y-auto prose prose-slate prose-sm sm:prose-base max-w-none">
                        {promptText ? (
                            <div dangerouslySetInnerHTML={{ __html: marked.parse(promptText) }}></div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-300">
                                <span className="material-symbols-outlined text-4xl mb-2">visibility_off</span>
                                <p>No content to preview.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* RIGHT COLUMN: The Toolkit */}
        {!isFullScreen && (
            <div className="w-full lg:w-1/3 flex flex-col min-h-0">
                {/* Toolkit Tabs - Segmented Control Style */}
                <div className="bg-slate-200 p-1 rounded-xl flex mb-4 overflow-x-auto no-scrollbar">
                    {[
                        { id: 'enhance', icon: 'auto_awesome', label: 'Lyra' },
                        { id: 'structure', icon: 'dashboard', label: 'Struct' },
                        { id: 'vibe', icon: 'bolt', label: 'Vibe' },
                        { id: 'prospec', icon: 'integration_instructions', label: 'Spec' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveToolTab(tab.id as any)}
                            className={`flex-1 min-w-[60px] flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                                activeToolTab === tab.id 
                                ? 'bg-white text-slate-900 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                            <span className="hidden xl:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Toolkit Panel */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-grow flex flex-col overflow-hidden relative">
                    
                    {/* Processing Overlay */}
                    {isProcessing && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3 animate-fade-in">
                            <Spinner size="h-8 w-8" />
                            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide animate-pulse">
                                {isEnhancing ? 'Lyra Optimizing...' : isApplyingFramework ? 'Structuring...' : 'Generating...'}
                            </p>
                        </div>
                    )}

                    {/* Result View (Overlay Mode for Vibe/Spec) */}
                    {resultGeneratedText && resultType !== 'Enhancement' && resultType !== 'Framework' ? (
                        <div className="absolute inset-0 bg-white z-40 flex flex-col animate-slide-up">
                            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50">
                                <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                    Result Ready
                                </h3>
                                <div className="flex gap-2">
                                     <button onClick={downloadArtifact} className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded-md" title="Download">
                                        <span className="material-symbols-outlined text-lg">download</span>
                                    </button>
                                    <button onClick={clearResult} className="p-1.5 text-slate-400 hover:bg-white rounded-md">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-grow overflow-hidden flex flex-col">
                                <div className="p-4 overflow-y-auto h-full bg-slate-50">
                                    <div className="text-xs text-slate-800 font-mono whitespace-pre-wrap">{resultGeneratedText}</div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-slate-100 flex gap-3 bg-white">
                                <button onClick={clearResult} className="flex-1 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                    Discard
                                </button>
                                <button onClick={acceptChanges} className="flex-[2] py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-colors">
                                    Apply to Editor
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Tool Content
                        <div className="p-5 overflow-y-auto flex-grow custom-scrollbar">
                            
                            {/* Lyra */}
                            {activeToolTab === 'enhance' && (
                                <div className="space-y-5 animate-fade-in">
                                    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="bg-indigo-100 p-1.5 rounded-md text-indigo-600">
                                                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                                            </div>
                                            <h3 className="font-bold text-indigo-900 text-sm">Lyra Optimizer</h3>
                                        </div>
                                        <p className="text-xs text-indigo-700/80 leading-relaxed">
                                            Enhance prompt clarity using the 4-D methodology.
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Target Model</label>
                                            <select value={enhancementTargetAI} onChange={e => setEnhancementTargetAI(e.target.value)} className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                                                {LYRA_ENHANCEMENT_OPTIONS.targetAI.map(ai => <option key={ai} value={ai}>{ai}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Style</label>
                                            <select value={enhancementStyle} onChange={e => setEnhancementStyle(e.target.value)} className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                                                {LYRA_ENHANCEMENT_OPTIONS.style.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <button onClick={handleEnhance} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                                            <span>Enhance Prompt</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Structure */}
                            {activeToolTab === 'structure' && (
                                <div className="space-y-5 animate-fade-in">
                                    <div className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="bg-sky-100 p-1.5 rounded-md text-sky-600">
                                                <span className="material-symbols-outlined text-lg">dashboard</span>
                                            </div>
                                            <h3 className="font-bold text-sky-900 text-sm">Framework Applicator</h3>
                                        </div>
                                        <p className="text-xs text-sky-700/80 leading-relaxed">
                                            Restructure content into a proven engineering format.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1.5">Framework</label>
                                        <select value={activeFramework || ''} onChange={e => setActiveFramework(e.target.value as PromptFramework)} className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none">
                                            <option value="">Select a framework...</option>
                                            {Object.entries(PROMPT_FRAMEWORKS).map(([key, fw]) => <option key={key} value={key}>{fw.name}</option>)}
                                        </select>
                                    </div>
                                    
                                    {activeFramework && (
                                        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            {PROMPT_FRAMEWORKS[activeFramework].description}
                                        </div>
                                    )}

                                    <button onClick={handleApplyFramework} disabled={!activeFramework} className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                        Apply Structure
                                    </button>
                                </div>
                            )}

                            {/* Vibe */}
                            {activeToolTab === 'vibe' && (
                                <div className="space-y-5 animate-fade-in">
                                     <div className="bg-gradient-to-br from-fuchsia-50 to-white border border-fuchsia-100 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="bg-fuchsia-100 p-1.5 rounded-md text-fuchsia-600">
                                                <span className="material-symbols-outlined text-lg">bolt</span>
                                            </div>
                                            <h3 className="font-bold text-fuchsia-900 text-sm">Vibe Coding</h3>
                                        </div>
                                        <p className="text-xs text-fuchsia-700/80 leading-relaxed">
                                            Turn abstract vibes into concrete code artifacts.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg">
                                        <button onClick={() => setVibeMode('spec')} className={`py-1.5 text-xs font-bold rounded-md transition-all ${vibeMode === 'spec' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>
                                            Spec
                                        </button>
                                        <button onClick={() => setVibeMode('component')} className={`py-1.5 text-xs font-bold rounded-md transition-all ${vibeMode === 'component' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>
                                            Component
                                        </button>
                                    </div>

                                    <button onClick={() => insertTemplate(VIBE_TEMPLATE, 'Code Generation', 'Vibe Template Added')} className="w-full py-2 border border-dashed border-fuchsia-300 text-fuchsia-600 hover:bg-fuchsia-50 rounded-lg text-xs font-bold transition-colors">
                                        + Insert Vibe Template
                                    </button>

                                    <button onClick={handleVibeGenerate} className="w-full py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95">
                                        Generate {vibeMode === 'spec' ? 'Spec' : 'Component'}
                                    </button>

                                    {/* How to Vibe Code Guide */}
                                    <div className="mt-6 border-t border-slate-100 pt-5">
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">How to Vibe Code</h4>
                                        <div className="space-y-4">
                                            {[
                                                { step: '1', title: 'Describe Vibe', desc: 'Write about the mood, colors, and purpose of your product in the editor.' },
                                                { step: '2', title: 'Select Output', desc: 'Choose between a PRO-SPEC (document) or a functional React Component.' },
                                                { step: '3', title: 'Generate', desc: 'Hit the button to let Gemini transform your vibe into a technical asset.' }
                                            ].map(item => (
                                                <div key={item.step} className="flex gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        {item.step}
                                                    </div>
                                                    <div>
                                                        <h5 className="text-xs font-bold text-slate-800 leading-none mb-1">{item.title}</h5>
                                                        <p className="text-[10px] text-slate-500 leading-tight">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Vibe Starters */}
                                    <div className="mt-6 border-t border-slate-100 pt-5">
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Vibe Starters</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                            {VIBE_STARTERS.map(starter => (
                                                <button 
                                                    key={starter.title}
                                                    onClick={() => insertTemplate(starter.text, 'Code Generation', `${starter.title} starter added.`)}
                                                    className="text-left px-3 py-2 bg-slate-50 hover:bg-fuchsia-50 border border-slate-100 hover:border-fuchsia-200 rounded-lg group transition-all"
                                                >
                                                    <div className="text-[10px] font-bold text-fuchsia-600 mb-0.5">{starter.title}</div>
                                                    <div className="text-[10px] text-slate-500 line-clamp-1 group-hover:text-fuchsia-800">{starter.text}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Pro-Spec */}
                            {activeToolTab === 'prospec' && (
                                <div className="space-y-5 animate-fade-in">
                                    <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="bg-emerald-100 p-1.5 rounded-md text-emerald-600">
                                                <span className="material-symbols-outlined text-lg">integration_instructions</span>
                                            </div>
                                            <h3 className="font-bold text-emerald-900 text-sm">PRO-SPEC Builder</h3>
                                        </div>
                                        <p className="text-xs text-emerald-700/80 leading-relaxed">
                                            Construct rigorous 5-layer specs to prevent context drift.
                                        </p>
                                    </div>

                                    <button 
                                        onClick={() => insertTemplate(PRO_SPEC_TEMPLATE, 'Code Generation', 'PRO-SPEC Template Added')} 
                                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-sm">description</span>
                                        Insert Full PRO-SPEC
                                    </button>

                                    <div className="space-y-3 pt-4 border-t border-slate-100">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Layer Snippets</div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {Object.entries(LAYER_SNIPPETS).map(([key, snippet]) => {
                                                const isPresent = promptText.includes(`[${key}]`);
                                                return (
                                                    <button 
                                                        key={key}
                                                        onClick={() => !isPresent && insertLayerSnippet(key as any)}
                                                        disabled={isPresent}
                                                        className={`w-full flex items-center justify-between px-3 py-2.5 border rounded-lg text-xs font-bold transition-all ${
                                                            isPresent 
                                                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60' 
                                                            : 'bg-slate-50 hover:bg-emerald-50 border-slate-100 hover:border-emerald-200 text-slate-600 hover:text-emerald-700'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${isPresent ? 'bg-slate-200' : 'bg-emerald-100 text-emerald-700'}`}>
                                                                {key}
                                                            </div>
                                                            <span>Layer {key.replace('L', '')}</span>
                                                        </div>
                                                        <span className="material-symbols-outlined text-sm opacity-50">
                                                            {isPresent ? 'check' : 'add'}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} title="Save to My Praia">
        <form onSubmit={handleFinalSave} className="space-y-6">
          <div>
            <label htmlFor="modalTitle" className="block text-sm font-bold text-slate-700 mb-1">Title</label>
            <input 
              type="text" 
              id="modalTitle" 
              value={modalTitle} 
              onChange={e => setModalTitle(e.target.value)} 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
              required 
              placeholder="e.g., Blog Post Generator"
            />
          </div>
          <div>
            <label htmlFor="modalDescription" className="block text-sm font-bold text-slate-700 mb-1">Description</label>
            <textarea 
              id="modalDescription" 
              value={modalDescription} 
              onChange={e => setModalDescription(e.target.value)} 
              rows={3} 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
              required
              placeholder="What does this prompt do?"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value as PromptCategory)} className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                        {PROMPT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Visibility</label>
                    <div className={`flex items-center p-3 border border-slate-300 rounded-lg ${isCommunityCopy ? 'bg-slate-100' : 'bg-white'}`}>
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={e => setIsPublic(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                            disabled={isCommunityCopy}
                        />
                        <span className="ml-2 text-sm text-slate-700">Public (Community Hub)</span>
                    </div>
                </div>
            </div>
            
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={() => setIsSaveModalOpen(false)} className="px-5 py-2.5 rounded-lg text-slate-600 font-bold hover:bg-slate-100 transition-colors">
                Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                Save Prompt
            </button>
          </div>
        </form>
      </Modal>
      
      <Modal isOpen={showHistory} onClose={() => setShowHistory(false)} title="Version History">
        <div className="space-y-3">
            {historyId && getPromptHistory(historyId).map((v) => (
                <div key={v.id} className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                    <div 
                        className="flex justify-between items-center p-3 cursor-pointer hover:bg-slate-100"
                        onClick={() => setExpandedVersionId(expandedVersionId === v.id ? null : v.id)}
                    >
                        <div>
                            <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                <span className={`material-symbols-outlined text-slate-400 text-base transition-transform ${expandedVersionId === v.id ? 'rotate-90' : ''}`}>chevron_right</span>
                                v{v.version} 
                                {v.isLatest && <span className="bg-indigo-100 text-indigo-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase">Latest</span>}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5 pl-6">{new Date(v.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={(e) => { e.stopPropagation(); handleLoadVersion(v); }} className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors">
                                Load
                            </button>
                            {!v.isLatest && (
                                <button onClick={(e) => { e.stopPropagation(); handleRevertVersion(v); }} className="px-3 py-1 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors">
                                    Revert
                                </button>
                            )}
                        </div>
                    </div>
                    {expandedVersionId === v.id && (
                        <div className="p-3 bg-white border-t border-slate-200 text-xs font-mono text-slate-600 whitespace-pre-wrap max-h-40 overflow-y-auto">
                            {v.promptText}
                        </div>
                    )}
                </div>
            ))}
            {(!historyId || getPromptHistory(historyId || '').length === 0) && (
                <p className="text-center text-slate-500 py-4 text-sm">No history available.</p>
            )}
        </div>
      </Modal>
    </div>
  );
};

export default PromptStudio;
