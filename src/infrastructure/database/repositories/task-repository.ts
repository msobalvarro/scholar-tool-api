import { Task, TaskUpdate } from '@/infrastructure/database/schemas/task-schema'
import { Inject, Service } from 'typedi'
import { ORM } from '..'

@Service()
export class TaskService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  async createTask(payload: Task, institutionId: string) {
    const { courseId, asignatureId, ...task } = payload

    const course = await this.orm.models.CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const asignature = await this.orm.models.AsignatureModel.findById(asignatureId)
    if (!asignature) throw 'Asignatura no encontrada'

    const institution = await this.orm.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    // get the period where the due date is between the start and end date
    const period = await this.orm.models.PeriodModel.findOne({
      startDate: { $lte: task.dueDate },
      endDate: { $gte: task.dueDate },
      institution: { _id: institutionId }
    })

    if (!period) throw 'Periodo no encontrado'

    return await this.orm.models.TaskModel.create({
      ...task,
      period,
      course,
      asignature,
      institution
    })
  }

  async updateTask(payload: TaskUpdate, institutionId: string) {
    const { courseId, asignatureId, ...task } = payload

    const course = await this.orm.models.CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const asignature = await this.orm.models.AsignatureModel.findById(asignatureId)
    if (!asignature) throw 'Asignatura no encontrada'

    const institution = await this.orm.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    // get the period where the due date is between the start and end date
    const period = await this.orm.models.PeriodModel.findOne({
      startDate: { $lte: task.dueDate },
      endDate: { $gte: task.dueDate },
      institution: { _id: institutionId },
    })

    if (!period) throw 'Periodo no encontrado'

    return await this.orm.models.TaskModel.findByIdAndUpdate(payload._id, payload)
  }

  async deleteTask(taskId: string) {
    return await this.orm.models.TaskModel.findByIdAndDelete(taskId)
  }

  async getTasksByCourse(courseId: string, periodId: string) {
    return await this.orm.models.TaskModel.find({
      course: { _id: courseId },
      period: { _id: periodId }
    })
  }

  async getTasksByAsignature(asignatureId: string, courseId: string) {
    const periodDate = new Date()

    const period = await this.orm.models.PeriodModel.findOne({
      startDate: { $lte: periodDate },
      endDate: { $gte: periodDate },
    })

    if (!period) throw 'Periodo no encontrado'

    return await this.orm.models.TaskModel.find({
      asignature: { _id: asignatureId },
      course: { _id: courseId },
      period,
    })
  }
}
