"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSalesByPromotorUseCase = void 0;
class GetSalesByPromotorUseCase {
    saleRepository;
    constructor(saleRepository) {
        this.saleRepository = saleRepository;
    }
    async execute(promotorId) {
        return this.saleRepository.findByPromotorId(promotorId);
    }
}
exports.GetSalesByPromotorUseCase = GetSalesByPromotorUseCase;
