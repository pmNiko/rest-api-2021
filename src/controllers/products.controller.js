/*
  Controller de products
*/
import Product from "../models/Product";
import faker from "faker";
import { json } from "express";
faker.locale = "es";

// fn para crear producto
export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body;
  const product = new Product({ name, category, price, imgURL });

  // la cual tendra como respuesta un error o el obj guardado
  product.save((error, product) => {
    resServer(res, error, product);
  });
};

// fn para generar datos falsos a travez de faker
export const generate = (req, res) => {
  let categories = [
    "Electronica",
    "Audio",
    "Telefonia",
    "Juegos",
    "Computacion",
  ];

  let products = [];

  for (let i = 0; i < 30; i++) {
    const product = new Product();
    product.category =
      categories[Math.floor(Math.random() * categories.length)];
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.imgURL = faker.image.technics();

    try {
      const productSaved = product.save();
      products.push(productSaved);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error fake data save." });
    }
  }

  res.json({ data: products });
};

// fn para vaciar la colleccion de products
export const deleteAll = (req, res) => {
  Product.deleteMany({}, (error, products) => resServer(res, error, products));
};

// fn para obtener los productos por pagina
export const getProductsPerPage = async (req, res) => {
  let { limit, page } = req.query; // received limits for query strings
  limit = parseInt(limit) || 10; // if limits is null
  page = parseInt(page) || 1; // if page is null
  const skip = limit * page - limit; //example 2 * 1 = 2 ; 2-2= 0; in the first page the value of the skip is 0
  search({ skip, limit, res });
};

// fn para obtener producto por ID
export const getProductById = async (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    resServer(res, error, product);
  });
};

// Obtiene los productos en base a conditions, sort, skip y limit
export const getProducts = async (req, res) => {
  let { name, category, sort, skip, limit } = req.query;

  const conditions = (name && { name }) || (category && { category });
  sort = sort === "asc" ? { _id: 1 } : { _id: -1 };
  skip = skip && parseInt(skip);
  limit = limit && parseInt(limit);

  search({ conditions, sort, skip, limit, res });
};

// fn para actualizar producto por ID
export const updateProductById = async (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, product) => {
      resServer(res, error, product);
    }
  );
};

// fn para eliminar producto por ID
export const deleteProductById = async (req, res) => {
  Product.findByIdAndDelete(req.params.id, (error, product) => {
    if (error)
      return res.status(500).send({
        message: "Internal server error.",
      });
    if (!product)
      return res.status(404).send({
        message: "404 not found.",
      });

    res.status(200).json({ data: true });
  });
};

// fn modular de busqueda
const search = async ({
  conditions = {},
  sort = {},
  skip = 0,
  limit = 10,
  res,
}) => {
  Product.find(conditions)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec((error, products) => {
      resServer(res, error, products);
    });
};

/*
  Esta función abstrae la respuesta del servidor
*/
function resServer(res, error, resource) {
  if (error)
    return res.status(500).send({
      message: "Internal server error.",
    });
  if (!resource)
    return res.status(404).send({
      message: "404 not found.",
    });

  res.status(200).json({ data: resource });
}
