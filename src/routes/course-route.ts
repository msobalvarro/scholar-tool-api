import { CourseController } from '@/controllers/course-controller'
import { jwtUserInstitution } from '@/utils/jtw'
import { Hono } from 'hono'
import Container from 'typedi'

export const courseRoute = new Hono()
const controller = Container.get(CourseController)

courseRoute.use('/*', jwtUserInstitution)

courseRoute.post('/', controller.create)
courseRoute.get('/', controller.getAll)
courseRoute.put('/:id', controller.update)
courseRoute.get('/:id', controller.getById)
courseRoute.delete('/:id', controller.delete)
