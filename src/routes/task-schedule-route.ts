import { Hono } from 'hono'
import Container from 'typedi'
import { jwtUserTeacher } from '@/infrastructure/rest/middlewares'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { TaskScheduleController } from '@/infrastructure/rest/controllers/task-schedule-controller'
import { zValidator } from '@hono/zod-validator'
import { searchTaskScheduleByUserInstitutionQuerySchema } from '@/infrastructure/schemas/task-schedule-schema'

export const taskScheduleRoute = new Hono()
const controller = Container.get(TaskScheduleController)

taskScheduleRoute.post('/approve/:id', jwtUserInstitution, controller.approve)

taskScheduleRoute.get(
  '/date',
  jwtUserInstitution,
  zValidator('query', searchTaskScheduleByUserInstitutionQuerySchema),
  controller.getByMonthAndYear
)
taskScheduleRoute.post('/create', jwtUserTeacher, controller.create)
taskScheduleRoute.put('/update/:id', jwtUserTeacher, controller.update)
taskScheduleRoute.get('/teacher', jwtUserTeacher, controller.getScheduleByTeacher)

