import { AssignToCourseSchema, assignToCourseSchema, StudentSchema, studentSchema, StudentUpdateSchema } from '@/infrastructure/schemas/student-schema'
import { StudentService } from '@/core/services/student-service'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'

@Service()
export class StudentController {
  @Inject(() => StudentService)
  studentService!: StudentService

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = studentSchema.parse(body) as StudentSchema
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentService.createStudent(parsedBody, user.institutionId)
    )
  }

  update = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    const body = await c.req.json()
    const parsedBody = studentSchema.parse(body) as StudentUpdateSchema
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentService.updateStudent(parsedBody, user.institutionId, id)
    )
  }

  delete = async (c: Context) => {
    const user = c.get('jwtPayload')
    const { id } = await c.req.param() as { id: string }
    return c.json(
      await this.studentService.deleteStudent(id, user.institutionId)
    )
  }

  getAll = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentService.getAllStudents(user.institutionId)
    )
  }

  getById = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentService.getStudentById(id, user.institutionId)
    )
  }

  getAllByCourseId = async (c: Context) => {
    const { courseId } = await c.req.param() as { courseId: string }
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentService.getAllStudentsByCourse(courseId, user.institutionId)
    )
  }

  assignToCourse = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = assignToCourseSchema.parse(body) as AssignToCourseSchema
    const user = c.get('jwtPayload')
    return c.json(
      await this.studentService.assignStudentToCourse(parsedBody, user.institutionId)
    )
  }
}
