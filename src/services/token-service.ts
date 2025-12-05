import { ResponsableModel } from '@/models/responsable-model'
import { StudentModel } from '@/models/student-model'
import { TokenModel } from '@/models/token-model'

class TokenService {
  async createTokenResponsable(token: string, responsableId: string) {
    const responsable = await ResponsableModel.findById(responsableId)
    if (!responsable) throw 'Responsable not found'

    const newToken = await TokenModel.create({
      token,
      responsable,
      role: 'responsable'
    })

    return newToken
  }

  async createTokenStudent(token: string, studentId: string) {
    const student = await StudentModel.findById(studentId)
    if (!student) throw 'Student not found'

    const newToken = await TokenModel.create({
      token,
      student,
      role: 'student'
    })

    return newToken
  }

  async removeToken(token: string) {
    const tokenRemoved = await TokenModel.deleteOne({ token })
    return tokenRemoved
  }
}

export const tokenService = new TokenService()
