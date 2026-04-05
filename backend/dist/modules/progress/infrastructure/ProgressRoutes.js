"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressRoutes = void 0;
const express_1 = require("express");
const ProgressController_1 = require("./ProgressController");
exports.progressRoutes = (0, express_1.Router)();
const progressController = new ProgressController_1.ProgressController();
exports.progressRoutes.get("/", progressController.getProgress.bind(progressController));
exports.progressRoutes.get("/:id", progressController.getProgressByPromotor.bind(progressController));
