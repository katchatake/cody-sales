import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const prisma = new PrismaClient();

export const checkDatabaseConnection = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        console.error('Error connecting to the database via Prisma:', error);
        throw error;
    }
}

export default prisma;
