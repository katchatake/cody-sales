import { SaleRepository } from "../domain/SaleRepository";
import { Sale } from "../domain/Sale";
import prisma from "../../../config/database";

export class PrismaSaleRepository implements SaleRepository {
    async save(sale: Sale): Promise<Sale> {
        const result = await prisma.sale.create({
            data: {
                promotorId: sale.promotorId,
                productId: sale.productId,
                quantity: sale.quantity,
                total: sale.total
            },
            include: { product: true }
        });
        
        return new Sale(result.id, result.promotorId, result.productId, result.quantity, result.total, result.saleDate, result.createdAt, result.product);
    }

    async saveMany(sales: Sale[]): Promise<Sale[]> {
        const results = await prisma.$transaction(
            sales.map((sale) =>
                prisma.sale.create({
                    data: {
                        promotorId: sale.promotorId,
                        productId: sale.productId,
                        quantity: sale.quantity,
                        total: sale.total
                    },
                    include: { product: true }
                })
            )
        );

        return results.map((result) =>
            new Sale(
                result.id,
                result.promotorId,
                result.productId,
                result.quantity,
                result.total,
                result.saleDate,
                result.createdAt,
                result.product
            )
        );
    }

    async findAll(): Promise<Sale[]> {
        const rows = await prisma.sale.findMany({
            orderBy: { createdAt: "desc" },
            include: { product: true }
        });
        
        return rows.map((row: any) => 
            new Sale(row.id, row.promotorId, row.productId, row.quantity, row.total, row.saleDate, row.createdAt, row.product)
        );
    }

    async findByPromotorId(promotorId: number): Promise<Sale[]> {
        const rows = await prisma.sale.findMany({
            where: { promotorId },
            orderBy: { createdAt: "desc" },
            include: { product: true }
        });

        return rows.map((row: any) => 
            new Sale(row.id, row.promotorId, row.productId, row.quantity, row.total, row.saleDate, row.createdAt, row.product)
        );
    }
}
