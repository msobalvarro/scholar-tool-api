import { Inject, Service } from 'typedi';
import { IClassScheduleService } from '@/core/interfaces/service/class-schedule-service';
import { ClassScheduleSchema, TimeTableSlotSchema } from '@/core/interfaces/input/class-schedule';
import { ClassSchedule, TimeTableSlot } from '@/core/interfaces/dtos';
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
          ...slot,
          asignature: await this.asignatureService.getAsignatureById(slot.asignatureId)
        })
      )
    )
  }

  async createClassSchedule(payloadInput: ClassScheduleSchema, institutionId: string): Promise<ClassSchedule> {
    const { courseId, timeSlots, ...restPayload } = payloadInput
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