import { ORM } from '..'
import { CalendarEvents } from '@/core/interfaces/dtos/calendar-events'
import { Inject, Service } from 'typedi'
import { ICalendarEventsRepository } from '@/core/interfaces/repositories/calendar-event-repository'
import { CreateCalendarEventDto, UpdateCalendarEventDto } from '../schemas/calendar-events-schema'

@Service()
export class CalendarEventsRepository implements ICalendarEventsRepository {
  @Inject(() => ORM)
  private ORM!: ORM

  async createCalendarEvent(calendarEvent: CreateCalendarEventDto, institutionId: string) {
    const { courseId, ...payload } = calendarEvent
    const course = courseId ? await this.ORM.models.CourseModel.findById(courseId) : null
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)

    if (!institution) throw new Error('Institution not found')

    const calendarEventCreated = await this.ORM.models.CalendarEventModel.create({
      ...payload,
      course,
      institution
    })
    return calendarEventCreated
  }

  async getCalendarEvents(institutionId: string, startDate: string, endDate: string) {
    const calendarEvents = await this.ORM.models.CalendarEventModel.find({
      institution: {
        _id: institutionId,
      },
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate('course')
    return calendarEvents
  }

  async getCalendarEventById(calendarEventId: string) {
    return await this.ORM.models.CalendarEventModel.findById(calendarEventId).populate('course')
  }

  async updateCalendarEvent(calendarEvent: UpdateCalendarEventDto) {
    const { _id, ...payload } = calendarEvent

    return await this.ORM.models.CalendarEventModel
      .findByIdAndUpdate(_id, payload, {
        new: true,
      })
  }

  async deleteCalendarEvent(calendarEventId: string) {
    await this.ORM.models.CalendarEventModel.findByIdAndDelete(calendarEventId)
  }
}