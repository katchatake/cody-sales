"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserController_1 = require("./UserController");
exports.userRoutes = (0, express_1.Router)();
const userController = new UserController_1.UserController();
exports.userRoutes.post('/', userController.createUser.bind(userController));
