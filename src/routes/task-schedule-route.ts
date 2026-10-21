import { Hono } from 'hono'
import Container from 'typedi'
import { jwtUserTeacher } from '@/infrastructure/rest/middlewares'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { TaskScheduleController } from '@/infrastructure/rest/controllers/task-schedule-controller'

export const taskScheduleRoute = new Hono()
const controller = Container.get(TaskScheduleController)

// Teacher routes — create a task schedule
taskScheduleRoute.use('/create', jwtUserTeacher)
taskScheduleRoute.post('/create', controller.create)

// Institution (admin) routes — approve and query
taskScheduleRoute.use('/approve/:id', jwtUserInstitution)
taskScheduleRoute.patch('/approve/:id', controller.approve)

taskScheduleRoute.use('/:month/:year', jwtUserInstitution)
taskScheduleRoute.get('/:month/:year', controller.getByMonthAndYear)
