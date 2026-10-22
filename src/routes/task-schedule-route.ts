import { Hono } from 'hono'
import Container from 'typedi'
import { jwtUserTeacher } from '@/infrastructure/rest/middlewares'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { TaskScheduleController } from '@/infrastructure/rest/controllers/task-schedule-controller'
import { zValidator } from '@hono/zod-validator'
import { searchTaskScheduleByUserInstitutionQuerySchema } from '@/infrastructure/schemas/task-schedule-schema'

export const taskScheduleRoute = new Hono()
const controller = Container.get(TaskScheduleController)

// Institution (admin) routes — approve and query
taskScheduleRoute.use('/approve/:id', jwtUserInstitution)
taskScheduleRoute.patch('/approve/:id', controller.approve)

taskScheduleRoute.use('/date', jwtUserInstitution)
taskScheduleRoute.get('/date', zValidator('query', searchTaskScheduleByUserInstitutionQuerySchema), controller.getByMonthAndYear)

taskScheduleRoute.use('/*', jwtUserTeacher)
// Teacher routes — create a task schedule
taskScheduleRoute.post('/create', controller.create)
taskScheduleRoute.put('/update/:id', controller.update)

taskScheduleRoute.get('/teacher', controller.getScheduleByTeacher)

