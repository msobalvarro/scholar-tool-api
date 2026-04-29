import { AssistanceModel } from '@/infrastructure/database/models/assistance-model'
import { CourseModel } from '@/infrastructure/database/models/course-model'
import { StudentModel } from '@/infrastructure/database/models/student-model'
import { TeacherModel } from '@/infrastructure/database/models/teacher-model'
import { AssitanceSchema } from '@/infrastructure/database/schemas/assitance-schema'
import { Service } from 'typedi'

@Service()
export class AssitanceRepository {
  async createAssistance(assitance: AssitanceSchema) {
    const {
      courseId,
      teacherId,
      date,
      observation,
      studentsPresentsId,
      studentsAbsentId
    } = assitance

    const course = await CourseModel.findById(courseId)
    const teacher = await TeacherModel.findById(teacherId)

    if (!course || !teacher) throw 'Curso o profesor no encontrado'

    const assistance = new AssistanceModel({
      teacher,
      date: new Date(date),
      observation,
      studentsPresents: [],
      studentsAbsent: [],
    })

    for (const studentId of studentsPresentsId) {
      const student = await StudentModel.findById(studentId)
      if (!student) throw 'Estudiante no encontrado'

      if (studentsAbsentId.find((id) => id === studentId)) {
        console.log('Student already absent')
        continue
      }

      assistance.studentsPresents.push(student)

      // TODO: Notification push to representatives
    }

    for (const studentId of studentsAbsentId) {
      const student = await StudentModel.findById(studentId)
      if (!student) throw 'Estudiante no encontrado'

      assistance.studentsAbsent.push(student)

      if (studentsPresentsId.find((id) => id === studentId)) {
        console.log('Student already present')
        continue
      }

      // TODO: Notification push to representatives
    }

    await assistance.save()

    return assistance
  }
}