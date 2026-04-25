import {
  teacherPhotoSchema,
  TeacherPhotoSchema,
  teacherSchema,
  TeacherSchema
} from '@/schemas/teacher-schema'
import { TeacherService } from '@/services/teacher-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class TeacherController {
  constructor(private teacherService: TeacherService) { }

  getAllTeachers = async (c: Context) => {
    const teachers = await this.teacherService.getAllTeachers()
    try {
      return c.json(teachers)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  createTeacher = async (c: Context) => {
    try {
      const body = await c.req.json()
      const payload = teacherSchema.parse(body) as TeacherSchema
      const user = c.get('jwtPayload')
      const teacher = await this.teacherService.createTeacher(user.institutionId, payload)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getTeacherById = async (c: Context) => {
    try {
      const { id } = c.req.param()
      const teacher = await this.teacherService.getTeacherById(id)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  updateTeacher = async (c: Context) => {
    try {
      const { id } = c.req.param()
      const body = await c.req.json()
      const payload = teacherSchema.parse(body) as TeacherSchema
      const user = c.get('jwtPayload')
      const teacher = await this.teacherService.updateTeacher(user.institutionId, payload, id)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  deleteTeacher = async (c: Context) => {
    try {
      const { id } = c.req.param()
      const teacher = await this.teacherService.deleteTeacher(id)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  updatePhoto = async (c: Context) => {
    try {
      const body = await c.req.json()
      const payload = teacherPhotoSchema.parse(body) as TeacherPhotoSchema
      const user = c.get('jwtPayload')
      const teacher = await this.teacherService.updatePhoto(user._id, payload.imageName)

      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}