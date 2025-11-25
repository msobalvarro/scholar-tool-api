import { userRootController } from '@/controllers/user-root-controller'
import { jwtUserRoot } from '@/utils/jtw'
import { Hono } from 'hono'

export const userRootRoute = new Hono()

// userRootRoute.use('/*', jwtUserRoot)

userRootRoute.post('/', userRootController.createUserRoot)
userRootRoute.put('/', userRootController.updateUserRoot)
userRootRoute.get('/:id', userRootController.getUserRootById)
userRootRoute.get('/', userRootController.getAllUserRoots)


