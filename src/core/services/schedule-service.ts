import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { ClassScheduleSchema } from '../interfaces/input/schedule'

@Service()
export class ClassScheduleService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  async createSchedule(schedule: ClassScheduleSchema) {

  }
}