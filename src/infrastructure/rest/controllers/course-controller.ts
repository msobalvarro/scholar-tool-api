import { CreateCourseDto, courseSchema } from '@/infrastructure/database/schemas/course-schema'
import { CourseService } from '@/infrastructure/database/repositories/course-repository'
import { Context } from 'hono'
import { Inject, Service } from 'typedi'
@Service()
export class CourseController {
  @Inject(() => CourseService)
  private courseService!: CourseService

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = courseSchema.parse(body) as CreateCourseDto
    const user = c.get('jwtPayload')

    const course = await this.courseService.createCourse(parsedBody, user.institutionId)

    return c.json(course)
  }

  update = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    const body = await c.req.json()
    const parsedBody = courseSchema.parse(body) as CreateCourseDto
    const course = await this.courseService.updateCourse(parsedBody, id)

    return c.json(course)
  }

  delete = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    const course = await this.courseService.deleteCourse(id)
    return c.json(course)
  }

  getAll = async (c: Context) => {
    const user = c.get('jwtPayload')
    const courses = await this.courseService.getAllCourses(user.institutionId)
    return c.json(courses)
  }

  getById = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    const course = await this.courseService.getCourseById(id)
    return c.json(course)
  }

  getAllNotInEnrollment = async (c: Context) => {
    const user = c.get('jwtPayload')
    const courses = await this.courseService.getAllCoursesNotInEnrollment(user.institutionId)
    return c.json(courses)
  }
}