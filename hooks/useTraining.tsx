import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import { TrainingModule } from '../types';
import { useAuth } from './useAuth';
import { PUBLIC_TRAINING_MODULES } from '../constants';
import { useNotification } from './useNotification';

let localTrainings: TrainingModule[] = [];

interface TrainingContextType {
  trainings: TrainingModule[];
  loading: boolean;
  toggleFavoriteTraining: (publicTrainingId: string) => Promise<void>;
  isTrainingFavorited: (publicTrainingId: string) => boolean;
  saveTraining: (training: Omit<TrainingModule, 'id' | 'createdAt' | 'uid'> & { id?: string }) => Promise<void>;
  deleteTraining: (id: string) => Promise<void>;
  getTrainingById: (id: string) => TrainingModule | undefined;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [trainings, setTrainings] = useState<TrainingModule[]>([]);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (user) {
        setTrainings(localTrainings);
    } else {
        localTrainings = [];
        setTrainings([]);
    }
  }, [user]);
  
  const getTrainingById = (id: string) => trainings.find(t => t.id === id);

  const isTrainingFavorited = (publicTrainingId: string): boolean => {
      return localTrainings.some(t => t.originalPublicId === publicTrainingId && t.isFavorited);
  }
  
  const saveTraining = async (trainingData: Omit<TrainingModule, 'id' | 'createdAt' | 'uid'> & { id?: string }) => {
    if (!user) throw new Error("User not authenticated");
    if (trainingData.id) { // Editing
        localTrainings = localTrainings.map(t => t.id === trainingData.id ? { ...t, ...trainingData, id: t.id, uid: t.uid, createdAt: t.createdAt } as TrainingModule : t);
    } else { // Creating
        const newTraining: TrainingModule = {
            ...trainingData,
            id: `user-training-${Date.now()}`,
            uid: user.uid,
            createdAt: Date.now()
        };
        localTrainings = [...localTrainings, newTraining];
    }
    setTrainings([...localTrainings]);
    addNotification('Training module saved successfully!', 'success');
  };

  const deleteTraining = async (id: string) => {
    if (!user) return;
    localTrainings = localTrainings.filter(t => t.id !== id);
    setTrainings(localTrainings);
    addNotification('Training module deleted.', 'info');
  };

  const toggleFavoriteTraining = async (publicTrainingId: string) => {
    if (!user) return;

    const trainingModule = PUBLIC_TRAINING_MODULES.find(t => t.id === publicTrainingId);
    if (!trainingModule) return;

    const existingFavorite = localTrainings.find(t => t.originalPublicId === publicTrainingId);

    if (existingFavorite) {
        localTrainings = localTrainings.filter(t => t.originalPublicId !== publicTrainingId);
        addNotification(`'${trainingModule.title}' removed from favorites.`, 'info');
    } else {
        // Exclude the bulky 'content' field from being saved to the DB for favorites.
        const { content, ...restOfModule } = trainingModule;
        const newFavorite: TrainingModule = {
            ...restOfModule,
            content: [],
            id: `fav-training-${trainingModule.id}-${Date.now()}`,
            uid: user.uid,
            isFavorited: true,
            originalPublicId: trainingModule.id,
            createdAt: Date.now()
        };
        localTrainings = [...localTrainings, newFavorite];
        addNotification(`'${trainingModule.title}' added to favorites!`, 'success');
    }
    setTrainings([...localTrainings].sort((a,b) => a.title.localeCompare(b.title)));
  };

  const sortedTrainings = useMemo(() => trainings.sort((a,b) => a.title.localeCompare(b.title)), [trainings]);

  return (
    <TrainingContext.Provider value={{ trainings: sortedTrainings, loading, toggleFavoriteTraining, isTrainingFavorited, saveTraining, deleteTraining, getTrainingById }}>
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = (): TrainingContextType => {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};
