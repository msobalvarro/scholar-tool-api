
export type ResponsablePerson = {
  fullName: string
  identification: string
  email: string | null
  phoneNumber: string
  students: Student[]
}

export type Student = {
  birthday: Date
  startDate: Date
  firstName: string
  lastName: string
  institution: Institution
  status: 'active' | 'inactive'
}

export type Observations = {
  student: Student
  techer: Teacher
  type: 'negative' | 'positive'
  observation: string
  photo?: string
}

export type Devices = {
  token: string
  role: 'responsable' | 'student'
  student?: Student
  responsable?: ResponsablePerson
}

export type Institution = {
  name: string
  logo?: string
  status: 'active' | 'inactive' | 'pending'
  users: UserInstitution[]
  teachers: Teacher[]
}

export type UserInstitution = {
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
}

export type Schedule = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
  time: string
  teacher?: Teacher
  asignature?: Asignature
  course: Course
}

export type Asignature = {
  name: string
  institution: Institution
}

export type Teacher = {
  name: string
  birthday: string
  phoneNumber: string
  email: string
  status: 'active' | 'inactive'
}

export type Course = {
  name: string
  schedules: Schedule[]
  groupName: string
  teacherLead: Teacher
  institution: Institution
  order: number
  breakTime: string
}

export type Matricule = {
  student: Student
  course: Course
  status: 'active' | 'inactive'
  institution: Institution
  year: number
}

export type RootUser = {
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
}

export type Assistance = {
  course: Course
  teacher: Teacher
  date: Date
  observation: string
  studentsPresents: Student[]
  studentsAbsent: Student[]
}
