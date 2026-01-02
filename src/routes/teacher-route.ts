import { Hono } from 'hono'
import { teacherController } from '@/controllers/teacher-controller'
import { jwtUserInstitution, jwtUserTeacher } from '@/utils/jtw'

export const teacherRoute = new Hono()

teacherRoute.use('/*', jwtUserInstitution)

teacherRoute.get('/', teacherController.getAllTeachers)
teacherRoute.post('/', teacherController.createTeacher)

teacherRoute.get('/:id', teacherController.getTeacherById)
teacherRoute.delete('/:id', teacherController.deleteTeacher)

teacherRoute.use('/photo', jwtUserTeacher)
teacherRoute.put('/photo', teacherController.updatePhoto)

teacherRoute.put('/:id', teacherController.updateTeacher)

