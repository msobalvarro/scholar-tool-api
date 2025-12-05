import { ObservationModel } from '@/models/observation-model'
import { StudentModel } from '@/models/student-model'
import { TeacherModel } from '@/models/teacher-model'
import { ObservationSchema } from '@/schemas/observation-schema'

class Observation {
  async createObservation(payload: ObservationSchema, teacherId: string) {
    const { studentId, type, observation } = payload

    const student = await StudentModel.findById(studentId)
    if (!student) throw 'Student not found'

    const teacher = await TeacherModel.findById(teacherId)
    if (!teacher) throw 'Teacher not found'

    const observationCreated = await ObservationModel.create({
      student,
      teacher,
      type,
      observation,
    })

    // TODO: Send notification to responsable

    return observationCreated
  }
}

export const observationService = new Observation()