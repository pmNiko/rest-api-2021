import * as auth from "../../schema/authSchema";

// Middleware de validación de schema para rehistrar un user
export const signUp = (req, res, next) => {
  const { error } = auth.signUpSchema.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};

// Middleware de validación de schema para login de user
export const signIn = (req, res, next) => {
  const { error } = auth.signInSchema.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};
