import { ProductRepository } from "../domain/ProductRepository";
import { Product } from "../domain/Product";

export class GetAllProductsUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(): Promise<Product[]> {
        return this.productRepository.getAll();
    }
}
