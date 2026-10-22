import {
  teacherPhotoSchema,
  TeacherPhotoSchema,
  teacherSchema,
  TeacherSchema
} from '@/infrastructure/schemas/teacher-schema'
import { TeacherService } from '@/core/services/teacher-service'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class TeacherController {
  constructor(private teacherService: TeacherService) { }

  getAllTeachers = async (c: Context) => {
    return c.json(
      await this.teacherService.getAllTeachers()
    )
  }

  createTeacher = async (c: Context) => {
    const body = await c.req.json()
    const payload = teacherSchema.parse(body) as TeacherSchema
    const user = c.get('jwtPayload')
    return c.json(
      await this.teacherService.createTeacher(user.institutionId, payload)
    )
  }

  getTeacherById = async (c: Context) => {
    const { id } = c.req.param()
    const user = c.get('jwtPayload')
    return c.json(
      await this.teacherService.getTeacherById(id, user.institutionId)
    )
  }

  updateTeacher = async (c: Context) => {
    const { id } = c.req.param()
    const body = await c.req.json()
    const payload = teacherSchema.parse(body) as TeacherSchema
    const user = c.get('jwtPayload')
    return c.json(
      await this.teacherService.updateTeacher(user.institutionId, payload, id)
    )
  }

  deleteTeacher = async (c: Context) => {
    const { id } = c.req.param()
    return c.json(
      await this.teacherService.deleteTeacher(id)
    )
  }

  updatePhoto = async (c: Context) => {
    const body = await c.req.json()
    const payload = teacherPhotoSchema.parse(body) as TeacherPhotoSchema
    const user = c.get('jwtPayload')
    return c.json(
      await this.teacherService.updatePhoto(user._id, payload.imageName)
    )
  }
}