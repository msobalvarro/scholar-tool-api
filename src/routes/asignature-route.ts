import { Hono } from 'hono'
import { jwtUserInstitution } from '@/utils/jtw'
import { AsignatureController } from '@/controllers/asignature-controller'
import Container from 'typedi'

export const asignatureRoute = new Hono()
const controller = Container.get(AsignatureController)

asignatureRoute.use('/*', jwtUserInstitution)

asignatureRoute.post('/', controller.createAsignature)
asignatureRoute.get('/:id', controller.getAsignatureById)
asignatureRoute.put('/:id', controller.updateAsignature)
asignatureRoute.delete('/:id', controller.deleteAsignature)
asignatureRoute.get('/', controller.getAllAsignatures)