export interface IAuthRepository {
  loginUserRoot(email: string, password: string): Promise<{ user: any; token: string }>
  loginUserInstitution(email: string, password: string): Promise<{ user: any; token: string; institution: any }>
  loginTeacher(email: string, password: string): Promise<{ teacher: any; token: string; institution: any }>
}
