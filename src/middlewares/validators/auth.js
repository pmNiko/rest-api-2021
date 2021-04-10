import * as auth from "../../schema/authSchema";

// Middleware de validación de schema para registrar un user
export const signup = (req, res, next) => {
  const { error } = auth.signup.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};

// Middleware de validación de schema para login de user
export const signin = (req, res, next) => {
  const { error } = auth.signin.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};
