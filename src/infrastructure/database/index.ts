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
  EnrollmentHistoryChangesModel,
  StudentAssistenceModel,
  DailyReportModel,
} from './models'
import { environments } from '@/utils/constanst';
import { DBConnectionError } from '@/core/errors/db-connection-error';

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
      EnrollmentHistoryChangesModel,
      StudentAssistenceModel,
      DailyReportModel,
    }
  }

  async connectDB() {
    process.stdout.write(`Conectando a la base de datos...`)
    await connect(environments.DB, { autoIndex: false })
    process.stdout.write(`Conexión exitosa a la base de datos...\n`)
    this._models = this.assignModels()
    process.stdout.write(`Modelos cargados...\n`)
  }

  get models(): ModelORM {
    if (!this._models) throw new DBConnectionError("ORM no inicializado. Llame a orm.connectDB() primero.");
    return this._models
  }
}