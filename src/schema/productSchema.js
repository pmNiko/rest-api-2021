import Joi from "joi";

// const validation schema
const nameAndCategory = Joi.string().min(4).max(13);
const price = Joi.number().positive().precision(2);
const imgURL = Joi.string().min(13);

// schema de creación
export const create = Joi.object({
  name: nameAndCategory.required(),
  category: nameAndCategory.required(),
  price: price.required(),
  imgURL: imgURL.required(),
});

// schema de actualización
export const update = Joi.object({
  name: nameAndCategory,
  category: nameAndCategory,
  price,
  imgURL,
});
