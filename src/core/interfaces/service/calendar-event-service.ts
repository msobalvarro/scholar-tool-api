import { CreateCalendarEventDto, UpdateCalendarEventDto } from '@/infrastructure/database/schemas/calendar-events-schema'
import { CalendarEvents } from '../dtos/calendar-events'

export interface ICalendarEventsRepository {
  /**
   * Create a calendar event
   * @param calendarEvent Data of the calendar event
   * @param institutionId ID of the institution
   */
  createCalendarEvent(calendarEvent: CreateCalendarEventDto, institutionId: string): Promise<CalendarEvents>
  /**
   * Get all calendar events for an institution
   * @param institutionId ID of the institution
   * @param startDate Start date of the period (YYYY-MM-DD)
   * @param endDate End date of the period (YYYY-MM-DD)
   */
  getCalendarEvents(institutionId: string, startDate: string, endDate: string): Promise<CalendarEvents[]>
  /**
   * Get a calendar event by ID
   * @param calendarEventId ID of the calendar event
   */
  getCalendarEventById(calendarEventId: string): Promise<CalendarEvents | null>
  /**
   * Update a calendar event
   * @param calendarEvent Data of the calendar event
   */
  updateCalendarEvent(calendarEvent: UpdateCalendarEventDto): Promise<CalendarEvents | null>
  /**
   * Delete a calendar event
   * @param calendarEventId ID of the calendar event
   */
  deleteCalendarEvent(calendarEventId: string): Promise<void>
}