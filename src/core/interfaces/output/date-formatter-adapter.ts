export interface IDareFormatterAdapter {
  /**
   * Formatea una fecha a formato ISO
   * @param date Fecha a formatear
   * @returns Fecha en formato 'YYYY-MM-DD'
   */
  formatToISOString(date: Date): string

  /**
   * Formatea una fecha a formato 'dd/mm/YYYY HH:mm'
   * @param string Fecha a formatear 'dd/mm/YYYY'
   * @param string Hora a formatear 'HH:mm'
   * @returns Fecha en formato Date
   */
  formatToISO8601(date: string, time: string): Date
}