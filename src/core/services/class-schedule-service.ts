import { Inject, Service } from 'typedi';
import { IClassScheduleService } from '@/core/interfaces/service/class-schedule-service';
import { ClassScheduleSchema, TimeTableSlotSchema } from '@/core/interfaces/input/class-schedule';
import { ClassSchedule, DayOfWeek, TimeTableSlot } from '@/core/interfaces/dtos';
import { InstitutionService } from './institution-service';
import { CourseService } from './course-service';
import { ORM } from '@/infrastructure/database';
import { AsignatureService } from './asignature-service';

@Service()
export class ClassScheduleService implements IClassScheduleService {
  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => CourseService)
  private readonly courseService!: CourseService

  @Inject(() => AsignatureService)
  private readonly asignatureService!: AsignatureService

  @Inject(() => ORM)
  private readonly orm!: ORM

  private async mapAssignatureScheduleTimeSlot(slot: TimeTableSlotSchema[]): Promise<TimeTableSlot[]> {
    return await Promise.all(
      slot.map(
        async (slot) => ({
          isBreak: slot.isBreak,
          startTime: slot.startTime,
          endTime: slot.endTime,
          asignature:
            (slot.asignatureId && !slot.isBreak)
              ? await this.asignatureService.getAsignatureById(slot.asignatureId)
              : null
        })
      )
    )
  }

  private async verifyIsExistClassScheduleByDayAndYear(courseId: string, dayOfWeek: DayOfWeek, year: number) {
    const existingData = await this.orm.models.ClassScheduleModel.findOne({
      dayOfWeek,
      year,
      course: {
        _id: courseId
      }
    })

    if (existingData !== null) throw new Error('Ya existe un horario para este día y asignatura.')
  }

  async createClassSchedule(payloadInput: ClassScheduleSchema, institutionId: string): Promise<ClassSchedule> {
    const { courseId, timeSlots, ...restPayload } = payloadInput
    await this.verifyIsExistClassScheduleByDayAndYear(
      courseId,
      restPayload.dayOfWeek,
      restPayload.year
    )
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const course = await this.courseService.getActiveCourse(courseId)
    const timeSlotsMapped = await this.mapAssignatureScheduleTimeSlot(timeSlots)

    return await this.orm.models.ClassScheduleModel.create({
      ...restPayload,
      timeSlots: timeSlotsMapped,
      institution,
      course
    })
  }

  async getClassScheduleByCourseAndYear(courseId: string, year: number, institutionId: string): Promise<ClassSchedule[]> {
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const course = await this.courseService.getActiveCourse(courseId)
    return await this.orm.models.ClassScheduleModel.find({
      institution,
      course,
      year
    })
  }
}