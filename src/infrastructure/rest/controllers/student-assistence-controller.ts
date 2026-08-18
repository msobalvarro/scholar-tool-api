import { studentAssistenceSchema, StudentAssistenceSchema } from '@/infrastructure/database/schemas/student-assistence-schema'
import { StudentAssistenceRepository } from '@/infrastructure/database/repositories/student-assitence-repository'
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
      await this.studentAssistenceRepository.createAssitence(parsedBody, user.institutionId)
    )
  }

  getAllAssitencesByStudent = async (c: Context) => {
    const user = c.get('jwtPayload')
    const { studentId } = c.req.param()
    return c.json(
      await this.studentAssistenceRepository.getAllAssitencesByStudent(studentId, user.institutionId)
    )
  }

  getLastAssitences = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentAssistenceRepository.getLastAssitences(user.institutionId)
    )
  }

  getAssitencesByDate = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentAssistenceRepository.getAssitencesByDate(user.institutionId, c.req.query('date'))
    )
  }
}
