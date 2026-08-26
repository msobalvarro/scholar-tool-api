import { TaskController } from '@/infrastructure/rest/controllers/task-controller'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const taskRoute = new Hono()
const controller = Container.get(TaskController)

taskRoute.use('/*', jwtUserInstitution)
taskRoute.post('/create', controller.create)
taskRoute.get('/getByAsignature/:asignatureId/:courseId', controller.getTasksByAsignature)
