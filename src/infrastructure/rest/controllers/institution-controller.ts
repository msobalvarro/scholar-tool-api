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
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class InstitutionController {
  constructor(private institutionService: InstitutionService) { }

  getInstitutions = async (c: Context) => {
    const institutions = await this.institutionService.getInstitutions()
    return c.json(institutions)
  }

  getInstitutionById = async (c: Context) => {
    const { id } = c.req.param()
    const institution = await this.institutionService.getInstitutionById(id)
    return c.json(institution)
  }

  createInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = institutionSchema.parse(body) as InstitutionSchema

    const institution = await this.institutionService.createInstitution(parsedBody)

    return c.json(institution)
  }

  updateInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = updateInstitutionSchema.parse(body) as UpdateInstitutionSchema

    const institution = await this.institutionService.updateInstitution(parsedBody)

    return c.json(institution)
  }

  deleteInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = deleteInstitutionSchema.parse(body) as DeleteInstitutionSchema

    const institution = await this.institutionService.deleteInstitution(parsedBody)

    return c.json(institution)
  }

  assignUserToInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = assignUserToInstitutionSchema.parse(body) as AssignUserToInstitutionSchema

    const institution = await this.institutionService.assignUserToInstitution(parsedBody)

    return c.json(institution)
  }

  removeUserFromInstitution = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = removeUserFromInstitutionSchema.parse(body) as RemoveUserFromInstitutionSchema

    const institution = await this.institutionService.removeUserFromInstitution(parsedBody)

    return c.json(institution)
  }
}