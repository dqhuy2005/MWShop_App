export * from '../../interfaces';

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

export interface ProductListResponse extends PaginationMeta {
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Category;
  is_hot?: boolean;
  views?: number;
  description?: string;
  stock?: number;
}

export interface Category {
  id: number;
  name: string;
  slug?: string;
  image?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Mail: undefined;
  Notification: undefined;
  Profile: undefined;
  ProductDetail: { productId: number };
};

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

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

export interface Order {
  id: number;
  order_number: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created_at: string;
}

export enum NotificationType {
  ORDER = 'order',
  PROMOTION = 'promotion',
  SYSTEM = 'system',
}
