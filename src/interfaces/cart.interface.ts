import { Product } from './product.interface';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
