export class Goal {
    constructor(
        public readonly id: number | null,
        public readonly promotorId: number,
        public readonly target: number,
        public readonly month: number,
        public readonly year: number,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) {}
}
