import { enrollmentSchema, enrollmentUpdateSchema } from '@/infrastructure/schemas/enrollment-schema'
import { EnrollmentRepository } from '@/core/services/enrollment-service'
import { Context } from 'hono'
import { Service, Inject } from 'typedi'

@Service()
export class EnrollmentController {
  @Inject(() => EnrollmentRepository)
  private enrollmentService!: EnrollmentRepository

  createEnrollment = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = await enrollmentSchema.parseAsync(body)
    const user = c.get('jwtPayload')
    return c.json(
      await this.enrollmentService.createEnrollment(parsedBody, user.institutionId)
    )
  }

  updateEnrollment = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = await enrollmentUpdateSchema.parseAsync(body)
    const user = c.get('jwtPayload')
    return c.json(
      await this.enrollmentService.updateEnrollment(parsedBody, user.institutionId, user._id)
    )
  }

  getEnrollments = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.enrollmentService.getEnrollments(user.institutionId)
    )
  }
}
