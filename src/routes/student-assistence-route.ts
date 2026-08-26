import { StudentAssistenceController } from '@/infrastructure/rest/controllers/student-assistence-controller'
import { jwtUserInstitution, jwtUserTeacher } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const studentAssistenceRoute = new Hono()
const controller = Container.get(StudentAssistenceController)

studentAssistenceRoute.use('/*', jwtUserTeacher)
studentAssistenceRoute.get('/course/:courseId', controller.getAssitencesByCourse)

studentAssistenceRoute.use('/*', jwtUserInstitution)

studentAssistenceRoute.post('/', controller.createAssitence)
studentAssistenceRoute.get('/student/:studentId', controller.getAllAssitencesByStudent)
studentAssistenceRoute.get('/last', controller.getLastAssitences)
studentAssistenceRoute.get('/date', controller.getAssitencesByDate)