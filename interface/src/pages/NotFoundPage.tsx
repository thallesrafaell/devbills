import { useEffect } from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    // Mapeamento de cores:
    // Fundo: bg-white (claro) e o seu bg-gray-900 (escuro)
    <main className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center h-screen px-4 md:px-0 font-sans">
      <div className="text-center">
        <div className="mb-8">
          {/* Cor do SVG atualizada para text-primary-500 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 h-48 mx-auto text-primary-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" className="opacity-20" />
            <path
              d="M12 18L12 12"
              className="animate-[pulse_2s_ease-in-out_infinite]"
            />
            <path
              d="M12 8L12 8"
              className="animate-[pulse_2s_ease-in-out_infinite_1s]"
            />
            <path d="M8.5 8.5L7 7" className="opacity-50" />
            <path d="M15.5 8.5L17 7" className="opacity-50" />
            <path d="M8.5 15.5L7 17" className="opacity-50" />
            <path d="M15.5 15.5L17 17" className="opacity-50" />
            <path d="M4 12H2" className="opacity-30" />
            <path d="M20 12H22" className="opacity-30" />
            <path d="M12 4V2" className="opacity-30" />
            <path d="M12 20V22" className="opacity-30" />
          </svg>
        </div>

        {/* Cor do "404" e da sombra atualizadas */}
        <h1 className="text-6xl md:text-8xl font-black text-primary-500 drop-shadow-[0_4px_4px_rgba(55,227,89,0.25)]">
          404
        </h1>

        {/* Cores do texto principal atualizadas para os temas claro e escuro */}
        <p className="mt-4 text-xl md:text-2xl font-medium text-gray-950 dark:text-gray-50">
          Ops! Página não encontrada.
        </p>

        {/* Cores do texto secundário (muted) atualizadas */}
        <p className="mt-2 text-base text-gray-700 dark:text-gray-400">
          A página que você está procurando pode ter sido removida ou está
          temporariamente indisponível.
        </p>

        <div className="mt-10">
          {/* Botão atualizado com as cores do tema */}
          <Link
            to="/"
            className="px-8 py-3 text-base font-bold text-gray-950 bg-primary-500 rounded-lg shadow-lg 
                       hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 
                       focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
          >
            Voltar para o Início
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
