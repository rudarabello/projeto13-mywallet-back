import { db } from "../databases/mongo.js";
import dayjs from "dayjs";

async function postChartIn(req, res) {
    const { session } = res.locals;
    const category = req.body;
    const date = dayjs().format("DD/MM");
    const time = dayjs().format("HH:mm:ss");
    try {
        const operation = await db
            .collection("categorys-in")
            .insertOne({
                userId: session.userId,
                description: category.description,
                date,
                time
            });
        console.log(operation)
        res.status(201).send("Registrado com sucesso!")
    } catch (error) {
        console.log(error);
        res.status(500).send("postChart \n" + error);
    }
};

async function getChartIn(req, res) {
    const { session } = res.locals;
    const { userId } = session
    try {
        const categorys = await db
            .collection("categorys-in")
            .find({ userId: userId })
            .toArray();
        categorys && res.status(200).send(categorys);
    } catch (error) {
        console.log(error);
        res.status(500).send("getChart: \n" + error);
    }
};

async function postChartOut(req, res) {
    const { session } = res.locals;
    const category = req.body;
    const date = dayjs().format("DD/MM");
    const time = dayjs().format("HH:mm:ss");
    try {
        const operation = await db
            .collection("categorys-out")
            .insertOne({
                userId: session.userId,
                descriptionCategory: category.description,
                date,
                time
            });
        console.log(operation)
        res.status(201).send("Registrado com sucesso1")
    } catch (error) {
        console.log(error);
        res.status(500).send("postChart \n" + error);
    }
};
async function getChartOut(req, res) {
    const { session } = res.locals;
    const { userId } = session
    try {
        const categorys = await db
            .collection("categorys-out")
            .find({ userId: userId })
            .toArray();
        categorys && res.status(200).send(categorys);
    } catch (error) {
        console.log(error);
        res.status(500).send("getChart: \n" + error);
    }
};

async function postChartOutSub(req, res) {
    const { session } = res.locals;
    const category = req.body;
    const date = dayjs().format("DD/MM");
    const time = dayjs().format("HH:mm:ss");
    try {
        const operation = await db
            .collection("categorys-out")
            .insertOne({
                userId: session.userId,
                descriptionCategory: category.description,
                date,
                time
            });
        console.log(operation)
        res.status(201).send("Registrado com sucesso1")
    } catch (error) {
        console.log(error);
        res.status(500).send("postChart \n" + error);
    }
};
async function getChartOutSub(req, res) {
    const { session } = res.locals;
    const { userId } = session
    try {
        const categorys = await db
            .collection("categorys-out-sub")
            .find({ userId: userId })
            .toArray();
        categorys && res.status(200).send(categorys);
    } catch (error) {
        console.log(error);
        res.status(500).send("getChart: \n" + error);
    }
};


export { getChartIn, postChartIn, getChartOut, postChartOut, getChartOutSub, postChartOutSub };