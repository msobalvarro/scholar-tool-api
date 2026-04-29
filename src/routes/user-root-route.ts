import { UserRootController } from '@/infrastructure/rest/controllers/user-root-controller'
import { jwtUserRoot } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const userRootRoute = new Hono()
const controller = Container.get(UserRootController)

userRootRoute.use('/*', jwtUserRoot)

userRootRoute.post('/', controller.createUserRoot)
userRootRoute.put('/', controller.updateUserRoot)
userRootRoute.get('/:id', controller.getUserRootById)
userRootRoute.get('/', controller.getAllUserRoots)


