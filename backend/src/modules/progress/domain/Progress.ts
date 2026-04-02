export class Progress {
    constructor(
        public readonly promotorId: number,
        public readonly promotorName: string,
        public readonly totalSold: number,
        public readonly target: number,
        public readonly percentage: number
    ) {}
}
