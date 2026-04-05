import { Request, Response } from "express";
import { CreateGoalUseCase } from "../application/CreateGoalUseCase";
import { PrismaGoalRepository } from "./PrismaGoalRepository";

export class GoalController {
    async createGoal(req: Request, res: Response): Promise<void> {
        const { promotorId, target, month, year } = req.body;
        
        const repository = new PrismaGoalRepository();
        const useCase = new CreateGoalUseCase(repository);
        
        const goal = await useCase.execute({ promotorId, target, month, year });
        res.status(201).json({ data: goal });
    }

    async getGoals(req: Request, res: Response): Promise<void> {
        const repository = new PrismaGoalRepository();
        const { GetAllGoalsUseCase } = await import("../application/GetAllGoalsUseCase");
        const useCase = new GetAllGoalsUseCase(repository);
        
        const goals = await useCase.execute();
        res.status(200).json({ data: goals });
    }
}
