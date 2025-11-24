import { userInstitutionController } from '@/controllers/user-institution-controller'
import { Hono } from 'hono'

export const userInstitutionRoute = new Hono()

userInstitutionRoute.post('/', userInstitutionController.createUserInstitution)
userInstitutionRoute.post('/login', userInstitutionController.login)
