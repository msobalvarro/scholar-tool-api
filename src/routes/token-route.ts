import { TokenController } from '@/infrastructure/rest/controllers/token-controller'
import { jwtUserResponsable, jwtUserStudent } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const tokenRoute = new Hono()
const controller = Container.get(TokenController)

tokenRoute.use('/subscribe/student', jwtUserStudent)
tokenRoute.post('/subscribe/student', controller.createTokenStudent)

tokenRoute.use('/subscribe/responsable', jwtUserResponsable)
tokenRoute.post('/subscribe/responsable', controller.createTokenResponsable)


tokenRoute.use('/unsubscribe/responsable', jwtUserResponsable)
tokenRoute.post('/unsubscribe/responsable', controller.removeToken)


tokenRoute.use('/unsubscribe/student', jwtUserStudent)
tokenRoute.post('/unsubscribe/student', controller.removeToken)