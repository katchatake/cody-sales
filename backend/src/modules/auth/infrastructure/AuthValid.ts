import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email es requerido",
    "string.email": "Email debe ser válido",
    "any.required": "Email es requerido",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password es requerido",
    "any.required": "Password es requerido",
  }),
});

export { loginSchema };
