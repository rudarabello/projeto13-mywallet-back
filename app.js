import { postSignUp, postLogin, postTransaction} from "./src/controllers/post-controller.js";
import { getHome,  } from "./src/controllers/get-controllers";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
app.use(express.json());
app.use(cors());

const app = express();

let db;
const PORT = process.env.PORT || 5009;
const client = new MongoClient(process.env.MONGO_URL);
client.connect(() => { db = client.db('dataBank') });

app.post("/sign-up", (req, res) => postSignUp(req, res, db));

app.post("/login", (req, res) => postLogin(req, res, db));

app.get("/home", (req, res) => getHome(req, res, db));

app.post("/transactions", (req, res) => postTransaction(req, res, db));

app.listen(PORT);