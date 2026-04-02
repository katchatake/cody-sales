import { GoalRepository } from "../domain/GoalRepository";
import { Goal } from "../domain/Goal";

export class GetAllGoalsUseCase {
    constructor(private goalRepository: GoalRepository) {}

    async execute(): Promise<Goal[]> {
        return this.goalRepository.findAll();
    }
}
