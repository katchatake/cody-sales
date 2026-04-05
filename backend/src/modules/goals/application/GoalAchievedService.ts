import { PrismaProgressRepository } from "../../progress/infrastructure/PrismaProgressRepository";
import { GetMonthlyProgressByPromotorUseCase } from "../../progress/application/GetMonthlyProgressByPromotorUseCase";
import prisma from "../../../config/database";

export class GoalAchievedService {
    static async checkMilestones(promotorId: number, saleDate: Date): Promise<number[]> {
        const milestonesAchieved: number[] = [];

        try {
            const month = saleDate.getMonth() + 1;
            const year = saleDate.getFullYear();

            const repo = new PrismaProgressRepository();
            const progressUseCase = new GetMonthlyProgressByPromotorUseCase(repo);

            const progress = await progressUseCase.execute(promotorId, month, year);
            if (!progress) return milestonesAchieved;

            const nuevoProgreso = progress.percentage;
            const hitos = [50, 80, 100];

            const startOfMonth = new Date(year, month - 1, 1);
            const startOfNextMonth = new Date(year, month, 1);

            for (const umbral of hitos) {
                if (nuevoProgreso >= umbral) {
                    const existing = await prisma.goalAchieved.findFirst({
                        where: {
                            promotorId,
                            typeHito: umbral.toString(),
                            dateCreated: {
                                gte: startOfMonth,
                                lt: startOfNextMonth
                            }
                        }
                    });

                    if (!existing) {
                        await prisma.goalAchieved.create({
                            data: {
                                promotorId,
                                typeHito: umbral.toString()
                            }
                        });
                        milestonesAchieved.push(umbral);
                    }
                }
            }

        } catch (err) {
            console.error("[Sales-Goal-Cross] Error validando Goals:", err);
        }

        return milestonesAchieved;
    }
}
