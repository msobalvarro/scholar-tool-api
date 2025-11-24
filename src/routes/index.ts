import { Hono } from 'hono'
import { institutionRoute } from './institution-route'

export const router = new Hono()
router.route('/institutions', institutionRoute)
