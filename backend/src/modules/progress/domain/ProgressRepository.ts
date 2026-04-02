import { Progress } from "./Progress";

export interface ProgressRepository {
    getMonthlyProgress(month: number, year: number): Promise<Progress[]>;
    getMonthlyProgressByPromotorId(promotorId: number, month: number, year: number): Promise<Progress | null>;
}
