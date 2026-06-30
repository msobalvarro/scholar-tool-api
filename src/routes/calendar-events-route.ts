import { CalendarEventsController } from '@/infrastructure/rest/controllers/calendar-events-controller'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const calendarEventsRoute = new Hono()
const controller = Container.get(CalendarEventsController)

calendarEventsRoute.use('/*', jwtUserInstitution)

calendarEventsRoute.post('/', controller.create)
calendarEventsRoute.get('/', controller.get)
calendarEventsRoute.delete('/:id', controller.delete)
calendarEventsRoute.put('/', controller.update)