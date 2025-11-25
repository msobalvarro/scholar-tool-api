import { ResponsablePerson } from '@/utils/types'
import { model, Schema } from "mongoose"

const responsableSchema = new Schema<ResponsablePerson>(
  {
    fullName: { type: String, required: true },
    identification: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const ResponsableModel = model('ResponsablePerson', responsableSchema)