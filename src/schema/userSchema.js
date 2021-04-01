import Joi from "joi";

// roles permitidos
const roles = Joi.array().items(
  Joi.string().valid("admin", "moderator", "user")
);
// email
const email = Joi.string().email().required();

// schema de registro de user
export const createSchema = Joi.object({
  username: Joi.string().required(),
  email,
  roles,
});
