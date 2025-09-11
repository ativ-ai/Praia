
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
                className="px-4 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-sky-100 hover:text-sky-800 transition-colors flex items-center gap-2"
            >
                {title}
                <svg className={`ml-1 h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" onClick={() => setIsOpen(false)}>
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
  
  const baseLinkClasses = "px-4 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2";
  const inactiveLinkClasses = "text-slate-600 hover:bg-sky-100 hover:text-sky-800";
  const activeLinkClasses = "bg-sky-500 text-white";
  const dropdownItemClasses = "block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 w-full text-left flex items-center gap-3";

  const mobileLinkClasses = "block px-4 py-3 rounded-md text-lg font-medium flex items-center gap-3";

  const NavLinks: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
      if (isMobile) {
          return (
              <div className="space-y-2">
                  <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase tracking-wider mt-2">Explore</h3>
                  <NavLink to="/prompts" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}><span className="material-symbols-outlined">tips_and_updates</span>Prompts</NavLink>
                  <NavLink to="/tools" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}><span className="material-symbols-outlined">smart_toy</span>AI Tools</NavLink>
                  <NavLink to="/training" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}><span className="material-symbols-outlined">model_training</span>Training</NavLink>
                  
                  {user && (
                    <>
                    <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase tracking-wider mt-4">Create</h3>
                    <NavLink to="/prompt-studio" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}><span className="material-symbols-outlined">edit</span>Prompt Studio</NavLink>
                    <NavLink to="/tool-studio" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}><span className="material-symbols-outlined">construction</span>Tool Studio</NavLink>
                    <NavLink to="/training-studio" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}><span className="material-symbols-outlined">draw</span>Training Studio</NavLink>
                    </>
                  )}

                  <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase tracking-wider mt-4">Resources</h3>
                  <NavLink to="/about" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}><span className="material-symbols-outlined">info</span>About</NavLink>
                  <NavLink to="/api-docs" onClick={closeAllMenus} className={({isActive}) => `${mobileLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}><span className="material-symbols-outlined">code</span>API Docs</NavLink>
              </div>
          );
      }

      return (
          <>
              <Dropdown title={<><span className="material-symbols-outlined">explore</span>Explore</>}>
                  <NavLink to="/prompts" className={dropdownItemClasses}><span className="material-symbols-outlined">tips_and_updates</span>Prompts</NavLink>
                  <NavLink to="/tools" className={dropdownItemClasses}><span className="material-symbols-outlined">smart_toy</span>AI Tools</NavLink>
                  <NavLink to="/training" className={dropdownItemClasses}><span className="material-symbols-outlined">model_training</span>Training</NavLink>
              </Dropdown>
              {user && (
                <Dropdown title={<><span className="material-symbols-outlined">pen_spark</span>Studio</>}>
                    <NavLink to="/prompt-studio" className={dropdownItemClasses}><span className="material-symbols-outlined">edit</span>Prompt Studio</NavLink>
                    <NavLink to="/tool-studio" className={dropdownItemClasses}><span className="material-symbols-outlined">construction</span>Tool Studio</NavLink>
                    <NavLink to="/training-studio" className={dropdownItemClasses}><span className="material-symbols-outlined">draw</span>Training Studio</NavLink>
                </Dropdown>
              )}
              {user && (
                  <NavLink to="/my-praia" className={({isActive}) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}>
                      <span className="material-symbols-outlined">cottage</span>My Praia
                  </NavLink>
              )}
              <Dropdown title={<><span className="material-symbols-outlined">school</span>Resources</>}>
                  <NavLink to="/about" className={dropdownItemClasses}><span className="material-symbols-outlined">info</span>About</NavLink>
                  <NavLink to="/api-docs" className={dropdownItemClasses}><span className="material-symbols-outlined">code</span>API Docs</NavLink>
              </Dropdown>
          </>
      );
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" onClick={closeAllMenus} className="flex-shrink-0 flex items-center gap-2">
              <span className="text-4xl" role="img" aria-label="logo">🏖️</span>
              <span className="text-2xl font-bold text-slate-800">Praia</span>
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
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="User profile" />
                </button>
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-3 text-sm text-slate-700 border-b">
                      Signed in as <br/>
                      <span className="font-semibold text-base">{user.displayName}</span>
                    </div>
                    <Link to="/my-praia" onClick={() => setUserMenuOpen(false)} className={dropdownItemClasses}>
                        <span className="material-symbols-outlined">cottage</span>My Praia
                    </Link>
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)} className={dropdownItemClasses}>
                        <span className="material-symbols-outlined">account_circle</span>Your Profile
                    </Link>
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className={dropdownItemClasses}>
                      <span className="material-symbols-outlined">logout</span>Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-sky-500 text-white px-5 py-2.5 rounded-md text-base font-medium hover:bg-sky-600 transition-colors">
                Login
              </Link>
            )}
          </div>
           <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
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
        <div className="md:hidden absolute w-full bg-white shadow-lg" id="mobile-menu">
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
                <Link to="/my-praia" onClick={closeAllMenus} className={`${mobileLinkClasses} ${inactiveLinkClasses}`}>
                  <span className="material-symbols-outlined">cottage</span>My Praia
                </Link>
                <Link to="/profile" onClick={closeAllMenus} className={`${mobileLinkClasses} ${inactiveLinkClasses}`}>
                  <span className="material-symbols-outlined">account_circle</span>Your Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeAllMenus();
                  }}
                  className={`w-full text-left ${mobileLinkClasses} ${inactiveLinkClasses}`}
                >
                  <span className="material-symbols-outlined">logout</span>Sign out
                </button>
              </div>
            </div>
          ) : (
             <div className="px-5 py-4">
                <Link to="/login" onClick={closeAllMenus} className="block w-full text-center bg-sky-500 text-white px-4 py-3 rounded-md text-base font-medium hover:bg-sky-600 transition-colors">
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