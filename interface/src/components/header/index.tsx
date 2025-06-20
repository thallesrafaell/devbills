import { LogOutIcon, MenuIcon, TrendingUp, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'; // Use 'react-router-dom' para Link e useNavigate

import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { authState, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserInitials = (displayName: string | null | undefined): string => {
    if (!displayName) {
      return '??';
    }
    const parts = displayName.split(' ');
    let initials = '';
    if (parts.length > 0 && parts[0]) {
      initials += parts[0][0];
    }
    if (parts.length > 1 && parts[1]) {
      initials += parts[1][0];
    }
    return initials.toUpperCase();
  };

  return (
    <header className="bg-gray-800 border-b border-gray-600 py-2">
      <div className="flex items-center justify-between px-4 md:px-18 shadow-md">
        <div className="flex items-center justify-center space-x-2 ">
          <TrendingUp className="h-6 w-6 text-primary-500 " />
          <h1 className="text-2xl font-bold text-primary-500">DevBills</h1>
        </div>

        {/* Ícone do menu hamburguer para telas pequenas */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Abrir menu"
            className="text-gray-200"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navegação principal para telas maiores */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/dashboard"
                className={`${location.pathname === '/dashboard' ? 'text-primary-500  bg-primary-500/10 rounded-sm' : 'text-gray-400'} text-sm py-2 px-3 rounded-sm hover:text-primary-500 transition-all duration-200`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                className={`${location.pathname === '/transactions' ? 'text-primary-500  bg-primary-500/10 rounded-sm' : 'text-gray-400'} text-sm py-2 px-3 rounded-sm hover:text-primary-500 transition-all duration-200`}
              >
                Transações
              </Link>
            </li>
          </ul>
        </nav>

        {authState.user && (
          <div className="hidden md:flex items-center gap-5 md:gap-4">
            <div className="flex items-center gap-2">
              {/* --- FALLBACK PARA IMAGEM (DESKTOP) --- */}
              {authState.user.photoURL ? (
                <img
                  src={authState.user.photoURL}
                  alt={authState.user.displayName || 'Avatar do Usuário'}
                  className="h-7 w-7 rounded-full border-primary-500/60 border-1 object-cover"
                />
              ) : (
                <div className="h-7 w-7 rounded-full border-primary-500/60 border-1 bg-gray-600 flex items-center justify-center text-xs font-semibold text-gray-200">
                  {getUserInitials(authState.user.displayName)}
                </div>
              )}
              <span className="hidden md:block text-sm text-gray-400">
                {authState.user.displayName}
              </span>
            </div>
            <button
              type="button"
              aria-label="Sign out"
              onClick={handleSignOut}
              className="flex items-center justify-center cursor-pointer"
            >
              <LogOutIcon className="h-5 w-5 inline-block mr-1 text-red-700 hover:text-red-500 transition-colors duration-200" />
            </button>
          </div>
        )}
      </div>

      {/* Menu lateral (Mobile) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
        onClick={toggleMenu}
      >
        <div
          className="bg-gray-800 w-64 h-full p-4 flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Topo do menu lateral: Logo e botão de fechar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary-500" />
              <h1 className="text-2xl font-bold text-primary-500">DevBills</h1>
            </div>
            <button
              onClick={toggleMenu}
              aria-label="Fechar menu"
              className="text-gray-200"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <nav>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/dashboard"
                  onClick={toggleMenu}
                  className={`${location.pathname === '/dashboard' ? 'text-primary-500  bg-primary-500/10 rounded-sm' : 'text-gray-400'} text-base py-2 px-3 rounded-sm hover:text-primary-500 transition-all duration-200 block`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/transactions"
                  onClick={toggleMenu}
                  className={`${location.pathname === '/transactions' ? 'text-primary-500  bg-primary-500/10 rounded-sm' : 'text-gray-400'} text-base py-2 px-3 rounded-sm hover:text-primary-500 transition-all duration-200 block`}
                >
                  Transações
                </Link>
              </li>
              {authState.user && (
                <>
                  <li className="mt-auto pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      {/* --- FALLBACK PARA IMAGEM (MOBILE) --- */}
                      {authState.user.photoURL ? (
                        <img
                          src={authState.user.photoURL}
                          alt={
                            authState.user.displayName || 'Avatar do Usuário'
                          }
                          className="h-7 w-7 rounded-full border-primary-500/60 border-1 object-cover"
                        />
                      ) : (
                        <div className="h-7 w-7 rounded-full border-primary-500/60 border-1 bg-gray-600 flex items-center justify-center text-xs font-semibold text-gray-200">
                          {getUserInitials(authState.user.displayName)}
                        </div>
                      )}
                      <span className="text-sm text-gray-400">
                        {authState.user.displayName}
                      </span>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      aria-label="Sign out"
                      onClick={() => {
                        handleSignOut();
                        toggleMenu();
                      }}
                      className="flex items-center w-full text-left py-2 px-3 text-red-700 hover:text-red-500 transition-colors duration-200 rounded-sm"
                    >
                      <LogOutIcon className="h-5 w-5 inline-block mr-2" />
                      Sair
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
