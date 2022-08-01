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
    const { userId } = session;
    const dataToFront = []
    try {
        const categorysThisUser = await db
            .collection("categorys-out")
            .find({ userId: userId })
            .toArray();
        for (let index = 0; index < categorysThisUser.length; index++) {
            const categoryFromDB = categorysThisUser[index]
            const { _id, descriptionCategory } = categoryFromDB;
            const subCategorysThisUser = await db
                .collection("categorys-out-sub")
                .find({ categoryId: _id })
                .toArray();
            let data = [{ descriptionCategory }]
            for (let index = 0; index < subCategorysThisUser.length; index++) {
                const { subCategoryOut } = subCategorysThisUser[index];
                data.push({ subCategoryOut })
            }
            dataToFront.push(data)
        }
        res.status(200).send(dataToFront)
    } catch (error) {
        console.log(error);
        res.status(500).send("getChartOutSub: \n" + error);
    }
};

async function getChart(req, res) {
    const { session } = res.locals;
    const { userId } = session
    let result =[]
    try {
        const transactions = await db
            .collection("transactions")
            .find({ userId: userId })
            .toArray();
        const categorys = await db
            .collection("categorys-out")
            .find({ userId: userId })
            .toArray();
        categorys.map((e) => {
            let c = e.category;
            transactions.map((e) =>{
                let t = e.descriptionCategory
                if(e=t){
                    
                }
            }
            )
        })
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send("getWallet: \n" + err);
    }
};


export { getChartIn, postChartIn, getChartOut, postChartOut, getChartOutSub, postChartOutSub, getChart };