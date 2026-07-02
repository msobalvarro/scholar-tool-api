export interface IDareFormatterAdapter {
  /**
   * Formatea una fecha a formato ISO
   * @param date Fecha a formatear
   * @returns Fecha en formato 'YYYY-MM-DD'
   */
  formatToISOString(date: Date): string

  /**
   * Formatea una fecha a formato 'dd/mm/YYYY HH:mm'
   * @param date Fecha a formatear
   * @returns Fecha en formato Date
   */
  formatToDDMMYYYY(date: Date): Date
}