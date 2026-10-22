import { assistanceSchema, AssitanceSchema } from '@/infrastructure/schemas/assitance-schema'
import { AssitanceRepository } from '@/core/services/assitance-service'
import { Context } from 'hono'
import { Service } from 'typedi'

@Service()
export class AssistanceController {
  constructor(private assistanceService: AssitanceRepository) { }

  createAssistance = async (c: Context) => {
    const body = await c.req.json()
    const payload = assistanceSchema.parse(body) as AssitanceSchema
    return c.json(
      await this.assistanceService.createAssistance(payload)
    )
  }

  // getAssistance = async (c: Context) => { }
}
