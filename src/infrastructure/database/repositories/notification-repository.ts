import { CreateNotificationDto } from '@/infrastructure/database/schemas/notification-schema'
import { ICreateNotificationFilterDto, INotificationRepository } from '@/core/interfaces/repositories/notification-repository'
import { Inject, Service } from 'typedi'
import { Token } from '@/core/interfaces/dtos'
import { ORM } from '..'
import { FirebasePushNotificationAdapter } from '@/infrastructure/adapters/firebase-push-notification-adapter'

@Service()
export class NotificationRepository implements INotificationRepository {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  @Inject(() => FirebasePushNotificationAdapter)
  private readonly pushNotificationAdapter!: FirebasePushNotificationAdapter

  private async getTokens(filters: ICreateNotificationFilterDto): Promise<Token[]> {
    const tokens: Token[] = []

    if (filters.institutionId) {
      const institution = await this.ORM.models.InstitutionModel.findById(filters.institutionId)
      if (!institution) throw 'Institución no encontrada'
      const t = await this.ORM.models.TokenModel.find({ institution })
      tokens.push(...t.map(t => t.toObject()))
    }

    if (filters.courseId) {
      const course = await this.ORM.models.CourseModel.findById(filters.courseId)
      if (!course) throw 'Curso no encontrado'
      const t = await this.ORM.models.TokenModel.find({ course })
      tokens.push(...t.map(t => t.toObject()))
    }

    if (filters.studensIds) {
      const students = await this.ORM.models.StudentModel.find({ _id: { $in: filters.studensIds } })
      if (!students) throw 'Estudiantes no encontrados'
      const t = await this.ORM.models.TokenModel.find({ student: { $in: students } })
      tokens.push(...t.map(t => t.toObject()))
    }

    return tokens
  }

  async createNotification(notification: CreateNotificationDto, filters: ICreateNotificationFilterDto) {
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