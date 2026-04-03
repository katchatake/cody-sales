"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProgressRepository = void 0;
const Progress_1 = require("../domain/Progress");
const database_1 = __importDefault(require("../../../config/database"));
class PrismaProgressRepository {
    async getMonthlyProgress(month, year) {
        const goals = await database_1.default.goal.findMany({
            where: {
                month,
                year,
                promotor: {
                    role: "PROMOTOR"
                }
            },
            include: { promotor: true }
        });
        // month is 1-indexed for the user, 0-indexed in JS Date
        const startOfMonth = new Date(year, month - 1, 1);
        const startOfNextMonth = new Date(year, month, 1);
        const salesSummaries = await database_1.default.sale.groupBy({
            by: ["promotorId"],
            where: {
                saleDate: {
                    gte: startOfMonth,
                    lt: startOfNextMonth
                }
            },
            _sum: { total: true }
        });
        return goals.map((g) => {
            const saleSummary = salesSummaries.find((s) => s.promotorId === g.promotorId);
            const totalSold = saleSummary?._sum.total || 0;
            const percentage = g.target > 0 ? (totalSold / g.target) * 100 : 0;
            return new Progress_1.Progress(g.promotorId, g.promotor.name, totalSold, g.target, parseFloat(percentage.toFixed(2)) // Round to 2 decimals cleanly
            );
        });
    }
    async getMonthlyProgressByPromotorId(promotorId, month, year) {
        const goal = await database_1.default.goal.findFirst({
            where: {
                promotorId,
                month,
                year,
                promotor: {
                    role: "PROMOTOR"
                }
            },
            include: { promotor: true }
        });
        if (!goal)
            return null;
        const startOfMonth = new Date(year, month - 1, 1);
        const startOfNextMonth = new Date(year, month, 1);
        const salesSummaries = await database_1.default.sale.aggregate({
            where: {
                promotorId,
                saleDate: {
                    gte: startOfMonth,
                    lt: startOfNextMonth
                }
            },
            _sum: { total: true }
        });
        const totalSold = salesSummaries._sum.total || 0;
        const percentage = goal.target > 0 ? (totalSold / goal.target) * 100 : 0;
        return new Progress_1.Progress(goal.promotorId, goal.promotor.name, totalSold, goal.target, parseFloat(percentage.toFixed(2)));
    }
}
exports.PrismaProgressRepository = PrismaProgressRepository;
