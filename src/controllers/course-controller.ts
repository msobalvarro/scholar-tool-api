import { Course, courseSchema, CourseUpdate } from '@/schemas/course-schema'
import { courseService } from '@/services/course-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class CourseController {
  async create(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = courseSchema.parse(body) as Course
      const user = c.get('jwtPayload')

      const course = await courseService.createCourse(parsedBody, user.institutionId)

      return c.json(course)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async update(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = courseSchema.parse(body) as CourseUpdate
      const course = await courseService.updateCourse(parsedBody)

      return c.json(course)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async delete(c: Context) {
    try {
      const { _id } = await c.req.json()
      const course = await courseService.deleteCourse(_id)
      return c.json(course)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getAll(c: Context) {
    try {
      const user = c.get('jwtPayload')
      const courses = await courseService.getAllCourses(user.institutionId)
      return c.json(courses)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getById(c: Context) {
    try {
      const { id } = await c.req.param() as { id: string }
      const course = await courseService.getCourseById(id)
      return c.json(course)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const courseController = new CourseController()