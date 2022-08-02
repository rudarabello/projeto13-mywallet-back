import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { db } from "../databases/mongo.js";
dayjs.extend(customParseFormat);

async function getExtract(req, res) {
    try {
        const body = req.body;
        const { userId } = res.locals.session;       
        const finalDate = dayjs(body.final);
        const initialDate = dayjs(body.initial)
        const transactions = await db
            .collection("transactions")
            .find({ userId: userId })
            .toArray();
        const result = transactions.filter(
            (transaction) => {                
                const transactionDate = dayjs(transaction.date, "DD/MM/YYYY");
                return initialDate <= transactionDate && transactionDate <= finalDate;
            })
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("getExtract: \n" + err);
    }
};

export { getExtract };