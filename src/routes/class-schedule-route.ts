import { ClassScheduleController } from '@/infrastructure/rest/controllers/class-schedule-controller'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const classScheduleRoute = new Hono()
const controller = Container.get(ClassScheduleController)

classScheduleRoute.use('/*', jwtUserInstitution)
classScheduleRoute.post('/create', controller.createSchedule)
