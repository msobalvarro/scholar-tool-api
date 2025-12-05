import { AuthTeacherSchema, authTeacherSchema } from '@/schemas/auth-teacher-schema'
import { authTeacherService } from '@/services/auth-teacher-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class AuthTeacherController {
  async create(c: Context) {
    try {
      const body = await c.req.json()
      const payload = authTeacherSchema.parse(body) as AuthTeacherSchema

      const teacherAuth = await authTeacherService.createTeacherAuth(payload.teacherId, payload.password)

      return c.json({ teacherAuth }, 201)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getAll(c: Context) {
    try {
      const user = c.get('jwtPayload')
      const teachersAuth = await authTeacherService.getAllTeacherAuth(user.institutionId)
      return c.json({ teachersAuth })
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async updatePassword(c: Context) {
    try {
      const body = await c.req.json()
      const payload = authTeacherSchema.parse(body) as AuthTeacherSchema

      const teacherAuth = await authTeacherService.updatePassword(payload.teacherId, payload.password)

      return c.json({ teacherAuth })
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const authTeacherController = new AuthTeacherController()