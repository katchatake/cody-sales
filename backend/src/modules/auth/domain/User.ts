export class User {
    constructor(
        public readonly id: number | null,
        public readonly email: string,
        public readonly role: 'admin' | 'supervisor' | 'promotor',
        public readonly name: string,
        public readonly password?: string,
        public readonly createdAt?: Date
    ) {}
}
