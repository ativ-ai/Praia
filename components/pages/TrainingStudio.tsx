
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTraining } from '../../hooks/useTraining';
import { useNotification } from '../../hooks/useNotification';
import { TRAINING_CATEGORIES } from '../../constants';
import { TrainingModule, TrainingContent, TrainingCategory } from '../../types';
import usePageTitle from '../../hooks/usePageTitle';

const TrainingStudio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTrainingById, saveTraining } = useTraining();
  const { addNotification } = useNotification();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TrainingCategory>('Fundamentals');
  const [content, setContent] = useState<TrainingContent[]>([{ id: `c-${Date.now()}`, title: '', details: '', example: '' }]);

  const pageTitle = id ? 'Edit Training Module' : 'Create New Training Module';
  usePageTitle(pageTitle);

  useEffect(() => {
    if (id) {
      const moduleToEdit = getTrainingById(id);
      if (moduleToEdit) {
        setTitle(moduleToEdit.title);
        setDescription(moduleToEdit.description);
        setCategory(moduleToEdit.category);
        setContent(moduleToEdit.content && moduleToEdit.content.length > 0 ? moduleToEdit.content : [{ id: `c-${Date.now()}`, title: '', details: '', example: '' }]);
      } else {
        addNotification('Training module not found!', 'error');
        navigate('/my-praia');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate, addNotification]);

  const handleContentChange = (index: number, field: keyof Omit<TrainingContent, 'id'>, value: string) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], [field]: value };
    setContent(newContent);
  };

  const addContentBlock = () => {
    setContent(prev => [...prev, { id: `c-${Date.now()}`, title: '', details: '', example: '' }]);
  };

  const removeContentBlock = (index: number) => {
    if (content.length <= 1) {
        addNotification('A training module must have at least one content block.', 'info');
        return;
    }
    setContent(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      addNotification('Please fill out Title and Description.', 'error');
      return;
    }
    
    if (content.some(c => !c.title.trim() || !c.details.trim())) {
      addNotification('Each content block must have at least a title and details.', 'error');
      return;
    }

    const moduleToSave: Omit<TrainingModule, 'id' | 'createdAt' | 'uid'> & { id?: string } = {
      title,
      description,
      category,
      content,
    };

    if (id) {
      moduleToSave.id = id;
    }
    
    await saveTraining(moduleToSave);
    navigate('/my-praia');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">{pageTitle}</h1>
      <p className="text-lg text-slate-600 mb-8">Build your own learning module to share or keep in your library.</p>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Module Title *</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm" required />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description *</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm" required></textarea>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value as TrainingCategory)} className="mt-1 block w-full border-slate-300 rounded-md shadow-sm">
            {TRAINING_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800">Content Blocks</h3>
          <div className="space-y-4 mt-2">
            {content.map((block, index) => (
              <div key={block.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 relative animate-fade-in">
                 <button type="button" onClick={() => removeContentBlock(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold p-1">&times;</button>
                 <div>
                    <label htmlFor={`content-title-${index}`} className="block text-xs font-medium text-slate-600">Block Title *</label>
                    <input id={`content-title-${index}`} type="text" value={block.title} onChange={e => handleContentChange(index, 'title', e.target.value)} className="mt-1 block w-full text-sm border-slate-300 rounded-md" required/>
                 </div>
                 <div>
                    <label htmlFor={`content-details-${index}`} className="block text-xs font-medium text-slate-600">Details *</label>
                    <textarea id={`content-details-${index}`} value={block.details} onChange={e => handleContentChange(index, 'details', e.target.value)} rows={4} className="mt-1 block w-full text-sm border-slate-300 rounded-md" required></textarea>
                 </div>
                 <div>
                    <label htmlFor={`content-example-${index}`} className="block text-xs font-medium text-slate-600">Example (Optional)</label>
                    <textarea id={`content-example-${index}`} value={block.example || ''} onChange={e => handleContentChange(index, 'example', e.target.value)} rows={3} className="mt-1 block w-full text-sm border-slate-300 rounded-md font-mono"></textarea>
                 </div>
                 <div>
                    <label htmlFor={`content-media-url-${index}`} className="block text-xs font-medium text-slate-600">Media URL (Optional)</label>
                    <input id={`content-media-url-${index}`} type="url" value={block.mediaUrl || ''} onChange={e => handleContentChange(index, 'mediaUrl', e.target.value)} className="mt-1 block w-full text-sm border-slate-300 rounded-md" placeholder="https://example.com/image.png"/>
                 </div>
                 <div>
                    <label htmlFor={`content-media-type-${index}`} className="block text-xs font-medium text-slate-600">Media Type</label>
                    <select id={`content-media-type-${index}`} value={block.mediaType || 'image'} onChange={e => handleContentChange(index, 'mediaType', e.target.value as any)} className="mt-1 block w-full text-sm border-slate-300 rounded-md">
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                    </select>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addContentBlock} className="mt-4 w-full text-sm font-medium text-sky-700 bg-sky-100 hover:bg-sky-200 rounded-lg py-2">
            + Add Content Block
          </button>
        </div>
        
        <div className="flex justify-end pt-4">
          <button type="submit" className="w-full sm:w-auto bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
            Save Training Module
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrainingStudio;