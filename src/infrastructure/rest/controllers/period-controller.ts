import { Context } from "hono"
import { PeriodService } from "@/infrastructure/database/repositories/period-repository"
import { PeriodUpdateSchema, PeriodSchema } from "@/infrastructure/database/schemas/period-schema"
import { PeriodUpdate, Period } from "@/infrastructure/database/schemas/period-schema"
import { Service } from 'typedi'
@Service()
export class PeriodController {
  constructor(private periodService: PeriodService) { }

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = PeriodSchema.parse(body) as Period
    const user = c.get('jwtPayload')

    const period = await this.periodService.createPeriod(parsedBody, user.institutionId)

    return c.json(period)
  }

  update = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = PeriodUpdateSchema.parse(body) as PeriodUpdate
    const period = await this.periodService.updatePeriod(parsedBody)

    return c.json(period)
  }

  delete = async (c: Context) => {
    const { _id } = await c.req.json()
    const period = await this.periodService.deletePeriod(_id)
    return c.json(period)
  }

  getById = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }

    if (!id) throw 'Periodo no encontrado'

    const period = await this.periodService.getPeriodById(id)
    return c.json(period)
  }

  getPeriodsByInstitution = async (c: Context) => {
    const user = c.get('jwtPayload')
    const periods = await this.periodService.getPeriodsByInstitution(user.institutionId)
    return c.json(periods)
  }
}