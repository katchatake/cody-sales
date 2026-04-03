"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleController = void 0;
const CreateSaleUseCase_1 = require("../application/CreateSaleUseCase");
const PrismaSaleRepository_1 = require("./PrismaSaleRepository");
const GoalAchievedService_1 = require("../../goals/application/GoalAchievedService");
class SaleController {
    async createSale(req, res) {
        const { items } = req.body;
        const promotorId = req.user.id;
        const repository = new PrismaSaleRepository_1.PrismaSaleRepository();
        const useCase = new CreateSaleUseCase_1.CreateSaleUseCase(repository);
        const sales = await useCase.execute(items.map((item) => ({
            promotorId,
            productId: item.productId,
            quantity: item.quantity,
            total: item.total,
        })));
        const milestones = await GoalAchievedService_1.GoalAchievedService.checkMilestones(promotorId, sales[sales.length - 1]?.saleDate || new Date());
        if (milestones.length > 0) {
            const maxMilestone = Math.max(...milestones);
            const textGoal = maxMilestone === 100
                ? "¡Felicidades! Has alcanzado el 100% de tu meta."
                : `¡Felicidades! Has alcanzado el ${maxMilestone}% de tu meta.`;
            res.setHeader("x-process-goal", textGoal);
        }
        res.status(201).json({ data: sales });
    }
    async getSales(req, res) {
        const repository = new PrismaSaleRepository_1.PrismaSaleRepository();
        const { GetAllSalesUseCase } = await Promise.resolve().then(() => __importStar(require("../application/GetAllSalesUseCase")));
        const useCase = new GetAllSalesUseCase(repository);
        const sales = await useCase.execute();
        res.status(200).json({ data: sales });
    }
    async getSalesByUser(req, res) {
        const userId = parseInt(req.params.id, 10);
        const repository = new PrismaSaleRepository_1.PrismaSaleRepository();
        const { GetSalesByPromotorUseCase } = await Promise.resolve().then(() => __importStar(require("../application/GetSalesByPromotorUseCase")));
        const useCase = new GetSalesByPromotorUseCase(repository);
        const sales = await useCase.execute(userId);
        res.status(200).json({ data: sales });
    }
}
exports.SaleController = SaleController;
