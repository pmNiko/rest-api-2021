import Joi from "joi";

// validacion para creación
const nameAndCatCreate = Joi.string().min(4).max(13).required();
// validacion para actualización
const nameAndCatUpdate = Joi.string().min(4).max(13);

// schema de creación
export const createSchema = Joi.object({
  name: nameAndCatCreate,
  category: nameAndCatCreate,
  price: Joi.number().positive().precision(2).required(),
  imgURL: Joi.string().min(13),
});

// schema de actualización
export const updateSchema = Joi.object({
  name: nameAndCatUpdate,
  category: nameAndCatUpdate,
  price: Joi.number().positive().precision(2),
  imgURL: Joi.string().min(13),
});
