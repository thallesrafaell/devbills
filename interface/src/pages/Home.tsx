import { CreditCard, List, TrendingUp, Wallet } from 'lucide-react';

import Button from '../components/button';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Home = () => {
  const currentYear = new Date().getFullYear();
  const features: Feature[] = [
    {
      title: 'Controle Financeiro',
      description:
        'Monitore suas despesas e receitas em um só lugar, com uma interface intuitiva e fácil de usar.',
      icon: <Wallet className="w-8 h-8 text-primary-500" />,
    },
    {
      title: 'Relatórios',
      description:
        'Visualize graficamente seus gastos e entenda para onde seu dinheiro está indo.',
      icon: <TrendingUp className="w-8 h-8 text-primary-500" />,
    },
    {
      title: 'Categorias Personalizadas',
      description:
        'Organize suas transações em categorias para melhor análise.',
      icon: <List className="w-8 h-8 text-primary-500" />,
    },
    {
      title: 'Transações Ilimitadas',
      description:
        'Adicione quantas transações quiser e mantenha um histórico completo de suas finanças.',
      icon: <CreditCard className="w-8 h-8 text-primary-500" />,
    },
  ];
  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="container-app">
        {/** Hero Section */}
        <section className="py-12 md:py-20 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12  items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Gerencie suas finanças com o{' '}
                <span className="text-primary-500">DevBills</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Uma plataforma simples e eficiente para controlar suas despesas
                e receitas. Organize suas finanças pessoais ou do seu negócio
                com facilidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="text-center py-3 px-6">Começar agora</Button>
              </div>
            </div>
          </div>
        </section>
        {/** Features Section */}
        {/** TODO CRIAR UMA CLASSE PARA SECTIONS*/}
        <section className="py-12 md:py-20 bg-gray-900 rounded-xl">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Recursos do <span className="text-primary-500">DevBills</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Nossa plataforma oferece tudo o que você precisa para manter
                suas finanças organizadas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-xl hover:shadow-lg"
                >
                  <div className="mb-4 bg-primary/10 p-3 rounded-full inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/** Section CTA*/}
        <section className="py-12 md:py-20">
          <div className="bg-gray-900 p-8 md:p-12 rounded-xl text-center border border-solid border-gray-600">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para organizar suas finanças?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Comece a usar o DevBills hoje mesmo e tenha o controle total sobre
              seu dinheiro. É gratuito e fácil de usar!
            </p>
            <div className="flex justify-center mt-6">
              <Button className="text-center py-3 px-6">
                Criar Conta Gratuita
              </Button>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-md font-bold text-primary-500">DevBills</h3>
              <p className="text-text-muted text-sm">
                © {currentYear} - Todos os direitos reservados
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
