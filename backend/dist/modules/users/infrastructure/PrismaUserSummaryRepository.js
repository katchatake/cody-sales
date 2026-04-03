"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserSummaryRepository = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const UserSummary_1 = require("../domain/UserSummary");
class PrismaUserSummaryRepository {
    async findPromotors() {
        const rows = await database_1.default.user.findMany({
            where: { role: "PROMOTOR" },
            orderBy: { name: "asc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });
        return rows.map((row) => new UserSummary_1.UserSummary(row.id, row.name, row.email, row.role, row.createdAt));
    }
}
exports.PrismaUserSummaryRepository = PrismaUserSummaryRepository;
