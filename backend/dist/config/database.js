"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabaseConnection = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const prisma = new client_1.PrismaClient();
const checkDatabaseConnection = async () => {
    try {
        await prisma.$connect();
    }
    catch (error) {
        console.error('Error connecting to the database via Prisma:', error);
        throw error;
    }
};
exports.checkDatabaseConnection = checkDatabaseConnection;
exports.default = prisma;
