"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGoalUseCase = void 0;
const Goal_1 = require("../domain/Goal");
const boom_1 = require("@hapi/boom");
class CreateGoalUseCase {
    goalRepository;
    constructor(goalRepository) {
        this.goalRepository = goalRepository;
    }
    async execute(data) {
        const existingGoal = await this.goalRepository.findByPromotorMonthAndYear(data.promotorId, data.month, data.year);
        if (existingGoal) {
            throw new boom_1.Boom("Ya existe una meta registrada para este promotor en el mismo mes y año.", { statusCode: 409 });
        }
        const goal = new Goal_1.Goal(null, data.promotorId, data.target, data.month, data.year);
        return this.goalRepository.save(goal);
    }
}
exports.CreateGoalUseCase = CreateGoalUseCase;
