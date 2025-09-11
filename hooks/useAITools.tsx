import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import { AITool } from '../types';
import { useAuth } from './useAuth';
import { PUBLIC_AI_TOOLS } from '../constants';
import { useNotification } from './useNotification';

let localTools: AITool[] = [];

interface AIToolsContextType {
  tools: AITool[];
  loading: boolean;
  toggleFavoriteTool: (publicToolId: string) => Promise<void>;
  isToolFavorited: (publicToolId: string) => boolean;
  saveTool: (tool: Omit<AITool, 'id' | 'createdAt' | 'uid'> & { id?: string }) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;
  getToolById: (id: string) => AITool | undefined;
}

const AIToolsContext = createContext<AIToolsContextType | undefined>(undefined);

export const AIToolsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (user) {
        setTools(localTools);
    } else {
        localTools = [];
        setTools([]);
    }
  }, [user]);

  const getToolById = (id: string) => tools.find(t => t.id === id);

  const isToolFavorited = (publicToolId: string): boolean => {
      return localTools.some(t => t.originalPublicId === publicToolId && t.isFavorited);
  }
  
  const saveTool = async (toolData: Omit<AITool, 'id' | 'createdAt' | 'uid'> & { id?: string }) => {
    if (!user) throw new Error("User not authenticated");
    
    if (toolData.id) { // Editing
        localTools = localTools.map(t => t.id === toolData.id ? { ...t, ...toolData, id: t.id, uid: t.uid, createdAt: t.createdAt } as AITool : t);
    } else { // Creating
        const newTool: AITool = {
            ...toolData,
            id: `user-tool-${Date.now()}`,
            uid: user.uid,
            createdAt: Date.now(),
        };
        localTools = [...localTools, newTool];
    }
    setTools([...localTools]);
    addNotification('Tool saved successfully!', 'success');
  };

  const deleteTool = async (id: string) => {
    if (!user) return;
    localTools = localTools.filter(t => t.id !== id);
    setTools(localTools);
    addNotification('Tool deleted successfully.', 'info');
  };

  const toggleFavoriteTool = async (publicToolId: string) => {
    if (!user) return;
    const tool = PUBLIC_AI_TOOLS.find(t => t.id === publicToolId);
    if (!tool) return;

    const existingFavorite = localTools.find(t => t.originalPublicId === publicToolId);

    if (existingFavorite) {
        localTools = localTools.filter(t => t.originalPublicId !== publicToolId);
        addNotification(`${tool.name} removed from favorites.`, 'info');
    } else {
        const newFavorite: AITool = {
            ...tool,
            id: `fav-tool-${tool.id}-${Date.now()}`,
            uid: user.uid,
            isFavorited: true,
            originalPublicId: tool.id,
            createdAt: Date.now()
        };
        localTools = [...localTools, newFavorite];
        addNotification(`${tool.name} added to favorites!`, 'success');
    }
    setTools([...localTools].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const sortedTools = useMemo(() => tools.sort((a,b) => a.name.localeCompare(b.name)), [tools]);

  return (
    <AIToolsContext.Provider value={{ tools: sortedTools, loading, toggleFavoriteTool, isToolFavorited, saveTool, deleteTool, getToolById }}>
      {children}
    </AIToolsContext.Provider>
  );
};

export const useAITools = (): AIToolsContextType => {
  const context = useContext(AIToolsContext);
  if (context === undefined) {
    throw new Error('useAITools must be used within an AIToolsProvider');
  }
  return context;
};
