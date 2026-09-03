import { DailyReportController } from '@/infrastructure/rest/controllers/daily-report-controller'
import { jwtUserInstitution } from '@/infrastructure/rest/middlewares'
import { Hono } from 'hono'
import Container from 'typedi'

export const dailyReportRoute = new Hono()
const controller = Container.get(DailyReportController)

dailyReportRoute.use('/*', jwtUserInstitution)

dailyReportRoute.post('/', controller.create)
dailyReportRoute.get('/', controller.getByDate)
dailyReportRoute.post('/close', controller.close)
