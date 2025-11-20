/**
 * useApi Hook - Simplified API calls with loading and error states
 */

import { useState, useCallback } from 'react';
import type { AxiosError } from 'axios';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: AxiosError) => void;
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const execute = useCallback(
    async (apiCall: Promise<any>) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCall;
        const result = response.data;
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError);
        options.onError?.(axiosError);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}
