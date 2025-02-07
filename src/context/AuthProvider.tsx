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
    const checkAuthenticaion = async () => {
      if (accessToken && isLoading) {
        if (isTokenExpired(accessToken)) {
          setIsAuthenticated(false);
        } else if (!token && isAuthenticated != true) {
          setIsAuthenticated(true);
          setToken(accessToken);
        }
      }
      setIsLoading(false);
    };

    checkAuthenticaion();
    if (isLoading) return;
  }, [isAuthenticated, isLoading, isTokenExpired, token]);

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
      console.log('location', location);
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, location, navigate, isLoading]);

  useEffect(() => {
    if (!token) {
      return;
    }
    const payload = decodeAndReturnPayload(token);
    if (!payload) {
      return;
    }
    const user: UserPayload = userPayloadSchema.parse(payload);
    setUser(user);
  }, [token, decodeAndReturnPayload]);

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
