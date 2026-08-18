export class StudentAssistenceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'StudentAssistenceError'
  }
}

export class StudentAlreadyAssistedError extends Error {
  constructor() {
    super()
    this.name = ''
    this.message = 'El estudiante ya fue asistido'
  }
}