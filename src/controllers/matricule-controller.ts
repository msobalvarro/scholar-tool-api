import { matriculeSchema, Matricule, MatriculeUpdate } from '@/schemas/matricule-schema'
import { matriculeService } from '@/services/matrciule-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class MatriculeController {
  async create(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = matriculeSchema.parse(body) as Matricule
      const user = c.get('jwtPayload')

      const matricule = await matriculeService.createMatricule(parsedBody, user.institutionId)

      return c.json(matricule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async update(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = matriculeSchema.parse(body) as MatriculeUpdate

      const matricule = await matriculeService.updateMatricule(parsedBody)

      return c.json(matricule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async delete(c: Context) {
    try {
      const { _id } = await c.req.json()
      const matricule = await matriculeService.deleteMatricule(_id)
      return c.json(matricule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getAll(c: Context) {
    try {
      const user = c.get('jwtPayload')
      const matricules = await matriculeService.getAllMatricules(user.institutionId)
      return c.json(matricules)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getById(c: Context) {
    try {
      const { _id } = await c.req.json()
      const matricule = await matriculeService.getMatriculeById(_id)
      return c.json(matricule)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const matriculeController = new MatriculeController()
