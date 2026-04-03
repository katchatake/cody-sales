import { Request, Response } from "express";
import { CreateSaleUseCase } from "../application/CreateSaleUseCase";
import { PrismaSaleRepository } from "./PrismaSaleRepository";
import { GoalAchievedService } from "../../goals/application/GoalAchievedService";

export class SaleController {
  async createSale(req: Request, res: Response): Promise<void> {
    const { items } = req.body;
    const promotorId = (req as any).user.id;

    const repository = new PrismaSaleRepository();
    const useCase = new CreateSaleUseCase(repository);

    const sales = await useCase.execute(
      items.map((item: { productId: number; quantity: number; total: number }) => ({
        promotorId,
        productId: item.productId,
        quantity: item.quantity,
        total: item.total,
      })),
    );

    const milestones = await GoalAchievedService.checkMilestones(
      promotorId,
      sales[sales.length - 1]?.saleDate || new Date(),
    );

    if (milestones.length > 0) {
      const maxMilestone = Math.max(...milestones);
      const textGoal =
        maxMilestone === 100
          ? "¡Felicidades! Has alcanzado el 100% de tu meta."
          : `¡Felicidades! Has alcanzado el ${maxMilestone}% de tu meta.`;
      res.setHeader("x-process-goal", textGoal);
    }

    res.status(201).json({ data: sales });
  }

  async getSales(req: Request, res: Response): Promise<void> {
    const repository = new PrismaSaleRepository();
    const { GetAllSalesUseCase } =
      await import("../application/GetAllSalesUseCase");
    const useCase = new GetAllSalesUseCase(repository);
    const sales = await useCase.execute();
    res.status(200).json({ data: sales });
  }

  async getSalesByUser(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id as string, 10);
    const repository = new PrismaSaleRepository();
    const { GetSalesByPromotorUseCase } =
      await import("../application/GetSalesByPromotorUseCase");
    const useCase = new GetSalesByPromotorUseCase(repository);
    const sales = await useCase.execute(userId);
    res.status(200).json({ data: sales });
  }
}
