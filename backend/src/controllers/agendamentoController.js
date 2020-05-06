const express = require("express");
const moment = require("moment");

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

const Agendamento = require("../models/Agendamento");
const User = require("../models/User");

const constantes = require("../config/contantes.json");

router.get("/", async (req, res) => {
    try {

        var agendamentos = await Agendamento.findAll({
            where: {
                situacao: constantes.SITUACAO.NAO_EXCLUIDO
            },
            attributes: ["id", "nome_pessoa", "dia"],
            include: [
                {    
                    association: "horario",
                    attributes: {
                        exclude: ["situacao", "createdAt", "updatedAt"]
                    }
                },
                {
                    association: "servico",
                    attributes: {
                        exclude: ["situacao", "createdAt", "updatedAt"]
                    }
                },
                {
                    association: "cliente",
                    attributes: ["id", "email"]
                },
                {
                    association: "barbeiro",
                    attributes: ["id", "email"]
                },
            ],
        });

        if (agendamentos === 0){
            res.status(400).send("Nenhum agendamento cadastrado");
        }



        return res.status(200).json(agendamentos);

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});

router.get("/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;

        var user = await User.findByPk(user_id, {
            where: {
                user_id
            },
            attributes: ["id", "email", "nivel_acesso"],
            include: [
                {    
                    association: "agendamentos_do_cliente",
                    attributes: ["id", "nome_pessoa", "dia"],
                    include: [
                        {    
                            association: "horario",
                            attributes: {
                                exclude: ["situacao", "createdAt", "updatedAt"]
                            }
                        },
                        {
                            association: "servico",
                            attributes: {
                                exclude: ["situacao", "createdAt", "updatedAt"]
                            }
                        },
                        {
                            association: "cliente",
                            attributes: ["id", "email"]
                        },
                        {
                            association: "barbeiro",
                            attributes: ["id", "email"]
                        },

                    ]
                },
                {    
                    association: "agendamentos_do_barbeiro",
                    attributes: {
                        exclude: ["situacao", "createdAt", "updatedAt"]
                    } 
                },
            ],
        });

        if (!user){
            return res.status(400).send("Usuário não cadastrado");
        }

        return res.status(200).json(user);

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});


router.post("/", async (req, res) => {


    try{

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }




    var {nome_pessoa, dia, horario_id, servico_id, barbeiro_id, cliente_id } = req.body;

    var agendamento = await Agendamento.findOne({
        where: {
            dia,
            horario_id,
            barbeiro_id,
        }
    });

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

module.exports = app => app.use("/agendamentos", router);