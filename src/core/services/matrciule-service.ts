import { ORM } from '@/infrastructure/database'
import { MatriculeSchema, MatriculeUpdateSchema } from '@/infrastructure/schemas/matricule-schema'
import { IMatriculeRepository } from '@/core/interfaces/service/matrciule-service'
import { Inject, Service } from 'typedi'
import { Matricule } from '@/core/interfaces/dtos'
import { InstitutionService } from './institution-service'

@Service()
export class MatriculeRepository implements IMatriculeRepository {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  async createMatricule(matricule: MatriculeSchema, institutionId: string) {
    const institution = await this.institutionService.getActiveInstitution(institutionId)

    const student = await this.ORM.models.StudentModel.findById(matricule.studentId)
    if (!student) throw 'Estudiante no encontrado'

    const matriculeExists = await this.ORM.models.MatriculeModel.findOne({
      year: matricule.year,
      studentId: matricule.studentId,
      institutionId
    })

    if (matriculeExists) throw 'La matrícula ya existe'

    const course = await this.ORM.models.CourseModel.findById(matricule.courseId)
    if (!course) throw 'Curso no encontrado'

    const createdMatricule = await this.ORM.models.MatriculeModel.create({
      year: matricule.year,
      institution,
      student,
      course
    })
    return createdMatricule
  }

  async updateMatricule(matricule: MatriculeUpdateSchema) {
    const { _id, ...rest } = matricule
    await this.ORM.models.MatriculeModel.updateOne({ _id }, rest)
  }

  async deleteMatricule(_id: string) {
    await this.ORM.models.MatriculeModel.deleteOne({ _id })
  }

  async getAllMatricules(institutionId: string) {
    const matricules = await this.ORM.models.MatriculeModel
      .find({ institution: { _id: institutionId } })
      .populate('student')
      .populate('course')
      .select('-institution')

    return matricules
  }

  async getMatriculeById(_id: string) {
    const matricule = await this.ORM.models.MatriculeModel.findById(_id)
    return matricule
  }

  async getActiveMatricule(studentId: string): Promise<Matricule> {
    const matricule = await this.ORM.models.MatriculeModel.findOne({
      student: { _id: studentId },
      year: new Date().getFullYear()
    })

    if (!matricule) throw new Error('Matrícula no encontrada')
    if (matricule.status !== 'active') throw new Error('La matrícula no está activa')
    return matricule
  }

  async getMatriculesByCourse(institutionId: string, courseId: string): Promise<Matricule[]> {
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const course = await this.ORM.models.CourseModel.findById(courseId)
    if (!course) throw new Error('Curso no encontrado')
    const matricules = await this.ORM.models.MatriculeModel.find({ course, institution }).populate('student')
    return matricules
  }
}