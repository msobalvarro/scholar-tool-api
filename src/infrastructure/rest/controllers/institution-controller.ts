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
} from '@/infrastructure/schemas/institution-schema'
import { InstitutionService } from '@/core/services/institution-service'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class InstitutionController {
  constructor(private institutionService: InstitutionService) { }

  getInstitutions = async (c: Context) => {
    return c.json(
      await this.institutionService.getInstitutions()
    )
  }

  getInstitutionById = async (c: Context) => {
    const { id } = c.req.param()
    return c.json(
      await this.institutionService.getInstitutionById(id)
    )
  }

  createInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = institutionSchema.parse(body) as InstitutionSchema
    return c.json(
      await this.institutionService.createInstitution(parsedBody)
    )
  }

  updateInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = updateInstitutionSchema.parse(body) as UpdateInstitutionSchema
    return c.json(
      await this.institutionService.updateInstitution(parsedBody)
    )
  }

  deleteInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = deleteInstitutionSchema.parse(body) as DeleteInstitutionSchema
    return c.json(
      await this.institutionService.deleteInstitution(parsedBody)
    )
  }

  assignUserToInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = assignUserToInstitutionSchema.parse(body) as AssignUserToInstitutionSchema
    return c.json(
      await this.institutionService.assignUserToInstitution(parsedBody)
    )
  }

  removeUserFromInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = removeUserFromInstitutionSchema.parse(body) as RemoveUserFromInstitutionSchema
    return c.json(
      await this.institutionService.removeUserFromInstitution(parsedBody)
    )
  }
}