import { SaleRepository } from "../domain/SaleRepository";
import { Sale } from "../domain/Sale";

export class GetAllSalesUseCase {
    constructor(private saleRepository: SaleRepository) {}

    async execute(): Promise<Sale[]> {
        return this.saleRepository.findAll();
    }
}
