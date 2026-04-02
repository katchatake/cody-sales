import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { badRequest } from "@hapi/boom";

export const validateRequest = (schema: Schema, property: "body" | "query" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false });
    
    if (error) {
      const errorDetails = error.details.map((detail) => ({
        field: detail.context?.key,
        message: detail.message
      }));
      throw badRequest("Error de validación en los datos", errorDetails);
    }
    
    req[property] = value;
    next();
  };
};
