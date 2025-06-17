import { LogOutIcon, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { authState, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      throw new Error('Erro ao deslogar: ' + error);
    }
  };
  return (
    <header className="bg-gray-800 border-b border-gray-600">
      <div className="flex items-center justify-between px-4 md:px-18 shadow-md">
        <div className="flex items-center justify-center space-x-2 py-4">
          <TrendingUp className="h-6 w-6 text-primary-500 " />
          <h1 className="text-2xl font-bold text-primary-500">DevBills</h1>
        </div>
        <nav>
          <ul className="hidden md:flex space-x-4">
            <li>
              <a
                href="#"
                className="text-lg text-primary-500 py-2 px-3 bg-primary-500/10 rounded-sm hover:text-primary-500"
              >
                Transações
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg text-primary-500 py-2 px-3 bg-primary-500/10 rounded-sm hover:text-primary-500"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </nav>
        {authState.user && (
          <div className="flex items-center gap-5 md:gap-4">
            <div className="flex items-center gap-2">
              <img
                src={authState.user.photoURL || ''}
                alt={authState.user.displayName || ''}
                className="h-8 w-8 rounded-full"
              />
              <span className="hidden md:block text-gray-600">
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
    </header>
  );
};

export default Header;
