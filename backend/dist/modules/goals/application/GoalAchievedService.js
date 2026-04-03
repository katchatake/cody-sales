"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalAchievedService = void 0;
const PrismaProgressRepository_1 = require("../../progress/infrastructure/PrismaProgressRepository");
const GetMonthlyProgressByPromotorUseCase_1 = require("../../progress/application/GetMonthlyProgressByPromotorUseCase");
const database_1 = __importDefault(require("../../../config/database"));
class GoalAchievedService {
    /**
     * Revisa y guarda sincrónicamente en DB si la última venta rompió un nuevo hito.
     * Retorna un arreglo numérico con los hitos consolidados recién ganados (ej: [50]).
     */
    static async checkMilestones(promotorId, saleDate) {
        let milestonesAchieved = [];
        try {
            const month = saleDate.getMonth() + 1; // 1-12
            const year = saleDate.getFullYear();
            const repo = new PrismaProgressRepository_1.PrismaProgressRepository();
            const progressUseCase = new GetMonthlyProgressByPromotorUseCase_1.GetMonthlyProgressByPromotorUseCase(repo);
            const progress = await progressUseCase.execute(promotorId, month, year);
            if (!progress)
                return milestonesAchieved;
            const nuevoProgreso = progress.percentage;
            const hitos = [50, 80, 100];
            const startOfMonth = new Date(year, month - 1, 1);
            const startOfNextMonth = new Date(year, month, 1);
            for (const umbral of hitos) {
                if (nuevoProgreso >= umbral) {
                    // ¿Ya tiene registrado este string "50" en este mes?
                    const existing = await database_1.default.goalAchieved.findFirst({
                        where: {
                            promotorId,
                            typeHito: umbral.toString(),
                            dateCreated: {
                                gte: startOfMonth,
                                lt: startOfNextMonth
                            }
                        }
                    });
                    if (!existing) {
                        // Guardado efectivo
                        await database_1.default.goalAchieved.create({
                            data: {
                                promotorId,
                                typeHito: umbral.toString()
                            }
                        });
                        console.log(`[Sales-Goal-Cross] 🏆 Hito Automático: ¡Alcanzado el ${umbral}%!`);
                        milestonesAchieved.push(umbral);
                    }
                }
            }
        }
        catch (err) {
            console.error("[Sales-Goal-Cross] Error validando Goals:", err);
        }
        return milestonesAchieved;
    }
}
exports.GoalAchievedService = GoalAchievedService;
