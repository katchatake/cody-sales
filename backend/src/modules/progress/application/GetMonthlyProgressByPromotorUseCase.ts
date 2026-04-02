import { ProgressRepository } from "../domain/ProgressRepository";
import { Progress } from "../domain/Progress";

export class GetMonthlyProgressByPromotorUseCase {
    constructor(private progressRepository: ProgressRepository) {}

    async execute(promotorId: number, month: number, year: number): Promise<Progress | null> {
        return this.progressRepository.getMonthlyProgressByPromotorId(promotorId, month, year);
    }
}
