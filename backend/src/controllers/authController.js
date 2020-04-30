const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json");

// Router do express
const router = express.Router();

const User = require("../models/User");

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post("/register", async (req, res) => {
    const { email } = req.body;

    try {

        if (await User.findOne({where: {email}})){
            return res.status(400).send({error: "Usuário já existe"});
        }

        const user = await User.create(req.body);

        user.senha = undefined;
        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (error){
        console.log(error);
        return res.status(400).send({error: "Falha no Registro"});
    }

});

router.post("/authenticate", async (req, res) => {
    const { email, senha } = req.body;

    const user = await User.findOne({where: {email}});

    if (!user) {
        return res.status(400).send({error: "Usuário não encontrado"});
    }

    if (!await bcrypt.compare(senha, user.senha)){
        return res.status(400).send({error: "Senha Inválida"});
    }

    user.senha = undefined;

    return res.send({
        user,
        token: generateToken({id: user.id}),
    });
});

module.exports = app => app.use("/auth", router);