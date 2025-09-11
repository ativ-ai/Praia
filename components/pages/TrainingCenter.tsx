
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PUBLIC_TRAINING_MODULES, TRAINING_CATEGORIES } from '../../constants';
import { useTraining } from '../../hooks/useTraining';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import TrainingCard from '../shared/TrainingCard';
import usePageTitle from '../../hooks/usePageTitle';
import { TrainingCategory } from '../../types';
import Icon from '../shared/Icon';

const TrainingCenter: React.FC = () => {
  usePageTitle('Training Center');
  const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | 'All'>('All');
  
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const { toggleFavoriteTraining, isTrainingFavorited } = useTraining();

  const handleFavoriteTraining = (id: string) => {
    if (!user) {
      addNotification('Please log in to add favorites.', 'info');
      navigate('/login', { state: { from: location } });
      return;
    }
    toggleFavoriteTraining(id);
  };
  
  const handleCategoryClick = (category: TrainingCategory) => {
    setSelectedCategory(category);
  };

  const filteredModules = useMemo(() => {
    if (selectedCategory === 'All') {
      return PUBLIC_TRAINING_MODULES;
    }
    return PUBLIC_TRAINING_MODULES.filter(module => module.category === selectedCategory);
  }, [selectedCategory]);

  const CategoryButton: React.FC<{ category: TrainingCategory | 'All' }> = ({ category }) => {
    const isActive = selectedCategory === category;
    const count = category === 'All' ? PUBLIC_TRAINING_MODULES.length : PUBLIC_TRAINING_MODULES.filter(m => m.category === category).length;
    
    return (
      <button
        onClick={() => setSelectedCategory(category)}
        className={`w-full flex justify-between items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive
            ? 'bg-sky-100 text-sky-800'
            : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <span className="truncate">{category}</span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${isActive ? 'bg-sky-200 text-sky-900' : 'bg-slate-200 text-slate-700'}`}>{count}</span>
      </button>
    )
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Training Center</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600">Level up your AI skills with curated guides and best practices.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4 xl:w-1/5 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="text-lg font-bold text-slate-800 mb-4 px-3">Categories</h2>
            <nav className="space-y-1">
              <CategoryButton category="All" />
              {TRAINING_CATEGORIES.map(cat => <CategoryButton key={cat} category={cat} />)}
            </nav>
          </div>
        </aside>
        
        <main className="flex-grow min-w-0">
          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredModules.map((module) => (
                  <TrainingCard 
                      key={module.id}
                      module={module}
                      onClick={() => navigate(`/detail/training/${module.id}`, { state: { background: location }})}
                      onFavorite={() => handleFavoriteTraining(module.originalPublicId || module.id)}
                      isFavorited={isTrainingFavorited(module.originalPublicId || module.id)}
                      onCategoryClick={handleCategoryClick}
                    />
              ))}
            </div>
          ) : (
             <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
                <Icon name="academicCap" className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-2 text-lg font-medium text-slate-900">No Training Modules Found</h3>
                <p className="mt-1 text-sm text-slate-500">There are no training modules in this category yet.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TrainingCenter;