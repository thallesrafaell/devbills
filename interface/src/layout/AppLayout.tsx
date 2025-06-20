import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Footer from '../components/footer';
import Header from '../components/header';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-app">
      <ToastContainer position="top-right" theme="colored" />
      <Header />
      <main className="flex-grow py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
