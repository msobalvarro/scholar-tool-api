import {
  updateInstitutionSchema,
  deleteInstitutionSchema,
  assignUserToInstitutionSchema,
  removeUserFromInstitutionSchema,
  RemoveUserFromInstitutionSchema,
  AssignUserToInstitutionSchema,
  DeleteInstitutionSchema,
  InstitutionSchema,
  institutionSchema,
  UpdateInstitutionSchema
} from '@/schemas/institution-schema'
import { institutionService } from '@/services/institution-service'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'

class InstitutionController {
  async getInstitutions(c: Context) {
    try {
      const institutions = await institutionService.getInstitutions()
      return c.json(institutions)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getInstitutionById(c: Context) {
    try {
      const { id } = c.req.param()
      const institution = await institutionService.getInstitutionById(id)
      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async createInstitution(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = institutionSchema.parse(body) as InstitutionSchema

      const institution = await institutionService.createInstitution(parsedBody)

      return c.json(institution)

    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async updateInstitution(c: Context) {
    try {

      const body = await c.req.json()
      const parsedBody = updateInstitutionSchema.parse(body) as UpdateInstitutionSchema

      const institution = await institutionService.updateInstitution(parsedBody)

      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async deleteInstitution(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = deleteInstitutionSchema.parse(body) as DeleteInstitutionSchema

      const institution = await institutionService.deleteInstitution(parsedBody)

      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async assignUserToInstitution(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = assignUserToInstitutionSchema.parse(body) as AssignUserToInstitutionSchema

      const institution = await institutionService.assignUserToInstitution(parsedBody)

      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async removeUserFromInstitution(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = removeUserFromInstitutionSchema.parse(body) as RemoveUserFromInstitutionSchema

      const institution = await institutionService.removeUserFromInstitution(parsedBody)

      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const institutionController = new InstitutionController()