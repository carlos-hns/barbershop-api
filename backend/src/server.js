// Fazendo a importação das bibliotecas
const express = require("express");
const bodyParser = require("body-parser");

// Porta do Servidor HTTP
const PORT = 3000;

// Criando Instância do express
const app = express();

// Configurando o express para receber json e params pela url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Carregando Models
require("./database/index");

// Carregando Controllers
require("./controllers/authController")(app);
require("./controllers/horarioController")(app);
require("./controllers/servicoController")(app);
require("./controllers/agendamentoController")(app);
require("./controllers/userController")(app);

// Iniciando o Server
app.listen(PORT, () => {
    console.log("API BarberShop Rodando...");
});