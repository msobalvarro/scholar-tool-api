import { Hono } from 'hono'
import { teacherController } from '@/controllers/teacher-controller'

export const teacherRoute = new Hono()

teacherRoute.get('/', teacherController.getAllTeachers)
teacherRoute.get('/:id', teacherController.getTeacherById)
teacherRoute.post('/', teacherController.createTeacher)
teacherRoute.put('/:id', teacherController.updateTeacher)
teacherRoute.delete('/:id', teacherController.deleteTeacher)
