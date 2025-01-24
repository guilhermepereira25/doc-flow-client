import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
