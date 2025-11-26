import { useCallback, useState } from 'react';

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
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

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
        retryCount++;
        
        if (retryCount >= maxRetries) {
          setState({
            data: null,
            loading: false,
            error: 'Không thể tải sản phẩm',
          });

          return null;
        }

        // Wait before retrying
        console.log(`🔄 Retrying API call (attempt ${retryCount + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return null;
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

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
