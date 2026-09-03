import { IDailyClosureDto } from '../dtos/daily-closures';

export interface IDailyClosuresService {
  create(institutionId: string, userId: string): Promise<IDailyClosureDto>
  getDailyClosuresByDate(institutionId: string, from?: string, to?: string): Promise<IDailyClosureDto[]>
}