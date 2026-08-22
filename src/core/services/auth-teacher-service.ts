import { createHash } from '@/utils/encrypt'
import { Inject, Service } from 'typedi'
import { IAuthTeacherRepository } from '@/core/interfaces/service/auth-teacher-service'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'

@Service()
export class AuthTeacherService implements IAuthTeacherRepository {

  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  async createTeacherAuth(teacherId: string, password: string) {
    const teacher = await this.orm.models.TeacherModel.findById(teacherId)
    if (!teacher) throw 'Profesor no encontrado'

    const user = await this.orm.models.TeacherAuthModel.create({
      teacher,
      password: createHash(password)
    })

    return user
  }

  async getAllTeacherAuth(institutionId: string) {
    const institution = await this.institutionService.getActiveInstitution(institutionId)

    const teacherByInstitution = await this.orm.models.TeacherModel
      .find({ institution })
      .select('_id')

    const teachers = await this.orm.models.TeacherAuthModel
      .find({
        teacher: { $in: teacherByInstitution }
      })
      .select('-password')
      .populate('teacher')

    return teachers
  }

  async updatePassword(teacherId: string, password: string) {
    const teacher = await this.orm.models.TeacherAuthModel.findById(teacherId)
    if (!teacher) throw 'Profesor no encontrado'

    teacher.password = createHash(password)
    await teacher.save()

    return teacher
  }
}