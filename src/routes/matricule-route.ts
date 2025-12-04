import { matriculeController } from '@/controllers/matricule-controller'
import { jwtUserInstitution } from '@/utils/jtw'
import { Hono } from 'hono'

export const matriculeRoute = new Hono()

matriculeRoute.use('/*', jwtUserInstitution)

matriculeRoute.post('/', matriculeController.create)
matriculeRoute.put('/', matriculeController.update)
matriculeRoute.delete('/', matriculeController.delete)
matriculeRoute.get('/', matriculeController.getAll)
matriculeRoute.get('/:id', matriculeController.getById)
