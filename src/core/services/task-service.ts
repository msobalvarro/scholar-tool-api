import { ITaskSchema } from '@/infrastructure/database/schemas/task-schema'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'
import { ITaskService } from '../interfaces/service/task-service'
import { TeacherService } from './teacher-service'
import { DateFormatterAdapter } from '@/infrastructure/adapters/date-formats'

@Service()
export class TaskService implements ITaskService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => TeacherService)
  private readonly teacherService!: TeacherService

  @Inject(() => DateFormatterAdapter)
  private readonly dateFormatterAdapter!: DateFormatterAdapter

  async createTask(payload: ITaskSchema, institutionId: string, teacherId: string) {
    const { courseId, asignatureId, ...task } = payload
    const teacher = await this.teacherService.getTeacherById(teacherId, institutionId)

    const course = await this.orm.models.CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const asignature = await this.orm.models.AsignatureModel.findById(asignatureId)
    if (!asignature) throw 'Asignatura no encontrada'

    const institution = await this.institutionService.getActiveInstitution(institutionId)

    return await this.orm.models.TaskModel.create({
      ...task,
      teacher,
      course,
      asignature,
      institution
    })
  }

  async getTasksByCourse(courseId: string, date: string) {
    return await this.orm.models.TaskModel.find({
      course: { _id: courseId },
      dueDate: {
        $gte: this.dateFormatterAdapter.toGteAndLteDate(date).gte,
        $lte: this.dateFormatterAdapter.toGteAndLteDate(date).lte
      }
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
