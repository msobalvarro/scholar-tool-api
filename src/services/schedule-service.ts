import { AsignatureModel } from '@/models/asignature-model'
import { CourseModel } from '@/models/course-model'
import { ScheduleModel } from '@/models/schedule-model'
import { TeacherModel } from '@/models/teacher-model'
import { Schedule, ScheduleUpdate } from '@/schemas/schedule-schema'

class ScheduleService {
  async createSchedule(schedule: Schedule) {
    const { asignatureId, courseId, teacherId, ...rest } = schedule

    const asignature = await AsignatureModel.findById(asignatureId)
    const course = await CourseModel.findById(courseId)
    const teacher = await TeacherModel.findById(teacherId)

    if (!asignature) throw 'Asignatura no encontrada'
    if (!course) throw 'Curso no encontrado'
    if (!teacher) throw 'Profesor no encontrado'

    const scheduleCreated = await ScheduleModel.create({
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
    const schedule = await ScheduleModel.findById(id)
    return schedule
  }

  async getScheduleByCourseId(courseId: string) {
    const schedule = await ScheduleModel.find({ courseId })
    return schedule
  }

  async getScheduleByTeacherId(teacherId: string) {
    const schedule = await ScheduleModel.find({ teacherId })
    return schedule
  }

  async getScheduleByAsignatureId(asignatureId: string) {
    const schedule = await ScheduleModel.find({ asignatureId })
    return schedule
  }

  async updateSchedule(schedule: ScheduleUpdate) {
    const { _id, asignatureId, courseId, teacherId, ...rest } = schedule

    const asignature = await AsignatureModel.findById(asignatureId)
    const course = await CourseModel.findById(courseId)
    const teacher = await TeacherModel.findById(teacherId)

    if (!asignature) throw 'Asignatura no encontrada'
    if (!course) throw 'Curso no encontrado'
    if (!teacher) throw 'Profesor no encontrado'


    const scheduleUpdated = await ScheduleModel.findByIdAndUpdate(
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
    const scheduleDeleted = await ScheduleModel.findByIdAndDelete(id)
    return scheduleDeleted
  }

  async getAllSchedules(insititutionId: string) {
    // const schedules = await ScheduleModel.find({ ins: insititutionId })
    // return schedules
  }
}

export const scheduleService = new ScheduleService()