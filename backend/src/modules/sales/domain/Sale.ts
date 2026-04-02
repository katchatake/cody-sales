export class Sale {
    constructor(
        public readonly id: number | null,
        public readonly promotorId: number,
        public readonly productId: number,
        public readonly quantity: number,
        public readonly total: number,
        public readonly saleDate?: Date,
        public readonly createdAt?: Date,
        public readonly product?: any // allows fetching relational data from Prima via include: { product: true }
    ) {}
}
