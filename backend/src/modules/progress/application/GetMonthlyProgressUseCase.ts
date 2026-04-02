import { ProgressRepository } from "../domain/ProgressRepository";
import { Progress } from "../domain/Progress";

export class GetMonthlyProgressUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute(month: number, year: number): Promise<Progress[]> {
        return this.progressRepository.getMonthlyProgress(month, year);
    }
}
