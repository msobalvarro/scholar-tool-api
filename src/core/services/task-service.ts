import { ITaskSchema } from '@/infrastructure/schemas/task-schema'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'
import { ITaskService } from '../interfaces/service/task-service'
import { TeacherService } from './teacher-service'
import { DateFormatterAdapter } from '@/infrastructure/adapters/date-formats'
import { NotificationService } from './notification-service'
import { Task } from '../interfaces/dtos'

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

  @Inject(() => NotificationService)
  private readonly notificationService!: NotificationService

  /**
   * Envia notificaciiones a toda el aula/curso y/o 
   * @param courseId Id del curso
   * @param task Tarea a enviar la notificación
   */
  private async sendNotificationToStudentsAndRepresentative(courseId: string, task: Task) {
    const representatives = await this.orm.models.StudentModel.find({ course: { _id: courseId } })
    const responsablesIds = representatives.map(r => r._id.toString())

    // TODO: ver la manera de enviar la notificacion al estudiante y al representante
    await this.notificationService.createLocalAndPushNotification(
      {
        title: `Nueva tarea: ${task.name}`,
        body: `Fecha de entrega: ${this.dateFormatterAdapter.formatToISOString(task.dueDate)}`,
      },
      { courseId, responsablesIds }
    )
  }

  async createTask(payload: ITaskSchema, institutionId: string, teacherId: string) {
    const { courseId, asignatureId, ...task } = payload
    const teacher = await this.teacherService.getTeacherById(teacherId, institutionId)

    const course = await this.orm.models.CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const asignature = await this.orm.models.AsignatureModel.findById(asignatureId)
    if (!asignature) throw 'Asignatura no encontrada'

    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const task_created = await this.orm.models.TaskModel.create({
      ...task,
      teacher,
      course,
      asignature,
      institution
    })

    try {
      await this.sendNotificationToStudentsAndRepresentative(courseId, task_created)
    } catch (error) {
      console.log(error)
    }

    return task_created
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
