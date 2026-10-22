import { CreateCourseDto, courseSchema } from '@/infrastructure/schemas/course-schema'
import { CourseService } from '@/core/services/course-service'
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
    return c.json(
      await this.courseService.createCourse(parsedBody, user.institutionId)
    )
  }

  update = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    const body = await c.req.json()
    const parsedBody = courseSchema.parse(body) as CreateCourseDto
    return c.json(
      await this.courseService.updateCourse(parsedBody, id)
    )
  }

  delete = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    return c.json(
      await this.courseService.deleteCourse(id)
    )
  }

  getAll = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.courseService.getAllCourses(user.institutionId)
    )
  }

  getById = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    return c.json(
      await this.courseService.getCourseById(id)
    )
  }

  getAllNotInEnrollment = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.courseService.getAllCoursesNotInEnrollment(user.institutionId)
    )
  }
}