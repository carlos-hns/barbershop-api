// Fazendo a importação das bibliotecas
const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

// Importando os Models
const User = require("../models/User");
const Horario = require("../models/Horario");
const Servico = require("../models/Servico");
const Agendamento = require("../models/Agendamento");

// Iniciando a conexão com o Banco
const connection = new Sequelize(dbConfig);

// Iniciando os Models
User.init(connection);
Horario.init(connection);
Servico.init(connection);
Agendamento.init(connection);

// Iniciando associações
User.associate(connection.models);
Horario.associate(connection.models);
Servico.associate(connection.models);
Agendamento.associate(connection.models);

module.exports = connection;