/*
  Rutas de productos
*/
import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller";
import { verifyToken, isAdmin, isModerator } from "../middlewares";

const router = Router();

// End Point para crear
router.post("/", [verifyToken, isModerator], productsCtrl.createProduct);

// End Point para obtener todos
router.get("/", productsCtrl.getProducts);

// End Point para obtener un producto por ID
router.get("/:id", productsCtrl.getProductById);

// End Point para actualizar por ID
router.put("/:id", verifyToken, productsCtrl.updateProductById);

// End Point para eliminar por ID
router.delete("/:id", [verifyToken, isAdmin], productsCtrl.deleteProductById);

export default router;
