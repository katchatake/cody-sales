"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const LoginUseCase_1 = require("../application/LoginUseCase");
const PrismaUserRepository_1 = require("./PrismaUserRepository");
class AuthController {
    constructor() { }
    async login(req, res) {
        const { email, password } = req.body;
        const repository = new PrismaUserRepository_1.PrismaUserRepository();
        const useCase = new LoginUseCase_1.LoginUseCase(repository);
        const result = await useCase.execute({ email, password });
        res.status(200).json(result);
    }
}
exports.AuthController = AuthController;
