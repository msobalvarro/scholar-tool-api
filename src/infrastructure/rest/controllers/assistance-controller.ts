import { assistanceSchema, AssitanceSchema } from '@/infrastructure/database/schemas/assitance-schema'
import { AssitanceRepository } from '@/infrastructure/database/repositories/assitance-repository'
import { ErrorValidator } from '@/utils/error-validator'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class AssistanceController {
  constructor(private assistanceService: AssitanceRepository) { }

  createAssistance = async (c: Context) => {
    try {
      const body = await c.req.json()
      const payload = assistanceSchema.parse(body) as AssitanceSchema

      const assistance = await this.assistanceService.createAssistance(payload)
      return c.json(assistance)

    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getAssistance = async (c: Context) => { }
}
