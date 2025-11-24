import { InstitutionModel } from '@/models/institution-model';
import { TeacherModel } from '@/models/teacher-model';
import { TeacherSchema, UpdateTeacherSchema } from '@/schemas/teacher-schema';

class TeacherService {
  async createTeacher(institutionId: string, payload: TeacherSchema) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw new Error('Institucion no encontrada')

    const teacher = await TeacherModel.create(payload)

    await institution.updateOne({ teachers: { $push: teacher } })
    return teacher
  }

  async getTeachers(institutionId: string) {
    const insitution = await InstitutionModel.findById(institutionId)
    return insitution?.teachers
  }

  async getAllTeachers() {
    const teachers = await TeacherModel.find()
    return teachers
  }

  async updateTeacher(payload: UpdateTeacherSchema) {
    const { _id, ...rest } = payload
    const teacher = await TeacherModel.findByIdAndUpdate(_id, rest, { new: true })
    return teacher
  }

  async deleteTeacher(payload: DeleteTeacherSchema) {
    const { _id } = payload
    const teacher = await TeacherModel.findByIdAndDelete(_id)
    return teacher
  }
}

export const teacherService = new TeacherService()