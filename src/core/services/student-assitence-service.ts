import { ORM } from '@/infrastructure/database';
import { IStudentAssistenceRepository } from '@/core/interfaces/service/student-assistence-service';
import { StudentAssistence } from '@/core/interfaces/dtos/student-assistence';
import { Inject, Service } from 'typedi';
import { StudentAssistenceSchema } from '../../infrastructure/database/schemas/student-assistence-schema';
import { StudentRepository } from './student-service';
import { MatriculeRepository } from './matrciule-service';
import { DateFormatterAdapter } from '@/infrastructure/adapters/date-formats';
import { Student } from '@/core/interfaces/dtos';
import { InstitutionService } from './institution-service';
import { StudentAlreadyAssistedError } from '@/core/errors/student-assistence-error';
import { NotificationService } from './notification-service';
import { TokenService } from './token-service';

@Service()
export class StudentAssistenceRepository implements IStudentAssistenceRepository {
  @Inject(() => ORM)
  private readonly orm!: ORM;

  @Inject(() => InstitutionService)
  private readonly institutionService!: InstitutionService

  @Inject(() => StudentRepository)
  private studentRepository!: StudentRepository

  @Inject(() => MatriculeRepository)
  private matriculeRepository!: MatriculeRepository

  @Inject(() => DateFormatterAdapter)
  private readonly dateFormatterAdapter!: DateFormatterAdapter

  @Inject(() => NotificationService)
  private readonly notificationRepository!: NotificationService

  @Inject(() => TokenService)
  private readonly tokenService!: TokenService

  /**
   * Verifica que no exista una asistencia para el estudiante en la fecha dada.
   * @param Student 
   * @param Date
   */
  private readonly verifyExistingAssistence = async (student: Student, date: string | Date): Promise<void> => {
    const assistence = await this.orm.models.StudentAssistenceModel.find({
      student,
      date: {
        $gte: this.dateFormatterAdapter.toGteAndLteDate(date).gte,
        $lte: this.dateFormatterAdapter.toGteAndLteDate(date).lte
      }
    })

    if (assistence.length > 0) throw new StudentAlreadyAssistedError()
  }

  /**
   * Envía una notificación al responsable del estudiante.
   * @param student 
   * @param institutionId 
   */
  private readonly sendNotificationToStudentResponsable = async (student: Student, institutionId: string): Promise<void> => {
    const responsable = await this.studentRepository.getStudentResponsable(student._id, institutionId)
    const tokens = await this.tokenService.getTokensByUserId(responsable._id)

    await this.notificationRepository.sendNotificationsToTokens(
      tokens.map(t => t.token),
      {
        title: 'Asistencia',
        body: `El estudiante ${student.firstName} ${student.lastName} ha asistido a clases`,
      }
    )
  }

  async createAssitence(assistence: StudentAssistenceSchema, institutionId: string): Promise<StudentAssistence> {
    const { studentId, ...assistenceData } = assistence
    const date = this.dateFormatterAdapter.getCurrentDateUTC()
    const institution = await this.institutionService.getActiveInstitution(institutionId)
    const student = await this.studentRepository.getActiveStudent(studentId, institutionId)
    const matricule = await this.matriculeRepository.getActiveMatricule(student._id)

    await this.verifyExistingAssistence(student, date)

    try {
      await this.sendNotificationToStudentResponsable(student, institutionId)
    } catch (error) {
      console.error('Error al enviar notificación de asistencia:', error)
    }

    return {
      ...await this.orm.models.StudentAssistenceModel.create({
        ...assistenceData,
        student,
        matricule,
        institution,
        date
      }),
      student
    }
  }

  async getAllAssitencesByStudent(studentId: string, institutionId: string): Promise<StudentAssistence[]> {
    const student = await this.studentRepository.getActiveStudent(studentId, institutionId)
    return await this.orm.models.StudentAssistenceModel.find({ student })
  }

  async getLastAssitences(institutionId: string): Promise<StudentAssistence[]> {
    return await this.orm.models.StudentAssistenceModel
      .find({
        institution: {
          _id: institutionId
        },
        date: {
          $gte: this.dateFormatterAdapter.toGteAndLteDate().gte,
          $lte: this.dateFormatterAdapter.toGteAndLteDate().lte
        }
      })
      .populate('student')
      .sort({ date: -1 })
      .limit(10)
  }

  async getAssitencesByDate(institutionId: string, date?: string): Promise<StudentAssistence[]> {
    return await this.orm.models.StudentAssistenceModel
      .find({
        institution: {
          _id: institutionId
        },
        date: {
          $gte: this.dateFormatterAdapter.toGteAndLteDate(date).gte,
          $lte: this.dateFormatterAdapter.toGteAndLteDate(date).lte
        }
      })
      .populate('student')
      .sort({ date: -1 })
  }

  async getAssitencesByCourse(institutionId: string, courseId: string, date: string): Promise<StudentAssistence[]> {
    const matricules = await this.matriculeRepository.getMatriculesByCourse(institutionId, courseId)
    const students = matricules.map(matricule => matricule.student)
    return await this.orm.models.StudentAssistenceModel.find({
      student: {
        $in: students
      },
      date: {
        $gte: this.dateFormatterAdapter.toGteAndLteDate(date).gte,
        $lte: this.dateFormatterAdapter.toGteAndLteDate(date).lte
      }
    }).populate('student')
  }
}