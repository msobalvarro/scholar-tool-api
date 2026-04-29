import { AsignatureModel } from '@/infrastructure/database/models/asignature-model'
import { CourseModel } from '@/infrastructure/database/models/course-model'
import { InstitutionModel } from '@/infrastructure/database/models/institution-model'
import { PeriodModel } from '@/infrastructure/database/models/period-model'
import { TaskModel } from '@/infrastructure/database/models/task-model'
import { Task, TaskUpdate } from '@/infrastructure/database/schemas/task-schema'
import { Service } from 'typedi'

@Service()
export class TaskService {
  async createTask(payload: Task, institutionId: string) {
    const { courseId, asignatureId, ...task } = payload

    const course = await CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const asignature = await AsignatureModel.findById(asignatureId)
    if (!asignature) throw 'Asignatura no encontrada'

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    // get the period where the due date is between the start and end date
    const period = await PeriodModel.findOne({
      startDate: { $lte: task.dueDate },
      endDate: { $gte: task.dueDate },
      institution: { _id: institutionId }
    })

    if (!period) throw 'Periodo no encontrado'

    return await TaskModel.create({
      ...task,
      period,
      course,
      asignature,
      institution
    })
  }

  async updateTask(payload: TaskUpdate, institutionId: string) {
    const { courseId, asignatureId, ...task } = payload

    const course = await CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const asignature = await AsignatureModel.findById(asignatureId)
    if (!asignature) throw 'Asignatura no encontrada'

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    // get the period where the due date is between the start and end date
    const period = await PeriodModel.findOne({
      startDate: { $lte: task.dueDate },
      endDate: { $gte: task.dueDate },
      institution: { _id: institutionId },
    })

    if (!period) throw 'Periodo no encontrado'

    return await TaskModel.findByIdAndUpdate(payload._id, payload)
  }

  async deleteTask(taskId: string) {
    return await TaskModel.findByIdAndDelete(taskId)
  }

  async getTasksByCourse(courseId: string, periodId: string) {
    return await TaskModel.find({
      course: { _id: courseId },
      period: { _id: periodId }
    })
  }

  async getTasksByAsignature(asignatureId: string, courseId: string) {
    const periodDate = new Date()

    const period = await PeriodModel.findOne({
      startDate: { $lte: periodDate },
      endDate: { $gte: periodDate },
    })

    if (!period) throw 'Periodo no encontrado'

    return await TaskModel.find({
      asignature: { _id: asignatureId },
      course: { _id: courseId },
      period,
    })
  }
}
