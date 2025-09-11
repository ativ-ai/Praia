
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { usePrompts } from '../../hooks/usePrompts';
import { useNotification } from '../../hooks/useNotification';
import { useAuth } from '../../hooks/useAuth';
import { PROMPT_FRAMEWORKS, PROMPT_CATEGORIES, LYRA_ENHANCEMENT_OPTIONS } from '../../constants';
import { PromptFramework, PromptCategory, Prompt } from '../../types';
import { enhancePrompt } from '../../services/geminiService';
import Spinner from '../shared/Spinner';
import usePageTitle from '../../hooks/usePageTitle';

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

    const promptToSave: Omit<Prompt, 'id' | 'createdAt' | 'uid' | 'isFavorited' | 'originalPublicId'> & { id?: string; folderId?: string | null } = {
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

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">{id && !location.state?.prompt ? 'Edit Prompt' : 'Create New Prompt'}</h1>
      <p className="text-lg text-slate-600 mb-8">Craft and refine your prompts with powerful frameworks and AI optimization.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
              <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required></textarea>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value as PromptCategory)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500">
                {PROMPT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div>
                <h3 className="text-sm font-medium text-slate-700">Framework (Optional)</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(PROMPT_FRAMEWORKS).filter(([,fw]) => fw.fields.length > 0).map(([key, fw]) => (
                        <button key={key} type="button" onClick={() => setActiveFramework(activeFramework === key ? null : key as PromptFramework)} className={`px-3 py-1 text-sm rounded-full border transition-colors ${activeFramework === key ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-300'}`}>
                            {fw.name}
                        </button>
                    ))}
                </div>
            </div>
            
            {activeFramework && PROMPT_FRAMEWORKS[activeFramework] && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4 animate-fade-in">
                    <h4 className="font-semibold text-slate-800">{PROMPT_FRAMEWORKS[activeFramework].name}</h4>
                    <p className="text-sm text-slate-600">{PROMPT_FRAMEWORKS[activeFramework].description}</p>
                    {PROMPT_FRAMEWORKS[activeFramework].fields.map(field => (
                        <div key={field.key}>
                            <label htmlFor={field.key} className="block text-sm font-medium text-slate-700">{field.label}</label>
                            <input type="text" id={field.key} value={frameworkData[field.key] || ''} onChange={e => handleFrameworkDataChange(field.key, e.target.value)} placeholder={field.placeholder} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-sm"/>
                        </div>
                    ))}
                </div>
            )}
            
            <div>
              <label htmlFor="promptText" className="block text-sm font-medium text-slate-700">Prompt Text Editor</label>
              <textarea id="promptText" value={promptText} onChange={e => setPromptText(e.target.value)} rows={10} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 font-mono text-sm" placeholder="Act as a..." required></textarea>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span role="img" aria-label="lyra">✨</span> Lyra Prompt Enhancer
              </h3>
              <p className="text-sm text-slate-600 mt-1 mb-4">Use AI to optimize your prompt for better results.</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="targetAI" className="block text-xs font-medium text-slate-600">Target AI</label>
                  <select id="targetAI" value={enhancementTargetAI} onChange={e => setEnhancementTargetAI(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-sm">
                    {LYRA_ENHANCEMENT_OPTIONS.targetAI.map(ai => <option key={ai} value={ai}>{ai}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="style" className="block text-xs font-medium text-slate-600">Style</label>
                  <select id="style" value={enhancementStyle} onChange={e => setEnhancementStyle(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-sm">
                    {LYRA_ENHANCEMENT_OPTIONS.style.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button type="button" onClick={handleEnhance} disabled={isEnhancing} className="w-full bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  {isEnhancing ? <><Spinner size="h-5 w-5" /> Enhancing...</> : 'Enhance with Lyra'}
                </button>
              </div>

              {enhancedPrompt && (
                <div className="mt-4 pt-4 border-t border-slate-200 animate-fade-in">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Enhanced Prompt:</h4>
                  <div className="p-3 bg-slate-100 rounded-md text-sm text-slate-800 whitespace-pre-wrap break-words">
                    {enhancedPrompt}
                  </div>
                  <button type="button" onClick={() => setPromptText(enhancedPrompt)} className="mt-2 w-full text-center bg-green-100 text-green-800 font-semibold py-1.5 px-3 text-sm rounded-lg hover:bg-green-200 transition-colors">
                    Use this version
                  </button>
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
              Save Prompt
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptStudio;