import { useCallback, useState } from 'react';
import { handleError } from '../utils/errorHandler';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  request: (...args: any[]) => Promise<T | null>;
  reset: () => void;
  setData: (data: T | null) => void;
}


export function useApi<T = any>(): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });


  const request = useCallback(async (...args: any[]): Promise<T | null> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // First argument should be the API function
      const apiFunction = args[0];
      const apiArgs = args.slice(1);

      const response = await apiFunction(...apiArgs);

      setState({
        data: response,
        loading: false,
        error: null,
      });

      return response;
    } catch (error: any) {
      const errorMessage = handleError(error);
      
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });

      return null;
    }
  }, []);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  /**
   * Set data manually
   * @param {T|null} data - Data to set
   */
  const setData = useCallback((data: T | null) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  return {
    ...state,
    request,
    reset,
    setData,
  };
}

export default useApi;
