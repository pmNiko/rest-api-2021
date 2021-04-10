import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import * as validator from "../middlewares/validators/auth";
import { duplicate, checkRoles } from "../middlewares/verify";

const router = Router();

router.post(
  "/signup",
  [validator.signUp, duplicate, checkRoles],
  authCtrl.singup
);
router.post("/signin", validator.signIn, authCtrl.signin);

export default router;
