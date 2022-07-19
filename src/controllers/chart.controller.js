import { db } from "../databases/mongo.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

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
        res.status(201).send("Registrado com sucesso!")
    } catch (error) {
        console.log(error);
        res.status(500).send("postChart \n" + error);
    }
};
async function getChartOut(req, res) {
    const { session } = res.locals;
    const { userId } = session;
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
    const { userId } = res.locals.session;
    const { subCategoryOut, categoryOut } = req.body;
    const date = dayjs().format("DD/MM");
    const time = dayjs().format("HH:mm:ss");
    try {
        const categorys = await db
            .collection("categorys-out")
            .find({ userId: userId })
            .toArray();
        for (let index = 0; index < categorys.length; index++) {
            const categoryFromDB = categorys[index]
            const { descriptionCategory, _id } = categoryFromDB;
            if (categoryOut === descriptionCategory) {
                await db.collection("categorys-out-sub")
                    .insertOne({
                        userId: userId,
                        categoryId: _id,
                        categoryOut: categoryOut,
                        subCategoryOut: subCategoryOut,
                        date,
                        time
                    });
                return res.status(201).send("Registrado com sucesso!")
            }
        }
        return res.status(404).send("Houve um problema no registro!")
    } catch (error) {
        res.status(500).send("postChart \n" + error);
    }
};
async function getChartOutSub(req, res) {
    const { session } = res.locals;
    const { userId } = session
    try {
        const categorysAndSubCat = await db
            .collection("categorys-out-sub")
            .find({ userId: userId })
            .toArray();
        categorysAndSubCat && res.status(200).send(categorysAndSubCat);
    } catch (error) {
        console.log(error);
        res.status(500).send("getChart: \n" + error);
    }
};


export { getChartIn, postChartIn, getChartOut, postChartOut, getChartOutSub, postChartOutSub };