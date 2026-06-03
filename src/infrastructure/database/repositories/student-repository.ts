import { Student } from '@/core/interfaces/dtos/models'
import { StudentSchema, StudentUpdateSchema, AssignToCourseSchema } from '@/infrastructure/database/schemas/student-schema'
import { Service } from 'typedi'
import { IStudentRepository } from '@/core/interfaces/repositories/student-repository'
import { Inject } from 'typedi'
import { ORM } from '..'

@Service()
export class StudentService implements IStudentRepository {
  @Inject(() => ORM)
  private ORM!: ORM

  async createStudent(student: StudentSchema, institutionId: string): Promise<Student> {
    const { responsableId, courseId, ...rest } = student
    const session = await this.ORM.startSession()

    try {
      const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
      if (!institution) throw 'Institución no encontrada'
      if (institution.status !== 'active') throw 'La institución no está activa'

      const responsable = await this.ORM.models.ResponsableModel.findById(responsableId)
      if (!responsable) throw 'Responsable no encontrado'

      const course = await this.ORM.models.CourseModel.findById(courseId)
      if (!course) throw 'Curso no encontrado'

      const student = await this.ORM.models.StudentModel.create(
        {
          ...rest,
          responsable,
          institution
        }
      )

      await this.ORM.models.MatriculeModel.create(
        {
          student,
          institution,
          course
        }
      )

      return student

    } catch (error) {
      await await session.abortTransaction()
      throw error
    } finally {
      await session.endSession()
    }
  }

  async updateStudent(student: StudentUpdateSchema, institutionId: string, studentId: string) {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    return await this.ORM.models.StudentModel.updateOne({ _id: studentId, institution: { _id: institutionId } }, student)
  }

  async deleteStudent(_id: string, institutionId: string) {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    await this.ORM.models.StudentModel.deleteOne({ _id, institution: { _id: institutionId } })
  }

  async getAllStudents(institutionId: string) {
    return await this.ORM.models.StudentModel
      .find({ institution: { _id: institutionId } })
      .populate('responsable')
  }

  async getAllStudentsByCourse(courseId: string, institutionId: string) {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    const course = await this.ORM.models.CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const matricules = await this.ORM.models.MatriculeModel
      .find({ course, institution })

    const studentsIds = matricules.map(matricule => matricule.student.toString())

    return await this.ORM.models.StudentModel
      .find({ _id: { $in: studentsIds } })
      .populate('responsable')
  }

  async assignStudentToCourse({ courseId, studentId }: AssignToCourseSchema, institutionId: string): Promise<void> {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    const course = await this.ORM.models.CourseModel.findById(courseId)
    if (!course) throw 'Curso no encontrado'

    const student = await this.ORM.models.StudentModel.findById(studentId)
    if (!student) throw 'Estudiante no encontrado'

    const matricule = await this.ORM.models.MatriculeModel.findOne({ student, institution })
    if (!matricule) throw 'El estudiante no está asignado a esta institución'

    await this.ORM.models.MatriculeModel.updateOne({ _id: matricule._id }, { course })
  }

  async getStudentById(_id: string, institutionId: string) {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    return await this.ORM.models.StudentModel
      .findOne({ _id })
      .populate('responsable')
  }
}