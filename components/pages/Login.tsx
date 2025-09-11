
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
    <div className="flex items-center justify-center min-h-screen bg-sky-50">
      <div className="text-center p-8 bg-white shadow-2xl rounded-xl max-w-md w-full">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-sky-100 mb-6 text-5xl">
          <span role="img" aria-label="logo">🏖️</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Welcome to Praia</h1>
        <p className="mt-2 text-slate-600">Your personal suite for mastering AI.</p>
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center h-12">
                <Spinner />
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-transform transform hover:scale-105"
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
