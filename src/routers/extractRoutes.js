import { Router } from "express";
import { getExtract } from "../controllers/extract.controller.js";
import checkAuth from "../middlewares/checkAuthMiddleware.js";

const router = Router();

router.post("/extract", checkAuth, getExtract);

export default router;