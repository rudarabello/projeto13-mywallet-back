import { Router } from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";
import { postWallet, getWallet } from "../controllers/wallet.controller.js";
import checkAuth from "../middlewares/checkAuthMiddleware.js";

const router = Router();

router.post("/", login);
router.post("/sign-up", signup);

router.delete("/logout", checkAuth, logout);
router.get("/wallet", checkAuth, getWallet);
router.post("/wallet", checkAuth, postWallet);

export default router;