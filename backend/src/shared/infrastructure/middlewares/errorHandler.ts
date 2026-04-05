import { Request, Response, NextFunction } from "express";
import { Boom, isBoom } from "@hapi/boom";

export const errorHandler = (
  err: Error | Boom,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  console.error("Non-Boom Error caught:", err);

  return res.status(500).json({
    statusCode: 500,
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred",
  });
};
