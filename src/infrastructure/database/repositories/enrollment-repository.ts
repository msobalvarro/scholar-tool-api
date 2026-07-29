import { IEnrollmentRepository } from '@/core/interfaces/repositories/enrollment-repository'
import { ORM } from '..'
import { Inject, Service } from 'typedi'
import { IEnrollment } from '@/core/interfaces/dtos/enrollment'
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

  private async logChanges(enrollment: IEnrollment, institutionId: string, userId: string) {
    const prevEnrollment = await this.ORM.models.EnrollmentModel.findById(enrollment._id)
    if (!prevEnrollment) throw new Error('Enrollment not found')

    const user = await this.ORM.models.UserInstitutionModel.findById(userId)
    if (!user || user?.institution?._id?.toString() !== institutionId) throw new Error('User not found')

    const prevEnrollmentPrice = enrollment.enrollmentPrice
    const prevMonthlyPaymentPrice = enrollment.monthlyPaymentPrice
    const newEnrollmentPrice = prevEnrollment.enrollmentPrice
    const newMonthlyPaymentPrice = prevEnrollment.monthlyPaymentPrice

    await this.ORM.models.EnrollmentHistoryChangesModel.create({
      enrollment,
      prevEnrollmentPrice,
      prevMonthlyPaymentPrice,
      newEnrollmentPrice,
      newMonthlyPaymentPrice,
      user
    })
  }

  async updateEnrollment(enrollment: EnrollmentUpdateInput, institutionId: string, userId: string): Promise<IEnrollment | null> {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw new Error('Institution not found')

    const courses = await this.ORM.models.CourseModel.find({
      _id: { $in: enrollment.coursesId },
      institution: {
        _id: institutionId
      }
    })

    if (courses.length !== enrollment.coursesId.length) throw new Error('Courses not found')

    const updatedEnrollment = await this.ORM.models.EnrollmentModel.findByIdAndUpdate(
      {
        _id: enrollment._id,
        institution: {
          _id: institutionId
        }
      },
      {
        ...enrollment,
        courses
      }
    )

    if (updatedEnrollment) {
      await this.logChanges(updatedEnrollment, institutionId, userId)
    }

    return updatedEnrollment
  }

  async createEnrollment(enrollment: EnrollmentInput, institutionId: string): Promise<IEnrollment> {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw new Error('Institution not found')

    const courses = await this.ORM.models.CourseModel.find({
      _id: { $in: enrollment.coursesId },
      institution: {
        _id: institutionId
      }
    })

    if (courses.length !== enrollment.coursesId.length) throw new Error('Courses not found')
    return await this.ORM.models.EnrollmentModel.create({
      ...enrollment,
      institution,
      courses
    })
  }
}
