import { ProgressRepository } from "../domain/ProgressRepository";
import { Progress } from "../domain/Progress";
import prisma from "../../../config/database";

export class PrismaProgressRepository implements ProgressRepository {
    async getMonthlyProgress(month: number, year: number): Promise<Progress[]> {
        const goals = await prisma.goal.findMany({
            where: {
                month,
                year,
                promotor: {
                    role: "PROMOTOR"
                }
            },
            include: { promotor: true }
        });

        const startOfMonth = new Date(year, month - 1, 1);
        const startOfNextMonth = new Date(year, month, 1);

        const salesSummaries = await prisma.sale.groupBy({
            by: ["promotorId"],
            where: { 
                saleDate: { 
                    gte: startOfMonth, 
                    lt: startOfNextMonth 
                } 
            },
            _sum: { total: true }
        });

        return goals.map((g: any) => {
            const saleSummary = salesSummaries.find((s: any) => s.promotorId === g.promotorId);
            const totalSold = saleSummary?._sum.total || 0;
            const percentage = g.target > 0 ? (totalSold / g.target) * 100 : 0;
            
            return new Progress(
                g.promotorId,
                g.promotor.name,
                totalSold,
                g.target,
                parseFloat(percentage.toFixed(2))
            );
        });
    }

    async getMonthlyProgressByPromotorId(promotorId: number, month: number, year: number): Promise<Progress | null> {
        const goal = await prisma.goal.findFirst({
            where: {
                promotorId,
                month,
                year,
                promotor: {
                    role: "PROMOTOR"
                }
            },
            include: { promotor: true }
        });

        if (!goal) return null;

        const startOfMonth = new Date(year, month - 1, 1);
        const startOfNextMonth = new Date(year, month, 1);

        const salesSummaries = await prisma.sale.aggregate({
            where: { 
                promotorId,
                saleDate: { 
                    gte: startOfMonth, 
                    lt: startOfNextMonth 
                } 
            },
            _sum: { total: true }
        });

        const totalSold = salesSummaries._sum.total || 0;
        const percentage = goal.target > 0 ? (totalSold / goal.target) * 100 : 0;
        
        return new Progress(
            goal.promotorId,
            goal.promotor.name,
            totalSold,
            goal.target,
            parseFloat(percentage.toFixed(2))
        );
    }
}
