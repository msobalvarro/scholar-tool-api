import { Schedule, ScheduleUpdate } from '@/infrastructure/schemas/schedule-schema'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'

@Service()
export class ScheduleService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  async createSchedule(schedule: Schedule) {
    const { asignatureId, courseId, teacherId, ...rest } = schedule

    const asignature = await this.orm.models.AsignatureModel.findById(asignatureId)
    const course = await this.orm.models.CourseModel.findById(courseId)
    const teacher = await this.orm.models.TeacherModel.findById(teacherId)

    if (!asignature) throw 'Asignatura no encontrada'
    if (!course) throw 'Curso no encontrado'
    if (!teacher) throw 'Profesor no encontrado'

    const scheduleCreated = await this.orm.models.ScheduleModel.create({
      ...rest,
      asignature,
      teacher,
    })

    await course.updateOne({
      $push: {
        schedules: scheduleCreated._id,
      },
    })

    return scheduleCreated
  }

  async getScheduleById(id: string) {
    const schedule = await this.orm.models.ScheduleModel.findById(id)
    return schedule
  }

  async getScheduleByCourseId(courseId: string) {
    const schedule = await this.orm.models.ScheduleModel.find({ courseId })
    return schedule
  }

  async getScheduleByTeacherId(teacherId: string) {
    const schedule = await this.orm.models.ScheduleModel.find({ teacherId })
    return schedule
  }

  async getScheduleByAsignatureId(asignatureId: string) {
    const schedule = await this.orm.models.ScheduleModel.find({ asignatureId })
    return schedule
  }

  async updateSchedule(schedule: ScheduleUpdate) {
    const { _id, asignatureId, courseId, teacherId, ...rest } = schedule

    const asignature = await this.orm.models.AsignatureModel.findById(asignatureId)
    const course = await this.orm.models.CourseModel.findById(courseId)
    const teacher = await this.orm.models.TeacherModel.findById(teacherId)

    if (!asignature) throw 'Asignatura no encontrada'
    if (!course) throw 'Curso no encontrado'
    if (!teacher) throw 'Profesor no encontrado'


    const scheduleUpdated = await this.orm.models.ScheduleModel.findByIdAndUpdate(
      _id,
      {
        ...rest,
        asignature,
        course,
        teacher,
      },
      { new: true }
    )

    return scheduleUpdated
  }

  async deleteSchedule(id: string) {
    const scheduleDeleted = await this.orm.models.ScheduleModel.findByIdAndDelete(id)
    return scheduleDeleted
  }

  getAllSchedules(_: string) {
    return []
  }
}