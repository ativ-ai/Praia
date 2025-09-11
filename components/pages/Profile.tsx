import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import usePageTitle from '../../hooks/usePageTitle';

const Profile: React.FC = () => {
    usePageTitle('Your Profile');
    const { user, logout } = useAuth();

    if (!user) {
        // ProtectedRoute handles redirection, this is a fallback for safety.
        return null; 
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-8 text-center">Your Profile</h1>
            
            <div className="bg-white shadow-lg rounded-xl overflow-hidden animate-slide-up">
                <div className="p-8 text-center">
                    <img 
                        className="h-28 w-28 rounded-full ring-4 ring-sky-200 mx-auto mb-4" 
                        src={user.photoURL} 
                        alt="User profile" 
                    />
                    <h2 className="text-2xl font-bold text-gray-900">{user.displayName}</h2>
                    <p className="text-md text-gray-500 mt-1">{user.email}</p>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <button 
                        onClick={logout} 
                        className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;