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
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    isLoading: false,
  });

  const signInWithGoogle = async (): Promise<void> => {
    setAuthState(prevState => ({ ...prevState, isLoading: true }));
    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider);
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
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (error) {
      console.error('Error signing out:', error);
      setAuthState(prevState => ({
        ...prevState,
        error: 'Failed to sign out',
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      user => {
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
    <AuthContext.Provider value={{ authState, signInWithGoogle, signOut }}>
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
