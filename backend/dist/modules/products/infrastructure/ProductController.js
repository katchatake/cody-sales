"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const PrismaProductRepository_1 = require("./PrismaProductRepository");
const GetAllProductsUseCase_1 = require("../application/GetAllProductsUseCase");
class ProductController {
    async getProducts(req, res) {
        const repository = new PrismaProductRepository_1.PrismaProductRepository();
        const useCase = new GetAllProductsUseCase_1.GetAllProductsUseCase(repository);
        const products = await useCase.execute();
        res.status(200).json({ data: products });
    }
}
exports.ProductController = ProductController;
