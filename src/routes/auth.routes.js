import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { duplicate, checkRoles } from "../middlewares/verify";
import * as schema from "../middlewares/validators/auth";

const router = Router();

// end point for register
router.post("/signup", [schema.signup, duplicate, checkRoles], authCtrl.singup);

// end point fro login
router.post("/signin", schema.signin, authCtrl.signin);

export default router;
