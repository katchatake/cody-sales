"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoalSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createGoalSchema = joi_1.default.object({
    promotorId: joi_1.default.number().integer().required().messages({
        "number.base": "promotorId debe ser un número",
        "any.required": "promotorId es requerido",
    }),
    target: joi_1.default.number().positive().required().messages({
        "number.base": "target debe ser un número",
        "number.positive": "target debe ser mayor a 0",
        "any.required": "target es requerido",
    }),
    month: joi_1.default.number().integer().min(1).max(12).required().messages({
        "number.base": "month debe ser un número",
        "number.min": "month debe ser mínimo 1",
        "number.max": "month no puede ser mayor a 12",
        "any.required": "month es requerido",
    }),
    year: joi_1.default.number().integer().min(1900).required().messages({
        "number.base": "year debe ser un número",
        "number.min": "year debe tener un formato válido (ej. 2026)",
        "any.required": "year es requerido",
    }),
});
exports.createGoalSchema = createGoalSchema;
