import { AuthTeacherSchema, authTeacherSchema } from '@/infrastructure/database/schemas/auth-teacher-schema'
import { AuthTeacherService } from '@/core/services/auth-teacher-service'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class AuthTeacherController {
  constructor(private authTeacherService: AuthTeacherService) { }

  create = async (c: Context) => {
    const body = await c.req.json()
    const payload = authTeacherSchema.parse(body) as AuthTeacherSchema

    const teacherAuth = await this.authTeacherService.createTeacherAuth(payload.teacherId, payload.password)

    return c.json({ teacherAuth }, 201)
  }

  getAll = async (c: Context) => {
    const user = c.get('jwtPayload')
    const teachersAuth = await this.authTeacherService.getAllTeacherAuth(user.institutionId)
    return c.json(teachersAuth)
  }

  updatePassword = async (c: Context) => {
    const body = await c.req.json()
    const payload = authTeacherSchema.parse(body) as AuthTeacherSchema
    const user = c.get('jwtPayload')
    const teacherAuth = await this.authTeacherService.updatePassword(user._id, payload.password)

    return c.json({ teacherAuth })
  }
}