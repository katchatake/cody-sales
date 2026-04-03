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
        const sales = data.map((item) => new Sale_1.Sale(null, item.promotorId, item.productId, item.quantity, item.total));
        return this.saleRepository.saveMany(sales);
    }
}
exports.CreateSaleUseCase = CreateSaleUseCase;
