"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const boom_1 = require("@hapi/boom");
const errorHandler = (err, req, res, next) => {
    // If headers have already been sent, just delegate to default Express error handler
    if (res.headersSent) {
        return next(err);
    }
    if ((0, boom_1.isBoom)(err)) {
        const payload = { ...err.output.payload };
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
exports.errorHandler = errorHandler;
