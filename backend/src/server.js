const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Carregando Models
require("./database/index");

// Carregando Controllers
require("./controllers/authController")(app);
require("./controllers/horarioController")(app);

app.listen(3000, () => {
    console.log("API rodando...");
});