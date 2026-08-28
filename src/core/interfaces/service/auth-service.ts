import { Institution, Teacher, UserInstitution, UserRoot } from '../dtos';

export interface IAuthRepository {
  loginUserRoot(email: string, password: string): Promise<{ user: UserRoot; token: string }>
  loginUserInstitution(email: string, password: string): Promise<{ user: UserInstitution; token: string; institution: Institution }>
  loginTeacher(email: string, password: string): Promise<{ teacher: Teacher; token: string; institution: Institution }>
}
