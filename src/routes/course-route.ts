import { courseController } from '@/controllers/course-controller'
import { jwtUserInstitution } from '@/utils/jtw'
import { Hono } from 'hono'

export const courseRoute = new Hono()

courseRoute.use('/*', jwtUserInstitution)

courseRoute.post('/', courseController.create)
courseRoute.put('/', courseController.update)
courseRoute.delete('/', courseController.delete)
courseRoute.get('/', courseController.getAll)
courseRoute.get('/:id', courseController.getById)
