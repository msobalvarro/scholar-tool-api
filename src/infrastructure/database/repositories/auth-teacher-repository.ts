import { TeacherAuthModel } from '@/infrastructure/database/models/teacher-auth-model'
import { createHash } from '@/utils/encrypt'
import { Inject, Service } from 'typedi'
import { ORM } from '..'

@Service()
export class AuthTeacherService {

  @Inject(() => ORM)
  private readonly orm!: ORM

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
    const institution = await this.orm.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

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