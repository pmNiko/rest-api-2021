import Joi from "joi";

// schema de registro de user
export const createSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  roles: Joi.array().items(Joi.string()),
});
