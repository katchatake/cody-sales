"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCategoriesUseCase = void 0;
class GetAllCategoriesUseCase {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute() {
        return this.categoryRepository.findAll();
    }
}
exports.GetAllCategoriesUseCase = GetAllCategoriesUseCase;
