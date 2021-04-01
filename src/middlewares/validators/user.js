import * as user from "../../schema/userSchema";

// Middleware de validacion de schema para dar de alta un user
export const create = (req, res, next) => {
  const { error } = user.createSchema.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};
