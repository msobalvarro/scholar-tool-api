import { Hono } from 'hono'
import { institutionRoute } from './institution-route'
import { userInstitutionRoute } from './user-institution-route'
import { authRoute } from './auth-route'
import { userRootRoute } from './user-root-route'
import { teacherRoute } from './teacher-route'
import { matriculeRoute } from './matricule-route'
import { responsableRoute } from './responsable-route'
import { studentRoute } from './student-route'
import { courseRoute } from './course-route'
import { scheduleRoute } from './schedule-route'
import { asignatureRoute } from './asignature-route'
import { authTeacherRoute } from './auth-teacher-route'
import { observationRoute } from './observation-route'

export const router = new Hono()

router.route('/institutions', institutionRoute)
router.route('/user-institutions', userInstitutionRoute)
router.route('/auth', authRoute)
router.route('/user-root', userRootRoute)
router.route('/teachers', teacherRoute)
router.route('/matricules', matriculeRoute)
router.route('/responsable', responsableRoute)
router.route('/students', studentRoute)
router.route('/courses', courseRoute)
router.route('/schedules', scheduleRoute)
router.route('/asignatures', asignatureRoute)
router.route('/auth-teacher', authTeacherRoute)
router.route('/observations', observationRoute)

