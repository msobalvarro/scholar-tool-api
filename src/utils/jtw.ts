import { jwt } from 'hono/jwt'
import { environments } from './constanst'


export const jwtUserRoot = jwt({ secret: environments.JWT_SECRET_ADMIN })
export const jwtUserInstitution = jwt({ secret: environments.JWT_SECRET_USER_INSTITUTION })
export const jwtUserTeacher = jwt({ secret: environments.JWT_SECRET_USER_TEACHER })
export const jwtUserStudent = jwt({ secret: environments.JWT_SECRET_USER_STUDENT })
export const jwtUserResponsable = jwt({ secret: environments.JWT_SECRET_USER_RESPONSABLE })