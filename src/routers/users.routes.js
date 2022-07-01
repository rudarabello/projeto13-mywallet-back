import { Router } from "express";
import {login, singup, logout} from "../controllers/auth-controllers"
import{ postWallet, getWallet} from "../controllers/wallet-controller"
import checkAuth from "../middlewares/checkAuthMiddleware"

const router = Router();

router.post("/login", login);
router.post("/singup", singup);
router.post("/logout", logout);

router.get("/wallet", checkAuth, getWallet);
router.post("/wallet", checkAuth, postWallet);

export {router};