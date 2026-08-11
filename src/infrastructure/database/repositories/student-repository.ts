import { Course, Institution, Student } from '@/core/interfaces/dtos'
import { StudentSchema, StudentUpdateSchema, AssignToCourseSchema } from '@/infrastructure/database/schemas/student-schema'
import { Service } from 'typedi'
import { IStudentRepository } from '@/core/interfaces/repositories/student-repository'
import { Inject } from 'typedi'
import { ORM } from '..'
import { ClientSession } from 'mongoose'

@Service()
export class StudentRepository implements IStudentRepository {
  @Inject(() => ORM)
  private ORM!: ORM

  private async createEnrollment({ course, institution, student, session }: { course: Course, institution: Institution, student: Student, session: ClientSession }): Promise<void> {
    const enrollment = await this.ORM.models.EnrollmentModel.findOne({
      courses: {
        _id: course._id,
        institution: institution._id
      }
    }, { session })

    if (!enrollment) throw 'La matrícula no se encuentra'

    await this.ORM.models.MatriculeModel.create(
      [{
        student,
        institution,
        course,
        enrollment
      }],
      { session }
    )
  }

  async createStudent(student: StudentSchema, institutionId: string): Promise<Student> {
    console.log(student)
    const { responsableId, courseId, ...rest } = student
    const session = await this.ORM.startSession()
    session.startTransaction()

    try {
      const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
      if (!institution) throw 'Institución no encontrada'
      if (institution.status !== 'active') throw 'La institución no está activa'

      const responsable = await this.ORM.models.ResponsableModel.findById(responsableId)
      if (!responsable) throw 'Responsable no encontrado'

      const course = await this.ORM.models.CourseModel.findById(courseId)
      if (!course) throw 'Curso no encontrado'

      const [student] = await this.ORM.models.StudentModel.create(
        [{ ...rest, responsable, institution }],
        { session }
      )

      await this.createEnrollment({ course, institution, student, session })
      await session.commitTransaction()
      return student
    } catch (error) {
      await session.abortTransaction()
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

  async getActiveStudent(studentId: string, institutionId: string): Promise<Student> {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw new Error('Institución no encontrada')

    const student = await this.ORM.models.StudentModel.findById(studentId)
    if (!student) throw new Error('Estudiante no encontrado')

    const matricule = await this.ORM.models.MatriculeModel.findOne({ student, institution })
    if (!matricule) throw new Error('El estudiante no está asignado a esta institución')
    if (matricule.status !== 'active') throw new Error('El estudiante no está activo')

    return student
  }
}