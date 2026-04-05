"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const User_1 = require("../domain/User");
class CreateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const user = new User_1.User(null, data.email, data.role, data.name);
        return this.userRepository.save(user);
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
