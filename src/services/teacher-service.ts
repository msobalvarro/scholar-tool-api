import { InstitutionModel } from '@/models/institution-model'
import { TeacherModel } from '@/models/teacher-model'
import { TeacherSchema } from '@/schemas/teacher-schema'

class TeacherService {
  async createTeacher(institutionId: string, payload: TeacherSchema) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institucion no encontrada'

    const teacher = await TeacherModel.create({ ...payload, institution })
    return teacher
  }

  async getTeachers(institutionId: string) {
    const teachers = await TeacherModel.find({ institution: { _id: institutionId } })
    return teachers
  }

  async getAllTeachers() {
    const teachers = await TeacherModel.find()
    return teachers
  }

  async getTeacherById(id: string) {
    const teacher = await TeacherModel.findById(id)
    return teacher
  }

  async updateTeacher(institutionId: string, payload: TeacherSchema, _id: string) {
    const teacher = await TeacherModel.findById(_id)
    const institution = await InstitutionModel.findById(institutionId)
    if (!teacher) throw 'Profesor no encontrado'
    if (!institution) throw 'Institucion no encontrada'

    // if (institution._id.toString() !== teacher.institution) throw 'Institución no válida'

    await TeacherModel.updateOne({ _id }, { $set: payload })

    return teacher
  }

  async deleteTeacher(_id: string) {
    const teacher = await TeacherModel.findByIdAndDelete(_id)
    return teacher
  }

  async updatePhoto(teacherId: string, imageName: string) {
    return await TeacherModel.findByIdAndUpdate(teacherId, { photo: imageName }, { new: true })
  }
}

export const teacherService = new TeacherService()