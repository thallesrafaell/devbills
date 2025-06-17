import { Outlet } from 'react-router';

import Footer from '../components/footer';
import Header from '../components/header';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-app">
      <Header />
      <main className="flex-grow py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
