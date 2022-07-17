import { db } from "../databases/mongo.js";
import dayjs from "dayjs";

async function getChartIn(req, res) {
    const { session } = res.locals;
    const { userId } = session
    try {
        const categorys = await db
            .collection("categorys")
            .find({ userId: userId })
            .toArray();
        const user = await db
            .collection("users")
            .findOne({ _id: session.userId });
        categorys && res.status(200).send(categorys);
    } catch (error) {
        console.log(error);
        res.status(500).send("getChart: \n" + error);
    }
};


async function postChartIn(req, res) {
    const { session } = res.locals;
    const category = req.body;
    const date = dayjs().format("DD/MM");
    const time = dayjs().format("HH:mm:ss");
    try {
        const operation = await db
            .collection("categorys")
            .insertOne({
                userId: session.userId,
                description: category.description,
                date,
                time
            });
        console.log(operation)
        res.status(201).send("Registrado com sucesso")
    } catch (error) {
        console.log(error);
        res.status(500).send("postChart \n" + error);
    }
};

async function getChart(req, res) {
    const { session } = res.locals;
    const { userId } = session
    try {
        const categorys = await db
            .collection("categorys")
            .find({ userId: userId })
            .toArray();
        const user = await db
            .collection("users")
            .findOne({ _id: session.userId });
        categorys && res.status(200).send(categorys);
    } catch (error) {
        console.log(error);
        res.status(500).send("getChart: \n" + error);
    }
};


async function postChart(req, res) {
    const { session } = res.locals;
    const category = req.body;
    const date = dayjs().format("DD/MM");
    const time = dayjs().format("HH:mm:ss");
    try {
        const operation = await db
            .collection("categorys")
            .insertOne({
                userId: session.userId,
                description: category.description,
                date,
                time
            });
        console.log(operation)
        res.status(201).send("Registrado com sucesso")
    } catch (error) {
        console.log(error);
        res.status(500).send("postChart \n" + error);
    }
};

export { getChartIn, postChartIn };