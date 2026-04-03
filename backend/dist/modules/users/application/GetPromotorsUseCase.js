"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPromotorsUseCase = void 0;
class GetPromotorsUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        return this.userRepository.findPromotors();
    }
}
exports.GetPromotorsUseCase = GetPromotorsUseCase;
