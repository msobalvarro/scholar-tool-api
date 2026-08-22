import { Token } from '../dtos'

export interface ITokenRepository {
  createTokenStudent(userId: string, token: string, institutionId: string): Promise<Token>
  createTokenResponsable(userId: string, token: string, institutionId: string): Promise<Token>
  removeToken(token: string): Promise<void>

  /**
   * Obtiene los tokens por id del usuario
   */
  getTokensByUserId(userId: string): Promise<Token[]>
}