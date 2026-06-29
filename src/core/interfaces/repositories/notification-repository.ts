import { Notification as NotificationSchema } from '@/infrastructure/database/schemas/notification-schema'
import { Notifications as NotificationDto } from '../dtos'

export interface INotificationRepository {
  createNotification(notification: NotificationSchema, institutionId: string): Promise<NotificationDto>
  sendNotificationsToTokens(tokens: string[], notification: NotificationSchema, data?: Record<string, string>): Promise<void>
  markNotificationAsReaded(notificationId: string): Promise<void>
  markNotificationAsDeleted(notificationId: string): Promise<void>
}
