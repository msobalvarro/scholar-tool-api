import { Hono } from 'hono'
import { TeacherController } from '@/controllers/teacher-controller'
import { jwtUserInstitution, jwtUserTeacher } from '@/utils/jtw'
import Container from 'typedi'

export const teacherRoute = new Hono()
const controller = Container.get(TeacherController)

teacherRoute.use('/*', jwtUserInstitution)

teacherRoute.get('/', controller.getAllTeachers)
teacherRoute.post('/', controller.createTeacher)

teacherRoute.get('/:id', controller.getTeacherById)
teacherRoute.delete('/:id', controller.deleteTeacher)

teacherRoute.use('/photo', jwtUserTeacher)
teacherRoute.put('/photo', controller.updatePhoto)

teacherRoute.put('/:id', controller.updateTeacher)

