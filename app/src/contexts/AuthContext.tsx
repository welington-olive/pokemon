import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useAuth } from '../hooks/queries/useAuth';
import { useLogin, useRegister, useLogout } from '../hooks/mutations/useAuthMutations';
import { User } from '../types';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: user, isLoading: loading } = useAuth();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const authContextValue = useMemo<AuthContextData>(
    () => ({
      user: user ?? null,
      loading,
      login: async (email: string, password: string) => {
        try {
          await loginMutation.mutateAsync({ email, password });
        } catch (error: any) {
          throw new Error(
            error.response?.data?.message || error.message || 'Error logging in'
          );
        }
      },
      register: async (email: string, password: string) => {
        try {
          await registerMutation.mutateAsync({ email, password });
        } catch (error: any) {
          throw new Error(
            error.response?.data?.message || error.message || 'Error registering'
          );
        }
      },
      logout: async () => {
        await logoutMutation.mutateAsync();
      },
      isAuthenticated: !!user,
    }),
    [user, loading, loginMutation, registerMutation, logoutMutation]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

