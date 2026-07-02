import serviceAccount from '@/core/config/firebase-config.json'
import admin from 'firebase-admin'
import { Service } from 'typedi'
import { IPushNotificationAdapter } from '@/core/interfaces/output/push-notification-adapter'

@Service()
export class FirebasePushNotificationAdapter implements IPushNotificationAdapter {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
      })
    }
  }

  async sendPushNotification(
    token: string,
    notification: { title: string; body: string },
    data?: Record<string, string>
  ): Promise<void> {
    await admin.messaging().send({ token, notification, data })
  }
}
