import { Inject, Service } from 'typedi';
import { ITaskScheduleService, ScheduleByTeacherQuery } from '../interfaces/service/task-schedule-service';
import { TaskSchedule } from '../interfaces/dtos/task-schedule';
import { ScheduleUnitSchema, TaskScheduleSchema } from '@/infrastructure/schemas/task-schedule-schema';
import { ORM } from '@/infrastructure/database';
import { InstitutionService } from './institution-service';
import { TeacherService } from './teacher-service';
import { UserInstitutionService } from './user-institution-service';
import { AsignatureService } from './asignature-service';

@Service()
export class TaskScheduleService implements ITaskScheduleService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => TeacherService)
  private readonly teacherService!: TeacherService

  @Inject(() => UserInstitutionService)
  private readonly userInstitutionService!: UserInstitutionService

  @Inject(() => AsignatureService)
  private readonly asignatureService!: AsignatureService

  private mapingScheduleUnits(scheduleUnit: ScheduleUnitSchema[]) {
    return scheduleUnit.map((unit) => ({
      ...unit,
      tasks: unit.tasks.map((task) => ({
        ...task,
        page: task.page ?? null,
        date: new Date(task.date),
      })),
    }))
  }

  async createTaskSchedule(payload: TaskScheduleSchema, institutionId: string, teacherId: string): Promise<TaskSchedule> {
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const teacher = await this.teacherService.getTeacherById(teacherId, institutionId)
    const asignature = await this.asignatureService.getAsignatureById(payload.asignatureId)

    return await this.orm.models.TaskScheduleModel.create({
      teacher,
      institution,
      asignature,
      month: payload.month,
      year: payload.year,
      scheduleUnit: this.mapingScheduleUnits(payload.scheduleUnit),
    })
  }

  async updateTaskSchedule(payload: TaskScheduleSchema, institutionId: string, teacherId: string, taskId: string): Promise<TaskSchedule | null> {
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const teacher = await this.teacherService.getTeacherById(teacherId, institutionId)
    const asignature = await this.asignatureService.getAsignatureById(payload.asignatureId)

    return await this.orm.models.TaskScheduleModel.findOneAndUpdate(
      {
        _id: taskId,
        teacher,
        institution,
        asignature,
      },
      {
        month: payload.month,
        year: payload.year,
        scheduleUnit: this.mapingScheduleUnits(payload.scheduleUnit),
      },
      { new: true }
    )
  }

  async approveTaskSchedule(taskScheduleId: string, userId: string, institutionId: string): Promise<TaskSchedule | null> {
    const aprovedBy = await this.userInstitutionService.getUserInstitutionById(userId)
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const taskSchedule = await this.orm.models.TaskScheduleModel
      .findOne({
        _id: taskScheduleId,
        institution,
      })
      .populate('aprovedBy')

    if (taskSchedule?.aproved) throw new Error(`El cronograma ya ha sido aprobado por ${taskSchedule.aprovedBy?.name}`)

    return await this.orm.models.TaskScheduleModel.findByIdAndUpdate(
      taskScheduleId,
      { aproved: true, aprovedBy },
      { new: true }
    )
  }

  async getTaskScheduleByMonthAndYear(month: number, year: number, institutionId: string): Promise<TaskSchedule[]> {
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    return await this.orm.models.TaskScheduleModel
      .find({ month, year, institution })
      .populate('teacher', '-_id name email')
      .populate('asignature', '-_id name description')
      .populate('aprovedBy', '-_id name email')
      .select('-institution')
  }

  async getTaskScheduleByStudentById(_: string): Promise<TaskSchedule> {
    throw new Error('Method not implemented.');
  }

  async getScheduleByTeacher(params: ScheduleByTeacherQuery, teacherId: string, institutionId: string): Promise<TaskSchedule[]> {
    const teacher = await this.teacherService.getTeacherById(teacherId, institutionId)
    const asignatures = await this.asignatureService.getAsignaturesByTeacher(teacherId, institutionId)
    const institution = await this.institutionService.getActiveInstitution(institutionId)

    return await this.orm.models.TaskScheduleModel
      .find({
        month: params.month,
        year: params.year,
        asignature: { $in: asignatures },
        teacher,
        institution,
      })
      .populate('teacher', '_id name')
      .populate('asignature')

  }
}