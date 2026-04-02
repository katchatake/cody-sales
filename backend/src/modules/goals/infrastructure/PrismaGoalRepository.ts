import { GoalRepository } from "../domain/GoalRepository";
import { Goal } from "../domain/Goal";
import prisma from "../../../config/database";

export class PrismaGoalRepository implements GoalRepository {
    async save(goal: Goal): Promise<Goal> {
        const result = await prisma.goal.create({
            data: {
                promotorId: goal.promotorId,
                target: goal.target,
                month: goal.month,
                year: goal.year
            }
        });
        
        return new Goal(result.id, result.promotorId, result.target, result.month, result.year, result.createdAt, result.updatedAt);
    }

    async findAll(): Promise<Goal[]> {
        const rows = await prisma.goal.findMany({
            orderBy: { createdAt: "desc" }
        });
        
        return rows.map((row: any) => 
            new Goal(row.id, row.promotorId, row.target, row.month, row.year, row.createdAt, row.updatedAt)
        );
    }

    async findByPromotorMonthAndYear(promotorId: number, month: number, year: number): Promise<Goal | null> {
        const row = await prisma.goal.findFirst({
            where: {
                promotorId,
                month,
                year
            }
        });

        if (!row) return null;

        return new Goal(row.id, row.promotorId, row.target, row.month, row.year, row.createdAt, row.updatedAt);
    }
}
