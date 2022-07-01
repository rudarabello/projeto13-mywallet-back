import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routers/users.routes"

dotenv.config();
app.use(express.json());
app.use(cors());

const app = express();
const PORT = process.env.PORT || 5009;

app.use(router);

app.listen(PORT);