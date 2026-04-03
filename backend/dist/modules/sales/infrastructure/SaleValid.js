"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createSaleSchema = joi_1.default.object({
    productId: joi_1.default.number().integer().required().messages({
        "number.base": "productId debe ser un número",
        "any.required": "productId es requerido"
    }),
    quantity: joi_1.default.number().integer().min(1).required().messages({
        "number.base": "quantity debe ser un número",
        "number.min": "quantity debe ser mínimo 1",
        "any.required": "quantity es requerido"
    }),
    total: joi_1.default.number().positive().required().messages({
        "number.base": "total debe ser un número",
        "number.positive": "total debe ser mayor a 0",
        "any.required": "total es requerido"
    })
});
