"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const boom_1 = require("@hapi/boom");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "../docs/swagger.yaml"));
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["x-process-goal"],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
const AuthRoutes_1 = require("./modules/auth/infrastructure/AuthRoutes");
const CatalogRoutes_1 = require("./modules/catalog/infrastructure/CatalogRoutes");
const GoalRoutes_1 = require("./modules/goals/infrastructure/GoalRoutes");
const SaleRoutes_1 = require("./modules/sales/infrastructure/SaleRoutes");
const ProgressRoutes_1 = require("./modules/progress/infrastructure/ProgressRoutes");
const UserRoutes_1 = require("./modules/users/infrastructure/UserRoutes");
const ProductRoutes_1 = require("./modules/products/infrastructure/ProductRoutes");
app.use("/api/v1/auth", AuthRoutes_1.authRoutes);
app.use("/api/v1/sales", SaleRoutes_1.saleRoutes);
app.use("/api/v1/goals", GoalRoutes_1.goalRoutes);
app.use("/api/v1/catalog", CatalogRoutes_1.catalogRoutes);
app.use("/api/v1/progress", ProgressRoutes_1.progressRoutes);
app.use("/api/v1/users", UserRoutes_1.userRoutes);
app.use("/api/v1/products", ProductRoutes_1.productRoutes);
app.use((req, res, next) => {
    next((0, boom_1.notFound)("Route not found"));
});
const errorHandler_1 = require("./shared/infrastructure/middlewares/errorHandler");
app.use(errorHandler_1.errorHandler);
exports.default = app;
