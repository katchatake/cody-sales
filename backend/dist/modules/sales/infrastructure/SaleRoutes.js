"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleRoutes = void 0;
const express_1 = require("express");
const SaleController_1 = require("./SaleController");
const validateRequest_1 = require("../../../shared/infrastructure/middlewares/validateRequest");
const authMiddleware_1 = require("../../../shared/infrastructure/middlewares/authMiddleware");
const SaleValid_1 = require("./SaleValid");
exports.saleRoutes = (0, express_1.Router)();
const saleController = new SaleController_1.SaleController();
// 1. POST /api/v1/sales - Save a sale
exports.saleRoutes.post("/", authMiddleware_1.verifyToken, // Inject req.user to extract promotorId automatically
(0, validateRequest_1.validateRequest)(SaleValid_1.createSaleSchema), saleController.createSale.bind(saleController));
// 2. GET /api/v1/sales - Get all sales
exports.saleRoutes.get("/", authMiddleware_1.verifyToken, saleController.getSales.bind(saleController));
// 3. GET /api/v1/sales/user/:id - Get sales by specific promotor (user)
exports.saleRoutes.get("/:id", authMiddleware_1.verifyToken, saleController.getSalesByUser.bind(saleController));
