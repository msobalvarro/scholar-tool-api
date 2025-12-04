import { responsableController } from '@/controllers/responsable-controller'
import { Hono } from 'hono'
import { jwtUserInstitution } from '@/utils/jtw'

export const responsableRoute = new Hono()

responsableRoute.use('/*', jwtUserInstitution)

responsableRoute.get('/', responsableController.getAll)
responsableRoute.get('/:id', responsableController.getById)
responsableRoute.post('/', responsableController.create)
responsableRoute.put('/', responsableController.update)
responsableRoute.delete('/', responsableController.delete)

