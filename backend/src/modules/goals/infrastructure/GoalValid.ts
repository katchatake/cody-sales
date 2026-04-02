import Joi from "joi";

const createGoalSchema = Joi.object({
  promotorId: Joi.number().integer().required().messages({
    "number.base": "promotorId debe ser un número",
    "any.required": "promotorId es requerido",
  }),
  target: Joi.number().positive().required().messages({
    "number.base": "target debe ser un número",
    "number.positive": "target debe ser mayor a 0",
    "any.required": "target es requerido",
  }),
  month: Joi.number().integer().min(1).max(12).required().messages({
    "number.base": "month debe ser un número",
    "number.min": "month debe ser mínimo 1",
    "number.max": "month no puede ser mayor a 12",
    "any.required": "month es requerido",
  }),
  year: Joi.number().integer().min(1900).required().messages({
    "number.base": "year debe ser un número",
    "number.min": "year debe tener un formato válido (ej. 2026)",
    "any.required": "year es requerido",
  }),
});

export { createGoalSchema };
