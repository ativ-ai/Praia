import React, { useState } from 'react';
import { useNotification } from '../../hooks/useNotification';
import { LYRA_ENHANCEMENT_OPTIONS, PROMPT_FRAMEWORKS } from '../../constants';
import { enhancePrompt, applyFrameworkToPrompt } from '../../services/geminiService';
import { PromptFramework } from '../../types';
import Spinner from '../shared/Spinner';
import usePageTitle from '../../hooks/usePageTitle';
import Icon from '../shared/Icon';
import Tooltip from '../shared/Tooltip';

const PromptPlayground: React.FC = () => {
  usePageTitle('Prompt Studio');
  const { addNotification } = useNotification();

  const [promptText, setPromptText] = useState('');
  
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancementTargetAI, setEnhancementTargetAI] = useState(LYRA_ENHANCEMENT_OPTIONS.targetAI[0]);
  const [enhancementStyle, setEnhancementStyle] = useState(LYRA_ENHANCEMENT_OPTIONS.style[0]);
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);

  const [isApplyingFramework, setIsApplyingFramework] = useState(false);
  const [selectedFrameworkForRewrite, setSelectedFrameworkForRewrite] = useState<PromptFramework>(PromptFramework.RTF);
  const [rewrittenPrompt, setRewrittenPrompt] = useState<string | null>(null);

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
  
  const handleCopy = (textToCopy: string | null) => {
      if(textToCopy) {
          navigator.clipboard.writeText(textToCopy);
          addNotification('Prompt copied to clipboard!', 'success');
      }
  }

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
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-6xl">Prompt Studio</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
          Craft, enhance, and structure your prompts with our AI-powered assistant.
        </p>
      </div>
      
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-6">
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="promptText" className="block text-sm font-bold text-slate-700">Your Prompt</label>
              <Tooltip text="Enter your initial prompt here. It can be a rough idea or a detailed request. The more context you provide, the better Lyra can assist you." />
            </div>
            <textarea 
              id="promptText" 
              value={promptText} 
              onChange={e => setPromptText(e.target.value)} 
              rows={24} 
              className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm bg-slate-50 placeholder-slate-400" 
              placeholder="e.g., Write a marketing email for a new coffee brand..." 
            />
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
                    <div className="flex items-center justify-center h-48 bg-slate-100 rounded-md">
                        <Spinner />
                    </div>
                ) : enhancedPrompt && (
                    <>
                    <div className="p-3 bg-slate-100 rounded-md text-sm text-slate-800 whitespace-pre-wrap break-words max-h-64 overflow-y-auto border border-slate-200">
                        {enhancedPrompt}
                    </div>
                    <button type="button" onClick={() => handleCopy(enhancedPrompt)} className="mt-2 w-full text-center bg-green-100 text-green-800 font-bold py-2 px-3 text-sm rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2">
                        <Icon name="copy" className="w-4 h-4" /> Copy Enhanced Prompt
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
        </div>
      </div>
    </div>
  );
};

export default PromptPlayground;