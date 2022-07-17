import { Router } from "express";
import { postChartIn, getChartIn } from "../controllers/chart.controller.js";
import checkAuth from "../middlewares/checkAuthMiddleware.js";

const router = Router();


router.get("/chart-in", checkAuth, getChartIn);
router.post("/chart-in", checkAuth, postChartIn);

router.get("/chart-out", checkAuth, getChartOut);
router.post("/chart-out", checkAuth, postChartOut);

export default router;