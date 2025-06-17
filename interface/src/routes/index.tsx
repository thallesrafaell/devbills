import { BrowserRouter, Route, Routes } from 'react-router';

import { AuthProvider } from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
