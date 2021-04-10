/*
  Rutas de productos
*/
import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller";
import { verifyToken, isAdmin, isModerator } from "../middlewares";
import * as schema from "../middlewares/validators/product";

const router = Router();

// End Point para crear
router.post(
  "/",
  [verifyToken, isModerator, schema.create],
  productsCtrl.createProduct
);

// End Point para generar datos falsos
router.get("/generate", productsCtrl.generate);

// End Point para obtener productos por página
router.get("/page", productsCtrl.getProductsPerPage);

// End Point para obtener un producto por ID
router.get("/:id", productsCtrl.getProductById);

// End Point para obtener todos
router.get("/", productsCtrl.getProducts);

// End Point para actualizar por ID
router.put(
  "/:id",
  [verifyToken, isModerator, schema.update],
  productsCtrl.updateProductById
);

// End Point para eliminar todos los productos
router.delete("/fake-data", productsCtrl.deleteAll);

// End Point para eliminar por ID
router.delete("/:id", [verifyToken, isAdmin], productsCtrl.deleteProductById);

export default router;
