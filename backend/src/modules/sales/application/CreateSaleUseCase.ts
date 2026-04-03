import { SaleRepository } from "../domain/SaleRepository";
import { Sale } from "../domain/Sale";

export class CreateSaleUseCase {
    constructor(private saleRepository: SaleRepository) { }

    async execute(data: { promotorId: number; productId: number; quantity: number; total: number }): Promise<Sale> {
        const sale = new Sale(null, data.promotorId, data.productId, data.quantity, data.total);
        return this.saleRepository.save(sale);
    }
}
