import { CreateNotificationDto } from '@/infrastructure/schemas/notification-schema'
import { ICreateNotificationFilterDto, INotificationService } from '@/core/interfaces/service/notification-service'
import { Inject, Service } from 'typedi'
import { Token } from '@/core/interfaces/dtos'
import { ORM } from '@/infrastructure/database'
import { FirebasePushNotificationAdapter } from '@/infrastructure/adapters/firebase-push-notification'
import { InstitutionService } from './institution-service'
import { CourseService } from './course-service'

@Service()
export class NotificationService implements INotificationService {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => FirebasePushNotificationAdapter)
  private readonly pushNotificationAdapter!: FirebasePushNotificationAdapter

  @Inject(() => CourseService)
  private readonly courseService!: CourseService

  private async getTokens(filters: ICreateNotificationFilterDto): Promise<Token[]> {
    const tokens: Token[] = []

    if (filters.institutionId) {
      const institution = await this.institutionService.getActiveInstitution(filters.institutionId)
      const t = await this.ORM.models.TokenModel.find({ institution })
      tokens.push(...t.map(t => t.toObject()))
    }

    if (filters.courseId) {
      const course = await this.courseService.getActiveCourse(filters.courseId)
      const t = await this.ORM.models.TokenModel.find({ course })
      tokens.push(...t.map(t => t.toObject()))
    }

    if (filters.studensIds) {
      const students = await this.ORM.models.StudentModel.find({ _id: { $in: filters.studensIds } })
      const t = await this.ORM.models.TokenModel.find({ student: { $in: students } })
      tokens.push(...t.map(t => t.toObject()))
    }

    if (filters.responsablesIds) {
      const responsables = await this.ORM.models.ResponsableModel.find({ _id: { $in: filters.responsablesIds } })
      const t = await this.ORM.models.TokenModel.find({ responsable: { $in: responsables } })
      tokens.push(...t.map(t => t.toObject()))
    }

    return tokens
  }

  async createLocalAndPushNotification(notification: CreateNotificationDto, filters: ICreateNotificationFilterDto) {
    const tokens: Token[] = await this.getTokens(filters)

    // TODO: modificar en un futuro para asignar notificaciones a estudiantes, responsables, cursos
    const newNotification = await this.ORM.models.NotificationModel.create({ ...notification })

    try {
      for (const { token } of tokens) {
        await this.pushNotificationAdapter.sendPushNotification(token, notification)
      }
    } catch (error) {
      console.log('Error al enviar notificación:', error)
    }

    return newNotification
  }

  async sendNotificationsToTokens(
    tokens: string[],
    notification: CreateNotificationDto,
    data?: Record<string, string>
  ) {
    for (const token of tokens) {
      await this.pushNotificationAdapter.sendPushNotification(token, notification, data)
    }
  }

  async markNotificationAsReaded(notificationId: string) {
    await this.ORM.models.NotificationModel.updateOne({ _id: notificationId }, { readed: true })
  }

  async markNotificationAsDeleted(notificationId: string) {
    await this.ORM.models.NotificationModel.updateOne({ _id: notificationId }, { deleted: true })
  }
}