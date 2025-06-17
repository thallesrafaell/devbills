import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { firebaseAuth, googleAuthProvider } from '../config/firebase';
import type { AuthState } from '../types/auth';

interface AuthContextProps {
  authState: AuthState;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<string | null>; // Nova função para atualizar token explicitamente
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    isLoading: true, // Começa como true para indicar carregamento inicial
  });

  const signInWithGoogle = async (): Promise<void> => {
    setAuthState(prevState => ({ ...prevState, isLoading: true, error: null }));
    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider);
      // Não precisa atualizar o estado aqui, pois onAuthStateChanged irá capturar a mudança
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setAuthState(prevState => ({
        ...prevState,
        error: 'Failed to sign in with Google',
        isLoading: false,
      }));
    }
  };

  const signOut = async () => {
    setAuthState(prevState => ({ ...prevState, isLoading: true, error: null }));
    try {
      await firebaseSignOut(firebaseAuth);
      // Não precisa atualizar o estado aqui, pois onAuthStateChanged irá capturar a mudança
    } catch (error) {
      console.error('Error signing out:', error);
      setAuthState(prevState => ({
        ...prevState,
        error: 'Failed to sign out',
        isLoading: false,
      }));
    }
  };

  // Função para forçar a atualização do token
  const refreshToken = async (): Promise<string | null> => {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) return null;

    try {
      const token = await currentUser.getIdToken(true); // true força atualização
      return token;
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('Configurando listener de autenticação...');

    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      user => {
        console.log(
          'Estado de autenticação alterado:',
          user ? 'Usuário logado' : 'Usuário deslogado',
        );

        if (user) {
          setAuthState({
            user: mapUserData(user),
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({ user: null, isLoading: false, error: null });
        }
      },
      error => {
        console.error('Erro no estado de autenticação:', error);
        setAuthState({
          user: null,
          isLoading: false,
          error: error.message,
        });
      },
    );

    return () => unsubscribe();
  }, []);

  const mapUserData = (user: User) => ({
    uuid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });

  return (
    <AuthContext.Provider
      value={{ authState, signInWithGoogle, signOut, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
