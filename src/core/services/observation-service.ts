import { ObservationSchema } from '@/infrastructure/database/schemas/observation-schema'
import { IObservationRepository } from '@/core/interfaces/service/observation-service'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'

@Service()
export class ObservationService implements IObservationRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM

  async createObservation(payload: ObservationSchema, teacherId: string) {
    const { studentId, type, observation } = payload

    const student = await this.orm.models.StudentModel.findById(studentId)
    if (!student) throw 'Estudiante no encontrado'

    const teacher = await this.orm.models.TeacherModel.findById(teacherId)
    if (!teacher) throw 'Profesor no encontrado'

    const observationCreated = await this.orm.models.ObservationModel.create({
      student,
      teacher,
      type,
      observation,
    })

    // TODO: Send notification to responsable

    return observationCreated
  }

  async getObservationsByStudent(studentId: string) {
    const observations = await this.orm.models.ObservationModel
      .find({ student: { _id: studentId } })
      .populate('teacher')

    return observations
  }
}