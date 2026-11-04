import { studentAssistenceSchema, StudentAssistenceSchema } from '@/infrastructure/schemas/student-assistence-schema'
import { StudentAssistenceRepository } from '@/core/services/student-assitence-service'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'

@Service()
export class StudentAssistenceController {
  @Inject(() => StudentAssistenceRepository)
  private studentAssistenceRepository!: StudentAssistenceRepository

  createAssitence = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = studentAssistenceSchema.parse(body) as StudentAssistenceSchema
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentAssistenceRepository.createAssitence(parsedBody, user.institution)
    )
  }

  getAllAssitencesByStudent = async (c: Context) => {
    const user = c.get('jwtPayload')
    const { studentId } = c.req.param()
    return c.json(
      await this.studentAssistenceRepository.getAllAssitencesByStudent(studentId, user.institution)
    )
  }

  getLastAssitences = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentAssistenceRepository.getLastAssitences(user.institution)
    )
  }

  getAssitencesByDate = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentAssistenceRepository.getAssitencesByDate(user.institution, c.req.query('date'))
    )
  }

  getAssitencesByCourse = async (c: Context) => {
    const user = c.get('jwtPayload')
    const { courseId } = c.req.param()
    const { date } = c.req.query()
    return c.json(
      await this.studentAssistenceRepository.getAssitencesByCourse(user.institution, courseId, date)
    )
  }
}
