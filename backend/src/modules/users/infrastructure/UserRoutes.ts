import { Router } from "express";
import { UserController } from "./UserController";
import {
    forbidRoles,
    verifyToken,
} from "../../../shared/infrastructure/middlewares/authMiddleware";

export const userRoutes = Router();
const userController = new UserController();

userRoutes.get(
    "/promotors",
    verifyToken,
    forbidRoles("PROMOTOR"),
    userController.getPromotors.bind(userController)
);
