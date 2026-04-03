"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const boom_1 = require("@hapi/boom");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new boom_1.Boom("Credenciales inválidas", { statusCode: 401 });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password || "");
        if (!isPasswordValid) {
            throw new boom_1.Boom("Credenciales inválidas", { statusCode: 401 });
        }
        const secret = process.env.JWT_SECRET || "default_secret";
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: "24h" });
        const { password, ...userWithoutPassword } = user;
        return {
            token,
            user: userWithoutPassword,
        };
    }
}
exports.LoginUseCase = LoginUseCase;
