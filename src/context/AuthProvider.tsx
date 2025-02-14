/* eslint-disable react-refresh/only-export-components */
import React, { useState, ReactNode, useEffect, useCallback } from 'react';
import { createContext } from 'react';
import {
  UserPayload,
  userPayloadSchema,
  type AuthContextType,
} from '@/lib/types';
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
  const [user, setUser] = useState<UserPayload | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  }, [navigate]);

  const decodeAndReturnPayload = useCallback((token: string) => {
    const payload = token.split('.')[1];
    //see: https://stackoverflow.com/questions/68849233/convert-a-string-to-base64-in-javascript-btoa-and-atob-are-deprecated
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }, []);

  const isTokenExpired = useCallback(
    (token: string) => {
      const payload = decodeAndReturnPayload(token);
      if (!payload) return false;
      const expirateDate = payload.exp * 1000;
      return expirateDate < Date.now();
    },
    [decodeAndReturnPayload]
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const checkAuthentication = async () => {
      if (accessToken && isLoading) {
        if (isTokenExpired(accessToken)) {
          setIsAuthenticated(false);
          logout();
        } else if (!token && isAuthenticated != true) {
          setToken(accessToken);
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    checkAuthentication();
    if (isLoading) return;
  }, [isAuthenticated, isLoading, isTokenExpired, logout, token]);

  useEffect(() => {
    if (isLoading) return;
    if (
      isAuthenticated &&
      (location.pathname === '/login' || location.pathname === '/signup')
    ) {
      const navigateFromTo = location.state?.from?.pathname || '/';
      navigate(navigateFromTo, { state: { from: 'refresh' } });
    }

    if (!isAuthenticated) {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        return;
      }
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, location, navigate, isLoading]);

  useEffect(() => {
    if (isLoading || !token) {
      return;
    }
    const payload = decodeAndReturnPayload(token);
    if (!payload) {
      return;
    }
    if (user != null) {
      return;
    }
    const userPayload: UserPayload = userPayloadSchema.parse(payload);
    setUser(userPayload);
  }, [token, decodeAndReturnPayload, isLoading, user]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
