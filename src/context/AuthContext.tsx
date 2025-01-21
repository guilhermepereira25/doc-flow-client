/* eslint-disable react-refresh/only-export-components */
import React, { useState, ReactNode, useEffect } from 'react';
import { createContext } from 'react';
import type { AuthContextType } from '@/lib/types';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('accessToken');
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
