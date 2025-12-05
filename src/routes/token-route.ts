import { tokenController } from '@/controllers/token-controller'
import { jwtUserResponsable, jwtUserStudent } from '@/utils/jtw'
import { Hono } from 'hono'

export const tokenRoute = new Hono()

tokenRoute.use('/subscribe/student', jwtUserStudent)
tokenRoute.post('/subscribe/student', tokenController.createTokenStudent)

tokenRoute.use('/subscribe/responsable', jwtUserResponsable)
tokenRoute.post('/subscribe/responsable', tokenController.createTokenResponsable)


tokenRoute.use('/unsubscribe/responsable', jwtUserResponsable)
tokenRoute.post('/unsubscribe/responsable', tokenController.removeToken)


tokenRoute.use('/unsubscribe/student', jwtUserStudent)
tokenRoute.post('/unsubscribe/student', tokenController.removeToken)