import { Institution } from './institution';

export enum TypeMovementType {
  INCOME = 'Ingreso',
  EXPENSE = 'Egreso',
  CANCELLED = 'Cancelado',
}

export enum ConceptType {
  KIOSK_RENTAL = 'Alquiler de quiosco',
  CANCELLED = 'Cancelado',
  TUTION_FEES = 'Colegiatura',
  DEPOSITED = 'Depositado',
  ADMINISTRATIVE_EXPENSES = 'Gastos administrativos',
  OFFICE_EXPENSES = 'Gastos de oficina',
  ENROLLMENT_FEE = 'Matrícula',
  BUILDING_MAINTENANCE = 'Mantenimiento de edificio',
  OTHER_EXPENSES = 'Otros gastos',
  OTHER_INCOME = 'Otros ingresos',
  EXAM_RESCHEDULING = 'Recuperación de exámenes',
  DOCUMENT_REQUESTS = 'Solicitud de documentos',
  TEXTBOOK_SALES = 'Venta de libros',
  UNIFORM_SALES = 'Venta de uniformes',
  OTHER = 'Otro'
}

export interface IDailyReportStudentDto {
  institution: Institution
  date: Date
  type_movement: TypeMovementType
  concept: ConceptType
  description: string
  receipt_number: string
  income_recorded_amount?: number
  deposited_amount?: number
  expense_amount?: number
  isUSD: boolean
}