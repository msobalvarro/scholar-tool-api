import { Inject, Service } from 'typedi';
import { IClassScheduleService } from '../interfaces/service/class-schedule-service';
import { ClassScheduleSchema } from '../interfaces/input/class-schedule';
import { ClassSchedule } from '../interfaces/dtos';
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
}