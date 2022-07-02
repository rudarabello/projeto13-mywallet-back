import { Router } from "express";
import { login, singup, logout } from "../controllers/auth.controller.js";
import { postWallet, getWallet } from "../controllers/wallet.controller.js";
import checkAuth from "../middlewares/checkAuthMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/singup", singup);
router.post("/logout", logout);

router.get("/wallet", checkAuth, getWallet);
router.post("/wallet", checkAuth, postWallet);

export default router;