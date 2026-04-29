import { MatriculeController } from '@/infrastructure/rest/controllers/matricule-controller'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const matriculeRoute = new Hono()
const controller = Container.get(MatriculeController)

matriculeRoute.use('/*', jwtUserInstitution)

matriculeRoute.post('/', controller.create)
matriculeRoute.put('/', controller.update)
matriculeRoute.delete('/', controller.delete)
matriculeRoute.get('/', controller.getAll)
matriculeRoute.get('/:id', controller.getById)
