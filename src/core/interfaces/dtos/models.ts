
export type ResponsablePerson = {
  fullName: string
  identification: string
  email: string | null
  phoneNumber: string
  direction: string
  isEmergencyContact: boolean
  type: 'father' | 'mother' | 'grandfather' | 'uncle' | 'other'
}

export type Student = {
  _id?: any
  birthday: Date
  firstName: string
  lastName: string
  institution: Institution
  status: 'active' | 'inactive'
  gender: 'male' | 'female'
  photo?: string
  email?: string
  responsable?: ResponsablePerson
}

export type Observations = {
  student: Student
  teacher: Teacher
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
  _id?: string
  name: string
  logo?: string
  status: 'active' | 'inactive' | 'pending'
}

export type UserInstitution = {
  _id?: string
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
  institution: Institution
  lastLogin: Date
}

export type Schedule = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
  time: string
  teacher?: Teacher
  asignature?: Asignature
  course: Course
}

export type Asignature = {
  _id?: string
  name: string
  description: string
  status: 'active' | 'inactive'
  institution: Institution
}

export type Teacher = {
  _id?: any
  name: string
  birthday: string
  phoneNumber: string
  email: string
  status: 'active' | 'inactive'
  institution: Institution
  photo?: string
}

export type TeacherAuth = {
  teacher: Teacher
  lastLogin: Date
  password: string
}

export type Course = {
  _id?: any
  name: string
  schedules: Schedule[]
  groupName: string
  teacherLead: Teacher
  institution: Institution
  order: number
  breakTime: string
  maxCapacity: number
}

export type Matricule = {
  _id?: any
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
  lastLogin: Date
}

export type Assistance = {
  course: Course
  teacher: Teacher
  date: Date
  observation: string
  studentsPresents: Student[]
  studentsAbsent: Student[]
}

export type Notifications = {
  title: string
  body: string
  responsablePerson: ResponsablePerson
  readed: boolean
  deleted: boolean
  institution: Institution
}

export type Token = {
  token: string
  role: 'responsable' | 'student'
  student?: Student
  responsable?: ResponsablePerson
  institution: Institution
}

export type Period = {
  _id?: any
  name: string
  startDate: Date
  endDate: Date
  institution: Institution
}

export type Task = {
  institution: Institution
  period: Period
  teacher: Teacher
  course: Course
  asignature: Asignature
  name: string
  description: string
  status: 'pending' | 'completed' | 'unfulfilled' | 'incomplete'
  highestScore: number
  score: number | null
  dueDate: Date
}