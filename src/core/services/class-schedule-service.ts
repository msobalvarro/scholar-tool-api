import { Inject, Service } from 'typedi';
import { IClassScheduleService } from '@/core/interfaces/service/class-schedule-service';
import { ClassScheduleSchema } from '@/core/interfaces/input/class-schedule';
import { ClassSchedule } from '@/core/interfaces/dtos';
import { InstitutionService } from './institution-service';
import { CourseService } from './course-service';
import { ORM } from '@/infrastructure/database';

@Service()
export class ClassScheduleService implements IClassScheduleService {
  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => CourseService)
  private readonly courseService!: CourseService

  @Inject(() => ORM)
  private readonly orm!: ORM

  async createClassSchedule(payloadInput: ClassScheduleSchema, institutionId: string): Promise<ClassSchedule> {
    const { courseId, ...restPayload } = payloadInput
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const course = await this.courseService.getActiveCourse(courseId)

    return await this.orm.models.ClassScheduleModel.create({
      ...restPayload,
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