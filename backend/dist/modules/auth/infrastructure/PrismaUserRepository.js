"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = exports.Role = void 0;
const User_1 = require("../domain/User");
const database_1 = __importDefault(require("../../../config/database"));
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["SUPERVISOR"] = "SUPERVISOR";
    Role["PROMOTOR"] = "PROMOTOR";
})(Role || (exports.Role = Role = {}));
class PrismaUserRepository {
    async save(user) {
        const result = await database_1.default.user.create({
            data: {
                email: user.email,
                role: user.role,
                name: user.name,
                password: user.password || '',
            }
        });
        return new User_1.User(result.id, result.email, result.role, result.name, result.password, result.createdAt);
    }
    async findByEmail(email) {
        const row = await database_1.default.user.findUnique({ where: { email } });
        if (!row)
            return null;
        return new User_1.User(row.id, row.email, row.role, row.name, row.password, row.createdAt);
    }
    async findById(id) {
        const row = await database_1.default.user.findUnique({ where: { id } });
        if (!row)
            return null;
        return new User_1.User(row.id, row.email, row.role, row.name, row.password, row.createdAt);
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
