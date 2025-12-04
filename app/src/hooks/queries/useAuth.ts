import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../../config/api';
import { User } from '../../types';
import { queryKeys } from '../../lib/react-query/queryKeys';

const TOKEN_KEY = '@pokemon:token';
const USER_KEY = '@pokemon:user';

export const useAuth = (
  options?: Omit<UseQueryOptions<User | null, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<User | null, Error>({
    queryKey: queryKeys.auth.user(),
    queryFn: async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        const userData = await AsyncStorage.getItem(USER_KEY);

        if (token && userData) {
          setAuthToken(token);
          return JSON.parse(userData) as User;
        }
        return null;
      } catch (error) {
        console.error('Error loading stored auth:', error);
        return null;
      }
    },
    staleTime: Infinity,
    ...options,
  });
};

