export type ResponsablePerson = {
  _id: string
  fullName: string
  identification: string
  email: string | null
  phoneNumber: string
  direction: string
  isEmergencyContact: boolean
  type: 'father' | 'mother' | 'grandfather' | 'uncle' | 'other'
}
