import { MongoClient } from "mongodb";
import dotenv from "dotenv";

let db;
dotenv.config();
const client = new MongoClient(process.env.MONGO_URL);
client.connect(() => { db = client.db('mywallet') });