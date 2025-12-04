import { Student, studentSchema, StudentUpdate } from '@/schemas/student-schema'
import { studentService } from '@/services/student-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class StudentController {
  async create(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = studentSchema.parse(body) as Student
      const user = c.get('jwtPayload')

      const student = await studentService.createStudent(parsedBody, user.institutionId)

      return c.json(student)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async update(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = studentSchema.parse(body) as StudentUpdate

      const student = await studentService.updateStudent(parsedBody)

      return c.json(student)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async delete(c: Context) {
    try {
      const { _id } = await c.req.json()
      const student = await studentService.deleteStudent(_id)
      return c.json(student)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getAll(c: Context) {
    try {
      const students = await studentService.getAllStudents()
      return c.json(students)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getById(c: Context) {
    try {
      const { id } = await c.req.param() as { id: string }
      const student = await studentService.getStudentById(id)
      return c.json(student)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const studentController = new StudentController()
