import { TeacherSchema } from '@/infrastructure/database/schemas/teacher-schema'
import { Inject, Service } from 'typedi'
import { ORM } from '..'
import { InstitutionService } from './institution-repository'

@Service()
export class TeacherService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  async createTeacher(institutionId: string, payload: TeacherSchema) {
    const institution = await this.institutionService.getActiveInstitution(institutionId)

    const teacher = await this.orm.models.TeacherModel.create({ ...payload, institution })
    return teacher
  }

  async getTeachers(institutionId: string) {
    const teachers = await this.orm.models.TeacherModel.find({ institution: { _id: institutionId } })
    return teachers
  }

  async getAllTeachers() {
    const teachers = await this.orm.models.TeacherModel.find()
    return teachers
  }

  async getTeacherById(id: string) {
    const teacher = await this.orm.models.TeacherModel.findById(id)
    return teacher
  }

  async updateTeacher(institutionId: string, payload: TeacherSchema, _id: string) {
    const teacher = await this.orm.models.TeacherModel.findById(_id)
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    if (!teacher) throw 'Profesor no encontrado'

    // if (institution._id.toString() !== teacher.institution) throw 'Institución no válida'

    await this.orm.models.TeacherModel.updateOne({ _id }, { $set: payload })

    return teacher
  }

  async deleteTeacher(_id: string) {
    const teacher = await this.orm.models.TeacherModel.findByIdAndDelete(_id)
    return teacher
  }

  async updatePhoto(teacherId: string, imageName: string) {
    return await this.orm.models.TeacherModel.findByIdAndUpdate(teacherId, { photo: imageName }, { new: true })
  }
}