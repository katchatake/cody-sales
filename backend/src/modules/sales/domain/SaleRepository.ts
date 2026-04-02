import { Sale } from "./Sale";

export interface SaleRepository {
    save(sale: Sale): Promise<Sale>;
    findAll(): Promise<Sale[]>;
    findByPromotorId(promotorId: number): Promise<Sale[]>;
}
