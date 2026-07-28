import { CourseController } from '@/infrastructure/rest/controllers/course-controller'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const courseRoute = new Hono()
const controller = Container.get(CourseController)

courseRoute.use('/*', jwtUserInstitution)

courseRoute.post('/', controller.create)
courseRoute.get('/', controller.getAll)
courseRoute.get('/not-in-enrollment/:enrollmentId', controller.getAllNotInEnrollment)

courseRoute.put('/:id', controller.update)
courseRoute.get('/:id', controller.getById)
courseRoute.delete('/:id', controller.delete)
