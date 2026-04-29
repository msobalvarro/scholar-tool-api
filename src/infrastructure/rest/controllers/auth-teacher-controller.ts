import { AuthTeacherSchema, authTeacherSchema } from '@/infrastructure/database/schemas/auth-teacher-schema'
import { AuthTeacherService } from '@/infrastructure/database/repositories/auth-teacher-repository'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class AuthTeacherController {
  constructor(private authTeacherService: AuthTeacherService) { }

  create = async (c: Context) => {
    try {
      const body = await c.req.json()
      const payload = authTeacherSchema.parse(body) as AuthTeacherSchema

      const teacherAuth = await this.authTeacherService.createTeacherAuth(payload.teacherId, payload.password)

      return c.json({ teacherAuth }, 201)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAll = async (c: Context) => {
    try {
      const user = c.get('jwtPayload')
      const teachersAuth = await this.authTeacherService.getAllTeacherAuth(user.institutionId)
      return c.json(teachersAuth)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  updatePassword = async (c: Context) => {
    try {
      const body = await c.req.json()
      const payload = authTeacherSchema.parse(body) as AuthTeacherSchema
      const user = c.get('jwtPayload')
      const teacherAuth = await this.authTeacherService.updatePassword(user._id, payload.password)

      return c.json({ teacherAuth })
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}