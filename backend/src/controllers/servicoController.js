const express = require("express");

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);
const Servico = require("../models/Servico");

router.get("/", async (req, res) => {
    try {

        var servicos = await Servico.findAll();

        if (servicos.length === 0){
            return res.status(400).send("Serviços não cadastrados");
        }

        return res.status(200).json(servicos.body);
    
    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});

router.get("/:id", async (req, res) => {
    try {

        var { id } = req.params.id;

        var servico = await Servico.findOne({
            where: {
                id,
                situacao: constantes.SITUACAO.NAO_EXCLUIDO
            },
            raw: true,
        });

        if (!servico){
            return res.status(404).send("Serviço não cadastrado");
        }

        return res.status(200).json(servico);

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

        await Servico.create(req.body);
        return res.status(200).send("Serviço cadastrado com sucesso");

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});

router.delete("/:id", async (req, res) => {
    
    try {

        var user = await User.findByPk(req.userId);

        if (!user.nivel_acesso === constantes.NIVEL_ACESSO.PROPRIETARIO){
            return res.status(400).send("Nível de acesso insuficiente");
        }

        await Servico.destroy({where: {id}});
        return res.status(200).send("Serviço removido com sucesso");
    
    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});

module.exports = app => app.use("/servicos", router);