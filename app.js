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
client.connect(() => { db = client.db('dataBank') });

app.post("/sign-up", async (req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const password = req.body.password;
    try {
        const newUser = {
            user: user,
            email: email,
            cpf: cpf,
            password: password
        }
        await db.collection("users").insertOne(newUser);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }

});

app.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const confirmationEmail = await db.collection("users").findOne({ email: email });
        const confirmationpassword = await db.collection("users").findOne({ password: password });
        if (confirmationEmail && confirmationpassword) {
            //devolver um token para o front
            res.sendStatus(201);
            return;
        } else {
            res.sendStatus(409).send("Usuário não cadastrado!");
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

app.listen(5000);