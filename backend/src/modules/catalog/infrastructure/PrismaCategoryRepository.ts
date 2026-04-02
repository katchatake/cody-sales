import { CategoryRepository } from "../domain/CategoryRepository";
import { Category } from "../domain/Category";
import prisma from "../../../config/database";

export class PrismaCategoryRepository implements CategoryRepository {
    async findAll(): Promise<Category[]> {
        const rows = await prisma.category.findMany({
            orderBy: { name: "asc" }
        });
        
        return rows.map((row: any) => 
            new Category(row.id, row.name, row.description, row.createdAt, row.updatedAt)
        );
    }
}
