import { Institution } from './institution';
import { IDailyReporttDto } from './daily-reports';
import { UserInstitution } from './user-institution';

export interface IDailyClosureDto {
  institution: Institution
  user_institution: UserInstitution
  reports: IDailyReporttDto[]
  date: Date
  total_income_recorded_amount: number
  total_income_recorded_amount_usd: number
  total_expense_amount: number
  total_expense_amount_usd: number
  difference: number
  difference_usd: number
  reciept_number: string
} 