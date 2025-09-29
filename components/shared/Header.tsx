
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Dropdown: React.FC<{ title: React.ReactNode; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
                {title}
                <svg className={`ml-1 h-4 w-4 transform transition-transform text-slate-500 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="origin-top-left absolute left-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-expand-in">
                    <div className="py-2" onClick={() => setIsOpen(false)}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};


const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const closeAllMenus = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const dropdownItemClasses = "block px-4 py-3 text-base text-slate-700 hover:bg-slate-100 w-full text-left flex items-center gap-3 transition-colors";

  const mobileLinkClasses = "block px-4 py-3 rounded-lg text-lg font-medium flex items-center gap-3";
  const mobileInactiveLinkClasses = "text-slate-700 hover:bg-slate-100";
  const mobileActiveLinkClasses = "bg-indigo-600 text-white shadow-md";

  const NavLinks: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
      if (isMobile) {
          return (
              <div className="space-y-2">
                  <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase tracking-wider">Studio</h3>
                  <NavLink to="/prompt-studio" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}><span className="material-symbols-outlined">design_services</span>Prompt Studio</NavLink>
                  
                  <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase tracking-wider mt-4">Explore</h3>
                  <NavLink to="/prompts" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}><span className="material-symbols-outlined">tips_and_updates</span>Prompts</NavLink>
                  <NavLink to="/tools" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}><span className="material-symbols-outlined">smart_toy</span>AI Tools</NavLink>
                  <NavLink to="/training" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}><span className="material-symbols-outlined">model_training</span>Training</NavLink>

                  <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase tracking-wider mt-4">Resources</h3>
                  <NavLink to="/about" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}><span className="material-symbols-outlined">info</span>About</NavLink>
                  <NavLink to="/api-docs" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? mobileActiveLinkClasses : mobileInactiveLinkClasses}`}><span className="material-symbols-outlined">code</span>API Docs</NavLink>
              </div>
          );
      }
      
      const navLinkClasses = ({ isActive }: { isActive: boolean }) => `px-3 py-2 rounded-lg text-base font-medium transition-colors flex items-center gap-1.5 ${isActive ? 'bg-slate-200 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'}`;

      return (
          <>
              <NavLink to="/prompt-studio" className={navLinkClasses}>
                <span className="material-symbols-outlined text-indigo-600">design_services</span>Prompt Studio
              </NavLink>
              <Dropdown title={<><span className="material-symbols-outlined text-indigo-600">explore</span>Explore</>}>
                  <NavLink to="/prompts" className={dropdownItemClasses}><span className="material-symbols-outlined text-slate-500">tips_and_updates</span>Prompts</NavLink>
                  <NavLink to="/tools" className={dropdownItemClasses}><span className="material-symbols-outlined text-slate-500">smart_toy</span>AI Tools</NavLink>
                  <NavLink to="/training" className={dropdownItemClasses}><span className="material-symbols-outlined text-slate-500">model_training</span>Training</NavLink>
              </Dropdown>
              <Dropdown title={<><span className="material-symbols-outlined text-indigo-600">school</span>Resources</>}>
                  <NavLink to="/about" className={dropdownItemClasses}><span className="material-symbols-outlined text-slate-500">info</span>About</NavLink>
                  <NavLink to="/api-docs" className={dropdownItemClasses}><span className="material-symbols-outlined text-slate-500">code</span>API Docs</NavLink>
              </Dropdown>
          </>
      );
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/80 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link to="/" onClick={closeAllMenus} className="flex-shrink-0 flex items-center gap-3">
              <span className="text-4xl" role="img" aria-label="logo">🏖️</span>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">Praia</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                <NavLinks />
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-12 w-12 rounded-full" src={user.photoURL} alt="User profile" />
                </button>
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-xl shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 z-50 animate-expand-in">
                    <div className="px-4 py-3 text-sm text-slate-700 border-b border-slate-200">
                      Signed in as <br/>
                      <span className="font-semibold text-base text-slate-900">{user.displayName}</span>
                    </div>
                    <Link to="/my-praia" onClick={() => setUserMenuOpen(false)} className={dropdownItemClasses}>
                        <span className="material-symbols-outlined text-slate-500">cottage</span>My Praia
                    </Link>
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className={`${dropdownItemClasses} text-red-600`}>
                      <span className="material-symbols-outlined">logout</span>Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-base font-bold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-sm hover:shadow-lg">
                Login
              </Link>
            )}
          </div>
           <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <span className="material-symbols-outlined text-3xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg z-40 animate-fade-in" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 sm:px-3">
            <NavLinks isMobile />
          </div>
          {user ? (
            <div className="pt-4 pb-3 border-t border-slate-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={user.photoURL} alt="User profile" />
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-slate-800">{user.displayName}</div>
                  <div className="text-sm font-medium text-slate-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link to="/my-praia" onClick={closeAllMenus} className={`${mobileLinkClasses} ${mobileInactiveLinkClasses}`}>
                  <span className="material-symbols-outlined">cottage</span>My Praia
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeAllMenus();
                  }}
                  className={`w-full text-left ${mobileLinkClasses} ${mobileInactiveLinkClasses}`}
                >
                  <span className="material-symbols-outlined text-red-500">logout</span>Sign out
                </button>
              </div>
            </div>
          ) : (
             <div className="px-5 py-4">
                <Link to="/login" onClick={closeAllMenus} className="block w-full text-center bg-indigo-600 text-white px-4 py-3 rounded-md text-base font-medium hover:bg-indigo-700 transition-colors shadow-md">
                    Login
                </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;