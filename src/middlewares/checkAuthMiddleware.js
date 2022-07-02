import { db } from "../databases/mongo.js";

async function checkAuth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send("Acesso negado!");
    }
    try {
        const token = authorization?.replace("Bearer ", "");
        const session = await db
        .collection("sessions")
        .findOne({token});
        if (!session) {
            res.status(404).send("Faça login para ter acesso!");
        } else {
            res.locals.session = session;
            next();
        }
    } catch (err) {
        console.log(err);
    }
}

export default checkAuth ;

