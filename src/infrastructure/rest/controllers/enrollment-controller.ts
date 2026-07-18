import { EnrollmentInput, enrollmentSchema } from '@/infrastructure/database/schemas/enrollment-schema'
import { EnrollmentRepository } from '@/infrastructure/database/repositories/enrollment-repository'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service, Inject } from 'typedi'

@Service()
export class EnrollmentController {
  @Inject(() => EnrollmentRepository)
  private enrollmentService!: EnrollmentRepository

  createEnrollment = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = await enrollmentSchema.parseAsync(body)
      const user = c.get('jwtPayload')
      const enrollmentCreated = await this.enrollmentService.createEnrollment(parsedBody, user.institutionId)
      return c.json(enrollmentCreated)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getEnrollments = async (c: Context) => {
    try {
      const user = c.get('jwtPayload')
      const enrollments = await this.enrollmentService.getEnrollments(user.institutionId)
      return c.json(enrollments)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}
