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

function verificarEmail(email){
    if (email.length == 0){
        return -1;
    }

    // Tem email
    return 1;
}

function validarEmail(email){
    var temArroba = email.indexOf("@");
    
    if (temArroba === -1){
        return -1;
    }

    var [email_prefixo, email_sufixo] = email.split("@");

    if (email_sufixo.indexOf(".") === -1){
        return -1;
    }

    return 1;
}


router.post("/register", async (req, res) => {
    const { email, nivel_acesso } = req.body;

    try {

        if (verificarEmail(email) === -1 || validarEmail(email) === -1){
            return res.status(400).send("Email Inválido");
        }

        if (nivel_acesso === 1 || nivel_acesso === 2){
            return res.status(400).send("Você não possui permissão para modificar nível de acesso");
        }

        if (await User.findOne({where: {email}})){
            return res.status(400).send({error: "Usuário já existe"});
        }

        const user = await User.create(req.body);

        user.senha = undefined;
        user.situacao = undefined;
        user.nivel_acesso = undefined;

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

    try {

        if (verificarEmail(email) === -1 || validarEmail(email) === -1){
            return res.status(400).send("Email Inválido");
        }

        const user = await User.findOne({where: {email}});

        if (!user) {
            return res.status(400).send({error: "Usuário não encontrado"});
        }

        if (!await bcrypt.compare(senha, user.senha)){
            return res.status(400).send({error: "Senha Inválida"});
        }

        user.senha = undefined;
        user.situacao = undefined;
        user.nivel_acesso = undefined;

        return res.send({
            user,
            token: generateToken({id: user.id}),
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({error: "Falha na Autenticação"});
    }
    
});

module.exports = app => app.use("/auth", router);