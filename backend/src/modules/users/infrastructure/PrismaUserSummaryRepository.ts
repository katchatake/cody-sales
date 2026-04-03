import prisma from "../../../config/database";
import { UserSummary } from "../domain/UserSummary";
import { UserSummaryRepository } from "../domain/UserSummaryRepository";

export class PrismaUserSummaryRepository implements UserSummaryRepository {
    async findPromotors(): Promise<UserSummary[]> {
        const rows = await prisma.user.findMany({
            where: { role: "PROMOTOR" },
            orderBy: { name: "asc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        return rows.map((row) =>
            new UserSummary(row.id, row.name, row.email, row.role, row.createdAt)
        );
    }
}
