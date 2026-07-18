import { EnrollmentInput } from '@/infrastructure/database/schemas/enrollment-schema';
import { IEnrollment } from '../dtos/enrollement';

export interface IEnrollmentRepository {
  getEnrollments(institutionId: string): Promise<IEnrollment[]>
  createEnrollment(enrollment: EnrollmentInput, institutionId: string): Promise<IEnrollment>
}