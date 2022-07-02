import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const objectId = ObjectId;

const client = new MongoClient(MONGO_URI);

client.connect();

let db = client.db("mywallet");

export { db, objectId };

