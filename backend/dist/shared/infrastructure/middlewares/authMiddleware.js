"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.forbidRoles = exports.verifyToken = void 0;
const boom_1 = require("@hapi/boom");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw (0, boom_1.unauthorized)("Acceso denegado: Token no proporcionado");
    }
    const token = authHeader.split(" ")[1];
    try {
        const secret = process.env.JWT_SECRET || "default_secret";
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        throw (0, boom_1.unauthorized)("Token inválido o expirado");
    }
};
exports.verifyToken = verifyToken;
const forbidRoles = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !user.role) {
            throw (0, boom_1.unauthorized)("Usuario no autenticado");
        }
        const userRole = user.role.toUpperCase();
        if (roles.map(r => r.toUpperCase()).includes(userRole)) {
            throw (0, boom_1.forbidden)("Acceso prohibido para tu rol");
        }
        next();
    };
};
exports.forbidRoles = forbidRoles;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !user.role) {
            throw (0, boom_1.unauthorized)("Usuario no autenticado");
        }
        const userRole = user.role.toUpperCase();
        if (!roles.map(r => r.toUpperCase()).includes(userRole)) {
            throw (0, boom_1.forbidden)("No tienes permisos para realizar esta acción");
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
