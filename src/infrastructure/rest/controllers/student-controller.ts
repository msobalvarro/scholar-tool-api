import { AssignToCourseSchema, assignToCourseSchema, StudentSchema, studentSchema, StudentUpdateSchema } from '@/infrastructure/database/schemas/student-schema'
import { StudentRepository } from '@/core/services/student-service'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'

@Service()
export class StudentController {
  @Inject(() => StudentRepository)
  studentService!: StudentRepository

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = studentSchema.parse(body) as StudentSchema
    const user = c.get('jwtPayload')

    const student = await this.studentService.createStudent(parsedBody, user.institutionId)

    return c.json(student)
  }

  update = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    const body = await c.req.json()
    const parsedBody = studentSchema.parse(body) as StudentUpdateSchema
    const user = c.get('jwtPayload')
    const student = await this.studentService.updateStudent(parsedBody, user.institutionId, id)

    return c.json(student)
  }

  delete = async (c: Context) => {
    const user = c.get('jwtPayload')
    const { id } = await c.req.param() as { id: string }
    const student = await this.studentService.deleteStudent(id, user.institutionId)
    return c.json(student)
  }

  getAll = async (c: Context) => {
    const user = c.get('jwtPayload')
    const students = await this.studentService.getAllStudents(user.institutionId)
    return c.json(students)
  }

  getById = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    const user = c.get('jwtPayload')
    const student = await this.studentService.getStudentById(id, user.institutionId)
    return c.json(student)
  }

  getAllByCourseId = async (c: Context) => {
    const { courseId } = await c.req.param() as { courseId: string }
    const user = c.get('jwtPayload')
    const students = await this.studentService.getAllStudentsByCourse(courseId, user.institutionId)
    return c.json(students)
  }

  assignToCourse = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = assignToCourseSchema.parse(body) as AssignToCourseSchema
    const user = c.get('jwtPayload')
    const student = await this.studentService.assignStudentToCourse(parsedBody, user.institutionId)
    return c.json(student)
  }
}
