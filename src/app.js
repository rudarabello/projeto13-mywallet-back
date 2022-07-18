import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routers/userRoutes.js";
import chartRoutes from "./routers/chartRoutes.js"
const app = express();
const PORT = 5009;

dotenv.config();
app.use(express.json());
app.use(cors());

app.use(userRoutes, chartRoutes);

app.listen(PORT);