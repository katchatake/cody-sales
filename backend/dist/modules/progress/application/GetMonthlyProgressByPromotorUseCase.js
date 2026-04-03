"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMonthlyProgressByPromotorUseCase = void 0;
class GetMonthlyProgressByPromotorUseCase {
    progressRepository;
    constructor(progressRepository) {
        this.progressRepository = progressRepository;
    }
    async execute(promotorId, month, year) {
        return this.progressRepository.getMonthlyProgressByPromotorId(promotorId, month, year);
    }
}
exports.GetMonthlyProgressByPromotorUseCase = GetMonthlyProgressByPromotorUseCase;
