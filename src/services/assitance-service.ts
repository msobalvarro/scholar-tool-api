import { AssistanceModel } from '@/models/assistance-model'
import { CourseModel } from '@/models/course-model'
import { StudentModel } from '@/models/student-model'
import { TeacherModel } from '@/models/teacher-model'
import { AssitanceSchema } from '@/schemas/assitance-schema'

class Assitance {
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

    if (!course || !teacher) throw 'Course or teacher not found'

    const assistance = new AssistanceModel({
      teacher,
      date: new Date(date),
      observation,
      studentsPresents: [],
      studentsAbsent: [],
    })

    for (const studentId of studentsPresentsId) {
      const student = await StudentModel.findById(studentId)
      if (!student) throw 'Student not found'

      if (studentsAbsentId.find((id) => id === studentId)) {
        console.log('Student already absent')
        continue
      }

      assistance.studentsPresents.push(student)

      // TODO: Notification push to representatives
    }

    for (const studentId of studentsAbsentId) {
      const student = await StudentModel.findById(studentId)
      if (!student) throw 'Student not found'

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

export const assistanceService = new Assitance()