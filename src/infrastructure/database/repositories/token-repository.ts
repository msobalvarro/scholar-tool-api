import { Inject, Service } from 'typedi'
import { ORM } from '..'

@Service()
export class TokenService {
  @Inject(() => ORM)
  private readonly orm!: ORM

  async createTokenResponsable(token: string, responsableId: string, institutionId: string) {
    const responsable = await this.orm.models.ResponsableModel.findById(responsableId)
    if (!responsable) throw 'Responsable no encontrado'

    const institution = await this.orm.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    const newToken = await this.orm.models.TokenModel.create({
      token,
      responsable,
      role: 'responsable',
      institution,
    })

    return newToken
  }

  async createTokenStudent(token: string, studentId: string, institutionId: string) {
    const student = await this.orm.models.StudentModel.findById(studentId)
    if (!student) throw 'Estudiante no encontrado'

    const institution = await this.orm.models.InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    const newToken = await this.orm.models.TokenModel.create({
      token,
      student,
      role: 'student',
      institution,
    })

    return newToken
  }

  async removeToken(token: string) {
    const tokenRemoved = await this.orm.models.TokenModel.deleteOne({ token })
    return tokenRemoved
  }
}
