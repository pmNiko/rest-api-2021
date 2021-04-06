/*
  Controller de products
*/
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

// Obtiene los productos en base a conditions, sort, skip y limit
export const getProducts = async (req, res) => {
  const { name, category, sorts, skips, limits } = req.query;

  const conditions = (name && { name }) || (category && { category });
  const sort = sorts === "asc" ? { _id: 1 } : { _id: -1 };
  const skip = skips && parseInt(skips);
  const limit = limits && parseInt(limits);

  search({ conditions, sort, skip, limit, res });
};

// fn para obtener producto por ID
export const getProductById = async (req, res) => {
  console.log("Paso por aca...");
  Product.findById(req.params.id, (error, product) => {
    resServer(res, error, product);
  });
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
