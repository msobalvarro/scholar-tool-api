import { Token } from '@/utils/types'
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const TokenModel = model<Token>('Token', TokenSchema)