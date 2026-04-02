import { CategoryRepository } from "../domain/CategoryRepository";
import { Category } from "../domain/Category";

export class GetAllCategoriesUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }
}
