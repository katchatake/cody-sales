"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCategoryRepository = void 0;
const Category_1 = require("../domain/Category");
const database_1 = __importDefault(require("../../../config/database"));
class PrismaCategoryRepository {
    async findAll() {
        const rows = await database_1.default.category.findMany({
            orderBy: { name: "asc" }
        });
        return rows.map((row) => new Category_1.Category(row.id, row.name, row.description, row.createdAt, row.updatedAt));
    }
}
exports.PrismaCategoryRepository = PrismaCategoryRepository;
