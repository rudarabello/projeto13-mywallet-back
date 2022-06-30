import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {router} from "./routes/users.routes.js"


dotenv.config();
app.use(express.json());
app.use(cors());

const app = express();

app.use("/users", router);

app.listen(PORT);