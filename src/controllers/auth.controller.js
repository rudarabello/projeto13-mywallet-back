import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../databases/mongo.js";
import { modelLogin } from "../models/modelLogin.js"

export async function singup(req, res) {
    const { name, email, password } = req.body;
    console.log(req.body)
    console.log("cheguei na singup")
    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = { name, email, password: passwordHash }
    const { value, error } = modelLogin.validate(newUser);
    try {
        if (error) {
            return res.status(422).send(error.details, "Error on data validation");
        } else {
            const verify = await db.collection("users").findOne({ email: email });
            if (verify) {
                return res.status(409).send("User already registered");
            } else {
                await db.collection("users").insertOne(value);
                return res.status(201).send("Successful registration!");
            }
        }
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
};

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await db.collection("users").findOne({ email: email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            const tokenObj = { userId: user._id, token, timestamp: Date.now() }
            await db.collection("sessions").insertOne(tokenObj);
            res.status(200).send({ token });
        } else {
            res.status(401).send("Senha ou e-mail incorreto!");
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
};

export async function logout(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try {
        const response = await db.collection("sessions").deleteOne({ token });
        if (response) res.status(200).send("Log-out realizado");
    } catch (error) {
        res.sendStatus(500).send(error);
    }
}