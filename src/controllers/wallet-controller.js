import { db } from "../databases/mongo";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

async function postWallet(req, res) {
    const { user } = req.headers;
    const transaction = req.body;
    const date = dayjs().format("DD/MM/YYYY");
    const time = dayjs().format("HH:mm:ss");
    try {
        const { _id } = await db.collection("users").findOne({ email: user });
        if (_id) {
            const data = ({ ...transaction, userId: _id, date, time });
            const response = await db.collection("wallets").insertOne(data);
            response && res.status(201).send("Registrado com sucesso:", response)
        }else {
            res.status(422).send("Erro na postWallet");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("postWallet: \n" + error);
    }
}

async function getWallet(req, res) {
    const { user } = req.headers;
    try {
        const { _id } = await db.collection("users").findOne({ email: user });
        const transactions = await db.collection("wallets").find({ userId: new ObjectId(_id) }).toArray();
        transactions && res.status(200).send(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).send("getWallet: \n" + error);
    }
}

export { postWallet, getWallet };