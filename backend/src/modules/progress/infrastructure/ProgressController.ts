import { Request, Response } from "express";
import { PrismaProgressRepository } from "./PrismaProgressRepository";
import { GetMonthlyProgressUseCase } from "../application/GetMonthlyProgressUseCase";

export class ProgressController {
    async getProgress(req: Request, res: Response): Promise<void> {
        const now = new Date();
        const month = req.query.month ? parseInt(req.query.month as string, 10) : (now.getMonth() + 1);
        const year = req.query.year ? parseInt(req.query.year as string, 10) : now.getFullYear();

        const repository = new PrismaProgressRepository();
        const useCase = new GetMonthlyProgressUseCase(repository);
        
        const progress = await useCase.execute(month, year);
        res.status(200).json({ data: progress });
    }

    async getProgressByPromotor(req: Request, res: Response): Promise<void> {
        const promotorId = parseInt(req.params.id as string, 10);
        const now = new Date();
        const month = req.query.month ? parseInt(req.query.month as string, 10) : (now.getMonth() + 1);
        const year = req.query.year ? parseInt(req.query.year as string, 10) : now.getFullYear();

        const repository = new PrismaProgressRepository();
        const { GetMonthlyProgressByPromotorUseCase } = await import("../application/GetMonthlyProgressByPromotorUseCase");
        const useCase = new GetMonthlyProgressByPromotorUseCase(repository);
        
        const progress = await useCase.execute(promotorId, month, year);
        res.status(200).json({ data: progress });
    }
}
