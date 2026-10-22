import { Context } from "hono"
import { PeriodService } from "@/core/services/period-service"
import { PeriodUpdateSchema, PeriodSchema } from "@/infrastructure/schemas/period-schema"
import { PeriodUpdate, Period } from "@/infrastructure/schemas/period-schema"
import { Service } from 'typedi'
@Service()
export class PeriodController {
  constructor(private periodService: PeriodService) { }

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = PeriodSchema.parse(body) as Period
    const user = c.get('jwtPayload')
    return c.json(
      await this.periodService.createPeriod(parsedBody, user.institutionId)
    )
  }

  update = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = PeriodUpdateSchema.parse(body) as PeriodUpdate
    return c.json(
      await this.periodService.updatePeriod(parsedBody)
    )
  }

  delete = async (c: Context) => {
    const { _id } = await c.req.json()
    return c.json(
      await this.periodService.deletePeriod(_id)
    )
  }

  getById = async (c: Context) => {
    const { id } = await c.req.param() as { id: string }
    if (!id) throw 'Periodo no encontrado'
    return c.json(
      await this.periodService.getPeriodById(id)
    )
  }

  getPeriodsByInstitution = async (c: Context) => {
    const user = c.get('jwtPayload')
    return c.json(
      await this.periodService.getPeriodsByInstitution(user.institutionId)
    )
  }
}