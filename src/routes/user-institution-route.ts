import { userInstitutionController } from '@/controllers/user-institution-controller'
import { Hono } from 'hono'

export const userInstitutionRoute = new Hono()


userInstitutionRoute.post('/', userInstitutionController.createUserInstitution)
userInstitutionRoute.get('/', userInstitutionController.getAllUserInstitutions)
userInstitutionRoute.get('/:id', userInstitutionController.getUserInstitutionById)
