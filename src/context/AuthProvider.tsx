/* eslint-disable react-refresh/only-export-components */
import React, { useState, ReactNode, useEffect } from 'react';
import { createContext } from 'react';
import type { AuthContextType } from '@/lib/types';
import { useLocation, useNavigate } from 'react-router';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    (async () => {
      if (accessToken && isLoading) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    })();

    if (isLoading) return;
  }, [isLoading]);

  useEffect(() => {
    if (
      isAuthenticated &&
      (location.pathname === '/login' || location.pathname === '/signup')
    ) {
      const navigateFromTo = location.state?.from?.pathname || '/';
      navigate(navigateFromTo, { replace: true });
    }

    if (!isAuthenticated) {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        return;
      }
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, logout, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
