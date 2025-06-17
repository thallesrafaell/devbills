import { signInWithPopup } from 'firebase/auth';

import GoogleLoginButton from '../components/google-login-button';
import { firebaseAuth, googleAuthProvider } from '../config/firebase';

const Login = () => {
<<<<<<< HEAD
  {
    /** Handle user login */
  }
=======
>>>>>>> 615653e7ed3245848e02df472e1349ecf5733926
  const handleLogin = async () => {
    const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
    console.log('User signed in:', result.user);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            DevBills
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </header>
        <main className="mt-8 bg-white py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Faça login para continuar
            </h2>
            <p className="text-sm font-medium text-gray-400">
              Acesse sua conta para começar a gerenciar suas finanças
            </p>
          </section>

          <GoogleLoginButton onClick={handleLogin} isLoading={false} />
          <footer className="mt-6">
            <p className="text-sm font-medium text-gray-400 text-center">
              Ao fazer login, você concorda com nossos termos de uso e política
              de privacidade.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
