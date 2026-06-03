import mongoose, { connect } from 'mongoose'
import { Service } from 'typedi'
import { ModelORM } from './models'
import { environments } from '@/utils/constanst';
import { DBConnectionError } from '@/core/errors/dbConnectionError';

@Service()
export class ORM {
  private _models!: ModelORM;

  startSession(): Promise<mongoose.ClientSession> {
    return mongoose.startSession()
  }

  async connectDB() {
    await connect(environments.DB, { autoIndex: false })
    console.log("DB connected")
  }

  get models(): ModelORM {
    if (!this._models) throw new DBConnectionError("ORM no inicializado. Llame a orm.connectDB() primero.");
    return this._models
  }
}