import { Hono } from 'hono'
import { institutionRoute } from './institution-route'
import { userInstitutionRoute } from './user-institution-route'
import { authRoute } from './auth-route'

export const router = new Hono()
router.route('/institutions', institutionRoute)
router.route('/user-institutions', userInstitutionRoute)
router.route('/auth', authRoute)

