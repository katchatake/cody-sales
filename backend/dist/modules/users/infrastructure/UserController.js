"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const GetPromotorsUseCase_1 = require("../application/GetPromotorsUseCase");
const PrismaUserSummaryRepository_1 = require("./PrismaUserSummaryRepository");
class UserController {
    async getPromotors(req, res) {
        const repository = new PrismaUserSummaryRepository_1.PrismaUserSummaryRepository();
        const useCase = new GetPromotorsUseCase_1.GetPromotorsUseCase(repository);
        const promotors = await useCase.execute();
        res.status(200).json({ data: promotors });
    }
}
exports.UserController = UserController;
