import { ORM } from '..'
import { Inject, Service } from 'typedi'
import { ICalendarEventsRepository } from '@/core/interfaces/repositories/calendar-event-repository'
import { CreateCalendarEventDto, UpdateCalendarEventDto } from '../schemas/calendar-events-schema'
import { NotificationRepository } from './notification-repository'
import { CreateNotificationDto } from '../schemas/notification-schema'
import { DateFormatterAdapter } from '@/infrastructure/adapters/date-formats'

@Service()
export class CalendarEventsRepository implements ICalendarEventsRepository {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  @Inject(() => NotificationRepository)
  private readonly notificationRepository!: NotificationRepository

  @Inject(() => DateFormatterAdapter)
  private readonly dateFormatterAdapter!: DateFormatterAdapter

  async createCalendarEvent(calendarEvent: CreateCalendarEventDto, institutionId: string) {
    const { courseId, time, date, ...payload } = calendarEvent
    const course = courseId ? await this.ORM.models.CourseModel.findById(courseId) : null
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    const dateAndTime = this.dateFormatterAdapter.formatToISO8601(date, time)
    const notificationPayload: CreateNotificationDto = {
      title: calendarEvent.title,
      body: calendarEvent.description
    }

    if (!institution) throw new Error('Institution not found')

    const calendarEventCreated = await this.ORM.models.CalendarEventModel.create({
      ...payload,
      date: dateAndTime,
      course,
      institution
    })

    // si solamente el curso esta indicado, enviar notficacion solamente a ese curso si no a toda la institucion
    if (course) {
      await this.notificationRepository.createNotification(notificationPayload, { courseId: course._id.toString() })
    } else {
      await this.notificationRepository.createNotification(notificationPayload, { institutionId })
    }

    return calendarEventCreated
  }

  async getCalendarEvents(institutionId: string, startDate: string, endDate: string) {
    return await this.ORM.models.CalendarEventModel
      .find({
        institution: {
          _id: institutionId,
        },
        date: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .populate('course')
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