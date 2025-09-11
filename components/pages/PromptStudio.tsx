
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

const PromptStudio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getPromptById, savePrompt } = usePrompts();
  const { addNotification } = useNotification();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [promptText, setPromptText] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PromptCategory>('Ideation');
  
  const [activeFramework, setActiveFramework] = useState<PromptFramework | null>(null);
  const [frameworkData, setFrameworkData] = useState<Record<string, string>>({});

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancementTargetAI, setEnhancementTargetAI] = useState(LYRA_ENHANCEMENT_OPTIONS.targetAI[0]);
  const [enhancementStyle, setEnhancementStyle] = useState(LYRA_ENHANCEMENT_OPTIONS.style[0]);
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);

  const [isApplyingFramework, setIsApplyingFramework] = useState(false);
  const [selectedFrameworkForRewrite, setSelectedFrameworkForRewrite] = useState<PromptFramework>(PromptFramework.RTF);
  const [rewrittenPrompt, setRewrittenPrompt] = useState<string | null>(null);


  usePageTitle(id ? 'Edit Prompt' : 'Create New Prompt');

  useEffect(() => {
    const promptFromState = location.state?.prompt as Prompt | undefined;
    
    if (promptFromState) {
        // Using as a template
        setTitle(`${promptFromState.title} (Copy)`);
        setPromptText(promptFromState.promptText);
        setDescription(promptFromState.description);
        setCategory(promptFromState.category);
        setActiveFramework(promptFromState.framework || null);
        setFrameworkData(promptFromState.frameworkData || {});
    } else if (id) {
      // Editing an existing prompt
      const promptToEdit = getPromptById(id);
      if (promptToEdit) {
        setTitle(promptToEdit.title);
        setPromptText(promptToEdit.promptText);
        setDescription(promptToEdit.description);
        setCategory(promptToEdit.category);
        setActiveFramework(promptToEdit.framework || null);
        setFrameworkData(promptToEdit.frameworkData || {});
      } else {
        addNotification('Prompt not found!', 'error');
        navigate('/my-praia');
      }
    }
    // Intentionally not re-running when getPromptById changes to avoid loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.state, navigate, addNotification]);

  const handleFrameworkDataChange = (key: string, value: string) => {
    setFrameworkData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !promptText.trim() || !description.trim()) {
      addNotification('Please fill out the Title, Description, and Prompt Text fields.', 'error');
      return;
    }

    if (!user) {
        addNotification('Please log in to save your prompt.', 'info');
        navigate('/login', { state: { from: location } });
        return;
    }

    // FIX: Corrected the type definition for promptToSave to align with the `savePrompt` function's expected parameter type.
    const promptToSave: Omit<Prompt, 'id' | 'createdAt' | 'uid' | 'isFavorited' | 'originalPublicId' | 'historyId' | 'version' | 'isLatest'> & { id?: string } = {
      title,
      promptText,
      description,
      category,
      framework: activeFramework,
      frameworkData,
      folderId: id ? getPromptById(id)?.folderId : null // Preserve folder on edit
    };

    if (id && !location.state?.prompt) { // Only add ID if we are editing, not copying
      promptToSave.id = id;
    }

    await savePrompt(promptToSave);
    addNotification(`Prompt '${title}' saved successfully!`, 'success');
    navigate('/my-praia');
  };

  const handleEnhance = async () => {
    if (!promptText.trim()) {
      addNotification('Please enter some text in the prompt editor to enhance.', 'info');
      return;
    }
    setIsEnhancing(true);
    setEnhancedPrompt(null);
    try {
      const result = await enhancePrompt(promptText, enhancementTargetAI, enhancementStyle);
      setEnhancedPrompt(result);
      addNotification('Prompt enhanced successfully!', 'success');
    } catch (error: any) {
      addNotification(error.message, 'error');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleApplyFramework = async () => {
    if (!promptText.trim()) {
      addNotification('Please enter your original prompt text before applying a framework.', 'info');
      return;
    }
    setIsApplyingFramework(true);
    setRewrittenPrompt(null);
    try {
      const result = await applyFrameworkToPrompt(promptText, selectedFrameworkForRewrite);
      setRewrittenPrompt(result);
      addNotification('Framework applied successfully!', 'success');
    } catch (error: any) {
      addNotification(error.message, 'error');
    } finally {
      setIsApplyingFramework(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2 sm:text-5xl">{id && !location.state?.prompt ? 'Edit Prompt' : 'Create New Prompt'}</h1>
      <p className="text-lg text-slate-600 mb-8">Craft and save prompts to your personal library.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-6">
            <div>
              <label htmlFor="title" className="flex items-center text-sm font-bold text-slate-700 mb-1">Title <Tooltip text="A short, descriptive title for your prompt that will make it easy to find in your library." /></label>
              <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            
            <div>
              <label htmlFor="description" className="flex items-center text-sm font-bold text-slate-700 mb-1">Description <Tooltip text="A brief explanation of what this prompt does, who it's for, or how to use it effectively." /></label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-1">Category</label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value as PromptCategory)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                {PROMPT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div>
                <h3 className="flex items-center text-sm font-bold text-slate-700">Framework (Optional) <Tooltip text="Frameworks add structure to your prompt. Choosing one will provide specific fields to fill out, helping the AI understand your request with greater precision." /></h3>
                <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(PROMPT_FRAMEWORKS).filter(([,fw]) => fw.fields.length > 0).map(([key, fw]) => (
                        <button key={key} type="button" onClick={() => setActiveFramework(activeFramework === key ? null : key as PromptFramework)} className={`px-4 py-1.5 text-sm font-semibold rounded-full border transition-all transform hover:scale-105 ${activeFramework === key ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'}`}>
                            {fw.name}
                        </button>
                    ))}
                </div>
            </div>
            
            {activeFramework && PROMPT_FRAMEWORKS[activeFramework] && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4 animate-fade-in">
                    <h4 className="font-bold text-slate-800">{PROMPT_FRAMEWORKS[activeFramework].name}</h4>
                    <p className="text-sm text-slate-600">{PROMPT_FRAMEWORKS[activeFramework].description}</p>
                    {PROMPT_FRAMEWORKS[activeFramework].fields.map(field => (
                        <div key={field.key}>
                            <label htmlFor={field.key} className="block text-sm font-bold text-slate-700 mb-1">{field.label}</label>
                            <input type="text" id={field.key} value={frameworkData[field.key] || ''} onChange={e => handleFrameworkDataChange(field.key, e.target.value)} placeholder={field.placeholder} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"/>
                        </div>
                    ))}
                </div>
            )}
            
            <div>
              <label htmlFor="promptText" className="block text-sm font-bold text-slate-700 mb-1">Prompt Text Editor</label>
              <textarea id="promptText" value={promptText} onChange={e => setPromptText(e.target.value)} rows={12} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm bg-slate-900 text-slate-100 placeholder-slate-500" placeholder="Act as a..." required></textarea>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6 sticky top-28">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-4 rounded-lg -m-2 mb-4 text-white">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Icon name="sparkles" className="w-6 h-6" /> Lyra Prompt Enhancer
                  </h3>
                  <p className="text-sm text-indigo-100 mt-1">Use AI to optimize your prompt for better results.</p>
                </div>
              
              <div className="space-y-4">
                 <div>
                    <label htmlFor="targetAI" className="flex items-center text-xs font-medium text-slate-600">Target AI <Tooltip text="Select the AI model you intend to use this prompt with. Lyra will tailor the optimization for that model's specific strengths." /></label>
                    <select id="targetAI" value={enhancementTargetAI} onChange={e => setEnhancementTargetAI(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                      {LYRA_ENHANCEMENT_OPTIONS.targetAI.map(ai => <option key={ai} value={ai}>{ai}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="style" className="flex items-center text-xs font-medium text-slate-600">Style <Tooltip text="BASIC optimization provides a quick refinement of your prompt. DETAIL (coming soon) will involve Lyra asking clarifying questions for a more in-depth enhancement." /></label>
                    <select id="style" value={enhancementStyle} onChange={e => setEnhancementStyle(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                      {LYRA_ENHANCEMENT_OPTIONS.style.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                <button type="button" onClick={handleEnhance} disabled={isEnhancing} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md">
                  {isEnhancing ? <><Spinner size="h-5 w-5" /> Enhancing...</> : 'Enhance with Lyra'}
                </button>
              </div>

              {(isEnhancing || enhancedPrompt) && (
                <div className="mt-4 pt-4 border-t border-slate-200 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Enhanced Prompt:</h4>
                   {isEnhancing ? (
                    <div className="flex items-center justify-center h-32 bg-slate-100 rounded-md">
                        <Spinner />
                    </div>
                   ) : enhancedPrompt && (
                    <>
                    <div className="p-3 bg-slate-100 rounded-md text-sm text-slate-800 whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
                        {enhancedPrompt}
                    </div>
                    <button type="button" onClick={() => setPromptText(enhancedPrompt)} className="mt-2 w-full text-center bg-green-100 text-green-800 font-bold py-2 px-3 text-sm rounded-lg hover:bg-green-200 transition-colors">
                        Use this version
                    </button>
                    </>
                   )}
                </div>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Icon name="beaker" className="w-6 h-6 text-indigo-600" /> Prompt Frameworks
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="framework-applicator" className="flex items-center text-xs font-medium text-slate-600">Select Framework <Tooltip text="Choose a structured framework. The AI will rewrite your current prompt to fit this structure." /></label>
                  <select id="framework-applicator" value={selectedFrameworkForRewrite} onChange={e => setSelectedFrameworkForRewrite(e.target.value as PromptFramework)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                    {Object.entries(PROMPT_FRAMEWORKS).map(([key, fw]) => <option key={key} value={key}>{fw.name}</option>)}
                  </select>
                </div>
                <button type="button" onClick={handleApplyFramework} disabled={isApplyingFramework} className="w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md">
                  {isApplyingFramework ? <><Spinner size="h-5 w-5" /> Applying...</> : 'Apply Framework'}
                </button>
              </div>

              {(isApplyingFramework || rewrittenPrompt) && (
                <div className="mt-4 pt-4 border-t border-slate-200 animate-fade-in">
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Rewritten Prompt:</h4>
                  {isApplyingFramework ? (
                    <div className="flex items-center justify-center h-32 bg-slate-100 rounded-md"><Spinner /></div>
                  ) : rewrittenPrompt && (
                    <>
                      <div className="p-3 bg-slate-100 rounded-md text-sm text-slate-800 whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
                          {rewrittenPrompt}
                      </div>
                      <button type="button" onClick={() => setPromptText(rewrittenPrompt)} className="mt-2 w-full text-center bg-green-100 text-green-800 font-bold py-2 px-3 text-sm rounded-lg hover:bg-green-200 transition-colors">
                          Use this version
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
              Save Prompt to Library
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptStudio;
