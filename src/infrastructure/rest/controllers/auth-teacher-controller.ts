import { AuthTeacherSchema, authTeacherSchema } from '@/infrastructure/schemas/auth-teacher-schema'
import { AuthTeacherService } from '@/core/services/auth-teacher-service'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class AuthTeacherController {
  constructor(private authTeacherService: AuthTeacherService) { }

  create = async (c: Context) => {
    const body = await c.req.json()
    const payload = authTeacherSchema.parse(body) as AuthTeacherSchema
    return c.json(
      await this.authTeacherService.createTeacherAuth(payload.teacherId, payload.password)
    )
  }

  getAll = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.authTeacherService.getAllTeacherAuth(user.institutionId)
    )
  }

  updatePassword = async (c: Context) => {
    const body = await c.req.json()
    const payload = authTeacherSchema.parse(body) as AuthTeacherSchema
    const user = c.get('jwtPayload')
    return c.json(
      await this.authTeacherService.updatePassword(user._id, payload.password)
    )
  }
}