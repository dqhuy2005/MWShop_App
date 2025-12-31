import { NotificationType } from "@/src/types/notification.type";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created_at: string;
}
