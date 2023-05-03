import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import chartRoutes from "./routers/chartRoutes.js";
import extractRoutes from "./routers/extractRoutes.js";
import userRoutes from "./routers/userRoutes.js";
const app = express();
const PORT = process.env.PORT || 5009;

dotenv.config();
app.use(express.json());
app.use(cors());

app.use(userRoutes, chartRoutes, extractRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
