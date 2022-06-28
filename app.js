import { postSignUp, postLogin } from "./src/controllers/post-controller.js";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



const client = new MongoClient(process.env.MONGO_URL);
let db;
client.connect(() => { db = client.db('dataBank') });

app.post("/sign-up", (req, res) => postSignUp(req, res, db));

app.post("/", (req, res) => postLogin(req, res, db));

app.listen(5000);