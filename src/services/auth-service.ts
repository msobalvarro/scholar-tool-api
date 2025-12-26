import { InstitutionModel } from '@/models/institution-model'
import { UserRootModel } from '@/models/root-user-model'
import { TeacherAuthModel } from '@/models/teacher-auth-model'
import { TeacherModel } from '@/models/teacher-model'
import { UserInstitutionModel } from '@/models/user-institution-model'
import { environments } from '@/utils/constanst'
import { createHash } from '@/utils/encrypt'
import { sign } from 'hono/jwt'
import { UserRoles } from '@/utils/constanst'

class AuthService {
  async loginUserRoot(email: string, password: string) {
    const user = await UserRootModel
      .findOneAndUpdate({ email, password: createHash(password) }, { lastLogin: new Date() }, { new: true })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })

    if (!user) throw 'User not found'

    const token = await sign({ ...user.toJSON(), role: UserRoles.ADMIN }, environments.JWT_SECRET_ADMIN)
    return { user, token }
  }

  async loginUserInstitution(email: string, password: string) {
    const user = await UserInstitutionModel
      .findOneAndUpdate({ email, password: createHash(password) }, { lastLogin: new Date() }, { new: true })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })

    if (!user) throw 'User not found'

    const institution = await InstitutionModel.findOne(user.institution)
    if (!institution) throw 'Institution not found'

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
    const teacher = await TeacherModel
      .findOne({ email })
      .select({
        createdAt: 0,
        updatedAt: 0,
      })

    if (!teacher) throw 'Teacher not found'

    const institution = await InstitutionModel.findOne(teacher.institution)
    if (!institution) throw 'Institution not found'


    const user = await TeacherAuthModel
      .findOneAndUpdate({ teacher, password: createHash(password) }, { lastLogin: new Date() }, { new: true })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })

    if (!user) throw 'User Teacher not found'

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

export const authService = new AuthService()