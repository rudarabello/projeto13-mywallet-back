import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv, { config } from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URL);
let db;
client.connect(()=>{db = client.db('dataBank')});
