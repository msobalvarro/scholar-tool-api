import { Notifications } from '@/utils/types'
import { model, Schema } from 'mongoose'

const NotificationSchema = new Schema<Notifications>({
  title: String,
  body: String,
  responsablePerson: [{ type: Schema.Types.ObjectId, ref: 'ResponsablePerson' }],
  readed: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  institution: { type: Schema.Types.ObjectId, ref: 'Institution' },
})

export const NotificationModel = model('Notification', NotificationSchema)
