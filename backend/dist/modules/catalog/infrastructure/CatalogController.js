"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogController = void 0;
const GetAllCategoriesUseCase_1 = require("../application/GetAllCategoriesUseCase");
const PrismaCategoryRepository_1 = require("./PrismaCategoryRepository");
class CatalogController {
    async getCategories(req, res) {
        const repository = new PrismaCategoryRepository_1.PrismaCategoryRepository();
        const useCase = new GetAllCategoriesUseCase_1.GetAllCategoriesUseCase(repository);
        const categories = await useCase.execute();
        res.status(200).json({ data: categories });
    }
}
exports.CatalogController = CatalogController;
