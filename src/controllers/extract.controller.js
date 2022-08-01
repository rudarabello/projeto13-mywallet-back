import { db } from "../databases/mongo.js";

async function getExtract(req, res) {
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
};

export {getExtract};