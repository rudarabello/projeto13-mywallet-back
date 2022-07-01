import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import {db} from "../databases/mongo.js";

async function login(req, res) {
    const {email,password} = req.body;
    try {
        const user = await db.collection("users").findOne({email: email});
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            const tokenObj = { userId: user._id, token, timestamp: Date.now() }
            await db.collection("sessions").insertOne(tokenObj);
            res.status(200).send({ token });
        } else {
            res.status(401).send({ msg: "Senha ou e-mail incorreto!" });
        }
    } catch (error) {
        res.sendStatus(500);
    }
    
    const token = req.header.Authorization
    if (token) {
        
    }else{
        res.sendStatus(409);
    }
}


export { getHome };