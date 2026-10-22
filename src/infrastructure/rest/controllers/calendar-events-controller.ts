import { Inject, Service } from 'typedi'
import { Context } from 'hono'
import { createCalendarEventSchema, updateCalendarEventSchema } from '@/infrastructure/schemas/calendar-events-schema'
import { CalendarEventsRepository } from '@/core/services/calendar-events-service'

@Service()
export class CalendarEventsController {
  @Inject()
  private calendarEventsService!: CalendarEventsRepository

  create = async (c: Context) => {
    const body = await c.req.json()
    const { institutionId } = c.get('jwtPayload')
    const parsedBody = createCalendarEventSchema.parse(body)
    return c.json(
      await this.calendarEventsService.createCalendarEvent(parsedBody, institutionId)
    )
  }

  get = async (c: Context) => {
    const { institutionId } = c.get('jwtPayload')
    const { startDate, endDate } = c.req.query()
    return c.json(
      await this.calendarEventsService.getCalendarEvents(institutionId, startDate, endDate)
    )
  }

  delete = async (c: Context) => {
    const { id } = c.req.param()
    return c.json(
      await this.calendarEventsService.deleteCalendarEvent(id)
    )
  }

  update = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = updateCalendarEventSchema.parse(body)
    return c.json(
      await this.calendarEventsService.updateCalendarEvent(parsedBody)
    )
  }
}