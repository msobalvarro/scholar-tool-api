import { periodController } from '@/controllers/period-controller'
import { jwtUserInstitution, jwtUserStudent, jwtUserTeacher } from '@/utils/jtw'
import { Hono } from 'hono'

export const periodRoute = new Hono()

periodRoute.use('/student/getPeriods', jwtUserStudent)
periodRoute.get('/student/getPeriods', periodController.getPeriodsByInstitution)

periodRoute.use('/teacher/getPeriods', jwtUserTeacher)
periodRoute.get('/teacher/getPeriods', periodController.getPeriodsByInstitution)


periodRoute.use('/*', jwtUserInstitution)
periodRoute.post('/create', periodController.create)
periodRoute.put('/update', periodController.update)
periodRoute.delete('/delete', periodController.delete)
periodRoute.get('/getById/:id', periodController.getById)
