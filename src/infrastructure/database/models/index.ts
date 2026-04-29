import { AsignatureModel } from './asignature-model'
import { AssistanceModel } from './assistance-model'
import { CourseModel } from './course-model'
import { InstitutionModel } from './institution-model'
import { MatriculeModel } from './matricule-model'
import { NotificationModel } from './notification-model'
import { ObservationModel } from './observation-model'
import { PeriodModel } from './period-model'
import { ResponsableModel } from './responsable-model'
import { UserRootModel } from './root-user-model'
import { ScheduleModel } from './schedule-model'
import { StudentModel } from './student-model'
import { TaskModel } from './task-model'
import { TeacherAuthModel } from './teacher-auth-model'
import { TeacherModel } from './teacher-model'
import { TokenModel } from './token-model'
import { UserInstitutionModel } from './user-institution-model'

export {
  AsignatureModel,
  AssistanceModel,
  CourseModel,
  InstitutionModel,
  MatriculeModel,
  NotificationModel,
  ObservationModel,
  PeriodModel,
  ResponsableModel,
  UserRootModel,
  ScheduleModel,
  StudentModel,
  TaskModel,
  TeacherAuthModel,
  TeacherModel,
  TokenModel,
  UserInstitutionModel,
}

export type ModelORM = {
  AsignatureModel: typeof AsignatureModel,
  AssistanceModel: typeof AssistanceModel,
  CourseModel: typeof CourseModel,
  InstitutionModel: typeof InstitutionModel,
  MatriculeModel: typeof MatriculeModel,
  NotificationModel: typeof NotificationModel,
  ObservationModel: typeof ObservationModel,
  PeriodModel: typeof PeriodModel,
  ResponsableModel: typeof ResponsableModel,
  UserRootModel: typeof UserRootModel,
  ScheduleModel: typeof ScheduleModel,
  StudentModel: typeof StudentModel,
  TaskModel: typeof TaskModel,
  TeacherAuthModel: typeof TeacherAuthModel,
  TeacherModel: typeof TeacherModel,
  TokenModel: typeof TokenModel,
  UserInstitutionModel: typeof UserInstitutionModel,
}