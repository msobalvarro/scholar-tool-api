import { TeacherSchema } from '@/infrastructure/database/schemas/teacher-schema'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-repository'
import { ITeacherRepository } from '@/core/interfaces/service/teacher-service'
import { Teacher } from '@/core/interfaces/dtos'
import { ResendEmailAdapter } from '@/infrastructure/adapters/email'
import { LuminaTeacherWelcomeEmail } from '@/infrastructure/adapters/email/templates/welcome-teacher'
import { generateRandomPassword } from '@/utils/password'
import { environments } from '@/utils/constanst'

@Service()
export class TeacherService implements ITeacherRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => ResendEmailAdapter)
  private readonly emailService!: ResendEmailAdapter

  private async sendWelcomeEmail(teacher: Teacher) {
    this.emailService.sendEmail(
      {
        to: teacher.email,
        subject: 'Bienvenido a Lumina',
      },
      LuminaTeacherWelcomeEmail({
        teacherName: teacher.name,
        email: teacher.email,
        temporaryPassword: generateRandomPassword(),
        loginUrl: environments.FRONTEND_URL
      })
    )
  }

  async createTeacher(institutionId: string, payload: TeacherSchema) {
    const session = await this.orm.startSession()

    try {
      const institution = await this.institutionService.getActiveInstitution(institutionId)
      const [teacher] = await this.orm.models.TeacherModel.create([{ ...payload, institution }], { session })
      await this.sendWelcomeEmail(teacher)
      return teacher
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      await session.endSession()
    }
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

    await this.orm.models.TeacherModel.updateOne({ _id, institution }, { $set: payload })

    return teacher
  }

  async deleteTeacher(_id: string) {
    await this.orm.models.TeacherModel.findByIdAndDelete(_id)
  }

  async updatePhoto(teacherId: string, imageName: string) {
    return await this.orm.models.TeacherModel.findByIdAndUpdate(teacherId, { photo: imageName }, { new: true })
  }
}