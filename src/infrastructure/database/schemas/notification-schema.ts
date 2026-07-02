import { z } from 'zod'

export const notificationSchema = z.object({
  title: z.string(),
  body: z.string(),
})

export type CreateNotificationDto = z.infer<typeof notificationSchema>


export const notificationIdSchema = z.object({
  _id: z.string(),
})

export type NotificationId = z.infer<typeof notificationIdSchema>

