import * as product from "../../schema/productSchema";

// Middleware de validación de schema para crear un producto
export const create = (req, res, next) => {
  const { error } = product.createSchema.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};

// Middleware de validación de schema para actualizar un producto
export const update = (req, res, next) => {
  const { error } = product.updateSchema.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};
