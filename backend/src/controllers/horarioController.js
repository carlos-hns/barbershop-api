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


module.exports = app => app.use("/horarios", router);