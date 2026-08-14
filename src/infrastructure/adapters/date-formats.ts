import { IDareFormatterAdapter } from '@/core/interfaces/adapters/date-formatter-adapter'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Service } from 'typedi'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

@Service()
export class DateFormatterAdapter implements IDareFormatterAdapter {
  formatToISOString(date: Date | string): string {
    return dayjs(date).format('YYYY-MM-DD')
  }

  formatToISO8601(date: string, time?: string): Date {
    if (time) {
      return new Date(dayjs(`${date} ${time}`).format())
    }
    return new Date(dayjs(date).format())
  }

  toGteAndLteDate(date: string | Date): { gte: Date; lte: Date } {
    return {
      gte: dayjs(date).utc().startOf('day').toDate(),
      lte: dayjs(date).utc().endOf('day').toDate()
    }
  }

  getCurrentDateUTC(date?: string | Date): Date {
    return dayjs(date).utc().toDate()
  }
}