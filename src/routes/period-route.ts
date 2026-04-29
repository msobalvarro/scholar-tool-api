import { PeriodController } from '@/infrastructure/rest/controllers/period-controller'
import { jwtUserInstitution, jwtUserStudent, jwtUserTeacher } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const periodRoute = new Hono()
const controller = Container.get(PeriodController)

periodRoute.use('/student/getPeriods', jwtUserStudent)
periodRoute.get('/student/getPeriods', controller.getPeriodsByInstitution)

periodRoute.use('/teacher/getPeriods', jwtUserTeacher)
periodRoute.get('/teacher/getPeriods', controller.getPeriodsByInstitution)


periodRoute.use('/*', jwtUserInstitution)
periodRoute.post('/create', controller.create)
periodRoute.put('/update', controller.update)
periodRoute.delete('/delete', controller.delete)
periodRoute.get('/getById/:id', controller.getById)
