import { UserSummary } from "../domain/UserSummary";
import { UserSummaryRepository } from "../domain/UserSummaryRepository";

export class GetPromotorsUseCase {
    constructor(private userRepository: UserSummaryRepository) {}

    async execute(): Promise<UserSummary[]> {
        return this.userRepository.findPromotors();
    }
}
