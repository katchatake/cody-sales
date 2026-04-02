import { Router } from "express";
import { GoalController } from "./GoalController";
import { validateRequest } from "../../../shared/infrastructure/middlewares/validateRequest";
import { verifyToken, forbidRoles } from "../../../shared/infrastructure/middlewares/authMiddleware";
import { createGoalSchema } from "./GoalValid";

export const goalRoutes = Router();
const goalController = new GoalController();

goalRoutes.post(
  "/",
  verifyToken,
  forbidRoles("PROMOTOR"),
  validateRequest(createGoalSchema),
  goalController.createGoal.bind(goalController),
);

goalRoutes.get("/", verifyToken, goalController.getGoals.bind(goalController));
