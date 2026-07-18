import { EnrollmentInput, EnrollmentUpdateInput } from '@/infrastructure/database/schemas/enrollment-schema';
import { IEnrollment } from '../dtos/enrollement';

export interface IEnrollmentRepository {
  getEnrollments(institutionId: string): Promise<IEnrollment[]>
  updateEnrollment(enrollment: EnrollmentUpdateInput, institutionId: string): Promise<IEnrollment | null>
  createEnrollment(enrollment: EnrollmentInput, institutionId: string): Promise<IEnrollment>
}