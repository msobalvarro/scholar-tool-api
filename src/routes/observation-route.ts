import { ObservationController } from '@/controllers/observation-controller'
import { jwtUserTeacher } from '@/utils/jtw'
import { Hono } from 'hono'
import Container from 'typedi'

export const observationRoute = new Hono()
const controller = Container.get(ObservationController)

observationRoute.use('/*', jwtUserTeacher)
observationRoute.post('/', controller.createObservation)