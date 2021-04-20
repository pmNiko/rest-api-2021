import { Router } from "express";
import * as userCtrl from "../controllers/users.controller";
import { verifyToken, isAdmin, checkRoles, duplicate } from "../middlewares";
import * as validator from "../middlewares/validators/users";

const router = Router();

router.post(
  "/",
  [verifyToken, isAdmin, validator.schemaUser, duplicate, checkRoles],
  userCtrl.createUser
);

router.get("/", [verifyToken, isAdmin], userCtrl.getUsers);

export default router;
