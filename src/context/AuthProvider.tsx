/* eslint-disable react-refresh/only-export-components */
import React, { useState, ReactNode, useEffect } from 'react';
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

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const decodeAndReturnPayload = (token: string): UserPayload => {
    const payload = token.split('.')[1];
    //see: https://stackoverflow.com/questions/68849233/convert-a-string-to-base64-in-javascript-btoa-and-atob-are-deprecated
    const decodedPayload = atob(payload);
    const jsonParsed = JSON.parse(decodedPayload);
    return userPayloadSchema.parse(jsonParsed);
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

    if (!isAuthenticated && !isLoading) {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        return;
      }
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, location, navigate, isLoading]);

  useEffect(() => {
    if (!token) {
      return;
    }
    const user = decodeAndReturnPayload(token);
    if (!user) {
      return;
    }
    setUser(user);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        logout,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
