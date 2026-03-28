import { InstitutionModel } from '@/models/institution-model'
import { ResponsableModel } from '@/models/responsable-model'
import { StudentModel } from '@/models/student-model'
import { TokenModel } from '@/models/token-model'
import { Service } from 'typedi'

@Service()
export class TokenService {
  async createTokenResponsable(token: string, responsableId: string, institutionId: string) {
    const responsable = await ResponsableModel.findById(responsableId)
    if (!responsable) throw 'Responsable no encontrado'

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

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
    if (!student) throw 'Estudiante no encontrado'

    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

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
