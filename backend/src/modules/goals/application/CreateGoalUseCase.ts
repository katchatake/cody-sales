import { GoalRepository } from "../domain/GoalRepository";
import { Goal } from "../domain/Goal";
import { Boom } from "@hapi/boom";

export class CreateGoalUseCase {
    constructor(private goalRepository: GoalRepository) {}

    async execute(data: { promotorId: number; target: number; month: number; year: number }): Promise<Goal> {
        const existingGoal = await this.goalRepository.findByPromotorMonthAndYear(data.promotorId, data.month, data.year);
        if (existingGoal) {
            throw new Boom("Ya existe una meta registrada para este promotor en el mismo mes y año.", { statusCode: 409 });
        }

        const goal = new Goal(null, data.promotorId, data.target, data.month, data.year);
        return this.goalRepository.save(goal);
    }
}
