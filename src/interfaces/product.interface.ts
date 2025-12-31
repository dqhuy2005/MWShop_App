import { PaginationMeta } from './api.interface';
import { Category } from './category.interface';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: Category;
  is_hot?: boolean;
  views?: number;
  description?: string;
}

export interface ProductListResponse extends PaginationMeta {
  products: Product[];
}
