import { useCallback, useRef, useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../constants/api';

interface PaginationState<T> {
  data: T[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

interface UsePaginationReturn<T> extends PaginationState<T> {
  fetchData: (page?: number, isLoadMore?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
}

interface UsePaginationOptions {
  perPage?: number;
  initialPage?: number;
}

export function usePagination<T = any>(
  fetchFunction: (params: { page: number; per_page: number }) => Promise<any>,
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> {
  const { perPage = DEFAULT_PER_PAGE, initialPage = DEFAULT_PAGE } = options;

  const [state, setState] = useState<PaginationState<T>>({
    data: [],
    loading: true,
    loadingMore: false,
    error: null,
    currentPage: initialPage,
    hasMore: true,
  });

  // Refs to prevent duplicate requests
  const isFetchingRef = useRef(false);
  const lastPageLoadedRef = useRef(0);

  const fetchData = useCallback(
    async (page: number = initialPage, isLoadMore: boolean = false) => {
      // Prevent duplicate requests
      if (isFetchingRef.current) {
        return;
      }

      // Prevent loading same page twice
      if (isLoadMore && lastPageLoadedRef.current >= page) {
        console.log(`Page ${page} already loaded`);
        return;
      }

      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          isFetchingRef.current = true;

          setState((prev) => ({
            ...prev,
            loading: !isLoadMore,
            loadingMore: isLoadMore,
            error: null,
          }));

          const response = await fetchFunction({
            page,
            per_page: perPage,
          });

          const products = response?.products || [];
          const hasMoreData = response?.has_more ?? false;

          setState((prev) => {
            let newData: T[];

            if (isLoadMore) {
              // Filter out duplicates when loading more
              const existingIds = new Set(
                prev.data.map((item: any) => item.id)
              );
              const newProducts = products.filter(
                (item: any) => !existingIds.has(item.id)
              );
              newData = [...prev.data, ...newProducts];
            } else {
              newData = products;
            }

            return {
              data: newData,
              loading: false,
              loadingMore: false,
              error: null,
              currentPage: page,
              hasMore: hasMoreData,
            };
          });

          lastPageLoadedRef.current = page;
          isFetchingRef.current = false;
          return;
        } catch (error: any) {
          retryCount++;
          
          if (retryCount >= maxRetries) {
            setState((prev) => ({
              ...prev,
              loading: false,
              loadingMore: false,
              error: 'Không thể tải sản phẩm',
            }));
            isFetchingRef.current = false;
            return;
          }

          // Wait before retrying
          console.log(`🔄 Retrying pagination (attempt ${retryCount + 1}/${maxRetries})...`);
          isFetchingRef.current = false;
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    },
    [fetchFunction, perPage, initialPage]
  );
  
  const loadMore = useCallback(async () => {
    if (!state.hasMore || state.loadingMore) {
      return;
    }

    const nextPage = state.currentPage + 1;
    await fetchData(nextPage, true);
  }, [state.hasMore, state.loadingMore, state.currentPage, fetchData]);

  const refresh = useCallback(async () => {
    lastPageLoadedRef.current = 0;
    await fetchData(initialPage, false);
  }, [fetchData, initialPage]);

  const reset = useCallback(() => {
    setState({
      data: [],
      loading: true,
      loadingMore: false,
      error: null,
      currentPage: initialPage,
      hasMore: true,
    });
    isFetchingRef.current = false;
    lastPageLoadedRef.current = 0;
  }, [initialPage]);

  return {
    ...state,
    fetchData,
    loadMore,
    refresh,
    reset,
  };
}

export default usePagination;
