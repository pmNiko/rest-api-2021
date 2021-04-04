/*
  Rutas de productos
*/
import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller";
import { verifyToken, isAdmin, isModerator } from "../middlewares";
import * as validator from "../middlewares/validators/product";

const router = Router();

// End Point para crear
router.post(
  "/",
  [verifyToken, isModerator, validator.create],
  productsCtrl.createProduct
);

// End Point para busqueda con params
router.get("/search", productsCtrl.search);

// End Point para obtener todos
router.get("/", productsCtrl.getProducts);

// End Point para obtener un producto por ID
router.get("/:id", productsCtrl.getProductById);

// End Point para actualizar por ID
router.put(
  "/:id",
  [verifyToken, isModerator, validator.update],
  productsCtrl.updateProductById
);

// End Point para eliminar por ID
router.delete("/:id", [verifyToken, isAdmin], productsCtrl.deleteProductById);

export default router;
