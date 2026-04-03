"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaGoalRepository = void 0;
const Goal_1 = require("../domain/Goal");
const database_1 = __importDefault(require("../../../config/database"));
class PrismaGoalRepository {
    async save(goal) {
        const result = await database_1.default.goal.create({
            data: {
                promotorId: goal.promotorId,
                target: goal.target,
                month: goal.month,
                year: goal.year
            }
        });
        return new Goal_1.Goal(result.id, result.promotorId, result.target, result.month, result.year, result.createdAt, result.updatedAt);
    }
    async findAll() {
        const rows = await database_1.default.goal.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                promotor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        });
        return rows.map((row) => new Goal_1.Goal(row.id, row.promotorId, row.target, row.month, row.year, row.createdAt, row.updatedAt, row.promotor));
    }
    async findByPromotorMonthAndYear(promotorId, month, year) {
        const row = await database_1.default.goal.findFirst({
            where: {
                promotorId,
                month,
                year
            }
        });
        if (!row)
            return null;
        return new Goal_1.Goal(row.id, row.promotorId, row.target, row.month, row.year, row.createdAt, row.updatedAt);
    }
}
exports.PrismaGoalRepository = PrismaGoalRepository;
