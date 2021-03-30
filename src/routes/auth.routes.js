import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.post("/signup", authCtrl.singup);
router.post("/signin", authCtrl.singin);

export default router;
