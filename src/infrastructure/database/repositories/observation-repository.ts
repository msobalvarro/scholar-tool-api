import { ObservationModel } from '@/infrastructure/database/models/observation-model'
import { StudentModel } from '@/infrastructure/database/models/student-model'
import { TeacherModel } from '@/infrastructure/database/models/teacher-model'
import { ObservationSchema } from '@/infrastructure/database/schemas/observation-schema'
import { Service } from 'typedi'

@Service()
export class ObservationService {
  async createObservation(payload: ObservationSchema, teacherId: string) {
    const { studentId, type, observation } = payload

    const student = await StudentModel.findById(studentId)
    if (!student) throw 'Estudiante no encontrado'

    const teacher = await TeacherModel.findById(teacherId)
    if (!teacher) throw 'Profesor no encontrado'

    const observationCreated = await ObservationModel.create({
      student,
      teacher,
      type,
      observation,
    })

    // TODO: Send notification to responsable

    return observationCreated
  }

  async getObservationsByStudent(studentId: string) {
    const observations = await ObservationModel
      .find({ student: { _id: studentId } })
      .populate('teacher')

    return observations
  }
}