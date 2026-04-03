"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.empty": "Email es requerido",
        "string.email": "Email debe ser válido",
        "any.required": "Email es requerido",
    }),
    password: joi_1.default.string().required().messages({
        "string.empty": "Password es requerido",
        "any.required": "Password es requerido",
    }),
});
exports.loginSchema = loginSchema;
