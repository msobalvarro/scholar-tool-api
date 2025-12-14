import { Context } from 'hono'
import { ErrorValidator } from '@/utils/error-validator'
import { taskService } from '@/services/task-service'
import {
  TaskUpdate,
  Task,
  TaskUpdateSchema,
  TaskSchema,
  TaskGetByAsignature,
  TaskGetByAsignatureSchema
} from '@/schemas/task-schema'

class TaskController {
  async create(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = TaskSchema.parse(body) as Task
      const user = c.get('jwtPayload')

      const task = await taskService.createTask(parsedBody, user.institutionId)

      return c.json(task)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async update(c: Context) {
    try {
      const body = await c.req.json()
      const parsedBody = TaskUpdateSchema.parse(body) as TaskUpdate
      const task = await taskService.updateTask(parsedBody, c.get('jwtPayload').institutionId)

      return c.json(task)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async delete(c: Context) {
    try {
      const { _id } = await c.req.json()

      if (!_id) throw 'Task not found'

      const task = await taskService.deleteTask(_id)
      return c.json(task)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }

  async getTasksByAsignature(c: Context) {
    try {
      const params = await c.req.param()
      const parsedParams = TaskGetByAsignatureSchema.parse(params) as TaskGetByAsignature

      const tasks = await taskService.getTasksByAsignature(parsedParams.asignatureId, parsedParams.courseId)
      return c.json(tasks)
    } catch (error) {
      return ErrorValidator(error, c)
    }
  }
}

export const taskController = new TaskController()