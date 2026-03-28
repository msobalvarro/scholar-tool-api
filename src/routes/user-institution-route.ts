import { UserInstitutionController } from '@/controllers/user-institution-controller'
import { Hono } from 'hono'
import Container from 'typedi'

export const userInstitutionRoute = new Hono()
const controller = Container.get(UserInstitutionController)

userInstitutionRoute.post('/', controller.createUserInstitution)
userInstitutionRoute.get('/', controller.getAllUserInstitutions)
userInstitutionRoute.put('/', controller.updateUserInstitution)
userInstitutionRoute.get('/:id', controller.getUserInstitutionById)