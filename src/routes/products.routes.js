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
  [verifyToken, isAdmin, schema.create],
  productsCtrl.createProduct
);

// End Point para generar datos falsos "Protected"
router.get("/data-fake", [verifyToken, isAdmin], productsCtrl.generateDataFake);

// End Point para obtener productos por página
router.get("/page/:number?", productsCtrl.getProductsPerPage);

// End Point para obtener un producto por ID
router.get("/:id", productsCtrl.getProductById);

// End Point para obtener todos
router.get("/", productsCtrl.getProducts);

// End Point para actualizar por ID "Protected"
router.put(
  "/:id",
  [verifyToken, isAdmin, schema.update],
  productsCtrl.updateProductById
);

// End Point para eliminar todos los productos "Protected"
router.delete(
  "/delete-data-fake",
  [verifyToken, isAdmin],
  productsCtrl.deleteDataFake
);

// End Point para eliminar por ID "Protected"
router.delete("/:id", [verifyToken, isAdmin], productsCtrl.deleteProductById);

export default router;
