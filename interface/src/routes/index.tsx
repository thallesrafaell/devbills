import { BrowserRouter, Route, Routes } from 'react-router';

import { AuthProvider } from '../context/AuthContext';
import AppLayout from '../layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            {/* Wrap private routes in AppLayout for consistent layout */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
