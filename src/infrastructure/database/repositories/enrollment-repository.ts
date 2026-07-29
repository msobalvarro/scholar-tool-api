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

  private async logChanges(enrollment: IEnrollment, institutionId: string) {
    const prevEnrollment = await this.ORM.models.EnrollmentModel.findById(enrollment._id)
    if (!prevEnrollment) throw new Error('Enrollment not found')

    const prevEnrollmentPrice = prevEnrollment.enrollmentPrice
    const prevMonthlyPaymentPrice = prevEnrollment.monthlyPaymentPrice

    const newEnrollmentPrice = enrollment.enrollmentPrice
    const newMonthlyPaymentPrice = enrollment.monthlyPaymentPrice

    const user = await this.ORM.models.UserInstitutionModel.findById(institutionId)
    if (!user) throw new Error('User not found')

    await this.ORM.models.EnrollmentHistoryChangesModel.create({
      enrollment,
      prevEnrollmentPrice,
      prevMonthlyPaymentPrice,
      newEnrollmentPrice,
      newMonthlyPaymentPrice,
      user
    })
  }

  async updateEnrollment(enrollment: EnrollmentUpdateInput, institutionId: string): Promise<IEnrollment | null> {
    const institution = await this.ORM.models.InstitutionModel.findById(institutionId)
    if (!institution) throw new Error('Institution not found')

    const courses = await this.ORM.models.CourseModel.find({
      _id: { $in: enrollment.coursesId },
      institution: {
        _id: institutionId
      }
    })

    if (courses.length !== enrollment.coursesId.length) throw new Error('Courses not found')

    const updatedEnrollment = await this.ORM.models.EnrollmentModel.findByIdAndUpdate(enrollment._id, {
      ...enrollment,
      institution,
      courses
    })

    if (updatedEnrollment) {
      await this.logChanges(updatedEnrollment, institutionId)
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
