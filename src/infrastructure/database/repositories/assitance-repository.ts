import { AssitanceSchema } from '@/infrastructure/database/schemas/assitance-schema'
import { IAssistanceRepository } from '@/core/interfaces/repositories/assitance-repository'
import { Inject, Service } from 'typedi'
import { ORM } from '..'

@Service()
export class AssitanceRepository implements IAssistanceRepository {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  async createAssistance(assitance: AssitanceSchema) {
    const {
      courseId,
      teacherId,
      date,
      observation,
      studentsPresentsId,
      studentsAbsentId
    } = assitance

    const course = await this.ORM.models.CourseModel.findById(courseId)
    const teacher = await this.ORM.models.TeacherModel.findById(teacherId)

    if (!course || !teacher) throw 'Curso o profesor no encontrado'

    const assistance = new this.ORM.models.AssistanceModel({
      teacher,
      date: new Date(date),
      observation,
      studentsPresents: [],
      studentsAbsent: [],
    })

    for (const studentId of studentsPresentsId) {
      const student = await this.ORM.models.StudentModel.findById(studentId)
      if (!student) throw 'Estudiante no encontrado'

      if (studentsAbsentId.find((id) => id === studentId)) {
        console.log('Student already absent')
        continue
      }

      assistance.studentsPresents.push(student)

      // TODO: Notification push to representatives
    }

    for (const studentId of studentsAbsentId) {
      const student = await this.ORM.models.StudentModel.findById(studentId)
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