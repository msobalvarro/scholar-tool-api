import { CreateNotificationDto as NotificationSchema } from '@/infrastructure/schemas/notification-schema'
import { Notifications as NotificationDto } from '../dtos'

export interface ICreateNotificationFilterDto {
  institutionId?: string
  courseId?: string
  studensIds?: string[]
  responsablesIds?: string[]
}

export interface INotificationService {
  /**
   * Registra una notificacion a la base de datos y envia una notificacione push por aula / cursos / estudiantes
   * @param notification 
   * @param filters 
   */
  createLocalAndPushNotification(notification: NotificationSchema, filters: ICreateNotificationFilterDto): Promise<NotificationDto>
  sendNotificationsToTokens(tokens: string[], notification: NotificationSchema, data?: Record<string, string>): Promise<void>
  markNotificationAsReaded(notificationId: string): Promise<void>
  markNotificationAsDeleted(notificationId: string): Promise<void>
}
