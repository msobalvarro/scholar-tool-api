import { InstitutionModel } from '@/models/institution-model'
import { TeacherAuthModel } from '@/models/teacher-auth-model'
import { TeacherModel } from '@/models/teacher-model'
import { createHash } from '@/utils/encrypt'

class AuthTeacherService {
  async createTeacherAuth(teacherId: string, password: string) {
    const teacher = await TeacherModel.findById(teacherId)
    if (!teacher) throw 'Profesor no encontrado'

    const user = await TeacherAuthModel.create({
      teacher,
      password: createHash(password)
    })

    return user
  }

  async getAllTeacherAuth(institutionId: string) {
    const institution = await InstitutionModel.findById(institutionId)
    if (!institution) throw 'Institución no encontrada'

    const teachers = await TeacherAuthModel
      .find({ teacher: { $in: institution.teachers } })
      .select('-password')
      .populate('teacher')

    return teachers
  }

  async updatePassword(teacherId: string, password: string) {
    const teacher = await TeacherAuthModel.findById(teacherId)
    if (!teacher) throw 'Profesor no encontrado'

    teacher.password = createHash(password)
    await teacher.save()

    return teacher
  }
}

export const authTeacherService = new AuthTeacherService()