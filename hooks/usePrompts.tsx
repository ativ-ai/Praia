

import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import { Prompt, PromptFolder } from '../types';
import { useAuth } from './useAuth';
import { PUBLIC_PROMPTS } from '../constants';
import { useNotification } from './useNotification';

// Simulating a local database for prompts that resets on refresh
let localPrompts: Prompt[] = [];
let localFolders: PromptFolder[] = [];
let localPublicPrompts: Prompt[] = [];

interface PromptContextType {
  prompts: Prompt[];
  userPublicPrompts: Prompt[];
  folders: PromptFolder[];
  loading: boolean;
  getPromptById: (id: string) => Prompt | undefined;
  savePrompt: (prompt: Omit<Prompt, 'id' | 'createdAt' | 'uid' | 'isFavorited' | 'originalPublicId' | 'historyId' | 'version' | 'isLatest'> & { id?: string }) => Promise<void>;
  deletePrompt: (id:string) => Promise<void>;
  toggleFavoritePrompt: (publicPromptId: string) => Promise<void>;
  createFolder: (name: string) => Promise<void>;
  movePrompt: (promptId: string, folderId: string | null) => Promise<void>;
  getPromptsInFolder: (folderId: string | null) => Prompt[];
  getPromptHistory: (historyId: string) => Prompt[];
  revertToVersion: (versionId: string) => Promise<void>;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

const addDefaultData = (userId: string) => {
    const defaultFavorite = PUBLIC_PROMPTS[0];
    const historyId = `history-fav-${defaultFavorite.id}-${Date.now()}`;
    const initialPrompts: Prompt[] = [
        {
            ...defaultFavorite,
            uid: userId,
            isFavorited: true,
            originalPublicId: defaultFavorite.id,
            createdAt: Date.now(),
            id: `user-prompt-${Date.now()}`,
            historyId: historyId,
            version: 1,
            isLatest: true,
        }
    ];
    const initialFolders: PromptFolder[] = [
        { id: `folder-1-${Date.now()}`, name: 'Blog Post Ideas', uid: userId },
        { id: `folder-2-${Date.now()}`, name: 'Client Email Templates', uid: userId },
    ];
    localPrompts = initialPrompts;
    localFolders = initialFolders;
    localPublicPrompts = [];
    return { prompts: initialPrompts, folders: initialFolders, publicPrompts: [] };
};

export const PromptProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [userPublicPrompts, setUserPublicPrompts] = useState<Prompt[]>([]);
  const [folders, setFolders] = useState<PromptFolder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (localPrompts.length === 0 && localFolders.length === 0) {
          const { prompts: newPrompts, folders: newFolders, publicPrompts: newPublic } = addDefaultData(user.uid);
          setPrompts(newPrompts);
          setFolders(newFolders);
          setUserPublicPrompts(newPublic);
      } else {
          setPrompts(localPrompts);
          setFolders(localFolders);
          setUserPublicPrompts(localPublicPrompts);
      }
    } else {
      localPrompts = [];
      localFolders = [];
      localPublicPrompts = [];
      setPrompts([]);
      setFolders([]);
      setUserPublicPrompts([]);
    }
  }, [user]);

  const getPromptById = (id: string) => prompts.find(p => p.id === id);
  
  const updatePublicPrompts = (historyId: string, latestVersion: Prompt | null) => {
    localPublicPrompts = localPublicPrompts.filter(p => p.historyId !== historyId);
    if (latestVersion && latestVersion.isPublic) {
        localPublicPrompts.push(latestVersion);
    }
    setUserPublicPrompts([...localPublicPrompts]);
  };

  const savePrompt = async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'uid' | 'isFavorited' | 'originalPublicId' | 'historyId' | 'version' | 'isLatest'> & { id?: string }) => {
    if (!user) throw new Error("User not authenticated");
    
    let newVersion: Prompt;

    if (promptData.id) { // Editing existing prompt or creating a copy
        const existingVersion = localPrompts.find(p => p.id === promptData.id);
        
        if (!existingVersion) { // Creating a copy from a template, not a direct edit
            const newHistoryId = `history-${Date.now()}`;
            newVersion = {
                id: `user-prompt-${Date.now()}`,
                historyId: newHistoryId,
                version: 1,
                isLatest: true,
                uid: user.uid,
                createdAt: Date.now(),
                ...promptData,
            };
            localPrompts.push(newVersion);
        } else { // It's a direct edit, so create a new version
            const { historyId } = existingVersion;
            const history = localPrompts.filter(p => p.historyId === historyId);
            const maxVersion = Math.max(...history.map(p => p.version));
            
            // Mark all old versions as not latest
            localPrompts = localPrompts.map(p => p.historyId === historyId ? { ...p, isLatest: false } : p);
            
            newVersion = {
                ...existingVersion, // carry over folderId, originalPublicId etc.
                ...promptData, // apply changes from form
                id: `user-prompt-${Date.now()}`,
                version: maxVersion + 1,
                isLatest: true,
                createdAt: Date.now(),
            };
            localPrompts.push(newVersion);
        }
    } else { // Creating a brand new prompt
        const newHistoryId = `history-${Date.now()}`;
        newVersion = {
            id: `user-prompt-${Date.now()}`,
            historyId: newHistoryId,
            version: 1,
            isLatest: true,
            uid: user.uid,
            createdAt: Date.now(),
            ...promptData,
        };
        localPrompts.push(newVersion);
    }
    setPrompts([...localPrompts]);
    updatePublicPrompts(newVersion.historyId, newVersion);
    addNotification('Prompt saved!', 'success');
  };

  const deletePrompt = async (id: string) => {
    if (!user) return;
    const promptToDelete = localPrompts.find(p => p.id === id);
    if (promptToDelete) {
        const { historyId } = promptToDelete;
        localPrompts = localPrompts.filter(p => p.historyId !== historyId);
        setPrompts([...localPrompts]);
        updatePublicPrompts(historyId, null);
        addNotification('Prompt and its history deleted.', 'info');
    }
  };

  const toggleFavoritePrompt = async (publicPromptId: string) => {
    if (!user) return;
    const existingFavorite = localPrompts.find(p => p.originalPublicId === publicPromptId);
    const publicPrompt = PUBLIC_PROMPTS.find(p => p.id === publicPromptId);

    if (existingFavorite) {
        const { historyId } = existingFavorite;
        localPrompts = localPrompts.filter(p => p.historyId !== historyId);
        addNotification(`'${publicPrompt?.title}' removed from My Praia.`, 'info');
    } else {
        if (publicPrompt) {
            const newHistoryId = `history-fav-${publicPrompt.id}-${Date.now()}`;
            const newFavorite: Prompt = {
                ...publicPrompt,
                id: `fav-prompt-${publicPrompt.id}-${Date.now()}`,
                uid: user.uid,
                isFavorited: true,
                originalPublicId: publicPrompt.id,
                createdAt: Date.now(),
                historyId: newHistoryId,
                version: 1,
                isLatest: true,
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
    const promptToMove = localPrompts.find(p => p.id === promptId);
    if (promptToMove) {
        const { historyId } = promptToMove;
        localPrompts = localPrompts.map(p => p.historyId === historyId ? { ...p, folderId: folderId || undefined } : p);
        setPrompts([...localPrompts]);
        addNotification('Prompt moved successfully.', 'success');
    }
  };

  const getPromptsInFolder = (folderId: string | null) => {
    return prompts.filter(p => p.isLatest && (p.folderId || null) === folderId);
  }

  const getPromptHistory = (historyId: string) => {
    return localPrompts.filter(p => p.historyId === historyId).sort((a,b) => b.version - a.version);
  }

  const revertToVersion = async (versionId: string) => {
      if (!user) throw new Error("User not authenticated");
      const versionToRevert = localPrompts.find(p => p.id === versionId);
      if (!versionToRevert) {
          addNotification('Version not found.', 'error');
          return;
      }
      const { historyId } = versionToRevert;
      const history = localPrompts.filter(p => p.historyId === historyId);
      const currentLatest = history.find(p => p.isLatest);
      const isCurrentlyPublic = !!currentLatest?.isPublic;
      const maxVersion = Math.max(...history.map(p => p.version));
      localPrompts = localPrompts.map(p => (p.historyId === historyId ? { ...p, isLatest: false } : p));
      
      const newVersion: Prompt = {
          ...versionToRevert,
          id: `user-prompt-${Date.now()}`,
          version: maxVersion + 1,
          isLatest: true,
          createdAt: Date.now(),
          isPublic: isCurrentlyPublic,
      };
      localPrompts = [...localPrompts, newVersion];
      setPrompts([...localPrompts]);
      updatePublicPrompts(historyId, newVersion);
      addNotification(`Reverted to version ${versionToRevert.version}.`, 'success');
  };
  
  const latestPrompts = useMemo(() => prompts.filter(p => p.isLatest), [prompts]);

  return (
    <PromptContext.Provider value={{ prompts: latestPrompts, userPublicPrompts, folders, loading, getPromptById, savePrompt, deletePrompt, toggleFavoritePrompt, createFolder, getPromptsInFolder, movePrompt, getPromptHistory, revertToVersion }}>
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
