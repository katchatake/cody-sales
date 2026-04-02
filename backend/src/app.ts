import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { notFound } from "@hapi/boom";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

import { authRoutes } from "./modules/auth/infrastructure/AuthRoutes";
import { catalogRoutes } from "./modules/catalog/infrastructure/CatalogRoutes";
import { goalRoutes } from "./modules/goals/infrastructure/GoalRoutes";

// Routes
app.use("/api/v1/auth", authRoutes);
// app.use('/api/v1/sales', saleRoutes);
app.use("/api/v1/goals", goalRoutes);
app.use("/api/v1/catalog", catalogRoutes);

// Catch-all route for unknown paths
app.use((req: Request, res: Response, next: NextFunction) => {
  next(notFound("Route not found"));
});

// App Error Handler
import { errorHandler } from "./shared/infrastructure/middlewares/errorHandler";
app.use(errorHandler);

export default app;
