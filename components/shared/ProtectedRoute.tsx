import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import Spinner from './Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // FIX: Removed the redundant <Layout> wrapper. The loading spinner
    // should appear within the main layout defined in App.tsx, not inside a new one.
    // This was causing a component nesting issue and a related TypeScript error.
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="h-12 w-12" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
