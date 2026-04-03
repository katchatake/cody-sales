"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMonthlyProgressUseCase = void 0;
class GetMonthlyProgressUseCase {
    progressRepository;
    constructor(progressRepository) {
        this.progressRepository = progressRepository;
    }
    async execute(month, year) {
        return this.progressRepository.getMonthlyProgress(month, year);
    }
}
exports.GetMonthlyProgressUseCase = GetMonthlyProgressUseCase;
