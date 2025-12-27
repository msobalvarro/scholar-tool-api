import { studentController } from '@/controllers/student-controller'
import { jwtUserInstitution } from '@/utils/jtw'
import { Hono } from 'hono'

export const studentRoute = new Hono()

studentRoute.use('/*', jwtUserInstitution)

studentRoute.get('/', studentController.getAll)
studentRoute.post('/', studentController.create)
studentRoute.put('/:id', studentController.update)
studentRoute.delete('/:id', studentController.delete)
studentRoute.get('/:id', studentController.getById)
studentRoute.get('/course/:courseId', studentController.getAllByCourseId)
studentRoute.post('/course/assign', studentController.assignToCourse)

