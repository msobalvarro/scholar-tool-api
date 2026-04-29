import * as serviceAccount from '@/config/firebase-config.json'
import * as admin from 'firebase-admin'
import { InstitutionModel } from '@/infrastructure/database/models/institution-model'
import { NotificationModel } from '@/infrastructure/database/models/notification-model'
import { Notification } from '@/infrastructure/database/schemas/notification-schema'
import { TokenModel } from '@/infrastructure/database/models/token-model'
import { Service } from 'typedi'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

@Service()
export class NotificationService {
  async createNotification(notification: Notification, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    const newNotification = await NotificationModel.create({ ...notification, institution })

    // TODO: Send notification to all students and responsables
    const tokens = await TokenModel.find({ institution })

    for (const { token } of tokens) {
      await admin.messaging().send({ token, notification })
    }

    return newNotification
  }

  async sendNotificationsToTokens(
    tokens: string[],
    notification: Notification,
    data?: Record<string, string>
  ) {
    for (const token of tokens) {
      await admin.messaging().send({ token, notification, data })
    }
  }

  async markNotificationAsReaded(notificationId: string) {
    await NotificationModel.updateOne({ _id: notificationId }, { readed: true })
  }

  async markNotificationAsDeleted(notificationId: string) {
    await NotificationModel.updateOne({ _id: notificationId }, { deleted: true })
  }
}