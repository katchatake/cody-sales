"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductRepository = void 0;
const Product_1 = require("../domain/Product");
const database_1 = __importDefault(require("../../../config/database"));
class PrismaProductRepository {
    async getAll() {
        const products = await database_1.default.product.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return products.map(p => new Product_1.Product(p.id, p.name, p.price, p.categoryId, p.createdAt, p.updatedAt, p.category));
    }
}
exports.PrismaProductRepository = PrismaProductRepository;
