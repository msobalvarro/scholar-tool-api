import { Inject, Service } from 'typedi'
import { ORM } from '@/infrastructure/database'
import { InstitutionService } from './institution-service'
import { ResponsableRepository } from './responsable-service'
import { StudentRepository } from './student-service'
import { ITokenRepository } from '@/core/interfaces/service/token-service'
import { Token } from '@/core/interfaces/dtos'

@Service()
export class TokenService implements ITokenRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => ResponsableRepository)
  private readonly responsableRepository!: ResponsableRepository

  @Inject(() => StudentRepository)
  private readonly studentRepository!: StudentRepository

  async createTokenResponsable(token: string, responsableId: string, institutionId: string) {
    const responsable = await this.responsableRepository.getActiveResponsable(responsableId)
    const institution = await this.institutionService.getActiveInstitution(institutionId)

    const newToken = await this.orm.models.TokenModel.create({
      token,
      responsable,
      role: 'responsable',
      institution,
    })

    return newToken
  }

  async createTokenStudent(token: string, studentId: string, institutionId: string) {
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const student = await this.studentRepository.getActiveStudent(studentId, institutionId)

    const newToken = await this.orm.models.TokenModel.create({
      token,
      student,
      role: 'student',
      institution,
    })

    return newToken
  }

  async removeToken(token: string) {
    await this.orm.models.TokenModel.deleteOne({ token })
  }

  async getTokensByUserId(userId: string): Promise<Token[]> {
    return await this.orm.models.TokenModel.find({ user: userId })
  }
}
