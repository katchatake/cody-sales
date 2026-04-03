"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllSalesUseCase = void 0;
class GetAllSalesUseCase {
    saleRepository;
    constructor(saleRepository) {
        this.saleRepository = saleRepository;
    }
    async execute() {
        return this.saleRepository.findAll();
    }
}
exports.GetAllSalesUseCase = GetAllSalesUseCase;
