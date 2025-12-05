import { assistanceSchema, AssitanceSchema } from '@/schemas/assitance-schema';
import { assistanceService } from '@/services/assitance-service';
import { ErrorValidator } from '@/utils/error-validator';
import { Context } from 'hono';

class AssistanceController {
  async createAssistance(c: Context) {
    try {
      const body = await c.req.json()
      const payload = assistanceSchema.parse(body) as AssitanceSchema

      const assistance = await assistanceService.createAssistance(payload)
      return c.json(assistance)

    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getAssistance(c: Context) { }
}

export const assistanceController = new AssistanceController()
