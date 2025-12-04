import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setAuthToken } from '../config/api';
import { AuthResponse, User } from '../types';

const TOKEN_KEY = '@pokemon:token';
const USER_KEY = '@pokemon:user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const userData = await AsyncStorage.getItem(USER_KEY);

      if (token && userData) {
        setAuthToken(token);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      const { accessToken, user: userData } = response.data;

      await AsyncStorage.setItem(TOKEN_KEY, accessToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      setAuthToken(accessToken);
      setUser(userData);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Error logging in'
      );
    }
  };

  const register = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', {
        email,
        password,
      });

      const { accessToken, user: userData } = response.data;

      await AsyncStorage.setItem(TOKEN_KEY, accessToken);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      setAuthToken(accessToken);
      setUser(userData);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Error registering'
      );
    }
  };

  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    setAuthToken(null);
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};

