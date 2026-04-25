import {
  ResponsablePerson,
  ResponsablePersonUpdate,
  responsableSchema
} from '@/schemas/responsable-schema'
import { Context } from 'hono'
import { ErrorValidator } from '@/utils/error-validator'
import { ResponsableService } from '@/services/responsable-service'
import { Service } from 'typedi'
@Service()
export class ResponsableController {
  constructor(private responsableService: ResponsableService) { }

  create = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = responsableSchema.parse(body) as ResponsablePerson

      const responsable = await this.responsableService.createResponsable(parsedBody)

      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  update = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = responsableSchema.parse(body) as ResponsablePersonUpdate

      const responsable = await this.responsableService.updateResponsable(parsedBody)

      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  delete = async (c: Context) => {
    try {
      const { _id } = await c.req.json()
      const responsable = await this.responsableService.deleteResponsable(_id)
      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAll = async (c: Context) => {
    try {
      const responsables = await this.responsableService.getAllResponsables()
      return c.json(responsables)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getById = async (c: Context) => {
    try {
      const { id } = await c.req.param() as { id: string }
      const responsable = await this.responsableService.getResponsableById(id)
      return c.json(responsable)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}