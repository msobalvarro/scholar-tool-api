import { Service } from 'typedi'
import { connect } from 'mongoose'
import { ModelORM } from './models'
import { environments } from '@/utils/constanst';
import { DBConnectionError } from '@/core/errors/dbConnectionError';

@Service()
export class ORM {
  private _models!: ModelORM;

  async connectDB() {
    const connection = await connect(environments.DB, { autoIndex: false })
    console.log("DB connected")
  }

  get models(): ModelORM {
    if (!this._models) throw new DBConnectionError("ORM no inicializado. Llame a orm.connectDB() primero.");
    return this._models
  }
}