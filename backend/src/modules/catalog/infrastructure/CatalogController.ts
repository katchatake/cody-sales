import { Request, Response } from "express";
import { GetAllCategoriesUseCase } from "../application/GetAllCategoriesUseCase";
import { PrismaCategoryRepository } from "./PrismaCategoryRepository";

export class CatalogController {
    async getCategories(req: Request, res: Response): Promise<void> {
        const repository = new PrismaCategoryRepository();
        const useCase = new GetAllCategoriesUseCase(repository);
        
        const categories = await useCase.execute();
        res.status(200).json({ data: categories });
    }
}
