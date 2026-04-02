import { Request, Response, NextFunction } from "express";
import { Boom, isBoom } from "@hapi/boom";

export const errorHandler = (
  err: Error | Boom,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  // If headers have already been sent, just delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  if (isBoom(err)) {
    const payload: any = { ...err.output.payload };
    if (err.data) {
      payload.details = err.data;
    }
    return res.status(err.output.statusCode).json(payload);
  }

  // Not a Boom error, map generic errors to 500 Internal Server Error
  console.error("Non-Boom Error caught:", err);
  
  return res.status(500).json({
    statusCode: 500,
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred",
  });
};
