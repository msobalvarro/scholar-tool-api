import { InstitutionController } from '@/infrastructure/rest/controllers/institution-controller'
import { jwtUserRoot } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const institutionRoute = new Hono()
const controller = Container.get(InstitutionController)

institutionRoute.use('/*', jwtUserRoot)


institutionRoute.post('/', controller.createInstitution)
institutionRoute.put('/', controller.updateInstitution)
institutionRoute.delete('/', controller.deleteInstitution)

// institutionRoute.post('/assign-user', controller.assignUserToInstitution)
// institutionRoute.post('/remove-user', controller.removeUserFromInstitution)


institutionRoute.get('/', controller.getInstitutions)
institutionRoute.get('/:id', controller.getInstitutionById)
