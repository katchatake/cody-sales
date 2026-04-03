"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const ProductController_1 = require("./ProductController");
const authMiddleware_1 = require("../../../shared/infrastructure/middlewares/authMiddleware");
exports.productRoutes = (0, express_1.Router)();
const productController = new ProductController_1.ProductController();
exports.productRoutes.get("/", authMiddleware_1.verifyToken, productController.getProducts.bind(productController));
