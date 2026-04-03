export class Product {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly price: number,
        public readonly categoryId: number,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
        public readonly category?: { id: number; name: string }
    ) {}
}
