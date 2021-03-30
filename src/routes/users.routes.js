import { Router } from "express";
import * as userCtrl from "../controllers/users.controller";
import {
  verifyToken,
  isAdmin,
  isModerator,
  checkRoles,
  duplicate,
} from "../middlewares";

const router = Router();

router.post(
  "/",
  [verifyToken, isAdmin, duplicate, checkRoles],
  userCtrl.createUser
);

export default router;
