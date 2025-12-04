import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setAuthToken } from '../../config/api';
import { AuthResponse, User } from '../../types';
import { queryKeys } from '../../lib/react-query/queryKeys';

const TOKEN_KEY = '@pokemon:token';
const USER_KEY = '@pokemon:user';

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
}

export const useLogin = (
  options?: Omit<UseMutationOptions<AuthResponse, Error, LoginParams>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginParams>({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await api.post<AuthResponse>('/auth/login', {
          email,
          password,
        });
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Error logging in';
        throw new Error(errorMessage);
      }
    },
    onSuccess: async (data) => {
      const { accessToken, user: userData } = data;
      await AsyncStorage.setItem(TOKEN_KEY, accessToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      setAuthToken(accessToken);
      queryClient.setQueryData<User>(queryKeys.auth.user(), userData);
    },
    ...options,
  });
};

export const useRegister = (
  options?: Omit<UseMutationOptions<AuthResponse, Error, RegisterParams>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, RegisterParams>({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await api.post<AuthResponse>('/auth/register', {
          email,
          password,
        });
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Error registering';
        throw new Error(errorMessage);
      }
    },
    onSuccess: async (data) => {
      const { accessToken, user: userData } = data;
      await AsyncStorage.setItem(TOKEN_KEY, accessToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      setAuthToken(accessToken);
      queryClient.setQueryData<User>(queryKeys.auth.user(), userData);
    },
    ...options,
  });
};

export const useLogout = (
  options?: Omit<UseMutationOptions<void, Error, void>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      setAuthToken(null);
    },
    onSuccess: () => {
      queryClient.clear();
      queryClient.removeQueries({ queryKey: queryKeys.auth.user() });
    },
    ...options,
  });
};

