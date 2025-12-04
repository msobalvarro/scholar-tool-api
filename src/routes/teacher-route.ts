import { Hono } from 'hono'
import { teacherController } from '@/controllers/teacher-controller'
import { jwtUserInstitution } from '@/utils/jtw'

export const teacherRoute = new Hono()

teacherRoute.use('/*', jwtUserInstitution)

teacherRoute.get('/', teacherController.getAllTeachers)
teacherRoute.post('/', teacherController.createTeacher)
teacherRoute.put('/', teacherController.updateTeacher)

teacherRoute.get('/:id', teacherController.getTeacherById)
teacherRoute.delete('/:id', teacherController.deleteTeacher)
