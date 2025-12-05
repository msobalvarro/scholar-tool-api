import * as serviceAccount from '@/config/firebase-config.json'
import * as admin from 'firebase-admin'
import { InstitutionModel } from '@/models/institution-model'
import { NotificationModel } from '@/models/notification-model'
import { Notification } from '@/schemas/notification-schema'
import { TokenModel } from '@/models/token-model'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

class NotificationService {
  async createNotification(notification: Notification, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'
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
}

export const notificationService = new NotificationService()