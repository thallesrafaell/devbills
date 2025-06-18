import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { authState } = useAuth();

  // If the user is not authenticated, redirect to login
  if (!authState.user) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
