import { institutionController } from '@/controllers/institution-controller'
import { Hono } from 'hono'

export const institutionRoute = new Hono()

institutionRoute.post('/institution', institutionController.createInstitution)
institutionRoute.get('/institution', institutionController.getInstitutions)
institutionRoute.put('/institution', institutionController.updateInstitution)
institutionRoute.delete('/institution', institutionController.deleteInstitution)
institutionRoute.post('/institution/assign-user', institutionController.assignUserToInstitution)
institutionRoute.post('/institution/remove-user', institutionController.removeUserFromInstitution)
