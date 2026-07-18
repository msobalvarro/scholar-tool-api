import { IDareFormatterAdapter } from '@/core/interfaces/output/date-formatter-adapter'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import { Service } from 'typedi'

dayjs.extend(customParseFormat)

@Service()
export class DateFormatterAdapter implements IDareFormatterAdapter {
  formatToISOString(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD')
  }

  formatToISO8601(date: string, time?: string): Date {
    if (time) {
      return new Date(dayjs(`${date} ${time}`).format())
    }
    return new Date(dayjs(date).format())
  }
}