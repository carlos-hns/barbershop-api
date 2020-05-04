const express = require("express");

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

const Horario = require("../models/Horario");

router.get("/", async (req, res) => {
    var horarios = await Horario.findAll();
    
    if (horarios.length === 0){
        return res.status(404).send("Usúarios não cadastrados");
    }

    return res.status(200).json(horarios.body);
});

router.post("/", async (req, res) => {

    var { horario } = req.body;

    if (await Horario.findOne({where: {horario}})){
        return res.status(400).send("Horário já cadastrado");
    }

    await Horario.create(req.body);

    return res.status(200).send("Horário cadastrado com sucesso");
});

router.delete("/:id", async(req,res) => {
    
    var id = req.params.id;

    if (!await Horario.findOne({where: {id}})){
        return res.status(400).send("Horário não cadastrado");
    }

    await Horario.destroy({where: {id}});

    return res.status(200).send("Horário removido com sucesso");
});

module.exports = app => app.use("/horarios", router);