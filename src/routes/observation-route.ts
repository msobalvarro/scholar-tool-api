import { observationController } from '@/controllers/observation-controller'
import { jwtUserTeacher } from '@/utils/jtw'
import { Hono } from 'hono'

export const observationRoute = new Hono()

observationRoute.use('/*', jwtUserTeacher)
observationRoute.post('/', observationController.createObservation)