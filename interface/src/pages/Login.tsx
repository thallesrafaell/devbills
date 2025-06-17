import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import GoogleLoginButton from '../components/google-login-button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, authState } = useAuth();
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  useEffect(() => {
    if (authState.user && !authState.isLoading) {
      // Redireciona para a página de dashboard se o usuário já estiver autenticado
      navigate('/dashboard');
    }
  }, [authState.user, authState.isLoading, navigate]);

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
          <div
            className={` ${authState.error ? 'bg-red-100 text-red-700 text-sm rounded-sm py-1 text-center m-0 max-h-7 h-7 min-w-7' : 'bg-transparent text-gray-400 text-sm text-center m-0 max-h-7 h-7 min-w-7'}`}
          >
            {authState.error
              ? authState.error
              : '© ' +
                new Date().getFullYear() +
                ' - Todos os direitos reservados'}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
