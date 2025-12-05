import { z } from 'zod'

export const notificationSchema = z.object({
  title: z.string(),
  message: z.string(),
  coursesId: z.array(z.string()),
})

export type Notification = z.infer<typeof notificationSchema>


export const notificationIdSchema = z.object({
  _id: z.string(),
})

export type NotificationId = z.infer<typeof notificationIdSchema>

