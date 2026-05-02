
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router';
import { HashRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { AuthProvider } from './hooks/useAuth';
import { PromptProvider } from './hooks/usePrompts';
import { NotificationProvider } from './hooks/useNotification';
import { AIToolsProvider } from './hooks/useAITools';
import { TrainingProvider } from './hooks/useTraining';
import Layout from './components/shared/Layout';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Modal from './components/shared/Modal';

import Login from './components/pages/Login';
import LandingPage from './components/pages/LandingPage';
import CommunityHub from './components/pages/CommunityHub';
import MyPraia from './components/pages/MyPraia';
import PromptStudio from './components/pages/PromptStudio';
import ToolStudio from './components/pages/ToolStudio';
import TrainingStudio from './components/pages/TrainingStudio';
import About from './components/pages/About';
import ItemDetailPage from './components/pages/ItemDetailPage';
import AIToolsHub from './components/pages/AIToolsHub';
import TrainingCenter from './components/pages/TrainingCenter';
import ProSpecFramework from './components/pages/ProSpecFramework';

// Initialize GA4
ReactGA.initialize('G-V301FR5XKL');

const ItemDetailModal: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  
  return (
    <Modal isOpen={true} onClose={() => navigate(-1)} title={title}>
      <ItemDetailPage isModal={true} setModalTitle={setTitle} />
    </Modal>
  );
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const background = location.state?.background;

  // Track page views
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />

        <Route element={<Layout />}>
          <Route path="/prompt-studio" element={<PromptStudio />} />
          <Route path="/prompts" element={<CommunityHub />} />
          <Route path="/tools" element={<AIToolsHub />} />
          <Route path="/training" element={<TrainingCenter />} />
          <Route path="/about" element={<About />} />
          <Route path="/pro-spec" element={<ProSpecFramework />} />
          
          <Route path="/detail/:itemType/:itemId" element={<ItemDetailPage />} />
          
          <Route path="/my-praia" element={<ProtectedRoute><MyPraia /></ProtectedRoute>} />
          <Route path="/prompt-studio/:id" element={<ProtectedRoute><PromptStudio /></ProtectedRoute>} />
          <Route path="/tool-studio" element={<ProtectedRoute><ToolStudio /></ProtectedRoute>} />
          <Route path="/tool-studio/:id" element={<ProtectedRoute><ToolStudio /></ProtectedRoute>} />
          <Route path="/training-studio" element={<ProtectedRoute><TrainingStudio /></ProtectedRoute>} />
          <Route path="/training-studio/:id" element={<ProtectedRoute><TrainingStudio /></ProtectedRoute>} />
        </Route>
      </Routes>

      {background && (
        <Routes>
           <Route path="/detail/:itemType/:itemId" element={<ItemDetailModal />} />
        </Routes>
      )}
    </>
  );
};


const App: React.FC = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <PromptProvider>
          <AIToolsProvider>
            <TrainingProvider>
              <HashRouter>
                <AppRoutes />
              </HashRouter>
            </TrainingProvider>
          </AIToolsProvider>
        </PromptProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
