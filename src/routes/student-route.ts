import { StudentController } from '@/controllers/student-controller'
import { jwtUserInstitution } from '@/utils/jtw'
import { Hono } from 'hono'
import Container from 'typedi'

export const studentRoute = new Hono()
const controller = Container.get(StudentController)

studentRoute.use('/*', jwtUserInstitution)

studentRoute.get('/', controller.getAll)
studentRoute.post('/', controller.create)
studentRoute.put('/:id', controller.update)
studentRoute.delete('/:id', controller.delete)
studentRoute.get('/:id', controller.getById)
studentRoute.get('/course/:courseId', controller.getAllByCourseId)
studentRoute.post('/course/assign', controller.assignToCourse)

