
import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePrompts } from '../../hooks/usePrompts';
import { useAITools } from '../../hooks/useAITools';
import { useTraining } from '../../hooks/useTraining';
import { Prompt, AITool, TrainingModule, GroupedPrompt } from '../../types';
import { PromptCard } from '../shared/PromptCard';
import AIToolCard from '../shared/AIToolCard';
import TrainingCard from '../shared/TrainingCard';
import Spinner from '../shared/Spinner';
import Modal from '../shared/Modal';
import { PUBLIC_PROMPTS, PUBLIC_TRAINING_MODULES, PUBLIC_AI_TOOLS } from '../../constants';
import { useNotification } from '../../hooks/useNotification';
import usePageTitle from '../../hooks/usePageTitle';

const Profile: React.FC = () => {
    usePageTitle('Your Profile');
    const { user, logout } = useAuth();

    if (!user) {
        return null; // or a loading spinner
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-8">Your Profile</h1>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                <div className="p-6">
                    <div className="flex items-center space-x-5">
                        <div className="flex-shrink-0">
                            <img className="h-20 w-20 rounded-full" src={user.photoURL} alt="User" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user.displayName}</h2>
                            <p className="text-sm font-medium text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button onClick={logout} className="text-sm font-medium text-red-600 hover:text-red-800">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Praia API Keys</h2>
                <p className="text-sm text-slate-600 mb-4">
                    Manage your API keys to use the Praia prompt transformation engine in your own applications. (This is a mock-up for demonstration purposes).
                </p>
                <div className="bg-slate-100 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-mono text-sm text-slate-700">pr_mock_********************abcd</p>
                            <p className="text-xs text-slate-500">Created on Jan 1, 2024</p>
                        </div>
                        <button className="text-sm font-medium text-red-600 hover:text-red-800">Revoke</button>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700"
                    >
                        <span className="-ml-1 mr-2" role="img" aria-label="add">➕</span>
                        Generate New Key (Mock)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
