import { AsignatureModel } from '@/models/asignature-model'
import { CourseModel } from '@/models/course-model'
import { InstitutionModel } from '@/models/institution-model'
import { PeriodModel } from '@/models/period-model'
import { TaskModel } from '@/models/task-model'
import { Task } from '@/schemas/task-schema'

class TaskService {
  async createTask(payload: Task, institutionId: string) {
    const { courseId, asignatureId, ...task } = payload

    const course = await CourseModel.findById(courseId)
    if (!course) throw 'Course not found'

    const asignature = await AsignatureModel.findById(asignatureId)
    if (!asignature) throw 'Asignature not found'

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'

    // get the period where the due date is between the start and end date
    const period = await PeriodModel.findOne({
      startDate: { $lte: task.dueDate },
      endDate: { $gte: task.dueDate },
      institution: { _id: institutionId }
    })

    if (!period) throw 'Period not found'

    return await TaskModel.create({
      ...task,
      period,
      course,
      asignature,
      institution
    })
  }
}

export const taskService = new TaskService()
