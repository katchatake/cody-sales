import { SaleRepository } from "../domain/SaleRepository";
import { Sale } from "../domain/Sale";

export class CreateSaleUseCase {
    constructor(private saleRepository: SaleRepository) { }

    async execute(data: { promotorId: number; productId: number; quantity: number; total: number }[]): Promise<Sale[]> {
        const sales = data.map((item) =>
            new Sale(null, item.promotorId, item.productId, item.quantity, item.total)
        );

        return this.saleRepository.saveMany(sales);
    }
}
