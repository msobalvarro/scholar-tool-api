import { CourseModel } from '@/models/course-model'
import { InstitutionModel } from '@/models/institution-model'
import { MatriculeModel } from '@/models/matricule-model'
import { ResponsableModel } from '@/models/responsable-model'
import { StudentModel } from '@/models/student-model'
import { AssignToCourse, Student, StudentUpdate } from '@/schemas/student-schema'

class StudentService {
  async createStudent(student: Student, institutionId: string) {

    const { responsableId, ...rest } = student

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    const responsable = await ResponsableModel.findById(responsableId)
    if (!responsable) throw 'Responsable no encontrado'

    return await StudentModel.create({
      ...rest,
      responsable,
      institution
    })
  }

  async updateStudent(student: StudentUpdate, institutionId: string, studentId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    return await StudentModel.updateOne({ _id: studentId, institution: { _id: institutionId } }, student)
  }

  async deleteStudent(_id: string, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    return await StudentModel.deleteOne({ _id, institution: { _id: institutionId } })
  }

  async getAllStudents(institutionId: string) {
    return await StudentModel
      .find({ institution: { _id: institutionId } })
      .populate('responsable')
  }

  async getAllStudentsByCourse(courseId: string, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    const course = await CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const matricules = await MatriculeModel
      .find({ course, institution })

    const studentsIds = matricules.map(matricule => matricule.student.toString())

    return await StudentModel
      .find({ _id: { $in: studentsIds } })
      .populate('responsable')
  }

  async assignStudentToCourse({ courseId, studentId }: AssignToCourse, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    const course = await CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const student = await StudentModel.findById(studentId)
    if (!student) throw 'Estudiante no encontrado'

    const matricule = await MatriculeModel.findOne({ student, institution })
    if (!matricule) throw 'El estudiante no está asignado a esta institución'

    return await MatriculeModel.updateOne({ _id: matricule._id }, { course })
  }

  async getStudentById(_id: string, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    return await StudentModel
      .findOne({ _id })
      .populate('responsable')
  }
}

export const studentService = new StudentService()