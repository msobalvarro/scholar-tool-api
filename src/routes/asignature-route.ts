import { Hono } from 'hono'
import { jwtUserInstitution, jwtUserTeacher } from '@/infrastructure/rest/middlewares'
import { AsignatureController } from '@/infrastructure/rest/controllers/asignature-controller'
import Container from 'typedi'

export const asignatureRoute = new Hono()
const controller = Container.get(AsignatureController)

asignatureRoute.use('/teacher/all', jwtUserTeacher)
asignatureRoute.get('/teacher/all', controller.getAsignaturesByTeacher)

asignatureRoute.use('/*', jwtUserInstitution)

asignatureRoute.post('/', controller.createAsignature)
asignatureRoute.get('/:id', controller.getAsignatureById)
asignatureRoute.put('/:id', controller.updateAsignature)
asignatureRoute.delete('/:id', controller.deleteAsignature)
asignatureRoute.get('/', controller.getAllAsignatures)