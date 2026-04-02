import { Goal } from "./Goal";

export interface GoalRepository {
    save(goal: Goal): Promise<Goal>;
    findAll(): Promise<Goal[]>;
    findByPromotorMonthAndYear(promotorId: number, month: number, year: number): Promise<Goal | null>;
}
