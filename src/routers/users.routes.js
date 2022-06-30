import { Router } from "express";
import {login, singup, logout} from "..controllers/auth.controller.js"
import{ postWallet, getWallet} from "..controlllers/wallet.controller.js"
import checkAuth from "..middlewares/checkAuth.middlewares.js"

const router = Router();

router.post("/login", login);
router.post("/singup", singup);
router.post("/logout", logout);

router.get("/wallet", checkAuth, getWallet);
router.post("/wallet", checkAuth, postWallet);

export {router};