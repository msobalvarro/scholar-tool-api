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
} from '@/infrastructure/database/schemas/institution-schema'
import { InstitutionService } from '@/infrastructure/database/repositories/institution-repository'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'
@Service()
export class InstitutionController {
  constructor(private institutionService: InstitutionService) { }

  getInstitutions = async (c: Context) => {
    try {
      const institutions = await this.institutionService.getInstitutions()
      return c.json(institutions)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getInstitutionById = async (c: Context) => {
    try {
      const { id } = c.req.param()
      const institution = await this.institutionService.getInstitutionById(id)
      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  createInstitution = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = institutionSchema.parse(body) as InstitutionSchema

      const institution = await this.institutionService.createInstitution(parsedBody)

      return c.json(institution)

    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  updateInstitution = async (c: Context) => {
    try {

      const body = await c.req.json()
      const parsedBody = updateInstitutionSchema.parse(body) as UpdateInstitutionSchema

      const institution = await this.institutionService.updateInstitution(parsedBody)

      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  deleteInstitution = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = deleteInstitutionSchema.parse(body) as DeleteInstitutionSchema

      const institution = await this.institutionService.deleteInstitution(parsedBody)

      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  assignUserToInstitution = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = assignUserToInstitutionSchema.parse(body) as AssignUserToInstitutionSchema

      const institution = await this.institutionService.assignUserToInstitution(parsedBody)

      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  removeUserFromInstitution = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = removeUserFromInstitutionSchema.parse(body) as RemoveUserFromInstitutionSchema

      const institution = await this.institutionService.removeUserFromInstitution(parsedBody)

      return c.json(institution)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}