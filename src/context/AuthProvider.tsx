/* eslint-disable react-refresh/only-export-components */
import React, { useState, ReactNode, useEffect, useCallback } from 'react';
import { createContext } from 'react';
import {
  UserPayload,
  userPayloadSchema,
  type AuthContextType,
} from '@/lib/types';
import { useLocation, useNavigate } from 'react-router';
import LoadingOverlay from '@/components/LoadingOverlay';

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

  const loadUser = useCallback(
    (token: string) => {
      const payload = decodeAndReturnPayload(token);
      if (!payload) return false;
      const userPayload = userPayloadSchema.parse(payload);
      setUser(userPayload);
    },
    [decodeAndReturnPayload]
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const checkAuthentication = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (accessToken && isLoading) {
          if (isTokenExpired(accessToken)) {
            logout();
          } else if (!token && isAuthenticated != true) {
            setToken(accessToken);
            setIsAuthenticated(true);
          }
          loadUser(accessToken);
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
    if (isLoading) return;
  }, [isAuthenticated, isLoading, isTokenExpired, loadUser, logout, token]);

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

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
