import { Request, Response } from "express";
import { GetPromotorsUseCase } from "../application/GetPromotorsUseCase";
import { PrismaUserSummaryRepository } from "./PrismaUserSummaryRepository";

export class UserController {
    async getPromotors(req: Request, res: Response): Promise<void> {
        const repository = new PrismaUserSummaryRepository();
        const useCase = new GetPromotorsUseCase(repository);

        const promotors = await useCase.execute();
        res.status(200).json({ data: promotors });
    }
}
