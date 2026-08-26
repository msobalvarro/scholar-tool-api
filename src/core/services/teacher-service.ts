import { TeacherSchema } from '@/infrastructure/database/schemas/teacher-schema'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'
import { ITeacherRepository } from '@/core/interfaces/service/teacher-service'
import { Institution, Teacher } from '@/core/interfaces/dtos'
import { ResendEmailAdapter } from '@/infrastructure/adapters/email'
import { LuminaTeacherWelcomeEmail } from '@/infrastructure/adapters/email/templates/welcome-teacher'
import { generateRandomPassword } from '@/utils/password'
import { environments } from '@/utils/constanst'
import { createHash } from '@/utils/encrypt'

@Service()
export class TeacherService implements ITeacherRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => ResendEmailAdapter)
  private readonly emailService!: ResendEmailAdapter

  /**
   * Envía un correo de bienvenida al profesor
   * @param teacher profesor
   * @param temporaryPassword contraseña temporal
   */
  private async sendWelcomeEmail(teacher: Teacher, temporaryPassword: string) {
    await this.emailService.sendEmail(
      {
        to: teacher.email,
        subject: 'Bienvenido a Lumina',
      },
      LuminaTeacherWelcomeEmail({
        teacherName: teacher.name,
        email: teacher.email,
        temporaryPassword,
        loginUrl: environments.FRONTEND_URL
      })
    )
  }

  /**
   * Verifica si el correo ya existe en la institución
   * @param email correo del profesor
   * @param institution institución
   */
  private async verifyExistingEmail(email: string, institution: Institution) {
    const existingTeacher = await this.orm.models.TeacherModel.findOne({ email, institution })
    if (existingTeacher) throw new Error('El correo ya existe en la institución', {
      cause: { code: 'TEACHER_EMAIL_EXISTS' }
    })
  }

  /**
   * Crea un nuevo profesor
   * @param institutionId ID de la institución
   * @param payload datos del profesor
   */
  async createTeacher(institutionId: string, payload: TeacherSchema) {
    const session = await this.orm.startSession()
    session.startTransaction()

    try {
      const institution = await this.institutionService.getActiveInstitution(institutionId)
      await this.verifyExistingEmail(payload.email, institution)

      const [teacher] = await this.orm.models.TeacherModel.create([{ ...payload, institution }], { session })
      const temporaryPassword = generateRandomPassword()

      await this.orm.models.TeacherAuthModel.create([{ teacher, password: createHash(temporaryPassword) }], { session })
      await this.sendWelcomeEmail(teacher, temporaryPassword)
      await session.commitTransaction()

      return teacher
    } catch (error) {
      console.log('Error in createTeacher:', error)
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

  async getTeacherByEmail(email: string) {
    const teacher = await this.orm.models.TeacherModel.findOne({ email })
    if (!teacher) throw new Error('Profesor no encontrado')
    if (teacher.status !== 'active') throw new Error('Profesor inactivo')
    return teacher
  }
}