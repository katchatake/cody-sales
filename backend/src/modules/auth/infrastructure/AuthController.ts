import { Request, Response } from "express";
import { LoginUseCase } from "../application/LoginUseCase";
import { PrismaUserRepository } from "./PrismaUserRepository";

export class AuthController {
    constructor() {}

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        
        const repository = new PrismaUserRepository();
        const useCase = new LoginUseCase(repository);
        
        const result = await useCase.execute({ email, password });
        res.status(200).json(result);
    }
}
