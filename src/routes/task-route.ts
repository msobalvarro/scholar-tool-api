import { taskController } from '@/controllers/task-controller'
import { jwtUserInstitution } from '@/utils/jtw'
import { Hono } from 'hono'

export const taskRoute = new Hono()

taskRoute.use('/*', jwtUserInstitution)
taskRoute.post('/create', taskController.create)
taskRoute.put('/update', taskController.update)
taskRoute.delete('/delete', taskController.delete)
taskRoute.get('/getByAsignature/:asignatureId/:courseId', taskController.getTasksByAsignature)
