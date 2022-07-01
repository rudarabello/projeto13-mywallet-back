import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../databases/mongo";
import {modelLogin} from "../models/modelLogin"



async function login(req, res) {
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

async function singup(req, res) {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    try {
        const validate = await db.collection("users").findOne({ email });
        if (validate) {
            const vHash = { name, email, password: passwordHash }
            const { value, error } = modelLogin.validate(vHash);
            if (error) {
                res.status(422).send(error);
            } else {
                await db.collection("users").insertOne(value);
                res.sendStatus(201);
            }
        }
    } catch (error) {
        res.sendStatus(500).send(error);
    }
};

async function logout(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try {
        const response = await db.collection("sessions").deleteOne({ token });
        if (response) res.status(200).send("Log-out realizado");
    } catch (error) {
        res.sendStatus(500).send(error);
    }
}

export { login, singup, logout };