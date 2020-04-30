const express = require("express");
const routes = express.Router();

routes.get("/oi", (req, res) => {
    res.status(200).send("Tudo ok");
});

module.exports = routes;