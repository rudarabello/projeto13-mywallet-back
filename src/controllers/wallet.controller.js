import { db, objectId } from "../databases/mongo.js";
import dayjs from "dayjs";

async function getWallet(req, res) {
    const { session } = res.locals;
    const { userId } = session
    try {
        const transactions = await db
            .collection("transactions")
            .find({ userId: userId })
            .toArray();
        const user = await db
            .collection("users")
            .findOne({ _id: session.userId });
            transactions && res.status(200).send(transactions);
    } catch (err) {
        console.log(err);
        res.status(500).send("getWallet: \n" + err);
    }
}


async function postWallet(req, res) {
    const { session } = res.locals;
    const transaction = req.body;
    const date = dayjs().format("DD/MM/YYYY");
    const time = dayjs().format("HH:mm:ss");
    console.log(session, transaction, date, time)
    try {
        const op = await db
            .collection("transactions")
            .insertOne({
                userId: session.userId,
                type: transaction.type,
                value: transaction.value,
                description: transaction.description,
                date,
                time
            });
        console.log(op)
        res.status(201).send("Registrado com sucesso:")
    } catch (error) {
        console.log(error);
        res.status(500).send("postWallet: \n" + error);
    }
}

export { postWallet, getWallet };