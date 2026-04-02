import { Request, Response } from "express";
import { CreateSaleUseCase } from "../application/CreateSaleUseCase";
import { PrismaSaleRepository } from "./PrismaSaleRepository";

export class SaleController {
    async createSale(req: Request, res: Response): Promise<void> {
        const { productId, quantity, total } = req.body;
        // As defined in the tech plan, extracting the promotorId explicitly from the active token
        const promotorId = (req as any).user.id;
        
        const repository = new PrismaSaleRepository();
        const useCase = new CreateSaleUseCase(repository);
        
        const sale = await useCase.execute({ promotorId, productId, quantity, total });
        res.status(201).json({ data: sale });
    }

    async getSales(req: Request, res: Response): Promise<void> {
        const repository = new PrismaSaleRepository();
        const { GetAllSalesUseCase } = await import("../application/GetAllSalesUseCase");
        const useCase = new GetAllSalesUseCase(repository);
        const sales = await useCase.execute();
        res.status(200).json({ data: sales });
    }

    async getSalesByUser(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id as string, 10);
        const repository = new PrismaSaleRepository();
        const { GetSalesByPromotorUseCase } = await import("../application/GetSalesByPromotorUseCase");
        const useCase = new GetSalesByPromotorUseCase(repository);
        const sales = await useCase.execute(userId);
        res.status(200).json({ data: sales });
    }
}
