import { Inject, Service } from 'typedi'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { createCalendarEventSchema, updateCalendarEventSchema } from '@/infrastructure/database/schemas/calendar-events-schema'
import { CalendarEventsRepository } from '@/infrastructure/database/repositories/calendar-events-repository'

@Service()
export class CalendarEventsController {
  @Inject()
  private calendarEventsService!: CalendarEventsRepository

  create = async (c: Context) => {
    try {
      const body = await c.req.json()
      const { institutionId } = c.get('jwtPayload')
      const parsedBody = createCalendarEventSchema.parse(body)
      const calendarEvent = await this.calendarEventsService.createCalendarEvent(parsedBody, institutionId)
      return c.json(calendarEvent)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  get = async (c: Context) => {
    try {
      const { institutionId } = c.get('jwtPayload')
      const { startDate, endDate } = c.req.query()
      const calendarEvent = await this.calendarEventsService.getCalendarEvents(institutionId, startDate, endDate)
      return c.json(calendarEvent)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  delete = async (c: Context) => {
    try {
      const { id } = c.req.param()
      const calendarEvent = await this.calendarEventsService.deleteCalendarEvent(id)
      return c.json(calendarEvent)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  update = async (c: Context) => {
    try {
      const { id } = c.req.param()
      const body = await c.req.json()
      const parsedBody = updateCalendarEventSchema.parse(body)
      const calendarEvent = await this.calendarEventsService.updateCalendarEvent(parsedBody)
      return c.json(calendarEvent)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

}