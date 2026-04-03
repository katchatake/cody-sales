"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSaleRepository = void 0;
const Sale_1 = require("../domain/Sale");
const database_1 = __importDefault(require("../../../config/database"));
class PrismaSaleRepository {
    async save(sale) {
        const result = await database_1.default.sale.create({
            data: {
                promotorId: sale.promotorId,
                productId: sale.productId,
                quantity: sale.quantity,
                total: sale.total
            },
            include: { product: true }
        });
        return new Sale_1.Sale(result.id, result.promotorId, result.productId, result.quantity, result.total, result.saleDate, result.createdAt, result.product);
    }
    async saveMany(sales) {
        const results = await database_1.default.$transaction(sales.map((sale) => database_1.default.sale.create({
            data: {
                promotorId: sale.promotorId,
                productId: sale.productId,
                quantity: sale.quantity,
                total: sale.total
            },
            include: { product: true }
        })));
        return results.map((result) => new Sale_1.Sale(result.id, result.promotorId, result.productId, result.quantity, result.total, result.saleDate, result.createdAt, result.product));
    }
    async findAll() {
        const rows = await database_1.default.sale.findMany({
            orderBy: { createdAt: "desc" },
            include: { product: true }
        });
        return rows.map((row) => new Sale_1.Sale(row.id, row.promotorId, row.productId, row.quantity, row.total, row.saleDate, row.createdAt, row.product));
    }
    async findByPromotorId(promotorId) {
        const rows = await database_1.default.sale.findMany({
            where: { promotorId },
            orderBy: { createdAt: "desc" },
            include: { product: true }
        });
        return rows.map((row) => new Sale_1.Sale(row.id, row.promotorId, row.productId, row.quantity, row.total, row.saleDate, row.createdAt, row.product));
    }
}
exports.PrismaSaleRepository = PrismaSaleRepository;
