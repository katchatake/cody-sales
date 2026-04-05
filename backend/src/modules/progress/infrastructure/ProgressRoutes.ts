import { Router } from "express";
import { ProgressController } from "./ProgressController";
import {
  verifyToken,
  forbidRoles,
} from "../../../shared/infrastructure/middlewares/authMiddleware";

export const progressRoutes = Router();
const progressController = new ProgressController();

progressRoutes.get(
  "/",
  progressController.getProgress.bind(progressController),
);

progressRoutes.get(
  "/:id",
  progressController.getProgressByPromotor.bind(progressController),
);
