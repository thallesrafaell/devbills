import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { authState } = useAuth();

  if (!authState) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
