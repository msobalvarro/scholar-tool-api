import { AssignToCourseSchema, assignToCourseSchema, StudentSchema, studentSchema, StudentUpdateSchema } from '@/infrastructure/database/schemas/student-schema'
import { StudentService } from '@/services/student-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'

@Service()
export class StudentController {
  @Inject(() => StudentService)
  studentService!: StudentService

  create = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = studentSchema.parse(body) as StudentSchema
      const user = c.get('jwtPayload')

      const student = await this.studentService.createStudent(parsedBody, user.institutionId)

      return c.json(student)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  update = async (c: Context) => {
    try {
      const { id } = await c.req.param() as { id: string }
      const body = await c.req.json()
      const parsedBody = studentSchema.parse(body) as StudentUpdateSchema
      const user = c.get('jwtPayload')
      const student = await this.studentService.updateStudent(parsedBody, user.institutionId, id)

      return c.json(student)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  delete = async (c: Context) => {
    try {
      const user = c.get('jwtPayload')
      const { id } = await c.req.param() as { id: string }
      const student = await this.studentService.deleteStudent(id, user.institutionId)
      return c.json(student)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAll = async (c: Context) => {
    try {
      const user = c.get('jwtPayload')
      const students = await this.studentService.getAllStudents(user.institutionId)
      return c.json(students)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getById = async (c: Context) => {
    try {
      const { id } = await c.req.param() as { id: string }
      const user = c.get('jwtPayload')
      const student = await this.studentService.getStudentById(id, user.institutionId)
      return c.json(student)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAllByCourseId = async (c: Context) => {
    try {
      const { courseId } = await c.req.param() as { courseId: string }
      const user = c.get('jwtPayload')
      const students = await this.studentService.getAllStudentsByCourse(courseId, user.institutionId)
      return c.json(students)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  assignToCourse = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = assignToCourseSchema.parse(body) as AssignToCourseSchema
      const user = c.get('jwtPayload')
      const student = await this.studentService.assignStudentToCourse(parsedBody, user.institutionId)
      return c.json(student)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}
