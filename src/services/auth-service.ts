import { InstitutionModel } from '@/models/institution-model'
import { UserRootModel } from '@/models/root-user-model'
import { UserInstitutionModel } from '@/models/user-institution-model'
import { environments } from '@/utils/constanst'
import { createHash } from '@/utils/encrypt'
import { sign } from 'hono/jwt'

class AuthService {
  async loginUserRoot(email: string, password: string) {
    const user = await UserRootModel
      .findOne({ email, password: createHash(password) })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })

    if (!user) throw 'User not found'

    const token = await sign({ ...user.toJSON(), role: 'root' }, environments.JWT_SECRET_ADMIN)
    return { user, token }
  }

  async loginUserInstitution(email: string, password: string) {
    const user = await UserInstitutionModel
      .findOne({ email, password: createHash(password) })
      .select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      })

    if (!user) throw 'User not found'

    const institution = await InstitutionModel.findOne({ users: user })
    if (!institution) throw 'Institution not found'


    const token = await sign(
      {
        ...user.toJSON(),
        institutionId: institution._id,
        role: 'institution'
      },
      environments.JWT_SECRET_USER_INSTITUTION
    )

    return { user, token }
  }
}

export const authService = new AuthService()