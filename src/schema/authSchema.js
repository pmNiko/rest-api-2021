import Joi from "joi";

// const password validate
const password = Joi.string()
  .pattern(/^[a-zA-Z0-9]{3,30}$/)
  .required();
// const email validate
const email = Joi.string().email().required();

// schema validación de registro de usuarios
export const signup = Joi.object({
  username: Joi.string().required(),
  email,
  password,
});

// schema validación de login de usuarios
export const signin = Joi.object({ email, password });
