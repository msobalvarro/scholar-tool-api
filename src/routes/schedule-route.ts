import { ScheduleController } from '@/infrastructure/rest/controllers/schedule-controller'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const scheduleRoute = new Hono()
const controller = Container.get(ScheduleController)

scheduleRoute.use('/*', jwtUserInstitution)

scheduleRoute.post('/', controller.createSchedule)
scheduleRoute.get('/:id', controller.getScheduleById)
scheduleRoute.get('/course/:courseId', controller.getScheduleByCourseId)
scheduleRoute.get('/teacher/:teacherId', controller.getScheduleByTeacherId)
scheduleRoute.get('/asignature/:asignatureId', controller.getScheduleByAsignatureId)
scheduleRoute.put('/:id', controller.updateSchedule)
scheduleRoute.delete('/:id', controller.deleteSchedule)