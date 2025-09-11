import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import CookieBanner from './CookieBanner';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 flex flex-col">
      <div className="flex-grow pb-16 sm:pb-0">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
      <footer className="w-full text-center py-4 mt-8 text-sm text-slate-500 border-t border-slate-200 flex-shrink-0">
        © {new Date().getFullYear()} - Praia by{' '}
        <a href="https://ativ.ai" target="_blank" rel="noopener noreferrer" className="font-medium text-sky-600 hover:underline">
          ativ.ai
        </a>
        <span className="mx-2">|</span>
        <a href="mailto:praia@ativ.ai" className="font-medium text-sky-600 hover:underline">
          praia@ativ.ai
        </a>
      </footer>
      <CookieBanner />
    </div>
  );
};

export default Layout;
