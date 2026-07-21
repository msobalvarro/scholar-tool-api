import { IEnrollmentRepository } from '@/core/interfaces/repositories/enrollment-repository'
import { ORM } from '..'
import { Inject, Service } from 'typedi'
import { IEnrollment } from '@/core/interfaces/dtos/enrollement'
import { EnrollmentInput, EnrollmentUpdateInput } from '@/infrastructure/database/schemas/enrollment-schema'

@Service()
export class EnrollmentRepository implements IEnrollmentRepository {
  @Inject(() => ORM)
  private readonly ORM!: ORM

  async getEnrollments(institutionId: string): Promise<IEnrollment[]> {
    return await this.ORM.models.EnrollmentModel
      .find({
        institution: {
          _id: institutionId
        }
      })
      .select('-institution')
      .populate('courses')
  }

  async updateEnrollment(enrollment: EnrollmentUpdateInput, institutionId: string): Promise<IEnrollment | null> {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw new Error('Institution not found')

    const courses = await this.ORM.models.AsignatureModel.find({
      _id: { $in: enrollment.coursesId },
      institution: {
        _id: institutionId
      }
    })

    if (courses.length !== enrollment.coursesId.length) throw new Error('Courses not found')

    return await this.ORM.models.EnrollmentModel.findByIdAndUpdate(enrollment._id, {
      ...enrollment,
      institution,
      courses
    })
  }

  async createEnrollment(enrollment: EnrollmentInput, institutionId: string): Promise<IEnrollment> {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw new Error('Institution not found')

    const courses = await this.ORM.models.AsignatureModel.find({
      _id: { $in: enrollment.coursesId },


      // institution: {
      //   _id: institutionId
      // }
    })

    console.log(institutionId)

    if (courses.length !== enrollment.coursesId.length) throw new Error('Courses not found')
    return await this.ORM.models.EnrollmentModel.create({
      ...enrollment,
      institution,
      courses
    })
  }
}
