"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const CreateUserUseCase_1 = require("../application/CreateUserUseCase");
const MysqlUserRepository_1 = require("./MysqlUserRepository");
class UserController {
    constructor() { }
    async createUser(req, res) {
        try {
            const { name, email, role } = req.body;
            // Initialization here is for demonstration. 
            // In a real app we would use Dependency Injection.
            const repository = new MysqlUserRepository_1.MysqlUserRepository();
            const useCase = new CreateUserUseCase_1.CreateUserUseCase(repository);
            const user = await useCase.execute({ name, email, role });
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.UserController = UserController;
