
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAITools } from '../../hooks/useAITools';
import { useNotification } from '../../hooks/useNotification';
import { AI_TOOL_CATEGORIES } from '../../constants';
import { AITool, AIToolCategory } from '../../types';
import usePageTitle from '../../hooks/usePageTitle';

const ToolStudio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getToolById, saveTool } = useAITools();
  const { addNotification } = useNotification();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState<AIToolCategory>('Productivity');
  const [iconUrl, setIconUrl] = useState('');
  
  const pageTitle = id ? 'Edit AI Tool' : 'Create New AI Tool';
  usePageTitle(pageTitle);

  useEffect(() => {
    if (id) {
      const toolToEdit = getToolById(id);
      if (toolToEdit) {
        setName(toolToEdit.name);
        setDescription(toolToEdit.description);
        setLink(toolToEdit.link);
        setCategory(toolToEdit.category);
        setIconUrl(toolToEdit.iconUrl);
      } else {
        addNotification('Tool not found!', 'error');
        navigate('/my-praia');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate, addNotification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !link.trim()) {
      addNotification('Please fill out all required fields.', 'error');
      return;
    }

    const toolToSave: Omit<AITool, 'id' | 'createdAt' | 'uid'> & { id?: string } = {
      name,
      description,
      link,
      category,
      iconUrl: iconUrl || `https://fav.farm/🛠️`,
    };

    if (id) {
      toolToSave.id = id;
    }

    await saveTool(toolToSave);
    navigate('/my-praia');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">{pageTitle}</h1>
      <p className="text-lg text-slate-600 mb-8">Add a new AI tool to your personal library or edit an existing one.</p>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Tool Name *</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description *</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required></textarea>
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium text-slate-700">Website Link *</label>
          <input type="url" id="link" value={link} onChange={e => setLink(e.target.value)} placeholder="https://example.com" className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" required />
        </div>

        <div>
          <label htmlFor="iconUrl" className="block text-sm font-medium text-slate-700">Icon URL</label>
          <input type="url" id="iconUrl" value={iconUrl} onChange={e => setIconUrl(e.target.value)} placeholder="https://example.com/icon.png" className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
           <p className="mt-1 text-xs text-slate-500">Provide a direct link to an image file. Leave blank for a default icon.</p>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value as AIToolCategory)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500">
            {AI_TOOL_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        
        <div className="flex justify-end pt-4">
          <button type="submit" className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
            Save Tool
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToolStudio;