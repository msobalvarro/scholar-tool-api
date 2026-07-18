import { Hono } from 'hono'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { EnrollmentController } from '@/infrastructure/rest/controllers/enrollment-controller'
import Container from 'typedi'

export const enrollmentRoute = new Hono()
const controller = Container.get(EnrollmentController)

enrollmentRoute.use('/*', jwtUserInstitution)

enrollmentRoute.post('/', controller.createEnrollment)
enrollmentRoute.get('/', controller.getEnrollments)
