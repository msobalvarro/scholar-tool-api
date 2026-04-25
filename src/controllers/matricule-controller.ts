import { matriculeSchema, Matricule, MatriculeUpdate } from '@/schemas/matricule-schema'
import { MatriculeService } from '@/services/matrciule-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'
@Service()
export class MatriculeController {
  constructor(private matriculeService: MatriculeService) { }

  create = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = matriculeSchema.parse(body) as Matricule
      const user = c.get('jwtPayload')

      const matricule = await this.matriculeService.createMatricule(parsedBody, user.institutionId)

      return c.json(matricule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  update = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = matriculeSchema.parse(body) as MatriculeUpdate

      const matricule = await this.matriculeService.updateMatricule(parsedBody)

      return c.json(matricule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  delete = async (c: Context) => {
    try {
      const { _id } = await c.req.json()
      const matricule = await this.matriculeService.deleteMatricule(_id)
      return c.json(matricule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAll = async (c: Context) => {
    try {
      const user = c.get('jwtPayload')
      const matricules = await this.matriculeService.getAllMatricules(user.institutionId)
      return c.json(matricules)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getById = async (c: Context) => {
    try {
      const { _id } = await c.req.json()
      const matricule = await this.matriculeService.getMatriculeById(_id)
      return c.json(matricule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}
