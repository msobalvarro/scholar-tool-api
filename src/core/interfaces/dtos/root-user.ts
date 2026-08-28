export type UserRoot = {
  name: string
  email: string
  password: string
  status: 'active' | 'inactive'
  lastLogin: Date
}
