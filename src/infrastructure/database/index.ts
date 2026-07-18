import mongoose, { connect } from 'mongoose'
import { Service } from 'typedi'
import {
  ModelORM,
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
  CalendarEventModel,
  EnrollmentModel,
} from './models'
import { environments } from '@/utils/constanst';
import { DBConnectionError } from '@/core/errors/dbConnectionError';

@Service()
export class ORM {
  private _models!: ModelORM;

  startSession(): Promise<mongoose.ClientSession> {
    return mongoose.startSession()
  }

  private assignModels(): ModelORM {
    return {
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
      CalendarEventModel,
      EnrollmentModel,
    }
  }

  async connectDB() {
    await connect(environments.DB, { autoIndex: false })
    this._models = this.assignModels()
  }

  get models(): ModelORM {
    if (!this._models) throw new DBConnectionError("ORM no inicializado. Llame a orm.connectDB() primero.");
    return this._models
  }
}