import { useCallback, useRef, useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../constants/api';
import { handleError } from '../utils/errorHandler';

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

/**
 * Custom hook for paginated data
 * @param {Function} fetchFunction - Function to fetch paginated data
 * @param {UsePaginationOptions} options - Hook options
 * @returns {UsePaginationReturn<T>} Pagination state and functions
 */
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

  /**
   * Fetch data for a specific page
   * @param {number} page - Page number to fetch
   * @param {boolean} isLoadMore - Whether this is a load more request
   */
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
      } catch (error: any) {
        const errorMessage = handleError(error);

        setState((prev) => ({
          ...prev,
          loading: false,
          loadingMore: false,
          error: errorMessage,
        }));
      } finally {
        isFetchingRef.current = false;
      }
    },
    [fetchFunction, perPage, initialPage]
  );

  /**
   * Load more data (next page)
   */
  const loadMore = useCallback(async () => {
    if (!state.hasMore || state.loadingMore) {
      return;
    }

    const nextPage = state.currentPage + 1;
    await fetchData(nextPage, true);
  }, [state.hasMore, state.loadingMore, state.currentPage, fetchData]);

  /**
   * Refresh data (reload first page)
   */
  const refresh = useCallback(async () => {
    lastPageLoadedRef.current = 0;
    await fetchData(initialPage, false);
  }, [fetchData, initialPage]);

  /**
   * Reset state
   */
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
