import { studentController } from '@/controllers/student-controller'
import { jwtUserInstitution } from '@/utils/jtw'
import { Hono } from 'hono'

export const studentRoute = new Hono()

studentRoute.use('/*', jwtUserInstitution)

studentRoute.post('/', studentController.create)
studentRoute.put('/', studentController.update)
studentRoute.delete('/', studentController.delete)
studentRoute.get('/', studentController.getAll)
studentRoute.get('/:id', studentController.getById)
