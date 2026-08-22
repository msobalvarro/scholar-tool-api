import { CreateNotificationDto as NotificationSchema } from '@/infrastructure/database/schemas/notification-schema'
import { Notifications as NotificationDto } from '../dtos'

export interface ICreateNotificationFilterDto {
  institutionId?: string
  courseId?: string
  studensIds?: string[]
}

export interface INotificationRepository {
  createNotification(notification: NotificationSchema, filters: ICreateNotificationFilterDto): Promise<NotificationDto>
  sendNotificationsToTokens(tokens: string[], notification: NotificationSchema, data?: Record<string, string>): Promise<void>
  markNotificationAsReaded(notificationId: string): Promise<void>
  markNotificationAsDeleted(notificationId: string): Promise<void>
}
