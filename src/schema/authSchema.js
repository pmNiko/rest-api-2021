import Joi from "joi";

// roles permitidos
const roles = Joi.array().items(
  Joi.string().valid("admin", "moderator", "user")
);
// email
const email = Joi.string().email().required();
// password
const password = Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"));

// schema de registro de user
export const signUpSchema = Joi.object({
  username: Joi.string().required(),
  email,
  password,
  roles,
});

// schema de login de user
export const signInSchema = Joi.object({ email, password });
