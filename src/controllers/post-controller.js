
async function postSignUp(req, res, db) {
    const user = req.body.user;
    const email = req.body.email;
    const cpf = req.body.cpf;
    const password = req.body.password;
    try {
        const newUser = {
            user: user,
            email: email,
            cpf: cpf,
            password: password
        }
        await db.collection("users").insertOne(newUser);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function postLogin(req, res, db) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const confirmationEmail = await db.collection("users").findOne({ email: email });
        const confirmationpassword = await db.collection("users").findOne({ password: password });
        if (confirmationEmail && confirmationpassword) {
            //devolver token para o front
            res.sendStatus(201);
            return;
        } else {
            res.sendStatus(409).send("Usuário não cadastrado!");
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

async function postTransaction(req, res, db) {
    
    try {
     
    } catch (error) {
        res.sendStatus(500);
    }
};




export { postSignUp, postLogin, postTransaction };