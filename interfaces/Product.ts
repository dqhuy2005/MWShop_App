import { Category } from './Category';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category_id: number;
  status: boolean;
  is_hot: boolean;
  views: number;
  created_at: string;
  category?: Category;
}
