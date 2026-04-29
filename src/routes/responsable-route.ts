import { ResponsableController } from '@/infrastructure/rest/controllers/responsable-controller'
import { Hono } from 'hono'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import Container from 'typedi'

export const responsableRoute = new Hono()
const controller = Container.get(ResponsableController)

responsableRoute.use('/*', jwtUserInstitution)

responsableRoute.get('/', controller.getAll)
responsableRoute.get('/:id', controller.getById)
responsableRoute.post('/', controller.create)
responsableRoute.put('/', controller.update)
responsableRoute.delete('/', controller.delete)

