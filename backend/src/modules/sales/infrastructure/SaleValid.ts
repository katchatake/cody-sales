import Joi from "joi";

export const createSaleSchema = Joi.object({
  productId: Joi.number().integer().required().messages({
    "number.base": "productId debe ser un número",
    "any.required": "productId es requerido"
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "quantity debe ser un número",
    "number.min": "quantity debe ser mínimo 1",
    "any.required": "quantity es requerido"
  }),
  total: Joi.number().positive().required().messages({
    "number.base": "total debe ser un número",
    "number.positive": "total debe ser mayor a 0",
    "any.required": "total es requerido"
  })
});
