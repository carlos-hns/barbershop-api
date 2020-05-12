const express = require("express");

const constantes = require("../config/contantes.json");
const middleware = require("../middleware/auth");

const router = express.Router();
router.use(middleware);

const User = require("../models/User");

router.get("/", async (req, res) => {
    try {

        var users = await User.findAll({
            raw: true,
            where: { situacao: constantes.SITUACAO.NAO_EXCLUIDO },
            attributes: ["id", "email"],
        })
        
        // EXEMPLO DE USO
        /*
        var users = await User.findAll({
            raw: true,
            where: { situacao: NAO_EXCLUIDO},
            attributes: ["id", "email"],
            include: { association: "agendamentos_cliente", attributes: ["id"], where: { situacao: NAO_EXCLUIDO}},
            
        });
        */
        
        return res.status(200).json(users);

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});

router.get("/:id", async (req, res) => {
    try {

        var { id } = req.params.id;

        var user = await Horario.findOne({
            where: {
                id,
                situacao: constantes.SITUACAO.NAO_EXCLUIDO
            },
            raw: true,
            attributes: ["id", "email"],
        });

        if (!user){
            return res.status(404).send("Usuário não cadastrado");
        }

        return res.status(200).json(user);

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});

router.post("/", async (req, res) => {
    try {
        // userId vem do middleware quando passa na etapa de autenticação do token
        var user = await User.findByPk(req.userId);

        if (!user.nivel_acesso === constantes.NIVEL_ACESSO.PROPRIETARIO){
            return res.status(400).send("Nível de acesso insuficiente");
        }

        var verificar_user = await User.findOne({
            where: {
                email: req.body.email,
            }
        });

        if(verificar_user){
            return res.status(400).send("Usuário já cadastrado");
        }

        var newUser = await User.create(req.body);
        return res.status(200).json(newUser);
        
    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        var id = req.params.id;
       
        // userId vem do middleware quando passa na etapa de autenticação do token
        var user = await User.findByPk(req.userId);

        if (!user.nivel_acesso === constantes.NIVEL_ACESSO.PROPRIETARIO){
            return res.status(400).send("Nível de acesso insuficiente");
        }

        var verificar_user = await User.findOne({
            where: {
                id,
            }
        });

        if(!verificar_user){
            return res.status(400).send("Usuário não cadastrado");
        }

        await User.update({situacao: constantes.SITUACAO.EXCLUIDO}, {where: {id}});
        return res.status(200).send("Usuário removido com sucesso");

    } catch(error){
        console.log(error);
        res.status(400).send("Erro na requisição");
    }
});



module.exports = app => app.use("/users", router);