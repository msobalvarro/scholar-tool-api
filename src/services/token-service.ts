import { InstitutionModel } from '@/models/institution-model'
import { ResponsableModel } from '@/models/responsable-model'
import { StudentModel } from '@/models/student-model'
import { TokenModel } from '@/models/token-model'

class TokenService {
  async createTokenResponsable(token: string, responsableId: string, institutionId: string) {
    const responsable = await ResponsableModel.findById(responsableId)
    if (!responsable) throw 'Responsable not found'

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'

    const newToken = await TokenModel.create({
      token,
      responsable,
      role: 'responsable',
      institution,
    })

    return newToken
  }

  async createTokenStudent(token: string, studentId: string, institutionId: string) {
    const student = await StudentModel.findById(studentId)
    if (!student) throw 'Student not found'

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institution not found'

    const newToken = await TokenModel.create({
      token,
      student,
      role: 'student',
      institution,
    })

    return newToken
  }

  async removeToken(token: string) {
    const tokenRemoved = await TokenModel.deleteOne({ token })
    return tokenRemoved
  }
}

export const tokenService = new TokenService()
