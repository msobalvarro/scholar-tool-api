import { Notifications } from '@/core/interfaces/dtos'
import { model, Schema } from 'mongoose'

const NotificationSchema = new Schema<Notifications>({
  title: String,
  body: String,
  responsablePerson: [{ type: Schema.Types.ObjectId, ref: 'ResponsablePerson', default: null }],
  course: { type: Schema.Types.ObjectId, ref: 'Course', default: null },
  student: { type: Schema.Types.ObjectId, ref: 'Student', default: null },
  readed: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  institution: { type: Schema.Types.ObjectId, ref: 'Institution', default: null },
})

export const NotificationModel = model('Notification', NotificationSchema)
