import { CreateTeacherSchema, createTeacherSchema, teacherSchema, UpdateTeacherSchema, updateTeacherSchema } from '@/schemas/teacher-schema';
import { teacherService } from '@/services/teacher-service';
import { ErrorValidator } from '@/utils/error-validator';
import { Context } from 'hono';

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
      const { institutionId, ...payload } = createTeacherSchema.parse(body) as CreateTeacherSchema

      const teacher = await teacherService.createTeacher(institutionId, payload)

      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
  async getTeacherById(c: Context) {
    try {
      const { id } = c.req.param() as { id: string }
      const teacher = await teacherService.getTeacherById(id)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
  async updateTeacher(c: Context) {
    try {
      const body = await c.req.json()
      const payload = updateTeacherSchema.parse(body) as UpdateTeacherSchema
      const teacher = await teacherService.updateTeacher(payload)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
  async deleteTeacher(c: Context) {
    try {
      const { id } = c.req.param() as { id: string }
      const teacher = await teacherService.deleteTeacher(id)
      return c.json(teacher)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const teacherController = new TeacherController()