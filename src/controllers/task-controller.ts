import { Context } from 'hono'
import { ErrorValidator } from '@/utils/error-validator'
import { TaskService } from '@/services/task-service'
import {
  TaskUpdate,
  Task,
  TaskUpdateSchema,
  TaskSchema,
  TaskGetByAsignature,
  TaskGetByAsignatureSchema
} from '@/schemas/task-schema'
import { Service } from 'typedi'

@Service()
export class TaskController {
  constructor(private taskService: TaskService) { }

  create = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = TaskSchema.parse(body) as Task
      const user = c.get('jwtPayload')

      const task = await this.taskService.createTask(parsedBody, user.institutionId)

      return c.json(task)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  update = async (c: Context) => {
    try {
      const body = await c.req.json()
      const parsedBody = TaskUpdateSchema.parse(body) as TaskUpdate
      const task = await this.taskService.updateTask(parsedBody, c.get('jwtPayload').institutionId)

      return c.json(task)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  delete = async (c: Context) => {
    try {
      const { _id } = await c.req.json()

      if (!_id) throw 'Tarea no encontrada'

      const task = await this.taskService.deleteTask(_id)
      return c.json(task)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  getTasksByAsignature = async (c: Context) => {
    try {
      const params = await c.req.param()
      const parsedParams = TaskGetByAsignatureSchema.parse(params) as TaskGetByAsignature

      const tasks = await this.taskService.getTasksByAsignature(parsedParams.asignatureId, parsedParams.courseId)
      return c.json(tasks)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}