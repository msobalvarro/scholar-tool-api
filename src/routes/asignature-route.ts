import { Hono } from 'hono'
import { jwtUserInstitution } from '@/utils/jtw'
import { asignatureController } from '@/controllers/asignature-controller'

export const asignatureRoute = new Hono()

asignatureRoute.use('/*', jwtUserInstitution)

asignatureRoute.post('/', asignatureController.createAsignature)
asignatureRoute.get('/:id', asignatureController.getAsignatureById)
asignatureRoute.put('/:id', asignatureController.updateAsignature)
asignatureRoute.delete('/:id', asignatureController.deleteAsignature)
asignatureRoute.get('/', asignatureController.getAllAsignatures)