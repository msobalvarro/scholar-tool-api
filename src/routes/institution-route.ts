import { institutionController } from '@/controllers/institution-controller'
import { jwtUserRoot } from '@/utils/jtw'
import { Hono } from 'hono'

export const institutionRoute = new Hono()

institutionRoute.use('/*', jwtUserRoot)


institutionRoute.post('/', institutionController.createInstitution)
institutionRoute.put('/', institutionController.updateInstitution)
institutionRoute.delete('/', institutionController.deleteInstitution)

institutionRoute.post('/assign-user', institutionController.assignUserToInstitution)
institutionRoute.post('/remove-user', institutionController.removeUserFromInstitution)


institutionRoute.get('/', institutionController.getInstitutions)
institutionRoute.get('/:id', institutionController.getInstitutionById)
