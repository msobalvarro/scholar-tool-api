import { CourseModel } from '@/models/course-model'
import { InstitutionModel } from '@/models/institution-model'
import { MatriculeModel } from '@/models/matricule-model'
import { NotificationModel } from '@/models/notification-model'
import { ResponsableModel } from '@/models/responsable-model'
import { Notification } from '@/schemas/notification-schema'

class NotificationService {
  async createNotification(notification: Notification, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'
    const newNotification = await NotificationModel.create({ ...notification, institution })

    // TODO: Send notification to all students and responsables

    return newNotification
  }
}

export const notificationService = new NotificationService()