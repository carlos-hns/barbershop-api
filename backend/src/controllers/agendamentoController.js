const express = require("express");

const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

const Agendamento = require("../models/Agendamento");

router.get("/", (req, res) => {

});

module.exports = app => app.use("/agendamentos", router);