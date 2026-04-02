import { Router } from "express";
import { AuthController } from "./AuthController";
import { validateRequest } from "../../../shared/infrastructure/middlewares/validateRequest";
import { loginSchema } from "./AuthValid";

export const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
  "/login",
  validateRequest(loginSchema),
  authController.login.bind(authController),
);
