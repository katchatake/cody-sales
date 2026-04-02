import { SaleRepository } from "../domain/SaleRepository";
import { Sale } from "../domain/Sale";

export class GetSalesByPromotorUseCase {
    constructor(private saleRepository: SaleRepository) {}

    async execute(promotorId: number): Promise<Sale[]> {
        return this.saleRepository.findByPromotorId(promotorId);
    }
}
