import { Request, Response, NextFunction } from "express";
import { unauthorized, forbidden } from "@hapi/boom";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw unauthorized("Acceso denegado: Token no proporcionado");
    }

    const token = authHeader.split(" ")[1];
    try {
        const secret = process.env.JWT_SECRET || "default_secret";
        const decoded = jwt.verify(token, secret);

        (req as any).user = decoded;
        next();
    } catch (error) {
        throw unauthorized("Token inválido o expirado");
    }
};

export const forbidRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        
        if (!user || !user.role) {
            throw unauthorized("Usuario no autenticado");
        }

        const userRole = user.role.toUpperCase();
        
        if (roles.map(r => r.toUpperCase()).includes(userRole)) {
            throw forbidden("Acceso prohibido para tu rol");
        }

        next();
    };
};

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        
        if (!user || !user.role) {
            throw unauthorized("Usuario no autenticado");
        }

        const userRole = user.role.toUpperCase();
        
        if (!roles.map(r => r.toUpperCase()).includes(userRole)) {
            throw forbidden("No tienes permisos para realizar esta acción");
        }

        next();
    };
};
