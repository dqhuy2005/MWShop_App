export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface PaginationParams {
  page: number;
  per_page: number;
}

export interface PaginationMeta {
  total_products: number;
  current_page: number;
  per_page: number;
  last_page: number;
  has_more: boolean;
  next_page?: number;
}
