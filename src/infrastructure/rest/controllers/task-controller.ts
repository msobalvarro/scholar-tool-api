import { Context } from 'hono'
import { TaskService } from '@/core/services/task-service'
import {
  ITaskUpdate,
  ITaskSchema,
  TaskUpdateSchema,
  ITaskSchema,
  ITaskGetByAsignature,
  TaskGetByAsignatureSchema
} from '@/infrastructure/database/schemas/task-schema'
import { Inject, Service } from 'typedi'

@Service()
export class TaskController {
  @Inject(() => TaskService)
  private taskService!: TaskService

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = ITaskSchema.parse(body) as ITaskSchema
    const user = c.get('jwtPayload')

    const task = await this.taskService.createTask(parsedBody, user.institutionId)

    return c.json(task)
  }

  getTasksByAsignature = async (c: Context) => {
    const params = await c.req.param()
    const parsedParams = TaskGetByAsignatureSchema.parse(params) as ITaskGetByAsignature

    const tasks = await this.taskService.getTasksByAsignature(parsedParams.asignatureId, parsedParams.courseId)
    return c.json(tasks)
  }
}