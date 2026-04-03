import { ProductRepository } from "../domain/ProductRepository";
import { Product } from "../domain/Product";
import prisma from "../../../config/database";

export class PrismaProductRepository implements ProductRepository {
    async getAll(): Promise<Product[]> {
        const products = await prisma.product.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return products.map(p => new Product(
            p.id,
            p.name,
            p.price,
            p.categoryId,
            p.createdAt,
            p.updatedAt,
            p.category
        ));
    }
}
