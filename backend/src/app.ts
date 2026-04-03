import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { notFound } from "@hapi/boom";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app: Application = express();

// Load Document definition
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));

// Middlewares
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["x-process-goal"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Interface
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

import { authRoutes } from "./modules/auth/infrastructure/AuthRoutes";
import { catalogRoutes } from "./modules/catalog/infrastructure/CatalogRoutes";
import { goalRoutes } from "./modules/goals/infrastructure/GoalRoutes";
import { saleRoutes } from "./modules/sales/infrastructure/SaleRoutes";
import { progressRoutes } from "./modules/progress/infrastructure/ProgressRoutes";
import { userRoutes } from "./modules/users/infrastructure/UserRoutes";
import { productRoutes } from "./modules/products/infrastructure/ProductRoutes";

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/sales", saleRoutes);
app.use("/api/v1/goals", goalRoutes);
app.use("/api/v1/catalog", catalogRoutes);
app.use("/api/v1/progress", progressRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);

// Catch-all route for unknown paths
app.use((req: Request, res: Response, next: NextFunction) => {
  next(notFound("Route not found"));
});

// App Error Handler
import { errorHandler } from "./shared/infrastructure/middlewares/errorHandler";
app.use(errorHandler);

export default app;
