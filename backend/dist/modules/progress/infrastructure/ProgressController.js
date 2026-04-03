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
exports.ProgressController = void 0;
const PrismaProgressRepository_1 = require("./PrismaProgressRepository");
const GetMonthlyProgressUseCase_1 = require("../application/GetMonthlyProgressUseCase");
class ProgressController {
    async getProgress(req, res) {
        const now = new Date();
        const month = req.query.month ? parseInt(req.query.month, 10) : (now.getMonth() + 1);
        const year = req.query.year ? parseInt(req.query.year, 10) : now.getFullYear();
        const repository = new PrismaProgressRepository_1.PrismaProgressRepository();
        const useCase = new GetMonthlyProgressUseCase_1.GetMonthlyProgressUseCase(repository);
        const progress = await useCase.execute(month, year);
        res.status(200).json({ data: progress });
    }
    async getProgressByPromotor(req, res) {
        const promotorId = parseInt(req.params.id, 10);
        const now = new Date();
        const month = req.query.month ? parseInt(req.query.month, 10) : (now.getMonth() + 1);
        const year = req.query.year ? parseInt(req.query.year, 10) : now.getFullYear();
        const repository = new PrismaProgressRepository_1.PrismaProgressRepository();
        const { GetMonthlyProgressByPromotorUseCase } = await Promise.resolve().then(() => __importStar(require("../application/GetMonthlyProgressByPromotorUseCase")));
        const useCase = new GetMonthlyProgressByPromotorUseCase(repository);
        const progress = await useCase.execute(promotorId, month, year);
        res.status(200).json({ data: progress });
    }
}
exports.ProgressController = ProgressController;
