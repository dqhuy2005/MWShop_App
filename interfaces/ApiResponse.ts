import { Product } from './Product';

export interface ApiResponse {
  data: {
    total_products: number;
    current_page: number;
    per_page: number;
    last_page: number;
    has_more: boolean;
    products: Product[];
  };
}
