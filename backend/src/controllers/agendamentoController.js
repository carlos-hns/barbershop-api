const express = require("express");

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

const Agendamento = require("../models/Agendamento");

router.post("/", async (req, res) => {

    var {nome_pessoa, dia, horario_id, servico_id, barbeiro_id, cliente_id } = req.body;

    var agendamento = await Agendamento.findOne({
        where: {
            dia,
            horario_id,
            barbeiro_id,
        }
    });

    console.log(agendamento);

    if (agendamento){
        return res.status(400).send("Agendamento já cadastrado");
    }

    await Agendamento.create({
        nome_pessoa,
        dia,
        horario_id,
        servico_id,
        barbeiro_id,
        cliente_id
    });

    return res.status(200).send("Agendamento cadastrado com sucesso");
});

router.get("/:user_id", (req, res) => {

});

module.exports = app => app.use("/agendamentos", router);