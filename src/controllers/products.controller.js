/*
  Controller de products
*/
import { response } from "express";
import Product from "../models/Product";

// fn para crear producto
export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body;
  const product = new Product({ name, category, price, imgURL });

  // la cual tendra como respuesta un error o el obj guardado
  product.save((error, product) => {
    resServer(res, error, product);
  });
};

// fn para obtener los productos
export const getProducts = async (req, res) => {
  Product.find({}).exec((error, products) => {
    resServer(res, error, products);
  });
};

// fn para obtener producto por ID
export const getProductById = async (req, res) => {
  Product.findById(req.params.id, (error, product) => {
    resServer(res, error, product);
  });
};

// fn para obtener producto por ID
export const search = async (req, res) => {
  // const data = req.query.limit;
  console.log(req.query);
  res.status(200).json({ message: `Llego la respuesta: ${req.query}` });
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
