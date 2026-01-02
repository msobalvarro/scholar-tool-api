import { courseController } from '@/controllers/course-controller'
import { jwtUserInstitution } from '@/utils/jtw'
import { Hono } from 'hono'

export const courseRoute = new Hono()

courseRoute.use('/*', jwtUserInstitution)

courseRoute.post('/', courseController.create)
courseRoute.get('/', courseController.getAll)
courseRoute.put('/:id', courseController.update)
courseRoute.get('/:id', courseController.getById)
courseRoute.delete('/:id', courseController.delete)
