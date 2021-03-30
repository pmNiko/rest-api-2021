/*
  Controller de products
*/
import Product from "../models/Product";

// fn para crear producto
export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body;

  const product = new Product({ name, category, price, imgURL });

  const productSave = await product.save();

  // code 201 nuevo recurso creado
  res.status(201).json(productSave);
};

// fn para obtener los productos
export const getProducts = async (req, res) => {
  const products = await Product.find();

  res.json(products);
};

// fn para obtener producto por ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json(product);
};

// fn para actualizar producto por ID
export const updateProductById = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(product);
};

// fn para eliminar producto por ID
export const deleteProductById = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(204).json();
};
