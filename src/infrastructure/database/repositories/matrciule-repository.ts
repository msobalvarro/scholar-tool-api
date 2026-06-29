import { MatriculeModel } from '@/infrastructure/database/models/matricule-model'
import { Matricule, MatriculeUpdate } from '@/infrastructure/database/schemas/matricule-schema'
import { InstitutionModel } from '@/infrastructure/database/models/institution-model'
import { StudentModel } from '@/infrastructure/database/models/student-model'
import { CourseModel } from '@/infrastructure/database/models/course-model'
import { IMatriculeRepository } from '@/core/interfaces/repositories/matrciule-repository'
import { Service } from 'typedi'

@Service()
export class MatriculeService implements IMatriculeRepository {
  async createMatricule(matricule: Matricule, institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'
    if (institution.status !== 'active') throw 'La institución no está activa'

    const student = await StudentModel.findById(matricule.studentId)
    if (!student) throw 'Estudiante no encontrado'

    const matriculeExists = await MatriculeModel.findOne({
      year: matricule.year,
      studentId: matricule.studentId,
      institutionId
    })

    if (matriculeExists) throw 'La matrícula ya existe'

    const course = await CourseModel.findById(matricule.courseId)
    if (!course) throw 'Curso no encontrado'

    const createdMatricule = await MatriculeModel.create({
      year: matricule.year,
      institution,
      student,
      course
    })
    return createdMatricule
  }

  async updateMatricule(matricule: MatriculeUpdate) {
    const { _id, ...rest } = matricule

    const updatedMatricule = await MatriculeModel.updateOne({ _id }, rest)
    return updatedMatricule
  }

  async deleteMatricule(_id: string) {
    const deletedMatricule = await MatriculeModel.deleteOne({ _id })
    return deletedMatricule
  }

  async getAllMatricules(institutionId: string) {
    const matricules = await MatriculeModel
      .find({ institution: { _id: institutionId } })
      .populate('student')
      .populate('course')
      .select('-institution')

    return matricules
  }

  async getMatriculeById(_id: string) {
    const matricule = await MatriculeModel.findById(_id)
    return matricule
  }
}