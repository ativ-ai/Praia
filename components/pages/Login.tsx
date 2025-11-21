
import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router';
import Spinner from '../shared/Spinner';
import usePageTitle from '../../hooks/usePageTitle';

const Login: React.FC = () => {
  usePageTitle('Login');
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromLocation = location.state?.from;
  const from = fromLocation ? `${fromLocation.pathname}${fromLocation.search}${fromLocation.hash}` : '/';

  useEffect(() => {
    if (user) {
      const redirectPath = sessionStorage.getItem('authRedirectPath') || from;
      sessionStorage.removeItem('authRedirectPath');
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = async () => {
    try {
        await login(from);
    } catch (error) {
        console.error("Login failed:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="text-center p-8 sm:p-12 bg-white shadow-2xl rounded-2xl max-w-md w-full animate-expand-in">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 mb-6 text-5xl">
          <span role="img" aria-label="logo">🏖️</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Welcome to PRAIA</h1>
        <p className="mt-2 text-lg font-semibold text-indigo-600">Prompt Research & AI Architect</p>
        <p className="mt-2 text-slate-600 leading-relaxed">Your personal suite for mastering the AI conversation.</p>
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center h-14">
                <Spinner />
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-base font-bold rounded-lg shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
            >
              Sign in with Google
            </button>
          )}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Access your saved prompts and tools across all your devices.
        </p>
      </div>
    </div>
  );
};

export default Login;
