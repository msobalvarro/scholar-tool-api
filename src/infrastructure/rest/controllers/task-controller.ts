import { Context } from 'hono'
import { TaskService } from '@/core/services/task-service'
import {
  TaskUpdate,
  Task,
  TaskUpdateSchema,
  TaskSchema,
  TaskGetByAsignature,
  TaskGetByAsignatureSchema
} from '@/infrastructure/database/schemas/task-schema'
import { Inject, Service } from 'typedi'

@Service()
export class TaskController {
  @Inject(() => TaskService)
  private taskService!: TaskService

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = TaskSchema.parse(body) as Task
    const user = c.get('jwtPayload')

    const task = await this.taskService.createTask(parsedBody, user.institutionId)

    return c.json(task)
  }

  update = async (c: Context) => {
    const body = await c.req.json()
    const parsedBody = TaskUpdateSchema.parse(body) as TaskUpdate
    const task = await this.taskService.updateTask(parsedBody, c.get('jwtPayload').institutionId)

    return c.json(task)
  }

  delete = async (c: Context) => {
    const { _id } = await c.req.json()

    if (!_id) throw 'Tarea no encontrada'

    const task = await this.taskService.deleteTask(_id)
    return c.json(task)
  }

  getTasksByAsignature = async (c: Context) => {
    const params = await c.req.param()
    const parsedParams = TaskGetByAsignatureSchema.parse(params) as TaskGetByAsignature

    const tasks = await this.taskService.getTasksByAsignature(parsedParams.asignatureId, parsedParams.courseId)
    return c.json(tasks)
  }
}