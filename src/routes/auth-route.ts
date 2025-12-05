import { Hono } from 'hono'
import { authController } from '@/controllers/auth-controller'

export const authRoute = new Hono()

authRoute.post('/root', authController.authUserRoot)
authRoute.post('/institution', authController.authUserInstitution)
authRoute.post('/teacher', authController.authTeacher)

