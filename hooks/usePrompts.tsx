import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Prompt, PromptFolder } from '../types';
import { useAuth } from './useAuth';
import { PUBLIC_PROMPTS } from '../constants';
import { useNotification } from './useNotification';

// Simulating a local database for prompts that resets on refresh
let localPrompts: Prompt[] = [];
let localFolders: PromptFolder[] = [];

interface PromptContextType {
  prompts: Prompt[];
  folders: PromptFolder[];
  loading: boolean;
  getPromptById: (id: string) => Prompt | undefined;
  savePrompt: (prompt: Omit<Prompt, 'id' | 'createdAt' | 'uid'> & { id?: string }) => Promise<void>;
  deletePrompt: (id:string) => Promise<void>;
  toggleFavoritePrompt: (publicPromptId: string) => Promise<void>;
  createFolder: (name: string) => Promise<void>;
  movePrompt: (promptId: string, folderId: string | null) => Promise<void>;
  getPromptsInFolder: (folderId: string | null) => Prompt[];
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

const addDefaultData = (userId: string) => {
    const defaultFavorite = PUBLIC_PROMPTS[0];
    const initialPrompts: Prompt[] = [
        {
            ...defaultFavorite,
            uid: userId,
            isFavorited: true,
            originalPublicId: defaultFavorite.id,
            createdAt: Date.now(),
            id: `user-prompt-${Date.now()}`
        }
    ];
    const initialFolders: PromptFolder[] = [
        { id: `folder-1-${Date.now()}`, name: 'Blog Post Ideas', uid: userId },
        { id: `folder-2-${Date.now()}`, name: 'Client Email Templates', uid: userId },
    ];
    localPrompts = initialPrompts;
    localFolders = initialFolders;
    return { prompts: initialPrompts, folders: initialFolders };
};

export const PromptProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [folders, setFolders] = useState<PromptFolder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // On login, initialize with default data if it's the first time for this session
      if (localPrompts.length === 0 && localFolders.length === 0) {
          const { prompts: newPrompts, folders: newFolders } = addDefaultData(user.uid);
          setPrompts(newPrompts);
          setFolders(newFolders);
      } else {
          // Or load from our "local database" for the current session
          setPrompts(localPrompts);
          setFolders(localFolders);
      }
    } else {
      // On logout, clear everything
      localPrompts = [];
      localFolders = [];
      setPrompts([]);
      setFolders([]);
    }
  }, [user]);

  const getPromptById = (id: string) => prompts.find(p => p.id === id);

  const savePrompt = async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'uid'> & { id?: string }) => {
    if (!user) throw new Error("User not authenticated");
    
    if (promptData.id) { // Editing existing
        localPrompts = localPrompts.map(p => p.id === promptData.id ? { ...p, ...promptData, id: p.id, uid: p.uid, createdAt: p.createdAt } as Prompt : p);
    } else { // Creating new
        const newPrompt: Prompt = {
            ...promptData,
            id: `user-prompt-${Date.now()}`,
            uid: user.uid,
            createdAt: Date.now(),
        };
        localPrompts = [...localPrompts, newPrompt];
    }
    setPrompts([...localPrompts]);
    addNotification('Prompt saved!', 'success');
  };

  const deletePrompt = async (id: string) => {
    if (!user) return;
    localPrompts = localPrompts.filter(p => p.id !== id);
    setPrompts(localPrompts);
    addNotification('Prompt deleted.', 'info');
  };

  const toggleFavoritePrompt = async (publicPromptId: string) => {
    if (!user) return;
    const existingFavorite = localPrompts.find(p => p.originalPublicId === publicPromptId);
    const publicPrompt = PUBLIC_PROMPTS.find(p => p.id === publicPromptId);

    if (existingFavorite) {
        localPrompts = localPrompts.filter(p => p.originalPublicId !== publicPromptId);
        addNotification(`'${publicPrompt?.title}' removed from My Praia.`, 'info');
    } else {
        if (publicPrompt) {
            const newFavorite: Prompt = {
                ...publicPrompt,
                id: `fav-prompt-${publicPrompt.id}-${Date.now()}`,
                uid: user.uid,
                isFavorited: true,
                originalPublicId: publicPrompt.id,
                createdAt: Date.now()
            };
            localPrompts = [...localPrompts, newFavorite];
            addNotification(`'${publicPrompt.title}' added to My Praia!`, 'success');
        }
    }
    setPrompts([...localPrompts]);
  };
  
  const createFolder = async (name: string) => {
    if (!user) throw new Error("User not authenticated");
    const newFolder: PromptFolder = {
        id: `folder-${Date.now()}`,
        name,
        uid: user.uid
    };
    localFolders = [...localFolders, newFolder];
    setFolders(localFolders);
    addNotification('Folder created!', 'success');
  };

  const movePrompt = async (promptId: string, folderId: string | null) => {
    if (!user) throw new Error("User not authenticated");
    localPrompts = localPrompts.map(p => p.id === promptId ? { ...p, folderId: folderId || undefined } : p);
    setPrompts([...localPrompts]);
    addNotification('Prompt moved successfully.', 'success');
  };

  const getPromptsInFolder = (folderId: string | null) => {
    return prompts.filter(p => (p.folderId || null) === folderId);
  }

  return (
    <PromptContext.Provider value={{ prompts, folders, loading, getPromptById, savePrompt, deletePrompt, toggleFavoritePrompt, createFolder, getPromptsInFolder, movePrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = (): PromptContextType => {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error('usePrompts must be used within a PromptProvider');
  }
  return context;
};
