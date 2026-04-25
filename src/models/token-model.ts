import { Token } from '@/interfaces/dtos/models'
import { Schema, model } from 'mongoose'

const TokenSchema = new Schema<Token>(
  {
    token: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['responsable', 'student'],
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    responsable: {
      type: Schema.Types.ObjectId,
      ref: 'ResponsablePerson',
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: 'Institution',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const TokenModel = model<Token>('Token', TokenSchema)