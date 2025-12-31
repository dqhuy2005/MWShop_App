import { OrderStatus } from "@/src/types/order.type";
import { Product } from "./product.interface";

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
