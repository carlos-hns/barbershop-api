const express = require("express");

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

const Horario = require("../models/Horario");

router.get("/", async (req, res) => {
    try {

        var horarios = await Horario.findAll();

        if (horarios.length === 0){
            return res.status(404).send("Horarios não cadastrados");
        }

        return res.status(200).json(horarios.body);

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    } 
});


router.get("/:id", async (req, res) => {
    try {

        var { id } = req.params.id;

        var horario = await Horario.findOne({
            where: {
                id,
                situacao: constantes.SITUACAO.NAO_EXCLUIDO
            },
            raw: true,
        });

        if (!horario){
            return res.status(404).send("Horario não cadastrado");
        }

        return res.status(200).json(horarios.body);

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});

router.post("/", async (req, res) => {
    try {
     
        var user = await User.findByPk(req.userId);

        if (!user.nivel_acesso === constantes.NIVEL_ACESSO.PROPRIETARIO){
            return res.status(400).send("Nível de acesso insuficiente");
        }

        var { horario } = req.body;

        if (await Horario.findOne({where: {horario}})){
            return res.status(400).send("Horário já cadastrado");
        }

        await Horario.create(req.body);

        return res.status(200).send("Horário cadastrado com sucesso");
    
    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});

router.delete("/:id", async(req,res) => {
    try {

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }

    var user = await User.findByPk(req.userId);

    if (!user.nivel_acesso === constantes.NIVEL_ACESSO.PROPRIETARIO){
        return res.status(400).send("Nível de acesso insuficiente");
    }

    var id = req.params.id;

    if (!await Horario.findOne({where: {id}})){
        return res.status(400).send("Horário não cadastrado");
    }

    await Horario.destroy({where: {id}});

    return res.status(200).send("Horário removido com sucesso");
});

module.exports = app => app.use("/horarios", router);