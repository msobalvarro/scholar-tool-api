import { ORM } from '..'
import { Inject, Service } from 'typedi'
import { ICalendarEventsRepository } from '@/core/interfaces/repositories/calendar-event-repository'
import { CreateCalendarEventDto, UpdateCalendarEventDto } from '../schemas/calendar-events-schema'
import { NotificationRepository } from './notification-repository'
import { ICreateNotificationFilterDto } from '@/core/interfaces/repositories/notification-repository'
import { CreateNotificationDto } from '../schemas/notification-schema'

@Service()
export class CalendarEventsRepository implements ICalendarEventsRepository {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  @Inject(() => NotificationRepository)
  private readonly notificationRepository!: NotificationRepository

  async createCalendarEvent(calendarEvent: CreateCalendarEventDto, institutionId: string) {
    const { courseId, ...payload } = calendarEvent
    const course = courseId ? await this.ORM.models.CourseModel.findById(courseId) : null
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    const notificationPayload: CreateNotificationDto = {
      title: calendarEvent.title,
      body: calendarEvent.description
    }

    if (!institution) throw new Error('Institution not found')

    // si solamente el curso esta indicado, enviar notficacion solamente a ese curso si no a toda la institucion
    if (course) {
      this.notificationRepository.createNotification(notificationPayload, { courseId: course._id.toString() })
    } else {
      this.notificationRepository.createNotification(notificationPayload, { institutionId })
    }

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