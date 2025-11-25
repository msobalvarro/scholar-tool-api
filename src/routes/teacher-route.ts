import { Hono } from 'hono'
import { teacherController } from '@/controllers/teacher-controller'

export const teacherRoute = new Hono()

teacherRoute.get('/', teacherController.getAllTeachers)
teacherRoute.post('/', teacherController.createTeacher)
teacherRoute.put('/', teacherController.updateTeacher)

teacherRoute.get('/:id', teacherController.getTeacherById)
teacherRoute.delete('/:id', teacherController.deleteTeacher)
