import * as crypto from 'crypto'

export const createHash = (data: string): string => crypto.createHash('sha256').update(data).digest('hex')