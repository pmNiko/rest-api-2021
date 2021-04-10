import * as schema from "../../schema/productSchema";

export const create = (req, res, next) => {
  const { error } = schema.create.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};

export const update = (req, res, next) => {
  const { error } = schema.update.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};
