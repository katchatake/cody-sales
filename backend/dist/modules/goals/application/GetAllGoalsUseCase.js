"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllGoalsUseCase = void 0;
class GetAllGoalsUseCase {
    goalRepository;
    constructor(goalRepository) {
        this.goalRepository = goalRepository;
    }
    async execute() {
        return this.goalRepository.findAll();
    }
}
exports.GetAllGoalsUseCase = GetAllGoalsUseCase;
