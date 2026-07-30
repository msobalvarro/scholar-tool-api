import {
  teacherPhotoSchema,
  TeacherPhotoSchema,
  teacherSchema,
  TeacherSchema
} from '@/infrastructure/database/schemas/teacher-schema'
import { TeacherService } from '@/infrastructure/database/repositories/teacher-repository'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class TeacherController {
  constructor(private teacherService: TeacherService) { }

  getAllTeachers = async (c: Context) => {
    const teachers = await this.teacherService.getAllTeachers()
    return c.json(teachers)
  }

  createTeacher = async (c: Context) => {
    const body = await c.req.json()
    const payload = teacherSchema.parse(body) as TeacherSchema
    const user = c.get('jwtPayload')
    const teacher = await this.teacherService.createTeacher(user.institutionId, payload)
    return c.json(teacher)
  }

  getTeacherById = async (c: Context) => {
    const { id } = c.req.param()
    const teacher = await this.teacherService.getTeacherById(id)
    return c.json(teacher)
  }

  updateTeacher = async (c: Context) => {
    const { id } = c.req.param()
    const body = await c.req.json()
    const payload = teacherSchema.parse(body) as TeacherSchema
    const user = c.get('jwtPayload')
    const teacher = await this.teacherService.updateTeacher(user.institutionId, payload, id)
    return c.json(teacher)
  }

  deleteTeacher = async (c: Context) => {
    const { id } = c.req.param()
    const teacher = await this.teacherService.deleteTeacher(id)
    return c.json(teacher)
  }

  updatePhoto = async (c: Context) => {
    const body = await c.req.json()
    const payload = teacherPhotoSchema.parse(body) as TeacherPhotoSchema
    const user = c.get('jwtPayload')
    const teacher = await this.teacherService.updatePhoto(user._id, payload.imageName)

    return c.json(teacher)
  }
}