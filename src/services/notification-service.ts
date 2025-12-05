import { CourseModel } from '@/models/course-model'
import { MatriculeModel } from '@/models/matricule-model'
import { NotificationModel } from '@/models/notification-model'
import { ResponsableModel } from '@/models/responsable-model'
import { Notification } from '@/schemas/notification-schema'

class NotificationService {
  async createNotification(notification: Notification, institutionId: string) {
    const { coursesId, ...rest } = notification


    // const courses = await CourseModel.find({
    //   responsable: { $in: coursesId },
    // })

    // find all matricules of the institution on the current year
    const matricules = await MatriculeModel.find({
      institution: { _id: institutionId },
      year: new Date().getFullYear(),
    })

    if (!matricules) throw 'Matricules not found'

    // const courses = matricules.map((matricule) => {
    //   if (matricule.course.)
    // })




    const newNotification = await NotificationModel.create(notification)

    return newNotification
  }
}

export const notificationService = new NotificationService()