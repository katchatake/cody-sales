import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import prisma from '../../../config/database';

export enum Role {
    ADMIN = 'ADMIN',
    SUPERVISOR = 'SUPERVISOR',
    PROMOTOR = 'PROMOTOR'
}

export class PrismaUserRepository implements UserRepository {
    async save(user: User): Promise<User> {
        const result = await prisma.user.create({
            data: {
                email: user.email,
                role: user.role as Role,
                name: user.name,
                password: user.password || '',
            }
        });
        return new User(result.id, result.email, result.role as any, result.name, result.password, result.createdAt);
    }

    async findByEmail(email: string): Promise<User | null> {
        const row = await prisma.user.findUnique({ where: { email } });
        if (!row) return null;
        return new User(row.id, row.email, row.role as any, row.name, row.password, row.createdAt);
    }

    async findById(id: number): Promise<User | null> {
        const row = await prisma.user.findUnique({ where: { id } });
        if (!row) return null;
        return new User(row.id, row.email, row.role as any, row.name, row.password, row.createdAt);
    }
}
