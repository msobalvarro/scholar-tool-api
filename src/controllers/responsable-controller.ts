import {
  ResponsablePerson,
  ResponsablePersonUpdate,
  responsableSchema
} from '@/schemas/responsable-schema'
import { Context } from 'hono'
import { ErrorValidator } from '@/utils/error-validator'
import { responsableService } from '@/services/responsable-service'

class ResponsableController {
  async create(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = responsableSchema.parse(body) as ResponsablePerson

      const responsable = await responsableService.createResponsable(parsedBody)

      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async update(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = responsableSchema.parse(body) as ResponsablePersonUpdate

      const responsable = await responsableService.updateResponsable(parsedBody)

      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async delete(c: Context) {
    try {
      const { _id } = await c.req.json()
      const responsable = await responsableService.deleteResponsable(_id)
      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getAll(c: Context) {
    try {
      const responsables = await responsableService.getAllResponsables()
      return c.json(responsables)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getById(c: Context) {
    try {
      const { id } = await c.req.param() as { id: string }
      const responsable = await responsableService.getResponsableById(id)
      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const responsableController = new ResponsableController()