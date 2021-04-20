import { createSchema } from "../../schema/usersSchema";

// Middleware de validacion de schema para dar de alta un user
export const schemaUser = (req, res, next) => {
  const { error } = createSchema.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};
