import { Course, courseSchema, CourseUpdate, courseUpdateSchema } from '@/schemas/course-schema'
import { CourseService } from '@/services/course-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'
@Service()
export class CourseController {
  constructor(private courseService: CourseService) { }

  create = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = courseSchema.parse(body) as Course
      const user = c.get('jwtPayload')

      const course = await this.courseService.createCourse(parsedBody, user.institutionId)

      return c.json(course)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  update = async (c: Context) => {
    try {
      const { id } = await c.req.param() as { id: string }
      const body = await c.req.json()
      const parsedBody = courseSchema.parse(body) as Course
      const course = await this.courseService.updateCourse(parsedBody, id)

      return c.json(course)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  delete = async (c: Context) => {
    try {
      const { id } = await c.req.param() as { id: string }
      const course = await this.courseService.deleteCourse(id)
      return c.json(course)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAll = async (c: Context) => {
    try {
      const user = c.get('jwtPayload')
      const courses = await this.courseService.getAllCourses(user.institutionId)
      return c.json(courses)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getById = async (c: Context) => {
    try {
      const { id } = await c.req.param() as { id: string }
      const course = await this.courseService.getCourseById(id)
      return c.json(course)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}