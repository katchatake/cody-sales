"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSaleUseCase = void 0;
const Sale_1 = require("../domain/Sale");
class CreateSaleUseCase {
    saleRepository;
    constructor(saleRepository) {
        this.saleRepository = saleRepository;
    }
    async execute(data) {
        const sale = new Sale_1.Sale(null, data.promotorId, data.productId, data.quantity, data.total);
        return this.saleRepository.save(sale);
    }
}
exports.CreateSaleUseCase = CreateSaleUseCase;
