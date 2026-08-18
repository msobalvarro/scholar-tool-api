export interface IPushNotificationAdapter {
  sendPushNotification(
    token: string,
    notification: { title: string; body: string },
    data?: Record<string, string>
  ): Promise<void>
}
