"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const boom_1 = require("@hapi/boom");
const validateRequest = (schema, property = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            const errorDetails = error.details.map((detail) => ({
                field: detail.context?.key,
                message: detail.message
            }));
            throw (0, boom_1.badRequest)("Error de validación en los datos", errorDetails);
        }
        req[property] = value;
        next();
    };
};
exports.validateRequest = validateRequest;
