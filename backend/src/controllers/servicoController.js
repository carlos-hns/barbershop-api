const express = require("express");

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);
const Servico = require("../models/Servico");

router.get("/", async (req, res) => {
    var servicos = await Servico.findAll();

    if (servicos.length === 0){
        return res.status(400).send("Serviços não cadastrados");
    }

    return res.status(200).json(servicos.body);
});

module.exports = app => app.use("/servicos", router);