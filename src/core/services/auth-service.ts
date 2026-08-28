import { UserRoles } from '@/core/interfaces/dtos/user'
import { environments } from '@/utils/constanst'
import { createHash } from '@/utils/encrypt'
import { sign } from 'hono/jwt'
import { IAuthRepository } from '@/core/interfaces/service/auth-service'
import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'
import { TeacherService } from './teacher-service'

@Service()
export class AuthRepository implements IAuthRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private institutionService!: InstitutionService

  @Inject(() => TeacherService)
  private teacherService!: TeacherService

  async loginUserRoot(email: string, password: string) {
    const user = await this.orm.models.UserRootModel
      .findOneAndUpdate({ email, password: createHash(password) }, { lastLogin: new Date() }, { new: true })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })

    if (!user) throw 'Usuario no encontrado'

    const token = await sign({ ...user.toJSON(), role: UserRoles.ADMIN }, environments.JWT_SECRET_ADMIN)
    return { user, token }
  }

  async loginUserInstitution(email: string, password: string) {
    const user = await this.orm.models.UserInstitutionModel
      .findOneAndUpdate({ email, password: createHash(password) }, { lastLogin: new Date() }, { new: true })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })

    console.log(user)

    if (!user) throw new Error('Usuario no encontrado')

    const institution = await this.institutionService.getActiveInstitution(user.institution._id!)

    const token = await sign(
      {
        ...user.toJSON(),
        institutionId: institution._id,
        role: UserRoles.INSTITUTION
      },
      environments.JWT_SECRET_USER_INSTITUTION
    )

    return { user, token, institution }
  }

  async loginTeacher(email: string, password: string) {
    const teacher = await this.teacherService.getTeacherByEmail(email)
    const institution = await this.institutionService.getActiveInstitution(teacher.institution._id!)

    const user = await this.orm.models.TeacherAuthModel
      .findOneAndUpdate({ teacher, password: createHash(password) }, { lastLogin: new Date() }, { new: true })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })

    if (!user) throw 'Profesor del usuario no encontrado'

    const token = await sign(
      {
        institutionId: institution._id,
        ...teacher.toJSON(),
        role: UserRoles.TEACHER
      },
      environments.JWT_SECRET_USER_TEACHER
    )

    return { teacher, token, institution }
  }
}