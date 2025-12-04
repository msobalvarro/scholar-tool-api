import { scheduleController } from '@/controllers/schedule-controller'
import { jwtUserInstitution } from '@/utils/jtw'
import { Hono } from 'hono'

export const scheduleRoute = new Hono()

scheduleRoute.use('/*', jwtUserInstitution)

scheduleRoute.post('/', scheduleController.createSchedule)
scheduleRoute.get('/:id', scheduleController.getScheduleById)
scheduleRoute.get('/course/:courseId', scheduleController.getScheduleByCourseId)
scheduleRoute.get('/teacher/:teacherId', scheduleController.getScheduleByTeacherId)
scheduleRoute.get('/asignature/:asignatureId', scheduleController.getScheduleByAsignatureId)
scheduleRoute.put('/:id', scheduleController.updateSchedule)
scheduleRoute.delete('/:id', scheduleController.deleteSchedule)