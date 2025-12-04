import { useState, useCallback } from 'react';
import { api } from '../config/api';

export const useApi = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (requestFn: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await requestFn();
      setData(result);
      return result;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};

