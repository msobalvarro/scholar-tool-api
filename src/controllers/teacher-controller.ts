import {
  teacherPhotoSchema,
  TeacherPhotoSchema,
  teacherSchema,
  TeacherSchema,
  UpdateTeacherSchema,
  updateTeacherSchema
} from '@/schemas/teacher-schema'
import { teacherService } from '@/services/teacher-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class TeacherController {
  async getAllTeachers(c: Context) {
    try {
      const teachers = await teacherService.getAllTeachers()
      return c.json(teachers)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async createTeacher(c: Context) {
    try {
      const body = await c.req.json()
      const payload = teacherSchema.parse(body) as TeacherSchema
      const user = c.get('jwtPayload')
      const teacher = await teacherService.createTeacher(user.institutionId, payload)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getTeacherById(c: Context) {
    try {
      const { id } = c.req.param()
      const teacher = await teacherService.getTeacherById(id)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async updateTeacher(c: Context) {
    try {
      const { id } = c.req.param()
      const body = await c.req.json()
      const payload = teacherSchema.parse(body) as TeacherSchema
      const user = c.get('jwtPayload')
      const teacher = await teacherService.updateTeacher(user.institutionId, payload, id)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async deleteTeacher(c: Context) {
    try {
      const { id } = c.req.param()
      const teacher = await teacherService.deleteTeacher(id)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async updatePhoto(c: Context) {
    try {
      const body = await c.req.json()
      const payload = teacherPhotoSchema.parse(body) as TeacherPhotoSchema
      const user = c.get('jwtPayload')
      const teacher = await teacherService.updatePhoto(user._id, payload.imageName)

      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const teacherController = new TeacherController()