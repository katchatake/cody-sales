"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogRoutes = void 0;
const express_1 = require("express");
const CatalogController_1 = require("./CatalogController");
const authMiddleware_1 = require("../../../shared/infrastructure/middlewares/authMiddleware");
exports.catalogRoutes = (0, express_1.Router)();
const catalogController = new CatalogController_1.CatalogController();
exports.catalogRoutes.get("/", authMiddleware_1.verifyToken, (0, authMiddleware_1.forbidRoles)("PROMOTOR"), catalogController.getCategories.bind(catalogController));
