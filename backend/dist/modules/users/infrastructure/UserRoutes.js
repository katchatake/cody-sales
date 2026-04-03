"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserController_1 = require("./UserController");
const authMiddleware_1 = require("../../../shared/infrastructure/middlewares/authMiddleware");
exports.userRoutes = (0, express_1.Router)();
const userController = new UserController_1.UserController();
exports.userRoutes.get("/promotors", authMiddleware_1.verifyToken, (0, authMiddleware_1.forbidRoles)("PROMOTOR"), userController.getPromotors.bind(userController));
