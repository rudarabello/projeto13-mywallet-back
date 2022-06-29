

async function getHome(req, res, db) {
    const token = req.header.Authorization
    if (token) {
        try {
            const datafromDb = await db.collection("inputsOutputs").find();
            res.sendStatus(201).send(datafromDb);
        } catch (error) {
            res.sendStatus(500);
        }
    }else{
        res.sendStatus(409);
    }
}


export { getHome };