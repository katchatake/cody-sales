import { Request, Response } from "express";
import { PrismaProductRepository } from "./PrismaProductRepository";
import { GetAllProductsUseCase } from "../application/GetAllProductsUseCase";

export class ProductController {
    async getProducts(req: Request, res: Response): Promise<void> {
        const repository = new PrismaProductRepository();
        const useCase = new GetAllProductsUseCase(repository);
        const products = await useCase.execute();

        res.status(200).json({ data: products });
    }
}
