import { UserSummary } from "./UserSummary";

export interface UserSummaryRepository {
    findPromotors(): Promise<UserSummary[]>;
}
