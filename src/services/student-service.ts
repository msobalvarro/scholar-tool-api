import { Student } from '@/core/interfaces/dtos/models'
import { ORM } from '@/infrastructure/database'
import { CourseModel, InstitutionModel, MatriculeModel, ResponsableModel, StudentModel } from '@/infrastructure/database/models'
import { StudentSchema, StudentUpdateSchema, AssignToCourseSchema } from '@/infrastructure/database/schemas/student-schema'
import mongoose from 'mongoose'
import { Inject, Service } from 'typedi'

@Service()
export class StudentService {

  async createStudent(student: StudentSchema, institutionId: string): Promise<Student> {
    const { responsableId, courseId, ...rest } = student
    const session = await mongoose.startSession()

    try {
      const institution = await InstitutionModel.findById(institutionId)
      if (!institution) throw 'Institución no encontrada'
      if (institution.status !== 'active') throw 'La institución no está activa'

      const responsable = await ResponsableModel.findById(responsableId)
      if (!responsable) throw 'Responsable no encontrado'

      const course = await CourseModel.findById(courseId)
      if (!course) throw 'Curso no encontrado'

      const student = await StudentModel.create(
        {
          ...rest,
          responsable,
          institution
        }
      )

      const matricule = await MatriculeModel.create(
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

  async assignStudentToCourse({ courseId, studentId }: AssignToCourseSchema, institutionId: string) {
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